import { AnimeEmbedding, RankedAnime } from './types';
import { cosineSimilarity } from './similarity';

export function rankAnime(anime: AnimeEmbedding, queryEmbedding: number[]): RankedAnime | null {
  const score = cosineSimilarity(anime.embedding, queryEmbedding);

  if (score < 0.2) return null;

  return {
    ...anime,
    score,
  };
}
