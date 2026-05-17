export interface FeaturedPhoto {
  id: number;
  slug: string | null;
  title: string;
  language: { lang: string | null };
  cover: {
    id: string;
    alt: string | null;
    storage_key: string;
    width: number;
    height: number;
  };
}

export interface GalleryPhoto {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  href: string;
  label: string;
  title: string;
  storage_key: string;
}

export function generatePhotoAlbum(
  featuredPhotos: FeaturedPhoto[],
  prefix: string,
  lang: string,
): GalleryPhoto[] {
  return featuredPhotos.map((p) => ({
    key: p.id.toString(),
    src: `${prefix}/cdn-cgi/image/format=auto,width=560/${p.cover.storage_key}`,
    width: p.cover.width,
    height: p.cover.height,
    alt: p.title,
    href: `/${lang}/album/${p.slug}`,
    label: p.title,
    storage_key: p.cover.storage_key,
    title: p.title,
  }));
}
