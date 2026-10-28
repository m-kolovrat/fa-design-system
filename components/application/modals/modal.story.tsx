import type { FC, ReactNode } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";

export default {
    title: "Application/Modals",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full items-start bg-primary p-4">
                <Story />
            </div>
        ),
    ],
};

const Example = ({
    trigger,
    mobile,
    className,
    children,
}: {
    trigger: ReactNode;
    mobile?: "sheet" | "fullscreen";
    className?: string;
    children: (close: () => void) => ReactNode;
}) => (
    <Modal.Trigger>
        {trigger}
        <Modal mobile={mobile} className={className}>
            {({ close }) => children(close)}
        </Modal>
    </Modal.Trigger>
);

const Footer = ({ close, confirm }: { close: () => void; confirm: string }) => (
    <ModalFooter>
        <Button size="lg" color="secondary" onClick={close}>
            Cancel
        </Button>
        <Button size="lg" onClick={close}>
            {confirm}
        </Button>
    </ModalFooter>
);

/** Centered on desktop, a bottom sheet on mobile (switch the viewport to see it). */
export const Default = () => (
    <Example trigger={<Button color="secondary">Invite team members</Button>} className="sm:max-w-140">
        {(close) => (
            <>
                <ModalHeader title="Invite team members" badge="10/20 seats" description="Invite colleagues to collaborate on this project." />
                <ModalBody>
                    <Input label="Email" placeholder="kari.nordmann@finansavisen.no" isRequired />
                    <Input label="Email" placeholder="ola.hansen@finansavisen.no" isRequired />
                </ModalBody>
                <Footer close={close} confirm="Send invites" />
            </>
        )}
    </Example>
);
Default.parameters = {
    design: { desktop: "17279-7253", mobile: "17279-7282" },
};

/** `mobile="fullscreen"`: fills the screen on mobile. Use it for forms, where a sheet would leave little room above the keyboard. */
export const FullScreen = () => (
    <Example mobile="fullscreen" trigger={<Button color="secondary">New project</Button>}>
        {(close) => (
            <>
                <ModalHeader title="New project" description="Set up the basics. You can change them later." />
                <ModalBody>
                    <Input label="Project name" placeholder="Website redesign" isRequired />
                    <Input label="Client" placeholder="Acme Inc." />
                    <TextArea label="Description" placeholder="What is this project about?" rows={4} />
                    <Checkbox label="Notify team members" hint="Everyone on the team gets an email." />
                </ModalBody>
                <Footer close={close} confirm="Create project" />
            </>
        )}
    </Example>
);
FullScreen.storyName = "Full screen on mobile";
FullScreen.parameters = {
    design: { desktop: "17279-7253", mobile: "17279-7314" },
};

/** Header and footer stay put while the body scrolls. */
export const LongContent = () => (
    <Example trigger={<Button color="secondary">Terms of service</Button>}>
        {(close) => (
            <>
                <ModalHeader title="Terms of service" badge="Updated" description="Please read and accept to continue." />
                <ModalBody>
                    {Array.from({ length: 12 }, (_, i) => (
                        <p key={i} className="text-sm text-tertiary">
                            {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit
                            aliquet. Donec ullamcorper nulla non metus auctor fringilla.
                        </p>
                    ))}
                </ModalBody>
                <Footer close={close} confirm="Accept" />
            </>
        )}
    </Example>
);
LongContent.storyName = "Long content";

/** Header without a badge or description, and a modal without a footer. */
export const Minimal = () => (
    <Example trigger={<Button color="secondary">Keyboard shortcuts</Button>}>
        {() => (
            <>
                <ModalHeader title="Keyboard shortcuts" />
                <ModalBody>
                    {[
                        ["Search", "⌘ K"],
                        ["New project", "⌘ N"],
                        ["Toggle sidebar", "⌘ B"],
                    ].map(([label, keys]) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-secondary">{label}</span>
                            <span className="font-medium text-primary">{keys}</span>
                        </div>
                    ))}
                </ModalBody>
            </>
        )}
    </Example>
);
