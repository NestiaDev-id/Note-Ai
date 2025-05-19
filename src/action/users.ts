"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export const loginUserAction = async (email: string, password: string): Promise<
  | { errorMessage: string; userId?: never; noteId?: never }
  | { errorMessage: null; userId: string; noteId: string | undefined }
> => {
  try {
    const { auth } = await createClient();

    const { data, error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Login failed", error);
      throw new Error("Login failed. Please check your credentials.");
    }

    // Get user's latest note for redirect
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    const latestNoteId = user?.notes[0]?.id;

    return { 
      errorMessage: null,
      userId: data.user?.id as string,
      noteId: latestNoteId
    };
  } catch (error) {
    return handleError(error);
  }
};

export const signUpUserAction = async (email: string, password: string) => {
  let authData;
  try {
    // First check if user exists in database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already registered. Please login instead.");
    }

    const { auth } = await createClient();
    const { data, error } = await auth.signUp({
      email,
      password,
    });
    authData = data;

    if (error) {
      throw new Error(`Signup failed: ${error.message}`);
    }

    const userId = data.user?.id;
    if (!userId) throw new Error("Error signing up");

    try {
      // Create user in database
    await prisma.user.create({
      data: {
        id: userId,
        email,
      },
    });

      // Create initial note
      const noteId = uuidv4();
      await prisma.note.create({
        data: {
          id: noteId,
          authorId: userId,
          text: "Welcome to Note AI! This is your first note.",
        },
      });

    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new Error("This email is already registered. Please login instead.");
        }
      }
      throw e;
    }

    return { errorMessage: null };
  } catch (error) {
    // If there was an error, try to clean up the auth user if it was created
    if (authData?.user?.id) {
      try {
        const { auth } = await createClient();
        await auth.admin.deleteUser(authData.user.id);
      } catch (cleanupError) {
        console.error("Error cleaning up auth user after failed signup:", cleanupError);
      }
    }
    return handleError(error);
  }
};

export const logoutUserAction = async () => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signOut();

    if (error) throw error;

    return {
      errorMessage: null,
    };
  } catch (error) {
    return handleError(error);
  }
};
