// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: ["tsconfig.json"],
    }),
  ],
  test: {
    environment: "happy-dom",
    exclude: [...configDefaults.exclude, "test/e2e/*"],
    globals: true,
    setupFiles: ["test/setup-test-env.ts"],
  },
});
