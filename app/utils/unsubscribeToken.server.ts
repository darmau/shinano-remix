/**
 * 取消订阅 Token 生成和验证工具
 * 使用 HMAC-SHA256 签名确保 Token 安全性
 */

interface UnsubscribeTokenPayload {
  commentId: number;
  timestamp: number;
}

/**
 * 生成取消订阅 Token
 * @param commentId 评论 ID
 * @param secret 签名密钥
 * @returns Base64 编码的签名 token
 */
export async function generateUnsubscribeToken(
  commentId: number,
  secret: string
): Promise<string> {
  const timestamp = Date.now();
  const payload: UnsubscribeTokenPayload = {
    commentId,
    timestamp,
  };

  const payloadStr = JSON.stringify(payload);
  const payloadBuffer = new TextEncoder().encode(payloadStr);

  // 使用 Web Crypto API 生成 HMAC-SHA256 签名
  const keyBuffer = new TextEncoder().encode(secret);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, payloadBuffer);
  const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));

  // 组合 payload 和 signature
  const token = {
    payload: btoa(payloadStr),
    signature,
  };

  return btoa(JSON.stringify(token));
}

/**
 * 验证并解析取消订阅 Token
 * @param token Base64 编码的 token
 * @param secret 签名密钥
 * @param maxAgeMs Token 最大有效期（毫秒），默认 30 天
 * @returns 解析的评论 ID，如果验证失败返回 null
 */
export async function verifyUnsubscribeToken(
  token: string,
  secret: string,
  maxAgeMs: number = 30 * 24 * 60 * 60 * 1000 // 30 天
): Promise<number | null> {
  try {
    // 解码外层 token
    const tokenStr = atob(token);
    const tokenObj = JSON.parse(tokenStr) as { payload: string; signature: string };

    // 解码 payload
    const payloadStr = atob(tokenObj.payload);
    const payload = JSON.parse(payloadStr) as UnsubscribeTokenPayload;

    // 检查时效性
    const now = Date.now();
    if (now - payload.timestamp > maxAgeMs) {
      console.warn("Unsubscribe token expired");
      return null;
    }

    // 重新计算签名验证
    const payloadBuffer = new TextEncoder().encode(payloadStr);
    const keyBuffer = new TextEncoder().encode(secret);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const expectedSignatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, payloadBuffer);
    const expectedSignature = btoa(String.fromCharCode(...new Uint8Array(expectedSignatureBuffer)));

    // 比较签名
    if (tokenObj.signature !== expectedSignature) {
      console.warn("Unsubscribe token signature mismatch");
      return null;
    }

    return payload.commentId;
  } catch (error) {
    console.error("Failed to verify unsubscribe token:", error);
    return null;
  }
}

