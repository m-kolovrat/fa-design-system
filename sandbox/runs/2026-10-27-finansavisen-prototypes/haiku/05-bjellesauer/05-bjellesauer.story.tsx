"use client";

import Bjellesauer from "./05-bjellesauer";

export default {
    title: "Runs/2026-10-27/haiku/05-bjellesauer",
};

export const Desktop = () => <Bjellesauer />;
Desktop.parameters = {
    viewport: { defaultViewport: "desktop" },
};

export const Mobile = () => <Bjellesauer />;
Mobile.parameters = {
    viewport: { defaultViewport: "mobile" },
};

export const LoggedOutTeaser = () => <Bjellesauer isSubscriber={false} />;
LoggedOutTeaser.parameters = {
    viewport: { defaultViewport: "mobile" },
};
