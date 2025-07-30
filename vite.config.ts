import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        start_url: ".",
        display: "standalone",
        name: "NotificaSF",
        short_name: "NotificaSF",
        description: "Aplicativo de boletas y documentos",
        theme_color: "#ffffff",
        lang: "es",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  build: {
    rollupOptions: {
      // external:["pdfjs-dist"],
      output: {
        manualChunks: function (id) {
          // console.log(id);
          if (id.includes("node_modules")) {
            if (id.includes("pdf")) return "pdf";
            if (id.includes("react")) return "react";
            return "vendor";
          }
        },
      },
    },
  },
});
