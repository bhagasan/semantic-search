import docs from '../data/docs.json';
import { generateEmbedding } from '../libs/embeddings';
import { saveEmbedding } from '../libs/vector-db';

async function run() {
  for (const doc of docs) {
    const embedding = await generateEmbedding(doc.text);
    await saveEmbedding(doc.id, doc.text, embedding);
  }

  console.log('✅ Embeddings generated');
}

run();
