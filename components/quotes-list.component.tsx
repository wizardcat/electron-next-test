import { Quote } from '@/interfaces/quote.interface';
import { useEffect, useState } from 'react';
import { QuoteContent } from './quote-content.component';

export const QuotesList = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    window.electron.receive('get-quotes', (result: string) => {
      const { data } = JSON.parse(result);
      setQuotes(data.reverse());
    });
  }, []);

  return (
    <div className="w-full h-full text-base rounded-md pl-7">
      <div className="m-5  text-gray-800 text-lg font-bold">
        <p>Your highlights:</p>
      </div>
      <hr className="m-2 border-double border-x-0 border-b-0 border-4 border-gray-700" />
      {quotes?.map((quote) => (
        <QuoteContent key={quote.id} quote={quote} />
      ))}
      {quotes?.length === 0 && (
        <div className="m-2 pl-3 text-gray-500 text-lg">
          <p>No highlights yet!</p>
        </div>
      )}
    </div>
  );
};
