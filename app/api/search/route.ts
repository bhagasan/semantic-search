import data from '@/data/pokemon-embeddings.json';
import { embed } from '@/lib/embedder';
import { cosine } from '@/lib/cosine';

interface Pokemon {
  vector: number[];
  [key: string]: unknown;
}

const pokemonData = (data as Array<{ id: number; name: string; description: string; embedding: number[] }>).map(
  (p) => ({
    ...p,
    vector: p.embedding,
  }),
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  if (!q.trim()) {
    return Response.json({ results: [] });
  }

  const queryVector = await embed(q);

  const results = pokemonData
    .map((p: Pokemon) => ({
      ...p,
      score: cosine(queryVector, p.vector),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return Response.json({ results });
}
