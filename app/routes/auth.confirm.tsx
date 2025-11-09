import { Form, Link, useActionData, useLoaderData, useNavigation } from "react-router";
import { redirect } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import type { EmailOtpType } from "@supabase/supabase-js";
import ConfirmText from "~/locales/confirm";
import getLanguageLabel from "~/utils/getLanguageLabel";
import { createClient } from "~/utils/supabase/server";

const SUPPORTED_LANGS = ["zh", "en", "jp"] as const;

type SupportedLang = (typeof SUPPORTED_LANGS)[number];

type LoaderData =
    | {
  status: "prompt";
  redirectUrl: string;
  lang: SupportedLang;
  next: string;
}
    | {
  status: "error";
  lang: SupportedLang;
  reason: "missing" | "invalid";
  next: string;
};

type ActionData = {
  error: "missing" | "invalid";
  lang: SupportedLang;
};

function deriveLang(input?: string | null): SupportedLang {
  if (!input) {
    return "zh";
  }

  try {
    const url = new URL(input, "http://placeholder");
    const segments = url.pathname.split("/").filter(Boolean);
    const candidate = segments[0];
    if (candidate && SUPPORTED_LANGS.includes(candidate as SupportedLang)) {
      return candidate as SupportedLang;
    }
  } catch {
    const segments = input.split("/").filter(Boolean);
    const candidate = segments[0];
    if (candidate && SUPPORTED_LANGS.includes(candidate as SupportedLang)) {
      return candidate as SupportedLang;
    }
  }

  return "zh";
}

function getAllowedOrigins(siteOrigin: string, supabaseUrl?: string | null): string[] {
  const origins = new Set<string>([siteOrigin]);
  if (supabaseUrl) {
    try {
      origins.add(new URL(supabaseUrl).origin);
    } catch {
      // ignore invalid supabase url
    }
  }
  return Array.from(origins);
}

function buildRedirectUrl(
    rawRedirect: string,
    allowedOrigins: string[],
    extraParams: URLSearchParams
): URL | null {
  let parsed: URL | null = null;

  try {
    parsed = new URL(rawRedirect);
  } catch {
    for (const baseOrigin of allowedOrigins) {
      try {
        parsed = new URL(rawRedirect, baseOrigin);
        break;
      } catch {
        continue;
      }
    }
  }

  if (!parsed) {
    return null;
  }

  if (!allowedOrigins.includes(parsed.origin)) {
    return null;
  }

  extraParams.forEach((value, key) => {
    if (!parsed!.searchParams.has(key)) {
      parsed!.searchParams.append(key, value);
    }
  });

  return parsed!;
}

function extractNext(
    redirectUrl: URL,
    fallback: string
): string {
  const directNext = redirectUrl.searchParams.get("next");
  if (directNext) {
    return directNext;
  }

  const redirectTo = redirectUrl.searchParams.get("redirect_to");
  if (redirectTo) {
    try {
      const nested = new URL(redirectTo);
      const nestedNext = nested.searchParams.get("next");
      if (nestedNext) {
        return nestedNext;
      }
      return nested.pathname || fallback;
    } catch {
      return fallback;
    }
  }

  return fallback;
}

export async function loader({ request, context }: LoaderFunctionArgs): Promise<LoaderData | Response> {
  const requestUrl = new URL(request.url);
  const supabaseUrl = context.cloudflare?.env?.SUPABASE_URL as string | undefined;
  const allowedOrigins = getAllowedOrigins(requestUrl.origin, supabaseUrl);
  const searchParams = new URLSearchParams(requestUrl.search);
  const redirectParam = searchParams.get("redirect");
  const nextQuery = searchParams.get("next") ?? "/";
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");

  if (redirectParam) {
    const extraParams = new URLSearchParams(searchParams);
    extraParams.delete("redirect");
    const redirectUrl = buildRedirectUrl(redirectParam, allowedOrigins, extraParams);

    if (!redirectUrl) {
      const lang = deriveLang(nextQuery);
      return {
        status: "error",
        lang,
        reason: "invalid",
        next: nextQuery,
      };
    }

    const next = extractNext(redirectUrl, nextQuery);
    const lang = deriveLang(next);

    return {
      status: "prompt",
      redirectUrl: redirectUrl.toString(),
      lang,
      next,
    };
  }

  if (code || (token_hash && type)) {
    const { supabase, headers } = createClient(request, context);
    const segments = nextQuery.split("/").filter(Boolean);
    const fallbackLang =
        SUPPORTED_LANGS.includes((segments[0] as SupportedLang) ?? "zh")
            ? (segments[0] as SupportedLang)
            : "zh";

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return redirect(nextQuery, { headers });
      }
    }

    if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type,
      });

      if (!error) {
        return redirect(nextQuery, { headers });
      }
    }

    return redirect(`/${fallbackLang}/login?error=magic_link`, { headers });
  }

  const lang = deriveLang(nextQuery);

  return {
    status: "error",
    lang,
    reason: "missing",
    next: nextQuery,
  };
}

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const redirectTarget = formData.get("redirect");
  const nextPath = formData.get("next") as string | null;
  const lang = deriveLang(formData.get("lang") as string | null);

  // Initialize Supabase client to ensure cookies are handled
  const { supabase, headers } = createClient(request, context);

  if (!redirectTarget || typeof redirectTarget !== "string") {
    const responseHeaders = new Headers(headers);
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
    return new Response(
      JSON.stringify({
        error: "missing",
        lang,
      } satisfies ActionData),
      {
        status: 400,
        headers: responseHeaders,
      }
    );
  }

  const requestUrl = new URL(request.url);
  const supabaseUrl = context.cloudflare?.env?.SUPABASE_URL as string | undefined;
  const allowedOrigins = getAllowedOrigins(requestUrl.origin, supabaseUrl);
  
  // Parse the redirect URL to extract token and type
  let parsedRedirect: URL;
  try {
    parsedRedirect = new URL(redirectTarget);
  } catch {
    const responseHeaders = new Headers(headers);
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
    return new Response(
      JSON.stringify({
        error: "invalid",
        lang,
      } satisfies ActionData),
      {
        status: 400,
        headers: responseHeaders,
      }
    );
  }

  // Check if this is a Supabase verify URL with a token
  if (parsedRedirect.pathname.includes("/auth/v1/verify")) {
    const token = parsedRedirect.searchParams.get("token");
    const type = parsedRedirect.searchParams.get("type") as EmailOtpType | null;
    
    if (token && type && token.startsWith("pkce_")) {
      // This is a PKCE token, we need to verify it directly
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type,
      });

      if (!error) {
        const finalNext = nextPath ?? `/${lang}`;
        return redirect(finalNext, { headers });
      }

      const responseHeaders = new Headers(headers);
      responseHeaders.set("Content-Type", "application/json; charset=utf-8");
      return new Response(
        JSON.stringify({
          error: "invalid",
          lang,
        } satisfies ActionData),
        {
          status: 400,
          headers: responseHeaders,
        }
      );
    }
  }

  // For other URLs, validate and redirect
  const validatedRedirect = buildRedirectUrl(
      redirectTarget,
      allowedOrigins,
      new URLSearchParams()
  );

  if (!validatedRedirect) {
    const responseHeaders = new Headers(headers);
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
    return new Response(
      JSON.stringify({
        error: "invalid",
        lang,
      } satisfies ActionData),
      {
        status: 400,
        headers: responseHeaders,
      }
    );
  }

  return redirect(validatedRedirect.toString(), { headers });
}

export default function ConfirmPage() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();

  const lang = data.status === "prompt" ? data.lang : data.lang;
  const labels = getLanguageLabel(ConfirmText, lang);
  const isSubmitting = navigation.state === "submitting";
  const loginPath = `/${lang}/login`;

  const errorKey = actionData?.error ?? (data.status === "error" ? data.reason : null);
  const errorMessage =
      errorKey === "invalid"
          ? labels.invalid
          : errorKey === "missing"
              ? labels.missing
              : null;

  if (data.status !== "prompt") {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col justify-center px-4 py-16">
          <div className="mx-auto w-full max-w-md bg-white p-10 shadow sm:rounded-lg">
            <h1 className="text-2xl font-semibold text-zinc-900 text-center">{labels.title}</h1>
            <p className="mt-4 text-sm text-zinc-600 text-center">
              {errorMessage ?? labels.missing}
            </p>
            <div className="mt-8">
              <Link
                  to={loginPath}
                  className="block w-full text-center rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              >
                {labels.back_to_login}
              </Link>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-zinc-50 flex flex-col justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-md bg-white p-10 shadow sm:rounded-lg">
          <h1 className="text-2xl font-semibold text-zinc-900 text-center">{labels.title}</h1>
          <p className="mt-4 text-sm text-zinc-600 text-center">{labels.description}</p>
          {errorMessage && (
              <div className="mt-6 rounded-md bg-red-50 p-4 text-sm text-red-600 text-center">
                {errorMessage}
              </div>
          )}
          <Form method="POST" className="mt-8 space-y-4">
            <input type="hidden" name="redirect" value={data.redirectUrl}/>
            <input type="hidden" name="next" value={data.next}/>
            <input type="hidden" name="lang" value={data.lang}/>
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
            >
              {labels.button}
            </button>
          </Form>
        </div>
      </div>
  );
}
