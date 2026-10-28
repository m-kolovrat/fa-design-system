import type { FC } from "react";
import { TextArea } from "@/components/base/textarea/textarea";
import * as TextAreas from "@/components/base/textarea/textarea.demo";
import textareaDoc from "@/skills/fa-design-system/references/components/textarea.md?raw";

export default {
    title: "Base components/Inputs/Textarea",
    component: TextArea,
    tags: ["autodocs"],
    // The Docs page text is textarea.md; the props table comes from textarea.tsx.
    parameters: { skillDoc: textareaDoc },
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full bg-primary p-4 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
};

export const Textarea = () => <TextAreas.Textarea />;
