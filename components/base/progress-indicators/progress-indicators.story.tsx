import type { FC } from "react";
import progressDoc from "@/skills/fa-design-system/references/components/progress.md?raw";
import { ProgressBarCircle, ProgressBarHalfCircle } from "./progress-circles";
import { ProgressBar, ProgressBarBase } from "./progress-indicators";
import * as Demos from "./progress-indicators.demo";
import { CircleProgressBar as SimpleCircleProgressBar } from "./simple-circle";

export default {
    title: "Base components/Progress indicators",
    component: ProgressBar,
    subcomponents: { ProgressBarBase, ProgressBarCircle, ProgressBarHalfCircle, CircleProgressBar: SimpleCircleProgressBar },
    tags: ["autodocs"],
    // The Docs page text is progress.md; the props tables come from the components' types and JSDoc.
    parameters: { skillDoc: progressDoc },
};

const DefaultDecorator = (Story: FC) => (
    <div className="flex min-h-screen w-screen bg-primary p-16 [.docs-story_&]:min-h-0 [.docs-story_&]:w-full">
        <div className="w-full max-w-xs">
            <Story />
        </div>
    </div>
);

const WiderDecorator = (Story: FC) => (
    <div className="flex min-h-screen w-full bg-primary p-16 [.docs-story_&]:min-h-0">
        <div className="w-100">
            <Story />
        </div>
    </div>
);

export const Default = () => <Demos.ProgressBarDefault />;
Default.decorators = [DefaultDecorator];

export const TextRight = () => <Demos.ProgressBarTextRight />;
TextRight.decorators = [DefaultDecorator];
TextRight.storyName = "Text right";

export const TextBottom = () => <Demos.ProgressBarTextBottom />;
TextBottom.decorators = [DefaultDecorator];
TextBottom.storyName = "Text bottom";

export const TextTopFloating = () => <Demos.ProgressBarTextTopFloating />;
TextTopFloating.decorators = [DefaultDecorator];
TextTopFloating.storyName = "Text top floating";

export const TextBottomFloating = () => <Demos.ProgressBarTextBottomFloating />;
TextBottomFloating.decorators = [DefaultDecorator];
TextBottomFloating.storyName = "Text bottom floating";

export const CircleProgressBar = () => <Demos.CircleProgressBar />;
CircleProgressBar.decorators = [WiderDecorator];
CircleProgressBar.storyName = "Circle progress bar";

export const CircleProgressBarLabel = () => <Demos.CircleProgressBarLabel />;
CircleProgressBarLabel.decorators = [WiderDecorator];
CircleProgressBarLabel.storyName = "Circle progress bar label";

export const HalfCircleProgressBar = () => <Demos.HalfCircleProgressBar />;
HalfCircleProgressBar.decorators = [WiderDecorator];
HalfCircleProgressBar.storyName = "Half circle progress bar";

export const HalfCircleProgressBarLabel = () => <Demos.HalfCircleProgressBarLabel />;
HalfCircleProgressBarLabel.decorators = [WiderDecorator];
HalfCircleProgressBarLabel.storyName = "Half circle progress bar label";
