"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getUser() {
  try {
    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name) {
            const cookieStore = await cookies();
            return cookieStore.get(name)?.value;
          },
          async set(name, value, options) {
            // Cookie setting is handled by middleware
          },
          async remove(name) {
            // Cookie removal is handled by middleware
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Error in getUser:", error);
    return null;
  }
}

// Helper function to create a Supabase client (used by other server actions)
export async function createClient() {
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name) {
          const cookieStore = await cookies();
          return cookieStore.get(name)?.value;
        },
        async set(name, value, options) {
          // Cookie setting is handled by middleware
        },
        async remove(name) {
          // Cookie removal is handled by middleware
        },
      },
    }
  );
}
