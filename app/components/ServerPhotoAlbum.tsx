import type {ComponentType} from "react";
import * as PhotoAlbumServer from "react-photo-album/server";

type ServerPhotoAlbumExport = typeof PhotoAlbumServer extends {ServerPhotoAlbum: infer Stable}
  ? Stable
  : typeof PhotoAlbumServer extends {UnstableServerPhotoAlbum: infer Legacy}
    ? Legacy
    : never;

type ServerPhotoAlbumComponent = ServerPhotoAlbumExport extends ComponentType<any>
  ? ServerPhotoAlbumExport
  : never;

const stableServerPhotoAlbum = (PhotoAlbumServer as Partial<{ServerPhotoAlbum: ServerPhotoAlbumComponent}>).ServerPhotoAlbum;
const legacyServerPhotoAlbum = (PhotoAlbumServer as Partial<{UnstableServerPhotoAlbum: ServerPhotoAlbumComponent}>).UnstableServerPhotoAlbum;

const resolvedServerPhotoAlbum = stableServerPhotoAlbum ?? legacyServerPhotoAlbum;

if (!resolvedServerPhotoAlbum) {
  throw new Error("react-photo-album/server does not provide a compatible ServerPhotoAlbum export.");
}

const ServerPhotoAlbum = resolvedServerPhotoAlbum;

type ServerPhotoAlbumProps = ServerPhotoAlbumComponent extends ComponentType<infer Props>
  ? Props
  : never;

export {ServerPhotoAlbum};
export type {ServerPhotoAlbumProps};
