import "server-only";

import { NextResponse } from "next/server";
import { auth } from "@/app/(auth)/auth";
import { deleteAllDocuments } from "@/lib/rag";

export async function DELETE(request: Request): Promise<NextResponse> {
  // 1. Require an authenticated user
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Delete all documents for this user
  try {
    const result = await deleteAllDocuments(session.user.id);
    return NextResponse.json({
      success: true,
      deleted: result.deleted,
      message: `Deleted ${result.deleted} document chunks from RAG.`,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Delete failed";
    return NextResponse.json({ error: `Delete error: ${msg}` }, { status: 500 });
  }
}
