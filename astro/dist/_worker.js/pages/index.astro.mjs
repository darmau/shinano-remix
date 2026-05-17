globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, a1 as createAstro } from '../chunks/astro/server_D3oA7eJe.mjs';
export { a as renderers } from '../chunks/_@astro-renderers_BA3-2LID.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return Astro2.redirect("/zh");
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/index.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
