"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import paginationDoc from "@/skills/fa-design-system/references/components/pagination.md?raw";
import { cx } from "@/utils/cx";
import * as Paginations from "./pagination";
import { PaginationDot } from "./pagination-dot";
import { PaginationLine } from "./pagination-line";
import * as Demos from "./pagination.demo";

const meta = {
    title: "Application/Pagination",
    component: Paginations.PaginationPageDefault,
    subcomponents: {
        PaginationPageMinimalCenter: Paginations.PaginationPageMinimalCenter,
        PaginationCardDefault: Paginations.PaginationCardDefault,
        PaginationCardMinimal: Paginations.PaginationCardMinimal,
        PaginationButtonGroup: Paginations.PaginationButtonGroup,
        PaginationCardAdvanced: Paginations.PaginationCardAdvanced,
        PaginationDot,
        PaginationLine,
    },
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props tables
        // come from the types and JSDoc in pagination.tsx, pagination-dot.tsx and pagination-line.tsx.
        skillDoc: paginationDoc,
    },
    decorators: [
        (Story, { viewMode }) => (
            <div className={cx("bg-primary p-8 dark:bg-secondary", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        ),
    ],
    args: { page: 1, total: 10, siblingCount: 1 },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        page: { control: { type: "number", min: 1 } },
        total: { control: { type: "number", min: 1 } },
        siblingCount: { control: { type: "number", min: 0, max: 3 } },
        onPageChange: { control: false },
        style: { control: false },
    },
} satisfies Meta<typeof Paginations.PaginationPageDefault>;

export default meta;

type Story = StoryObj<typeof meta>;

/** `PaginationPageDefault` — edit props live in the Controls panel; the buttons update `page`. */
export const Playground: Story = {
    render: function Render(args) {
        const [, updateArgs] = useArgs();
        return <Paginations.PaginationPageDefault {...args} onPageChange={(page) => updateArgs({ page })} />;
    },
};

export const PaginationPageDefault = () => <Demos.PaginationPageDefault />;
PaginationPageDefault.storyName = "Pagination page default";

export const PaginationPageMinimalCenter = () => <Demos.PaginationPageMinimalCenter />;
PaginationPageMinimalCenter.storyName = "Pagination page minimal center";

export const PaginationCardDefault = () => <Demos.PaginationCardDefault />;
PaginationCardDefault.storyName = "Pagination card default";

export const PaginationCardMinimalRightAligned = () => <Demos.PaginationCardMinimalRightAligned />;
PaginationCardMinimalRightAligned.storyName = "Pagination card minimal right aligned";

export const PaginationCardMinimalCenterAligned = () => <Demos.PaginationCardMinimalCenterAligned />;
PaginationCardMinimalCenterAligned.storyName = "Pagination card minimal center aligned";

export const PaginationCardMinimalLeftAligned = () => <Demos.PaginationCardMinimalLeftAligned />;
PaginationCardMinimalLeftAligned.storyName = "Pagination card minimal left aligned";

export const PaginationButtonGroupRightAligned = () => <Demos.PaginationButtonGroupRightAligned />;
PaginationButtonGroupRightAligned.storyName = "Pagination button group right aligned";

export const PaginationButtonGroupCenterAligned = () => <Demos.PaginationButtonGroupCenterAligned />;
PaginationButtonGroupCenterAligned.storyName = "Pagination button group center aligned";

export const PaginationButtonGroupLeftAligned = () => <Demos.PaginationButtonGroupLeftAligned />;
PaginationButtonGroupLeftAligned.storyName = "Pagination button group left aligned";

export const PaginationCardAdvanced = () => <Demos.PaginationCardAdvanced />;
PaginationCardAdvanced.storyName = "Pagination card advanced";

export const PaginationCardAdvancedCenter = () => <Demos.PaginationCardAdvancedCenter />;
PaginationCardAdvancedCenter.storyName = "Pagination card advanced center";

export const PaginationDotMd = () => <Demos.PaginationDotMd />;
PaginationDotMd.storyName = "Pagination dot md";

export const PaginationDotLg = () => <Demos.PaginationDotLg />;
PaginationDotLg.storyName = "Pagination dot lg";

export const PaginationLineMd = () => <Demos.PaginationLineMd />;
PaginationLineMd.storyName = "Pagination line md";

export const PaginationLineLg = () => <Demos.PaginationLineLg />;
PaginationLineLg.storyName = "Pagination line lg";
