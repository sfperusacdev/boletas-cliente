import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
