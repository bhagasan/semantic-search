import data from '@/data/anime-embeddings.json';
import { embed } from '@/lib/embedder';
import { rankAnime } from '@/lib/helper';
import { RankedAnime } from '@/lib/types';

function normalizeAnimeQuery(query: string): string {
  const q = query.toLowerCase();

  // regex aman: whole word "anime"
  const hasAnime = /\banime\b/.test(q);

  if (hasAnime) return query;

  return `${query} anime`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.query || typeof body.query !== 'string') {
      return Response.json({ error: 'Query must be a non-empty string' }, { status: 400 });
    }

    const { query } = body;
    const normalizedQuery = normalizeAnimeQuery(query);
    const queryEmbedding = await embed(normalizedQuery);

    if (!Array.isArray(data)) {
      throw new Error('Embedding data is not an array');
    }

    const results: RankedAnime[] = data
      .map((a) => rankAnime(a, queryEmbedding))
      .filter((a): a is RankedAnime => Boolean(a))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return Response.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
