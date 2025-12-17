import data from '@/data/anime-embeddings.json';
import { embed } from '@/lib/embedder';
import { rankAnime } from '@/lib/ranking';
import { RankedAnime } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.query || typeof body.query !== 'string') {
      return Response.json({ error: 'Query must be a non-empty string' }, { status: 400 });
    }

    const queryEmbedding = await embed(body.query);

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
