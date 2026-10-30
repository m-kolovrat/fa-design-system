import type { Meta, StoryObj } from "@storybook/react-vite";
import { Notification, NotificationToaster, type NotificationType, notify } from "@/components/application/notifications/notification";
import { Button } from "@/components/base/buttons/button";
import notificationDoc from "@/skills/fa-design-system/references/components/notification.md?raw";
import { cx } from "@/utils/cx";

const meta = {
    title: "Application/Notifications",
    component: Notification,
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props table
        // comes from the types and JSDoc in notification.tsx.
        skillDoc: notificationDoc,
    },
    decorators: [
        (Story, { viewMode }) => (
            <div className={cx("w-full bg-secondary p-4 sm:p-8", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        ),
    ],
    args: {
        type: "brand",
        title: "We’ve just released a new update!",
        description: "Check out the all new dashboard view. Pages now load faster.",
        progress: 60,
        meta: "2 mins ago",
        avatarSrc: "/images/avatars/sander-bakken.svg",
        imageSrc:
            "https://images.unsplash.com/photo-1484506097116-1bcba4fa7568?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        title: { control: "text" },
        description: { control: "text" },
        meta: { control: "text" },
        progress: { control: { type: "range", min: 0, max: 100 } },
        actions: { control: false },
        icon: { control: false },
        onClose: { control: false },
    },
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

const LinkActions = ({ secondary = "Dismiss", primary = "View changes" }: { secondary?: string; primary?: string }) => (
    <>
        <Button size="sm" color="link-gray">
            {secondary}
        </Button>
        <Button size="sm" color="link-color">
            {primary}
        </Button>
    </>
);

const examples: { type: NotificationType; title: string; description: string; actions?: [string, string] }[] = [
    {
        type: "brand",
        title: "We’ve just released a new update!",
        description: "Check out the all new dashboard view. Pages now load faster.",
        actions: ["Dismiss", "Changelog"],
    },
    {
        type: "gray",
        title: "Version 1.4.1 is now available",
        description: "Includes the all new dashboard view. Pages now load faster.",
        actions: ["Later", "Install now"],
    },
    {
        type: "error",
        title: "This project has been unpublished",
        description: "Removing all users has unpublished this project.",
        actions: ["Dismiss", "Undo action"],
    },
    {
        type: "warning",
        title: "Storage almost full",
        description: "You’ve used 90% of your storage. Upgrade to keep uploading files.",
        actions: ["Dismiss", "Upgrade plan"],
    },
    {
        type: "success",
        title: "Successfully updated profile",
        description: "Your changes have been saved and your profile is live.",
        actions: ["Dismiss", "View changes"],
    },
    {
        type: "none",
        title: "Updates have been made to your project",
        description: "Your team has made changes to your project.",
        actions: ["Dismiss", "View changes"],
    },
];

/** Single interactive notification — edit props live in the Controls panel (`meta`, `avatarSrc`, `imageSrc` and `progress` apply to their types). */
export const Playground: Story = {
    render: (args) => <Notification {...args} onClose={noop} actions={<LinkActions />} />,
};

export const AllTypes = () => (
    <div className="flex flex-wrap items-start gap-6">
        {examples.map((example) => (
            <Notification
                key={example.type}
                type={example.type}
                title={example.title}
                description={example.description}
                onClose={noop}
                actions={example.actions && <LinkActions secondary={example.actions[0]} primary={example.actions[1]} />}
            />
        ))}
        <Notification
            type="avatar"
            avatarSrc="/images/avatars/sander-bakken.svg"
            title="Sander Bakken"
            meta="2 mins ago"
            description="I’ve finished adding my notes. Happy for us to review whenever you’re ready!"
            onClose={noop}
            actions={<LinkActions secondary="Dismiss" primary="Reply" />}
        />
        <Notification
            type="progress"
            progress={60}
            title="Uploading ‘website-FINAL06.fig’"
            description="Please wait while we upload your file."
            onClose={noop}
            actions={<LinkActions secondary="Cancel" primary="Upload another" />}
        />
        <Notification
            type="image"
            imageSrc="https://images.unsplash.com/photo-1484506097116-1bcba4fa7568?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="We’ve just released a new feature"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
            onClose={noop}
            actions={<LinkActions secondary="Dismiss" primary="Try it out" />}
        />
    </div>
);
AllTypes.storyName = "All types";

export const AsToast = () => (
    <div className="flex flex-wrap gap-3">
        <NotificationToaster />
        {examples.map((example) => (
            <Button
                key={example.type}
                color="secondary"
                onClick={() =>
                    notify({
                        type: example.type,
                        title: example.title,
                        description: example.description,
                        actions: example.actions && <LinkActions secondary={example.actions[0]} primary={example.actions[1]} />,
                    })
                }
            >
                Show {example.type}
            </Button>
        ))}
    </div>
);
AsToast.storyName = "As toast";
