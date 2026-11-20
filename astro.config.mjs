// @ts-check
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
// Each framework's runtime gets its own chunk, so an island only loads the
// framework it uses. Packages that are not listed, such as astro and
// nanostores, go to the shared "app" chunk.
/** @type {Record<string, (string | RegExp)[]>} */
const frameworkChunks = {
  react: ["react", "react-dom", "scheduler", "@astrojs/react"],
};

/**
 * @param {string} id
 * @returns {string | undefined}
 */
function getChunkName(id) {
  // Vite's preload helper is used by every framework. Left alone, the bundler
  // puts it in whichever framework chunk it sees first.
  if (id.startsWith("\0vite/")) return "app";
  const match = id.match(/.*node_modules\/((?:@[^/]+\/)?[^/]+)/);
  if (!match) return;
  const pkg = match[1];
  for (const [framework, patterns] of Object.entries(frameworkChunks)) {
    if (
      patterns.some((p) => (typeof p === "string" ? p === pkg : p.test(pkg)))
    ) {
      return `app-${framework}`;
    }
  }
  return "app";
}

// https://astro.build/config
export default defineConfig({
  build: {
    assets: "assets",
    inlineStylesheets: "always",
  },
  integrations: [
    react({
      include: ["src/framework/react/*"],
    }),
  ],
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: `assets/[name].[hash].[ext]`,
          chunkFileNames: `[name].[hash].js`,
          entryFileNames: `[name].[hash].js`,
          manualChunks: getChunkName,
        },
      },
    },
    plugins: [
      // The default base64 hash can end in "_" or "-", and ODC drops a trailing
      // "_" from a resource's URL, so the file 404s. base36 keeps hashes
      // alphanumeric. It is set from a plugin rather than rollupOptions because
      // @qwik.dev/astro builds the q-*.js chunks in a separate Vite build that
      // keeps the plugins but not the rest of this config.
      {
        name: "islands:alphanumeric-hashes",
        outputOptions(options) {
          return { ...options, hashCharacters: "base36" };
        },
      },
    ],
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
