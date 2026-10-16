import type { FC, ReactNode } from "react";
import { CheckCircle, Settings01, Trash01, UserPlus01 } from "@untitledui/icons";
import { Dialog, DialogTrigger, Modal, ModalActions, ModalHeader, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

export default {
    title: "Application/Modal",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full items-start bg-primary p-4">
                <Story />
            </div>
        ),
    ],
};

const Example = ({ trigger, className = "max-w-100", children }: { trigger: ReactNode; className?: string; children: (close: () => void) => ReactNode }) => (
    <DialogTrigger>
        {trigger}
        <ModalOverlay isDismissable>
            <Modal className={className}>
                <Dialog>{({ close }) => children(close)}</Dialog>
            </Modal>
        </ModalOverlay>
    </DialogTrigger>
);

export const Default = () => (
    <Example trigger={<Button color="secondary">Open modal</Button>}>
        {(close) => (
            <>
                <ModalHeader
                    icon={<FeaturedIcon icon={CheckCircle} color="success" theme="light" size="lg" />}
                    title="Blog post published"
                    description="This blog post has been published. Team members will be able to edit this post and republish changes."
                    paddingBottom={false}
                />
                <ModalActions>
                    <Button size="lg" color="secondary" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="lg" onClick={close}>
                        Confirm
                    </Button>
                </ModalActions>
            </>
        )}
    </Example>
);

export const Destructive = () => (
    <Example trigger={<Button color="primary-destructive">Delete item</Button>}>
        {(close) => (
            <>
                <ModalHeader
                    icon={<FeaturedIcon icon={Trash01} color="error" theme="light" size="lg" />}
                    title="Delete this item?"
                    description="This action cannot be undone. This will permanently remove the item."
                    paddingBottom={false}
                />
                <ModalActions>
                    <Button size="lg" color="secondary" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="lg" color="primary-destructive" onClick={close}>
                        Delete
                    </Button>
                </ModalActions>
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
                    <ModalHeader
                        align="left"
                        icon={<FeaturedIcon icon={CheckCircle} color="success" theme="light" size="lg" />}
                        title="Blog post published"
                        description="This blog post has been published. Team members will be able to edit this post and republish changes."
                        paddingBottom={false}
                    />
                    <ModalActions layout="vertical">
                        <Button size="lg" onClick={close}>
                            Confirm
                        </Button>
                        <Button size="lg" color="secondary" onClick={close}>
                            Cancel
                        </Button>
                    </ModalActions>
                </>
            )}
        </Example>
        <Example trigger={<Button color="secondary">Center aligned + horizontal</Button>}>
            {(close) => (
                <>
                    <ModalHeader
                        align="center"
                        icon={<FeaturedIcon icon={CheckCircle} color="success" theme="light" size="lg" />}
                        title="Blog post published"
                        description="This blog post has been published. Team members will be able to edit this post and republish changes."
                        paddingBottom={false}
                    />
                    <ModalActions layout="horizontal">
                        <Button size="lg" color="secondary" onClick={close}>
                            Cancel
                        </Button>
                        <Button size="lg" onClick={close}>
                            Confirm
                        </Button>
                    </ModalActions>
                </>
            )}
        </Example>
        <Example className="max-w-140" trigger={<Button color="secondary">Horizontal + right aligned, dividers</Button>}>
            {(close) => (
                <>
                    <ModalHeader
                        align="horizontal"
                        icon={<FeaturedIcon icon={CheckCircle} color="success" theme="light" size="lg" />}
                        title="Blog post published"
                        description="This blog post has been published. Team members will be able to edit this post and republish changes."
                        divider
                    />
                    <ModalActions
                        layout="horizontal-right"
                        divider
                        leading={
                            <>
                                <Checkbox label="Don’t show again" />
                                <Button size="lg" color="link-gray" iconLeading={Settings01}>
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
                    </ModalActions>
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
                <ModalHeader
                    icon={<FeaturedIcon icon={UserPlus01} color="gray" theme="modern" size="lg" />}
                    title="Invite team member"
                    description="They’ll get an email with a link to join your workspace."
                />
                <div className="flex flex-col gap-4 px-4 sm:px-6">
                    <Input label="Email" placeholder="olivia@untitledui.com" />
                </div>
                <ModalActions>
                    <Button size="lg" color="secondary" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="lg" onClick={close}>
                        Send invite
                    </Button>
                </ModalActions>
            </>
        )}
    </Example>
);
CustomBody.storyName = "Custom body";
