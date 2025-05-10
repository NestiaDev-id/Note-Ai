import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { text } from "stream/consumers";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("noteId") || "";

  const { id } = await prisma.note.create({
    data: {
      authorId: userId,
      text: "",
    },
  });
  return NextResponse.json({ noteId: id });
}
