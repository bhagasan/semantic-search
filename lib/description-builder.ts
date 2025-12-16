import { Pokemon, PokemonAbility, PokemonType, Species } from './types';

function buildTypeBlock(types: string[]) {
  if (types.length === 0) return '';

  const primary = types[0];
  const secondary = types.slice(1);

  if (secondary.length === 0) {
    return `
Primary type: ${primary}.
This pokemon is a pure ${primary}-type pokemon.
    `.trim();
  }

  return `
Primary type: ${primary}.
Secondary types: ${secondary.join(', ')}.
This pokemon is a primarily ${primary}-type pokemon with secondary ${secondary.join(' and ')} characteristics.
  `.trim();
}

function buildSizeBlock(size: 'small' | 'medium' | 'big') {
  if (size === 'small') {
    return `
      Size category: small.
      This is a notably small-sized pokemon with a compact body.
          `.trim();
  }

  if (size === 'big') {
    return `
      Size category: big.
      This is a notably big-sized pokemon with a massive and imposing body.
          `.trim();
  }

  return `
      Size category: medium.
      This pokemon has an average-sized body.
        `.trim();
}

export function buildDescription(pokemon: Pokemon, species: Species): string {
  const name = pokemon.name;

  const types = pokemon.types.map((t: PokemonType) => t.type.name);
  const abilities = pokemon.abilities.map((a: PokemonAbility) => a.ability.name);

  const weight = pokemon.weight;
  const size: 'small' | 'medium' | 'big' = weight < 300 ? 'small' : weight < 700 ? 'medium' : 'big';

  const habitat = species.habitat?.name ?? 'various environments';

  const typeBlock = buildTypeBlock(types);
  const sizeBlock = buildSizeBlock(size);

  return `
${name} is a pokemon species.

${typeBlock}

${sizeBlock}

Weight: ${weight}.
Known abilities: ${abilities.join(', ')}.
Common habitat: ${habitat}.

In battle, this pokemon primarily uses ${types[0]}-based attacks.
  `.trim();
}
