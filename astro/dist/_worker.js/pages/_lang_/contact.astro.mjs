globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, ac as maybeRenderHead, _ as addAttribute } from '../../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../../chunks/Base_De4mBBde.mjs';
import { $ as $$Subnav } from '../../chunks/Subnav_Ba7eeqYw.mjs';
import { H as HomepageText } from '../../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../chunks/getLang_DVpWAtTa.mjs';
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

const ContactText = {
  "zh": {
    "contact_us": "联系作者",
    "get_in_touch": "留言",
    "description": "如果想联系我深入探讨问题，或者有任何建议，或者想要合作，欢迎给我留言。",
    "name": "姓名",
    "contact_type": "联系方式",
    "contact": "联系详情",
    "message": "留言",
    "submit": "提交",
    "login": "登录",
    "signup": "注册",
    "require_login": "必须登录后才能提交留言"
  },
  "en": {
    "contact_us": "Contact Us",
    "get_in_touch": "Get in Touch",
    "description": "If you have any questions or suggestions, please feel free to contact us.",
    "name": "Name",
    "contact_type": "Contact Type",
    "contact": "Contact",
    "message": "Message",
    "submit": "Submit",
    "login": "Log in",
    "signup": "Sign up",
    "require_login": "You must log in to submit a message"
  },
  "jp": {
    "contact_us": "お問い合わせ",
    "get_in_touch": "連絡先",
    "description": "質問や提案がある場合は、お気軽にお問い合わせください。",
    "name": "名前",
    "contact_type": "連絡方法",
    "contact": "連絡先",
    "message": "メッセージ",
    "submit": "送信",
    "login": "ログイン",
    "signup": "サインアップ",
    "require_login": "メッセージを送信するにはログインする必要があります"
  }
};

const $$Astro = createAstro();
const prerender = false;
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  const { lang } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const session = Astro2.locals.session;
  const label = getLanguageLabel(ContactText, lang);
  const homeLabel = getLanguageLabel(HomepageText, lang);
  const availableLangs = ["zh", "en", "jp"];
  const url = new URL(Astro2.request.url);
  const status = url.searchParams.get("status");
  const errorMessage = url.searchParams.get("error");
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": homeLabel.contact_title, "description": homeLabel.contact_description, "ogTitle": homeLabel.contact_title, "ogDescription": homeLabel.contact_description, "pathWithoutLang": "contact", "availableLangs": availableLangs, "baseUrl": baseUrl }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Subnav", $$Subnav, { "lang": lang, "active": "about" })} ${maybeRenderHead()}<div class="max-w-md mx-auto my-8 lg:my-12 px-4 lg:p-0"> <header class="text-center space-y-4"> <h2 class="font-medium text-sm text-violet-700">${label.contact_us}</h2> <h1 class="font-medium text-3xl text-zinc-700">${label.get_in_touch}</h1> <p class="text-zinc-500">${label.description}</p> </header> <form method="post" action="/api/contact" class="space-y-6"> <input type="hidden" name="lang"${addAttribute(lang, "value")}> <div class="mb-4"> <label for="contact_type" class="block text-sm font-medium leading-6 text-gray-900 mb-2"> ${label.contact_type} </label> <select id="contact_type" name="contact_type" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6" required${addAttribute(!session, "disabled")}> <option value="email">Email</option> <option value="telegram">Telegram</option> <option value="wechat">WeChat</option> <option value="line">Line</option> </select> </div> <div class="mb-4"> <label for="contact" class="block text-sm font-medium leading-6 text-gray-900 mb-2"> ${label.contact} </label> <input id="contact" name="contact" type="text" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6" required${addAttribute(!session, "disabled")}> </div> <div class="mb-4"> <label for="message" class="block text-sm font-medium leading-6 text-gray-900 mb-2"> ${label.message} </label> <textarea id="message" name="message" rows="4" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50" required${addAttribute(!session, "disabled")}></textarea> </div> ${session ? renderTemplate`<button type="submit" class="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"> ${label.submit} </button>` : renderTemplate`<div class="flex justify-between"> <p class="text-red-400 text-sm">${label.require_login}</p> <a${addAttribute(`/${lang}/login`, "href")} class="bg-violet-600 px-3 py-2 rounded text-white font-medium"> ${label.login} </a> </div>`} </form> ${errorMessage && renderTemplate`<p class="mt-4 text-red-500">${errorMessage}</p>`} ${status === "ok" && renderTemplate`<p class="mt-4 text-green-500">信息提交成功</p>`} </div> ` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/contact.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/contact.astro";
const $$url = "/[lang]/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
