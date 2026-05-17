export default function getTime(date: string, lang: string): string {
  const time = new Date(date);
  let locale: string;

  switch (lang) {
    case "zh":
      locale = "zh-Hans-CN-u-ca-gregory";
      break;
    case "en":
      locale = "en-US-u-hc-h12";
      break;
    case "jp":
      locale = "ja-JP-u-ca-japanese";
      break;
    default:
      locale = "en-US-u-hc-h12";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  };

  return new Intl.DateTimeFormat(locale, options).format(time);
}
