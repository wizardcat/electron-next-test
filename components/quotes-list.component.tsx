import { Quote } from './quote.component';

export const QuotesList = () => {
  return (
    <div className="shadow-lg w-full h-full bg-white text-base rounded-md">
      <div className="m-2 text-center text-gray-500 text-lg">
        <p>Your highlights</p>
      </div>
      <hr className="m-2 border-double border-x-0 border-b-0 border-4 border-gray-300" />
      <Quote text="Quote 1" />
      <Quote text="Quote 2" />
      <Quote text="Quote 3" />
    </div>
  );
};
