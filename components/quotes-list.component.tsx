import { useEffect, useState } from 'react';
import { Quote } from './quote.component';

export const QuotesList = () => {
  const [quotes, setQuotes] = useState<any[]>([]);

  useEffect(() => {
    window.electron.receive('get-quotes', (result: any) => {
      const { data } = JSON.parse(result);
      setQuotes(data);
    });
  }, []);

  return (
    <div className="shadow-lg w-full h-full bg-white text-base rounded-md">
      <div className="m-2 text-center text-gray-500 text-lg">
        <p>Your highlights</p>
      </div>
      <hr className="m-2 border-double border-x-0 border-b-0 border-4 border-gray-300" />
      {/* {error && <ErrorMessage error={error.message} />}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>} */}
      {quotes?.reverse().map((quote: any) => (
        <Quote key={quote.id} text={quote.text} />
      ))}
      {quotes?.length === 0 && <p>No highlights yet!</p>}
    </div>
  );
};
