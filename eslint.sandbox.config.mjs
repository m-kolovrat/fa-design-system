/**
 * ESLint config for the sandbox pages: the repo's parser and plugin setup plus the design-system
 * preset (`eslint/index.mjs`), which checks the pages the way an app's config would.
 *
 * Scope: `sandbox/pages/**` only. `sandbox/runs/**` holds frozen experiment runs and is never
 * linted. Run with `npx eslint -c eslint.sandbox.config.mjs sandbox/pages`.
 */
import rootConfig from "./eslint.config.mjs";
import { faDesignSystem } from "./eslint/index.mjs";

export default [
    // Global ignores: everything but the sandbox pages.
    { ignores: ["**/*", "!sandbox/", "!sandbox/pages/", "!sandbox/pages/**"] },
    // The root config as is: parser, plugins, React, TypeScript and Storybook rules.
    ...rootConfig,
    // The design-system preset, as an app would add it after its own parser setup.
    ...faDesignSystem,
];
