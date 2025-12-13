import { openai } from './openai';

export async function generateEmbedding(text: string) {
  const embedding = await openai.embeddings.create({
    model: process.env.EMBEDDING_MODEL!,
    input: text,
  });

  return embedding.data[0].embedding;
}
