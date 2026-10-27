import type { ComponentPropsWithRef } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { type SlideoutHeaderProps, SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import slideoutMenuDoc from "@/skills/fa-design-system/references/components/slideout-menu.md?raw";
import { cx } from "@/utils/cx";

/*
 * The parts reached through `SlideoutMenu.*`, for their props tables on the Docs page (docgen only
 * reads exported components). Not stories.
 */
/** `SlideoutMenu.Header`: the title area, with a close button in the corner. */
export const SlideoutMenuHeaderDoc = (props: SlideoutHeaderProps) => <SlideoutMenu.Header {...props} />;
/** `SlideoutMenu.Content`: the scrolling middle. `role` defaults to `"main"`. Takes `div` props. */
export const SlideoutMenuContentDoc = (props: ComponentPropsWithRef<"div">) => <SlideoutMenu.Content {...props} />;
/** `SlideoutMenu.Footer`: the actions, with a top divider. Takes `footer` props. */
export const SlideoutMenuFooterDoc = (props: ComponentPropsWithRef<"footer">) => <SlideoutMenu.Footer {...props} />;

const meta = {
    title: "Application/Slideout menu",
    component: SlideoutMenu,
    subcomponents: {
        "SlideoutMenu.Header": SlideoutMenuHeaderDoc,
        "SlideoutMenu.Content": SlideoutMenuContentDoc,
        "SlideoutMenu.Footer": SlideoutMenuFooterDoc,
    },
    excludeStories: /Doc$/,
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props tables
        // come from the types and JSDoc in slideout-menu.tsx.
        skillDoc: slideoutMenuDoc,
    },
    decorators: [
        (Story, { viewMode }) => (
            <div className={cx("flex w-full items-start bg-primary p-4", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        ),
    ],
    args: { isDismissable: false, children: null },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        children: { control: false },
        isOpen: { control: false },
        onOpenChange: { control: false },
    },
} satisfies Meta<typeof SlideoutMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The controls set the `SlideoutMenu` props. */
export const Default: Story = {
    render: ({ children: _children, ...args }) => (
        <SlideoutMenu.Trigger>
            <Button color="secondary">Open slideout</Button>
            <SlideoutMenu {...args}>
                {({ close }) => (
                    <>
                        <SlideoutMenu.Header onClose={close}>
                            <h2 className="text-lg font-semibold text-primary">Panel title</h2>
                            <p className="text-sm text-tertiary">A right-hand slideout built from the SlideoutMenu primitive.</p>
                        </SlideoutMenu.Header>
                        <SlideoutMenu.Content>
                            <Input name="name" label="Name" placeholder="Olivia Rhye" />
                            <Input name="email" type="email" label="Email" placeholder="olivia@untitledui.com" />
                        </SlideoutMenu.Content>
                        <SlideoutMenu.Footer>
                            <div className="flex justify-end gap-3">
                                <Button color="secondary" onClick={close}>
                                    Cancel
                                </Button>
                                <Button onClick={close}>Save</Button>
                            </div>
                        </SlideoutMenu.Footer>
                    </>
                )}
            </SlideoutMenu>
        </SlideoutMenu.Trigger>
    ),
};
