import { useEffect, useState } from 'react';
// const { ipcRenderer, IpcMessageEvent } = require('electron');

const SiteView = (siteContent: any, isLoading = false, isError = false) => {
  const [selectedText, setSelectedText] = useState('');
    const [highlights, setHighlights] = useState<{ url: string; title: string; text: string }[]>(
      [],
    );

  const iframeOnLoad = (event: any) => {
        console.log('iframeOnLoad: done');        
        window.electron.pageLoaded();
      };
  
  useEffect(() => {
    window.onmessage = function (event) {
        console.log('event.data:', event.data);
    };
    
      window.electron.onHighlightSaved((event: any, data: any) => {
        setHighlights((prev) => [...prev, data]);
      });
    }, []);

  return (
    <div className="shadow-lg w-full h-full bg-white text-base rounded-md group p-1 ">
      <iframe
        src="https://caisy.io/blog/nextjs-iframe-implementation"
        className="w-full h-full"
        id="webview"
        onLoad={iframeOnLoad}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-downloads allow-presentation"
      ></iframe>
    </div>
  );
};

export default SiteView;
