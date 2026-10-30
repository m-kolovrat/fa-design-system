import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal, ModalBody, ModalFooter, ModalHeader, type ModalProps } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import modalDoc from "@/skills/fa-design-system/references/components/modal.md?raw";
import { cx } from "@/utils/cx";

const meta = {
    title: "Application/Modals",
    component: Modal,
    subcomponents: { ModalHeader, ModalBody, ModalFooter },
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props tables
        // come from the types and JSDoc in modal.tsx.
        skillDoc: modalDoc,
    },
    decorators: [
        (Story, { viewMode }) => (
            <div className={cx("flex w-full items-start bg-primary p-4", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        ),
    ],
    args: { mobile: "sheet", isDismissable: true, children: null },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        children: { control: false },
        isOpen: { control: false },
        onOpenChange: { control: false },
    },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const Example = ({
    trigger,
    children,
    ...props
}: Omit<ModalProps, "children"> & {
    trigger: ReactNode;
    children: (close: () => void) => ReactNode;
}) => (
    <Modal.Trigger>
        {trigger}
        <Modal {...props}>{({ close }) => children(close)}</Modal>
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

/** Centered on desktop, a bottom sheet on mobile (switch the viewport to see it). The controls set the `Modal` props. */
export const Default: Story = {
    args: { className: "sm:max-w-140" },
    render: ({ children: _children, ...args }) => (
        <Example {...args} trigger={<Button color="secondary">Invite team members</Button>}>
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
    ),
};
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
