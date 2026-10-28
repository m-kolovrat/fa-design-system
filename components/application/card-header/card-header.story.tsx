import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChevronRight, Download, Filter } from "fa-icons";
import { CardHeader } from "@/components/application/card-header/card-header";
import { CardWithActions, CardWithLink, CardWithTabs, card, cardBody } from "@/components/application/card-header/card-header.demo";
import { Button } from "@/components/base/buttons/button";
import cardHeaderDoc from "@/skills/fa-design-system/references/components/card-header.md?raw";

export default {
    title: "Application/Card header",
    component: CardHeader,
    tags: ["autodocs"],
    // The Docs page text is card-header.md; the props table comes from card-header.tsx.
    parameters: { skillDoc: cardHeaderDoc, design: { desktop: "17355-125" } },
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full flex-col items-start gap-6 bg-secondary_alt p-4 md:p-8 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof CardHeader>;

interface PlaygroundArgs {
    title: string;
    badge: string;
    description: string;
    divider: boolean;
    actions: number;
}

/** The header in a card. "actions" sets how many md icon-only buttons show (0–3). */
export const Playground: StoryObj<PlaygroundArgs> = {
    args: { title: "Siste nytt", badge: "", description: "Børsmeldinger og nyheter om selskapene i watchlisten din.", divider: true, actions: 2 },
    argTypes: { actions: { control: { type: "range", min: 0, max: 3, step: 1 } } },
    render: ({ title, badge, description, divider, actions }) => {
        const buttons = [
            <Button key="filter" color="secondary" size="md" iconLeading={Filter} aria-label="Filtrer" />,
            <Button key="download" color="secondary" size="md" iconLeading={Download} aria-label="Last ned" />,
            <Button key="all" color="secondary" size="md" iconLeading={ChevronRight} href="#" aria-label="Se alle" />,
        ].slice(0, actions);

        return (
            <section className={`${card} w-full max-w-2xl`}>
                <CardHeader
                    title={title}
                    badge={badge || undefined}
                    description={description || undefined}
                    divider={divider}
                    actions={buttons.length ? buttons : undefined}
                />
                <div className={`${cardBody} text-sm text-tertiary`}>Innhold i kortet.</div>
            </section>
        );
    },
};

export const OneAction = () => <CardWithLink />;
OneAction.storyName = "One action (link)";

export const TwoActions = () => <CardWithActions />;
TwoActions.storyName = "Two actions";

export const ThreeActionsAndTabs = () => <CardWithTabs />;
ThreeActionsAndTabs.storyName = "Three actions, tabs inside";
