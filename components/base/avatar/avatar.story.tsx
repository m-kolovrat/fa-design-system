import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import avatarDoc from "@/skills/fa-design-system/references/components/avatar.md?raw";
import { Avatar } from "./avatar";
import { AvatarLabelGroup } from "./avatar-label-group";
import { AvatarProfilePhoto } from "./avatar-profile-photo";
import { AvatarAddButton } from "./base-components";

/**
 * Canonical interactive story for the Avatar.
 *
 * `Playground` renders one Avatar driven entirely by the Controls panel; the
 * curated rows below (`Sizes`, `Types`) are hand-picked references. The
 * `LabelGroup` story covers the sibling `AvatarLabelGroup` component.
 */

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

const AVATAR_SRC = "/images/avatars/ingrid-berg.svg";

/** Small captioned cell so it's obvious which avatar is which. */
const Labeled = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium tracking-wide text-tertiary uppercase">{label}</span>
        {children}
    </div>
);

const meta = {
    title: "Base components/Avatars",
    component: Avatar,
    subcomponents: { AvatarLabelGroup, AvatarProfilePhoto, AvatarAddButton },
    tags: ["autodocs"],
    // The Docs page text is avatar.md; the props tables come from the components' types and JSDoc.
    parameters: { layout: "centered", skillDoc: avatarDoc },
    args: {
        size: "lg",
        src: AVATAR_SRC,
        initials: "LS",
        verified: false,
        border: false,
        rounded: true,
    },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        src: { control: "text" },
    },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Single interactive avatar — edit props live in the Controls panel. */
export const Playground: Story = {};

/** The avatar across every size. */
export const Sizes: Story = {
    render: (args) => (
        <div className="flex flex-wrap items-end gap-8">
            {sizes.map((size) => (
                <Labeled key={size} label={size}>
                    <Avatar {...args} size={size} />
                </Labeled>
            ))}
        </div>
    ),
};

/** The different content fallbacks and badges an avatar can show. */
export const Types: Story = {
    render: (args) => (
        <div className="flex flex-wrap items-end gap-8">
            <Labeled label="Image">
                <Avatar {...args} src={AVATAR_SRC} />
            </Labeled>
            <Labeled label="Initials">
                <Avatar {...args} src={undefined} initials="LS" />
            </Labeled>
            <Labeled label="Icon">
                <Avatar {...args} src={undefined} initials={undefined} />
            </Labeled>
            <Labeled label="Online">
                <Avatar {...args} src={AVATAR_SRC} status="online" />
            </Labeled>
            <Labeled label="Verified">
                <Avatar {...args} src={AVATAR_SRC} verified />
            </Labeled>
        </div>
    ),
};

/** The sibling AvatarLabelGroup — avatar plus title/subtitle. */
export const LabelGroup: Story = {
    name: "Avatar label group",
    render: () => (
        <div className="flex flex-col gap-6">
            {(["sm", "md", "lg", "xl"] as const).map((size) => (
                <AvatarLabelGroup key={size} size={size} src={AVATAR_SRC} title="Ingrid Berg" subtitle="ingrid.berg@finansavisen.no" />
            ))}
        </div>
    ),
};
