import { createClient } from "@supabase/supabase-js";
import { getPublicEnv } from "~/lib/env";
import type { Database } from "~/types/supabase";

// Anonymous, cookieless Supabase client for prerender pages.
// Reads SUPABASE_URL / SUPABASE_ANON_KEY from build env via getPublicEnv().
export function createSupabaseBuild() {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = getPublicEnv();
  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
