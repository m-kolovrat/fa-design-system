import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HintText } from "@/components/base/input/hint-text";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import * as Inputs from "@/components/base/input/inputs.demo";
import { Label } from "@/components/base/input/label";
import { iconArg, iconArgType } from "@/components/internal/icon-controls";
import inputDoc from "@/skills/fa-design-system/references/components/input.md?raw";

export default {
    title: "Base components/Inputs",
    component: Input,
    subcomponents: { InputGroup, InputBase, Label, HintText },
    tags: ["autodocs"],
    // The Docs page text is input.md; the props tables come from the components' types and JSDoc.
    // The variant stories (date, number, file, tags, payment) are on Base components / Inputs / Variants.
    parameters: { skillDoc: inputDoc },
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full bg-primary p-4 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Input>;

const DefaultDecorator = (Story: FC) => (
    <div className="w-full max-w-xs">
        <Story />
    </div>
);

const WiderDecorator = (Story: FC) => (
    <div className="w-full max-w-100">
        <Story />
    </div>
);

/** Single interactive input — pick the leading icon (any Fa icon, or "None") and other props in the Controls panel. */
export const Playground: StoryObj<typeof Input> = {
    args: {
        size: "md",
        label: "Email",
        placeholder: "olivia@untitledui.com",
        hint: "This is a hint text to help user.",
        icon: iconArg("Mail"),
        isRequired: false,
        isDisabled: false,
        isInvalid: false,
    },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        hint: { control: "text" },
        icon: iconArgType(),
    },
    render: (args) => <Input {...args} />,
    decorators: [DefaultDecorator],
};

export const Default = () => <Inputs.Default />;
Default.decorators = [DefaultDecorator];

export const LeadingIcon = () => <Inputs.LeadingIcon />;
LeadingIcon.decorators = [DefaultDecorator];
LeadingIcon.storyName = "Leading icon";

export const LeadingDropdown = () => <Inputs.LeadingDropdown />;
LeadingDropdown.decorators = [DefaultDecorator];
LeadingDropdown.storyName = "Leading dropdown";

export const TrailingDropdown = () => <Inputs.TrailingDropdown />;
TrailingDropdown.decorators = [DefaultDecorator];
TrailingDropdown.storyName = "Trailing dropdown";

export const LeadingText = () => <Inputs.LeadingText />;
LeadingText.decorators = [DefaultDecorator];
LeadingText.storyName = "Leading text";

export const PaymentInputs = () => <Inputs.PaymentInputs />;
// Covered by input-variants.md: on the Base components / Inputs / Variants page.
PaymentInputs.tags = ["!autodocs"];
PaymentInputs.decorators = [DefaultDecorator];
PaymentInputs.storyName = "Payment inputs";

export const TrailingButton = () => <Inputs.TrailingButton />;
TrailingButton.decorators = [WiderDecorator];
TrailingButton.storyName = "Trailing button";

export const PasswordInputs = () => <Inputs.PasswordInputs />;
PasswordInputs.decorators = [DefaultDecorator];
PasswordInputs.storyName = "Password inputs";

export const DateInputs = () => <Inputs.DateInputs />;
// Covered by input-variants.md: on the Base components / Inputs / Variants page.
DateInputs.tags = ["!autodocs"];
DateInputs.decorators = [DefaultDecorator];
DateInputs.storyName = "Date inputs";

export const NumberInputsHorizontal = () => <Inputs.NumberInputsHorizontal />;
// Covered by input-variants.md: on the Base components / Inputs / Variants page.
NumberInputsHorizontal.tags = ["!autodocs"];
NumberInputsHorizontal.decorators = [DefaultDecorator];
NumberInputsHorizontal.storyName = "Number inputs horizontal";

export const NumberInputsVertical = () => <Inputs.NumberInputsVertical />;
// Covered by input-variants.md: on the Base components / Inputs / Variants page.
NumberInputsVertical.tags = ["!autodocs"];
NumberInputsVertical.decorators = [DefaultDecorator];
NumberInputsVertical.storyName = "Number inputs vertical";

export const FileUploadInput = () => <Inputs.FileUploadInputs />;
// Covered by input-variants.md: on the Base components / Inputs / Variants page.
FileUploadInput.tags = ["!autodocs"];
FileUploadInput.decorators = [WiderDecorator];
FileUploadInput.storyName = "File upload input";

export const Tags = () => <Inputs.TagInputs />;
// Covered by input-variants.md: on the Base components / Inputs / Variants page.
Tags.tags = ["!autodocs"];
Tags.decorators = [WiderDecorator];
Tags.storyName = "Tag inputs inner";

export const TagsOuter = () => <Inputs.TagInputsOuter />;
// Covered by input-variants.md: on the Base components / Inputs / Variants page.
TagsOuter.tags = ["!autodocs"];
TagsOuter.decorators = [WiderDecorator];
TagsOuter.storyName = "Tag inputs outer";
