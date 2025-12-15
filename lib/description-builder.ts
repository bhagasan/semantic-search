import { Pokemon, PokemonAbility, PokemonType, Species } from './types';

export function buildDescription(pokemon: Pokemon, species: Species): string {
  const name = pokemon.name;
  const types = pokemon.types.map((t: PokemonType) => t.type.name);
  const abilities = pokemon.abilities.map((a: PokemonAbility) => a.ability.name);

  const height = pokemon.height;
  const weight = pokemon.weight;

  const size = height < 14 ? 'small' : 'big';

  const habitat = species.habitat?.name ?? 'various environments';
  const shape = species.shape?.name ?? 'unknown shape';

  return `
    ${name} is a ${size} ${types.join('-type ')} pokemon.
    It has a ${shape} body and weighs around ${weight}.
    This pokemon is known for abilities such as ${abilities.join(', ')}.
    It primarily uses ${types.join(' and ')}-based powers in battle.
    ${name} is commonly found in ${habitat}.
    `.trim();
}
