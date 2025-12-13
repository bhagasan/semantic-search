import docs from '@/data/docs.json';
import { generateEmbedding } from '@/libs/embeddings';
import { saveEmbedding } from '@/libs/vector-db';

export async function POST() {
  for (const doc of docs) {
    const embedding = await generateEmbedding(doc.text);
    await saveEmbedding(doc.id, doc.text, embedding);
  }

  return Response.json({ status: 'ok' });
}
