import { Form, Link, useActionData, useLoaderData, useNavigation } from "react-router";
import { redirect } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import type { EmailOtpType } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import ConfirmText from "~/locales/confirm";
import getLanguageLabel from "~/utils/getLanguageLabel";
import { createClient } from "~/utils/supabase/server";

// 同步用户信息到 public.users 表
async function syncUserToPublicTable(supabase: SupabaseClient) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    return;
  }

  const username = session.user.user_metadata?.name;
  
  if (!username) {
    return; // 没有用户名，无需同步
  }

  // 检查 public.users 表是否已存在该用户
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (existingUser) {
    // 更新现有记录
    await supabase
      .from("users")
      .update({ name: username })
      .eq("user_id", session.user.id);
  } else {
    // 插入新记录
    await supabase
      .from("users")
      .insert({
        user_id: session.user.id,
        name: username,
      });
  }
}

const SUPPORTED_LANGS = ["zh", "en", "jp"] as const;

type SupportedLang = (typeof SUPPORTED_LANGS)[number];

type LoaderData =
    | {
  status: "prompt";
  redirectUrl: string;
  lang: SupportedLang;
  next: string;
  needsUsername: boolean;
  userEmail: string | null;
}
    | {
  status: "error";
  lang: SupportedLang;
  reason: "missing" | "invalid";
  next: string;
};

type ActionData = {
  error: "missing" | "invalid" | "username_required" | "update_failed";
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

    // Extract token from the redirect URL to verify and get user info
    const { supabase, headers } = createClient(request, context);
    const redirectUrlObj = new URL(redirectUrl.toString());
    const tokenFromRedirect = redirectUrlObj.searchParams.get("token_hash");
    const typeFromRedirect = redirectUrlObj.searchParams.get("type") as EmailOtpType | null;
    const codeFromRedirect = redirectUrlObj.searchParams.get("code");

    let needsUsername = false;
    let userEmail: string | null = null;
    let verified = false;

    // Try to verify token to get user info
    if (codeFromRedirect) {
      const { error } = await supabase.auth.exchangeCodeForSession(codeFromRedirect);
      if (!error) {
        const { data: { session } } = await supabase.auth.getSession();
        needsUsername = session?.user ? !session.user.user_metadata?.name : false;
        userEmail = session?.user?.email || null;
        verified = true;
        
        // 验证成功后，如果已有用户名，同步到 public.users 并直接重定向
        if (!needsUsername) {
          await syncUserToPublicTable(supabase);
          return redirect(next, { headers });
        }
      }
    } else if (tokenFromRedirect && typeFromRedirect) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenFromRedirect,
        type: typeFromRedirect,
      });
      if (!error) {
        const { data: { session } } = await supabase.auth.getSession();
        needsUsername = session?.user ? !session.user.user_metadata?.name : false;
        userEmail = session?.user?.email || null;
        verified = true;
        
        // 验证成功后，如果已有用户名，同步到 public.users 并直接重定向
        if (!needsUsername) {
          await syncUserToPublicTable(supabase);
          return redirect(next, { headers });
        }
      }
    }

    // If token verification failed, return error
    if (!verified) {
      return {
        status: "error",
        lang,
        reason: "invalid",
        next: nextQuery,
      };
    }

    // 如果执行到这里，说明需要用户名（旧逻辑，现在应该不会用到）
    // Return with headers to set session cookies
    const responseHeaders = new Headers(headers);
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
    return new Response(
      JSON.stringify({
        status: "prompt",
        redirectUrl: redirectUrl.toString(),
        lang,
        next,
        needsUsername,
        userEmail,
      } satisfies LoaderData),
      {
        headers: responseHeaders,
      }
    );
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
        // 同步用户信息到 public.users 表
        await syncUserToPublicTable(supabase);
        return redirect(nextQuery, { headers });
      }
    }

    if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type,
      });

      if (!error) {
        // 同步用户信息到 public.users 表
        await syncUserToPublicTable(supabase);
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
  const nextPath = formData.get("next") as string | null;
  const lang = deriveLang(formData.get("lang") as string | null);
  const username = (formData.get("username") as string | null)?.trim();

  // Initialize Supabase client to ensure cookies are handled
  const { supabase, headers } = createClient(request, context);

  // Get current session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    const responseHeaders = new Headers(headers);
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
    return new Response(
      JSON.stringify({
        error: "invalid",
        lang,
      } satisfies ActionData),
      {
        status: 401,
        headers: responseHeaders,
      }
    );
  }

  // Check if user needs to set username
  const hasUsername = session.user.user_metadata?.name;
  
  // If user doesn't have a username and didn't provide one, return error
  if (!hasUsername && !username) {
    const responseHeaders = new Headers(headers);
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
    return new Response(
      JSON.stringify({
        error: "username_required",
        lang,
      } satisfies ActionData),
      {
        status: 400,
        headers: responseHeaders,
      }
    );
  }

  // If username is provided, update user metadata and public.users table
  if (username) {
    // Update auth.users user_metadata
    const { error: updateError } = await supabase.auth.updateUser({
      data: { 
        name: username,
        email: session.user.email
      }
    });

    if (updateError) {
      console.error("Failed to update user metadata:", updateError);
      const responseHeaders = new Headers(headers);
      responseHeaders.set("Content-Type", "application/json; charset=utf-8");
      return new Response(
        JSON.stringify({
          error: "update_failed",
          lang,
        } satisfies ActionData),
        {
          status: 500,
          headers: responseHeaders,
        }
      );
    }

    // Check if user exists in public.users table
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (existingUser) {
      // Update existing record
      const { error: tableUpdateError } = await supabase
        .from("users")
        .update({ name: username })
        .eq("user_id", session.user.id);

      if (tableUpdateError) {
        console.error("Failed to update public.users table:", tableUpdateError);
      }
    } else {
      // Insert new record
      const { error: tableInsertError } = await supabase
        .from("users")
        .insert({
          user_id: session.user.id,
          name: username,
        });

      if (tableInsertError) {
        console.error("Failed to insert into public.users table:", tableInsertError);
      }
    }
  }

  // Token has already been verified in the loader, so we just need to redirect
  // to the next page after saving username (if provided)
  const finalNext = nextPath ?? `/${lang}`;
  return redirect(finalNext, { headers });
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
              : errorKey === "username_required"
                  ? labels.username_required
                  : errorKey === "update_failed"
                      ? labels.invalid
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

  const needsUsername = data.needsUsername;
  const userEmail = data.userEmail;

  return (
      <div className="min-h-screen bg-zinc-50 flex flex-col justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-md bg-white p-10 shadow sm:rounded-lg">
          <h1 className="text-2xl font-semibold text-zinc-900 text-center">{labels.title}</h1>
          <p className="mt-4 text-sm text-zinc-600 text-center">
            {needsUsername ? labels.new_user_description : labels.description}
          </p>
          {errorMessage && (
              <div className="mt-6 rounded-md bg-red-50 p-4 text-sm text-red-600 text-center">
                {errorMessage}
              </div>
          )}
          <Form method="POST" className="mt-8 space-y-4">
            <input type="hidden" name="next" value={data.next}/>
            <input type="hidden" name="lang" value={data.lang}/>
            
            {needsUsername && (
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-zinc-700">
                    {labels.username_label}
                  </label>
                  <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      placeholder={labels.username_placeholder}
                      className="block w-full rounded-md border-0 p-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                      disabled={isSubmitting}
                  />
                  {userEmail && (
                      <p className="text-xs text-zinc-500">
                        Email: {userEmail}
                      </p>
                  )}
                </div>
            )}
            
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
