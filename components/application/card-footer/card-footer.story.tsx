import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardFooter } from "@/components/application/card-footer/card-footer";
import { CardHeader } from "@/components/application/card-header/card-header";
import { card, cardBodyAboveFooter } from "@/components/application/card-header/card-header.demo";
import cardFooterDoc from "@/skills/fa-design-system/references/components/card-footer.md?raw";

export default {
    title: "Application/Card footer",
    component: CardFooter,
    tags: ["autodocs"],
    // The Docs page text is card-footer.md; the props table comes from card-footer.tsx.
    parameters: { skillDoc: cardFooterDoc, design: { desktop: "17399-333", mobile: "17399-338" } },
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full flex-col items-start gap-6 bg-secondary_alt p-4 md:p-8 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof CardFooter>;

/** The footer at the bottom of a card. */
export const Playground: StoryObj<typeof CardFooter> = {
    args: { children: "Se alle", href: "#" },
    render: (args) => (
        <section className={`${card} w-full max-w-md`}>
            <CardHeader title="Vinnere" divider={false} />
            <div className={`${cardBodyAboveFooter} text-sm text-tertiary`}>Innhold i kortet.</div>
            <CardFooter {...args} />
        </section>
    ),
};
