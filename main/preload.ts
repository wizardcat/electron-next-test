import { contextBridge, ipcRenderer } from 'electron';

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
    ipcRenderer.send('save-highlight', data);
  },
  onHighlightSaved: (callback: (...args: any[]) => void) => {
    ipcRenderer.on('highlight-saved', (event, data) => {
      callback(data);
    });
  },
  pageLoaded: () => {
    ipcRenderer.send('page-loaded');
  },
});
