import { Quote } from '@/interfaces/quote.interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const getQuoteFn = () => {
  return new Promise<Quote[]>((resolve, reject) => {
    window.electron.receive('get-quotes', (result: any) => {
      const { data } = JSON.parse(result);
      if (result.error) {
        reject(result.error);
      } else {
        resolve(data);
      }
    });
  });
};

export const useQuotesQuery = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Quote[]>({
    queryKey: ['quote'],
    enabled: true,
    queryFn: getQuoteFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  // useEffect(() => {
  //   console.log('query.data: ', query.data);
    
  //   // queryClient.invalidateQueries({ queryKey: ['quote'] });
  //   window.electron.receive('get-quotes', (result: any) => {
  //     console.log('result: ', result);
  //     const { data } = JSON.parse(result);
  //     queryClient.setQueryData(['quote'], () => {
  //       return data;
  //     });
  //   });
  // }, [queryClient]);

  return query;
};
