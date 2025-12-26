import svgr from "vite-plugin-svgr";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load env variables with VITE_ prefix
  const env = loadEnv(mode, ".", "VITE_");

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
          exportType: "named",
          namedExport: "ReactComponent",
        },
      }),
    ],
    define: {
      __API_ENDPOINT__: JSON.stringify(env.VITE_API_ENDPOINT),
    },
  };
});
