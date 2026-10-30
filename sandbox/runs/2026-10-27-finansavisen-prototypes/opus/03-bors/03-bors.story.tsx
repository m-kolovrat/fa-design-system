import type { Meta, StoryObj } from "@storybook/react-vite";
import { BorsPage } from "./03-bors";

const meta = {
    title: "Runs/2026-10-27/opus/03-bors",
    component: BorsPage,
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BorsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
    args: { loggedIn: true },
    globals: { viewport: { value: "desktop", isRotated: false } },
};

export const Mobile: Story = {
    args: { loggedIn: true },
    globals: { viewport: { value: "mobile", isRotated: false } },
};

export const LoggedOut: Story = {
    name: "Logged out (desktop)",
    args: { loggedIn: false },
    globals: { viewport: { value: "desktop", isRotated: false } },
};

export const LoggedOutMobile: Story = {
    name: "Logged out (mobile)",
    args: { loggedIn: false },
    globals: { viewport: { value: "mobile", isRotated: false } },
};
