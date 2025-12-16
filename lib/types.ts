export type DetailInfo = {
  name: string;
  url: string;
};

export type PokemonType = {
  type: DetailInfo;
};
export type PokemonAbility = {
  ability: DetailInfo;
};

export type PokemonSprites = {
  front_default: string;
};

export type Pokemon = {
  name: string;
  sprite: string;
  description: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  [key: string]: unknown;
};

export type PokemonShape = {
  name: string;
  url: string;
};

export type Species = {
  habitat: DetailInfo | null;
  shape: PokemonShape | null;
  [key: string]: unknown;
};

export interface PokemonEmbedding {
  id: number;
  name: string;
  types: string[];
  size: 'small' | 'medium' | 'big';
  description: string;
  sprites: string;
  embedding: number[];
}
