import { fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import markdown from "@eslint/markdown";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import-x";
import pluginJest from "eslint-plugin-jest";
import pluginJestDom from "eslint-plugin-jest-dom";
import { configs as litConfigs } from "eslint-plugin-lit";
import perfectionist from "eslint-plugin-perfectionist";
import playwright from "eslint-plugin-playwright";
// import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tseslint from "typescript-eslint";

import svelteConfig from "./svelte.config.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      ".astro/*",
      ".claude/*",
      ".integrations/",
      "dist/*",
      "node_modules/*",
      "output/*",
      "playwright-report/*",
      "tests-results/*",
      "AGENTS.md",
      "**.d.ts",
    ],
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["test/e2e/**/*.{js,mjs,cjs,ts,jsx,tsx,md}"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  // {
  //   ...pluginReact.configs.flat.recommended,
  //   ...pluginReact.configs.flat["jsx-runtime"],
  //   files: [
  //     "src/framework/react/**/*.{js,ts,jsx,tsx}",
  //     "test/integration/react/**/*.{js,ts,jsx,tsx}",
  //   ],
  //   settings: {
  //     react: {
  //       version: "detect",
  //     },
  //   },
  // },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      import: fixupPluginRules(importPlugin),
    },
    rules: {
      "import/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          groups: ["builtin", "external", "internal", "parent", "sibling"],
          pathGroups: [
            {
              group: "internal",
              pattern: "~/**",
              position: "after",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.spec.{js,ts,jsx,tsx}", "**/*.test.{js,ts,jsx,tsx}"],
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    plugins: { jest: pluginJest },
  },
  {
    files: ["**/*.spec.{js,ts,jsx,tsx}", "**/*.test.{js,ts,jsx,tsx}"],
    ...pluginJestDom.configs["flat/recommended"],
  },
  {
    files: [
      "test/integration/**/*.spec.{js,ts,jsx,tsx}",
      "test/integration/**/*.test.{js,ts,jsx,tsx}",
    ],
    ...testingLibrary.configs["flat/react"],
    rules: {
      "testing-library/no-await-sync-events": "off",
    },
  },
  {
    files: ["**/*.md", "**/*.markdown"],
    plugins: {
      markdown,
    },
    processor: markdown.processors.markdown,
    rules: {
      ...markdown.configs.recommended.rules,
      "markdown/no-html": "error",
    },
  },
  eslintConfigPrettier,
  perfectionist.configs["recommended-alphabetical"],
  {
    rules: {
      "perfectionist/sort-imports": ["off"],
    },
  },
  ...pluginVue.configs["flat/recommended"].map((config) => ({
    ...config,
    files: ["src/framework/vue/**/*.{js,ts,vue}"],
    rules: {
      ...config.rules,
      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
      "vue/multi-word-component-names": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  })),
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        extraFileExtensions: [".vue"],
        parser: tseslint.parser,
        sourceType: "module",
      },
    },
  },
  {
    files: [
      "src/framework/qwik/**/*.{js,ts,jsx,tsx}",
      "test/integration/qwik/**/*.{js,ts,jsx,tsx}",
    ],
    rules: {
      "react-hooks/rules-of-hooks": "off",
      "testing-library/no-node-access": "off",
    },
  },
];
