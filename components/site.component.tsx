import { Search } from './Search/search.component';

export const Site = () => {
  return (
    <div className="w-[411px]  h-[720px] grid grid-rows-[1fr_10fr] pl-6 pr-6 border-gray-500 text-center">
      <Search/>
    </div>
  );
}