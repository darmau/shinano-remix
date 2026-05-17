// Port of app/utils/structuredData.ts (only the functions the article PoC needs;
// album/thought/person helpers will be added when those pages are migrated).
import type { Article } from "~/types/Article";

const SITE_AUTHOR = {
  "@type": "Person" as const,
  name: "李大毛",
  url: "https://darmau.co",
  sameAs: [
    "https://x.com/darmau8964",
    "https://github.com/Darmau",
    "https://www.threads.com/@uedashishi",
    "https://www.youtube.com/@darmau",
  ],
};

const SITE_PUBLISHER = {
  "@type": "Organization" as const,
  name: "李大毛的个人网站",
  url: "https://darmau.co",
  logo: {
    "@type": "ImageObject" as const,
    url: "https://darmau.co/logo.svg",
  },
};

export function generateWebsiteStructuredData(params: {
  baseUrl: string;
  name: string;
  alternateName?: string[];
  inLanguage?: string;
}) {
  const { baseUrl, name, alternateName, inLanguage } = params;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    alternateName: alternateName && alternateName.length > 0 ? alternateName : undefined,
    url: baseUrl,
    inLanguage,
    publisher: SITE_PUBLISHER,
  };
}

export function generateArticleStructuredData(params: {
  article: Article & { updated_at?: string | null };
  baseUrl: string;
  imgPrefix: string;
  lang: string;
  url: string;
}) {
  const { article, imgPrefix, lang, url } = params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.abstract || article.subtitle || "",
    author: SITE_AUTHOR,
    publisher: SITE_PUBLISHER,
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    url,
    inLanguage: lang,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  if (article.cover) {
    structuredData.image = {
      "@type": "ImageObject",
      url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${article.cover.storage_key}`,
      width: article.cover.width,
      height: article.cover.height,
      caption: article.cover.alt || article.title,
    };
  }

  if (article.category) structuredData.articleSection = article.category.title;
  if (article.topic && article.topic.length > 0) structuredData.keywords = article.topic.join(", ");
  if (article.comments && article.comments.length > 0) structuredData.commentCount = article.comments[0].count;
  if (article.page_view) {
    structuredData.interactionStatistic = {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ReadAction",
      userInteractionCount: article.page_view,
    };
  }

  if (article.is_premium) {
    structuredData.isAccessibleForFree = false;
    structuredData.hasPart = {
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".article-content",
    };
    structuredData.isPartOf = {
      "@type": ["CreativeWork", "Product"],
      name: "Premium Membership",
      productID: "premium-article",
    };
  } else {
    structuredData.isAccessibleForFree = true;
  }

  return structuredData;
}

export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
}

type RawSupabaseComment = {
  id: number;
  content_text: string | null;
  created_at: string | null;
  name: string | null;
  is_anonymous: boolean | null;
  reply_to: { id: number } | null;
  users: unknown;
};

export function buildCommentsStructuredData(
  comments: ReadonlyArray<RawSupabaseComment>,
  baseUrl: string,
  articleUrl: string,
) {
  if (comments.length === 0) return [];

  return comments.map((comment) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {
      "@context": "https://schema.org",
      "@type": "Comment",
      "@id": `${articleUrl}#comment-${comment.id}`,
      text: comment.content_text ?? "",
      dateCreated: comment.created_at ?? "",
      author: comment.is_anonymous
        ? { "@type": "Person", name: comment.name || "匿名用户" }
        : {
            "@type": "Person",
            name: (comment.users as { name?: string } | null)?.name ?? "用户",
          },
    };

    if (comment.reply_to) {
      data.parentItem = {
        "@type": "Comment",
        "@id": `${articleUrl}#comment-${comment.reply_to.id}`,
      };
    }

    return data;
  });
}

export function generateAlbumStructuredData(params: {
  album: {
    id: number;
    title: string;
    slug: string;
    abstract: string | null;
    published_at: string;
    page_view: number;
    images: Array<{
      id: number;
      alt: string | null;
      caption: string | null;
      storage_key: string;
      width: number;
      height: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      exif: any;
      location: string | null;
      latitude: number | null;
      longitude: number | null;
    }>;
    comments?: { count: number }[];
  };
  baseUrl: string;
  imgPrefix: string;
  lang: string;
  url: string;
}) {
  const { album, imgPrefix, lang, url } = params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: album.title,
    description: album.abstract,
    author: SITE_AUTHOR,
    publisher: SITE_PUBLISHER,
    datePublished: album.published_at,
    url,
    inLanguage: lang,
  };

  if (album.page_view) {
    structuredData.interactionStatistic = {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ViewAction",
      userInteractionCount: album.page_view,
    };
  }

  if (album.comments && album.comments.length > 0) {
    structuredData.commentCount = album.comments[0].count;
  }

  if (album.images && album.images.length > 0) {
    structuredData.associatedMedia = album.images.map((image) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const imageObject: any = {
        "@type": "ImageObject",
        contentUrl: `${imgPrefix}/${image.storage_key}`,
        url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${image.storage_key}`,
        width: image.width,
        height: image.height,
        caption: image.caption || image.alt,
        name: image.alt,
      };
      if (image.exif) imageObject.exifData = image.exif;
      if (image.latitude && image.longitude) {
        imageObject.contentLocation = {
          "@type": "Place",
          geo: {
            "@type": "GeoCoordinates",
            latitude: image.latitude,
            longitude: image.longitude,
          },
          ...(image.location ? { name: image.location } : {}),
        };
      }
      return imageObject;
    });

    if (album.images[0]) {
      structuredData.image = {
        "@type": "ImageObject",
        url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${album.images[0].storage_key}`,
        width: album.images[0].width,
        height: album.images[0].height,
      };
    }
  }

  return structuredData;
}

export function generateThoughtStructuredData(params: {
  thought: {
    id: number;
    slug: string;
    content_text: string;
    created_at: string;
    page_view: number;
    images?: Array<{
      alt: string | null;
      storage_key: string;
      width: number;
      height: number;
    }>;
    comments?: { count: number }[];
  };
  baseUrl: string;
  imgPrefix: string;
  lang: string;
  url: string;
}) {
  const { thought, imgPrefix, lang, url } = params;
  const headline = thought.content_text.slice(0, 100);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "SocialMediaPosting",
    headline,
    articleBody: thought.content_text,
    author: SITE_AUTHOR,
    publisher: SITE_PUBLISHER,
    datePublished: thought.created_at,
    url,
    inLanguage: lang,
  };

  if (thought.images && thought.images.length > 0) {
    structuredData.image =
      thought.images.length === 1
        ? {
            "@type": "ImageObject",
            url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=800/${thought.images[0].storage_key}`,
            width: thought.images[0].width,
            height: thought.images[0].height,
            caption: thought.images[0].alt,
          }
        : thought.images.map((image) => ({
            "@type": "ImageObject",
            url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=800/${image.storage_key}`,
            width: image.width,
            height: image.height,
            caption: image.alt,
          }));
  }

  if (thought.page_view) {
    structuredData.interactionStatistic = {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ReadAction",
      userInteractionCount: thought.page_view,
    };
  }

  if (thought.comments && thought.comments.length > 0) {
    structuredData.commentCount = thought.comments[0].count;
  }

  return structuredData;
}

export function generatePersonStructuredData(params: {
  name: string;
  description: string;
  image: { url: string; width: number; height: number };
  url: string;
  sameAs?: string[];
}) {
  const { name, description, image, url, sameAs } = params;
  return {
    "@context": "https://schema.org",
    "@type": ["WebPage", "ProfilePage"],
    url,
    mainEntity: {
      "@type": "Person",
      name,
      description,
      image: {
        "@type": "ImageObject",
        url: image.url,
        width: image.width,
        height: image.height,
      },
      url,
      sameAs: sameAs ?? [
        "https://x.com/darmau8964",
        "https://github.com/Darmau",
        "https://www.threads.com/@uedashishi",
        "https://www.youtube.com/@darmau",
      ],
    },
  };
}

export function serializeStructuredData(data: unknown): string {
  return JSON.stringify(data);
}
