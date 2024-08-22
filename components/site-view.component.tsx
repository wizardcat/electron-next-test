
const SiteView = (siteContent: any, isLoading = false, isError = false) => {


  return (
    <div className="shadow-lg w-full h-full bg-white text-base rounded-md group p-1 ">
      <iframe
        src="https://caisy.io/blog/nextjs-iframe-implementation"
        className="w-full h-full"
        id="webview"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-downloads allow-presentation"
      ></iframe>
    </div>
  );
};

export default SiteView;
