import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MarketOverviewPage } from "./market-overview";

const meta = {
    title: "Pages/Market overview",
    component: MarketOverviewPage,
    tags: ["!autodocs"],
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MarketOverviewPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
