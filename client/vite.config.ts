import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ include: "**/*.tsx" }),
    EnvironmentPlugin({
      VITE_PUBLIC_STRIPE_KEY: null,
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    hmr: true,
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000, // you can replace this port with any port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
