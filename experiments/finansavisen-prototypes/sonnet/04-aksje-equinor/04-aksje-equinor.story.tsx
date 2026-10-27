import { AksjeEquinor } from "./04-aksje-equinor";

export default {
    title: "Experiments/sonnet/04-aksje-equinor",
    parameters: { layout: "fullscreen" },
};

export const Desktop = () => <AksjeEquinor />;
Desktop.parameters = { viewport: { defaultViewport: "desktop" } };

export const Mobile = () => <AksjeEquinor />;
Mobile.parameters = { viewport: { defaultViewport: "mobile" } };
