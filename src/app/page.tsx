import { getUser } from "@/auth/server";
import AskAiButton from "@/components/AskAiButton";
import { prisma } from "@/db/prisma";
import Image from "next/image";

type Props = {
  noteId: string | null;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

async function Home({ searchParams }: Props) {
  const user = await getUser();
  const noteIdParam = searchParams?.noteId;
  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam[0]
    : noteIdParam || "";

  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      authorId: user?.id || undefined,
    },
  });

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end">
        <AskAiButton user={user} />
        <NewNoteButton user={user} />
      </div>
      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
    </div>
  );
}

export default Home;
