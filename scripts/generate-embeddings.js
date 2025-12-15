import fs from 'fs';
import { embed } from '../lib/embedder.js';

const OUTPUT = 'data/pokemon-embeddings.json';

async function run() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=300');
  const list = await res.json();

  const data = [];

  for (const p of list.results) {
    const detail = await fetch(p.url).then((r) => r.json());

    const description = `
      ${p.name} is a pokemon with types ${detail.types.map((t) => t.type.name).join(', ')}.
      Height ${detail.height}. Weight ${detail.weight}.
    `;

    const vector = await embed(description);

    data.push({
      name: p.name,
      description,
      sprite: detail.sprites.front_default,
      vector,
    });

    fs.writeFileSync(OUTPUT, JSON.stringify(data, null, 2));
    console.log('embedded:', p.name);
  }

  console.log('DONE:', data.length);
}

run();
