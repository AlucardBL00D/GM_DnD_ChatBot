import "server-only";

import { voyage } from "@ai-sdk/voyage";
import { embed, embedMany } from "ai";
import postgres from "postgres";

const client = postgres(process.env.POSTGRES_URL ?? "");

// Voyage AI free tier: 200 million tokens free, no credit card required.
// voyage-3-lite produces 512-dimensional embeddings — fast and free.
const embeddingModel = voyage.textEmbeddingModel("voyage-3-lite");

// ---------------------------------------------------------------------------
// Chunking
// ---------------------------------------------------------------------------

/**
 * Splits a long piece of text into smaller overlapping chunks.
 *
 * Why overlap? Because important sentences often span a chunk boundary.
 * By repeating a few words at the start of each chunk, we avoid cutting
 * a sentence right at the boundary and losing its meaning.
 *
 * chunkSize = how many words per chunk (400 is a good default)
 * overlap   = how many words to repeat at the start of the next chunk
 */
function chunkText(text: string, chunkSize = 400, overlap = 50): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ").trim();
    if (chunk.length > 0) chunks.push(chunk);
    if (i + chunkSize >= words.length) break;
  }

  return chunks;
}

// ---------------------------------------------------------------------------
// Ingest (store a new document)
// ---------------------------------------------------------------------------

/**
 * Takes the full text of a document, chunks it, generates an embedding for
 * each chunk using Voyage AI, and saves everything to the database.
 *
 * Call this after a file has been uploaded to Vercel Blob.
 */
export async function ingestDocument({
  text,
  fileName,
  blobUrl,
  userId,
}: {
  text: string;
  fileName: string;
  blobUrl: string;
  userId: string;
}) {
  const chunks = chunkText(text);
  if (chunks.length === 0) return { chunks: 0 };

  // embedMany() sends all chunks to the embedding model in one API call,
  // which is much faster than calling embed() in a loop.
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  // Insert each chunk with its embedding into the database.
  // We use raw SQL here because Drizzle's .values() does not support
  // the ::vector cast that Postgres needs to store vector data.
  for (let i = 0; i < chunks.length; i++) {
    const vectorStr = `[${embeddings[i].join(",")}]`;
    await client`
      INSERT INTO "DocumentChunk" ("fileName", "blobUrl", "content", "embedding", "userId")
      VALUES (${fileName}, ${blobUrl}, ${chunks[i]}, ${vectorStr}::vector, ${userId}::uuid)
    `;
  }

  return { chunks: chunks.length };
}

// ---------------------------------------------------------------------------
// Search (find relevant chunks for a query)
// ---------------------------------------------------------------------------

export type ChunkResult = {
  fileName: string;
  content: string;
  similarity: number;
};

/**
 * Converts a search query into a Voyage AI embedding and finds the most
 * similar document chunks stored in the database using cosine similarity.
 *
 * Only returns results above 0.4 similarity to filter irrelevant matches.
 */
export async function findRelevantChunks(
  query: string,
  limit = 5,
): Promise<ChunkResult[]> {
  const { embedding } = await embed({ model: embeddingModel, value: query });
  const vectorStr = `[${embedding.join(",")}]`;

  const results = await client<ChunkResult[]>`
    SELECT
      "fileName",
      "content",
      (1 - ("embedding" <=> ${vectorStr}::vector))::float AS similarity
    FROM "DocumentChunk"
    WHERE "embedding" IS NOT NULL
      AND 1 - ("embedding" <=> ${vectorStr}::vector) > 0.4
    ORDER BY similarity DESC
    LIMIT ${limit}
  `;

  return results;
}

// ---------------------------------------------------------------------------
// Delete (remove all documents for a user)
// ---------------------------------------------------------------------------

/**
 * Deletes all document chunks for a specific user from the RAG database.
 * This completely clears the RAG of all their uploaded documents.
 */
export async function deleteAllDocuments(userId: string): Promise<{ deleted: number }> {
  const result = await client`
    DELETE FROM "DocumentChunk"
    WHERE "userId" = ${userId}::uuid
  `;

  // result.count contains the number of rows deleted
  return { deleted: result.count || 0 };
}
