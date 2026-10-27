import { PlussArtikkel } from "./02-pluss-artikkel";

export default {
    title: "Experiments/sonnet/02-pluss-artikkel",
};

export const Desktop = () => <PlussArtikkel />;
Desktop.globals = { viewport: { value: "desktop", isRotated: false } };

export const Mobile = () => <PlussArtikkel />;
Mobile.globals = { viewport: { value: "mobile", isRotated: false } };

export const PaywalledMobile = () => <PlussArtikkel isSubscriber={false} />;
PaywalledMobile.storyName = "Paywalled (non-subscriber, mobile)";
PaywalledMobile.globals = { viewport: { value: "mobile", isRotated: false } };

export const PaywalledDesktop = () => <PlussArtikkel isSubscriber={false} />;
PaywalledDesktop.storyName = "Paywalled (non-subscriber, desktop)";
PaywalledDesktop.globals = { viewport: { value: "desktop", isRotated: false } };
