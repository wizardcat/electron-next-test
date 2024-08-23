import { QuotesList } from '@/components/quotes-list.component';
import { Site } from '@/components/site.component';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="w-[1200px] h-[800px] [justify-between] justify-between font-mono text-sm lg:grid gap-2 grid-cols-[3fr_1fr]">
        <QuotesList />
        <Site />
      </div>
    </main>
  );
}
