// @ts-check
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    react()],
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: `assets/[name]_[hash].[ext]`,
          chunkFileNames: `[name]_[hash].js`,
          entryFileNames: `[name]_[hash].js`,
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "app.js";
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        fs: "node:fs",
        http: "node:http",
        https: "node:https",
        os: "node:os",
        path: "node:path",
        url: "node:url",
      },
    },
  },
});
