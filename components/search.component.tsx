import useSiteStore from '@/store/siteStore';
import { useState } from 'react';

export const Search = ({ isLoading }: { isLoading: boolean }) => {
  const [link, setLink] = useState<string>('');

  const setCurrentLink = useSiteStore((state: any) => state.setSiteLink);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSubmitClick = async () => {
    setCurrentLink(link);
  };

  return (
    <div className="shadow-lg w-full h-36 bg-white text-base rounded-md group">
      <div className="m-3">
        <h6 className="font-bold text-black">Sites</h6>
      </div>
      <div className="flex items-center text-base m-3">
        <input
          type="text"
          className="border-2 border-gray-300 rounded-md p-2 w-full focus:border-black focus:outline-none"
          placeholder="Enter site link"
          value={link}
          onChange={handleLinkChange}
        />
        <button
          className="ml-4 bg-black  hover:bg-gray-800 px-2 py-2 rounded-md right-0   text-white w-[175px]"
          onClick={handleSubmitClick}
          disabled={link === '' || isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      <div className="text-center text-gray-500 pr-[125px]">Enter link</div>
    </div>
  );
};
