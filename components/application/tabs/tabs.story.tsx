import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import tabsDoc from "@/skills/fa-design-system/references/components/tabs.md?raw";
import { cx } from "@/utils/cx";
import { Tab, TabList, TabPanel, Tabs } from "./tabs";
import * as Demos from "./tabs.demo";

const meta = {
    title: "Application/Tabs",
    component: Tabs,
    subcomponents: { "Tabs.List": TabList, "Tabs.Item": Tab, "Tabs.Panel": TabPanel },
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props tables
        // come from the types and JSDoc in tabs.tsx.
        skillDoc: tabsDoc,
    },
    decorators: [
        (Story, { viewMode }) => (
            <div className={cx("flex items-center justify-center bg-primary p-8", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        ),
    ],
    args: { orientation: "horizontal", keyboardActivation: "manual", defaultSelectedKey: "details" },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        selectedKey: { control: false },
        onSelectionChange: { control: false },
        disabledKeys: { control: false },
    },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const playgroundTabs = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "notifications", label: "Notifications", badge: 2 },
];

/** `Tabs` with a `button-brand` list and a panel per tab — the controls set the `Tabs` props. */
export const Playground: Story = {
    render: (args) => (
        <Tabs {...args} className={cx("w-max", args.orientation === "vertical" && "flex-row gap-8")}>
            <Tabs.List type="button-brand" items={playgroundTabs}>
                {(tab) => <Tabs.Item {...tab} />}
            </Tabs.List>
            {playgroundTabs.map((tab) => (
                <Tabs.Panel key={tab.id} id={tab.id} className="pt-4 text-sm text-tertiary">
                    {tab.label} panel
                </Tabs.Panel>
            ))}
        </Tabs>
    ),
};

export const ButtonBrandHorizontal = () => <Demos.ButtonBrandHorizontal />;
ButtonBrandHorizontal.storyName = "Button brand horizontal";

export const ButtonBrandHorizontalFullWidth = () => <Demos.ButtonBrandHorizontalFullWidth />;
ButtonBrandHorizontalFullWidth.storyName = "Button brand horizontal full width";

export const ButtonBrandVertical = () => <Demos.ButtonBrandVertical />;
ButtonBrandVertical.storyName = "Button brand vertical";

export const ButtonGrayHorizontal = () => <Demos.ButtonGrayHorizontal />;
ButtonGrayHorizontal.storyName = "Button gray horizontal";

export const ButtonGrayHorizontalFullWidth = () => <Demos.ButtonGrayHorizontalFullWidth />;
ButtonGrayHorizontalFullWidth.storyName = "Button gray horizontal full width";

export const ButtonGrayVertical = () => <Demos.ButtonGrayVertical />;
ButtonGrayVertical.storyName = "Button gray vertical";

export const UnderlineHorizontal = () => <Demos.UnderlineHorizontal />;
UnderlineHorizontal.storyName = "Underline horizontal";

export const UnderlineHorizontalFullWidth = () => <Demos.UnderlineHorizontalFullWidth />;
UnderlineHorizontalFullWidth.storyName = "Underline horizontal full width";

export const UnderlineVertical = () => <Demos.UnderlineVertical />;
UnderlineVertical.storyName = "Underline vertical";

export const ButtonBorderHorizontal = () => <Demos.ButtonBorderHorizontal />;
ButtonBorderHorizontal.storyName = "Button border horizontal";

export const ButtonBorderHorizontalFullWidth = () => <Demos.ButtonBorderHorizontalFullWidth />;
ButtonBorderHorizontalFullWidth.storyName = "Button border horizontal full width";

export const ButtonBorderVertical = () => <Demos.ButtonBorderVertical />;
ButtonBorderVertical.storyName = "Button border vertical";

export const ButtonMinimalHorizontal = () => <Demos.ButtonMinimalHorizontal />;
ButtonMinimalHorizontal.storyName = "Button minimal horizontal";

export const ButtonMinimalHorizontalFullWidth = () => <Demos.ButtonMinimalHorizontalFullWidth />;
ButtonMinimalHorizontalFullWidth.storyName = "Button minimal horizontal full width";

export const ButtonMinimalVertical = () => <Demos.ButtonMinimalVertical />;
ButtonMinimalVertical.storyName = "Button minimal vertical";
