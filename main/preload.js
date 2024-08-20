const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  on: (channel, callback) => {
    ipcRenderer.on(channel, callback);
  },
  send: (channel, args) => {
    ipcRenderer.send(channel, args);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});
