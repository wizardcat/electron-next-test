const { app, BaseWindow, WebContentsView, ipcMain } = require('electron');
const serve = require('electron-serve');
const path = require('path');
const axios = require('axios');

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
     webPreferences: {
       preload: path.join(__dirname, 'preload.js'),
     },
  });

  const mainView = new WebContentsView({});
  win.contentView.addChildView(mainView);

  if (app.isPackaged) {
    appServe(win).then(() => {
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
