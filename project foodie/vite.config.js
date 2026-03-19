import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/foodie/", // 把 <repo-name> 換成你的專案名稱
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
