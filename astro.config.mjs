// @ts-check
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: "always",
  },
  integrations: [react()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: `assets/[name]_[hash].[ext]`,
          chunkFileNames: `[name]_[hash].js`,
          entryFileNames: `[name]_[hash].js`,
          manualChunks: (id) => {
            if (id.includes("node_modules") || id.includes("src")) {
              return "app.js";
            }
            return "app.js";
          },
        },
      },
    },
  },
});
