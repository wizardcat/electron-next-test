import { app, BaseWindow, ipcMain, WebContentsView } from 'electron';
import log from 'electron-log/main';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Quote } from '../interfaces/quote.interface';
log.initialize();

let win: BaseWindow;
let mainView: WebContentsView;
let externalView: WebContentsView;
let quotesList: Quote[] = [];

const createWindow = async () => {
  win = new BaseWindow({
    width: 2200,
    height: 1200,
  });

  mainView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preloadMain.js'),
    },
  });
  win.contentView.addChildView(mainView);
  
  if (app.isPackaged) {
    log.info('app.isPackaged: ', app.isPackaged);
    log.info(`file://${path.join(__dirname, '../out/index.html')}`);
    // const serve = await import('electron-serve');
    // const appServe = serve.default({
    //   directory: path.join(__dirname, '../out'),
    // });

    // await appServe(mainView);
    mainView.webContents.loadURL(`file://${path.resolve(__dirname, '../../out/index.html')}`);
    // mainView.webContents.loadURL(`file://${path.join(__dirname, '../../out/index.html')}`);
    // await mainView.webContents.loadURL('app://-');
    mainView.webContents.openDevTools();
  } else {
    mainView.webContents.loadURL('http://localhost:3000');
    mainView.webContents.openDevTools();
    mainView.webContents.on('did-fail-load', () => {
      mainView.webContents.reloadIgnoringCache();
    });
  }
  mainView.setBounds({ x: 0, y: 0, width: 2000, height: 1200 });

  externalView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.contentView.addChildView(externalView);
  externalView.webContents.loadURL('https://electronjs.org');
  externalView.setBounds({ x: 960, y: 173, width: 300, height: 720 });

  externalView.webContents.on('did-finish-load', (event: any, webContents1: any) => {
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
            window.electron.saveHighlight({ url, title, text: selectedText });
            el.target.remove();
          };
          document.body.appendChild(popup);
        }
      });
    `);
  });
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
    externalView.webContents.loadURL(url);
    setTimeout(() => {
      event.sender.send('fetch-result', { data: { state: 'load_was_started' } });
    }, 1000);
  } catch (error: any) {
    // event.reply('fetch-result', { error: error.message });
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
