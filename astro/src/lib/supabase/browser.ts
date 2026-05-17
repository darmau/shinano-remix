import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "~/types/supabase";

export function createSupabaseBrowser(
  supabaseUrl: string,
  supabaseAnonKey: string,
) {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 14,
      path: "/",
      sameSite: "lax",
    },
  });
}
