globalThis.process ??= {}; globalThis.process.env ??= {};
import { H as HomepageText } from '../../../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { g as getTime } from '../../../chunks/getTime_CcDELrHl.mjs';
import { L as LOCALES } from '../../../chunks/getLang_DVpWAtTa.mjs';
import { b as buildRssChannel } from '../../../chunks/rss_CcdjkeFh.mjs';
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const GET = async (ctx) => {
  const lang = ctx.params.lang;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const supabase = ctx.locals.supabase;
  const env = ctx.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const label = getLanguageLabel(HomepageText, lang);
  const { data: posts } = await supabase.from("thought").select(`id, slug, content_text, created_at`).order("created_at", { ascending: false }).limit(50);
  const entries = (posts ?? []).map((post) => ({
    title: post.created_at ? getTime(post.created_at, lang) : label.thought,
    description: post.content_text ?? "",
    pubDate: post.created_at,
    link: `${baseUrl}/${lang}/thought/${post.slug}`,
    guid: post.id,
    author: "李大毛",
    category: label.thought
  }));
  const feed = buildRssChannel({
    title: `${label.title} - ${label.thought}`,
    description: label.description,
    language: lang,
    link: `${baseUrl}/${lang}`,
    imageTitle: "积薪 - 想法",
    entries,
    followChallenge: { feedId: "46420994967031808", userId: "46488520035984384" }
  });
  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=2419200"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
