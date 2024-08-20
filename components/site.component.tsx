import { useSiteQuery } from '@/hooks/use-site-query.hook';
import useSiteStore from '@/store/siteStore';
import { Search } from './search.component';
import SiteView from './site-view.component';

export const Site = () => {
    const currentLink = useSiteStore((state: any) => state.siteLink);
    const { error, isLoading, isError, data: siteContent } = useSiteQuery({ link: currentLink });
  return (
    // <div className="shadow-lg w-full bg-white text-base rounded-md group mt-10 max-w-md border-gray-300 p-4">
    <div >
      <Search isLoading={isLoading} />
      <SiteView siteContent={siteContent} isLoading={isLoading} isError={isError} />
    </div>
  );
}