"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { CardHeader } from "fa-design-system/components/application/card-header/card-header";
import { ChartLegendContent, ChartTooltipContent } from "fa-design-system/components/application/charts/charts-base";
import { EmptyState } from "fa-design-system/components/application/empty-state/empty-state";
import { Modal, ModalBody, ModalHeader } from "fa-design-system/components/application/modals/modal";
import { PaginationCardAdvanced } from "fa-design-system/components/application/pagination/pagination";
import { type Period, PeriodSelector } from "fa-design-system/components/application/period-selector/period-selector";
import { SiteFooter } from "fa-design-system/components/application/site-footer/site-footer";
import type { SiteNavItem } from "fa-design-system/components/application/site-header/site-brands";
import { SiteHeader } from "fa-design-system/components/application/site-header/site-header";
import type { SiteMenuContent } from "fa-design-system/components/application/site-header/site-menu-panel";
import type { TickerItem } from "fa-design-system/components/application/site-header/ticker-bar";
import { Table } from "fa-design-system/components/application/table/table";
import { Tabs } from "fa-design-system/components/application/tabs/tabs";
import { Avatar } from "fa-design-system/components/base/avatar/avatar";
import { Badge } from "fa-design-system/components/base/badges/badges";
import { Button } from "fa-design-system/components/base/buttons/button";
import { ButtonUtility } from "fa-design-system/components/base/buttons/button-utility";
import { Dropdown } from "fa-design-system/components/base/dropdown/dropdown";
import { NativeSelect } from "fa-design-system/components/base/select/select-native";
import { Tooltip, TooltipTrigger } from "fa-design-system/components/base/tooltip/tooltip";
import { useBreakpoint } from "fa-design-system/hooks/use-breakpoint";
import { cx } from "fa-design-system/utils/cx";
import { ChevronDown, ChevronRight, Download, Help, Pen, Plus, Settings, Sort, Wallet } from "fa-icons";
import type { Key as AriaKey, SortDescriptor as AriaSortDescriptor } from "react-aria-components";
import { Button as AriaButton } from "react-aria-components";
import { CartesianGrid, Legend, Line, LineChart, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
    type Holding,
    type Instrument,
    type Watchlist,
    calendarEvents,
    cashMovements,
    instruments,
    news,
    receivedDividends,
    transactions,
    upcomingDividends,
    watchlists,
} from "./portfolio-watchlist-data";

// ---------------------------------------------------------------------------------------------------------------------
// Formatting (nb-NO: comma decimals, space thousands, real minus sign)

const nf = (v: number, decimals = 2, options: Intl.NumberFormatOptions = {}) =>
    new Intl.NumberFormat("nb-NO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, ...options }).format(v);

const pct = (v: number, decimals = 2) => nf(v / 100, decimals, { style: "percent", signDisplay: "exceptZero" });
const kr = (v: number, decimals = 0, signed = false) => `${nf(v, decimals, signed ? { signDisplay: "exceptZero" } : {})} kr`;
const priceDecimals = (v: number) => (v < 10 ? 4 : 2);

const dateShort = (iso: string) => new Date(iso).toLocaleDateString("nb-NO", { day: "numeric", month: "short" });
const dateLong = (iso: string) => new Date(iso).toLocaleDateString("nb-NO", { day: "numeric", month: "short", year: "numeric" });

/** "Change value" stand-in from page-patterns.md: a signed, colored span. */
const Change = ({ percent, value, decimals = 2 }: { percent: number; value?: number; decimals?: number }) => (
    <span className={cx("tabular-nums", percent > 0 && "text-success-primary", percent < 0 && "text-error-primary", percent === 0 && "text-tertiary")}>
        {value === undefined ? pct(percent) : `${nf(value, decimals, { signDisplay: "exceptZero" })} (${pct(percent)})`}
    </span>
);

/** A return that may be missing ("–"). */
const MaybeChange = ({ percent }: { percent: number | null }) => (percent === null ? <span className="text-tertiary">–</span> : <Change percent={percent} />);

// ---------------------------------------------------------------------------------------------------------------------
// Shell data (header, footer)

const navigation: SiteNavItem[][] = [
    [
        { label: "Siste nytt", href: "/siste" },
        { label: "MittFa", href: "/mittfa" },
    ],
    [
        { label: "Forum", href: "/forum" },
        {
            label: "Børs",
            href: "/bors",
            items: [
                { label: "Børsoversikt", href: "/bors" },
                { label: "Råvarer", href: "/raavarer" },
                { label: "Fond", href: "/fond" },
                { label: "Kalender", href: "/kalender" },
            ],
        },
        { label: "Investorchat", href: "/investorchat" },
        { label: "Watchlist", href: "/watchlist", current: true },
        { label: "Varsler", href: "/varsler" },
        { label: "Aksjer", href: "/aksjer" },
        { label: "Valuta", href: "/valuta" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors" },
    { label: "Forum", href: "/forum" },
    { label: "Varsler", href: "/varsler" },
    { label: "Watchlist", href: "/watchlist", current: true },
    { label: "Chat", href: "/investorchat" },
];

const tickerItems: TickerItem[] = [
    { label: "Oslo Børs", value: "1 612,48", change: "0,61%", direction: "up", href: "/ticker/OSEBX" },
    { label: "Brent spot", value: "81,74", change: "1,32%", direction: "up", href: "/ticker/BRENT" },
    { label: "Dollar", value: "10,86", change: "-0,21%", direction: "down", href: "/ticker/USDNOK" },
    { label: "Euro", value: "11,72", change: "0,08%", direction: "up", href: "/ticker/EURNOK" },
    { label: "Gull", value: "43 812,50", change: "0,66%", direction: "up", href: "/ticker/XAUNOK" },
];

const menu: SiteMenuContent = {
    columns: [
        {
            title: "Børs",
            href: "/bors",
            items: [
                { label: "Watchlist", href: "/watchlist" },
                { label: "Varsler", href: "/varsler" },
                { label: "Kalender", href: "/kalender" },
            ],
        },
    ],
    eAvis: { weekday: "Onsdag", date: "28.10.2026", href: "/eavis" },
};

const footerLinks: SiteNavItem[][] = [
    [
        { label: "eAvis", href: "/eavis" },
        { label: "Annonse", href: "/annonse" },
        { label: "Arkiv", href: "/arkiv" },
        { label: "Bedriftsabonnement", href: "/bedrift" },
    ],
    [
        { label: "Personvernerklæring", href: "/personvern" },
        { label: "Vilkår", href: "/vilkar" },
        { label: "Samtykkeinnstillinger", href: "/samtykke" },
    ],
];

const aiPrompts = ["Oppsummer nyheter", "Analyser nøkkeltall", "Kjør helsesjekk", "Vis største svakheter", "Vis bull case", "Foreslå forbedringer"];

// ---------------------------------------------------------------------------------------------------------------------
// Layout

const card = "overflow-hidden rounded-2xl border border-secondary bg-primary_alt";
const cardBody = "px-4 py-5 md:px-6";
const numHead = "*:justify-end";

/** The shared mobile sheet: a title and label-and-value rows (page-patterns "Data table on mobile"). */
interface SheetContent {
    title: string;
    description: string;
    key?: ReactNode;
    rows: [string, ReactNode][];
    href?: string;
}

/** Instrument cell in a table: `Table.Cell` props for the logo, name over ticker. */
const instrumentCell = (instrument: Instrument) => ({
    leading: <Avatar initials={instrument.initials} alt="" size="sm" />,
    leadText: instrument.name,
    supportingText: instrument.ticker,
});

const InstrumentCell = ({ instrument, meta }: { instrument: Instrument; meta?: ReactNode }) => (
    <div className="flex min-w-0 items-center gap-3">
        <Avatar initials={instrument.initials} alt="" size="sm" />
        <div className="min-w-0">
            <p className="truncate text-sm text-primary">{instrument.name}</p>
            <p className="truncate text-sm text-tertiary">{meta ?? instrument.ticker}</p>
        </div>
    </div>
);

const MobileListLabels = ({ left, right }: { left: string; right: string }) => (
    <div className="flex justify-between border-b border-secondary px-4 pb-2 text-xs font-medium text-quaternary md:hidden">
        <span>{left}</span>
        <span>{right}</span>
    </div>
);

const MobileRow = ({ onPress, left, right }: { onPress: () => void; left: ReactNode; right: ReactNode }) => (
    <li>
        <AriaButton
            onPress={onPress}
            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left outline-focus-ring focus-visible:outline-2 focus-visible:-outline-offset-2"
        >
            {left}
            <span className="flex shrink-0 flex-col items-end text-sm">{right}</span>
        </AriaButton>
    </li>
);

// ---------------------------------------------------------------------------------------------------------------------
// Chart data (placeholder): a seeded walk bridged to the period's change

const pointsFor: Record<string, { count: number; stepDays: number }> = {
    "5D": { count: 5, stepDays: 1 },
    "1M": { count: 22, stepDays: 1.4 },
    "6M": { count: 26, stepDays: 7 },
    YTD: { count: 43, stepDays: 7 },
    "1Y": { count: 52, stepDays: 7 },
    "5Y": { count: 60, stepDays: 30.4 },
};

const seeded = (seed: number) => () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647 - 0.5;
};

const buildSeries = (count: number, target: number, amplitude: number, seed: number) => {
    const rand = seeded(seed);
    const walk = [0];
    for (let i = 1; i < count; i++) walk.push(walk[i - 1] + rand() * amplitude);
    return walk.map((w, i) => {
        const t = count === 1 ? 1 : i / (count - 1);
        return target * t + (w - walk[count - 1] * t);
    });
};

const chartData = (watchlist: Watchlist, period: Period) => {
    const option = watchlist.periods.find((p) => p.id === period) ?? watchlist.periods[0];
    const { count, stepDays } = pointsFor[period] ?? pointsFor["1Y"];
    const amplitude = Math.max(Math.abs(option.change), 4) / 3;
    const portfolio = buildSeries(count, option.change, amplitude, watchlist.id.length * 97 + count);
    const benchmark = buildSeries(count, option.benchmark, amplitude * 0.8, 4211 + count);
    const end = new Date("2026-10-28").getTime();
    return portfolio.map((p, i) => ({
        date: end - (count - 1 - i) * stepDays * 86400000,
        portfolio: Number(p.toFixed(2)),
        benchmark: Number(benchmark[i].toFixed(2)),
    }));
};

const tickFormat = (period: Period) => (value: number) => {
    const d = new Date(value);
    if (period === "5Y") return d.toLocaleDateString("nb-NO", { year: "numeric" });
    if (period === "5D" || period === "1M") return d.toLocaleDateString("nb-NO", { day: "numeric", month: "short" });
    return d.toLocaleDateString("nb-NO", { month: "short" });
};

// ---------------------------------------------------------------------------------------------------------------------
// Cards

const PerformanceCard = ({ watchlist }: { watchlist: Watchlist }) => {
    const [period, setPeriod] = useState<Period>("1Y");
    const isDesktop = useBreakpoint("lg");
    const data = useMemo(() => chartData(watchlist, period), [watchlist, period]);
    const current = watchlist.periods.find((p) => p.id === period);

    return (
        <section aria-labelledby="card-performance" className={cx(card, "lg:col-span-4")}>
            <CardHeader titleId="card-performance" title="Utvikling" />
            <div className={cardBody}>
                {/* Key figures — no component yet (page-patterns) */}
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 xl:grid-cols-5">
                    {watchlist.kpis.map((kpi) => (
                        <div key={kpi.label} className="flex min-w-0 flex-col gap-1">
                            <dt className="text-xs text-tertiary">{kpi.label}</dt>
                            <dd className="flex flex-col gap-0.5">
                                <span className="text-lg font-semibold whitespace-nowrap text-primary tabular-nums sm:text-display-xs">
                                    {kr(kpi.value, 0, kpi.signed)}
                                </span>
                                <span className="text-sm">
                                    {kpi.percent === undefined ? <span className="text-tertiary">NOK</span> : <Change percent={kpi.percent} />}
                                </span>
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-6 h-64">
                    <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                        <LineChart data={data} className="text-tertiary [&_.recharts-text]:text-xs" margin={{ top: 4, left: 0, right: 0, bottom: 0 }}>
                            <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                            <Legend align="left" verticalAlign="top" height={32} content={<ChartLegendContent />} />
                            <XAxis
                                dataKey="date"
                                type="number"
                                scale="time"
                                domain={["dataMin", "dataMax"]}
                                fill="currentColor"
                                axisLine={false}
                                tickLine={false}
                                minTickGap={24}
                                tickFormatter={tickFormat(period)}
                            />
                            <YAxis
                                orientation="right"
                                fill="currentColor"
                                axisLine={false}
                                tickLine={false}
                                width={isDesktop ? 64 : 52}
                                tickFormatter={(v) => pct(Number(v), 0)}
                            />
                            <RechartsTooltip
                                content={<ChartTooltipContent />}
                                formatter={(v) => pct(Number(v))}
                                labelFormatter={(d) => new Date(Number(d)).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })}
                                cursor={{ className: "stroke-utility-brand-600 stroke-2" }}
                            />
                            <Line
                                dataKey="portfolio"
                                name={watchlist.name}
                                type="monotone"
                                isAnimationActive={false}
                                className="text-utility-brand-600"
                                stroke="currentColor"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
                            />
                            <Line
                                dataKey="benchmark"
                                name="Hovedindeksen (OSEBX)"
                                type="monotone"
                                isAnimationActive={false}
                                className="text-utility-orange-dark-500"
                                stroke="currentColor"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ className: "fill-bg-primary stroke-utility-orange-dark-500 stroke-2" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <PeriodSelector
                    className="mt-4"
                    periods={watchlist.periods.map((p) => ({ id: p.id, change: p.change }))}
                    selectedPeriod={period}
                    onPeriodChange={setPeriod}
                />
            </div>
        </section>
    );
};

const HelpLabel = ({ label, title, description }: { label: string; title: string; description: string }) => (
    <span className="flex items-center gap-1">
        {label}
        <Tooltip title={title} description={description}>
            <TooltipTrigger
                aria-label={`Hva er ${title.toLowerCase()}?`}
                className="cursor-pointer text-fg-quaternary transition hover:text-fg-quaternary_hover focus-visible:text-fg-quaternary_hover"
            >
                <Help className="size-4" />
            </TooltipTrigger>
        </Tooltip>
    </span>
);

const MetricsCard = ({ watchlist }: { watchlist: Watchlist }) => {
    const m = watchlist.metrics;
    const share = (v: number) => nf((v / m.value) * 100, 1) + " %";
    const rows: { label: ReactNode; value: ReactNode; indent?: boolean }[] = [
        { label: "Porteføljeverdi", value: kr(m.value) },
        {
            label: "Beholdning",
            value: (
                <>
                    {kr(m.holdingsValue)} <span className="text-tertiary">· {share(m.holdingsValue)}</span>
                </>
            ),
            indent: true,
        },
        {
            label: "Kontanter",
            value: (
                <>
                    {kr(m.cash)} <span className="text-tertiary">· {share(m.cash)}</span>
                </>
            ),
            indent: true,
        },
        {
            label: <HelpLabel label="Alfa mot OSEBX (3 år)" title="Alfa" description="Meravkastning mot Hovedindeksen, justert for risiko, siste tre år." />,
            value: <Change percent={m.alpha} />,
        },
        {
            label: <HelpLabel label="Beta (3 år)" title="Beta" description="Hvor mye porteføljen svinger når Hovedindeksen svinger. 1 betyr like mye." />,
            value: nf(m.beta),
        },
        {
            label: <HelpLabel label="Standardavvik (3 år)" title="Standardavvik" description="Hvor mye avkastningen har variert per år, siste tre år." />,
            value: `${nf(m.stdDev, 1)} %`,
        },
        { label: "Direkteavkastning*", value: `${nf(m.dividendYield, 1)} %` },
        { label: "P/E 12 mnd*", value: nf(m.pe, 1) },
        { label: "Pris/bok*", value: nf(m.pb, 1) },
        { label: "Mottatt utbytte (12 mnd)", value: kr(m.dividendsReceived) },
    ];

    return (
        <section aria-labelledby="card-metrics" className={cx(card, "lg:col-span-2")}>
            <CardHeader titleId="card-metrics" title="Nøkkeltall" />
            <div className={cardBody}>
                {/* Key-figure list stand-in: a definition list */}
                <dl className="flex flex-col">
                    {rows.map((row, i) => (
                        <div key={i} className={cx("flex items-center justify-between gap-4 border-b border-secondary py-2.5 text-sm", row.indent && "pl-4")}>
                            <dt className={row.indent ? "text-tertiary" : "text-secondary"}>{row.label}</dt>
                            <dd className="text-right font-medium whitespace-nowrap text-primary tabular-nums">{row.value}</dd>
                        </div>
                    ))}
                </dl>
                <p className="mt-3 text-xs text-tertiary">*Basert kun på aksjer</p>
            </div>
        </section>
    );
};

// --- Holdings ---------------------------------------------------------------------------------------------------------

type HoldingRow = Holding & { key: string; instrument: Instrument; value: number; gain: number; gainPct: number; weight: number };

interface Column {
    id: string;
    label: string;
    tooltip?: string;
    /** Hidden between md and lg so every column fits without sideways scroll. */
    wideOnly?: boolean;
    render: (row: HoldingRow) => ReactNode;
}

const priceCell = (r: HoldingRow) => <span>{nf(r.instrument.last, priceDecimals(r.instrument.last))}</span>;
const changeAbsCell = (r: HoldingRow) => <Change percent={r.instrument.changePct} />;

const views: Record<string, Column[]> = {
    pris: [
        { id: "last", label: "Siste", render: priceCell },
        {
            id: "chg",
            label: "+/−",
            render: (r) => (
                <span className={cx(r.instrument.change > 0 && "text-success-primary", r.instrument.change < 0 && "text-error-primary")}>
                    {nf(r.instrument.change, priceDecimals(r.instrument.last), { signDisplay: "exceptZero" })}
                </span>
            ),
        },
        { id: "pct", label: "%", render: changeAbsCell },
        { id: "type", label: "Type", render: (r) => ({ stock: "Aksje", commodity: "Råvare", fx: "Valuta" })[r.instrument.assetType] },
    ],
    beholdning: [
        { id: "qty", label: "Antall", render: (r) => nf(r.quantity, 0) },
        { id: "avg", label: "Snittkurs", wideOnly: true, render: (r) => nf(r.avgPrice, priceDecimals(r.avgPrice)) },
        { id: "value", label: "Markedsverdi", render: (r) => kr(r.value) },
        { id: "gain", label: "Urealisert", render: (r) => <Change percent={r.gainPct} value={r.gain} decimals={0} /> },
        { id: "weight", label: "Andel", render: (r) => `${nf(r.weight, 1)} %` },
    ],
    historikk: [
        { id: "last", label: "Siste", render: priceCell },
        {
            id: "chg",
            label: "+/−",
            wideOnly: true,
            render: (r) => (
                <span className={cx(r.instrument.change > 0 && "text-success-primary", r.instrument.change < 0 && "text-error-primary")}>
                    {nf(r.instrument.change, priceDecimals(r.instrument.last), { signDisplay: "exceptZero" })}
                </span>
            ),
        },
        { id: "pct", label: "%", render: changeAbsCell },
        { id: "1M", label: "1M", wideOnly: true, render: (r) => <MaybeChange percent={r.instrument.returns["1M"]} /> },
        { id: "3M", label: "3M", wideOnly: true, render: (r) => <MaybeChange percent={r.instrument.returns["3M"]} /> },
        { id: "YTD", label: "YTD", render: (r) => <MaybeChange percent={r.instrument.returns.YTD} /> },
        { id: "1Y", label: "1Y", render: (r) => <MaybeChange percent={r.instrument.returns["1Y"]} /> },
        { id: "5Y", label: "5Y", render: (r) => <MaybeChange percent={r.instrument.returns["5Y"]} /> },
    ],
    nokkeltall: [
        {
            id: "pe",
            label: "P/E",
            tooltip: "Kurs delt på resultat per aksje siste 12 måneder",
            render: (r) => (r.instrument.pe === null ? "–" : nf(r.instrument.pe, 1)),
        },
        {
            id: "pb",
            label: "P/B",
            tooltip: "Kurs delt på bokført egenkapital per aksje",
            render: (r) => (r.instrument.pb === null ? "–" : nf(r.instrument.pb, 1)),
        },
        {
            id: "yield",
            label: "Direkteavk.",
            tooltip: "Siste 12 måneders utbytte delt på dagens kurs",
            render: (r) => (r.instrument.dividendYield === null ? "–" : `${nf(r.instrument.dividendYield, 1)} %`),
        },
        { id: "value", label: "Markedsverdi", render: (r) => kr(r.value) },
    ],
};

const sortOptions = [
    { id: "name", label: "Navn" },
    { id: "day", label: "Endring i dag" },
    { id: "value", label: "Markedsverdi" },
    { id: "ytd", label: "Avkastning i år" },
];

const HoldingsCard = ({ watchlist, onOpenSheet }: { watchlist: Watchlist; onOpenSheet: (content: SheetContent) => void }) => {
    const [viewId, setViewId] = useState<string>("historikk");
    const [sortBy, setSortBy] = useState<AriaKey>("value");
    const columns = views[viewId];

    const rows: HoldingRow[] = useMemo(() => {
        const base = watchlist.holdings.map((h) => {
            const instrument = instruments[h.ticker];
            const value = h.quantity * instrument.last;
            const cost = h.quantity * h.avgPrice;
            return { ...h, key: h.ticker, instrument, value, gain: value - cost, gainPct: ((value - cost) / cost) * 100, weight: 0 };
        });
        const total = base.reduce((sum, r) => sum + r.value, 0);
        base.forEach((r) => (r.weight = (r.value / total) * 100));
        const sorters: Record<string, (a: HoldingRow, b: HoldingRow) => number> = {
            name: (a, b) => a.instrument.name.localeCompare(b.instrument.name, "nb"),
            day: (a, b) => b.instrument.changePct - a.instrument.changePct,
            value: (a, b) => b.value - a.value,
            ytd: (a, b) => (b.instrument.returns.YTD ?? -Infinity) - (a.instrument.returns.YTD ?? -Infinity),
        };
        return base.sort(sorters[sortBy as string]);
    }, [watchlist, sortBy]);

    const openRow = (r: HoldingRow) =>
        onOpenSheet({
            title: r.instrument.name,
            description: r.instrument.ticker,
            key: (
                <p className="flex items-baseline gap-2">
                    <span className="text-display-xs font-semibold text-primary tabular-nums">{nf(r.instrument.last, priceDecimals(r.instrument.last))}</span>
                    <span className="text-sm">
                        <Change percent={r.instrument.changePct} value={r.instrument.change} decimals={priceDecimals(r.instrument.last)} />
                    </span>
                </p>
            ),
            rows: [
                ["Antall", nf(r.quantity, 0)],
                ["Snittkurs", nf(r.avgPrice, priceDecimals(r.avgPrice))],
                ["Markedsverdi", kr(r.value)],
                ["Urealisert", <Change key="g" percent={r.gainPct} value={r.gain} decimals={0} />],
                ["Andel", `${nf(r.weight, 1)} %`],
                ["1M", <MaybeChange key="1m" percent={r.instrument.returns["1M"]} />],
                ["3M", <MaybeChange key="3m" percent={r.instrument.returns["3M"]} />],
                ["YTD", <MaybeChange key="ytd" percent={r.instrument.returns.YTD} />],
                ["1Y", <MaybeChange key="1y" percent={r.instrument.returns["1Y"]} />],
                ["5Y", <MaybeChange key="5y" percent={r.instrument.returns["5Y"]} />],
            ],
            href: `/aksje/${r.instrument.ticker}`,
        });

    return (
        <section aria-labelledby="card-holdings" className={cx(card, "lg:col-span-6")}>
            <CardHeader
                titleId="card-holdings"
                title="Oversikt"
                actions={
                    <>
                        <Dropdown.Root>
                            <Button color="tertiary" size="sm" iconLeading={Sort} aria-label="Sorter beholdningen" className="max-md:hidden">
                                Sorter
                            </Button>
                            <Dropdown.Popover className="w-56">
                                <Dropdown.Menu
                                    aria-label="Sorter etter"
                                    selectionMode="single"
                                    selectedKeys={[sortBy]}
                                    onSelectionChange={(keys) => keys !== "all" && keys.size > 0 && setSortBy([...keys][0])}
                                    items={sortOptions}
                                >
                                    {(item) => <Dropdown.Item id={item.id} label={item.label} />}
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown.Root>
                        <Button color="tertiary" size="sm" iconLeading={Pen} className="max-md:hidden">
                            Rediger
                        </Button>
                        <Button size="sm" iconLeading={Plus}>
                            Ny transaksjon
                        </Button>
                    </>
                }
            />
            <Tabs selectedKey={viewId} onSelectionChange={(key) => setViewId(String(key))} className="max-md:hidden">
                <div className="px-4 pt-5 pb-4 md:px-6">
                    <Tabs.List type="button-minimal" size="sm" aria-label="Visning">
                        <Tabs.Item id="pris" label="Pris" />
                        <Tabs.Item id="beholdning" label="Beholdning" />
                        <Tabs.Item id="historikk" label="Historikk" />
                        <Tabs.Item id="nokkeltall" label="Nøkkeltall" />
                    </Tabs.List>
                </div>

                <Tabs.Panel id={viewId}>
                    <Table key={viewId} aria-labelledby="card-holdings" size="sm">
                        <Table.Header>
                            <Table.Head id="name" label="Instrument" isRowHeader className="w-full min-w-56" />
                            {columns.map((c) => (
                                <Table.Head key={c.id} id={c.id} label={c.label} tooltip={c.tooltip} className={cx(numHead, c.wideOnly && "max-lg:hidden")} />
                            ))}
                        </Table.Header>
                        <Table.Body items={rows}>
                            {(r) => (
                                <Table.Row id={r.key} href={`/aksje/${r.instrument.ticker}`}>
                                    <Table.Cell {...instrumentCell(r.instrument)} />
                                    {columns.map((c) => (
                                        <Table.Cell key={c.id} className={cx("text-right whitespace-nowrap tabular-nums", c.wideOnly && "max-lg:hidden")}>
                                            {c.render(r)}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </Tabs.Panel>
            </Tabs>

            {/* Below md: two-column rows, tap opens a sheet */}
            <div className="pt-4 md:hidden">
                <MobileListLabels left="Instrument" right="Siste / i dag" />
                <ul className="divide-y divide-secondary">
                    {rows.map((r) => (
                        <MobileRow
                            key={r.key}
                            onPress={() => openRow(r)}
                            left={<InstrumentCell instrument={r.instrument} />}
                            right={
                                <>
                                    <span className="font-medium text-primary tabular-nums">{nf(r.instrument.last, priceDecimals(r.instrument.last))}</span>
                                    <Change percent={r.instrument.changePct} />
                                </>
                            }
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};

// --- News, calendar, dividends ---------------------------------------------------------------------------------------

const sourceFilters = [
    { id: "alle", label: "Alle" },
    { id: "FA", label: "FA" },
    { id: "TDN", label: "TDN" },
    { id: "Børsmelding", label: "Børsmeldinger" },
    { id: "Pressemelding", label: "Pressemeldinger" },
];

const categories = [
    { id: "Resultater", label: "Resultater" },
    { id: "Utbytte", label: "Utbytte" },
    { id: "Oppkjøp", label: "Oppkjøp" },
    { id: "Analyse", label: "Analyse" },
    { id: "Marked", label: "Marked" },
];

const NEWS_LIMIT = 5;

const NewsCard = ({ watchlist }: { watchlist: Watchlist }) => {
    const [sourceId, setSourceId] = useState<string>("alle");
    const [selectedCategories, setSelectedCategories] = useState<Set<AriaKey>>(new Set());
    const [showAll, setShowAll] = useState(false);
    const tickers = new Set(watchlist.holdings.map((h) => h.ticker));

    const items = news.filter(
        (n) => tickers.has(n.ticker) && (sourceId === "alle" || n.source === sourceId) && (selectedCategories.size === 0 || selectedCategories.has(n.category)),
    );
    const shown = showAll ? items : items.slice(0, NEWS_LIMIT);

    return (
        <section aria-labelledby="card-news" className={cx(card, "flex h-full flex-col")}>
            <CardHeader titleId="card-news" title={`Siste nytt om ${watchlist.name}`} />
            <Tabs selectedKey={sourceId} onSelectionChange={(key) => setSourceId(String(key))} className={cx(cardBody, "flex flex-1 flex-col")}>
                {/* Source as minimal tabs; categories as a Dropdown chip (page-patterns) */}
                <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
                    <Tabs.List type="button-minimal" size="sm" aria-label="Kilde" className="shrink-0">
                        {sourceFilters.map((f) => (
                            <Tabs.Item key={f.id} id={f.id} label={f.label} />
                        ))}
                    </Tabs.List>
                    <Dropdown.Root>
                        <Button color="secondary" size="sm" iconTrailing={ChevronDown} className="shrink-0">
                            Kategorier
                            {selectedCategories.size > 0 && (
                                <Badge size="sm" color="brand" className="ml-1">
                                    {selectedCategories.size}
                                </Badge>
                            )}
                        </Button>
                        <Dropdown.Popover className="w-56" placement="bottom left">
                            <Dropdown.Menu
                                aria-label="Kategorier"
                                selectionMode="multiple"
                                selectedKeys={selectedCategories}
                                onSelectionChange={(keys) => setSelectedCategories(keys === "all" ? new Set(categories.map((c) => c.id)) : new Set(keys))}
                                items={categories}
                            >
                                {(item) => <Dropdown.Item id={item.id} label={item.label} selectionIndicator="checkbox" />}
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>
                </div>

                <Tabs.Panel id={sourceId} className="flex flex-1 flex-col">
                    {shown.length === 0 ? (
                        <EmptyState
                            className="py-10"
                            icon={Help}
                            title="Ingen nyheter med dette filteret"
                            description="Velg «Alle» eller fjern kategoriene for å se alle nyhetene om aksjene dine."
                        />
                    ) : (
                        <ul className="mt-2 flex flex-col">
                            {shown.map((n) => (
                                <li key={n.id} className="flex gap-3 border-b border-secondary py-4 last:border-b-0">
                                    <Avatar size="sm" initials={n.source === "Børsmelding" ? "BM" : n.source === "Pressemelding" ? "PM" : n.source} alt="" />
                                    <div className="flex min-w-0 flex-col gap-1">
                                        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-tertiary">
                                            <span>{n.time}</span>
                                            <span aria-hidden>·</span>
                                            <Badge color="brand" size="sm" type="pill-color">
                                                {instruments[n.ticker].ticker}
                                            </Badge>
                                            <span aria-hidden>·</span>
                                            <span>{n.source}</span>
                                        </p>
                                        <a
                                            href={`/nyheter/${n.id}`}
                                            className="rounded-xs text-sm font-semibold text-primary outline-focus-ring hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            {n.headline}
                                        </a>
                                        <p className="line-clamp-2 text-sm text-tertiary">{n.snippet}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {items.length > NEWS_LIMIT && (
                        <div className="mt-auto pt-3">
                            <Button color="link-color" onPress={() => setShowAll((v) => !v)}>
                                {showAll ? "Vis færre nyheter" : `Vis flere nyheter (${items.length - NEWS_LIMIT})`}
                            </Button>
                        </div>
                    )}
                </Tabs.Panel>
            </Tabs>
        </section>
    );
};

const CalendarCard = ({ watchlist }: { watchlist: Watchlist }) => {
    const tickers = new Set(watchlist.holdings.map((h) => h.ticker));
    const events = calendarEvents.filter((e) => tickers.has(e.ticker));

    return (
        <section aria-labelledby="card-calendar" className={card}>
            <CardHeader
                titleId="card-calendar"
                title="Finanskalender"
                actions={<Button color="secondary" size="sm" iconLeading={ChevronRight} href="/kalender" aria-label="Se hele finanskalenderen" />}
            />
            <ul className="flex flex-col px-4 py-2 md:px-6">
                {events.map((e) => {
                    const instrument = instruments[e.ticker];
                    return (
                        <li key={e.id} className="flex items-center justify-between gap-3 border-b border-secondary py-3 last:border-b-0">
                            <InstrumentCell instrument={instrument} meta={`${instrument.ticker} · ${e.type}`} />
                            <div className="flex shrink-0 items-center gap-2">
                                <span className="text-sm text-secondary tabular-nums">{dateShort(e.date)}</span>
                                <Button
                                    color="tertiary"
                                    size="sm"
                                    iconLeading={Download}
                                    href={`/kalender/${e.id}.ics`}
                                    aria-label={`Legg ${instrument.name} ${e.type.toLowerCase()} i kalenderen`}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

const DividendsCard = ({ watchlist }: { watchlist: Watchlist }) => {
    const tickers = new Set(watchlist.holdings.map((h) => h.ticker));
    const items = upcomingDividends.filter((d) => tickers.has(d.ticker));

    return (
        <section aria-labelledby="card-dividends" className={card}>
            <CardHeader titleId="card-dividends" title="Kommende utbytter" />
            <div className="px-4 py-2 md:px-6">
                {items.length === 0 ? (
                    <EmptyState className="py-8" icon={Wallet} title="Ingen kommende utbytter" description="Ingen av aksjene i listen har varslet utbytte." />
                ) : (
                    <>
                        <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-secondary py-2 text-xs font-medium text-quaternary">
                            <span>Selskap</span>
                            <span className="text-right">Per aksje</span>
                            <span className="w-14 text-right">Dato</span>
                        </div>
                        <ul className="flex flex-col">
                            {items.map((d) => (
                                <li key={d.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-secondary py-3 last:border-b-0">
                                    <InstrumentCell instrument={instruments[d.ticker]} />
                                    <span className="text-right text-sm text-tertiary tabular-nums">{kr(d.perShare, 2)}</span>
                                    <span className="w-14 text-right text-sm text-tertiary tabular-nums">{dateShort(d.date)}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </section>
    );
};

// --- Transactions -----------------------------------------------------------------------------------------------------

const TradeType = ({ type }: { type: "buy" | "sell" }) => (
    <Badge size="sm" color={type === "buy" ? "success" : "error"}>
        {type === "buy" ? "Kjøp" : "Salg"}
    </Badge>
);

const TransactionsCard = ({ watchlist, onOpenSheet }: { watchlist: Watchlist; onOpenSheet: (content: SheetContent) => void }) => {
    const [tab, setTab] = useState<AriaKey>("handler");
    const [sort, setSort] = useState<AriaSortDescriptor>({ column: "date", direction: "descending" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const tickers = new Set(watchlist.holdings.map((h) => h.ticker));

    const trades = useMemo(() => {
        const owned = new Set(watchlist.holdings.map((h) => h.ticker));
        const list = transactions.filter((t) => owned.has(t.ticker));
        return list.sort((a, b) => {
            const d =
                sort.column === "name"
                    ? instruments[a.ticker].name.localeCompare(instruments[b.ticker].name, "nb")
                    : new Date(a.date).getTime() - new Date(b.date).getTime();
            return sort.direction === "descending" ? -d : d;
        });
    }, [watchlist, sort]);

    const total = Math.max(1, Math.ceil(trades.length / pageSize));
    const pageRows = trades.slice((page - 1) * pageSize, page * pageSize);
    const dividends = receivedDividends.filter((d) => tickers.has(d.ticker));

    const openTrade = (t: (typeof trades)[number]) => {
        const instrument = instruments[t.ticker];
        const amount = t.quantity * t.price;
        onOpenSheet({
            title: "Transaksjon",
            description: `${instrument.name} · ${dateLong(t.date)}`,
            key: (
                <p className="flex items-center gap-2">
                    <span className="text-display-xs font-semibold text-primary tabular-nums">{kr(amount, 2)}</span>
                    <TradeType type={t.type} />
                </p>
            ),
            rows: [
                ["Instrument", `${instrument.name} (${instrument.ticker})`],
                ["Dato", dateLong(t.date)],
                ["Antall", nf(t.quantity, 0)],
                ["Kurs", nf(t.price, priceDecimals(t.price))],
                ["Kurtasje", kr(t.fees, 2)],
                ["Fra/til kontanter", t.affectsCash ? "Ja" : "Nei"],
            ],
            href: `/aksje/${instrument.ticker}`,
        });
    };

    return (
        <section aria-labelledby="card-transactions" className={cx(card, "lg:col-span-6")}>
            <CardHeader titleId="card-transactions" title="Historiske transaksjoner" />
            <Tabs selectedKey={tab} onSelectionChange={setTab}>
                <div className="px-4 pt-5 pb-4 md:px-6">
                    <Tabs.List type="button-minimal" size="sm" aria-label="Transaksjonstype">
                        <Tabs.Item id="handler" label="Handler" />
                        <Tabs.Item id="kontanter" label="Kontanter" />
                        <Tabs.Item id="utbytte" label="Utbytte" />
                    </Tabs.List>
                </div>

                <Tabs.Panel id="handler">
                    <div className="max-md:hidden">
                        <Table aria-label="Handler" size="sm" sortDescriptor={sort} onSortChange={setSort}>
                            <Table.Header>
                                <Table.Head id="name" label="Navn" isRowHeader allowsSorting className="w-full min-w-56" />
                                <Table.Head id="date" label="Dato" allowsSorting />
                                <Table.Head id="type" label="Type" />
                                <Table.Head id="qty" label="Antall" className={numHead} />
                                <Table.Head id="price" label="Kurs" className={numHead} />
                                <Table.Head id="fees" label="Kurtasje" className={numHead} />
                                <Table.Head id="cash" label="Fra/til kontanter" className="max-lg:hidden" />
                            </Table.Header>
                            <Table.Body items={pageRows}>
                                {(t) => (
                                    <Table.Row id={t.id}>
                                        <Table.Cell {...instrumentCell(instruments[t.ticker])} />
                                        <Table.Cell className="whitespace-nowrap tabular-nums">{dateLong(t.date)}</Table.Cell>
                                        <Table.Cell>
                                            <TradeType type={t.type} />
                                        </Table.Cell>
                                        <Table.Cell className="text-right tabular-nums">{nf(t.quantity, 0)}</Table.Cell>
                                        <Table.Cell className="text-right whitespace-nowrap tabular-nums">{nf(t.price, priceDecimals(t.price))}</Table.Cell>
                                        <Table.Cell className="text-right whitespace-nowrap tabular-nums">{kr(t.fees, 2)}</Table.Cell>
                                        <Table.Cell className="max-lg:hidden">{t.affectsCash ? "Ja" : "Nei"}</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>

                    <div className="md:hidden">
                        <MobileListLabels left="Instrument / dato" right="Beløp / type" />
                        <ul className="divide-y divide-secondary">
                            {pageRows.map((t) => (
                                <MobileRow
                                    key={t.id}
                                    onPress={() => openTrade(t)}
                                    left={<InstrumentCell instrument={instruments[t.ticker]} meta={dateLong(t.date)} />}
                                    right={
                                        <>
                                            <span className="font-medium text-primary tabular-nums">{kr(t.quantity * t.price)}</span>
                                            <TradeType type={t.type} />
                                        </>
                                    }
                                />
                            ))}
                        </ul>
                    </div>

                    <PaginationCardAdvanced
                        page={page}
                        total={total}
                        pageSize={pageSize}
                        onPageChange={setPage}
                        onPageSizeChange={(size) => {
                            setPageSize(size);
                            setPage(1);
                        }}
                    />
                </Tabs.Panel>

                <Tabs.Panel id="kontanter">
                    <Table aria-label="Kontantbevegelser" size="sm">
                        <Table.Header>
                            <Table.Head id="date" label="Dato" isRowHeader className="w-full" />
                            <Table.Head id="type" label="Type" />
                            <Table.Head id="amount" label="Beløp" className={numHead} />
                        </Table.Header>
                        <Table.Body items={cashMovements}>
                            {(c) => (
                                <Table.Row id={c.id}>
                                    <Table.Cell className="whitespace-nowrap tabular-nums">{dateLong(c.date)}</Table.Cell>
                                    <Table.Cell>{c.type}</Table.Cell>
                                    <Table.Cell className="text-right whitespace-nowrap tabular-nums">
                                        <span className={cx(c.amount > 0 ? "text-success-primary" : "text-error-primary")}>{kr(c.amount, 0, true)}</span>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </Tabs.Panel>

                <Tabs.Panel id="utbytte">
                    <Table aria-label="Mottatt utbytte" size="sm">
                        <Table.Header>
                            <Table.Head id="name" label="Navn" isRowHeader className="w-full min-w-48" />
                            <Table.Head id="date" label="Dato" className="max-md:hidden" />
                            <Table.Head id="per" label="Per aksje" className={cx(numHead, "max-md:hidden")} />
                            <Table.Head id="qty" label="Antall" className={cx(numHead, "max-md:hidden")} />
                            <Table.Head id="amount" label="Beløp" className={numHead} />
                        </Table.Header>
                        <Table.Body items={dividends}>
                            {(d) => (
                                <Table.Row id={d.id}>
                                    <Table.Cell {...instrumentCell(instruments[d.ticker])} />
                                    <Table.Cell className="whitespace-nowrap tabular-nums max-md:hidden">{dateLong(d.date)}</Table.Cell>
                                    <Table.Cell className="text-right whitespace-nowrap tabular-nums max-md:hidden">{kr(d.perShare, 2)}</Table.Cell>
                                    <Table.Cell className="text-right tabular-nums max-md:hidden">{nf(d.quantity, 0)}</Table.Cell>
                                    <Table.Cell className="text-right whitespace-nowrap tabular-nums">{kr(d.perShare * d.quantity)}</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </Tabs.Panel>
            </Tabs>
        </section>
    );
};

// ---------------------------------------------------------------------------------------------------------------------
// One watchlist

const WatchlistView = ({ watchlist, onOpenSheet }: { watchlist: Watchlist; onOpenSheet: (content: SheetContent) => void }) => {
    const isEmpty = watchlist.holdings.length === 0;

    return (
        <div className="flex flex-col gap-6 pt-6">
            {/* Title row: h1 + settings, then the AI prompt chips */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-display-sm font-semibold text-primary">{watchlist.name}</h1>
                    <ButtonUtility icon={Settings} color="tertiary" tooltip="Innstillinger for listen" />
                </div>
                {!isEmpty && (
                    // AI prompt chips — no component yet (page-patterns)
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-secondary">Investorchat:</span>
                        {aiPrompts.map((prompt) => (
                            <Button key={prompt} color="secondary" size="sm">
                                {prompt}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            {isEmpty ? (
                <section aria-label="Tom liste" className={card}>
                    <EmptyState
                        className="px-4 py-16"
                        icon={Wallet}
                        title="Ingen transaksjoner ennå"
                        description="Registrer ditt første kjøp for å se verdi, avkastning, nyheter og kommende hendelser for aksjene dine."
                        secondaryAction={
                            <Button size="md" color="secondary" href="/bors">
                                Se Oslo Børs
                            </Button>
                        }
                        primaryAction={
                            <Button size="md" iconLeading={Plus}>
                                Registrer kjøp
                            </Button>
                        }
                    />
                </section>
            ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
                    <PerformanceCard watchlist={watchlist} />
                    <MetricsCard watchlist={watchlist} />
                    <HoldingsCard watchlist={watchlist} onOpenSheet={onOpenSheet} />
                    <div className="lg:col-span-4">
                        <NewsCard watchlist={watchlist} />
                    </div>
                    <aside className="flex flex-col gap-6 lg:col-span-2">
                        <CalendarCard watchlist={watchlist} />
                        <DividendsCard watchlist={watchlist} />
                    </aside>
                    <TransactionsCard watchlist={watchlist} onOpenSheet={onOpenSheet} />
                </div>
            )}
        </div>
    );
};

// ---------------------------------------------------------------------------------------------------------------------
// Page

/** A logged-in portfolio watchlist: performance against OSEBX, key figures, holdings, news, events and trades. */
export const PortfolioWatchlistPage = () => {
    const [selected, setSelected] = useState<AriaKey>(watchlists[0].id);
    const [sheet, setSheet] = useState<SheetContent | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 160);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const openSheet = (content: SheetContent) => {
        setSheet(content);
        setSheetOpen(true);
    };

    return (
        <div className="min-h-dvh bg-secondary_alt">
            <SiteHeader
                brand="fa"
                className="sticky top-0 z-30"
                collapsed={scrolled}
                navigation={navigation}
                shortcuts={shortcuts}
                tickerItems={tickerItems}
                menu={menu}
                user={{ initials: "KH", href: "/min-side" }}
                loginHref="/logg-inn"
                subscribeHref="/abonnement"
                onSearchPress={() => {
                    // Placeholder: opens the search view in the app.
                }}
            />

            <main className="mx-auto w-full max-w-container px-4 py-6 md:px-8">
                <Tabs selectedKey={selected} onSelectionChange={setSelected}>
                    <NativeSelect
                        aria-label="Velg watchlist"
                        value={selected as string}
                        onChange={(event) => setSelected(event.target.value)}
                        options={watchlists.map((w) => ({ label: `${w.name} (${pct(w.dayChange)} i dag)`, value: w.id }))}
                        className="md:hidden"
                    />
                    <Tabs.List type="underline" size="sm" aria-label="Mine watchlister" className="max-md:hidden">
                        {watchlists.map((w) => (
                            <Tabs.Item key={w.id} id={w.id}>
                                {w.name}
                                <span className="text-xs font-medium">
                                    <Change percent={w.dayChange} />
                                </span>
                            </Tabs.Item>
                        ))}
                    </Tabs.List>
                    {watchlists.map((w) => (
                        <Tabs.Panel key={w.id} id={w.id}>
                            <WatchlistView watchlist={w} onOpenSheet={openSheet} />
                        </Tabs.Panel>
                    ))}
                </Tabs>
            </main>

            <Modal isOpen={sheetOpen} onOpenChange={setSheetOpen} mobile="sheet">
                <ModalHeader title={sheet?.title ?? ""} description={sheet?.description} />
                <ModalBody>
                    {sheet?.key}
                    <dl className="flex flex-col">
                        {sheet?.rows.map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-4 border-b border-secondary py-2.5 text-sm last:border-b-0">
                                <dt className="text-tertiary">{label}</dt>
                                <dd className="font-medium text-primary tabular-nums">{value}</dd>
                            </div>
                        ))}
                    </dl>
                    {sheet?.href && (
                        <Button color="secondary" size="lg" href={sheet.href} iconTrailing={ChevronRight}>
                            Gå til aksjesiden
                        </Button>
                    )}
                </ModalBody>
            </Modal>

            <SiteFooter
                brand="fa"
                links={footerLinks}
                publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, 0214 Oslo", "Sjefredaktør/adm.dir: Trygve Hegnar"]}
                copyright="©2026 Hegnar Media AS"
                disclaimer="Børsdata levert av Millistream. Indekser og valuta er forsinket minst 15 minutter."
                disclaimerHref="/om-data"
                socialLinks={[
                    { platform: "facebook", href: "https://facebook.com/finansavisen" },
                    { platform: "linkedin", href: "https://linkedin.com/company/finansavisen" },
                ]}
                contactHref="/kontakt-oss"
                appStoreHref="https://apps.apple.com/no/app/finansavisen"
                googlePlayHref="https://play.google.com/store/apps/details?id=no.finansavisen"
            />
        </div>
    );
};
