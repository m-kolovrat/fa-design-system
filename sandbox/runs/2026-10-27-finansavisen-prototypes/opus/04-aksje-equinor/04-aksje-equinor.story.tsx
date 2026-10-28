import type { FC } from "react";
import { NotificationToaster } from "@/components/application/notifications/notification";
import { AksjeEquinor } from "./04-aksje-equinor";

export default {
    title: "Runs/2026-10-27/opus/04-aksje-equinor",
    decorators: [
        (Story: FC) => (
            <>
                <Story />
                <NotificationToaster />
            </>
        ),
    ],
};

export const Desktop = () => <AksjeEquinor />;
Desktop.globals = { viewport: { value: "desktop", isRotated: false } };

export const Mobile = () => <AksjeEquinor />;
Mobile.globals = { viewport: { value: "mobile", isRotated: false } };
