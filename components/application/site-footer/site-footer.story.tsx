import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withOverlayAware } from "@/components/internal/decorators";
import siteFooterDoc from "@/skills/fa-design-system/references/components/site-footer.md?raw";
import { cx } from "@/utils/cx";
import { SiteFooter, type SiteFooterProps } from "./site-footer";
import { SiteFooterDemo } from "./site-footer.demo";

const meta: Meta<typeof SiteFooter> = {
    title: "Application/Site footer",
    component: SiteFooter,
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props table
        // comes from the types and JSDoc in site-footer.tsx.
        skillDoc: siteFooterDoc,
    },
    decorators: [
        withOverlayAware((Story, { viewMode }) => (
            <div className={cx("flex w-full flex-col justify-end bg-secondary", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        )),
    ],
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        links: { control: false },
        publisherInfo: { control: false },
        disclaimer: { control: "text" },
        socialLinks: { control: false },
    },
};

export default meta;

/** The footer with sample content — the controls override its props (switch `brand` here). */
export const Playground: StoryObj<Partial<SiteFooterProps>> = {
    args: { brand: "fa" },
    render: (args) => <SiteFooterDemo {...args} />,
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
