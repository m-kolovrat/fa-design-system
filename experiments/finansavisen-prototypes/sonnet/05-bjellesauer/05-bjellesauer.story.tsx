import { Bjellesauer } from "./05-bjellesauer";

export default {
    title: "Experiments/sonnet/05-bjellesauer",
};

export const Desktop = () => <Bjellesauer />;
Desktop.globals = { viewport: { value: "desktop", isRotated: false } };

export const Mobile = () => <Bjellesauer />;
Mobile.globals = { viewport: { value: "mobile", isRotated: false } };

/** Logged-out reader: three trades and a paywall box. */
export const LoggedOutTeaser = () => <Bjellesauer isSubscriber={false} />;
LoggedOutTeaser.storyName = "Logged-out teaser";
LoggedOutTeaser.globals = { viewport: { value: "mobile", isRotated: false } };
