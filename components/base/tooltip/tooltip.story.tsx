import type { FC } from "react";
import { Tooltip as TooltipComponent, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import * as Tooltips from "@/components/base/tooltip/tooltip.demo";
import tooltipDoc from "@/skills/fa-design-system/references/components/tooltip.md?raw";

export default {
    title: "Base components/Tooltips",
    component: TooltipComponent,
    subcomponents: { TooltipTrigger },
    tags: ["autodocs"],
    // The Docs page text is tooltip.md; the props tables come from tooltip.tsx.
    parameters: { skillDoc: tooltipDoc },
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen items-center justify-center bg-primary p-16 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
};

export const Tooltip = () => <Tooltips.TooltipDemo />;

export const TooltipWithArrow = () => <Tooltips.TooltipWithArrow />;
TooltipWithArrow.storyName = "Tooltip with arrow";

export const TooltipWithArrowSupportingText = () => <Tooltips.TooltipWithArrowSupportingText />;
TooltipWithArrowSupportingText.storyName = "Tooltip with arrow supporting text";
