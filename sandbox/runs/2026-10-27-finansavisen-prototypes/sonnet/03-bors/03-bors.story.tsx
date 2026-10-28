import { BorsPage } from "./03-bors";

export default {
    title: "Runs/2026-10-27/sonnet/03-bors",
    parameters: { layout: "fullscreen" },
};

export const Desktop = () => <BorsPage loggedIn />;
Desktop.globals = { viewport: { value: "desktop", isRotated: false } };

export const Mobile = () => <BorsPage loggedIn />;
Mobile.globals = { viewport: { value: "mobile", isRotated: false } };

export const LoggedOut = () => <BorsPage loggedIn={false} />;
LoggedOut.storyName = "Logged out (desktop)";
LoggedOut.globals = { viewport: { value: "desktop", isRotated: false } };

export const LoggedOutMobile = () => <BorsPage loggedIn={false} />;
LoggedOutMobile.storyName = "Logged out (mobile)";
LoggedOutMobile.globals = { viewport: { value: "mobile", isRotated: false } };
