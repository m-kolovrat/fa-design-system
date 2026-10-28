import { Forside } from "./01-forside";

export default {
    title: "Experiments/sonnet/01-forside",
    parameters: { layout: "fullscreen" },
};

export const Desktop = () => <Forside />;
Desktop.globals = { viewport: { value: "desktop", isRotated: false } };

export const Mobile = () => <Forside />;
Mobile.globals = { viewport: { value: "mobile", isRotated: false } };

export const MobileLoggedIn = () => <Forside loggedIn />;
MobileLoggedIn.storyName = "Mobile (logged in)";
MobileLoggedIn.globals = { viewport: { value: "mobile", isRotated: false } };
