const MAX_TOKEN_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

interface Payload {
  comment_id: number;
  timestamp: number;
  iat?: number;
}

export async function verifyUnsubscribeToken(
  token: string,
  secret: string,
  maxAgeMs: number = MAX_TOKEN_AGE_MS,
): Promise<number | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [encodedHeader, encodedPayload, encodedSignature] = parts;

    const headerJson = base64UrlDecodeToString(encodedHeader);
    const header = JSON.parse(headerJson) as { alg?: string };
    if (header?.alg !== "HS256") return null;

    const key = await crypto.subtle.importKey(
      "raw",
      textEncoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signingInput = `${encodedHeader}.${encodedPayload}`;
    const expected = new Uint8Array(
      await crypto.subtle.sign("HMAC", key, textEncoder.encode(signingInput)),
    );
    const provided = base64UrlDecode(encodedSignature);
    if (!timingSafeEqual(expected, provided)) return null;

    const payload = JSON.parse(base64UrlDecodeToString(encodedPayload)) as Payload;
    const commentId =
      typeof payload.comment_id === "number"
        ? payload.comment_id
        : Number.parseInt(payload.comment_id as unknown as string, 10);
    const issuedAt =
      typeof payload.timestamp === "number"
        ? payload.timestamp
        : Number.parseInt(payload.timestamp as unknown as string, 10);

    if (!Number.isFinite(commentId) || !Number.isFinite(issuedAt)) return null;
    if (Date.now() - issuedAt > maxAgeMs) return null;

    return commentId;
  } catch (err) {
    console.error("verifyUnsubscribeToken error:", err);
    return null;
  }
}

function base64UrlDecode(input: string): Uint8Array {
  let normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = (4 - (normalized.length % 4)) % 4;
  if (pad) normalized += "=".repeat(pad);
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlDecodeToString(input: string): string {
  return textDecoder.decode(base64UrlDecode(input));
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
