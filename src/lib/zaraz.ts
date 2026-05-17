declare global {
  interface Window {
    zaraz?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export const ZarazEvents = {
  COPY_LINK: "copy_link",
  SHARE_X: "share_x",
  VIEW_FULLSCREEN: "view_fullscreen",
  LOAD_MORE: "load_more",
  TRANSLATE: "translate",
  RSS_CLICK: "rss_click",
} as const;

export type ZarazEventName = (typeof ZarazEvents)[keyof typeof ZarazEvents];
export type ContentType = "article" | "album" | "thought" | "book";
export type RSSType = "article" | "photo" | "thought";

export function trackZarazEvent(
  eventName: ZarazEventName,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || !window.zaraz) return;
  window.zaraz.track(eventName, properties);
}

export function trackCopyLink(title: string, contentType: ContentType): void {
  trackZarazEvent(ZarazEvents.COPY_LINK, { title, content_type: contentType });
}

export function trackShareX(title: string, contentType: ContentType): void {
  trackZarazEvent(ZarazEvents.SHARE_X, { title, content_type: contentType });
}
