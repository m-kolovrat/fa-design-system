import type { FC, SVGProps } from "react";
import type { Meta } from "@storybook/nextjs-vite";
import {
    FaBokLogo,
    FaLargeLogo,
    FaSmallLogo,
    HegnarAnonseLogo,
    HegnarBokLogo,
    HegnarLogo,
    HegnarVideoproduksjonLogo,
    InteriorMagasinetLogo,
    KapitalLargeLogo,
    KapitalList40Logo,
    KapitalList100Logo,
    KapitalList400Logo,
    KapitalListArvingerLogo,
    KapitalSmallLogo,
    MotorLogo,
    PinpointLogo,
    VippsLargeLogo,
    VippsSmallLogo,
} from "fa-icons";
import { skillDoc } from "@/components/internal/skill-doc";
import flagsLogosDoc from "@/skills/fa-design-system/references/components/flags-logos.md?raw";

const logos: { name: string; logo: FC<SVGProps<SVGSVGElement>>; fixed: boolean }[] = [
    { name: "fa-bok", logo: FaBokLogo, fixed: false },
    { name: "fa-large", logo: FaLargeLogo, fixed: false },
    { name: "fa-small", logo: FaSmallLogo, fixed: false },
    { name: "hegnar", logo: HegnarLogo, fixed: false },
    { name: "hegnar-anonse", logo: HegnarAnonseLogo, fixed: false },
    { name: "hegnar-bok", logo: HegnarBokLogo, fixed: false },
    { name: "hegnar-videoproduksjon", logo: HegnarVideoproduksjonLogo, fixed: false },
    { name: "interior-magasinet", logo: InteriorMagasinetLogo, fixed: false },
    { name: "kapital-list-100", logo: KapitalList100Logo, fixed: true },
    { name: "kapital-list-40", logo: KapitalList40Logo, fixed: true },
    { name: "kapital-list-400", logo: KapitalList400Logo, fixed: true },
    { name: "kapital-list-arvinger", logo: KapitalListArvingerLogo, fixed: true },
    { name: "kapital-large", logo: KapitalLargeLogo, fixed: false },
    { name: "kapital-small", logo: KapitalSmallLogo, fixed: false },
    { name: "motor", logo: MotorLogo, fixed: false },
    { name: "pinpoint", logo: PinpointLogo, fixed: true },
    { name: "vipps-large", logo: VippsLargeLogo, fixed: true },
    { name: "vipps-small", logo: VippsSmallLogo, fixed: true },
];

const meta = {
    title: "Foundations/Logos",
    tags: ["autodocs"],
    parameters: {
        // The whole skill page is shown on Foundations / Flags; here only its Logos section
        // (purpose, import, logo rules, example), as the page intro.
        docs: { description: { component: skillDoc(flagsLogosDoc, { sections: ["Logos"], headings: false }) } },
    },
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full overflow-auto bg-primary p-8 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
} satisfies Meta;

export default meta;

const Grid = ({ items }: { items: typeof logos }) => (
    <div className="flex flex-wrap content-start gap-6">
        {items.map(({ name, logo: Logo }) => (
            <div key={name} className="flex w-48 flex-col items-center gap-3 rounded-lg p-4 ring-1 ring-secondary ring-inset">
                <div className="flex h-12 max-w-full items-center">
                    <Logo className="h-8 w-auto max-w-full text-fg-primary" />
                </div>
                <span className="text-center text-xs text-tertiary">{name}</span>
            </div>
        ))}
    </div>
);

/** Single-color logos follow the text color (`currentColor`), so set it with a \`text-*\` class where they are used. */
export const CurrentColor = () => <Grid items={logos.filter((l) => !l.fixed)} />;

CurrentColor.parameters = {
    design: { desktop: "17204-1131" },
};

/** Logos with fixed brand colors: pinpoint, vipps and the four Kapital list versions (`kapital-list-*`). */
export const FixedColors = () => <Grid items={logos.filter((l) => l.fixed)} />;

FixedColors.parameters = {
    design: { desktop: "17204-1131" },
};
