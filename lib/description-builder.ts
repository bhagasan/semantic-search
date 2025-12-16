import { Pokemon, PokemonAbility, PokemonType, Species } from './types';

function buildTypeDescription(types: string[]) {
  if (types.length === 0) return '';

  const primary = types[0];

  if (types.length === 1) {
    return `a primarily ${primary}-type pokemon`;
  }

  const secondary = types.slice(1);

  return `a primarily ${primary}-type pokemon with secondary ${secondary.join(' and ')} characteristics`;
}

function buildSizeDescription(size: 'small' | 'medium' | 'big') {
  if (size === 'small') return 'This is a notably small-sized pokemon with a compact body';
  if (size === 'big') return 'This is a notably big-sized pokemon with a massive and imposing body';
  return 'This pokemon has an average-sized body';
}

export function buildDescription(pokemon: Pokemon, species: Species): string {
  const name = pokemon.name;
  const types = pokemon.types.map((t: PokemonType) => t.type.name);
  const abilities = pokemon.abilities.map((a: PokemonAbility) => a.ability.name);

  // const height = pokemon.height;
  const weight = pokemon.weight;
  const typeDescription = buildTypeDescription(types);

  const size = weight < 300 ? 'small' : weight < 700 ? 'medium' : 'big';
  // bisa pake weight

  const habitat = species.habitat?.name ?? 'various environments';
  // const shape = species.shape?.name ?? 'unknown shape';

  return `
      ${name} is ${typeDescription}.
      ${buildSizeDescription(size)}, and weighs around ${weight}.
      This pokemon is known for abilities such as ${abilities.join(', ')}.
      ${name} is commonly found in ${habitat}.`.trim();
}
