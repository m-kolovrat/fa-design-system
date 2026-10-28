import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

/** Manager theme for the sandbox Storybook: the library's brand blue, a different title. */
addons.setConfig({
    theme: create({
        base: "light",
        brandTitle: "Fa Sandbox",
        brandTarget: "_self",
        colorPrimary: "#0373E3", // brand-500
        colorSecondary: "#0373E3", // brand-500
    }),
});
