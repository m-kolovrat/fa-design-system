import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, type AlertColor } from "@/components/application/alerts/alert";
import { Button } from "@/components/base/buttons/button";
import alertDoc from "@/skills/fa-design-system/references/components/alert.md?raw";
import { cx } from "@/utils/cx";

const meta = {
    title: "Application/Alerts",
    component: Alert,
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props table
        // comes from the types and JSDoc in alert.tsx.
        skillDoc: alertDoc,
    },
    decorators: [
        (Story, { viewMode }) => (
            <div className={cx("w-full bg-primary p-4", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        ),
    ],
    args: {
        color: "gray",
        variant: "floating",
        title: "We’ve just released a new feature",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.",
    },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        title: { control: "text" },
        description: { control: "text" },
        actions: { control: false },
        icon: { control: false },
        onClose: { control: false },
    },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

const colors: AlertColor[] = ["gray", "brand", "error", "warning", "success"];

const titles: Record<AlertColor, string> = {
    gray: "We’ve just released a new feature",
    brand: "We’ve just released a new feature",
    error: "There was a problem with that action",
    warning: "Just to let you know this might be a problem",
    success: "Successfully updated profile",
};

const noop = () => {};

/** Single interactive alert — edit props live in the Controls panel. */
export const Playground: Story = {
    render: (args) => (
        <div className="max-w-container">
            <Alert
                {...args}
                onClose={noop}
                actions={
                    args.variant === "full-width" ? (
                        <>
                            <Button size="md" color="secondary">
                                Dismiss
                            </Button>
                            <Button size="md">View changes</Button>
                        </>
                    ) : (
                        <>
                            <Button size="sm" color="link-gray">
                                Dismiss
                            </Button>
                            <Button size="sm" color="link-color">
                                View changes
                            </Button>
                        </>
                    )
                }
            />
        </div>
    ),
};

export const Floating = () => (
    <div className="flex max-w-container flex-col gap-4">
        {colors.map((color) => (
            <Alert
                key={color}
                color={color}
                title={titles[color]}
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam."
                onClose={noop}
                actions={
                    <>
                        <Button size="sm" color="link-gray">
                            Dismiss
                        </Button>
                        <Button size="sm" color="link-color">
                            View changes
                        </Button>
                    </>
                }
            />
        ))}
    </div>
);

export const FullWidth = () => (
    <div className="-mx-4 flex flex-col gap-6">
        {colors.map((color) => (
            <Alert
                key={color}
                variant="full-width"
                color={color}
                title={titles[color]}
                description="Lorem ipsum dolor sit amet consectetur."
                onClose={noop}
                actions={
                    <>
                        <Button size="md" color="secondary">
                            Dismiss
                        </Button>
                        <Button size="md">View changes</Button>
                    </>
                }
            />
        ))}
    </div>
);
FullWidth.storyName = "Full-width";

export const Minimal = () => (
    <div className="flex max-w-120 flex-col gap-4">
        <Alert color="success" title="Successfully updated profile" />
        <Alert color="error" title="There was a problem with that action" description="Please try again in a few minutes." onClose={noop} />
    </div>
);
