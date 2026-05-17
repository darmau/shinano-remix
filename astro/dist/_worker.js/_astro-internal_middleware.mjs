globalThis.process ??= {}; globalThis.process.env ??= {};
import { s as sequence, d as defineMiddleware } from './chunks/index_B7amf1G_.mjs';
import { b as createStorageFromOptions, c as createClient, m as memoryLocalStorageAdapter, a as applyServerStorage, V as VERSION, s as serializeCookieHeader, p as parseCookieHeader } from './chunks/index_BiJjDeYY.mjs';
import { L as LOCALES, g as getLang } from './chunks/getLang_DVpWAtTa.mjs';
import './chunks/astro-designed-error-pages_bXni2CTi.mjs';
import './chunks/astro/server_D3oA7eJe.mjs';

function createServerClient(supabaseUrl, supabaseKey, options) {
    if (!supabaseUrl || !supabaseKey) {
        throw new Error(`Your project's URL and Key are required to create a Supabase client!\n\nCheck your Supabase project's API settings to find these values\n\nhttps://supabase.com/dashboard/project/_/settings/api`);
    }
    const { storage, getAll, setAll, setItems, removedItems } = createStorageFromOptions({
        ...options,
        cookieEncoding: options?.cookieEncoding ?? "base64url",
    }, true);
    const client = createClient(supabaseUrl, supabaseKey, {
        // TODO: resolve type error
        ...options,
        global: {
            ...options?.global,
            headers: {
                ...options?.global?.headers,
                "X-Client-Info": `supabase-ssr/${VERSION} createServerClient`,
            },
        },
        auth: {
            ...(options?.cookieOptions?.name
                ? { storageKey: options.cookieOptions.name }
                : null),
            ...options?.auth,
            flowType: "pkce",
            autoRefreshToken: false,
            detectSessionInUrl: false,
            persistSession: true,
            storage,
            ...(options?.cookies &&
                "encode" in options.cookies &&
                options.cookies.encode === "tokens-only"
                ? {
                    userStorage: options?.auth?.userStorage ?? memoryLocalStorageAdapter(),
                }
                : null),
        },
    });
    client.auth.onAuthStateChange(async (event) => {
        // The SIGNED_IN event is fired very often, but we don't need to
        // apply the storage each time it fires, only if there are changes
        // that need to be set -- which is if setItems / removeItems have
        // data.
        const hasStorageChanges = Object.keys(setItems).length > 0 || Object.keys(removedItems).length > 0;
        if (hasStorageChanges &&
            (event === "SIGNED_IN" ||
                event === "TOKEN_REFRESHED" ||
                event === "USER_UPDATED" ||
                event === "PASSWORD_RECOVERY" ||
                event === "SIGNED_OUT" ||
                event === "MFA_CHALLENGE_VERIFIED")) {
            await applyServerStorage({ getAll, setAll, setItems, removedItems }, {
                cookieOptions: options?.cookieOptions ?? null,
                cookieEncoding: options?.cookieEncoding ?? "base64url",
            });
        }
    });
    return client;
}

function createSupabaseServer(ctx) {
  const setCookies = [];
  const env = ctx.locals.runtime.env;
  const client = createServerClient(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY,
    {
      cookieOptions: {
        maxAge: 60 * 60 * 24 * 14,
        path: "/",
        sameSite: "lax"
      },
      cookies: {
        getAll() {
          return parseCookieHeader(ctx.request.headers.get("Cookie") ?? "").map(
            (c) => ({ name: c.name, value: c.value ?? "" })
          );
        },
        setAll(toSet) {
          for (const { name, value, options } of toSet) {
            setCookies.push(serializeCookieHeader(name, value, options));
          }
        }
      }
    }
  );
  return { client, setCookies };
}

const MULTI_LANG_TOP_PATHS = /* @__PURE__ */ new Set([
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
  "unsubscribe"
]);
const langRedirect = defineMiddleware(async ({ request, url }, next) => {
  const first = url.pathname.split("/")[1] ?? "";
  if (LOCALES.includes(first)) return next();
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
    data: { session }
  } = await client.auth.getSession();
  ctx.locals.session = session;
  const response = await next();
  for (const c of setCookies) {
    response.headers.append("Set-Cookie", c);
  }
  return response;
});
const onRequest$2 = sequence(langRedirect, supabaseMiddleware);

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	onRequest$2
	
);

export { onRequest };
