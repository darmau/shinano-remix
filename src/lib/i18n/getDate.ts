export default function getDate(date: string, lang: string): string {
  const time = new Date(date);
  let locale: string;

  switch (lang) {
    case "zh":
      locale = "zh-Hans-CN";
      break;
    case "en":
      locale = "en-US";
      break;
    case "jp":
      locale = "ja-JP";
      break;
    default:
      locale = "en-US";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat(locale, options).format(time);
}
