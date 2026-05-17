import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const LOCALES = ["zh", "en", "jp"] as const;
const DEFAULT_LOCALE = "zh";

export function getLang(request: Request): string {
  const acceptLanguage = request.headers.get("Accept-Language") ?? "";
  const languages = new Negotiator({
    headers: { "accept-language": acceptLanguage },
  }).languages();
  return match(languages, LOCALES as readonly string[], DEFAULT_LOCALE);
}

export { LOCALES, DEFAULT_LOCALE };
