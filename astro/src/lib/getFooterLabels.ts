export interface FooterLabels {
  [key: string]: FooterLinks[];
}

export interface FooterLinks {
  name: string;
  items: Array<{ name: string; href: string }>;
}

export default function getFooterLabels(labels: FooterLabels, lang: string) {
  if (!labels[lang]) return labels.zh;
  return labels[lang];
}
