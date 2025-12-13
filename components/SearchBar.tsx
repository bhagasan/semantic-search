'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');

  return (
    <div className='flex gap-2 w-full max-w-xl'>
      <input
        className='border p-2 rounded w-full'
        placeholder='Search with AI...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className='px-4 py-2 bg-black text-white rounded' onClick={() => onSearch(query)}>
        Search
      </button>
    </div>
  );
}
