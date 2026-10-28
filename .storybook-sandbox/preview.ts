import * as base from "../.storybook/preview";

/** Same canvas setup as the library Storybook (styles, themes, viewports); only the sidebar order differs. */
export const parameters = {
    ...base.parameters,
    options: { storySort: { method: "alphabetical", order: ["Pages", "Runs"] } },
};

export const decorators = base.decorators;
