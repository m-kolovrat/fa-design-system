/**
 * The clashes recorded in the sandbox page notes, drawn side by side: what the brief asked for and
 * what the skill's rule made the agent build instead, with the page and card where it happened.
 *
 * The "brief" side is drawn here with raw markup and `className` overrides, which a real page must
 * never do; it exists only to show what was asked for.
 */
import type { ReactNode } from "react";
import { Ai, Calendar, Download, Flame, GraphUp, Search } from "fa-icons";
import { CardHeader } from "fa-design-system/components/application/card-header/card-header";
import { PeriodSelector } from "fa-design-system/components/application/period-selector/period-selector";
import { Table } from "fa-design-system/components/application/table/table";
import { Badge } from "fa-design-system/components/base/badges/badges";
import { Button } from "fa-design-system/components/base/buttons/button";
import { ButtonUtility } from "fa-design-system/components/base/buttons/button-utility";
import { Input } from "fa-design-system/components/base/input/input";
import { Num } from "fa-design-system/components/base/num/num";
import { Select } from "fa-design-system/components/base/select/select";

const stocks = [
    { ticker: "EQNR", name: "Equinor", last: 287.4, change: 2.4, volume: 1612, cap: 812 },
    { ticker: "DNB", name: "DNB Bank", last: 231.1, change: -0.65, volume: 987, cap: 356 },
    { ticker: "NHY", name: "Norsk Hydro", last: 68.92, change: 1.12, volume: 744, cap: 139 },
];

const Change = ({ value }: { value: number }) => (
    <span className={value > 0 ? "text-success-primary" : "text-error-primary"}>
        <Num value={value} sign suffix="%" />
    </span>
);

const card = "overflow-hidden rounded-2xl border border-secondary bg-primary_alt";

const Side = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="flex min-w-0 flex-col gap-2">
        <p className="text-xs font-semibold text-quaternary">{label}</p>
        {children}
    </div>
);

const Clash = ({
    title,
    where,
    rule,
    outcome,
    brief,
    built,
    briefLabel = "What the brief asked for",
    builtLabel = "What the rule made the agent build",
}: {
    title: string;
    where: string;
    rule: string;
    outcome: string;
    brief: ReactNode;
    built: ReactNode;
    briefLabel?: string;
    builtLabel?: string;
}) => (
    <section className="flex flex-col gap-4 border-t border-secondary py-8">
        <div className="flex flex-col gap-1.5">
            <h2 className="text-lg font-semibold text-primary">{title}</h2>
            <dl className="grid max-w-200 grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-quaternary">Where</dt>
                <dd className="text-secondary">{where}</dd>
                <dt className="text-quaternary">Rule</dt>
                <dd className="text-secondary">{rule}</dd>
                <dt className="text-quaternary">Outcome</dt>
                <dd className="text-secondary">{outcome}</dd>
            </dl>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Side label={briefLabel}>{brief}</Side>
            <Side label={builtLabel}>{built}</Side>
        </div>
    </section>
);

const Phone = ({ children }: { children: ReactNode }) => <div className={`${card} w-full max-w-[343px]`}>{children}</div>;

export const Clashes = () => (
    <div className="min-h-dvh bg-secondary_alt">
        <main className="mx-auto flex w-full max-w-[1100px] flex-col p-4 md:p-6">
            <div className="flex flex-col gap-1 pb-4">
                <h1 className="text-xl font-semibold text-primary">Where briefs and rules clashed</h1>
                <p className="max-w-180 text-sm text-tertiary">
                    A clash is a place where the brief for a sandbox page asked for one thing and a rule in the skill said another. The agent had to pick
                    one and write it down. These are the ones that came up on more than one page.
                </p>
            </div>

            <Clash
                title="1. Tables on a phone"
                where="Market overview (every table card), Notable investors (the trades table), Portfolio (holdings)."
                rule="table-no-sideways-scroll and “Data table on mobile”: below md a table becomes a two-column list; the rest opens in a sheet."
                outcome="Split. Market overview followed the brief and scrolls sideways; Notable investors followed the rule. Two pages now behave differently."
                brief={
                    <Phone>
                        <CardHeader title="Mest omsatt" />
                        <div className="overflow-x-auto">
                            <div className="min-w-[560px]">
                                <Table aria-label="Mest omsatt, slik briefen ba om" size="sm">
                                    <Table.Header>
                                        <Table.Head id="name" label="Aksje" isRowHeader />
                                        <Table.Head id="last" label="Siste" />
                                        <Table.Head id="change" label="Endring" />
                                        <Table.Head id="volume" label="Omsatt (M)" />
                                        <Table.Head id="cap" label="Verdi (mrd)" />
                                    </Table.Header>
                                    <Table.Body items={stocks}>
                                        {(s) => (
                                            <Table.Row id={s.ticker}>
                                                <Table.Cell leadText={s.name} supportingText={s.ticker} />
                                                <Table.Cell>
                                                    <Num value={s.last} />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Change value={s.change} />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Num value={s.volume} decimals={0} />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Num value={s.cap} decimals={0} />
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                        <p className="border-t border-secondary px-4 py-2 text-xs text-tertiary">Swipe sideways to see the other columns.</p>
                    </Phone>
                }
                built={
                    <Phone>
                        <CardHeader title="Mest omsatt" />
                        <ul className="divide-y divide-secondary">
                            {stocks.map((s) => (
                                <li key={s.ticker} className="flex items-center justify-between gap-3 px-4 py-3">
                                    <div className="flex min-w-0 flex-col">
                                        <span className="truncate text-sm text-primary">{s.name}</span>
                                        <span className="text-sm text-tertiary">{s.ticker}</span>
                                    </div>
                                    <div className="flex flex-col items-end text-sm">
                                        <Num value={s.last} />
                                        <Change value={s.change} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="border-t border-secondary px-4 py-2 text-xs text-tertiary">Tap a row for turnover and market value in a sheet.</p>
                    </Phone>
                }
            />

            <Clash
                title="2. Ticker as its own column"
                where="Market overview (Mest omsatt, Hete aksjer, Mest shortet, Nye topp- og bunnoteringer, Kommende utbytter, Finanskalender), Notable investors (the stock column)."
                rule="table-instrument-cell: a table shows the company name with the ticker under it, never a separate ticker pill column."
                outcome="Rule followed on both pages. The brief's layout was dropped."
                brief={
                    <div className={card}>
                        <Table aria-label="Hete aksjer, slik briefen ba om" size="sm">
                            <Table.Header>
                                <Table.Head id="ticker" label="Ticker" />
                                <Table.Head id="name" label="Selskap" isRowHeader className="w-full" />
                                <Table.Head id="change" label="Endring" />
                            </Table.Header>
                            <Table.Body items={stocks}>
                                {(s) => (
                                    <Table.Row id={s.ticker}>
                                        <Table.Cell>
                                            <Badge type="pill-color" color="brand" size="sm">
                                                {s.ticker}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell>{s.name}</Table.Cell>
                                        <Table.Cell>
                                            <Change value={s.change} />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                }
                built={
                    <div className={card}>
                        <Table aria-label="Hete aksjer, slik regelen sier" size="sm">
                            <Table.Header>
                                <Table.Head id="name" label="Aksje" isRowHeader className="w-full" />
                                <Table.Head id="change" label="Endring" />
                            </Table.Header>
                            <Table.Body items={stocks}>
                                {(s) => (
                                    <Table.Row id={s.ticker}>
                                        <Table.Cell leadText={s.name} supportingText={s.ticker} />
                                        <Table.Cell>
                                            <Change value={s.change} />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                }
            />

            <Clash
                title="3. An icon before the card title"
                where="Market overview (green and red chart icons on Vinnere and Tapere, a flame on Hete aksjer, a calendar on Finanskalender), Stock page (Finanskalender)."
                rule="card-header-always and “Card with a header”: no icon slot, and never a tinted icon tile before the title."
                outcome="Rule followed. The icons were left out on both pages."
                brief={
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {[
                            { title: "Vinnere", icon: GraphUp, tone: "bg-success-secondary text-fg-success-primary" },
                            { title: "Hete aksjer", icon: Flame, tone: "bg-warning-secondary text-fg-warning-primary" },
                            { title: "Finanskalender", icon: Calendar, tone: "bg-brand-secondary text-fg-brand-primary" },
                        ].map(({ title, icon: Icon, tone }) => (
                            <div key={title} className={card}>
                                <div className="flex items-center gap-3 border-b border-secondary px-4 py-5">
                                    <span className={`flex size-8 items-center justify-center rounded-lg ${tone}`}>
                                        <Icon className="size-4" />
                                    </span>
                                    <h3 className="text-md font-semibold text-primary">{title}</h3>
                                </div>
                                <div className="h-10" />
                            </div>
                        ))}
                    </div>
                }
                built={
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {["Vinnere", "Hete aksjer", "Finanskalender"].map((title) => (
                            <div key={title} className={card}>
                                <CardHeader title={title} headingLevel={3} />
                                <div className="h-10" />
                            </div>
                        ))}
                    </div>
                }
            />

            <Clash
                title="4. The header search"
                where="Market overview and Notable investors (the site header on both)."
                rule="SiteHeader has its own search field and no option for another one (fa-no-invented-variants)."
                outcome="Rule followed. The AI search from the brief does not exist anywhere in the system yet."
                brief={
                    <div className={`${card} flex items-center p-4`}>
                        <div className="flex h-10 w-full items-center gap-2 rounded-full bg-secondary px-4 ring-1 ring-secondary ring-inset">
                            <Ai className="size-4 text-fg-brand-primary" />
                            <span className="text-sm text-placeholder">Søk ticker eller spør AI</span>
                        </div>
                    </div>
                }
                built={
                    <div className={`${card} p-4`}>
                        <Input aria-label="Søk" icon={Search} placeholder="Søk" />
                    </div>
                }
            />

            <Clash
                title="5. The same action, two different buttons"
                where="Market overview: the download action in the report lists (Kvartals- og årsrapporter) and in the Finanskalender table."
                rule="Two rules disagree. “Company row” says a trailing icon-only Button; table-actions-label says ButtonUtility with a tooltip inside a Table."
                outcome="Both followed, so the same download action looks different in two cards on one page. This is the skill clashing with itself, not with a brief."
                briefLabel="In a list (“Company row”)"
                builtLabel="In a table (table-actions-label)"
                brief={
                    <div className={card}>
                        <CardHeader title="Kvartals- og årsrapporter" />
                        <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
                            <div className="flex flex-col">
                                <span className="text-sm text-primary">Equinor Q3 2026</span>
                                <span className="text-sm text-tertiary">28. oktober</span>
                            </div>
                            <Button color="secondary" size="sm" iconLeading={Download} aria-label="Last ned rapporten" />
                        </div>
                    </div>
                }
                built={
                    <div className={card}>
                        <CardHeader title="Finanskalender" />
                        <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
                            <div className="flex flex-col">
                                <span className="text-sm text-primary">DNB Bank Q3 2026</span>
                                <span className="text-sm text-tertiary">22. oktober</span>
                            </div>
                            <ButtonUtility icon={Download} tooltip="Last ned rapporten" />
                        </div>
                    </div>
                }
            />

            <Clash
                title="6. Period chips as a table filter"
                where="Notable investors: the filter bar above the trades table."
                rule="period-selector-under-chart: PeriodSelector goes under a chart, nowhere else. “Filter chips” says a Dropdown with a count badge."
                outcome="Rule bent. PeriodSelector was used in the filter bar anyway; the brief's 1W became 5D and ALL is missing, because the component only has chart periods."
                brief={
                    <div className={`${card} flex flex-wrap items-center gap-3 p-4`}>
                        <div className="w-40">
                            <Select aria-label="Investor" placeholder="Alle investorer" items={[{ id: "alle", label: "Alle investorer" }]}>
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                        <div className="flex items-center gap-1">
                            {["1W", "1M", "3M", "1Y", "ALL"].map((p, i) => (
                                <span
                                    key={p}
                                    className={`rounded-md px-2.5 py-1.5 text-sm font-semibold ${i === 1 ? "bg-active text-secondary" : "text-quaternary"}`}
                                >
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                }
                built={
                    <div className={`${card} flex flex-wrap items-center gap-3 p-4`}>
                        <div className="w-40">
                            <Select aria-label="Investor" placeholder="Alle investorer" items={[{ id: "alle", label: "Alle investorer" }]}>
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                        <PeriodSelector periods={[{ id: "5D" }, { id: "1M" }, { id: "3M" }, { id: "1Y" }]} defaultSelectedPeriod="1M" />
                    </div>
                }
            />
        </main>
    </div>
);
