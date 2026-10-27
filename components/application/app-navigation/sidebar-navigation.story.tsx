import type { Meta } from "@storybook/nextjs-vite";
import { withOverlayAware } from "@/components/internal/decorators";
import appNavigationDoc from "@/skills/fa-design-system/references/components/app-navigation.md?raw";
import { NavButton } from "./base-components/nav-button";
import { HeaderNavigationBase } from "./header-navigation";
import * as Demos from "./sidebar-navigation.demo";
import { SidebarNavigationDualTier } from "./sidebar-navigation/sidebar-dual-tier";
import { SidebarNavigationSectionDividers } from "./sidebar-navigation/sidebar-section-dividers";
import { SidebarNavigationSectionsSubheadings } from "./sidebar-navigation/sidebar-sections-subheadings";
import { SidebarNavigationSimple } from "./sidebar-navigation/sidebar-simple";
import { SidebarNavigationSlim } from "./sidebar-navigation/sidebar-slim";

// This file hosts the Docs page of "Application navigation" (app-navigation.md, covering the
// sidebars and the header). header-navigation.story.tsx shares the title, so it has no Docs page
// of its own; its stories stay in the sidebar.
const meta = {
    title: "Application/Application navigation",
    component: SidebarNavigationSimple,
    subcomponents: {
        SidebarNavigationSectionDividers,
        SidebarNavigationSectionsSubheadings,
        SidebarNavigationSlim,
        SidebarNavigationDualTier,
        HeaderNavigationBase,
        NavButton,
    },
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props tables
        // come from the types and JSDoc of each navigation component.
        skillDoc: appNavigationDoc,
        // The sidebars are `fixed` from `lg` up, so on the Docs page each story gets its own frame.
        docs: { story: { inline: false, iframeHeight: 640 } },
        // The stories are fixed demos; the tables document the props, they don't drive them.
        controls: { disable: true },
    },
    decorators: [
        withOverlayAware((Story) => (
            <div className="min-h-screen w-full bg-primary">
                <Story />
            </div>
        )),
    ],
} satisfies Meta<typeof SidebarNavigationSimple>;

export default meta;

export const SidebarNavigationSimpleDemo = () => <Demos.SidebarNavigationSimpleDemo />;
SidebarNavigationSimpleDemo.storyName = "Sidebar navigation simple";
SidebarNavigationSimpleDemo.parameters = {
    design: {
        desktop: "1161-8593",
    },
};

export const SidebarNavigationDualTierDemo = () => <Demos.SidebarNavigationDualTierDemo />;
SidebarNavigationDualTierDemo.storyName = "Sidebar navigation dual-tier";
SidebarNavigationDualTierDemo.parameters = {
    design: {
        desktop: "1161-17322",
    },
};

export const SidebarNavigationSlimDemo = () => <Demos.SidebarNavigationSlimDemo />;
SidebarNavigationSlimDemo.storyName = "Sidebar navigation slim";
SidebarNavigationSlimDemo.parameters = {
    design: {
        desktop: "1165-2013",
    },
};

export const SidebarSectionDividersDemo = () => <Demos.SidebarSectionDividersDemo />;
SidebarSectionDividersDemo.storyName = "Sidebar sections dividers";
SidebarSectionDividersDemo.parameters = {
    design: {
        desktop: "7893-127251",
    },
};

export const SidebarNavigationSectionsSubheadingsDemo = () => <Demos.SidebarNavigationSectionsSubheadingsDemo />;
SidebarNavigationSectionsSubheadingsDemo.storyName = "Sidebar navigation sections subheadings";
SidebarNavigationSectionsSubheadingsDemo.parameters = {
    design: {
        desktop: "7901-412479",
    },
};
