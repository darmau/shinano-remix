import { useEffect, useState } from "react";
import { createSupabaseBrowser } from "~/lib/supabase/browser";

// Mirrors the onAuthStateChange handler from app/root.tsx. When the browser
// client's session diverges from what SSR rendered with, we reload the page so
// the next SSR has the new cookie set.
export default function AuthProvider({
  supabaseUrl,
  supabaseAnonKey,
  serverAccessToken,
}: {
  supabaseUrl: string;
  supabaseAnonKey: string;
  serverAccessToken: string | null;
}) {
  const [supabase] = useState(() => createSupabaseBrowser(supabaseUrl, supabaseAnonKey));

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") return;
      if (session?.access_token !== serverAccessToken) {
        window.location.reload();
      }
    });
    return () => subscription.unsubscribe();
  }, [serverAccessToken, supabase]);

  return null;
}
