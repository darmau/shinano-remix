import { defineMiddleware, sequence } from "astro:middleware";
import { createSupabaseServer } from "~/lib/supabase/server";
import { getLang, LOCALES } from "~/lib/i18n/getLang";

// Paths that exist in all three languages — anything else (auth routes, sitemap,
// robots, rss xml files, api endpoints…) is excluded from the redirect.
const MULTI_LANG_TOP_PATHS = new Set([
  "",
  "article",
  "articles",
  "album",
  "albums",
  "thoughts",
  "thought",
  "about",
  "contact",
  "site",
  "rss",
  "signup",
  "login",
  "book",
  "terms-of-use",
  "unsubscribe",
]);

const langRedirect = defineMiddleware(async ({ request, url }, next) => {
  const first = url.pathname.split("/")[1] ?? "";
  if ((LOCALES as readonly string[]).includes(first)) return next();
  if (!MULTI_LANG_TOP_PATHS.has(first)) return next();

  const target = getLang(request);
  const dest = new URL(`/${target}${url.pathname}`, url);
  dest.search = url.search;
  return Response.redirect(dest, 307);
});

const supabaseMiddleware = defineMiddleware(async (ctx, next) => {
  const { client, setCookies } = createSupabaseServer(ctx);
  ctx.locals.supabase = client;

  const {
    data: { session },
  } = await client.auth.getSession();
  ctx.locals.session = session;

  const response = await next();
  for (const c of setCookies) {
    response.headers.append("Set-Cookie", c);
  }
  return response;
});

export const onRequest = sequence(langRedirect, supabaseMiddleware);
