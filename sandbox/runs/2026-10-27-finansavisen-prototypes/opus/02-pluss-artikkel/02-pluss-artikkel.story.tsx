import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlussArtikkel } from "./02-pluss-artikkel";

const meta: Meta<typeof PlussArtikkel> = {
    title: "Runs/2026-10-27/opus/02-pluss-artikkel",
    component: PlussArtikkel,
    parameters: { layout: "fullscreen" },
    args: { isSubscriber: true },
};

export default meta;

type Story = StoryObj<typeof PlussArtikkel>;

export const Desktop: Story = {
    globals: { viewport: { value: "desktop", isRotated: false } },
};

export const Mobile: Story = {
    globals: { viewport: { value: "mobile", isRotated: false } },
};

/** Non-subscriber: headline, ingress and opening only, then the subscribe / log in offer. */
export const PaywallMobile: Story = {
    name: "Paywall (mobile)",
    args: { isSubscriber: false },
    globals: { viewport: { value: "mobile", isRotated: false } },
};

export const PaywallDesktop: Story = {
    name: "Paywall (desktop)",
    args: { isSubscriber: false },
    globals: { viewport: { value: "desktop", isRotated: false } },
};
