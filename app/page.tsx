'use client';
import Image from 'next/image';
import { useState } from 'react';

interface Pokemon {
  name: string;
  sprites: string;
  description: string;
  score: number;
}

export default function Home() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Pokemon[]>([]);

  async function search() {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q }),
    });
    const data = await res.json();
    setResults(data);
  }

  return (
    <div className='max-w-xl mx-auto p-10'>
      <h1 className='text-3xl font-bold mb-4'>AI Pokémon Semantic Search</h1>

      <input
        suppressHydrationWarning
        className='border p-2 rounded w-full'
        placeholder='water pokemon has big size'
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <button suppressHydrationWarning onClick={search} className='mt-4 w-full bg-black text-white p-2 rounded'>
        Search
      </button>

      <div className='mt-6 space-y-4'>
        {results.map((p: Pokemon) => (
          <div key={p.name} className='flex gap-4 border p-3 rounded'>
            <div className='shrink-0 w-16 h-16'>
              <Image src={p.sprites} width={64} height={64} alt='pokemon' />
            </div>
            <div>
              <h2 className='font-bold'>{p.name}</h2>
              <p className='text-sm opacity-80'>{p.description}</p>
              <span className='text-xs opacity-50'>score: {p.score.toFixed(3)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
