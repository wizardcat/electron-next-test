import { useSearch } from './use-search.hook';

export const Search = () => {
  const { isLoading, handleSubmitClick, register, handleSubmit, errors } = useSearch();

  return (
    <form
      onSubmit={handleSubmit(handleSubmitClick)}
      className="w-full flex text-base border-gray-500 pt-10 pr-2 pl-2"
    >
      <div className="w-full">
        <input
          type="text"
          className={`${
            errors.link ? 'border-red-500' : 'border-gray-300'
          } border-[1px] border-gray-300 rounded-md pl-1 pr-1 w-full bg-gray-300 focus:border-gray-400  focus:outline-none`}
          placeholder="Enter site link"
          {...register('link')}
        />
        {errors.link && <p className="text-red-500 text-xs">{errors.link.message}</p>}
      </div>
      <button
        type="submit"
        className="ml-1 bg-gray-300 border-[1px] border-gray-700 hover:bg-gray-400 rounded-md  w-24 h-[26px]"
        disabled={isLoading}
      >
        {isLoading ? <span className="text-[11px]">Loading...</span> : 'Go'}
      </button>
    </form>
  );
};
