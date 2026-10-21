import type { FC, ReactNode } from "react";
import { Settings, Success, Trash, Users } from "fa-icons";
import { PromptModal, PromptModalActions, PromptModalHeader } from "@/components/application/prompt-modal/prompt-modal";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

export default {
    title: "Application/Prompt modals",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full items-start bg-primary p-4">
                <Story />
            </div>
        ),
    ],
};

const Example = ({ trigger, className, children }: { trigger: ReactNode; className?: string; children: (close: () => void) => ReactNode }) => (
    <PromptModal.Trigger>
        {trigger}
        <PromptModal className={className}>{({ close }) => children(close)}</PromptModal>
    </PromptModal.Trigger>
);

export const Default = () => (
    <Example trigger={<Button color="secondary">Open prompt modal</Button>}>
        {(close) => (
            <>
                <PromptModalHeader
                    icon={<FeaturedIcon icon={Success} color="success" theme="light" size="lg" />}
                    title="Blog post published"
                    description="This blog post has been published. Team members will be able to edit this post and republish changes."
                    paddingBottom={false}
                />
                <PromptModalActions>
                    <Button size="lg" color="secondary" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="lg" onClick={close}>
                        Confirm
                    </Button>
                </PromptModalActions>
            </>
        )}
    </Example>
);

export const Destructive = () => (
    <Example trigger={<Button color="primary-destructive">Delete item</Button>}>
        {(close) => (
            <>
                <PromptModalHeader
                    icon={<FeaturedIcon icon={Trash} color="error" theme="light" size="lg" />}
                    title="Delete this item?"
                    description="This action cannot be undone. This will permanently remove the item."
                    paddingBottom={false}
                />
                <PromptModalActions>
                    <Button size="lg" color="secondary" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="lg" color="primary-destructive" onClick={close}>
                        Delete
                    </Button>
                </PromptModalActions>
            </>
        )}
    </Example>
);

/** All three Figma header types and all three action layouts. */
export const Parts = () => (
    <div className="flex flex-wrap gap-3">
        <Example trigger={<Button color="secondary">Left aligned + vertical</Button>}>
            {(close) => (
                <>
                    <PromptModalHeader
                        align="left"
                        icon={<FeaturedIcon icon={Success} color="success" theme="light" size="lg" />}
                        title="Blog post published"
                        description="This blog post has been published. Team members will be able to edit this post and republish changes."
                        paddingBottom={false}
                    />
                    <PromptModalActions layout="vertical">
                        <Button size="lg" onClick={close}>
                            Confirm
                        </Button>
                        <Button size="lg" color="secondary" onClick={close}>
                            Cancel
                        </Button>
                    </PromptModalActions>
                </>
            )}
        </Example>
        <Example trigger={<Button color="secondary">Center aligned + horizontal</Button>}>
            {(close) => (
                <>
                    <PromptModalHeader
                        align="center"
                        icon={<FeaturedIcon icon={Success} color="success" theme="light" size="lg" />}
                        title="Blog post published"
                        description="This blog post has been published. Team members will be able to edit this post and republish changes."
                        paddingBottom={false}
                    />
                    <PromptModalActions layout="horizontal">
                        <Button size="lg" color="secondary" onClick={close}>
                            Cancel
                        </Button>
                        <Button size="lg" onClick={close}>
                            Confirm
                        </Button>
                    </PromptModalActions>
                </>
            )}
        </Example>
        <Example className="max-w-140" trigger={<Button color="secondary">Horizontal + right aligned, dividers</Button>}>
            {(close) => (
                <>
                    <PromptModalHeader
                        align="horizontal"
                        icon={<FeaturedIcon icon={Success} color="success" theme="light" size="lg" />}
                        title="Blog post published"
                        description="This blog post has been published. Team members will be able to edit this post and republish changes."
                        divider
                    />
                    <PromptModalActions
                        layout="horizontal-right"
                        divider
                        leading={
                            <>
                                <Checkbox label="Don’t show again" />
                                <Button size="lg" color="link-gray" iconLeading={Settings}>
                                    Settings
                                </Button>
                            </>
                        }
                    >
                        <Button size="lg" color="secondary" onClick={close}>
                            Cancel
                        </Button>
                        <Button size="lg" onClick={close}>
                            Confirm
                        </Button>
                    </PromptModalActions>
                </>
            )}
        </Example>
    </div>
);

/** The body between header and actions is a free slot. */
export const CustomBody = () => (
    <Example trigger={<Button color="secondary">Invite team member</Button>}>
        {(close) => (
            <>
                <PromptModalHeader
                    icon={<FeaturedIcon icon={Users} color="gray" theme="modern" size="lg" />}
                    title="Invite team member"
                    description="They’ll get an email with a link to join your workspace."
                />
                <div className="flex flex-col gap-4 px-4 sm:px-6">
                    <Input label="Email" placeholder="olivia@untitledui.com" />
                </div>
                <PromptModalActions>
                    <Button size="lg" color="secondary" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="lg" onClick={close}>
                        Send invite
                    </Button>
                </PromptModalActions>
            </>
        )}
    </Example>
);
CustomBody.storyName = "Custom body";
