interface Label {
  [key: string]: string;
}

interface Labels {
  [key: string]: Label;
}

export default function getLanguageLabel(labels: Labels, lang: string): Label {
  if (!labels[lang]) {
    return labels.zh;
  }
  return labels[lang];
}
