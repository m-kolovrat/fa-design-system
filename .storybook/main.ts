import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
    stories: ["../components/**/*.story.tsx", "../experiments/**/*.story.tsx"],
    addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
    staticDirs: ["../public"],
    framework: "@storybook/nextjs-vite",
    // Props tables come from the TypeScript types and their JSDoc, not from hand-written argTypes.
    typescript: {
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            // `color?: "primary" | "secondary"` and `keyof typeof styles.sizes` show as their literal unions.
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            // Keep the props declared in this repo; drop the ones a component inherits from
            // node_modules (React DOM/HTML attributes, React Aria internals), which would bury them.
            propFilter: (prop) => !prop.declarations?.length || prop.declarations.some((d) => !d.fileName.includes("/node_modules/")),
        },
    },
};

export default config;
