import fs from 'fs';
import path from 'path';
import { embed } from '../lib/embedder';
import { AnimeEmbedding, AnimeTypes } from '../lib/types';
import { buildAnimeEmbeddingText } from '@/lib/description-builder';

const OUTPUT = path.join(process.cwd(), 'data/anime-embeddings.json');
const LIMIT = 25;

async function fetchJSON(url: string) {
  const res = await fetch(url);
  return res.json();
}

async function generate() {
  const response = await fetchJSON(`https://api.jikan.moe/v4/top/anime?sfw=true&limit=${LIMIT}&filter=bypopularity`);

  if (!response || !Array.isArray(response.data)) {
    console.error('❌ Unexpected Jikan response:', response);
    return;
  }

  const results: AnimeEmbedding[] = [];

  for (const a of response.data as AnimeTypes[]) {
    const embedding = await embed(buildAnimeEmbeddingText(a));

    results.push({
      id: a.mal_id,
      title: a.title,
      synopsis: a.synopsis ?? '',
      genreList: a.genres.map((g) => g.name),
      image: a.images.webp.image_url,
      embedding,
    });
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(results, null, 2));
  console.log('✅ Embeddings generated:', results.length);
}

generate();
