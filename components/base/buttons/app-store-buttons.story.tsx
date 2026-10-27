import { AppGalleryButton, AppStoreButton, GalaxyStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import * as Buttons from "@/components/base/buttons/app-store-buttons.demo";
import { skillDoc } from "@/components/internal/skill-doc";
import buttonDoc from "@/skills/fa-design-system/references/components/button.md?raw";

export default {
    title: "Base components/Buttons/Mobile app store buttons",
    component: AppStoreButton,
    subcomponents: { GooglePlayButton, GalaxyStoreButton, AppGalleryButton },
    tags: ["autodocs"],
    parameters: {
        // A part of button.md (the full page is on Base components / Buttons / Button).
        docs: { description: { component: skillDoc(buttonDoc, { sections: ["App store buttons"], headings: false }) } },
    },
};

export const MobileAppStoreButtons = () => (
    <div className="flex min-h-screen w-full flex-col gap-16 bg-primary p-8 [.docs-story_&]:min-h-0">
        <Buttons.Md />
        <Buttons.Lg />
    </div>
);
MobileAppStoreButtons.storyName = "Mobile app store buttons";
