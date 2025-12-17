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
    <div className='max-w-lg mx-auto p-10'>
      <h1 className='text-3xl font-bold mb-4 text-center'>Anime Semantic Search</h1>

      <input
        suppressHydrationWarning
        className='border py-2 px-4 w-full rounded-full border-black/50'
        placeholder='water pokemon that is small'
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {loading && <div className='text-sm opacity-50 mt-2'>Searching...</div>}

      <div className='mt-6 space-y-4'>
        {results.map((p) => (
          <div key={p.title} className='flex gap-4 border p-2 rounded-2xl border-black/50'>
            <div className='shrink-0 w-36 h-36 bg-slate-100 rounded-xl p-2 flex items-center justify-center'>
              <Image src={p.image} width={144} height={144} className='max-h-full' alt='anime' />
            </div>

            <div className=' w-full  flex-1 flex flex-col  gap-y-2'>
              <h2 className='font-bold capitalize text-2xl'>{p.title}</h2>
              <div className='capitalize flex gap-x-0.5'>
                {p.genreList.map((d: string) => (
                  <div className=' px-1 py-px text-xs rounded-md border border-black leading-none' key={d}>
                    {d}
                  </div>
                ))}
              </div>
              <span className='text-xs opacity-50'>score: {p.score.toFixed(3)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
