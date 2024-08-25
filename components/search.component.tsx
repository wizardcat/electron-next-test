import { useEffect, useState } from 'react';

export const Search = () => {
  const [link, setLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSubmitClick = async () => {
    setIsLoading(true);
    window.electron.send('fetch-url', link);
  };

  useEffect(() => {
    window.electron.receive('page-load', (result: any) => {
      const { isLoaded } = JSON.parse(result);
      setIsLoading(!isLoaded);
    });
  }, []);

  return (
    <div className="w-full flex items-center text-base border-gray-500 pt-10 pr-2 pl-2">
      <input
        type="text"
        className="border-2 border-gray-300 rounded-md pr-1 w-full bg-gray-300 focus:border-gray-400  focus:outline-none"
        placeholder="Enter site link"
        value={link}
        onChange={handleLinkChange}
      />
      <button
        className="ml-1 bg-gray-300 border-[1px] border-gray-700 hover:bg-gray-400 rounded-md  w-24 h-[26px]"
        onClick={handleSubmitClick}
        disabled={link === '' || isLoading}
      >
        {isLoading ? 'Loading...' : 'Go'}
      </button>
    </div>
  );
};
