import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Captions, Inline, Thumbnails } from "yet-another-react-lightbox/plugins";
import {
  ArrowsPointingOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import EXIF from "./EXIF";
import type { EXIFProps } from "./EXIF";

export interface AlbumPhoto {
  order: number;
  image: {
    alt: string;
    caption: string;
    height: number;
    width: number;
    storage_key: string;
    exif: unknown;
    location: string;
    latitude?: number | null;
    longitude?: number | null;
  };
}

interface Props {
  albumImages: AlbumPhoto[];
  prefix: string;
}

function generateSlides(images: AlbumPhoto[], prefix: string, target: number) {
  return images.map((p) => ({
    src: `${prefix}/cdn-cgi/image/format=auto,width=${target}/${p.image.storage_key}`,
    alt: p.image.alt,
    width: p.image.width,
    height: p.image.height,
    title: p.image.caption,
    srcSet: [
      {
        src: `${prefix}/cdn-cgi/image/format=auto,width=640/${p.image.storage_key}`,
        width: 640,
        height: Math.floor((640 * p.image.height) / p.image.width),
      },
      {
        src: `${prefix}/cdn-cgi/image/format=auto,width=1080/${p.image.storage_key}`,
        width: 1080,
        height: Math.floor((1080 * p.image.height) / p.image.width),
      },
      {
        src: `${prefix}/cdn-cgi/image/format=auto,width=1920/${p.image.storage_key}`,
        width: 1920,
        height: Math.floor((1920 * p.image.height) / p.image.width),
      },
    ],
  }));
}

export default function GallerySlide({ albumImages, prefix }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const defaultSlides = generateSlides(albumImages, prefix, 1280);
  const fullscreenSlides = generateSlides(albumImages, prefix, 2400);

  return (
    <div>
      <div className="relative group">
        <Lightbox
          index={index}
          plugins={[Inline, Thumbnails]}
          inline={{
            style: { width: "100%", maxWidth: "1280", aspectRatio: "5 / 4" },
          }}
          slides={defaultSlides}
          styles={{
            container: { backgroundColor: "transparent" },
            thumbnail: { gap: "16px" },
            thumbnailsContainer: { backgroundColor: "transparent" },
            button: { filter: "none" },
            slide: { padding: 0 },
          }}
          thumbnails={{
            imageFit: "contain",
            vignette: false,
            padding: 0,
            border: 3,
            borderColor: "#52525b",
          }}
          render={{
            iconPrev: () => (
              <div className="p-2 rounded-full bg-white/60 backdrop-blur-2xl">
                <ChevronLeftIcon className="h-5 w-5 text-black" />
              </div>
            ),
            iconNext: () => (
              <div className="p-2 rounded-full bg-white/60 backdrop-blur-2xl">
                <ChevronRightIcon className="h-5 w-5 text-black" />
              </div>
            ),
            slideFooter: () => (
              <div className="hidden md:block p-4 absolute w-full bottom-0 bg-linear-to-t from-black/60 to-transparent text-white">
                {albumImages[index].image.caption && (
                  <p className="mb-4">{albumImages[index].image.caption}</p>
                )}
                <EXIF exif={albumImages[index].image.exif as EXIFProps} />
              </div>
            ),
          }}
          on={{
            view: ({ index: currentIndex }) => setIndex(currentIndex),
          }}
        />
        <button
          type="button"
          aria-label="Full Screen"
          onClick={() => setOpen(true)}
          className="absolute top-8 right-8 z-50 p-2 rounded-full bg-white/60 backdrop-blur-2xl"
        >
          <ArrowsPointingOutIcon className="h-5 w-5" />
        </button>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={fullscreenSlides}
        plugins={[Thumbnails, Captions]}
      />
    </div>
  );
}
