import { withOverlayAware } from "@/components/internal/decorators";
import { SiteFooterDemo } from "./site-footer.demo";

export default {
    title: "Application/Site footer",
    decorators: [
        withOverlayAware((Story) => (
            <div className="flex min-h-screen w-full flex-col justify-end bg-secondary">
                <Story />
            </div>
        )),
    ],
};

export const Fa = () => <SiteFooterDemo brand="fa" />;
Fa.parameters = {
    design: { desktop: "17311-2732", mobile: "17311-2533" },
};

export const Kapital = () => <SiteFooterDemo brand="kapital" />;
Kapital.parameters = {
    design: { desktop: "17311-3026", mobile: "17311-2831" },
};

export const Motor = () => <SiteFooterDemo brand="motor" />;
Motor.parameters = {
    design: { desktop: "17311-3320", mobile: "17311-3125" },
};
