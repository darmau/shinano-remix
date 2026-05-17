globalThis.process ??= {}; globalThis.process.env ??= {};
function getLanguageLabel(labels, lang) {
  if (!labels[lang]) {
    return labels.zh;
  }
  return labels[lang];
}

export { getLanguageLabel as g };
