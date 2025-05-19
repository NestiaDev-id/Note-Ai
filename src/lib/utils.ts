import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleError(error: unknown) {
  console.error("Error:", error);
  return {
    errorMessage: error instanceof Error ? error.message : "An unexpected error occurred",
    userId: undefined,
    noteId: undefined
  } as const;
}
