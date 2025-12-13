import { generateEmbedding } from '@/libs/embeddings';
import { searchVector } from '@/libs/vector-db';

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query) {
    return new Response(JSON.stringify({ error: 'Query is required' }), {
      status: 400,
    });
  }

  // Step 1: convert text to embedding
  const queryEmbedding = await generateEmbedding(query);

  // Step 2: semantic search
  const results = await searchVector(queryEmbedding);

  return Response.json({ results });
}
