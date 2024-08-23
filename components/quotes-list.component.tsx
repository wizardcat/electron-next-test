import { Quote } from '@/interfaces/quote.interface';
import { useEffect, useState } from 'react';
import { QuoteContent } from './quote-content.component';

export const QuotesList = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    window.electron.receive('get-quotes', (result: any) => {
      const { data } = JSON.parse(result);
      setQuotes(data.reverse());
    });
  }, []);

  return (
    <div className="shadow-lg w-full h-full bg-white text-base rounded-md">
      <div className="m-2  text-gray-800 text-lg font-bold">
        <p>Your highlights:</p>
      </div>
      <hr className="m-2 border-double border-x-0 border-b-0 border-4 border-gray-300" />
      {quotes?.map((quote: any) => (
        <QuoteContent key={quote.id} quote={quote} />
      ))}
      {quotes?.length === 0 && (
        <div className="m-2 text-center text-gray-500 text-lg">
          <p>No highlights yet!</p>
        </div>
      )}
    </div>
  );
};
