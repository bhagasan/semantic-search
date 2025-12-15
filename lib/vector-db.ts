import { sql } from '@vercel/postgres';

/**
 * Save document embedding
 */
export async function saveEmbedding(id: number, content: string, embedding: number[]) {
  await sql`
    INSERT INTO documents (id, content, embedding)
    VALUES (${id}, ${content}, ${JSON.stringify(embedding)})
    ON CONFLICT (id)
    DO UPDATE SET
      content = EXCLUDED.content,
      embedding = EXCLUDED.embedding;
  `;
}

/**
 * Semantic search using cosine distance
 */
export async function searchVector(queryEmbedding: number[], limit = 5) {
  const result = await sql`
    SELECT
      id,
      content,
      1 - (embedding <=> ${JSON.stringify(queryEmbedding)}) AS score
    FROM documents
    ORDER BY embedding <=> ${JSON.stringify(queryEmbedding)}
    LIMIT ${limit};
  `;

  return result.rows;
}
