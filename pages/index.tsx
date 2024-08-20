import { QuotesList } from '@/components/quotes-list.component';
import { Site } from '@/components/site.component';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <QuotesList />
        <Site/>
      </div>
    </main>
  );
}
