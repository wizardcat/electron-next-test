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
  saveHighlight: (data) => {
    console.log('saveHighlight: ', data);

    ipcRenderer.send('save-highlight', data);
  },
  onHighlightSaved: (callback) => {
    console.log('onHighlightSaved: ', callback);
    ipcRenderer.on('highlight-saved', (event, data) => {
          console.log('onHighlightSaved: callback data: ', data);
      callback(data);
    });
  },
  pageLoaded: () => {
     console.log('pageLoaded: done');
    ipcRenderer.send('page-loaded');
  },
});
