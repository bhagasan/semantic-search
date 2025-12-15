import { pipeline } from '@xenova/transformers';

let embedder: Awaited<ReturnType<typeof pipeline>> | null = null;

export async function embed(text: string): Promise<number[]> {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }

  const output = await embedder(text, {
    pooling: 'mean',
    normalize: true,
  });

  return Array.from(output.data);
}
