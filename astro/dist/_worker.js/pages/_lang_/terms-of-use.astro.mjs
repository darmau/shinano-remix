globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, ac as maybeRenderHead, aq as unescapeHTML } from '../../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../../chunks/Base_De4mBBde.mjs';
import { g } from '../../chunks/marked.esm_BvvH-1Q_.mjs';
import { H as HomepageText } from '../../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../../chunks/getLanguageLabel_D4hYx-hS.mjs';
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

const legalContent = {
  zh: {
    title: "使用协议",
    description: "阅读本站的使用协议，了解数据收集、隐私与评论规则等详细说明。"
  },
  en: {
    title: "Terms of Use",
    description: "Read the site's terms of use to understand data collection, privacy, and comment policies."
  },
  jp: {
    title: "利用規約",
    description: "当サイトの利用規約をお読みいただき、データ収集・プライバシー・コメントポリシーについてご確認ください。"
  }
};
function LegalText(lang) {
  if (lang !== "zh" && lang !== "en" && lang !== "jp") {
    return legalContent.zh;
  }
  return legalContent[lang];
}

const zhContent = "# 用户协议\n\n**最后更新日期：2025年11月9日**  \n欢迎访问积薪（以下简称“本站”）。为保障您的权益并遵守相关法律法规，请您在使用本站提供的各项服务前，仔细阅读本《用户协议》（以下简称“本协议”）。当您访问、注册、登录或使用本站的任一服务，即表示您已充分理解并同意本协议的全部条款。\n\n---\n\n## 一、网站基本信息\n\n本站由个人独立运营，用于发布原创文章及提供相关阅读与互动功能。本站并不从事任何商业广告投放或用户数据交易行为。\n\n---\n\n## 二、数据收集与隐私保护\n\n1. **统计数据收集**  \n   本站使用 [Google Analytics 4 (GA4)](https://analytics.google.com/) 进行数据统计，该服务通过 [Cloudflare Zaraz](https://www.cloudflare.com/products/zaraz/) 部署，以改进网站内容与性能。GA4 会收集如下匿名信息：  \n   - 访问来源国家或地区  \n   - 使用设备类型与操作系统  \n   - 浏览器语言与版本信息  \n   - 访问页面路径与停留时间等汇总统计数据  \n\n   以上信息均为**匿名统计数据**，不会与特定个人身份相联系，亦不会用于任何个体识别或商业目的。所有统计数据均通过 Cloudflare Zaraz 处理，该服务提供增强的隐私控制和数据处理能力。\n\n2. **用户认证与登录信息**  \n   本站使用 [Supabase Auth](https://supabase.com/docs/guides/auth) 作为账户认证系统。用户在登录或注册时，授权行为直接由 Supabase 平台处理，本站仅接收 Supabase 返回的最少必要信息（例如：用户唯一标识符、邮箱地址等）。  \n   本站不直接存储用户密码，登录方式包括：\n   - GitHub 账户授权登录  \n   - 邮件 Magic Link 登录（一次性链接，无需输入密码）  \n\n   您理解并同意，上述授权行为受 Supabase 及 GitHub 各自隐私政策约束。\n\n3. **Cookies 与本地存储**  \n   为维持登录状态或改善用户体验，本站可能使用 Cookies 或本地存储技术。相关数据仅限本站访问，不会用于跨站追踪。\n\n---\n\n## 三、账户与访问权限\n\n1. 登录用户可浏览登录后专属的文章内容。  \n2. 未登录用户仅可访问公开文章与页面。  \n3. 用户有义务妥善保管其账户及关联邮箱的安全，不得与他人共享或转让账户。\n\n---\n\n## 四、评论与内容发布\n\n1. 登录用户发布的评论将即时显示。  \n2. 未登录（匿名）用户的评论将在管理员审核通过后方可公开显示。  \n3. 用户在评论区勾选“接收评论回复提醒”即表示：  \n   - 明确同意本站在其评论被回复时，向其提供的邮箱地址发送提醒邮件；  \n   - 同意本站为实现此功能而临时保存必要的邮箱信息。  \n\n4. 用户发布的评论须遵守社区规范，不得包含以下内容：  \n   - 煽动暴力、仇恨言论或针对特定群体的歧视；  \n   - 侮辱、诽谤、骚扰或侵犯他人隐私；  \n   - 侵犯知识产权的内容；  \n   - 广告、垃圾信息、恶意链接等非相关内容。  \n   违反者的评论将被删除，严重者其账号可能被永久封禁。\n\n---\n\n## 五、知识产权声明\n\n1. 本站原创内容（包括但不限于文字、图片、设计等）均受著作权法保护。未经授权，任何个人或机构不得以任何形式复制、转载或用于商业用途。  \n2. 用户保留其自行发布内容的版权，但授权本站在合理范围内展示、存储及备份。\n\n---\n\n## 六、免责声明\n\n1. 本站不对因第三方服务（包括但不限于 Supabase、GitHub、Cloudflare Zaraz、Google Analytics）导致的服务中断、数据丢失、或其他技术问题承担责任。  \n2. 用户自行承担因其评论、发布内容或使用本站功能而可能引发的法律责任。  \n3. 本站不对外部链接或引用内容的准确性、合法性承担保证责任。\n\n---\n\n## 七、协议的变更与生效\n\n1. 本协议可根据网站运营及法律要求进行修订，更新后的版本将在本页公示并即时生效。  \n2. 用户在修改后继续使用本站服务的，视为已接受修改后的协议内容。\n\n---\n\n## 八、联系方式\n\n如您对本协议或本站的数据处理有任何疑问或请求，请通过本站提供的联系方式与管理员取得联系。\n\n---\n\n**附注**  \n本协议的解释、效力及纠纷解决，适用本站运营者所在地法律。";

const enContent = "# Terms of Service\n\n**Last Updated: November 9, 2025**  \nWelcome to Firewood (“the Site”). To protect your rights and comply with relevant laws and regulations, please read this **Terms of Service** (“the Agreement”) carefully before using any services provided by the Site.  \nBy accessing, registering, logging in, or using any part of the Site, you acknowledge that you have fully understood and agreed to be bound by all terms of this Agreement.\n\n---\n\n## 1. General Information\n\nThe Site is independently operated by an individual for the purpose of publishing original content and providing reading and interaction features. The Site does not engage in any commercial advertising or data trading activities.\n\n---\n\n## 2. Data Collection and Privacy\n\n1. **Analytics Data**  \n   The Site uses [Google Analytics 4 (GA4)](https://analytics.google.com/) deployed through [Cloudflare Zaraz](https://www.cloudflare.com/products/zaraz/) for analytics to improve content and performance. GA4 collects limited non-personal information, including:\n   - Visitor's country or region  \n   - Device type and operating system  \n   - Browser language and version  \n   - Page visits and time spent on the Site  \n\n   These data are **aggregated and anonymized**. They are not associated with identifiable individuals and are never used for tracking or commercial purposes. All analytics data is processed through Cloudflare Zaraz, which provides enhanced privacy controls and data processing capabilities.\n\n2. **User Authentication**  \n   The Site uses [Supabase Auth](https://supabase.com/docs/guides/auth) for user authentication. When you log in or register, authorization is handled directly by the Supabase platform.  \n   The Site only receives minimal necessary data returned by Supabase, such as:\n   - Unique user identifier  \n   - Email address  \n\n   The Site does not store user passwords. Login options include:\n   - GitHub OAuth authentication  \n   - Magic Link login via email (no password required)  \n\n   All authorization is subject to the privacy policies of Supabase and GitHub respectively.\n\n3. **Cookies and Local Storage**  \n   The Site may use cookies or browser local storage to maintain session states or improve user experience. These data are accessible only to the Site and are not used for cross-site tracking.\n\n---\n\n## 3. Accounts and Access Rights\n\n1. Logged-in users may access members-only articles.  \n2. Unauthenticated users may only view public content.  \n3. Users are responsible for maintaining the security of their accounts and associated email addresses. Account sharing or transfer is prohibited.\n\n---\n\n## 4. Comments and User-Generated Content\n\n1. Comments from logged-in users are published immediately.  \n2. Comments from anonymous users are subject to administrator review before being displayed.  \n3. When a user checks the box labeled “Receive reply notifications,” they explicitly agree that:  \n   - The Site may send a notification email to their provided address when their comment receives a reply.  \n   - The Site may temporarily store the necessary email data for this purpose.  \n\n4. Users must comply with community standards when posting comments. The following content is prohibited:  \n   - Incitement to violence, hate speech, or discrimination against specific groups  \n   - Insults, defamation, harassment, or privacy violations  \n   - Intellectual property infringement  \n   - Advertising, spam, or irrelevant content  \n\n   Violating comments may be deleted, and offending accounts may be permanently banned.\n\n---\n\n## 5. Intellectual Property\n\n1. All original materials on the Site (including text, images, and designs) are protected under copyright law. Reproduction, distribution, or commercial use without prior consent is prohibited.  \n2. Users retain the copyright of their own submitted content but grant the Site a limited license to display, store, and back up such content.\n\n---\n\n## 6. Disclaimer\n\n1. The Site is not responsible for any service interruptions, data loss, or other technical issues caused by third-party services (including but not limited to Supabase, GitHub, Cloudflare Zaraz, and Google Analytics).  \n2. Users are solely responsible for the content they post and any legal consequences arising therefrom.  \n3. The Site is not liable for the accuracy or legality of external links or referenced materials.\n\n---\n\n## 7. Modification and Effectiveness\n\n1. The Site reserves the right to modify or update this Agreement at any time. Updates will be published on this page and take effect immediately upon posting.  \n2. Continued use of the Site after modifications constitutes acceptance of the revised terms.\n\n---\n\n## 8. Contact\n\nFor inquiries or requests regarding this Agreement or data processing, please contact the Site administrator via the communication methods provided on the Site.\n\n---\n\n**Note:**  \nThe interpretation, validity, and enforcement of this Agreement shall be governed by the laws applicable in the jurisdiction where the Site owner resides.";

const jpContent = "# 利用規約\n\n**最終更新日：2025年11月9日**  \n本ウェブサイト（以下「本サイト」または「積薪（Firewood）」といいます）をご利用いただきありがとうございます。  \n本サイトのサービスを利用する前に、本「利用規約」（以下「本規約」）をよくお読みください。  \n本サイトにアクセス、登録、ログイン、またはサービスを利用した時点で、利用者は本規約のすべての条項に同意したものとみなされます。\n\n---\n\n## 第1条　本サイトについて\n\n本サイトは個人により独立運営され、主にオリジナル記事の公開および閲覧・交流の機能を提供します。  \n本サイトは広告配信やユーザーデータの販売などの商業活動を一切行いません。\n\n---\n\n## 第2条　データ収集およびプライバシー保護\n\n1. **アクセス解析について**  \n   本サイトは [Google Analytics 4 (GA4)](https://analytics.google.com/) を利用し、[Cloudflare Zaraz](https://www.cloudflare.com/products/zaraz/) を通じてデプロイされたアクセス解析を行います。  \n   収集される情報は以下の通りです。  \n   - 訪問者の国または地域  \n   - 使用デバイスの種類・OS情報  \n   - ブラウザの言語・バージョン  \n   - 訪問ページや滞在時間などの統計情報  \n\n   これらの情報は**個人を特定しない形で集計**され、追跡や商業利用の目的で使用されることはありません。すべての解析データは Cloudflare Zaraz を通じて処理され、プライバシー制御とデータ処理機能が強化されています。\n\n2. **ユーザー認証について**  \n   本サイトは [Supabase Auth](https://supabase.com/docs/guides/auth) を認証システムとして使用しています。  \n   ログインや登録時の認可処理は Supabase のサーバー上で直接行われ、本サイトが取得するのは必要最小限の情報（例：ユーザーID、メールアドレス等）のみです。  \n   本サイトはパスワードを保存しません。ログイン方法は以下の通りです。  \n   - GitHub アカウントによるOAuthログイン  \n   - メールで送信される Magic Link（ワンクリック認証）  \n\n   上記の認証行為は Supabase および GitHub 各社のプライバシーポリシーに従います。\n\n3. **Cookieおよびローカルストレージ**  \n   ログイン状態の維持や利便性向上のため、本サイトでは Cookie またはローカルストレージを使用する場合があります。  \n   これらのデータは本サイト内のみで使用され、第三者や他サイトへの追跡目的では利用されません。\n\n---\n\n## 第3条　アカウントとアクセス権限\n\n1. ログインしたユーザーは、会員専用記事を閲覧できます。  \n2. 未ログインユーザーは、公開記事のみ閲覧できます。  \n3. ユーザーは自身のアカウントおよび登録メールアドレスの管理責任を負い、第三者への譲渡・共有を禁止します。\n\n---\n\n## 第4条　コメントおよびユーザー投稿\n\n1. ログインユーザーのコメントは即時に表示されます。  \n2. 匿名ユーザーのコメントは管理者の承認後に公開されます。  \n3. コメント欄で「コメント返信通知を受け取る」にチェックを入れた場合、以下に同意したものとみなされます。  \n   - コメントへの返信があった際、本サイトが指定メールアドレスに通知メールを送信すること。  \n   - 上記の目的のために、メールアドレス情報を一時的に保存すること。  \n\n4. ユーザーはコミュニティ基準に従い、以下の内容を含むコメントを投稿してはなりません。  \n   - 暴力の扇動、ヘイトスピーチ、特定集団への差別  \n   - 誹謗中傷、ハラスメント、プライバシー侵害  \n   - 知的財産権の侵害  \n   - 広告、スパム、無関係なリンクや投稿  \n\n   違反コメントは削除され、悪質な場合はアカウントを永久停止することがあります。\n\n---\n\n## 第5条　知的財産権\n\n1. 本サイト上のオリジナルコンテンツ（文章、画像、デザイン等）は著作権法により保護されています。  \n   無断転載、複製、商業利用を禁止します。  \n2. ユーザーが投稿したコンテンツの著作権はユーザー自身に帰属しますが、  \n   本サイトは合理的な範囲内で当該コンテンツを表示・保存・バックアップする権利を有します。\n\n---\n\n## 第6条　免責事項\n\n1. 本サイトは、第三者サービス（Supabase、GitHub、Cloudflare Zaraz、Google Analytics等）による障害・データ損失・通信中断等について責任を負いません。  \n2. ユーザーの投稿内容に起因する法的責任は、ユーザー自身が負うものとします。  \n3. 外部リンクや引用情報の正確性・合法性について、本サイトは保証いたしません。\n\n---\n\n## 第7条　本規約の変更と効力\n\n1. 本規約は、運営上または法的要請に応じて随時改訂される場合があります。  \n   改訂後の内容は本ページに掲載された時点で即時に効力を発生します。  \n2. ユーザーが改訂後も本サイトを利用する場合、変更後の規約に同意したものとみなします。\n\n---\n\n## 第8条　お問い合わせ\n\n本規約またはデータの取扱いに関するお問い合わせは、本サイトに記載された連絡先を通じて運営者までご連絡ください。\n\n---\n\n**附則**  \n本規約の解釈、効力および紛争解決については、本サイト運営者の所在地の法令に準拠するものとします。";

const $$Astro = createAstro();
const prerender = false;
const $$TermsOfUse = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TermsOfUse;
  const TERMS_BY_LANG = {
    zh: zhContent,
    en: enContent,
    jp: jpContent
  };
  const AVAILABLE_LANGS = ["zh", "en", "jp"];
  g.setOptions({ gfm: true, breaks: true });
  const langParam = Astro2.params.lang ?? "zh";
  const lang = AVAILABLE_LANGS.includes(langParam) ? langParam : "zh";
  const html = await g.parse(TERMS_BY_LANG[lang]);
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const legalCopy = LegalText(lang);
  const siteLabel = getLanguageLabel(HomepageText, lang);
  const pageTitle = `${legalCopy.title} | ${siteLabel.title}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": pageTitle, "description": legalCopy.description, "ogTitle": pageTitle, "ogDescription": legalCopy.description, "ogType": "article", "pathWithoutLang": "terms-of-use", "availableLangs": AVAILABLE_LANGS, "baseUrl": baseUrl }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-3xl px-4 py-12 lg:py-16"> <header class="space-y-2"> <h1 class="text-3xl font-bold text-zinc-800 sm:text-4xl">${legalCopy.title}</h1> <p class="text-sm text-zinc-500">${legalCopy.description}</p> </header> <article class="mt-10 space-y-6 text-base leading-8 text-zinc-700 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-zinc-800 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-zinc-700 [&_strong]:font-semibold [&_a]:text-violet-700 [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-2 [&_blockquote]:border-violet-600 [&_blockquote]:pl-4 [&_blockquote]:text-zinc-600 [&_hr]:my-10">${unescapeHTML(html)}</article> </section> ` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/terms-of-use.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/terms-of-use.astro";
const $$url = "/[lang]/terms-of-use";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TermsOfUse,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
