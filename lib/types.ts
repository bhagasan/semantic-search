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

export interface AnimeTypes {
  mal_id: number;
  title: string;
  url: string;
  synopsis: string | null;
  images: {
    jpg: {
      image_url: string;
    };
    webp: {
      image_url: string;
    };
  };
  genres: {
    mal_id: number;
    name: string;
    url: string;
  }[];
}

export interface AnimeEmbedding {
  id: number;
  title: string;
  synopsis: string;
  genreList: string[];
  image: string;
  embedding: number[];
}

export type RankedAnime = AnimeEmbedding & {
  score: number;
};
