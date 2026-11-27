import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputSizeComparisonPage } from "./input-size-comparison";

const meta = {
    title: "Pages/input-size-comparison",
    component: InputSizeComparisonPage,
    tags: ["!autodocs"],
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof InputSizeComparisonPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
