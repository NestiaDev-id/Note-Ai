"use client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  user: User | null;
};

function NewNoteButton({ user }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // const handleClickNewNoteButton = async () => {
  //   if (!user) {
  //     router.push("/login");
  //   } else {
  //     setLoading(true);

  //     const uuid = uuidv4();
  //     await createNoteAction(uuid);
  //     router.push(`/?noteId=${uuid}&toastType=newNote`);

  //     setLoading(false);
  //   }
  // };
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800 dark:text-gray-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </div>
  );
}

export default NewNoteButton;
