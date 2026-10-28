import type { Meta } from "@storybook/nextjs-vite";
import { Plus, Restart } from "fa-icons";
import { EmptyState, type EmptyStateProps, ErrorState } from "@/components/application/empty-state/empty-state";
import { Button } from "@/components/base/buttons/button";
import { iconArg, iconArgType } from "@/components/internal/icon-controls";
import emptyStateDoc from "@/skills/fa-design-system/references/components/empty-state.md?raw";
import { cx } from "@/utils/cx";

/** The Figma boolean props, as Storybook controls, next to the component's own. */
interface ToggleArgs extends Pick<EmptyStateProps, "icon" | "title" | "description"> {
    showIcon: boolean;
    actions: boolean;
    secondaryButton: boolean;
    primaryButton: boolean;
}

const meta = {
    title: "Application/Empty states",
    component: EmptyState,
    subcomponents: { ErrorState },
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props table
        // comes from the types and JSDoc in empty-state.tsx.
        skillDoc: emptyStateDoc,
    },
    decorators: [
        (Story, { viewMode }) => (
            <div className={cx("flex w-full items-center justify-center bg-primary p-8", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<ToggleArgs>;

export default meta;

const toggles = {
    args: { showIcon: true, actions: true, secondaryButton: true, primaryButton: true },
    argTypes: {
        title: { control: "text" },
        description: { control: "text" },
        // No "None": leaving the icon out falls back to the default one. "Featured icon" hides it.
        icon: { name: "Icon", ...iconArgType({ none: false }) },
        showIcon: { name: "Featured icon", control: "boolean" },
        // Story-only toggles (they set the action props), grouped apart from the component's props.
        actions: {
            name: "Actions",
            description: "Shows the action row (Figma's Actions toggle). In code, pass `primaryAction` / `secondaryAction`.",
            control: "boolean",
            table: { category: "Figma toggles (story only)" },
        },
        secondaryButton: {
            name: "Secondary button",
            description: "Shows the secondary button (sets `secondaryAction`).",
            control: "boolean",
            table: { category: "Figma toggles (story only)" },
        },
        primaryButton: {
            name: "Primary button",
            description: "Shows the primary button (sets `primaryAction`).",
            control: "boolean",
            table: { category: "Figma toggles (story only)" },
        },
    },
};

export const Empty = {
    ...toggles,
    args: {
        ...toggles.args,
        icon: iconArg("Search"),
        title: "No projects found",
        description: "Your search “Landing page design” did not match any projects. Please try again.",
    },
    render: (args: ToggleArgs) => (
        <EmptyState
            showIcon={args.showIcon}
            icon={args.icon}
            title={args.title}
            description={args.description}
            secondaryAction={
                args.actions &&
                args.secondaryButton && (
                    <Button size="md" color="secondary">
                        Clear search
                    </Button>
                )
            }
            primaryAction={
                args.actions &&
                args.primaryButton && (
                    <Button size="md" iconLeading={Plus}>
                        New project
                    </Button>
                )
            }
        />
    ),
    parameters: { design: { desktop: "17201-20338" } },
};

export const ErrorStory = {
    ...toggles,
    name: "Error",
    args: { ...toggles.args, icon: iconArg("Alert"), title: "Something went wrong", description: "Please try again later." },
    render: (args: ToggleArgs) => (
        <ErrorState
            showIcon={args.showIcon}
            icon={args.icon}
            title={args.title}
            description={args.description}
            secondaryAction={
                args.actions &&
                args.secondaryButton && (
                    <Button size="md" color="secondary">
                        Go back
                    </Button>
                )
            }
            primaryAction={
                args.actions &&
                args.primaryButton && (
                    <Button size="md" iconLeading={Restart}>
                        Try again
                    </Button>
                )
            }
        />
    ),
    parameters: { design: { desktop: "17201-21604" } },
};
