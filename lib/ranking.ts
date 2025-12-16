import { PokemonEmbedding } from './types';
import { cosineSimilarity } from './similarity';

export function parseQuery(q: string) {
  const lower = q.toLowerCase();
  return {
    wantsWater: lower.includes('water'),
    wantsBig: lower.includes('big') || lower.includes('large'),
  };
}

export function rankPokemon(pokemon: PokemonEmbedding, queryEmbedding: number[], rules: ReturnType<typeof parseQuery>) {
  const semanticScore = cosineSimilarity(queryEmbedding, pokemon.embedding);

  // threshold untuk buang noise
  if (semanticScore < 0.6) return null;

  // rule score (penalty, bukan filter)
  let ruleScore = 1;
  if (rules.wantsWater && !pokemon.types.includes('water')) {
    ruleScore -= 0.5;
  }
  if (rules.wantsBig && pokemon.size !== 'big') {
    ruleScore -= 0.3;
  }
  ruleScore = Math.max(0, ruleScore);

  // soft boost (UX feel)
  let boostScore = 0;
  if (rules.wantsWater && pokemon.types.includes('water')) {
    boostScore += 0.1;
  }
  if (rules.wantsBig && pokemon.size === 'big') {
    boostScore += 0.1;
  }

  const finalScore = semanticScore * 0.65 + ruleScore * 0.25 + boostScore * 0.1;

  return {
    ...pokemon,
    score: finalScore,
    debug: {
      semanticScore,
      ruleScore,
      boostScore,
    },
  };
}
