import data from '@/data/pokemon-embeddings.json';
import { embed } from '@/lib/embedder';
import { parseQuery, rankPokemon } from '@/lib/ranking';
import { PokemonEmbedding } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const rules = parseQuery(query);

    const queryEmbedding = await embed(query);

    const results = (data as PokemonEmbedding[])
      .map((p) => rankPokemon(p, queryEmbedding, rules))
      .filter((p): p is Exclude<typeof p, null> => p !== null)
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
