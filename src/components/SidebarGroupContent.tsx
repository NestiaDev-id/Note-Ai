"use client";

import { Note } from "@prisma/client";

type Props = {
  notes: Note[];
};

function SidebarGroupContent({ notes }: Props) {
  return (
    <div>
      <p>Your note here</p>
    </div>
  );
}

export default SidebarGroupContent;
