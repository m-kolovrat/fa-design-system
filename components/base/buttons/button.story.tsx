import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus, Upload } from "fa-icons";
import { iconArgType } from "@/components/internal/icon-controls";
import buttonDoc from "@/skills/fa-design-system/references/components/button.md?raw";
import { Button } from "./button";
import { ButtonUtility } from "./button-utility";
import { CloseButton } from "./close-button";

/**
 * Canonical interactive story for the Button.
 *
 * The `Playground` renders a single Button driven entirely by the Controls
 * panel — switch color, size, text and the leading/trailing icon (any Fa icon,
 * or "None"), and toggle disabled/loading live. The
 * curated stories below (`Sizes`, `States`, `IconStroke`) are hand-picked
 * reference rows for at-a-glance review.
 *
 * Everything renders straight from the shipped design tokens in
 * `styles/theme.css` — e.g. the primary fill is `bg-brand-solid` →
 * `--color-bg-brand-solid` → `--color-brand-600`. Change that token and
 * every button here updates automatically.
 */

const sizes = ["sm", "md", "lg", "xl"] as const;

const colors = [
    "primary",
    "secondary",
    "tertiary",
    "link-gray",
    "link-color",
    "primary-destructive",
    "secondary-destructive",
    "tertiary-destructive",
    "link-destructive",
] as const;

/** Small captioned cell so it's obvious which button is which. */
const Labeled = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium tracking-wide text-tertiary uppercase">{label}</span>
        {children}
    </div>
);

const meta = {
    title: "Base components/Buttons/Button",
    component: Button,
    // The same skill page covers these; each gets its own tab in the props table.
    subcomponents: { ButtonUtility, CloseButton },
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props table
        // comes from the types and JSDoc in button.tsx.
        skillDoc: buttonDoc,
    },
    args: { color: "primary", size: "md", children: "Button CTA" },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        children: { control: "text" },
        iconLeading: iconArgType(),
        iconTrailing: iconArgType(),
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Single interactive button — edit props live in the Controls panel. */
export const Playground: Story = {};

/** The primary button across every size. */
export const Sizes: Story = {
    render: (args) => (
        <div className="flex flex-wrap items-end gap-8">
            {sizes.map((size) => (
                <Labeled key={size} label={size}>
                    <Button {...args} size={size} />
                </Labeled>
            ))}
        </div>
    ),
};

/**
 * STROKE PROTOTYPE — trialing a 1.5px default icon stroke (was 2px).
 * Stroke is in the icon's 24-unit viewBox, so on-screen thickness scales with size:
 *   all sizes use a 20px icon → ~1.25px stroke (sm link buttons use 16px → ~1.0px).
 * Compare against how these read before committing the default across the system.
 */
export const IconStroke: Story = {
    render: ({ children: _children, ...args }) => (
        <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-end gap-8">
                {sizes.map((size) => (
                    <Labeled key={size} label={`${size} · 20px icon`}>
                        <Button {...args} size={size} iconLeading={Upload}>
                            Button CTA
                        </Button>
                    </Labeled>
                ))}
            </div>
            <div className="flex flex-wrap items-end gap-8">
                {sizes.map((size) => (
                    <Labeled key={size} label={`${size} · icon only`}>
                        <Button {...args} size={size} iconLeading={Plus} aria-label="Add" />
                    </Labeled>
                ))}
            </div>
        </div>
    ),
};
IconStroke.storyName = "Icon stroke (1.5px prototype)";
// Experimental: stays on the canvas and in the sidebar, off the Docs page.
IconStroke.tags = ["!autodocs"];

/** The primary button in each interactive state. */
export const States: Story = {
    render: (args) => (
        <div className="flex flex-wrap items-end gap-8">
            <Labeled label="Default">
                <Button {...args} />
            </Labeled>
            <Labeled label="Disabled">
                <Button {...args} isDisabled />
            </Labeled>
            <Labeled label="Loading">
                <Button {...args} isLoading />
            </Labeled>
            <Labeled label="Loading + text">
                <Button {...args} isLoading showTextWhileLoading />
            </Labeled>
        </div>
    ),
};

/**
 * Every hierarchy at every size, with leading + trailing icons and the icon-only
 * variant — mirrors the Figma "Buttons/Button" and "Buttons/Button destructive"
 * variant grids. Link hierarchies have no icon-only variant in Figma.
 */
export const AllVariants: Story = {
    render: ({ children: _children, ...args }) => (
        <div className="flex flex-col gap-6">
            {colors.map((color) => (
                <div key={color} data-color={color} className="flex flex-wrap items-center gap-6">
                    <span className="w-44 text-xs font-medium text-tertiary">{color}</span>
                    {sizes.map((size) => (
                        <Button key={size} {...args} color={color} size={size} iconLeading={Plus} iconTrailing={Plus} data-size={size}>
                            Button CTA
                        </Button>
                    ))}
                    {!color.startsWith("link") &&
                        sizes.map((size) => (
                            <Button key={`${size}-icon`} {...args} color={color} size={size} iconLeading={Plus} aria-label="Add" data-size={size} />
                        ))}
                </div>
            ))}
        </div>
    ),
    parameters: { layout: "padded" },
};
AllVariants.storyName = "All variants";
