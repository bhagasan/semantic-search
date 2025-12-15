import fs from 'fs';
import path from 'path';
import { embed } from '../lib/embedder';
import { buildDescription } from '../lib/description-builder';
import { PokemonEmbedding, PokemonType } from '../lib/types';

const OUTPUT = path.join(process.cwd(), 'data/pokemon-embeddings.json');

async function fetchJSON(url: string) {
  const res = await fetch(url);
  return res.json();
}

async function generate() {
  const results: PokemonEmbedding[] = [];

  for (let id = 1; id <= 151; id++) {
    console.log(`Processing Pokémon #${id}`);

    const pokemon = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const species = await fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

    const description = buildDescription(pokemon, species);

    const embedding = await embed(description);

    const size = pokemon.height < 14 ? 'small' : 'big';

    results.push({
      id,
      name: pokemon.name,
      types: pokemon.types.map((t: PokemonType) => t.type.name),
      size,
      description,
      embedding,
      sprites: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    });
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(results, null, 2));
  console.log('✅ Embeddings generated:', results.length);
}

generate();
