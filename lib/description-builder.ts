import { AnimeTypes } from './types';

function trimSynopsis(text: string, max = 500) {
  if (text.length <= max) return text;
  return text.slice(0, max) + '...';
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
