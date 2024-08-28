import { Quote } from '@/interfaces/quote.interface';
import { useEffect, useState } from 'react';

export const useQuotes = () => {
   const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    window.electron.receive('get-quotes', (result: string) => {
      const { data } = JSON.parse(result);
      setQuotes(data.reverse());
    });
  }, []);

  return quotes;
}