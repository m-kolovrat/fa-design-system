import { Forside } from "./01-forside";

export default {
    title: "Experiments/opus/01-forside",
};

export const Desktop = () => <Forside userName="Kari" />;
Desktop.globals = { viewport: { value: "desktop", isRotated: false } };

export const Mobile = () => <Forside userName="Kari" />;
Mobile.globals = { viewport: { value: "mobile", isRotated: false } };

export const DesktopLoggedOut = () => <Forside />;
DesktopLoggedOut.storyName = "Desktop (logged out)";
DesktopLoggedOut.globals = { viewport: { value: "desktop", isRotated: false } };

export const MobileLoggedOut = () => <Forside />;
MobileLoggedOut.storyName = "Mobile (logged out)";
MobileLoggedOut.globals = { viewport: { value: "mobile", isRotated: false } };
