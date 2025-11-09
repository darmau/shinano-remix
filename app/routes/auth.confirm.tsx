import { Form, Link, useActionData, useLoaderData, useNavigation } from "react-router";
import { redirect } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import type { EmailOtpType } from "@supabase/supabase-js";
import ConfirmText from "~/locales/confirm";
import getLanguageLabel from "~/utils/getLanguageLabel";
import { createClient } from "~/utils/supabase/server";

const SUPPORTED_LANGS = ["zh", "en", "jp"] as const;
type SupportedLang = (typeof SUPPORTED_LANGS)[number];

type LoaderData = {
  needsUsername: boolean;
  userEmail: string | null;
  lang: SupportedLang;
  next: string;
};

type ActionData = {
  error?: string;
};

function deriveLang(input?: string | null): SupportedLang {
  if (!input) return "zh";
  
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

export async function loader({ request, context }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const redirectParam = requestUrl.searchParams.get("redirect");
  const nextQuery = requestUrl.searchParams.get("next") ?? "/zh";
  const lang = deriveLang(nextQuery);

  // 如果有 redirect 参数（来自 magic link）
  if (redirectParam) {
    try {
      const { supabase, headers } = createClient(request, context);
      const redirectUrl = new URL(redirectParam);
      
      // 提取 token
      const token_hash = redirectUrl.searchParams.get("token_hash");
      const type = redirectUrl.searchParams.get("type") as EmailOtpType | null;
      const code = redirectUrl.searchParams.get("code");

      let verifyError = null;

      // 验证 token
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        verifyError = error;
      } else if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type });
        verifyError = error;
      }

      // 验证失败
      if (verifyError) {
        console.error("Token verification failed:", verifyError);
        return redirect(`/${lang}/login?error=magic_link`, { headers });
      }

      // 验证成功，获取用户信息
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return redirect(`/${lang}/login?error=magic_link`, { headers });
      }

      const hasUsername = !!session.user.user_metadata?.name;

      // 如果已有用户名，同步到 public.users 并重定向
      if (hasUsername) {
        await syncUserToPublicTable(supabase, session.user.id, session.user.user_metadata.name);
        return redirect(nextQuery, { headers });
      }

      // 新用户需要设置用户名，返回表单数据（带 headers 设置 cookies）
      const responseHeaders = new Headers(headers);
      responseHeaders.set("Content-Type", "application/json; charset=utf-8");
      
      return new Response(
        JSON.stringify({
          needsUsername: true,
          userEmail: session.user.email || null,
          lang,
          next: nextQuery,
        } satisfies LoaderData),
        { headers: responseHeaders }
      );
      
    } catch (error) {
      console.error("Loader error:", error);
      return redirect(`/${lang}/login?error=magic_link`);
    }
  }

  // 没有 redirect 参数，返回错误
  return redirect(`/${lang}/login?error=magic_link`);
}

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = (formData.get("username") as string | null)?.trim();
  const nextPath = (formData.get("next") as string | null) ?? "/zh";
  const lang = deriveLang(nextPath);

  const { supabase, headers } = createClient(request, context);
  const labels = ConfirmText[lang] ?? ConfirmText.zh;

  // 获取当前 session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    const responseHeaders = new Headers(headers);
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
    return new Response(
      JSON.stringify({ error: labels.invalid } satisfies ActionData),
      { status: 401, headers: responseHeaders }
    );
  }

  // 验证用户名
  if (!username) {
    const responseHeaders = new Headers(headers);
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
    return new Response(
      JSON.stringify({ error: labels.username_required } satisfies ActionData),
      { status: 400, headers: responseHeaders }
    );
  }

  // 更新 user_metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { name: username, email: session.user.email }
  });

  if (updateError) {
    console.error("Failed to update user metadata:", updateError);
    const responseHeaders = new Headers(headers);
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
    return new Response(
      JSON.stringify({ error: labels.invalid } satisfies ActionData),
      { status: 500, headers: responseHeaders }
    );
  }

  // 同步到 public.users
  await syncUserToPublicTable(supabase, session.user.id, username);

  // 重定向到目标页面
  return redirect(nextPath, { headers });
}

// 同步用户信息到 public.users 表
async function syncUserToPublicTable(supabase: any, userId: string, username: string) {
  try {
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (existingUser) {
      await supabase
        .from("users")
        .update({ name: username })
        .eq("user_id", userId);
    } else {
      await supabase
        .from("users")
        .insert({ user_id: userId, name: username });
    }
  } catch (error) {
    console.error("Failed to sync user to public.users:", error);
  }
}

export default function ConfirmPage() {
  const data = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  
  const lang = data.lang;
  const labels = getLanguageLabel(ConfirmText, lang);
  const isSubmitting = navigation.state === "submitting";
  const needsUsername = data.needsUsername;
  const userEmail = data.userEmail;

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center px-4 py-16">
      <div className="mx-auto w-full max-w-md bg-white p-10 shadow sm:rounded-lg">
        <h1 className="text-2xl font-semibold text-zinc-900 text-center">
          {labels.title}
        </h1>
        
        {needsUsername ? (
          <>
            <p className="mt-4 text-sm text-zinc-600 text-center">
              {labels.new_user_description}
            </p>
            
            {actionData?.error && (
              <div className="mt-6 rounded-md bg-red-50 p-4 text-sm text-red-600 text-center">
                {actionData.error}
              </div>
            )}
            
            <Form method="POST" className="mt-8 space-y-4">
              <input type="hidden" name="next" value={data.next} />
              <input type="hidden" name="lang" value={lang} />
              
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
              
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
              >
                {labels.button}
              </button>
            </Form>
          </>
        ) : (
          <p className="mt-4 text-sm text-zinc-600 text-center">
            {labels.description}
          </p>
        )}
      </div>
    </div>
  );
}
