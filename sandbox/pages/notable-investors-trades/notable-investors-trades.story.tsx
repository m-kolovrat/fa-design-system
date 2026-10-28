import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotableInvestorsTradesPage } from "./notable-investors-trades";

const meta = {
    title: "Pages/Notable investors trades",
    component: NotableInvestorsTradesPage,
    tags: ["!autodocs"],
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof NotableInvestorsTradesPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** Skeleton rows while the trades load. */
export const Loading: Story = { args: { isLoading: true }, globals: { viewport: { value: "desktop", isRotated: false } } };
