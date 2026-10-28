import type { Meta } from "@storybook/nextjs-vite";
import chartsDoc from "@/skills/fa-design-system/references/components/charts.md?raw";
import { cx } from "@/utils/cx";
import { ChartLegendContent, ChartTooltipContent } from "./charts-base";
import * as Charts from "./line-charts.demo";

// This file hosts the Docs page of "Charts" (charts.md). The other chart story files (bar, pie,
// radar, activity gauges, progress circles) share the title, so they have no Docs page of their
// own; their stories stay in the sidebar. There are no chart components: the props tables are the
// shared helpers from charts-base.tsx.
const meta = {
    title: "Application/Charts",
    component: ChartTooltipContent,
    subcomponents: { ChartLegendContent },
    tags: ["autodocs"],
    parameters: {
        skillDoc: chartsDoc,
        // The stories are fixed demos; the tables document the helpers, they don't drive them.
        controls: { disable: true },
    },
    decorators: [
        (Story, { viewMode }) => (
            <div className={cx("flex items-center justify-center bg-primary py-8", viewMode !== "docs" && "min-h-screen")}>
                <div className="flex w-full items-center justify-center">
                    <Story />
                </div>
            </div>
        ),
    ],
} satisfies Meta<typeof ChartTooltipContent>;

export default meta;

export const LineChart01 = () => (
    <div className="w-full max-w-5xl">
        <Charts.LineChart01 />
    </div>
);
LineChart01.storyName = "Line chart 01";

export const LineChart02 = () => (
    <div className="w-full max-w-5xl">
        <Charts.LineChart02 />
    </div>
);
LineChart02.storyName = "Line chart 02";

export const LineChart03 = () => (
    <div className="w-full max-w-5xl">
        <Charts.LineChart03 />
    </div>
);
LineChart03.storyName = "Line chart 03";

export const LineChart04 = () => (
    <div className="w-full max-w-5xl">
        <Charts.LineChart04 />
    </div>
);
LineChart04.storyName = "Line chart 04";
