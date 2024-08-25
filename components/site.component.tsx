import { useSiteQuery } from '@/hooks/use-site-query.hook';
import useSiteStore from '@/store/site.store';
import { Search } from './search.component';

export const Site = () => {
  const currentLink = useSiteStore((state) => state.siteLink);
  const { error, isLoading, isError, data: siteContent } = useSiteQuery({ link: currentLink });
  return (
    <div className="w-[411px]  h-[720px] grid grid-rows-[1fr_10fr] pl-6 pr-6 border-gray-500 text-center">
      <Search isLoading={isLoading} />
      {/* <SiteView siteContent={siteContent} isLoading={isLoading} isError={isError} /> */}
    </div>
  );
}