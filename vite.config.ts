import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/starshiran0854.github.io/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: "app.html",
      },
    },
  },
});
