import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
    stories: ["../components/**/*.story.tsx", "../experiments/**/*.story.tsx"],
    addons: ["@storybook/addon-themes"],
    staticDirs: ["../public"],
    framework: "@storybook/nextjs-vite",
};

export default config;
