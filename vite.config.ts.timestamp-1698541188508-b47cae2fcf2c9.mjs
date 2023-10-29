// vite.config.ts
import { defineConfig } from "file:///D:/Portfolio/bookcase-in-the-phone/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Portfolio/bookcase-in-the-phone/client/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///D:/Portfolio/bookcase-in-the-phone/client/node_modules/vite-tsconfig-paths/dist/index.mjs";
import mkcert from "file:///D:/Portfolio/bookcase-in-the-phone/client/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), tsconfigPaths(), mkcert()],
  server: {
    host: "localhost",
    https: true,
    port: 3e3,
  },
  preview: {
    host: "localhost",
    port: 3e3,
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
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQb3J0Zm9saW9cXFxcYm9va2Nhc2UtaW4tdGhlLXBob25lXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUG9ydGZvbGlvXFxcXGJvb2tjYXNlLWluLXRoZS1waG9uZVxcXFxjbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1BvcnRmb2xpby9ib29rY2FzZS1pbi10aGUtcGhvbmUvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuaW1wb3J0IG1rY2VydCBmcm9tIFwidml0ZS1wbHVnaW4tbWtjZXJ0XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgdHNjb25maWdQYXRocygpLCBta2NlcnQoKV0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgaHR0cHM6IHRydWUsXG4gICAgcG9ydDogMzAwMCxcbiAgfSxcbiAgcHJldmlldzoge1xuICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgcG9ydDogMzAwMCxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vZHVsZSA9IGlkLnNwbGl0KFwibm9kZV9tb2R1bGVzL1wiKS5wb3AoKS5zcGxpdChcIi9cIilbMF07XG4gICAgICAgICAgICByZXR1cm4gYHZlbmRvci8ke21vZHVsZX1gO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcGFjdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVCxTQUFTLG9CQUFvQjtBQUNsVixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxZQUFZO0FBR25CLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxHQUFHLE9BQU8sQ0FBQztBQUFBLEVBQzVDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYyxDQUFDLE9BQU87QUFDcEIsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLGtCQUFNLFNBQVMsR0FBRyxNQUFNLGVBQWUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUMzRCxtQkFBTyxVQUFVLE1BQU07QUFBQSxVQUN6QjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
