import type { FC } from "react";
import * as Charts from "./bar-charts.demo";

// The "Charts" Docs page (charts.md) is hosted by line-charts.story.tsx, which shares this title.
export default {
    title: "Application/Charts",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen items-center justify-center bg-primary py-8">
                <div className="flex w-full items-center justify-center">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export const BarChart = () => (
    <div className="w-full max-w-7xl">
        <Charts.BarChart />
    </div>
);
BarChart.storyName = "Bar chart";

export const BarChart02 = () => (
    <div className="w-full max-w-7xl">
        <Charts.BarChart02 />
    </div>
);
BarChart02.storyName = "Bar chart 02";

export const BarChart03 = () => (
    <div className="w-full max-w-7xl">
        <Charts.BarChart03 />
    </div>
);
BarChart03.storyName = "Bar chart 03";
