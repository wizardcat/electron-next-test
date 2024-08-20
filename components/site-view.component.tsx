import { useState } from 'react';
import { NoDataFound } from './no-data-found.component';
// const { ipcRenderer, IpcMessageEvent } = require('electron');

const SiteView = (siteContent: any, isLoading = false, isError = false) => {
  const [selectedText, setSelectedText] = useState('');
  
// useEffect(() => {
//     console.log('siteContent: ', siteContent);
// }, [siteContent])  
  
  // useEffect(() => {
  //   console.log('selectedText: ', selectedText);
  // }, [selectedText]);  

  // useEffect(() => {
  //   console.log('siteContent: ', siteContent);
    
  //   if (!siteContent) return;
  //   const iframe = document.getElementById('site-iframe') as HTMLIFrameElement;
  //   if (!iframe) return;
  //   const iframeWindow = iframe.contentWindow;

  //   const handleMouseUp = () => {
  //     if (!iframeWindow) return;
  //     const selection = iframeWindow.getSelection();
  //     if (selection && selection.toString()) {
  //       setSelectedText(selection.toString());
  //     }
  //   };
  //   if (!iframeWindow) return;
  //   iframeWindow.addEventListener('mouseup', handleMouseUp);

  //   return () => {
  //     iframeWindow.removeEventListener('mouseup', handleMouseUp);
  //   };
  // }, [siteContent]);

//   const handleWebviewEvent = () => {
//     const webview = document.getElementById('site-webview');
//     if (!webview) return;

//   webview.addEventListener('ipc-message', (event: typeof IpcMessageEvent) => {
//   if (event.channel === 'text-selected') {
//     setSelectedText(event.args[0]);
//   }
// });
//   };

  return (
    <div className="flex flex-col items-center mt-10 w-[560px] h-80">
    {/* <div> */}
        <webview
          id="site-webview"
          src="https://caisy.io/blog/nextjs-iframe-implementation"
          style={{ width: '100%', height: '100%' }}
          // onLoad={handleWebviewEvent}
        />
      {/* {siteContent && (

        // <iframe
        //   src="https://caisy.io/blog/nextjs-iframe-implementation"
        //   width="560"
        //   height="1560"
        //   id="site-iframe"
        // ></iframe>
        // <div className="shadow-lg w-full bg-white text-base rounded-md group mt-10 max-w-md border-gray-300 p-4">
        //   {siteContent.siteContent}
        // </div>
        // <div dangerouslySetInnerHTML={{ __html: siteContent.siteContent }} />
      )} */}
      {!isError && !isLoading && !siteContent && <NoDataFound />}
      {/* {isError && <ErrorMessage error={error.message} />} */}
    </div>
  );
};

export default SiteView;
