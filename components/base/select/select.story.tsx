import type { FC } from "react";
import type { StoryObj } from "@storybook/nextjs-vite";
import { Select } from "@/components/base/select/select";
import * as Selects from "@/components/base/select/select.demo";
import { iconArg, iconArgType } from "@/components/internal/icon-controls";

export default {
    title: "Base components/Select",
};

const DefaultDecorator = (Story: FC) => (
    <div className="flex min-h-screen w-full bg-primary p-4">
        <div className="w-80">
            <Story />
        </div>
    </div>
);

const WiderDecorator = (Story: FC) => (
    <div className="flex min-h-screen w-full bg-primary p-4">
        <div className="w-100">
            <Story />
        </div>
    </div>
);

const PLAYGROUND_ITEMS = [
    { id: "phoenix", label: "Phoenix Baker", supportingText: "@phoenix" },
    { id: "olivia", label: "Olivia Rhye", supportingText: "@olivia" },
    { id: "lana", label: "Lana Steiner", supportingText: "@lana" },
    { id: "demi", label: "Demi Wilkinson", supportingText: "@demi" },
];

/** Single interactive select — pick the leading icon (any Fa icon, or "None") and other props in the Controls panel. */
export const Playground: StoryObj<typeof Select> = {
    args: {
        size: "md",
        label: "Team member",
        placeholder: "Select team member",
        hint: "This is a hint text to help user.",
        icon: iconArg("User"),
        isRequired: false,
        isDisabled: false,
        isInvalid: false,
    },
    argTypes: {
        size: { control: "select", options: ["sm", "md", "lg"] },
        label: { control: "text" },
        placeholder: { control: "text" },
        hint: { control: "text" },
        tooltip: { control: "text" },
        icon: iconArgType(),
        isRequired: { control: "boolean" },
        isDisabled: { control: "boolean" },
        isInvalid: { control: "boolean" },
        children: { control: false },
        items: { control: false },
    },
    render: (args) => (
        <Select {...args} items={PLAYGROUND_ITEMS}>
            {(item) => (
                <Select.Item id={item.id} supportingText={item.supportingText}>
                    {item.label}
                </Select.Item>
            )}
        </Select>
    ),
    decorators: [DefaultDecorator],
};

export const Default = () => <Selects.Default />;
Default.decorators = [DefaultDecorator];

export const IconLeading = () => <Selects.IconLeading />;
IconLeading.decorators = [DefaultDecorator];
IconLeading.storyName = "Icon leading";

export const AvatarLeading = () => <Selects.AvatarLeading />;
AvatarLeading.decorators = [DefaultDecorator];
AvatarLeading.storyName = "Avatar leading";

export const DotLeading = () => <Selects.DotLeading />;
DotLeading.decorators = [DefaultDecorator];
DotLeading.storyName = "Dot leading";

export const Search = () => <Selects.Search />;
Search.decorators = [DefaultDecorator];

export const Tags = () => <Selects.Tags />;
Tags.decorators = [WiderDecorator];

export const MultiSelectSm = () => <Selects.MultiSelectSmDemo />;
MultiSelectSm.decorators = [DefaultDecorator];
MultiSelectSm.storyName = "Multi select (sm)";

export const MultiSelectMd = () => <Selects.MultiSelectMdDemo />;
MultiSelectMd.decorators = [DefaultDecorator];
MultiSelectMd.storyName = "Multi select (md)";

export const MultiSelectLg = () => <Selects.MultiSelectLgDemo />;
MultiSelectLg.decorators = [DefaultDecorator];
MultiSelectLg.storyName = "Multi select (lg)";

export const MultiSelectDisabled = () => <Selects.MultiSelectDisabledDemo />;
MultiSelectDisabled.decorators = [DefaultDecorator];
MultiSelectDisabled.storyName = "Multi select (disabled)";
