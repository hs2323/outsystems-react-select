/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig(async () => ({
  test: {
    projects: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plugins: [react() as any],
        test: {
          environment: "happy-dom",
          globals: true,
          include: ["test/integration/react/**/*.test.tsx"],
          name: "react",
          setupFiles: ["test/setup-test-env.ts"],
        },
      },
      {
        test: {
          environment: "node",
          globals: true,
          include: ["**/*.test.ts"],
          name: "unit",
          root: "./test/unit",
        },
      },
    ],
    reporters: ["default"],
  },
}));
