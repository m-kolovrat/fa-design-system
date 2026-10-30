import type { Meta, StoryObj } from "@storybook/react-vite";
import { withOverlayAware } from "@/components/internal/decorators";
import siteHeaderDoc from "@/skills/fa-design-system/references/components/site-header.md?raw";
import { cx } from "@/utils/cx";
import { SiteHeader, type SiteHeaderProps } from "./site-header";
import { SiteHeaderDemo } from "./site-header.demo";

const meta: Meta<typeof SiteHeader> = {
    title: "Application/Site header",
    component: SiteHeader,
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props table
        // comes from the types and JSDoc in site-header.tsx.
        skillDoc: siteHeaderDoc,
    },
    decorators: [
        withOverlayAware((Story, { viewMode }) => (
            <div className={cx("w-full bg-secondary", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        )),
    ],
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        navigation: { control: false },
        shortcuts: { control: false },
        tickerItems: { control: false },
        user: { control: false },
        menu: { control: false },
        onMenuPress: { control: false },
        onSearchPress: { control: false },
    },
};

export default meta;

/** The header with sample content — the controls override its props (switch `brand` here). */
export const Playground: StoryObj<Partial<SiteHeaderProps>> = {
    args: { brand: "fa" },
    render: (args) => <SiteHeaderDemo {...args} />,
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
