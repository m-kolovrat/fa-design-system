import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PortfolioWatchlistPage } from "./portfolio-watchlist";

const meta = {
    title: "Pages/Portfolio watchlist",
    component: PortfolioWatchlistPage,
    tags: ["!autodocs"],
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PortfolioWatchlistPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
