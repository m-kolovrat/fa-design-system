import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationToaster } from "fa-design-system/components/application/notifications/notification";
import { StockPage } from "./stock-page";

const meta = {
    title: "Pages/Stock page",
    component: StockPage,
    tags: ["!autodocs"],
    parameters: { layout: "fullscreen" },
    // In an app the toaster is mounted once at the root; the story stands in for that root.
    decorators: [
        (Story) => (
            <>
                <Story />
                <NotificationToaster />
            </>
        ),
    ],
} satisfies Meta<typeof StockPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
