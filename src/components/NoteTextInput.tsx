import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { debounceTimeout } from "@/lib/constant";

type Props = {
  noteId: string | null;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout | null = null;

function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId");
  const { noteText, setNoteText } = useNote();

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(noteIdParam);
    }
  }, [startingNoteText, noteIdParam, noteId, setNoteText]);

  const handleUpdateNote = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    clearTimeout(updateTimeout!);
    updateTimeout = setTimeout(() => {
      updateNoteAction(noteId, text);
    }, debounceTimeout);
  };
  return (
    <Textarea
      value={noteText}
      onChange={(e) => handleUpdateNote(e.target.value)}
      placeholder="Type your note here..."
      className="custom-scrollbar resize-nonre placeholder:text-muted-foreground mb-4 h-full max-w-4xl border p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
}

export default NoteTextInput;
