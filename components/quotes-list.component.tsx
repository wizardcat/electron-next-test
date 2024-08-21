import { Quote } from './quote.component';

export const QuotesList = () => {
  return (
    <div className="shadow-lg w-full h-full bg-white text-base rounded-md">
      <Quote text="Quote 1" />
      <Quote text="Quote 2" />
      <Quote text="Quote 3" />
    </div>
  );
}