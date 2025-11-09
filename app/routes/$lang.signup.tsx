import { Form, Link, redirect, useActionData, useLoaderData, useNavigation, useOutletContext } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "react-router";
import GithubLogin from "~/components/GithubLogin";
import SignupText from '~/locales/signup'
import getLanguageLabel from "~/utils/getLanguageLabel";
import { createClient } from "~/utils/supabase/server";
import i18nLinks from "~/utils/i18nLinks";

type ActionData = {
  success: boolean;
  error: string | null;
};

function jsonWithHeaders(data: ActionData, headers: Headers, status = 200) {
  const responseHeaders = new Headers(headers);
  if (!responseHeaders.has("Content-Type")) {
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(JSON.stringify(data), {
    status,
    headers: responseHeaders,
  });
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;

  const availableLangs = ["zh", "en", "jp"];

  return {
    origin,
    baseUrl: context.cloudflare.env.BASE_URL,
    availableLangs,
    error: requestUrl.searchParams.get("error"),
  };
}

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  const lang = params.lang as string;
  const label = getLanguageLabel(SignupText, lang);
  const baseUrl = data!.baseUrl;
  const multiLangLinks = i18nLinks(baseUrl,
    lang,
    data!.availableLangs,
    "signup"
  );

  return [
    { title: label.sign_up_title },
    {
      name: "description",
      content: label.sign_up_description,
    },
    ...multiLangLinks
  ];
};

export default function Signup() {
  const { lang } = useOutletContext<{ lang: string }>();
  const label = getLanguageLabel(SignupText, lang);
  const actionResponse = useActionData<ActionData>();
  const loaderData = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isEmailSubmitting = navigation.state === "submitting" && navigation.formData?.get("intent") === "email";
  const queryError = loaderData?.error === "magic_link" ? label.magic_link_error : null;
  const errorMessage = actionResponse?.error ?? queryError;

  return (
    <div className="h-full bg-zinc-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900">
          {label.sign_up_title}
        </h2>
        <p className="mt-6 text-center text-base text-zinc-500">{label.sign_up_description}</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <Form method="POST" className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          {actionResponse?.success ? (
            <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
              {label.email_check}
            </div>
          ) : (
            <div className="space-y-6">
              {/* 用户名输入 */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  {label.username}
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="name"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 disabled:opacity-50"
                    placeholder={label.username_placeholder}
                    disabled={isEmailSubmitting}
                  />
                </div>
              </div>

              {/* 邮箱输入 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  {label.email}
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 disabled:opacity-50"
                    placeholder="name@example.com"
                    disabled={isEmailSubmitting}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">{label.magic_link_hint}</p>
              </div>
              
              <input type="hidden" value={lang} name="lang"/>

              <div>
                <button
                  type="submit"
                  name="intent"
                  value="email"
                  className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isEmailSubmitting}
                >
                  {label.send_link}
                </button>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mt-6">
              <p className="text-sm text-red-600">{errorMessage}</p>
            </div>
          )}

          <GithubLogin />
        </Form>
        <div className="mt-6 text-center text-sm space-y-2">
          <div>
            <span className="text-zinc-500">{label.have_account} </span>
            <Link to={`/${lang}/login`} className="text-violet-600 font-semibold hover:text-violet-500">
              {label.go_to_login}
            </Link>
          </div>
          <Link to={`/${lang}/terms-of-use`} className="block text-zinc-500">Terms of Use</Link>
        </div>
      </div>
    </div>
  )
}

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent") as string;
  const requestUrl = new URL(request.url);
  const pathLang = requestUrl.pathname.split("/").filter(Boolean)[0];
  const rawLang = (formData.get("lang") as string | null)?.trim();
  const lang = rawLang?.length ? rawLang : (pathLang?.length ? pathLang : "zh");
  const next = requestUrl.searchParams.get("next") ?? `/${lang}`;

  const { supabase, headers } = createClient(request, context);

  if (intent === 'email') {
    const email = (formData.get("email") as string | null)?.trim();
    const username = (formData.get("username") as string | null)?.trim();
    const labels = SignupText[lang as keyof typeof SignupText] ?? SignupText.zh;

    if (!email) {
      return jsonWithHeaders({ success: false, error: labels.email_required }, headers, 400);
    }

    if (!username) {
      return jsonWithHeaders({ success: false, error: labels.username_required }, headers, 400);
    }

    const emailRedirectTo = `${requestUrl.origin}/auth/callback?next=${encodeURIComponent(next)}`;

    // 发送 OTP 时在 data 中携带用户名，并明确允许创建新用户
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo,
        shouldCreateUser: true,  // 允许创建新用户
        data: {
          name: username,
          email: email,
        }
      },
    });

    if (error) {
      console.error(error);
      return jsonWithHeaders({ success: false, error: error.message }, headers, 400);
    }

    return jsonWithHeaders({ success: true, error: null }, headers);
  } else if (intent === 'github') {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${requestUrl.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })

    if (error) {
      console.error(error);
      return jsonWithHeaders({ success: false, error: error.message }, headers, 400);
    }

    if (data.url) {
      return redirect(data.url, { headers });
    }
  }

  throw new Response(`Unknown intent: ${intent}`, {
    status: 400,
    statusText: "Bad Request",
  });
}

