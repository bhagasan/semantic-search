import fs from 'fs';
import fetch from 'node-fetch';
import { buildDescription } from '../lib/description-builder';
import { embed } from '../lib/embedder';
import { Pokemon, Species } from '../lib/types';

const POKEMON_LIMIT = 300;

async function fetchJSON(url: string) {
  const res = await fetch(url);
  return res.json();
}

async function main() {
  const results = [];

  for (let id = 1; id <= POKEMON_LIMIT; id++) {
    console.log(`Processing Pokémon #${id}`);

    const pokemon: Pokemon = (await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`)) as Pokemon;

    const species: Species = (await fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`)) as Species;

    // 👉 INI BAGIAN PENTING
    const description = buildDescription(pokemon, species);

    const vector = await embed(description);

    results.push({
      id,
      name: pokemon.name,
      description,
      embedding: vector,
      sprite: pokemon.sprites.front_default,
    });
  }

  fs.writeFileSync('./data/pokemon-embeddings.json', JSON.stringify(results, null, 2));

  console.log('Embedding generation complete ✅');
}

main();
