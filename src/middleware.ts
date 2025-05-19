import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.delete({ name, ...options });
        },
      },
    }
  );

  // Check auth status
  const { data: { session } } = await supabase.auth.getSession();

  // Handle auth routes
  const isAuthRoute = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/sign-up";
  
  if (isAuthRoute && session) {
    // If user is logged in and tries to access auth routes, redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthRoute && !session) {
    // If user is not logged in and tries to access protected routes, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
