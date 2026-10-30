import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import checkboxDoc from "@/skills/fa-design-system/references/components/checkbox.md?raw";
import { Checkbox, CheckboxBase } from "./checkbox";

/**
 * Canonical interactive story for the Checkbox.
 *
 * `Playground` renders one Checkbox driven entirely by the Controls panel; the
 * curated `States` row is a hand-picked reference for at-a-glance review.
 * Selection is interactive — click the checkbox, or set `defaultSelected` for
 * its initial value.
 */

const sizes = ["sm", "md"] as const;

/** Small captioned cell so it's obvious which checkbox is which. */
const Labeled = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="flex flex-col items-start gap-2">
        <span className="text-xs font-medium tracking-wide text-tertiary uppercase">{label}</span>
        {children}
    </div>
);

const meta = {
    title: "Base components/Checkboxes",
    component: Checkbox,
    subcomponents: { CheckboxBase },
    tags: ["autodocs"],
    // The Docs page text is checkbox.md; the props tables come from checkbox.tsx.
    parameters: { layout: "centered", skillDoc: checkboxDoc },
    args: {
        size: "sm",
        label: "Remember me",
        hint: "Save my login details for next time.",
        isDisabled: false,
        isIndeterminate: false,
        defaultSelected: false,
    },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        label: { control: "text" },
        hint: { control: "text" },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Single interactive checkbox — edit props live in the Controls panel. */
export const Playground: Story = {};

/** The checkbox across every size. */
export const Sizes: Story = {
    render: (args) => (
        <div className="flex flex-wrap items-start gap-8">
            {sizes.map((size) => (
                <Labeled key={size} label={size}>
                    <Checkbox {...args} size={size} defaultSelected />
                </Labeled>
            ))}
        </div>
    ),
};

/** The checkbox in each interactive state. */
export const States: Story = {
    render: (args) => (
        <div className="flex flex-wrap items-start gap-8">
            <Labeled label="Unchecked">
                <Checkbox {...args} defaultSelected={false} />
            </Labeled>
            <Labeled label="Checked">
                <Checkbox {...args} defaultSelected />
            </Labeled>
            <Labeled label="Indeterminate">
                <Checkbox {...args} isIndeterminate />
            </Labeled>
            <Labeled label="Disabled">
                <Checkbox {...args} isDisabled />
            </Labeled>
            <Labeled label="Disabled checked">
                <Checkbox {...args} isDisabled defaultSelected />
            </Labeled>
        </div>
    ),
};
