import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@api": "/src/api",
      "@type": "/src/types",
      "@utils": "/src/utils",
      "@pages": "/src/pages",
      "@errors": "/src/errors",
      "@assets": "/src/assets",
      "@context": "/src/context",
      "@messages": "/src/messages",
      "@layout": "/src/layout",
      "@hooks": "/src/hooks",
    },
  },
  server: {
    proxy: {
      "/v1/search/local": {
        target: "https://openapi.naver.com",
        changeOrigin: true,
      },
    },
  },
});
