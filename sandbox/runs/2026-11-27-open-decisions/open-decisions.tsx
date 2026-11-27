/**
 * The three decisions left open by the 27 Nov 2026 audit, each shown as its options side by side.
 *
 * Option "A" is always the library as it is today. The other options are simulated here through
 * `className`, which a real page must never do; they exist only so the choice can be seen.
 */
import type { ReactNode } from "react";
import { CardHeader } from "fa-design-system/components/application/card-header/card-header";
import { Table, TableCard } from "fa-design-system/components/application/table/table";
import { Tabs } from "fa-design-system/components/application/tabs/tabs";
import { Checkbox } from "fa-design-system/components/base/checkbox/checkbox";
import { Num } from "fa-design-system/components/base/num/num";
import { Tag, TagGroup, TagList } from "fa-design-system/components/base/tags/tags";
import { cx } from "fa-design-system/utils/cx";

const stocks = [
    { ticker: "EQNR", name: "Equinor", last: 287.4, change: 2.4 },
    { ticker: "DNB", name: "DNB Bank", last: 231.1, change: -0.65 },
    { ticker: "NHY", name: "Norsk Hydro", last: 68.92, change: 1.12 },
];

const tabs = [
    { id: "oversikt", label: "Oversikt" },
    { id: "nokkeltall", label: "Nøkkeltall" },
    { id: "innsidehandel", label: "Innsidehandel", isDisabled: true },
];

const Option = ({ label, note, children }: { label: string; note: string; children: ReactNode }) => (
    <div className="flex min-w-0 flex-col gap-3">
        <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-primary">{label}</p>
            <p className="text-sm text-tertiary">{note}</p>
        </div>
        {children}
    </div>
);

const Decision = ({ title, question, children }: { title: string; question: string; children: ReactNode }) => (
    <section className="flex flex-col gap-5 border-t border-secondary py-8">
        <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-primary">{title}</h2>
            <p className="max-w-180 text-sm text-tertiary">{question}</p>
        </div>
        {children}
    </section>
);

const StockTable = () => (
    <Table aria-label="Mest omsatt på Oslo Børs">
        <Table.Header>
            <Table.Head id="name" label="Aksje" isRowHeader className="w-full" />
            <Table.Head id="last" label="Siste" />
            <Table.Head id="change" label="Endring" />
        </Table.Header>
        <Table.Body items={stocks}>
            {(s) => (
                <Table.Row id={s.ticker}>
                    <Table.Cell leadText={s.name} supportingText={s.ticker} />
                    <Table.Cell>
                        <Num value={s.last} />
                    </Table.Cell>
                    <Table.Cell>
                        <span className={s.change > 0 ? "text-success-primary" : "text-error-primary"}>
                            <Num value={s.change} sign suffix="%" />
                        </span>
                    </Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
    </Table>
);

/** The content card every page builds, from page-patterns.md "Card with a header". */
const ContentCard = () => (
    <section aria-labelledby="card-news" className="overflow-hidden rounded-2xl border border-secondary bg-primary_alt">
        <CardHeader titleId="card-news" title="Siste nytt" badge="Sanntid" />
        <ul className="flex flex-col gap-3 px-4 py-5 text-sm text-secondary md:px-6">
            <li>Equinor øker utbyttet etter sterkt kvartal</li>
            <li>DNB venter rentekutt i første halvår</li>
            <li>Hydro stenger produksjonslinje på Karmøy</li>
        </ul>
    </section>
);

const DisabledSet = ({ tab, tag, box }: { tab?: string; tag?: string; box?: string }) => (
    <div className="flex flex-col gap-5 rounded-xl border border-secondary bg-primary_alt p-5">
        <Tabs defaultSelectedKey="oversikt">
            <Tabs.List type="button-gray" aria-label="Aksjeinformasjon" items={tabs}>
                {(item) => <Tabs.Item {...item} className={item.isDisabled ? tab : undefined} />}
            </Tabs.List>
        </Tabs>
        <TagGroup label="Sektorer" size="md">
            <TagList className="flex flex-wrap gap-2">
                <Tag id="energi">Energi</Tag>
                <Tag id="finans">Finans</Tag>
                <Tag id="shipping" isDisabled className={tag}>
                    Shipping
                </Tag>
            </TagList>
        </TagGroup>
        <div className="flex flex-col gap-3">
            <Checkbox isDisabled label="Varsle meg på e-post" className={box} />
            <Checkbox isDisabled defaultSelected label="Varsle meg i appen" className={box} />
        </div>
    </div>
);

export const OpenDecisions = () => (
    <div className="min-h-dvh bg-secondary_alt">
        <main className="mx-auto flex w-full max-w-[1100px] flex-col p-4 md:p-6">
            <div className="flex flex-col gap-1 pb-8">
                <h1 className="text-xl font-semibold text-primary">Three open decisions</h1>
                <p className="max-w-180 text-sm text-tertiary">Option A is the library today. The other options are simulated on this page only.</p>
            </div>

            <Decision
                title="1. Table card surface"
                question="A content card has a border, a 16 px radius and no shadow. A table card has a ring, a 12 px radius and a small shadow, in Figma and in code. Should table cards stay different, or follow the card rule?"
            >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Option label="For comparison: content card" note="Border, 16 px radius, no shadow.">
                        <ContentCard />
                    </Option>
                    <Option label="A. Table card today" note="Ring, 12 px radius, shadow-xs. Matches Figma.">
                        <TableCard.Root>
                            <TableCard.Header title="Mest omsatt" badge="Sanntid" />
                            <StockTable />
                        </TableCard.Root>
                    </Option>
                    <Option label="B. Table card follows the card rule" note="Border, 16 px radius, no shadow. Needs a Figma change too.">
                        <TableCard.Root className="rounded-2xl border border-secondary bg-primary_alt shadow-none ring-0">
                            <TableCard.Header title="Mest omsatt" badge="Sanntid" className="bg-primary_alt" />
                            <StockTable />
                        </TableCard.Root>
                    </Option>
                </div>
            </Decision>

            <Decision
                title="2. Card header and table card header"
                question="Two components draw a card's title row. The ledger (30 Oct) says they stay separate; an older note said to merge them. Which holds?"
            >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Option label="CardHeader" note="Title 18 px, brand badge, sm actions centred on the text. Used on content cards.">
                        <div className="overflow-hidden rounded-2xl border border-secondary bg-primary_alt">
                            <CardHeader title="Mest omsatt" badge="Sanntid" description="Oslo Børs, sortert etter omsetning" />
                        </div>
                    </Option>
                    <Option label="TableCard.Header" note="Title 16 px, gray badge, trailing content top-aligned. Used on table cards.">
                        <div className="overflow-hidden rounded-2xl border border-secondary bg-primary_alt">
                            <TableCard.Header title="Mest omsatt" badge="Sanntid" description="Oslo Børs, sortert etter omsetning" className="bg-primary_alt" />
                        </div>
                    </Option>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Option label="A. Keep both (today)" note="A table card next to a content card: two title sizes and two badge colours on one page.">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <ContentCard />
                            <TableCard.Root>
                                <TableCard.Header title="Mest omsatt" badge="Sanntid" />
                                <StockTable />
                            </TableCard.Root>
                        </div>
                    </Option>
                    <Option label="B. One header" note="The table card uses CardHeader: the same title and badge everywhere.">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <ContentCard />
                            <TableCard.Root>
                                <CardHeader title="Mest omsatt" badge="Sanntid" />
                                <StockTable />
                            </TableCard.Root>
                        </div>
                    </Option>
                </div>
            </Decision>

            <Decision
                title="3. What “disabled” looks like"
                question="The last item in each row is disabled. Most of the library, and the tab and tag states added today, dim the whole control to 50%. Figma's own disabled checkbox, and Button in code, use the grey disabled tokens instead. Pick one for everything, or keep both?"
            >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Option label="A. 50% opacity (today)" note="One rule for any component; a disabled checked box stays faintly blue.">
                        <DisabledSet />
                    </Option>
                    <Option
                        label="B. Disabled tokens"
                        note="Grey text and fills, as Figma's checkbox and the code Button do; each component needs its own design."
                    >
                        <DisabledSet
                            tab={cx("text-disabled opacity-100")}
                            tag={cx("bg-disabled_subtle text-disabled opacity-100")}
                            box="[&>div:first-of-type]:bg-disabled_subtle [&>div:first-of-type]:opacity-100 [&>div:first-of-type]:ring-disabled [&_p]:text-disabled [&_svg]:text-fg-disabled_subtle"
                        />
                    </Option>
                </div>
            </Decision>
        </main>
    </div>
);
