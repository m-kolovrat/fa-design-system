import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExamplePage } from "./example";

const meta = {
    title: "Pages/Example",
    component: ExamplePage,
    tags: ["!autodocs"],
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ExamplePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
