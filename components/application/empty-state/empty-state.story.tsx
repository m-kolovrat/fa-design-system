import type { FC } from "react";
import { Alert, Plus, Restart, Search } from "fa-icons";
import { EmptyState, ErrorState } from "@/components/application/empty-state/empty-state";
import { Button } from "@/components/base/buttons/button";

export default {
    title: "Application/Empty states",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full items-center justify-center bg-primary p-8">
                <Story />
            </div>
        ),
    ],
};

/** The Figma boolean props, as Storybook controls. */
interface ToggleArgs {
    showIcon: boolean;
    actions: boolean;
    secondaryButton: boolean;
    primaryButton: boolean;
}

const toggles = {
    args: { showIcon: true, actions: true, secondaryButton: true, primaryButton: true },
    argTypes: {
        showIcon: { name: "Featured icon", control: "boolean" },
        actions: { name: "Actions", control: "boolean" },
        secondaryButton: { name: "Secondary button", control: "boolean" },
        primaryButton: { name: "Primary button", control: "boolean" },
    },
};

export const Empty = {
    ...toggles,
    render: (args: ToggleArgs) => (
        <EmptyState
            showIcon={args.showIcon}
            icon={Search}
            title="No projects found"
            description="Your search “Landing page design” did not match any projects. Please try again."
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
    render: (args: ToggleArgs) => (
        <ErrorState
            showIcon={args.showIcon}
            icon={Alert}
            title="Something went wrong"
            description="Please try again later."
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
