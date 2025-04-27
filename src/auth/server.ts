import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  const client = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch (error) {
            console.error("Error setting cookies:", error);
          }
        },
      },
    },
  );
  return client;
}
export async function getUser() {
  try {
    const { auth } = await createClient();
    const userObject = await auth.getUser();

    if (userObject.error) {
      console.error("Error getting user:", userObject.error.message);
      return null;
    }

    return userObject.data.user;
  } catch (error) {
    console.error("Unexpected error in getUser:", error);
    return null;
  }
}
