globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, _ as addAttribute, al as renderTemplate, a1 as createAstro } from './astro/server_D3oA7eJe.mjs';

const Subnav = {
  "zh": {
    "article": [
      {
        "name": "首页",
        "link": "/zh/"
      },
      {
        "name": "推荐",
        "link": "/zh/articles/featured/1"
      },
      {
        "name": "最新",
        "link": "/zh/articles/1"
      }
    ],
    "photography": [
      {
        "name": "最新",
        "link": "/zh/albums/all/1"
      },
      {
        "name": "推荐",
        "link": "/zh/albums/featured"
      },
      {
        "name": "地图",
        "link": "/zh/albums/map"
      }
    ],
    "others": [
      {
        "name": "想法",
        "link": "/zh/thoughts"
      },
      {
        "name": "读书",
        "link": "/zh/book"
      }
    ],
    "about": [
      {
        "name": "作者",
        "link": "/zh/about"
      },
      {
        "name": "本站",
        "link": "/zh/site"
      },
      {
        "name": "联系我",
        "link": "/zh/contact"
      },
      {
        "name": "RSS",
        "link": "/zh/rss"
      }
    ]
  },
  "en": {
    "article": [
      {
        "name": "Homepage",
        "link": "/en/"
      },
      {
        "name": "Featured",
        "link": "/en/articles/featured/1"
      },
      {
        "name": "Latest",
        "link": "/en/articles/1"
      }
    ],
    "photography": [
      {
        "name": "Latest",
        "link": "/en/albums/all/1"
      },
      {
        "name": "Featured",
        "link": "/en/albums/featured"
      },
      {
        "name": "Map",
        "link": "/en/albums/map"
      }
    ],
    "others": [
      {
        "name": "Thoughts",
        "link": "/en/thoughts"
      },
      {
        "name": "Book",
        "link": "/en/book"
      }
    ],
    "about": [
      {
        "name": "Author",
        "link": "/en/about"
      },
      {
        "name": "Site",
        "link": "/en/site"
      },
      {
        "name": "Contact",
        "link": "/en/contact"
      },
      {
        "name": "RSS",
        "link": "/en/rss"
      }
    ]
  },
  "jp": {
    "article": [
      {
        "name": "ホーム",
        "link": "/jp/"
      },
      {
        "name": "厳選",
        "link": "/jp/articles/featured/1"
      },
      {
        "name": "最新",
        "link": "/jp/articles/1"
      }
    ],
    "photography": [
      {
        "name": "最新",
        "link": "/jp/albums/all/1"
      },
      {
        "name": "厳選",
        "link": "/jp/albums/featured"
      },
      {
        "name": "地図",
        "link": "/jp/albums/map"
      }
    ],
    "others": [
      {
        "name": "思考",
        "link": "/jp/thoughts"
      },
      {
        "name": "本",
        "link": "/jp/book"
      }
    ],
    "about": [
      {
        "name": "著者",
        "link": "/jp/about"
      },
      {
        "name": "サイト",
        "link": "/jp/site"
      },
      {
        "name": "連絡",
        "link": "/jp/contact"
      },
      {
        "name": "RSS",
        "link": "/jp/rss"
      }
    ]
  }
};
function SubNavItems(lang, current) {
  if (!Subnav[lang]) {
    return Subnav["zh"][current];
  }
  return Subnav[lang][current];
}

const $$Astro = createAstro();
const $$Subnav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Subnav;
  const { lang, active } = Astro2.props;
  const items = SubNavItems(lang, active);
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-8 justify-center p-4 border-b border-gray-200 z-10 relative"> ${items.map((item) => renderTemplate`<a class="text-sm hover:text-violet-700 hover:font-medium text-zinc-500"${addAttribute(item.link, "href")}> ${item.name} </a>`)} </div>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/Subnav.astro", void 0);

export { $$Subnav as $ };
