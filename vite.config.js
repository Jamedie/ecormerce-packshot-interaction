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
      $routes: path.resolve(import.meta.dirname, "./src/routes"),
      $components: path.resolve(import.meta.dirname, "./src/components"),
      $data: path.resolve(import.meta.dirname, "./src/data"),
      $assets: path.resolve(import.meta.dirname, "./src/assets"),
    },
  },
  build: {
    outDir: "../public",
    chunkFileNames: "js/[name].js",
    //assetFileNames: `assets/[name].[ext]`,
    assetFileNames: ({ name }) => {
      if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? "")) {
        return "img/[name][extname]";
      }

      if (/\.css$/.test(name ?? "")) {
        return "css/[name][extname]";
      }

      // default value
      // ref: https://rollupjs.org/guide/en/#outputassetfilenames
      return "img/[name][extname]";
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
      input: {
        index: path.resolve(import.meta.dirname, "src/index.html"),
      },
    },
  },
});
