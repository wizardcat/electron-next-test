export { };

declare global {
  interface Window {
    electron: {
      send: (channel: string, data: any) => void;
      receive: (channel: string, func: (...args: any[]) => void) => void;
      saveHighlight: (data: any) => void;
      onHighlightSaved: (callback: (...args: any[]) => void) => void;
      pageLoaded: () => void;
    };
  }
}
