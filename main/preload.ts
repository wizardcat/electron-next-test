import { contextBridge, ipcRenderer } from 'electron';
// const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  on: (channel: string, callback: (...args: any[]) => void) => {
    ipcRenderer.on(channel, callback);
  },
  send: (channel: string, args: any) => {
    ipcRenderer.send(channel, args);
  },
  receive: (channel: string, func: (...args: any[]) => void) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  saveHighlight: (data: any) => {
    console.log('saveHighlight: ', data);

    ipcRenderer.send('save-highlight', data);
  },
  onHighlightSaved: (callback: (...args: any[]) => void) => {
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
