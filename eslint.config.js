import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  // Dossiers ignorés par ESLint
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    // Règles personnalisées en plus de "recommended"
    rules: {
      // Avertit si une variable est déclarée mais jamais utilisée
      // sauf si elle commence par _ (convention pour "intentionnellement ignoré")
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    // Configuration spécifique aux fichiers de test
    files: ["**/*.test.{js,jsx}"],
    languageOptions: {
      // Ajoute les globales Vitest (describe, it, expect...)
      // pour qu'ESLint ne les considère pas comme des erreurs
      globals: {
        ...globals.browser,
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },
]);
