'use client';
import { AnimeEmbedding } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SearchResult extends AnimeEmbedding {
  score: number;
}
export default function Home() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function search(query: string) {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setResults(data);
    setLoading(false);
  }

  // 🔥 debounce 1 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      search(q);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [q]);

  return (
    <>
      <div className='max-w-lg mx-auto p-10 '>
        <h1 className='text-3xl font-bold mb-4 text-center'>Anime Semantic Search</h1>

        <input
          suppressHydrationWarning
          className='border w-full border-gray-200 pr-10 outline-none rounded-xl px-4 leading-none h-12 focus:border-orange-400'
          placeholder='anime about students training to become heroes'
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        {loading && <div className='text-sm opacity-50 mt-2'>Searching...</div>}
      </div>
      <div className='max-w-4xl mx-auto p-4 grid grid-cols-5 mt-6 gap-4'>
        {results.map((p) => (
          <div key={p.title} className='gap-4'>
            <div className='shrink-0 relative w-full bg-slate-100 rounded-xl aspect-3/4'>
              <Image src={p.image} fill className='object-cover' alt='anime' />
            </div>

            <div className=' w-full  flex-1 flex flex-col gap-y-2 mt-1'>
              <h2 className='font-medium capitalize text-sm'>{p.title}</h2>
              <div className='capitalize flex flex-wrap gap-x-0.5'>
                {p.genreList.map((d: string) => (
                  <div
                    className='text-[11px] pr-1 mr-1 border-r border-r-white/50 opacity-50 last-of-type:border-r-0 leading-none mb-1'
                    key={d}
                  >
                    {d}
                  </div>
                ))}
              </div>
              {/* <span className='text-xs opacity-50'>score: {p.score.toFixed(3)}</span> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
