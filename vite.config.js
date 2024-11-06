import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import { resolve } from "path";

export default defineConfig({
  plugins: [mkcert()],
  publicDir: "public",
  root: "src",
  server: {
    https: true,
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    outDir: "../public",
  },
});
