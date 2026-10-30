import type { Meta, StoryObj } from "@storybook/react-vite";
import { BjellesauerPage } from "./05-bjellesauer";

const meta: Meta<typeof BjellesauerPage> = {
    title: "Runs/2026-10-27/opus/05-bjellesauer",
    component: BjellesauerPage,
    parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof BjellesauerPage>;

export const Desktop: Story = {
    args: { isSubscriber: true },
    globals: { viewport: { value: "desktop", isRotated: false } },
};

export const Mobile: Story = {
    args: { isSubscriber: true },
    globals: { viewport: { value: "mobile", isRotated: false } },
};

/** Logged out: three trades and the paywall box. */
export const TeaserDesktop: Story = {
    name: "Teaser (logged out) – Desktop",
    args: { isSubscriber: false },
    globals: { viewport: { value: "desktop", isRotated: false } },
};

export const TeaserMobile: Story = {
    name: "Teaser (logged out) – Mobile",
    args: { isSubscriber: false },
    globals: { viewport: { value: "mobile", isRotated: false } },
};
