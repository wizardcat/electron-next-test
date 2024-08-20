import { useQuery } from '@tanstack/react-query';

const getSiteFn = async (link: string) => {

   return new Promise((resolve, reject) => {
     window.electron.receive('fetch-result', (result: any) => {

      if (result.error) {
        reject(result.error);
      } else {
        resolve(result.data);
      }
    });

    window.electron.send('fetch-url', link);
  });
};

interface UseSiteQueryOptions {
  link: string;
}

export const useSiteQuery = ({ link }: UseSiteQueryOptions) => {

  const query = useQuery<any>({
    queryKey: ['link', link],
    enabled: !!link,
    queryFn: () => getSiteFn(link!),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  return query;
};
