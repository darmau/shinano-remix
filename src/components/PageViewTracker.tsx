import { useEffect } from "react";
import { createSupabaseBrowser } from "~/lib/supabase/browser";
import { trackPageView } from "~/lib/trackPageView";

// Tiny client-only island whose only job is to call the page-view RPC after
// hydration. The number is owned by the SSR-rendered <p> in the article page;
// after a successful RPC we update its textContent in place, so React never
// owns the DOM node (keeps the SSR-rendered count visible on first paint and
// avoids hydration mismatch).
export default function PageViewTracker({
  contentType,
  contentId,
  countNodeId,
  supabaseUrl,
  supabaseAnonKey,
}: {
  contentType: "article" | "album" | "thought";
  contentId: number;
  countNodeId: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}) {
  useEffect(() => {
    const supabase = createSupabaseBrowser(supabaseUrl, supabaseAnonKey);
    trackPageView(contentType, contentId, supabase, (newPageView) => {
      const el = document.getElementById(countNodeId);
      if (el) el.textContent = String(newPageView);
    }).catch((error) => console.error(error));
  }, [contentType, contentId, countNodeId, supabaseUrl, supabaseAnonKey]);

  return null;
}
