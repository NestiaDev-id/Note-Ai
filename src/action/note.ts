"use server";

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const updateNoteAction = async (noteId: string, text: string) => {
  try {
    const user = await getUser();

    await prisma.note.update({
      where: {
        id: noteId,
        authorId: user?.id || undefined,
      },
      data: {
        text,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};
