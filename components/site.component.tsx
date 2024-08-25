import { useSiteQuery } from '@/hooks/use-site-query.hook';
import useSiteStore from '@/store/site.store';
import { Search } from './search.component';

export const Site = () => {
  const currentLink = useSiteStore((state) => state.siteLink);
  const { error, isLoading, isError, data: siteContent } = useSiteQuery({ link: currentLink });
  return (
    <div className="w-full h-full grid grid-rows-[1fr_10fr] ">
      <Search isLoading={isLoading} />
      {/* <SiteView siteContent={siteContent} isLoading={isLoading} isError={isError} /> */}
    </div>
  );
}