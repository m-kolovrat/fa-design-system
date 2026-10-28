import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import loadingIndicatorDoc from "@/skills/fa-design-system/references/components/loading-indicator.md?raw";
import { cx } from "@/utils/cx";
import { LoadingIndicator } from "./loading-indicator";
import * as Demos from "./loading-indicator.demo";

const meta = {
    title: "Application/Loading indicators",
    component: LoadingIndicator,
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props table
        // comes from the types and JSDoc in loading-indicator.tsx.
        skillDoc: loadingIndicatorDoc,
    },
    decorators: [
        (Story, { viewMode }) => (
            <div className={cx("flex items-center justify-center bg-primary p-8", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        ),
    ],
    args: { type: "line-simple", size: "md", label: "Loading..." },
} satisfies Meta<typeof LoadingIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Single interactive loading indicator — edit props live in the Controls panel. */
export const Playground: Story = {};

export const LoadingIndicatorLineSimple = () => <Demos.LoadingIndicatorLineSimple />;
LoadingIndicatorLineSimple.storyName = "Loading indicator line simple";

export const LoadingIndicatorLineSpinner = () => <Demos.LoadingIndicatorLineSpinner />;
LoadingIndicatorLineSpinner.storyName = "Loading indicator line spinner";

export const LoadingIndicatorDotCircle = () => <Demos.LoadingIndicatorDotCircle />;
LoadingIndicatorDotCircle.storyName = "Loading indicator dot circle";
