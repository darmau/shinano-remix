export type GalleryItemType = "photo" | "thought";

export interface GalleryMediaImage {
  id: string;
  alt: string | null;
  storage_key: string;
  width: number;
  height: number;
}

export interface GalleryItem {
  type: GalleryItemType;
  id: number;
  slug: string | null;
  title: string;
  content: string;
  createdAt: string;
  images: GalleryMediaImage[];
}
