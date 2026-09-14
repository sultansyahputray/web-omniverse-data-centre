import { defineConfig } from "vite";
import { viteExternalsPlugin } from "vite-plugin-externals";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react(),
        viteExternalsPlugin({
            GFN: "GFN"
        }),
    ],
    server: {
        port: 5175,
        host: true
    }
});
