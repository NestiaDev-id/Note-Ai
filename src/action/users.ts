"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const loginUserAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Login failed", error);
      throw new Error("Login failed. Please check your credentials.");
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const signUpUserAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();

    const { data, error } = await auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(`Signup failed: ${error.message}`);
    }

    const userId = data.user?.id;
    if (!userId) throw new Error("Error signing up");

    await prisma.user.create({
      data: {
        id: userId,
        email,
      },
    });

    return { errorMessage: null };
  } catch (error) {
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
