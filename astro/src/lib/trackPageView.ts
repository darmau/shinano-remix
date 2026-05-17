import type { SupabaseClient } from "@supabase/supabase-js";

type ContentType = "article" | "album" | "thought";
type RpcFunctionName =
  | "article_page_view"
  | "photo_page_view"
  | "thought_page_view";

const STORAGE_KEY_PREFIX = "page_view_";
const VIEW_EXPIRY_HOURS = 24;

interface PageViewRecord {
  contentId: number;
  timestamp: number;
  contentType: ContentType;
}

function getStorageKey(contentType: ContentType, contentId: number): string {
  return `${STORAGE_KEY_PREFIX}${contentType}_${contentId}`;
}

function getRpcFunctionName(contentType: ContentType): RpcFunctionName {
  const map: Record<ContentType, RpcFunctionName> = {
    article: "article_page_view",
    album: "photo_page_view",
    thought: "thought_page_view",
  };
  return map[contentType];
}

function getRpcParamName(contentType: ContentType): string {
  const map: Record<ContentType, string> = {
    article: "article_id",
    album: "photo_id",
    thought: "thought_id",
  };
  return map[contentType];
}

function hasViewedRecently(
  contentType: ContentType,
  contentId: number,
): boolean {
  if (typeof window === "undefined") return false;

  try {
    const storageKey = getStorageKey(contentType, contentId);
    const recordStr = localStorage.getItem(storageKey);
    if (!recordStr) return false;

    const record: PageViewRecord = JSON.parse(recordStr);
    const now = Date.now();
    const expiryTime = VIEW_EXPIRY_HOURS * 60 * 60 * 1000;

    if (
      record.contentId === contentId &&
      record.contentType === contentType &&
      now - record.timestamp < expiryTime
    ) {
      return true;
    }

    localStorage.removeItem(storageKey);
    return false;
  } catch (error) {
    console.error("读取访问记录失败:", error);
    return false;
  }
}

function recordView(contentType: ContentType, contentId: number): void {
  if (typeof window === "undefined") return;
  try {
    const record: PageViewRecord = {
      contentId,
      timestamp: Date.now(),
      contentType,
    };
    localStorage.setItem(
      getStorageKey(contentType, contentId),
      JSON.stringify(record),
    );
  } catch (error) {
    console.error("保存访问记录失败:", error);
  }
}

export async function trackPageView(
  contentType: ContentType,
  contentId: number,
  supabase: SupabaseClient,
  onSuccess?: (newPageView: number) => void,
): Promise<boolean> {
  if (hasViewedRecently(contentType, contentId)) return false;

  try {
    const rpcFunctionName = getRpcFunctionName(contentType);
    const rpcParamName = getRpcParamName(contentType);

    const { data, error } = await supabase.rpc(rpcFunctionName, {
      [rpcParamName]: contentId,
    });

    if (error) {
      console.error("阅读量增加失败:", error);
      return false;
    }

    if (data !== null && typeof data === "number") {
      recordView(contentType, contentId);
      if (onSuccess) onSuccess(data);
      return true;
    }

    return false;
  } catch (error) {
    console.error("跟踪页面访问失败:", error);
    return false;
  }
}
