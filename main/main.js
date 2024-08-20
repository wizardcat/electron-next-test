// import { app, BrowserWindow } from 'electron';
// import serve from 'electron-serve';
// import path from 'path';
const { app, BrowserWindow, ipcMain } = require('electron');
const serve = require('electron-serve');
const path = require('path');
const axios = require('axios');

// const __dirname=path.resolve();
console.log('__dirname: ', __dirname);

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, '../out'),
    })
  : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL('app://-');
    });
  } else {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
    win.webContents.on('did-fail-load', (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('fetch-url', async (event, url) => {
  try {
    const response = await axios.get(url);

    event.reply('fetch-result', { data: response.data });
  } catch (error) {
    event.reply('fetch-result', { error: error.message });
  }
});