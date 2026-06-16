import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Configuration de Vitest pour les tests
  test: {
    // Simule un environnement navigateur pour les composants React
    environment: "jsdom",
    // Importe automatiquement les matchers jest-dom dans chaque test
    // ex: toBeInTheDocument(), toHaveTextContent()
    setupFiles: "./src/tests/setup.js",
    // Permet d'utiliser describe/it/expect sans les importer
    globals: true,
  },
});
