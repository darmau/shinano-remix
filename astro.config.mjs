import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  publicDir: "../public",
  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: "passthrough",
  }),
  i18n: {
    locales: ["zh", "en", "jp"],
    defaultLocale: "zh",
    routing: { prefixDefaultLocale: true },
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Avoid React DevTools / SSR mismatch with React 19 in Cloudflare adapter
      alias: import.meta.env.PROD
        ? { "react-dom/server": "react-dom/server.edge" }
        : undefined,
    },
  },
});
