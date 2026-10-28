import type { StorybookConfig } from "@storybook/nextjs-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * The sandbox Storybook (`npm run sandbox`): prototype pages and experiment runs from `sandbox/`,
 * kept apart from the library's own Storybook. Pages import the library by its package paths
 * (`fa-design-system/components/...`), mapped here to the local source, so they build the way an
 * app would but always against the current library.
 */
const config: StorybookConfig = {
    stories: ["../sandbox/**/*.story.tsx"],
    addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
    staticDirs: ["../public"],
    framework: "@storybook/nextjs-vite",
    viteFinal: async (viteConfig) => {
        viteConfig.resolve ??= {};
        const aliases = ["components", "hooks", "utils", "styles"].map((dir) => ({
            find: new RegExp(`^fa-design-system/${dir}`),
            replacement: path.join(root, dir),
        }));
        const existing = viteConfig.resolve.alias;
        viteConfig.resolve.alias = [
            ...aliases,
            ...(Array.isArray(existing) ? existing : Object.entries(existing ?? {}).map(([find, replacement]) => ({ find, replacement }))),
        ];
        return viteConfig;
    },
};

export default config;
