// During the parallel-migration period we reuse the existing locale tables
// in app/locales/ rather than duplicating them. Once Step 3 ships these files
// will be moved into astro/src/locales/.
export { default as ArticleText } from "~/locales/article";
export { default as CommentText } from "~/locales/comment";
export { default as NavbarItems } from "~/locales/navbar";
export { default as FooterText } from "~/locales/footer";
export { default as UtilsText } from "~/locales/utils";
export { default as ProfileText } from "~/locales/profile";
export { default as HomepageText } from "~/locales/homepage";
export { default as ArticlesText } from "~/locales/articles";
export { default as SubNavItems } from "~/locales/subnav";
export { default as AboutText } from "~/locales/about";
export { default as SiteText } from "~/locales/site";
export { default as LegalText } from "~/locales/legal";
export { default as RSSText } from "~/locales/rss";
export { default as ContactText } from "~/locales/contact";
export { default as ThoughtText } from "~/locales/thought";
export { default as BookText } from "~/locales/books";
export { default as SignupText } from "~/locales/signup";
export { default as ConfirmText } from "~/locales/confirm";
export { default as SearchText } from "~/locales/search";
export { default as UnsubscribeText } from "~/locales/unsubscribe";
export { default as AlbumText } from "~/locales/album";
export { getBannerCopy } from "~/locales/banner";
