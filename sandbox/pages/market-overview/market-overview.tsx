"use client";

import { type ReactNode, useMemo, useState } from "react";
import { CardHeader } from "fa-design-system/components/application/card-header/card-header";
import { ChartTooltipContent } from "fa-design-system/components/application/charts/charts-base";
import { EmptyState } from "fa-design-system/components/application/empty-state/empty-state";
import { type Period, type PeriodOption, PeriodSelector } from "fa-design-system/components/application/period-selector/period-selector";
import { SiteFooter } from "fa-design-system/components/application/site-footer/site-footer";
import type { SiteNavItem } from "fa-design-system/components/application/site-header/site-brands";
import { SiteHeader } from "fa-design-system/components/application/site-header/site-header";
import { Table } from "fa-design-system/components/application/table/table";
import { Tabs } from "fa-design-system/components/application/tabs/tabs";
import { Avatar } from "fa-design-system/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "fa-design-system/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "fa-design-system/components/base/button-group/button-group";
import { Button } from "fa-design-system/components/base/buttons/button";
import { ButtonUtility } from "fa-design-system/components/base/buttons/button-utility";
import { Dropdown } from "fa-design-system/components/base/dropdown/dropdown";
import { Select } from "fa-design-system/components/base/select/select";
import { Toggle } from "fa-design-system/components/base/toggle/toggle";
import { useBreakpoint } from "fa-design-system/hooks/use-breakpoint";
import { cx } from "fa-design-system/utils/cx";
import {
    ArrowRight,
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    DenmarkDkkFlag,
    Download,
    Eye,
    EyeOff,
    Maximize,
    NorwayNokFlag,
    Pen,
    Play,
    Plus,
    Search,
    SwedenSekFlag,
    UnitedStatesUsdFlag,
} from "fa-icons";
import type { Key as AriaKey, Selection as AriaSelection, SortDescriptor as AriaSortDescriptor } from "react-aria-components";
import { Area, AreaChart, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
    type EarningsCall,
    type ExtremeRecord,
    type MarketInstrument,
    type Mover,
    type NewsCategory,
    type Presentation,
    type Report,
    allTimeHighs,
    allTimeLows,
    assetGroups,
    calendarEvents,
    dividends,
    earningsCalls,
    losers,
    marketInstruments,
    mostTraded,
    news,
    newsCategories,
    newsCategoryLabel,
    presentations,
    reports,
    sectors,
    shortPositions,
    unusualVolume,
    watchlistItems,
    watchlists,
    winners,
} from "./market-overview-data";

/* ------------------------------------------------------------------------------------------------
 * Layout constants (layout.md: card surface, card body under a CardHeader, 6-column card grid)
 * ---------------------------------------------------------------------------------------------- */

const card = "flex flex-col overflow-hidden rounded-2xl border border-secondary bg-primary_alt";
const cardBody = "px-4 py-5 md:px-6";

/** Column heads: the Table.Head padding is px-6 while sm cells are px-5, so heads take px-5 to line up. */
const head = "px-5";
const numHead = "px-5 [&>div]:justify-end";
const numCell = "text-right tabular-nums whitespace-nowrap";

/* ------------------------------------------------------------------------------------------------
 * Norwegian number formatting
 * ---------------------------------------------------------------------------------------------- */

const nb = (value: number, options: Intl.NumberFormatOptions = {}) =>
    new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2, ...options }).format(value);

/** Prices use as many decimals as they need: penny stocks get four. */
const price = (value: number, decimals?: number) => {
    const d = decimals ?? (value < 1 ? 4 : value < 10 ? 3 : 2);
    return nb(value, { minimumFractionDigits: d, maximumFractionDigits: d });
};

const signed = (value: number, options: Intl.NumberFormatOptions = {}) => nb(value, { signDisplay: "exceptZero", ...options });

const percent = (value: number) => signed(value / 100, { style: "percent" });

/** 640 890 000 → "640,89 M", 1 310 000 000 → "1,31 mrd". */
const amount = (value: number) => (value >= 1e9 ? `${nb(value / 1e9)} mrd` : `${nb(value / 1e6)} M`);

/** Change value (page-patterns.md, no component yet): a signed number colored by direction. */
const Change = ({ pct, value, decimals }: { pct: number; value?: number; decimals?: number }) => (
    <span className={cx("tabular-nums", pct > 0 && "text-success-primary", pct < 0 && "text-error-primary", pct === 0 && "text-tertiary")}>
        {value === undefined
            ? percent(pct)
            : `${signed(value, { minimumFractionDigits: decimals ?? 2, maximumFractionDigits: decimals ?? 2 })} (${percent(pct)})`}
    </span>
);

/** A signed number in the same colors, for +/− columns where the percent has its own column. */
const SignedValue = ({ value, decimals }: { value: number; decimals?: number }) => (
    <span className={cx("tabular-nums", value > 0 && "text-success-primary", value < 0 && "text-error-primary", value === 0 && "text-tertiary")}>
        {signed(value, decimals === undefined ? {} : { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
);

/** Instrument cell in a table: `Table.Cell` props for the logo (initials until logos exist), name over ticker. */
const instrumentCell = (name: string, code: string) => ({
    leading: <Avatar initials={code.replace(/[^A-Z]/g, "").slice(0, 2)} alt="" size="sm" />,
    leadText: name,
    supportingText: code,
});

const instrumentHref = (ticker: string) => `#aksje/${ticker}`;

/* ------------------------------------------------------------------------------------------------
 * Chart data (placeholder): a seeded random walk that ends at the last price
 * ---------------------------------------------------------------------------------------------- */

type ChartPeriod = "1D" | "5D" | "6M" | "1Y" | "5Y";
const chartPeriods: ChartPeriod[] = ["1D", "5D", "6M", "1Y", "5Y"];

interface ChartPoint {
    i: number;
    value: number;
    tick: string;
    full: string;
}

const seeded = (seed: number) => () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
};

const hash = (text: string) => [...text].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 2147483647, 7) || 1;

const periodChange = (instrument: MarketInstrument, period: ChartPeriod) => (period === "1D" ? instrument.changePct : instrument.periods[period]);

const NOW = new Date(2026, 9, 28, 14, 32);

const buildSeries = (instrument: MarketInstrument, period: ChartPeriod): ChartPoint[] => {
    const random = seeded(hash(instrument.id + period));
    const time = (d: Date) => d.toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit" });
    const day = (d: Date, withYear = false) => d.toLocaleDateString("nb-NO", { day: "numeric", month: "short", ...(withYear ? { year: "numeric" } : {}) });

    const dates: Date[] = [];
    if (period === "1D") {
        for (let m = 0; m <= 332; m += 4) dates.push(new Date(2026, 9, 28, 9, m));
    } else if (period === "5D") {
        const days = [22, 23, 26, 27, 28];
        days.forEach((d) => {
            for (let h = 9; h <= 16; h += 0.5) dates.push(new Date(2026, 9, d, Math.floor(h), (h % 1) * 60));
        });
    } else {
        const count = period === "6M" ? 126 : period === "1Y" ? 252 : 260;
        const stepDays = period === "5Y" ? 7 : 1.45;
        for (let n = count - 1; n >= 0; n--) dates.push(new Date(NOW.getTime() - n * stepDays * 86_400_000));
    }

    const end = instrument.last;
    const start = end / (1 + periodChange(instrument, period) / 100);
    const walk: number[] = [0];
    for (let n = 1; n < dates.length; n++) walk.push(walk[n - 1] + (random() - 0.5));
    const last = walk[walk.length - 1];
    const scale = Math.abs(end - start) / 4 + end * 0.004;

    return dates.map((date, n) => {
        const progress = n / (dates.length - 1);
        const drift = walk[n] - last * progress;
        const value = start + (end - start) * progress + drift * scale * 0.25;
        const intraday = period === "1D" || period === "5D";
        return {
            i: n,
            value,
            tick: period === "1D" ? time(date) : period === "5D" ? day(date) : day(date, period === "5Y"),
            full: intraday ? `${day(date)} kl. ${time(date)}` : day(date, true),
        };
    });
};

/* ------------------------------------------------------------------------------------------------
 * Header and footer data
 * ---------------------------------------------------------------------------------------------- */

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
            current: true,
            items: [
                { label: "Børsoversikt", href: "/bors" },
                { label: "Råvarer", href: "/raavarer" },
                { label: "Valuta", href: "/valuta" },
                { label: "Kalender", href: "/kalender" },
                { label: "Rapporter", href: "/rapporter" },
            ],
        },
        { label: "Varsler", href: "/varsler" },
        { label: "Watchlist", href: "/watchlist" },
        { label: "Investorchat", href: "/investorchat" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors", current: true },
    { label: "Forum", href: "/forum" },
    { label: "Varsler", href: "/varsler" },
    { label: "Watchlist", href: "/watchlist" },
    { label: "Chat", href: "/investorchat" },
];

const footerLinks: SiteNavItem[][] = [
    [
        { label: "eAvis", href: "/eavis" },
        { label: "Annonsere", href: "/annonse" },
        { label: "Arkiv", href: "/arkiv" },
        { label: "Arrangementer", href: "/arrangementer" },
        { label: "Bedriftsabonnement", href: "/bedrift" },
    ],
    [
        { label: "Personvernerklæring", href: "/personvern" },
        { label: "Vilkår", href: "/vilkar" },
        { label: "Informasjonskapsler", href: "/cookies" },
        { label: "Samtykkeinnstillinger", href: "/samtykke" },
    ],
];

/* ------------------------------------------------------------------------------------------------
 * Sections
 * ---------------------------------------------------------------------------------------------- */

const markets = [
    { id: "no", label: "Norge", flag: NorwayNokFlag },
    { id: "se", label: "Sverige", flag: SwedenSekFlag },
    { id: "dk", label: "Danmark", flag: DenmarkDkkFlag },
    { id: "us", label: "USA", flag: UnitedStatesUsdFlag },
];

/** 4. Index chart: the selected instrument, its value and change, the chart and the period selector. */
const IndexChartCard = ({ instrument, isLive, className }: { instrument: MarketInstrument; isLive: boolean; className?: string }) => {
    const [period, setPeriod] = useState<Period>("1D");
    const isDesktop = useBreakpoint("lg");
    const chartPeriod = period as ChartPeriod;
    const data = useMemo(() => buildSeries(instrument, chartPeriod), [instrument, chartPeriod]);
    const change = periodChange(instrument, chartPeriod);
    const periodOptions: PeriodOption[] = chartPeriods.map((id) => ({ id, change: periodChange(instrument, id) }));
    const periodLabel: Record<ChartPeriod, string> = {
        "1D": "i dag",
        "5D": "siste fem dager",
        "6M": "siste seks måneder",
        "1Y": "siste år",
        "5Y": "siste fem år",
    };

    return (
        <section aria-labelledby="card-index" className={className}>
            <CardHeader
                titleId="card-index"
                title={`${instrument.name} (${instrument.code})`}
                badge={
                    isLive ? (
                        <BadgeWithDot color="error" size="sm">
                            Live
                        </BadgeWithDot>
                    ) : (
                        <Badge color="gray" size="sm">
                            Forsinket 15 min
                        </Badge>
                    )
                }
                actions={
                    <>
                        <Button color="secondary" size="sm" iconLeading={Plus} aria-label={`Legg ${instrument.name} til i watchlist`} />
                        <Button color="secondary" size="sm" iconLeading={Maximize} aria-label="Vis grafen i fullskjerm" />
                    </>
                }
            />
            <div className={cx(cardBody, "flex flex-1 flex-col")}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-display-sm font-semibold text-primary tabular-nums">{price(instrument.last, instrument.decimals)}</p>
                    <p className="text-md font-medium">
                        <Change pct={instrument.changePct} value={instrument.change} decimals={instrument.decimals} />
                    </p>
                </div>
                <p className="mt-1 text-sm text-tertiary">
                    {instrument.name} er {change >= 0 ? "opp" : "ned"} {nb(Math.abs(change))} % {periodLabel[chartPeriod]}.
                </p>
                <div className="mt-4 h-72 min-h-72 flex-1">
                    <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                        <AreaChart data={data} className="text-tertiary [&_.recharts-text]:text-xs" margin={{ top: 8, bottom: 0, left: 0, right: 0 }}>
                            <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                            <XAxis
                                dataKey="i"
                                fill="currentColor"
                                axisLine={false}
                                tickLine={false}
                                minTickGap={isDesktop ? 48 : 32}
                                interval="preserveStartEnd"
                                tickFormatter={(i: number) => data[i]?.tick ?? ""}
                            />
                            <YAxis
                                orientation="right"
                                fill="currentColor"
                                axisLine={false}
                                tickLine={false}
                                width={isDesktop ? 64 : 52}
                                domain={["auto", "auto"]}
                                tickFormatter={(v: number) => nb(v, { minimumFractionDigits: 0, maximumFractionDigits: instrument.last < 100 ? 2 : 0 })}
                            />
                            <ChartTooltip
                                content={<ChartTooltipContent />}
                                formatter={(v) => price(Number(v), instrument.decimals)}
                                labelFormatter={(i) => data[Number(i)]?.full ?? ""}
                                cursor={{ className: "stroke-utility-brand-600 stroke-2" }}
                            />
                            <Area
                                dataKey="value"
                                name={instrument.name}
                                type="monotone"
                                isAnimationActive={false}
                                className={change >= 0 ? "text-utility-success-600" : "text-utility-error-600"}
                                stroke="currentColor"
                                strokeWidth={1.5}
                                fill="none"
                                activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <PeriodSelector className="mt-4" periods={periodOptions} selectedPeriod={period} onPeriodChange={setPeriod} />
            </div>
        </section>
    );
};

/** 5. Market list: indices, commodities, FX, crypto, rates. The selected row is the charted instrument. */
const MarketListCard = ({ selectedId, onSelect, className }: { selectedId: string; onSelect: (id: string) => void; className?: string }) => {
    const [groups, setGroups] = useState<AriaSelection>(new Set(assetGroups.map((g) => g.id)));
    const visible = marketInstruments.filter((m) => groups === "all" || groups.has(m.group));
    const count = groups === "all" ? assetGroups.length : groups.size;

    return (
        <section aria-labelledby="card-markets" className={className}>
            <CardHeader
                titleId="card-markets"
                title="Markeder"
                actions={
                    <Dropdown.Root>
                        <Button color="secondary" size="sm" iconTrailing={ChevronDown}>
                            <span className="flex items-center gap-1.5">
                                Markeder
                                <Badge color="gray" size="sm">
                                    {count}
                                </Badge>
                            </span>
                        </Button>
                        <Dropdown.Popover className="w-48">
                            <Dropdown.Menu aria-label="Vis markeder" selectionMode="multiple" selectedKeys={groups} onSelectionChange={setGroups}>
                                {assetGroups.map((g) => (
                                    <Dropdown.Item key={g.id} id={g.id} selectionIndicator="checkbox">
                                        {g.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>
                }
            />
            <Table
                aria-label="Markeder"
                size="sm"
                selectionMode="single"
                selectionBehavior="replace"
                disallowEmptySelection
                selectedKeys={[selectedId]}
                onSelectionChange={(keys) => {
                    if (keys !== "all") {
                        const [first] = keys;
                        if (first !== undefined) onSelect(String(first));
                    }
                }}
            >
                <Table.Header>
                    <Table.Head id="name" label="Navn" isRowHeader className={cx(head, "w-full")} />
                    <Table.Head id="last" label="Siste" className={numHead} />
                    <Table.Head id="change" label="%" className={numHead} />
                </Table.Header>
                <Table.Body items={visible} renderEmptyState={() => <p className="p-5 text-sm text-tertiary">Velg minst ett marked.</p>}>
                    {(m) => (
                        <Table.Row id={m.id}>
                            <Table.Cell {...instrumentCell(m.name, m.code)} />
                            <Table.Cell className={numCell}>{price(m.last, m.decimals)}</Table.Cell>
                            <Table.Cell className={numCell}>
                                <Change pct={m.changePct} />
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </section>
    );
};

/** 6. Winners / Losers. */
const MoversCard = ({ id, title, rows, href, className }: { id: string; title: string; rows: Mover[]; href: string; className?: string }) => (
    <section aria-labelledby={id} className={className}>
        <CardHeader
            titleId={id}
            title={title}
            actions={<Button color="secondary" size="sm" iconLeading={ChevronRight} href={href} aria-label={`Se alle ${title.toLowerCase()}`} />}
        />
        <Table aria-labelledby={id} size="sm">
            <Table.Header>
                <Table.Head id="name" label="Aksje" isRowHeader className={cx(head, "w-full")} />
                <Table.Head id="last" label="Siste" className={numHead} />
                <Table.Head id="change" label="%" className={numHead} />
            </Table.Header>
            <Table.Body items={rows.map((r) => ({ ...r, id: r.ticker }))}>
                {(s) => (
                    <Table.Row id={s.id} href={instrumentHref(s.ticker)}>
                        <Table.Cell {...instrumentCell(s.name, s.ticker)} />
                        <Table.Cell className={numCell}>{price(s.last)}</Table.Cell>
                        <Table.Cell className={numCell}>
                            <Change pct={s.changePct} />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </section>
);

/** 7. Video player: not in the system. A 16:9 placeholder surface with the mute control. */
const VideoCard = ({ className }: { className?: string }) => {
    const [muted, setMuted] = useState(true);

    return (
        <section aria-labelledby="card-video" className={className}>
            <CardHeader
                titleId="card-video"
                title="Finansavisen TV"
                badge={
                    <BadgeWithDot color="error" size="sm">
                        Live
                    </BadgeWithDot>
                }
            />
            <div className={cx(cardBody, "flex flex-1 flex-col")}>
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl bg-tertiary">
                    <Button color="secondary" size="md" onPress={() => setMuted((m) => !m)}>
                        {muted ? "Slå på lyd" : "Slå av lyd"}
                    </Button>
                    <p className="text-xs text-tertiary">Videospiller (plassholder)</p>
                </div>
            </div>
        </section>
    );
};

/** 9. Market news feed: minimal tabs for the categories and compact rows in a fixed-height scroll area. */
const NewsCard = ({ className }: { className?: string }) => {
    const [selected, setSelected] = useState<NewsCategory | "alle" | "watchlist">("alle");
    const watchedTickers = new Set(watchlistItems.map((w) => w.ticker));
    const items = news.filter((n) =>
        selected === "alle" ? true : selected === "watchlist" ? n.ticker !== undefined && watchedTickers.has(n.ticker) : n.category === selected,
    );

    return (
        <section aria-labelledby="card-news" className={className}>
            <CardHeader titleId="card-news" title="Børsnytt" />
            <Tabs
                selectedKey={selected}
                onSelectionChange={(key) => setSelected(key as typeof selected)}
                className={cx(cardBody, "flex flex-1 flex-col gap-4")}
            >
                <div className="-mx-4 overflow-x-auto px-4 md:-mx-6 md:px-6">
                    <Tabs.List type="button-minimal" size="sm" aria-label="Filtrer børsnytt">
                        {newsCategories.map((c) => (
                            <Tabs.Item key={c.id} id={c.id} label={c.label} />
                        ))}
                    </Tabs.List>
                </div>
                <Tabs.Panel id={selected} className="h-112 overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="py-12">
                            <EmptyState icon={Search} title="Ingen nyheter her ennå" description="Det er ingen saker i denne kategorien i dag." />
                        </div>
                    ) : (
                        <ul className="flex flex-col">
                            {items.map((n) => (
                                <li key={n.id} className="border-b border-secondary py-3 last:border-b-0">
                                    <a
                                        href={`#nyhet/${n.id}`}
                                        className="flex flex-col gap-1 rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        <span className="flex items-center gap-1.5 text-xs text-tertiary">
                                            <span className="tabular-nums">{n.time}</span>
                                            {n.ticker && (
                                                <>
                                                    <span aria-hidden>·</span>
                                                    <Badge color="brand" size="sm" type="pill-color">
                                                        {n.ticker}
                                                    </Badge>
                                                </>
                                            )}
                                            <span aria-hidden>·</span>
                                            <span>{newsCategoryLabel[n.category]}</span>
                                        </span>
                                        <span className="text-sm font-semibold text-primary">{n.headline}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </Tabs.Panel>
            </Tabs>
        </section>
    );
};

/** 8. My watchlist: key figures with a hide-amount toggle, then the holdings table. */
const WatchlistCard = ({ watchlist, onWatchlistChange, className }: { watchlist: AriaKey; onWatchlistChange: (key: AriaKey) => void; className?: string }) => {
    const [hidden, setHidden] = useState(false);
    const rows = watchlistItems.map((w) => {
        const value = w.quantity === undefined ? undefined : w.quantity * w.last;
        const dayChange = value === undefined ? undefined : value - value / (1 + w.changePct / 100);
        return { ...w, id: w.ticker, value, dayChange };
    });
    const total = rows.reduce((sum, r) => sum + (r.value ?? 0), 0);
    const totalDay = rows.reduce((sum, r) => sum + (r.dayChange ?? 0), 0);
    const totalDayPct = (totalDay / (total - totalDay)) * 100;
    const masked = "• • • •";
    const kr = (v: number) => `${nb(v)} kr`;

    return (
        <section aria-labelledby="card-watchlist" className={className}>
            <CardHeader
                titleId="card-watchlist"
                title="Min watchlist"
                actions={
                    <>
                        <Select
                            aria-label="Velg watchlist"
                            size="sm"
                            items={watchlists}
                            value={watchlist}
                            onChange={(k) => k !== null && onWatchlistChange(k)}
                            className="w-44"
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <Button color="secondary" size="sm" iconLeading={Pen} aria-label="Rediger watchlist" />
                        <Button color="secondary" size="sm" iconLeading={ArrowRight} href="/watchlist" aria-label="Åpne watchlist" />
                    </>
                }
            />
            <div className={cx(cardBody, "flex flex-wrap gap-x-10 gap-y-4")}>
                <div>
                    <p className="text-xs text-tertiary">Porteføljeverdi</p>
                    <div className="flex items-center gap-2">
                        <p className="text-display-xs font-semibold text-primary tabular-nums">
                            {hidden ? <span aria-label="Skjult beløp">{masked}</span> : kr(total)}
                        </p>
                        <Button
                            color="tertiary"
                            size="sm"
                            iconLeading={hidden ? Eye : EyeOff}
                            aria-label={hidden ? "Vis beløp" : "Skjul beløp"}
                            onPress={() => setHidden((h) => !h)}
                        />
                    </div>
                    <p className="text-sm">
                        {hidden ? <Change pct={totalDayPct} /> : <Change pct={totalDayPct} value={totalDay} />} <span className="text-tertiary">i dag</span>
                    </p>
                </div>
            </div>
            <Table aria-label="Instrumenter i watchlist" size="sm" className="min-w-2xl">
                <Table.Header>
                    <Table.Head id="name" label="Navn" isRowHeader className={cx(head, "w-full")} />
                    <Table.Head id="last" label="Siste" className={numHead} />
                    <Table.Head id="value" label="Verdi (NOK)" className={numHead} />
                    <Table.Head id="day" label="+/− (NOK)" className={numHead} />
                    <Table.Head id="pct" label="%" className={numHead} />
                    <Table.Head id="total" label="Totalt %" className={numHead} />
                </Table.Header>
                <Table.Body items={rows}>
                    {(r) => (
                        <Table.Row id={r.id} href={instrumentHref(r.ticker)}>
                            <Table.Cell {...instrumentCell(r.name, r.ticker)} />
                            <Table.Cell className={numCell}>{price(r.last)}</Table.Cell>
                            <Table.Cell className={numCell}>{r.value === undefined ? "–" : hidden ? masked : nb(r.value)}</Table.Cell>
                            <Table.Cell className={numCell}>
                                {r.dayChange === undefined ? "–" : hidden ? masked : <SignedValue value={r.dayChange} />}
                            </Table.Cell>
                            <Table.Cell className={numCell}>
                                <Change pct={r.changePct} />
                            </Table.Cell>
                            <Table.Cell className={numCell}>{r.totalPct === undefined ? "–" : <Change pct={r.totalPct} />}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </section>
    );
};

/** 10. Most traded. */
const MostTradedCard = ({ className }: { className?: string }) => (
    <section aria-labelledby="card-traded" className={className}>
        <CardHeader
            titleId="card-traded"
            title="Mest omsatt"
            actions={<Button color="secondary" size="sm" iconLeading={ChevronRight} href="/bors/mest-omsatt" aria-label="Se alle mest omsatte aksjer" />}
        />
        <Table aria-labelledby="card-traded" size="sm" className="min-w-xl">
            <Table.Header>
                <Table.Head id="name" label="Aksje" isRowHeader className={cx(head, "w-full")} />
                <Table.Head id="turnover" label="Omsetning" className={numHead} />
                <Table.Head id="last" label="Siste" className={numHead} />
                <Table.Head id="change" label="+/−" className={numHead} />
                <Table.Head id="pct" label="%" className={numHead} />
            </Table.Header>
            <Table.Body items={mostTraded.map((r) => ({ ...r, id: r.ticker }))}>
                {(r) => (
                    <Table.Row id={r.id} href={instrumentHref(r.ticker)}>
                        <Table.Cell {...instrumentCell(r.name, r.ticker)} />
                        <Table.Cell className={numCell}>{amount(r.turnover)}</Table.Cell>
                        <Table.Cell className={numCell}>{price(r.last)}</Table.Cell>
                        <Table.Cell className={numCell}>
                            <SignedValue value={r.change} />
                        </Table.Cell>
                        <Table.Cell className={numCell}>
                            <Change pct={r.changePct} />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </section>
);

/** 11. Hot stocks: unusual volume. */
const UnusualVolumeCard = ({ className }: { className?: string }) => (
    <section aria-labelledby="card-hot" className={className}>
        <CardHeader
            titleId="card-hot"
            title="Hete aksjer"
            actions={<Button color="secondary" size="sm" iconLeading={ChevronRight} href="/bors/hete-aksjer" aria-label="Se alle hete aksjer" />}
        />
        <Table aria-labelledby="card-hot" size="sm" className="min-w-xl">
            <Table.Header>
                <Table.Head id="name" label="Aksje" isRowHeader className={cx(head, "w-full")} />
                <Table.Head id="ratio" label="Volum mot snitt" tooltip="Dagens volum sammenlignet med snittet de siste 30 dagene" className={numHead} />
                <Table.Head id="last" label="Siste" className={numHead} />
                <Table.Head id="change" label="+/−" className={numHead} />
                <Table.Head id="pct" label="%" className={numHead} />
            </Table.Header>
            <Table.Body items={unusualVolume.map((r) => ({ ...r, id: r.ticker }))}>
                {(r) => (
                    <Table.Row id={r.id} href={instrumentHref(r.ticker)}>
                        <Table.Cell {...instrumentCell(r.name, r.ticker)} />
                        <Table.Cell className={numCell}>{percent(r.volumeRatioPct)}</Table.Cell>
                        <Table.Cell className={numCell}>{price(r.last)}</Table.Cell>
                        <Table.Cell className={numCell}>
                            <SignedValue value={r.change} decimals={r.last < 10 ? 4 : 2} />
                        </Table.Cell>
                        <Table.Cell className={numCell}>
                            <Change pct={r.changePct} />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </section>
);

/** 12 / 15. Ad slot: a neutral placeholder with reserved height, so the page doesn't shift when the ad loads. */
const AdSlot = ({ className }: { className?: string }) => (
    <aside aria-label="Annonse" className={cx("flex h-64 items-center justify-center rounded-2xl border border-secondary bg-primary_alt", className)}>
        <span className="text-xs text-quaternary">Annonse</span>
    </aside>
);

/** 13. Most shorted. */
const ShortedCard = ({ className }: { className?: string }) => (
    <section aria-labelledby="card-short" className={className}>
        <CardHeader
            titleId="card-short"
            title="Mest shortet"
            actions={<Button color="secondary" size="sm" iconLeading={ChevronRight} href="/bors/short" aria-label="Se alle shortposisjoner" />}
        />
        <Table aria-labelledby="card-short" size="sm" className="min-w-lg">
            <Table.Header>
                <Table.Head id="name" label="Aksje" isRowHeader className={cx(head, "w-full")} />
                <Table.Head id="pct" label="Andel shortet" className={numHead} />
                <Table.Head id="value" label="Verdi (NOK)" className={numHead} />
                <Table.Head
                    id="days"
                    label="Dager å dekke"
                    tooltip="Antall handelsdager det tar å kjøpe tilbake posisjonene med snittvolum"
                    className={numHead}
                />
            </Table.Header>
            <Table.Body items={shortPositions.map((r) => ({ ...r, id: r.ticker }))}>
                {(r) => (
                    <Table.Row id={r.id} href={instrumentHref(r.ticker)}>
                        <Table.Cell {...instrumentCell(r.name, r.ticker)} />
                        <Table.Cell className={numCell}>{`${nb(r.shortPct)} %`}</Table.Cell>
                        <Table.Cell className={numCell}>{amount(r.shortValue)}</Table.Cell>
                        <Table.Cell className={numCell}>{nb(r.daysToCover, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </section>
);

/** 14. Newest all-time highs / lows. */
const ExtremesCard = ({ id, title, rows, className }: { id: string; title: string; rows: ExtremeRecord[]; className?: string }) => (
    <section aria-labelledby={id} className={className}>
        <CardHeader titleId={id} title={title} />
        <Table aria-labelledby={id} size="sm" className="min-w-lg">
            <Table.Header>
                <Table.Head id="name" label="Aksje" isRowHeader className={cx(head, "w-full")} />
                <Table.Head id="price" label="Kurs" className={numHead} />
                <Table.Head id="date" label="Dato" className={numHead} />
                <Table.Head id="return" label="1 år" className={numHead} />
            </Table.Header>
            <Table.Body items={rows.map((r) => ({ ...r, id: r.ticker }))}>
                {(r) => (
                    <Table.Row id={r.id} href={instrumentHref(r.ticker)}>
                        <Table.Cell {...instrumentCell(r.name, r.ticker)} />
                        <Table.Cell className={numCell}>{price(r.price)}</Table.Cell>
                        <Table.Cell className={numCell}>{r.date}</Table.Cell>
                        <Table.Cell className={numCell}>
                            <Change pct={r.return1Y} />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </section>
);

/** A company row (page-patterns.md): instrument cell with a meta line, plus a trailing icon-only action. */
const CompanyRow = ({ name, ticker, meta, title, trailing }: { name: string; ticker: string; meta: string; title?: string; trailing?: ReactNode }) => (
    <li className="flex items-center justify-between gap-4 border-b border-secondary py-3 last:border-b-0">
        <div className="flex min-w-0 items-center gap-3">
            <Avatar initials={ticker.slice(0, 2)} alt="" size="sm" />
            <div className="min-w-0">
                <p className="truncate text-sm font-medium text-primary">{title ?? name}</p>
                <p className="truncate text-sm text-tertiary">{meta}</p>
            </div>
        </div>
        {trailing}
    </li>
);

/** A fixed-height list that scrolls inside its card. */
const ScrollList = ({ label, children }: { label: string; children: ReactNode }) => (
    <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className="h-80 overflow-y-auto rounded-sm outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
    >
        {children}
    </div>
);

/** 16. Annual and quarterly reports. */
const ReportsCard = ({ className }: { className?: string }) => {
    const list = (rows: Report[]) => (
        <ul>
            {rows.map((r) => (
                <CompanyRow
                    key={r.id}
                    name={r.name}
                    ticker={r.ticker}
                    meta={`${r.date} • ${r.type}`}
                    trailing={
                        r.hasFile ? (
                            <Button
                                color="tertiary"
                                size="sm"
                                iconLeading={Download}
                                href={`/filer/rapporter/${r.ticker}-${r.id}.pdf`}
                                aria-label={`Last ned ${r.type.toLowerCase()} fra ${r.name}`}
                            />
                        ) : undefined
                    }
                />
            ))}
        </ul>
    );

    return (
        <section aria-labelledby="card-reports" className={className}>
            <CardHeader titleId="card-reports" title="Kvartals- og årsrapporter" />
            <div className={cardBody}>
                <Tabs>
                    <Tabs.List type="button-minimal" size="sm" aria-label="Rapporter">
                        <Tabs.Item id="latest" label="Siste" />
                        <Tabs.Item id="upcoming" label="Kommende" />
                    </Tabs.List>
                    <Tabs.Panel id="latest" className="mt-3">
                        <ScrollList label="Siste rapporter">{list(reports.latest)}</ScrollList>
                    </Tabs.Panel>
                    <Tabs.Panel id="upcoming" className="mt-3">
                        <ScrollList label="Kommende rapporter">{list(reports.upcoming)}</ScrollList>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </section>
    );
};

/** 17. Earnings calls. */
const EarningsCallsCard = ({ className }: { className?: string }) => {
    const list = (rows: EarningsCall[]) => (
        <ul>
            {rows.map((c) => (
                <CompanyRow
                    key={c.id}
                    name={c.name}
                    ticker={c.ticker}
                    meta={`${c.date} • ${c.time} • ${c.quarter}`}
                    trailing={
                        c.isLive ? (
                            <BadgeWithDot color="error" size="sm">
                                Live
                            </BadgeWithDot>
                        ) : undefined
                    }
                />
            ))}
        </ul>
    );

    return (
        <section aria-labelledby="card-calls" className={className}>
            <CardHeader titleId="card-calls" title="Resultatpresentasjoner" />
            <div className={cardBody}>
                <Tabs>
                    <Tabs.List type="button-minimal" size="sm" aria-label="Resultatpresentasjoner">
                        <Tabs.Item id="latest" label="Siste" />
                        <Tabs.Item id="upcoming" label="Kommende" />
                        <Tabs.Item id="live" label="Live" />
                    </Tabs.List>
                    <Tabs.Panel id="latest" className="mt-3">
                        <ScrollList label="Siste resultatpresentasjoner">{list(earningsCalls.latest)}</ScrollList>
                    </Tabs.Panel>
                    <Tabs.Panel id="upcoming" className="mt-3">
                        <ScrollList label="Kommende resultatpresentasjoner">{list(earningsCalls.upcoming)}</ScrollList>
                    </Tabs.Panel>
                    <Tabs.Panel id="live" className="mt-3">
                        <ScrollList label="Direktesendte resultatpresentasjoner">
                            {earningsCalls.live.length === 0 ? (
                                <div className="py-12">
                                    <EmptyState icon={Calendar} title="Ingen direktesendinger nå" description="Se kommende presentasjoner." />
                                </div>
                            ) : (
                                list(earningsCalls.live)
                            )}
                        </ScrollList>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </section>
    );
};

/** 18. Quarterly presentations (video). */
const PresentationsCard = ({ className }: { className?: string }) => {
    const list = (rows: Presentation[]) => (
        <ul>
            {rows.map((p) => (
                <CompanyRow
                    key={p.id}
                    name={p.name}
                    ticker={p.ticker}
                    title={p.title}
                    meta={p.date}
                    trailing={<Button color="tertiary" size="sm" iconLeading={Play} href={`/tv/presentasjoner/${p.id}`} aria-label={`Spill av ${p.title}`} />}
                />
            ))}
        </ul>
    );

    return (
        <section aria-labelledby="card-presentations" className={className}>
            <CardHeader titleId="card-presentations" title="Kvartalspresentasjoner" />
            <div className={cardBody}>
                <Tabs>
                    <Tabs.List type="button-minimal" size="sm" aria-label="Kvartalspresentasjoner">
                        <Tabs.Item id="latest" label="Siste" />
                        <Tabs.Item id="upcoming" label="Kommende" />
                    </Tabs.List>
                    <Tabs.Panel id="latest" className="mt-3">
                        <ScrollList label="Siste kvartalspresentasjoner">{list(presentations.latest)}</ScrollList>
                    </Tabs.Panel>
                    <Tabs.Panel id="upcoming" className="mt-3">
                        <ScrollList label="Kommende kvartalspresentasjoner">
                            {presentations.upcoming.length === 0 ? (
                                <div className="py-12">
                                    <EmptyState
                                        icon={Calendar}
                                        title="Ingen kommende presentasjoner"
                                        description="Nye presentasjoner vises her når selskapene har satt en dato."
                                    />
                                </div>
                            ) : (
                                list(presentations.upcoming)
                            )}
                        </ScrollList>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </section>
    );
};

/** 19. Sectors, sortable, % descending by default. */
const SectorsCard = ({ className }: { className?: string }) => {
    const [sort, setSort] = useState<AriaSortDescriptor>({ column: "change", direction: "descending" });
    const rows = useMemo(
        () =>
            [...sectors].sort((a, b) => {
                const d = sort.column === "name" ? a.name.localeCompare(b.name, "nb") : a.changePct - b.changePct;
                return sort.direction === "descending" ? -d : d;
            }),
        [sort],
    );

    return (
        <section aria-labelledby="card-sectors" className={className}>
            <CardHeader titleId="card-sectors" title="Sektorer" />
            <Table aria-labelledby="card-sectors" size="sm" sortDescriptor={sort} onSortChange={setSort}>
                <Table.Header>
                    <Table.Head id="name" label="Navn" isRowHeader allowsSorting className={cx(head, "w-full")} />
                    <Table.Head id="change" label="%" allowsSorting className={numHead} />
                </Table.Header>
                <Table.Body items={rows}>
                    {(s) => (
                        <Table.Row id={s.id} href={`#sektor/${s.id}`}>
                            <Table.Cell>{s.name}</Table.Cell>
                            <Table.Cell className={numCell}>
                                <Change pct={s.changePct} />
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </section>
    );
};

/** 20. Upcoming dividends. */
const DividendsCard = ({ className }: { className?: string }) => (
    <section aria-labelledby="card-dividends" className={className}>
        <CardHeader titleId="card-dividends" title="Kommende utbytter" />
        <Table aria-labelledby="card-dividends" size="sm">
            <Table.Header>
                <Table.Head id="name" label="Selskap" isRowHeader className={cx(head, "w-full")} />
                <Table.Head id="amount" label="Per aksje" className={numHead} />
                <Table.Head id="date" label="Dato" className={numHead} />
            </Table.Header>
            <Table.Body items={dividends.map((r) => ({ ...r, id: r.ticker }))}>
                {(r) => (
                    <Table.Row id={r.id} href={instrumentHref(r.ticker)}>
                        <Table.Cell {...instrumentCell(r.name, r.ticker)} />
                        <Table.Cell className={numCell}>{r.amount}</Table.Cell>
                        <Table.Cell className={numCell}>{r.date}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </section>
);

/** 21. Financial calendar. */
const CalendarCard = ({ className }: { className?: string }) => (
    <section aria-labelledby="card-calendar" className={className}>
        <CardHeader
            titleId="card-calendar"
            title="Finanskalender"
            actions={<Button color="secondary" size="sm" iconLeading={ChevronRight} href="/bors/kalender" aria-label="Se hele finanskalenderen" />}
        />
        <Table aria-labelledby="card-calendar" size="sm" className="min-w-lg">
            <Table.Header>
                <Table.Head id="name" label="Selskap" isRowHeader className={cx(head, "w-full")} />
                <Table.Head id="type" label="Type" className={head} />
                <Table.Head id="date" label="Dato" className={numHead} />
                <Table.Head id="file" label="Rapport" className={numHead} />
            </Table.Header>
            <Table.Body items={calendarEvents}>
                {(r) => (
                    <Table.Row id={r.id}>
                        <Table.Cell {...instrumentCell(r.name, r.ticker)} />
                        <Table.Cell className="whitespace-nowrap">{r.type}</Table.Cell>
                        <Table.Cell className={numCell}>{r.date}</Table.Cell>
                        <Table.Cell className={numCell}>
                            {r.hasFile ? (
                                <span className="inline-flex">
                                    <ButtonUtility
                                        icon={Download}
                                        size="sm"
                                        color="tertiary"
                                        tooltip={`Last ned rapport fra ${r.name}`}
                                        href={`/filer/rapporter/${r.ticker}-${r.id}.pdf`}
                                    />
                                </span>
                            ) : (
                                "–"
                            )}
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </section>
);

/* ------------------------------------------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------------------------------------- */

/** Spans in the 6-column card grid: md is two columns, lg six (layout.md "Card grid"). */
const span = {
    third: "lg:col-span-2",
    half: "lg:col-span-3",
    twoThirds: "md:col-span-2 lg:col-span-4",
    full: "md:col-span-2 lg:col-span-6",
    /** Full width at md (wide tables), a third or half from lg. */
    thirdWide: "md:col-span-2 lg:col-span-2",
    halfWide: "md:col-span-2 lg:col-span-3",
};

/** Børs: the market overview page (Finansavisen). */
export const MarketOverviewPage = () => {
    const [isLive, setIsLive] = useState(false);
    const [market, setMarket] = useState<Set<AriaKey>>(new Set(["no"]));
    const [instrumentId, setInstrumentId] = useState("OSEBX");
    const [watchlist, setWatchlist] = useState<AriaKey>("hoved");

    const marketLabel = markets.find((m) => market.has(m.id))?.label ?? "Norge";
    const instrument = marketInstruments.find((m) => m.id === instrumentId) ?? marketInstruments[0];
    const index = marketInstruments.indexOf(instrument);
    const step = (by: number) => setInstrumentId(marketInstruments[(index + by + marketInstruments.length) % marketInstruments.length].id);

    return (
        <div className="min-h-dvh bg-secondary_alt">
            <SiteHeader
                brand="fa"
                className="sticky top-0 z-30"
                navigation={navigation}
                shortcuts={shortcuts}
                loginHref="/logg-inn"
                subscribeHref="/abonnement"
                onSearchPress={() => undefined}
            />

            <main className="mx-auto w-full max-w-[1376px] px-4 py-6 md:px-8">
                {/* 2. Real-time data banner */}
                <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-secondary bg-primary_alt p-4 sm:flex-row sm:items-center sm:justify-between md:px-5">
                    <div className="flex items-center gap-2">
                        <BadgeWithDot color="error" size="sm">
                            Sanntid
                        </BadgeWithDot>
                        <p className="text-sm text-secondary">Abonnenter har tilgang til sanntidsdata.</p>
                    </div>
                    <Toggle
                        size="sm"
                        label="Slå på sanntidsdata fra Oslo Børs"
                        hint={isLive ? "Kursene oppdateres fortløpende." : "Kursene er nå forsinket 15 minutter."}
                        isSelected={isLive}
                        onChange={setIsLive}
                    />
                </div>

                {/* 3. Market header */}
                <div className="mb-6 flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="text-display-sm font-semibold text-primary">{marketLabel}</h1>
                        <div className="max-w-full overflow-x-auto">
                            <ButtonGroup
                                aria-label="Marked"
                                size="sm"
                                selectedKeys={market}
                                onSelectionChange={(keys) => setMarket(keys)}
                                disallowEmptySelection
                            >
                                {markets.map((m) => (
                                    <ButtonGroupItem key={m.id} id={m.id} iconLeading={<m.flag data-icon aria-hidden className="size-5" />}>
                                        {m.label}
                                    </ButtonGroupItem>
                                ))}
                            </ButtonGroup>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <Button color="secondary" size="md" iconLeading={Search} aria-label="Finn instrument" />
                        <div className="flex items-center gap-2">
                            <Select
                                aria-label="Velg watchlist"
                                size="sm"
                                items={watchlists}
                                value={watchlist}
                                onChange={(k) => k !== null && setWatchlist(k)}
                                className="w-44"
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                            <Button color="secondary" size="md" iconLeading={ChevronLeft} aria-label="Forrige instrument" onPress={() => step(-1)} />
                            <Button color="secondary" size="md" iconLeading={ChevronRight} aria-label="Neste instrument" onPress={() => step(1)} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
                    <IndexChartCard instrument={instrument} isLive={isLive} className={cx(card, span.twoThirds)} />
                    <SectorsCard className={cx(card, span.thirdWide)} />

                    <MarketListCard selectedId={instrumentId} onSelect={setInstrumentId} className={cx(card, span.thirdWide)} />
                    <MoversCard id="card-winners" title="Vinnere" rows={winners} href="/bors/vinnere" className={cx(card, span.third)} />
                    <MoversCard id="card-losers" title="Tapere" rows={losers} href="/bors/tapere" className={cx(card, span.third)} />

                    <VideoCard className={cx(card, span.twoThirds)} />
                    <NewsCard className={cx(card, span.thirdWide)} />

                    <WatchlistCard watchlist={watchlist} onWatchlistChange={setWatchlist} className={cx(card, span.full)} />

                    <MostTradedCard className={cx(card, span.halfWide)} />
                    <UnusualVolumeCard className={cx(card, span.halfWide)} />

                    <AdSlot className={span.full} />

                    <ShortedCard className={cx(card, span.twoThirds)} />
                    <DividendsCard className={cx(card, span.thirdWide)} />

                    <ExtremesCard id="card-ath" title="Nye toppnoteringer" rows={allTimeHighs} className={cx(card, span.halfWide)} />
                    <ExtremesCard id="card-atl" title="Nye bunnoteringer" rows={allTimeLows} className={cx(card, span.halfWide)} />

                    <AdSlot className={span.full} />

                    <ReportsCard className={cx(card, span.third)} />
                    <EarningsCallsCard className={cx(card, span.third)} />
                    <PresentationsCard className={cx(card, span.thirdWide)} />

                    <CalendarCard className={cx(card, span.full)} />
                </div>
            </main>

            <SiteFooter
                brand="fa"
                links={footerLinks}
                publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, 0214 Oslo", "Sjefredaktør og adm. direktør: Trygve Hegnar"]}
                copyright="©2026 Hegnar Media AS"
                disclaimer="Børsdata levert av Millistream. Grafer fra TradingView."
                disclaimerHref="/om-data"
                socialLinks={[
                    { platform: "facebook", href: "https://facebook.com/finansavisen" },
                    { platform: "x", href: "https://x.com/finansavisen" },
                    { platform: "linkedin", href: "https://linkedin.com/company/finansavisen" },
                ]}
                contactHref="/kontakt-oss"
                appStoreHref="https://apps.apple.com/no/app/finansavisen"
                googlePlayHref="https://play.google.com/store/apps/details?id=no.finansavisen"
            />
        </div>
    );
};
