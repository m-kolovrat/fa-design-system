import type { FC } from "react";
import * as Charts from "./radar-charts.demo";

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

export const RadarChart = () => <Charts.RadarChart />;
RadarChart.storyName = "Radar chart";
