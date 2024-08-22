import axios from 'axios';
import { app, BaseWindow, BrowserWindow, ipcMain, WebContentsView } from 'electron';
import serve from 'electron-serve';
import path from 'path';

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, '../out'),
    })
  : null;

let win = null;

const createWindow = () => {
  win = new BaseWindow({
    width: 2200,
    height: 1200,
  });

  const mainView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.contentView.addChildView(mainView);

  if (appServe && app.isPackaged) {
    appServe(win as BrowserWindow).then(() => {
      mainView.webContents.loadURL('app://-');
    });
  } else {
    mainView.webContents.loadURL('http://localhost:3000');
    mainView.webContents.openDevTools();
    mainView.webContents.on('did-fail-load', () => {
      mainView.webContents.reloadIgnoringCache();
    });
  }
  mainView.setBounds({ x: 0, y: 0, width: 2200, height: 1200 });

  const externalView = new WebContentsView();
  win.contentView.addChildView(externalView);
  externalView.webContents.loadURL('https://electronjs.org');
  externalView.setBounds({ x: 590, y: 173, width: 887, height: 720 });


  externalView.webContents
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
    console.log('on:fetch-url: ', url);
    const response = await axios.get(url);

    console.log('on:fetch-url:response.data: ', response.data);
    event.reply('fetch-result', { data: response.data });
  } catch (error: any) {
    event.reply('fetch-result', { error: error.message });
  }
});
