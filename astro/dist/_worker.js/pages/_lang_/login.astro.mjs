globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, ac as maybeRenderHead, _ as addAttribute } from '../../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../../chunks/Base_De4mBBde.mjs';
import { S as SignupText } from '../../chunks/signup_BliVJK_o.mjs';
import { g as getLanguageLabel } from '../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../chunks/getLang_DVpWAtTa.mjs';
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const { lang } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const session = Astro2.locals.session;
  const url = new URL(Astro2.request.url);
  const next = url.searchParams.get("next") ?? `/${lang}`;
  if (session?.user) return Astro2.redirect(next);
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const label = getLanguageLabel(SignupText, lang);
  const availableLangs = ["zh", "en", "jp"];
  const errorParam = url.searchParams.get("error");
  const errorMessage = errorParam === "magic_link" ? label.magic_link_error : null;
  const emailAction = `/api/auth/email?next=${encodeURIComponent(next)}`;
  const githubAction = `/api/auth/github?next=${encodeURIComponent(next)}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": label.log_in_title, "description": label.log_in_description, "ogTitle": label.log_in_title, "ogDescription": label.log_in_description, "pathWithoutLang": "login", "availableLangs": availableLangs, "baseUrl": baseUrl }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="h-full bg-zinc-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8"> <div class="sm:mx-auto sm:w-full sm:max-w-md"> <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900"> ${label.log_in_title} </h2> <p class="mt-6 text-center text-base text-zinc-500">${label.log_in_description}</p> <p class="mt-2 text-center text-sm text-zinc-400">${label.magic_link_hint}</p> </div> <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]"> <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12"> <form method="POST"${addAttribute(emailAction, "action")} class="space-y-6"> <input type="hidden" name="lang"${addAttribute(lang, "value")}> <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900"> ${label.email} </label> <div class="mt-2"> <input id="email" name="email" type="email" required autocomplete="email" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" placeholder="name@example.com"> </div> </div> <div> <button type="submit" class="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"> ${label.send_link} </button> </div> </form> ${errorMessage && renderTemplate`<div class="mt-6"> <p class="text-sm text-red-600">${errorMessage}</p> </div>`} <form method="POST"${addAttribute(githubAction, "action")}> <input type="hidden" name="lang"${addAttribute(lang, "value")}> <div class="relative mt-10"> <div aria-hidden="true" class="absolute inset-0 flex items-center"> <div class="w-full border-t border-gray-200"></div> </div> <div class="relative flex justify-center text-sm font-medium leading-6"> <span class="bg-white px-6 text-gray-900">${label.oauth}</span> </div> </div> <div class="mt-6"> <button type="submit" formnovalidate class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"> <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5 fill-[#24292F]"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"></path> </svg> <span class="text-sm font-semibold leading-6">GitHub</span> </button> </div> </form> </div> <div class="mt-6 text-center text-sm text-zinc-500"> <a${addAttribute(`/${lang}/terms-of-use`, "href")}>Terms of Use</a> </div> </div> </div> ` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/login.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/login.astro";
const $$url = "/[lang]/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
