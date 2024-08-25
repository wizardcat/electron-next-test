import { QuotesList } from '@/components/quotes-list.component';
import { Site } from '@/components/site.component';


export default function Home() {
  return (
    <main className="h-[720px] font-mono text-sm grid grid-cols-[3fr_1.5fr]">
        <QuotesList />
        <Site />
    </main>
  );
}
