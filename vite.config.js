import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import mkcert from "vite-plugin-mkcert";
import path from "path";

export default defineConfig({
  plugins: [svelte(), mkcert()],
  resolve: {
    alias: {
      $routes: path.resolve(__dirname, "./src/routes"),
      $components: path.resolve(__dirname, "./src/components"),
    },
  },
  root: "./src",
  server: {
    https: true,
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      protocol: "wss",
    },
  },
  build: {
    outDir: "../public",
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "./src/index.html"),
      },
    },
  },
});
