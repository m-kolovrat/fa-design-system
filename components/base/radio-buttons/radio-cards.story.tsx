import type { FC, ReactNode } from "react";
import { Factory, Plant, Rocket } from "fa-icons";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { RadioCard, RadioCardGroup } from "@/components/base/radio-buttons/radio-cards";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";

export default {
    title: "Base components/Radio groups",
    component: RadioCard,
    subcomponents: { RadioCardGroup },
    tags: ["autodocs"],
    parameters: {
        // radio.md covers radio cards too; its full page is on Base components / Radio buttons.
        docs: {
            description: {
                component:
                    "Bordered cards with an icon, avatar, payment icon or price, chosen one at a time (`RadioCardGroup` + `RadioCard`). Usage rules: see **Base components / Radio buttons** (`radio.md`).",
            },
        },
    },
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full bg-primary p-4 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
};

const plans = [
    { id: "basic", title: "Basic plan", subtitle: "$10/month", price: "$10", icon: Plant },
    { id: "business", title: "Business plan", subtitle: "$20/month", price: "$20", icon: Rocket },
    { id: "enterprise", title: "Enterprise plan", subtitle: "$40/month", price: "$40", icon: Factory, isDisabled: true },
];

const people = [
    { id: "kari-nordmann", title: "Kari Nordmann", subtitle: "@kari", avatar: "/images/avatars/kari-nordmann.svg" },
    { id: "ola-hansen", title: "Ola Hansen", subtitle: "@ola", avatar: "/images/avatars/ola-hansen.svg" },
    { id: "ingrid-berg", title: "Ingrid Berg", subtitle: "@ingrid", avatar: "/images/avatars/ingrid-berg.svg" },
];

const BothSizes = ({ children }: { children: (size: "sm" | "md") => ReactNode }) => (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-10">
        {(["sm", "md"] as const).map((size) => (
            <div key={size} className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-tertiary">{size}</p>
                {children(size)}
            </div>
        ))}
    </div>
);

const PlanGroup = ({ size, type }: { size: "sm" | "md"; type: "radio" | "checkbox" | "icon" }) => (
    <RadioCardGroup size={size} aria-label="Plan" defaultValue="basic">
        {plans.map((plan) => (
            <RadioCard
                key={plan.id}
                value={plan.id}
                type={type}
                icon={plan.icon}
                title={plan.title}
                subtitle={plan.subtitle}
                description="Includes up to 10 users, 20 GB individual data and access to all features."
                isDisabled={plan.isDisabled}
            />
        ))}
    </RadioCardGroup>
);

export const RadioButton = () => <BothSizes>{(size) => <PlanGroup size={size} type="radio" />}</BothSizes>;
RadioButton.storyName = "Radio button";

export const Checkbox = () => <BothSizes>{(size) => <PlanGroup size={size} type="checkbox" />}</BothSizes>;

export const IconSimple = () => <BothSizes>{(size) => <PlanGroup size={size} type="icon" />}</BothSizes>;
IconSimple.storyName = "Icon simple";

export const AvatarStory = () => (
    <BothSizes>
        {(size) => (
            <RadioCardGroup size={size} aria-label="Team member" defaultValue="kari-nordmann">
                {people.map((person) => (
                    <RadioCard
                        key={person.id}
                        value={person.id}
                        type="avatar"
                        avatarSrc={person.avatar}
                        title={person.title}
                        subtitle={person.subtitle}
                        description="Product Manager, Integrations"
                    />
                ))}
            </RadioCardGroup>
        )}
    </BothSizes>
);
AvatarStory.storyName = "Avatar";

export const PaymentIcon = () => (
    <BothSizes>
        {(size) => (
            <RadioCardGroup size={size} aria-label="Payment method" defaultValue="visa">
                {[
                    { id: "visa", icon: VisaIcon, title: "Visa ending in 1234" },
                    { id: "mastercard", icon: MastercardIcon, title: "Mastercard ending in 1234" },
                ].map((card) => (
                    <RadioCard
                        key={card.id}
                        value={card.id}
                        type="payment"
                        paymentIcon={card.icon}
                        title={card.title}
                        description="Expiry 06/2025"
                        actions={
                            <>
                                <Button size={size} color="link-gray">
                                    Set as default
                                </Button>
                                <Button size={size} color="link-color">
                                    Edit
                                </Button>
                            </>
                        }
                    />
                ))}
            </RadioCardGroup>
        )}
    </BothSizes>
);
PaymentIcon.storyName = "Payment icon";

export const IconCard = () => (
    <BothSizes>
        {(size) => (
            <RadioCardGroup size={size} aria-label="Plan" defaultValue="basic">
                {plans.map((plan) => (
                    <RadioCard
                        key={plan.id}
                        value={plan.id}
                        type="card"
                        icon={plan.icon}
                        title={plan.title}
                        price={plan.price}
                        period="per month"
                        description="Includes up to 10 users, 20 GB individual data and access to all features."
                        badge={
                            <BadgeWithDot size={size} type="modern" color="success">
                                Limited time only
                            </BadgeWithDot>
                        }
                        isDisabled={plan.isDisabled}
                    />
                ))}
            </RadioCardGroup>
        )}
    </BothSizes>
);
IconCard.storyName = "Icon card";
