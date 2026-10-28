import type { FC } from "react";
import { skillDoc } from "@/components/internal/skill-doc";
import buttonDoc from "@/skills/fa-design-system/references/components/button.md?raw";
import { SocialButton } from "./social-button";
import * as Buttons from "./social-buttons.demo";

export default {
    title: "Base components/Buttons/Social buttons",
    component: SocialButton,
    tags: ["autodocs"],
    parameters: {
        // A part of button.md (the full page is on Base components / Buttons / Button); the props
        // table comes from social-button.tsx.
        docs: { description: { component: skillDoc(buttonDoc, { sections: ["Social buttons"], headings: false }) } },
    },
    excludeStories: ["GoogleLogo", "GoogleButton", "FacebookButton", "AppleButton"],
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full bg-primary p-4 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
};

export const SocialButtons = () => <Buttons.SocialButtons />;
SocialButtons.storyName = "Social buttons";

export const SocialButtonGroups = () => <Buttons.SocialButtonGroupsMD />;
SocialButtonGroups.storyName = "Social button groups md";

export const SocialButtonGroupsLG = () => <Buttons.SocialButtonGroupsLG />;
SocialButtonGroupsLG.storyName = "Social button groups lg";
