import SearchClient from '@/app/search/SearchClient';

export default function SearchPage() {
  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold mb-4'>AI Semantic Search</h1>
      <SearchClient />
    </div>
  );
}
