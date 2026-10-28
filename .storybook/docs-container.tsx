import { type PropsWithChildren, useEffect, useState } from "react";
import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import { create } from "storybook/theming/create";

/**
 * Docs pages follow the toolbar's light/dark theme. `withThemeByClassName` (preview.ts) puts
 * `.dark-mode` on <html>; without this the Docs page stays white while the stories on it render
 * their dark tokens, which leaves tertiary and link buttons unreadable. Colors are the Fa gray
 * ramp in `styles/theme.css` (bg-primary, bg-secondary, border-secondary, text-*).
 */
const shared = {
    fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontCode: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
    appBorderRadius: 8,
    inputBorderRadius: 8,
};

const light = create({
    ...shared,
    base: "light",
    colorPrimary: "#0373E3", // brand-500
    colorSecondary: "#0373E3",
});

const dark = create({
    ...shared,
    base: "dark",
    colorPrimary: "#2A91F8", // brand-400
    colorSecondary: "#2A91F8",
    appBg: "#13161B", // gray-900 (dark) — bg-secondary
    appContentBg: "#0C0E12", // gray-950 (dark) — bg-primary
    appPreviewBg: "#0C0E12",
    appBorderColor: "#22262F", // gray-800 (dark) — border-secondary
    textColor: "#F7F7F7", // gray-50 (dark) — text-primary
    textMutedColor: "#94979C", // gray-400 (dark)
    inputBg: "#13161B",
    inputBorder: "#373A41", // gray-700 (dark)
    inputTextColor: "#F7F7F7",
});

const isDark = () => document.documentElement.classList.contains("dark-mode");

export const ThemedDocsContainer = (props: PropsWithChildren<DocsContainerProps>) => {
    const [darkMode, setDark] = useState(isDark);

    useEffect(() => {
        const observer = new MutationObserver(() => setDark(isDark()));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        setDark(isDark());
        return () => observer.disconnect();
    }, []);

    return <DocsContainer {...props} theme={darkMode ? dark : light} />;
};
