import type { APIContext } from "astro";

// Returns the public-ish env values the UI needs.
// - SSR path: Astro.locals.runtime.env (Cloudflare Workers runtime binding).
// - Prerender path: process.env (Cloudflare Workers Build inlines them at build time).
// Real secrets (TURNSTILE_SECRET_KEY, UNSUBSCRIBE_KEY) are not surfaced here;
// SSR-only endpoints read them straight from Astro.locals.runtime.env.
export function getPublicEnv(locals?: APIContext["locals"]) {
  const runtime = locals?.runtime?.env;
  const pick = (k: string) =>
    (runtime?.[k as keyof typeof runtime] as string | undefined) ??
    process.env[k] ??
    "";
  return {
    BASE_URL: pick("BASE_URL"),
    IMG_PREFIX: pick("IMG_PREFIX"),
    SUPABASE_URL: pick("SUPABASE_URL"),
    SUPABASE_ANON_KEY: pick("SUPABASE_ANON_KEY"),
    TURNSTILE_SITE_KEY: pick("TURNSTILE_SITE_KEY"),
  };
}
