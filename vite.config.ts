import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/economy-game/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
      },
    },
  },
});
