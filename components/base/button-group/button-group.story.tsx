import type { ComponentProps, FC } from "react";
import type { StoryObj } from "@storybook/nextjs-vite";
import { ButtonGroupItem, ButtonGroup as ButtonGroupRoot } from "@/components/base/button-group/button-group";
import * as ButtonGroup from "@/components/base/button-group/button-group.demo";
import { iconArg, iconArgType } from "@/components/internal/icon-controls";

export default {
    title: "Base components/Button groups",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full bg-primary p-4">
                <Story />
            </div>
        ),
    ],
};

type ItemProps = ComponentProps<typeof ButtonGroupItem>;

interface PlaygroundArgs {
    size: ComponentProps<typeof ButtonGroupRoot>["size"];
    iconLeading: ItemProps["iconLeading"];
    iconTrailing: ItemProps["iconTrailing"];
    showText: boolean;
}

/**
 * Three items sharing the icons picked in the Controls panel (any Fa icon, or "None").
 * Turn off "showText" for icon-only items.
 */
export const Playground: StoryObj<PlaygroundArgs> = {
    args: { size: "md", iconLeading: iconArg("Plus"), iconTrailing: iconArg("None"), showText: true },
    argTypes: {
        size: { control: "select", options: ["sm", "md", "lg"] },
        iconLeading: iconArgType(),
        iconTrailing: iconArgType(),
        showText: { control: "boolean" },
    },
    render: ({ size, iconLeading, iconTrailing, showText }) => (
        <ButtonGroupRoot size={size} defaultSelectedKeys={["first"]}>
            {["first", "second", "third"].map((id, index) => (
                <ButtonGroupItem key={id} id={id} iconLeading={iconLeading} iconTrailing={iconTrailing} aria-label={showText ? undefined : `Item ${index + 1}`}>
                    {showText ? "Text" : undefined}
                </ButtonGroupItem>
            ))}
        </ButtonGroupRoot>
    ),
};

export const ButtonGroupSmall = () => <ButtonGroup.AllSmall />;
ButtonGroupSmall.storyName = "Button group sm";

export const ButtonGroupMedium = () => <ButtonGroup.All />;
ButtonGroupMedium.storyName = "Button group md";

export const ButtonGroupLarge = () => <ButtonGroup.AllLarge />;
ButtonGroupLarge.storyName = "Button group lg";
