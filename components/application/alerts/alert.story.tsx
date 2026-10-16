import type { FC } from "react";
import { Alert, type AlertColor } from "@/components/application/alerts/alert";
import { Button } from "@/components/base/buttons/button";

export default {
    title: "Application/Alerts",
    decorators: [
        (Story: FC) => (
            <div className="min-h-screen w-full bg-primary p-4">
                <Story />
            </div>
        ),
    ],
};

const colors: AlertColor[] = ["default", "gray", "brand", "error", "warning", "success"];

const titles: Record<AlertColor, string> = {
    default: "We’ve just released a new feature",
    gray: "We’ve just released a new feature",
    brand: "We’ve just released a new feature",
    error: "There was a problem with that action",
    warning: "Just to let you know this might be a problem",
    success: "Successfully updated profile",
};

const noop = () => {};

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
