import type { FC } from "react";
import { Notification, NotificationToaster, type NotificationType, notify } from "@/components/application/notifications/notification";
import { Button } from "@/components/base/buttons/button";

export default {
    title: "Application/Notifications",
    decorators: [
        (Story: FC) => (
            <div className="min-h-screen w-full bg-secondary p-4 sm:p-8">
                <Story />
            </div>
        ),
    ],
};

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
            avatarSrc="https://www.untitledui.com/images/avatars/katherine-moss?fm=webp&q=80"
            title="Katherine Moss"
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
            imageSrc="https://www.untitledui.com/marketing/spirals.webp"
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
