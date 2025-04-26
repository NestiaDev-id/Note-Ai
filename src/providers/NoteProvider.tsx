"use client";

import { useState } from "react";
import { createContext } from "react";

type NoteProviderContextType = {
  noteText: string;
  setNoteText: (text: string) => void;
};

export const NoteProviderContext = createContext<NoteProviderContextType>({
  noteText: "",
  setNoteText: () => {},
});

function NoteProvider({ children }: { children: React.ReactNode }) {
  const [noteText, setNoteText] = useState<string>("");

  return (
    <NoteProviderContext.Provider value={{ noteText, setNoteText }}>
      {children}
    </NoteProviderContext.Provider>
  );
}

export default NoteProvider;
