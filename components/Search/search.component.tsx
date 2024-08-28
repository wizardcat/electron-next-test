import { useSearch } from './use-search.hook';

export const Search = () => {
  const { link, isLoading, handleLinkChange, handleSubmitClick } = useSearch();

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
        {isLoading ? <span className='text-[11px]'>Loading...</span> : 'Go'}
      </button>
    </div>
  );
};
