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

/** Grey blocks standing in for the page content next to the navigation (Docs page only). */
const PagePlaceholder = () => (
    <div aria-hidden="true" className="flex min-w-0 flex-1 flex-col gap-6 p-6 lg:p-8">
        <div className="h-8 w-48 rounded-md bg-secondary" />
        <div className="grid gap-4 sm:grid-cols-3">
            <div className="h-24 rounded-xl bg-secondary" />
            <div className="h-24 rounded-xl bg-secondary" />
            <div className="h-24 rounded-xl bg-secondary" />
        </div>
        <div className="min-h-40 flex-1 rounded-xl bg-secondary" />
    </div>
);

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
        // The sidebars are `fixed` from `lg` up. On the Docs page the stories render inline (so they
        // follow the theme) in a 640px block; Storybook gives a block with a height a transform,
        // which makes it the containing block of the fixed sidebar instead of the page.
        docs: { story: { height: "640px" } },
        // The stories are fixed demos; the tables document the props, they don't drive them.
        controls: { disable: true },
    },
    decorators: [
        withOverlayAware((Story, { viewMode }) =>
            viewMode === "docs" ? (
                // On the Docs page: the navigation next to (desktop) or above (mobile) a page
                // placeholder, so the frame shows how the navigation sits in a layout.
                <div className="flex h-160 w-full bg-primary max-lg:flex-col">
                    <Story />
                    <PagePlaceholder />
                </div>
            ) : (
                <div className="min-h-screen w-full bg-primary">
                    <Story />
                </div>
            ),
        ),
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
