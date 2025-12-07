import { fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import markdown from "@eslint/markdown";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import pluginJest from "eslint-plugin-jest";
import pluginJestDom from "eslint-plugin-jest-dom";
import perfectionist from "eslint-plugin-perfectionist";
import playwright from "eslint-plugin-playwright";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      ".astro/*",
      "dist/*",
      "node_modules/*",
      "output/*",
      "playwright-report/*",
      "tests-results/*",
    ],
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,md}"],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat["jsx-runtime"],
    files: ["**/*.{js,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
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
    files: ["**/*.spec.{js,ts,jsx,tsx}", "**/*.test.{js,ts,jsx,tsx}"],
    ...testingLibrary.configs["flat/react"],
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
];
