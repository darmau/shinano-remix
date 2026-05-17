export function decodeRFC2047(encoded: string): string {
  if (!encoded || typeof encoded !== "string") return encoded;

  const rfc2047Regex = /=\?([^?]+)\?([QB])\?([^?]+)\?=/gi;
  return encoded.replace(rfc2047Regex, (match, charset: string, encoding: string, body: string) => {
    try {
      if (encoding.toUpperCase() === "Q") return decodeQuotedPrintable(body, charset);
      if (encoding.toUpperCase() === "B") return decodeBase64(body, charset);
      return match;
    } catch (err) {
      console.error("decodeRFC2047 error:", err);
      return match;
    }
  });
}

function decodeQuotedPrintable(text: string, charset = "utf-8"): string {
  const bytes: number[] = [];
  let i = 0;
  while (i < text.length) {
    if (text[i] === "=" && i + 2 < text.length) {
      const hex = text.substring(i + 1, i + 3).match(/^[0-9A-F]{2}$/i);
      if (hex) {
        bytes.push(parseInt(hex[0], 16));
        i += 3;
        continue;
      }
      if (text[i + 1] === "\r" && text[i + 2] === "\n") {
        i += 3;
        continue;
      }
      if (text[i + 1] === "\n") {
        i += 2;
        continue;
      }
    }
    if (text[i] === "_") bytes.push(0x20);
    else bytes.push(text.charCodeAt(i));
    i++;
  }
  try {
    return new TextDecoder(charset.toLowerCase()).decode(new Uint8Array(bytes));
  } catch {
    return String.fromCharCode(...bytes);
  }
}

function decodeBase64(text: string, charset = "utf-8"): string {
  try {
    const clean = text.replace(/\s/g, "");
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder(charset.toLowerCase()).decode(bytes);
  } catch (err) {
    console.error("decodeBase64 error:", err);
    return text;
  }
}
