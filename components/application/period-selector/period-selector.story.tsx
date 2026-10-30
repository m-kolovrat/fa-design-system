import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PERIODS, type Period, PeriodSelector } from "@/components/application/period-selector/period-selector";
import { PeriodSelectorUnderChart, equinorPeriods } from "@/components/application/period-selector/period-selector.demo";
import periodSelectorDoc from "@/skills/fa-design-system/references/components/period-selector.md?raw";

export default {
    title: "Application/Period selector",
    component: PeriodSelector,
    tags: ["autodocs"],
    // The Docs page text is period-selector.md; the props table comes from period-selector.tsx.
    parameters: { skillDoc: periodSelectorDoc },
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full flex-col gap-8 bg-secondary_alt p-4 md:p-8 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof PeriodSelector>;

interface PlaygroundArgs {
    layout: "fit" | "scroll";
    showChange: boolean;
    periods: Period[];
    width: number;
}

/** Pick the periods, the layout and the width of the space it sits in. Narrow the width to see it scroll. */
export const Playground: StoryObj<PlaygroundArgs> = {
    args: { layout: "fit", showChange: true, periods: [...PERIODS], width: 720 },
    argTypes: {
        layout: { control: "inline-radio", options: ["fit", "scroll"] },
        showChange: { control: "boolean" },
        periods: { control: "check", options: [...PERIODS] },
        width: { control: { type: "range", min: 280, max: 1024, step: 8 } },
    },
    render: ({ layout, showChange, periods, width }) => (
        <div className="rounded-2xl border border-secondary bg-primary_alt p-4" style={{ width }}>
            <PeriodSelector
                layout={layout}
                defaultSelectedPeriod="1Y"
                periods={equinorPeriods.filter((p) => periods.includes(p.id)).map((p) => (showChange ? p : { id: p.id }))}
            />
        </div>
    ),
};
Playground.parameters = { design: { desktop: "17364-362" } };

/** The rule: always directly under the chart it controls. */
export const UnderAChart = () => (
    <div className="w-full max-w-3xl">
        <PeriodSelectorUnderChart />
    </div>
);
UnderAChart.storyName = "Under a chart";
UnderAChart.parameters = { design: { desktop: "17364-362" } };

/** Mobile width: more periods than fit, so the row scrolls sideways. */
export const Mobile = () => (
    <div className="w-full max-w-[343px]">
        <PeriodSelectorUnderChart layout="scroll" />
    </div>
);
Mobile.parameters = { design: { mobile: "17364-362" } };

/** Without changes, as on a chart where per-period changes aren't available. */
export const WithoutChange = () => (
    <div className="w-full max-w-3xl rounded-2xl border border-secondary bg-primary_alt p-4">
        <PeriodSelector periods={PERIODS.slice(0, 7).map((id) => ({ id }))} defaultSelectedPeriod="1M" />
    </div>
);
WithoutChange.storyName = "Without change";
