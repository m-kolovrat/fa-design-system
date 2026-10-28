import type { FC } from "react";
import { Slider } from "@/components/base/slider/slider";
import * as Sliders from "@/components/base/slider/slider.demo";
import sliderDoc from "@/skills/fa-design-system/references/components/slider.md?raw";

export default {
    title: "Base components/Sliders",
    component: Slider,
    tags: ["autodocs"],
    // The Docs page text is slider.md; the props table comes from slider.tsx.
    parameters: { skillDoc: sliderDoc },
    decorators: [
        (Story: FC) => (
            <div className="bg-primary p-16">
                <div className="max-w-xs">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export const Default = () => <Sliders.Default />;

export const BottomLabel = () => <Sliders.BottomLabel />;
BottomLabel.storyName = "Bottom label";

export const TopFloating = () => <Sliders.TopFloating />;
TopFloating.storyName = "Top floating";

export const SingleThumb = () => <Sliders.SingleThumb />;
SingleThumb.storyName = "Single thumb";
