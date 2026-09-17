// ts-parts/vite.config.ts
// 変更理由: アプリビルドとライブラリビルド（型定義自動出力含む）の動的分岐対応 [tag: fix-vite-lib-dts-coexistence]
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
    const isLib = mode === "lib";

    return {
        plugins: [
            react(),
            tailwindcss(),
            // ライブラリモード時のみ型定義 (.d.ts) を自動生成
            isLib && dts({ rollupTypes: true, insertTypesEntry: true }),
        ].filter(Boolean),
        base: isLib ? "/" : "/Web-Assist/",
        server: { port: 3002, strictPort: true },
        build: isLib
            ? {
                lib: {
                    entry: resolve(__dirname, "src/index.ts"),
                    name: "TsParts",
                    fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
                    formats: ["es", "cjs"],
                },
                rollupOptions: {
                    external: ["react", "react-dom", "react/jsx-runtime"],
                    output: {
                        globals: {
                            react: "React",
                            "react-dom": "ReactDOM",
                        },
                    },
                },
            }
            : {
                outDir: "dist",
            },
    };
});