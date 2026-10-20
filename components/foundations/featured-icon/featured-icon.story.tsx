import type { FC } from "react";
import type { StoryObj } from "@storybook/nextjs-vite";
import { iconArg, iconArgType } from "@/components/internal/icon-controls";
import { FeaturedIcon } from "./featured-icon";
import * as Demos from "./featured-icon.demo";

export default {
    title: "Base components/Featured Icons",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full overflow-auto bg-primary p-8">
                <Story />
            </div>
        ),
    ],
};

/**
 * Single interactive featured icon — pick the icon (any Fa icon, or "None") and the
 * size, color and theme in the Controls panel. `modern` and `modern-neue` are gray only.
 */
export const Playground: StoryObj<typeof FeaturedIcon> = {
    args: { icon: iconArg("Success"), size: "lg", color: "brand", theme: "light" },
    argTypes: {
        icon: iconArgType(),
        size: { control: "select", options: ["sm", "md", "lg", "xl"] },
        color: { control: "select", options: ["brand", "gray", "error", "warning", "success"] },
        theme: { control: "select", options: ["light", "gradient", "dark", "modern", "modern-neue", "outline"] },
        children: { control: false },
    },
    render: (args) => <FeaturedIcon {...args} />,
};

export const Light = () => <Demos.LightDemo />;

export const Gradient = () => <Demos.GradientDemo />;

export const Dark = () => <Demos.DarkDemo />;

export const Modern = () => <Demos.ModernDemo />;

export const ModernNeue = () => <Demos.ModernNeueDemo />;

export const Outline = () => <Demos.OutlineDemo />;
