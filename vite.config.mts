import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Read by both Storybooks (the React Vite framework loads it) and by Vitest.
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        // `@/` comes from the `paths` in tsconfig.json. Vite resolves them itself; a `resolve.alias`
        // with a root-equal replacement breaks under Vite 8's rolldown, so don't add one.
        tsconfigPaths: true,
    },
    build: {
        target: "esnext",
    },
    test: {
        environment: "node",
        include: ["**/*.test.ts"],
        exclude: ["node_modules", "dist", "sandbox", ".claude", "storybook-static", "sandbox-static"],
    },
});
