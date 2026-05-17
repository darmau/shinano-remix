globalThis.process ??= {}; globalThis.process.env ??= {};
function getTime(date, lang) {
  const time = new Date(date);
  let locale;
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
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric"
  };
  return new Intl.DateTimeFormat(locale, options).format(time);
}

export { getTime as g };
