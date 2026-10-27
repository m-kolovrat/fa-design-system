import type { FC } from "react";
import { RadioButton, RadioButtonBase, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import * as Radio from "@/components/base/radio-buttons/radio-buttons.demo";
import { RadioCard, RadioCardGroup } from "@/components/base/radio-buttons/radio-cards";
import radioDoc from "@/skills/fa-design-system/references/components/radio.md?raw";

export default {
    title: "Base components/Radio buttons",
    component: RadioGroup,
    subcomponents: { RadioButton, RadioButtonBase, RadioCardGroup, RadioCard },
    tags: ["autodocs"],
    // The Docs page text is radio.md (radio buttons and radio cards); the cards' stories are on
    // Base components / Radio groups.
    parameters: { skillDoc: radioDoc },
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full bg-primary p-4 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
};

export const RadioButtons = () => <Radio.RadioButtons />;
RadioButtons.storyName = "Radio buttons";

export const RadioButtonsBase = () => <Radio.RadioButtonsBase />;
RadioButtonsBase.storyName = "Radio buttons base";
