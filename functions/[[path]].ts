import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import type { ServerBuild } from "@remix-run/cloudflare";

const loadBuild = async (): Promise<ServerBuild> => {
  const mod = await import("../build/server");
  return mod as unknown as ServerBuild;
};

export const onRequest = createPagesFunctionHandler({ build: loadBuild });
