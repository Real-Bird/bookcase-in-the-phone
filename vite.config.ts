import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), mkcert()],
  server: {
    host: "localhost",
    https: true,
    port: 3000,
  },
  preview: {
    host: "localhost",
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            const module = id.split("node_modules/").pop().split("/")[0];
            return `vendor/${module}`;
          }
        },
        compact: true,
      },
    },
  },
});
