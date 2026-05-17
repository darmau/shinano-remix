import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import type { APIContext } from "astro";
import type { Database } from "~/types/supabase";

// Creates a Supabase server client wired to Astro's APIContext. Any cookies
// the SSR client wants to write are collected into `setCookies`; the parent
// middleware (see src/middleware/index.ts) appends them to the response after
// `next()` so login state survives the navigation that triggered it.
export function createSupabaseServer(ctx: APIContext) {
  const setCookies: string[] = [];
  const env = ctx.locals.runtime.env;

  const client = createServerClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY,
    {
      cookieOptions: {
        maxAge: 60 * 60 * 24 * 14,
        path: "/",
        sameSite: "lax",
      },
      cookies: {
        getAll() {
          return parseCookieHeader(ctx.request.headers.get("Cookie") ?? "").map(
            (c) => ({ name: c.name, value: c.value ?? "" }),
          );
        },
        setAll(toSet) {
          for (const { name, value, options } of toSet) {
            setCookies.push(serializeCookieHeader(name, value, options));
          }
        },
      },
    },
  );

  return { client, setCookies };
}
