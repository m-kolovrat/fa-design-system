import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// Read by both Storybooks (the React Vite framework loads it) and by Vitest.
export default defineConfig({
    // `@/` comes from the `paths` in tsconfig.json. The plugin resolves each import itself rather than
    // through `resolve.alias`, where a root-equal replacement breaks under Vite 8's rolldown.
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    build: {
        target: "esnext",
    },
    test: {
        environment: "node",
        include: ["**/*.test.ts"],
        exclude: ["node_modules", "dist", "sandbox", ".claude", "storybook-static", "sandbox-static"],
    },
});
