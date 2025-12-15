import data from '@/data/pokemon-embeddings.json';
import { embed } from '@/lib/embedder';
import { cosineSimilarity } from '@/lib/similarity';
import { PokemonEmbedding } from '@/lib/types';

function parseQuery(q: string) {
  return {
    wantsWater: q.includes('water'),
    wantsBig: q.includes('big'),
  };
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const rules = parseQuery(query);

    let candidates: PokemonEmbedding[] = data as PokemonEmbedding[];

    if (rules.wantsWater) {
      candidates = candidates.filter((p: PokemonEmbedding) => p.types.includes('water'));
    }

    if (rules.wantsBig) {
      candidates = candidates.filter((p: PokemonEmbedding) => p.size === 'big');
    }

    const queryEmbedding = await embed(query);

    const results = candidates
      .map((p) => ({
        ...p,
        score: cosineSimilarity(queryEmbedding, p.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return Response.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
