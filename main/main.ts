import { app, BaseWindow, ipcMain, protocol, WebContentsView } from 'electron';
import log from 'electron-log/main';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Quote } from '../interfaces/quote.interface';

log.initialize();

let win: BaseWindow;
let mainView: WebContentsView;
let externalView: WebContentsView;
let quotesList: Quote[] = [];

const externalSiteViewCreate = () => {
  externalView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.contentView.addChildView(externalView);
  externalView.setBounds({ x: 885, y: 80, width: 350, height: 655 });

  externalView.webContents.on('did-finish-load', () => {
    externalView.webContents.executeJavaScript(`
      document.addEventListener('mouseup', () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
          const selectedText = selection.toString();
          const popup = document.createElement('div');
          popup.setAttribute('id', 'button_popup');
          popup.style.position = 'absolute';
          popup.style.backgroundColor = '#FFF';
          popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          popup.style.border = '1px solid #000';
          popup.style.borderRadius = '0.375rem';
          popup.style.padding = '5px';
          popup.style.zIndex = '10000';
          popup.style.top = \`\${window.pageYOffset + selection.getRangeAt(0).getBoundingClientRect().top + 10}px\`;
          popup.style.left = \`\${selection.getRangeAt(0).getBoundingClientRect().left + popup.getBoundingClientRect().width}px\`;
          popup.textContent = 'Save Highlight';
          popup.onclick = (el) => {
            const title = document.title;
            const url = window.location.href;
            window.electron.send('save-highlight', { url, title, text: selectedText });
            el.target.remove();
          };
          document.body.appendChild(popup);
        }
      });
    `);
  });
};

const createWindow = async () => {
  win = new BaseWindow({
    width: 1280,
    height: 720,
  });

  mainView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.contentView.addChildView(mainView);

  if (app.isPackaged) {
    protocol.handle('file', (request) => {
      const url = request.url.slice('file://'.length);
      let filePath = path.join(__dirname, '../../out', url);

      if (url.startsWith('_next/static/')) {
        filePath = path.join(__dirname, '../../out', url);
      }

      return fs.promises
        .readFile(filePath)
        .then((data) => {
          let contentType = 'text/plain';
          if (filePath.endsWith('.html')) contentType = 'text/html';
          else if (filePath.endsWith('.css')) contentType = 'text/css';
          else if (filePath.endsWith('.js')) contentType = 'application/javascript';
          else if (filePath.endsWith('.woff2')) contentType = 'font/woff2';
          else if (filePath.endsWith('.woff')) contentType = 'font/woff';
          else if (filePath.endsWith('.ttf')) contentType = 'font/ttf';

          return new Response(data, { headers: { 'Content-Type': contentType } });
        })
        .catch((err) => {
          log.error('File not found:', err);
          return new Response(null, { status: 404 });
        });
    });

    mainView.webContents.loadURL('file:///index.html');
  } else {
    mainView.webContents.loadURL('http://localhost:3000');
    // mainView.webContents.openDevTools();
    mainView.webContents.on('did-fail-load', () => {
      mainView.webContents.reloadIgnoringCache();
    });
  }
  mainView.setBounds({ x: 0, y: 0, width: 1280, height: 720 });

  externalSiteViewCreate();
};



app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BaseWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('fetch-url', async (event: any, url: string) => {
  try {
    await externalView.webContents.loadURL(url);

    const res = JSON.stringify({ isLoaded: true });

    event.sender.send('page-load', res);
  } catch (error: any) {
    event.reply('page-load', { error: error.message });
  }
});

ipcMain.on('save-highlight', (event, data: Quote) => {
  const quote = {
    id: uuidv4(),
    ...data,
  };

  quotesList.push(quote);
  mainView.webContents.send('get-quotes', JSON.stringify({ data: quotesList }));
});
