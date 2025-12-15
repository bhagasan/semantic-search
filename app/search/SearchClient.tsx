'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';

interface SearchResult {
  content: string;
  score: number;
}

export default function SearchClient() {
  const [results, setResults] = useState<SearchResult[]>([]);

  async function handleSearch(query: string) {
    const res = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResults(data.results);
  }

  console.log({ results });

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <div className='mt-6 space-y-4'>
        {results?.map((item: SearchResult, i) => (
          <div key={i} className='p-4 border rounded'>
            <p>{item.content}</p>
            <p className='text-sm text-gray-500'>Score: {item.score.toFixed(4)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
