import { withOverlayAware } from "@/components/internal/decorators";
import { SiteHeaderDemo } from "./site-header.demo";

export default {
    title: "Application/Site header",
    decorators: [
        withOverlayAware((Story) => (
            <div className="min-h-screen w-full bg-secondary">
                <Story />
            </div>
        )),
    ],
};

export const Fa = () => <SiteHeaderDemo brand="fa" />;
Fa.parameters = {
    design: { desktop: "17309-1441", mobile: "17310-1547" },
};

export const Kapital = () => <SiteHeaderDemo brand="kapital" />;
Kapital.parameters = {
    design: { desktop: "17310-2608", mobile: "17310-2185" },
};

export const Motor = () => <SiteHeaderDemo brand="motor" />;
Motor.parameters = {
    design: { desktop: "17310-3481", mobile: "17310-3058" },
};

export const SignedIn = () => <SiteHeaderDemo brand="fa" signedIn />;
SignedIn.storyName = "Signed in";
SignedIn.parameters = {
    design: { desktop: "17309-1441" },
};

export const Collapsed = () => <SiteHeaderDemo brand="fa" collapsed />;
Collapsed.storyName = "Collapsed (desktop)";
Collapsed.parameters = {
    design: { desktop: "17310-1981" },
};
