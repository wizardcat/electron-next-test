import { Quote } from '@/interfaces/quote.interface';
import Link from 'next/link';

export const QuoteContent = ({ quote: { text, id, url, title } }: { quote: Quote }) => {
  return (
    <div className="shadow-sm min-h-10 max-h-40 text-base rounded-md m-2 border-gray-300 border-[1px] p-2 bg-gray-100">
      <div className="flex justify-between font-bold">
        <p>{title}</p>
        <Link href={url} target="_blank" rel="noreferrer" className='text-blue-500'>
          {url.slice(0, 30)}
        </Link>
      </div>
      <p>{text}</p>
    </div>
  );
};
