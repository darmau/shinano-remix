import ServerPhotoAlbum from "react-photo-album/server";
import "react-photo-album/masonry.css";
import GalleryImage from "./GalleryImage";
import type { GalleryPhoto } from "~/lib/photoAlbum";

interface Props {
  photos: GalleryPhoto[];
  prefix: string;
}

export default function FeaturedPhotoGrid({ photos, prefix }: Props) {
  return (
    <ServerPhotoAlbum
      layout="masonry"
      photos={photos}
      breakpoints={[480, 720, 960]}
      spacing={0}
      columns={(containerWidth: number) => {
        if (containerWidth < 480) return 1;
        if (containerWidth < 720) return 2;
        if (containerWidth < 960) return 3;
        return 4;
      }}
      render={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        photo: (_props, { photo }: { photo: (typeof photos)[number] }) => (
          <a
            key={photo.key}
            href={photo.href}
            className="group m-1 md:m-2 relative rounded-md overflow-hidden"
          >
            <div className="z-20 absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent">
              <div className="transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 p-4">
                <p className="text-white font-medium text-base">{photo.title}</p>
              </div>
            </div>
            <GalleryImage image={photo} width={640} classList="w-full h-full group" prefix={prefix} />
          </a>
        ),
      }}
    />
  );
}
