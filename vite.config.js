import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === "production" ? "/new-foodie/" : "/",
  server: {
    proxy: {
      "/api": {
        target: "https://202603foodie-node-api-production.up.railway.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
