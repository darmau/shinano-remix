// During the parallel-migration period we reuse the existing locale tables
// in app/locales/ rather than duplicating them. Once Step 3 ships these files
// will be moved into astro/src/locales/.
export { default as ArticleText } from "../../../app/locales/article";
export { default as CommentText } from "../../../app/locales/comment";
export { default as NavbarItems } from "../../../app/locales/navbar";
export { default as FooterText } from "../../../app/locales/footer";
export { default as UtilsText } from "../../../app/locales/utils";
export { default as ProfileText } from "../../../app/locales/profile";
export { default as HomepageText } from "../../../app/locales/homepage";
export { default as ArticlesText } from "../../../app/locales/articles";
export { default as SubNavItems } from "../../../app/locales/subnav";
export { default as AboutText } from "../../../app/locales/about";
export { default as SiteText } from "../../../app/locales/site";
export { default as LegalText } from "../../../app/locales/legal";
export { default as RSSText } from "../../../app/locales/rss";
export { default as ContactText } from "../../../app/locales/contact";
export { default as ThoughtText } from "../../../app/locales/thought";
export { default as BookText } from "../../../app/locales/books";
export { default as SignupText } from "../../../app/locales/signup";
export { default as ConfirmText } from "../../../app/locales/confirm";
export { default as SearchText } from "../../../app/locales/search";
export { default as UnsubscribeText } from "../../../app/locales/unsubscribe";
export { getBannerCopy } from "../../../app/locales/banner";
