import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Vite 官方推薦的寫法：接收一個包含 command 和 mode 的物件
export default defineConfig(({ command, mode }) => {
  // command 會有兩種值：
  // 'serve': 代表你在本地端跑 npm run dev
  // 'build': 代表你在打包準備部署 npm run build
  const isProduction = command === "build";

  return {
    plugins: [vue()],

    // 如果是打包 (Production)，就加上 GitHub repo 的名稱路徑
    // 如果是本地開發 (Serve)，就保持在根目錄 '/'
    base: isProduction ? "/new-foodie/" : "/",

    server: {
      proxy: {
        "/api": {
          target: "https://foodie-node-api.vercel.app",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
