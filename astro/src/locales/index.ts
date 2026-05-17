// During the parallel-migration period we reuse the existing locale tables
// in app/locales/ rather than duplicating them. Once Step 3 ships these files
// will be moved into astro/src/locales/.
export { default as ArticleText } from "../../../app/locales/article";
export { default as CommentText } from "../../../app/locales/comment";
export { default as NavbarItems } from "../../../app/locales/navbar";
export { default as FooterText } from "../../../app/locales/footer";
export { default as UtilsText } from "../../../app/locales/utils";
export { default as ProfileText } from "../../../app/locales/profile";
export { getBannerCopy } from "../../../app/locales/banner";
