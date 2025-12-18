import { AnimeEmbedding, RankedAnime, AnimeTypes } from './types';

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return dot;
}

function trimSynopsis(text: string, max = 500) {
  if (text.length <= max) return text;
  return text.slice(0, max) + '...';
}

export function rankAnime(anime: AnimeEmbedding, queryEmbedding: number[]): RankedAnime | null {
  const score = cosineSimilarity(anime.embedding, queryEmbedding);

  if (score < 0.4) return null;

  return {
    ...anime,
    score,
  };
}

export function buildAnimeEmbeddingText(a: AnimeTypes) {
  const genres = a.genres.map((g) => g.name).join(', ');

  return `
    Title: ${a.title}

    This anime belongs to the genres: ${genres}.

    Story summary:
    ${trimSynopsis(a.synopsis ?? 'No synopsis available.', 500)}

    Themes: ${genres}, anime, japanese animation, animated series.
      `.trim();
}
