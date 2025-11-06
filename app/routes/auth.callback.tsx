import { redirect } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'

export async function loader({ request, context }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get("next") ?? "/";
  const headers = new Headers()

  if (code) {
    const supabase = createServerClient(context.cloudflare.env.SUPABASE_URL, context.cloudflare.env.SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          const parsed = parseCookieHeader(request.headers.get('Cookie') ?? '')
          return parsed.map(cookie => ({
            name: cookie.name,
            value: cookie.value ?? ''
          }))
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
              headers.append('Set-Cookie', serializeCookieHeader(name, value, options))
          )
        },
      },
    })

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return redirect(next, { headers })
    }
  }

  // return the user to an error page with instructions
  return redirect('/auth/auth-code-error', { headers })
}
