import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import mkcert from "vite-plugin-mkcert";
import path from "path";

export default defineConfig({
  plugins: [svelte(), mkcert()],
  root: "src",
  publicDir: "public",
  server: {
    https: true,
  },
  resolve: {
    alias: {
      $routes: path.resolve(__dirname, "./src/routes"),
      $components: path.resolve(__dirname, "./src/components"),
      $data: path.resolve(__dirname, "./src/data"),
      $assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    outDir: "../public",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
      input: {
        index: path.resolve(__dirname, "src/index.html"),
      },
    },
  },
});
