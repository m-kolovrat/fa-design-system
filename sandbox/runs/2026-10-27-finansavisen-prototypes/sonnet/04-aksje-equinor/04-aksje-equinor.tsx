"use client";

import { type FC, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, CalendarAdd, ChevronDown, Clock, Download, Lock, Play, Plus, Star, StarFilled } from "fa-icons";
import type { Key } from "react-aria";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Alert } from "@/components/application/alerts/alert";
import { ChartLegendContent, ChartTooltipContent } from "@/components/application/charts/charts-base";
import { SiteFooter } from "@/components/application/site-footer/site-footer";
import type { SiteNavItem } from "@/components/application/site-header/site-brands";
import { SiteHeader } from "@/components/application/site-header/site-header";
import type { TickerItem } from "@/components/application/site-header/ticker-bar";
import { Table } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { NativeSelect } from "@/components/base/select/select-native";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";

/* ------------------------------------------------------------------ */
/* Formatting (all placeholder data lives in this file)                */
/* ------------------------------------------------------------------ */

const nok = (v: number, digits = 2) => v.toLocaleString("nb-NO", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const signed = (v: number, digits = 2) =>
    v.toLocaleString("nb-NO", { minimumFractionDigits: digits, maximumFractionDigits: digits, signDisplay: "exceptZero" });
const changeClass = (v: number) => (v > 0 ? "text-success-primary" : v < 0 ? "text-error-primary" : "text-tertiary");

/** Stand-in for the "change value" pattern: signed, colored by direction, Norwegian format. */
const Change: FC<{ abs?: number; pct: number; className?: string }> = ({ abs, pct, className }) => (
    <span className={cx("tabular-nums", changeClass(pct), className)}>
        {abs !== undefined && <>{signed(abs)} </>}
        {abs !== undefined ? "(" : ""}
        {signed(pct)} %{abs !== undefined ? ")" : ""}
    </span>
);

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const PRICE = 444.3;
const CHANGE_ABS = -6.6;
const CHANGE_PCT = -1.46;

const periods = [
    { id: "1d", label: "1D", change: -1.46, points: 48 },
    { id: "5d", label: "5D", change: 0.92, points: 40 },
    { id: "6m", label: "6M", change: 8.21, points: 126 },
    { id: "ytd", label: "YTD", change: 14.63, points: 200 },
    { id: "1y", label: "1Å", change: -3.14, points: 250 },
    { id: "5y", label: "5Å", change: 61.4, points: 260 },
    { id: "max", label: "Maks", change: 310.7, points: 260 },
];

/** Deterministic random walk that ends exactly at the current price and starts at the period's change. */
const buildSeries = (periodId: string) => {
    const period = periods.find((p) => p.id === periodId)!;
    const n = period.points;
    const start = PRICE / (1 + period.change / 100);
    let seed = period.label.charCodeAt(0) * 97 + n;
    const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647 - 0.5;
    };
    const vol = Math.abs(PRICE - start) * 0.06 + PRICE * 0.004;
    const raw = Array.from({ length: n }, (_, i) => start + ((PRICE - start) * i) / (n - 1) + rand() * vol * 2);
    const offset = PRICE - raw[n - 1];
    return raw.map((v, i) => {
        const t = i / (n - 1);
        const close = Number((v + offset * (0.5 + 0.5 * t) + (i === n - 1 ? 0 : 0)).toFixed(2));
        let label: string;
        if (periodId === "1d") {
            const minutes = 9 * 60 + Math.round(t * (14 * 60 + 12 - 9 * 60));
            label = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
        } else {
            const days = { "5d": 7, "6m": 183, ytd: 300, "1y": 365, "5y": 1826, max: 7300 }[periodId]!;
            const d = new Date(2026, 9, 27);
            d.setDate(d.getDate() - Math.round((1 - t) * days));
            label = d.toLocaleDateString(
                "nb-NO",
                periodId === "5y" || periodId === "max" ? { month: "short", year: "numeric" } : { day: "numeric", month: "short" },
            );
        }
        return { label, close: i === n - 1 ? PRICE : close };
    });
};

const keyStats = [
    { label: "Åpne", value: "448,40" },
    { label: "Høy", value: "450,70" },
    { label: "Lav", value: "440,10" },
    { label: "Kjøp / salg", value: "444,30 / 444,40" },
    { label: "Volum", value: "1,08 M" },
    { label: "Omsetning", value: "480,77 M" },
    { label: "P/E", value: "12,59" },
];

const sections = [
    { id: "oversikt", label: "Oversikt", href: "#oversikt" },
    { id: "nyheter", label: "Nyheter", href: "#nyheter" },
    { id: "analyse", label: "Analyse", href: "#analyse" },
    { id: "regnskap", label: "Regnskap", href: "#regnskap" },
    { id: "forum", label: "Forum", href: "#forum" },
    { id: "profil", label: "Profil", href: "#profil" },
    { id: "bjellesauer", label: "Bjellesauer", href: "#bjellesauer" },
    { id: "topp50", label: "Topp 50 aksjonærer", href: "#topp-50" },
    { id: "historikk", label: "Historikk", href: "#historikk" },
    { id: "teknisk", label: "Teknisk analyse", href: "#teknisk-analyse" },
];

const newsFilters = ["Alle", "FA", "TDN", "Børsmeldinger", "Pressemeldinger"];

const news = [
    {
        id: "n1",
        source: "FA",
        time: "13:52",
        category: "FA",
        pluss: true,
        title: "Equinor-sjefen varsler mer kutt i fornybar før rapporten i morgen",
        excerpt: "Analytikerne venter svakere gassinntekter i tredje kvartal, men fokuset er på utbyttet og tilbakekjøpene.",
    },
    {
        id: "n2",
        source: "TDN",
        time: "12:31",
        category: "TDN",
        pluss: false,
        title: "Brent falt under 80 dollar: Equinor tynget av oljeprisen",
        excerpt: "Oljeselskapene trakk Oslo Børs ned i dag etter at Brent-prisen falt for fjerde dag på rad.",
    },
    {
        id: "n3",
        source: "OB",
        time: "10:05",
        category: "Børsmeldinger",
        pluss: false,
        title: "Equinor ASA: Meldepliktig handel i egne aksjer",
        excerpt: "Equinor har kjøpt tilbake 1 250 000 aksjer som del av det pågående tilbakekjøpsprogrammet.",
    },
    {
        id: "n4",
        source: "EQ",
        time: "08:00",
        category: "Pressemeldinger",
        pluss: false,
        title: "Equinor starter produksjon på Johan Castberg-feltet i Barentshavet",
        excerpt: "Feltet har en forventet produksjon på 220 000 fat per dag og ventes å gi stabile kontantstrømmer i mange år.",
    },
];

const analysts = [
    { id: "kjop", label: "Kjøp", count: 9 },
    { id: "hold", label: "Hold", count: 11 },
    { id: "selg", label: "Selg", count: 4 },
];
const MEDIAN_TARGET = 393.53;

const recommendations = [
    { id: "r1", broker: "DNB Carnegie", date: "24.10.", rec: "Hold", target: "410,00" },
    { id: "r2", broker: "Pareto Securities", date: "22.10.", rec: "Kjøp", target: "465,00" },
    { id: "r3", broker: "SEB", date: "20.10.", rec: "Selg", target: "360,00" },
    { id: "r4", broker: "Arctic Securities", date: "17.10.", rec: "Hold", target: "395,00" },
];
const recColor = { Kjøp: "success", Hold: "gray", Selg: "error" } as const;

const technicals = [
    { id: "sma50", name: "SMA 50", value: "451,22", signal: "Selg" },
    { id: "sma200", name: "SMA 200", value: "432,87", signal: "Kjøp" },
    { id: "rsi", name: "RSI (14)", value: "41,3", signal: "Kjøp" },
    { id: "macd", name: "MACD", value: "−2,14", signal: "Selg" },
];

const depth = [
    { id: "d1", bidVol: "12 450", bid: "444,30", ask: "444,40", askVol: "8 200" },
    { id: "d2", bidVol: "9 800", bid: "444,20", ask: "444,50", askVol: "15 310" },
    { id: "d3", bidVol: "21 000", bid: "444,10", ask: "444,60", askVol: "6 900" },
    { id: "d4", bidVol: "7 340", bid: "444,00", ask: "444,70", askVol: "11 050" },
    { id: "d5", bidVol: "18 600", bid: "443,90", ask: "444,80", askVol: "9 420" },
];

const keyFigures = [
    { label: "Direkteavkastning", value: "3,39 %", tip: "Utbytte siste 12 måneder delt på kursen" },
    { label: "P/E", value: "12,59" },
    { label: "Pris/bok", value: "1,92" },
    { label: "Markedsverdi", value: "1 128 mrd." },
    { label: "Utbytte per aksje", value: "15,07" },
    { label: "Beta", value: "0,74" },
];

const trades = [
    { id: "t1", time: "14:12:08", price: "444,30", vol: "1 200" },
    { id: "t2", time: "14:11:52", price: "444,40", vol: "350" },
    { id: "t3", time: "14:11:15", price: "444,30", vol: "4 800" },
    { id: "t4", time: "14:10:47", price: "444,20", vol: "620" },
    { id: "t5", time: "14:10:03", price: "444,50", vol: "2 000" },
];

const dividends = [
    { id: "u1", date: "14.08.2026", amount: "3,77", kind: "Ordinært" },
    { id: "u2", date: "14.05.2026", amount: "3,77", kind: "Ordinært" },
    { id: "u3", date: "14.05.2026", amount: "3,77", kind: "Ekstraordinært" },
    { id: "u4", date: "13.02.2026", amount: "3,76", kind: "Ordinært" },
];

const calendar = [
    { id: "c1", date: "28.10.2026", title: "Resultat 3. kvartal 2026" },
    { id: "c2", date: "11.02.2027", title: "Resultat 4. kvartal 2026" },
    { id: "c3", date: "05.05.2027", title: "Generalforsamling" },
];

const reports = [
    { id: "p1", title: "Kvartalsrapport 2. kvartal 2026", meta: "PDF · 2,4 MB · 30.07.2026" },
    { id: "p2", title: "Kvartalsrapport 1. kvartal 2026", meta: "PDF · 2,1 MB · 30.04.2026" },
    { id: "p3", title: "Årsrapport 2025", meta: "PDF · 18,7 MB · 11.02.2026" },
];

const calls = [
    { id: "e1", title: "Resultatpresentasjon 2. kvartal 2026", meta: "30.07.2026 · 58 min" },
    { id: "e2", title: "Resultatpresentasjon 1. kvartal 2026", meta: "30.04.2026 · 54 min" },
    { id: "e3", title: "Kapitalmarkedsdag 2026", meta: "12.02.2026 · 1 t 42 min" },
];

const financials = {
    year: [
        { label: "2021", revenue: 150.8, profit: 8.6 },
        { label: "2022", revenue: 149.0, profit: 28.7 },
        { label: "2023", revenue: 107.2, profit: 8.8 },
        { label: "2024", revenue: 106.5, profit: 7.5 },
        { label: "2025", revenue: 102.4, profit: 6.9 },
    ],
    quarter: [
        { label: "3K 25", revenue: 25.9, profit: 1.8 },
        { label: "4K 25", revenue: 26.4, profit: 1.5 },
        { label: "1K 26", revenue: 27.1, profit: 2.1 },
        { label: "2K 26", revenue: 25.2, profit: 1.7 },
    ],
};

const navigation: SiteNavItem[][] = [
    [
        { label: "Siste nytt", href: "/siste" },
        { label: "MittFa", href: "/mittfa" },
    ],
    [
        {
            label: "Børs",
            href: "/bors",
            current: true,
            items: [
                { label: "Børsoversikt", href: "/bors" },
                { label: "Aksjer", href: "/bors/aksjer" },
            ],
        },
        { label: "Makro", href: "/makro" },
        { label: "Meninger", href: "/meninger" },
    ],
];
const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors", current: true },
    { label: "Forum", href: "/forum" },
];
const ticker: TickerItem[] = [
    { label: "Oslo Børs", value: "1 412,86", change: "-0,71%", direction: "down", href: "/ticker/OSEBX" },
    { label: "Brent spot", value: "79,64", change: "-1,12%", direction: "down", href: "/ticker/BRENT" },
    { label: "USD/NOK", value: "10,92", change: "0,21%", direction: "up", href: "/ticker/USDNOK" },
];
const footerLinks: SiteNavItem[][] = [
    [
        { label: "eAvis", href: "/eavis" },
        { label: "Annonse", href: "/annonse" },
    ],
    [
        { label: "Personvernerklæring", href: "/personvern" },
        { label: "Vilkår", href: "/vilkar" },
    ],
];

/* ------------------------------------------------------------------ */
/* Page-local building blocks                                          */
/* ------------------------------------------------------------------ */

const card = "rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5";

/** Widget card stand-in (no library component yet): section, heading with optional single right slot. */
const WidgetCard: FC<{ id?: string; title: string; slot?: ReactNode; className?: string; children: ReactNode }> = ({
    id,
    title,
    slot,
    className,
    children,
}) => (
    <section aria-labelledby={id ? `${id}-title` : undefined} id={id} className={cx(card, "flex min-w-0 scroll-mt-20 flex-col", className)}>
        <header className="mb-3 flex min-h-9 items-center gap-3">
            <h2 id={id ? `${id}-title` : undefined} className="text-lg font-semibold text-primary">
                {title}
            </h2>
            {slot && <div className="ml-auto">{slot}</div>}
        </header>
        {children}
    </section>
);

const Stat: FC<{ label: string; children: ReactNode; className?: string }> = ({ label, children, className }) => (
    <div className={className}>
        <dt className="text-xs font-medium text-tertiary">{label}</dt>
        <dd className="mt-0.5 text-sm font-semibold whitespace-nowrap text-primary tabular-nums">{children}</dd>
    </div>
);

const Row: FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
    <div className="flex items-center justify-between gap-4 border-b border-secondary py-2.5 text-sm last:border-b-0">
        <dt className="text-tertiary">{label}</dt>
        <dd className="font-medium text-primary tabular-nums">{children}</dd>
    </div>
);

const PriceBlock: FC<{ size: "lg" | "sm" }> = ({ size }) => (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={cx("font-semibold text-primary tabular-nums", size === "lg" ? "text-display-lg" : "text-lg")}>{nok(PRICE)}</span>
        <span className="text-sm text-tertiary">NOK</span>
        <Change abs={CHANGE_ABS} pct={CHANGE_PCT} className={size === "lg" ? "text-md font-medium" : "text-sm font-medium"} />
    </div>
);

const chartText = "text-tertiary [&_.recharts-text]:text-xs";

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export const AksjeEquinor = () => {
    const isTablet = useBreakpoint("md");
    const [period, setPeriod] = useState<Set<Key>>(new Set(["1d"]));
    const periodId = String([...period][0] ?? "1d");
    const activePeriod = periods.find((p) => p.id === periodId)!;
    const series = useMemo(() => buildSeries(periodId), [periodId]);
    const lineColor = activePeriod.change < 0 ? "text-utility-error-600" : "text-utility-success-600";

    const [watch, setWatch] = useState<Set<Key>>(new Set());
    const isWatched = watch.size > 0;
    const [newsFilter, setNewsFilter] = useState<Set<Key>>(new Set(["Alle"]));
    const activeNews = String([...newsFilter][0] ?? "Alle");
    const [finView, setFinView] = useState<Set<Key>>(new Set(["year"]));
    const finId = String([...finView][0] ?? "year") as "year" | "quarter";
    const [section, setSection] = useState<Key>("oversikt");

    // The current price must always be at hand: a compact strip is pinned once the large price scrolls away.
    const priceRef = useRef<HTMLDivElement>(null);
    const [priceHidden, setPriceHidden] = useState(false);
    useEffect(() => {
        const el = priceRef.current;
        if (!el || typeof IntersectionObserver === "undefined") return;
        const observer = new IntersectionObserver(([entry]) => setPriceHidden(!entry.isIntersecting), { threshold: 0 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const visibleNews = news.filter((n) => activeNews === "Alle" || n.category === activeNews);

    return (
        <div className="min-h-dvh bg-secondary_alt">
            <SiteHeader brand="fa" navigation={navigation} shortcuts={shortcuts} tickerItems={ticker} homeHref="/" />

            {priceHidden && (
                <div className="fixed inset-x-0 top-0 z-40 border-b border-secondary bg-primary_alt px-4 py-2 md:px-8">
                    <div className="flex items-center gap-3">
                        <Badge color="brand" size="sm" type="pill-color">
                            EQNR
                        </Badge>
                        <PriceBlock size="sm" />
                        <Button
                            className="ml-auto"
                            size="sm"
                            color="secondary"
                            iconLeading={isWatched ? StarFilled : Star}
                            aria-label={isWatched ? "Equinor ligger i watchlist" : "Legg Equinor til i watchlist"}
                            onPress={() => setWatch(isWatched ? new Set() : new Set(["min"]))}
                        />
                    </div>
                </div>
            )}

            <main>
                {/* Header band */}
                <div className="border-b border-secondary bg-primary_alt">
                    <div className="mx-auto flex w-full flex-col gap-5 px-4 py-6 md:px-8">
                        <div className="flex flex-wrap items-start gap-4">
                            <AvatarLabelGroup
                                size="lg"
                                initials="EQ"
                                title={<h1 className="text-lg font-semibold text-primary">Equinor</h1>}
                                subtitle="Oslo Børs · Energi"
                            />
                            <Badge color="brand" size="sm" type="pill-color">
                                EQNR
                            </Badge>
                            <div className="ml-auto flex items-center gap-2">
                                <Dropdown.Root>
                                    <Button color="secondary" size="sm" iconLeading={isWatched ? StarFilled : Star} iconTrailing={ChevronDown}>
                                        {isWatched ? "I watchlist" : "Følg"}
                                    </Button>
                                    <Dropdown.Popover className="w-56">
                                        <Dropdown.Menu
                                            aria-label="Watchlister"
                                            selectionMode="multiple"
                                            selectedKeys={watch}
                                            onSelectionChange={(keys) => setWatch(new Set(keys as Set<Key>))}
                                        >
                                            <Dropdown.Item id="min">Min watchlist</Dropdown.Item>
                                            <Dropdown.Item id="olje">Olje og energi</Dropdown.Item>
                                            <Dropdown.Item id="utbytte">Utbytteaksjer</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown.Root>
                            </div>
                        </div>

                        <div ref={priceRef} className="flex flex-col gap-2">
                            <PriceBlock size="lg" />
                            <div className="flex flex-wrap items-center gap-2">
                                <BadgeWithDot color="error" size="sm" type="pill-color">
                                    Live
                                </BadgeWithDot>
                                <span className="text-xs text-tertiary">14:12 · Oslo Børs · NOK</span>
                            </div>
                        </div>

                        {/* Period selector (stand-in): label with the period's change under it from md */}
                        <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
                            <ButtonGroup aria-label="Periode" size="sm" selectedKeys={period} onSelectionChange={setPeriod} disallowEmptySelection>
                                {periods.map((p) => (
                                    <ButtonGroupItem key={p.id} id={p.id} aria-label={`${p.label}, ${signed(p.change)} prosent`}>
                                        <span className="flex flex-col items-center leading-tight">
                                            <span>{p.label}</span>
                                            <span className={cx("hidden text-xs tabular-nums md:block", changeClass(p.change))}>{signed(p.change, 1)} %</span>
                                        </span>
                                    </ButtonGroupItem>
                                ))}
                            </ButtonGroup>
                        </div>

                        <div>
                            <div className="flex h-64 flex-col md:h-72">
                                <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                                    <AreaChart data={series} className={chartText} margin={{ left: 0, right: 8 }}>
                                        <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                                        <XAxis
                                            dataKey="label"
                                            fill="currentColor"
                                            axisLine={false}
                                            tickLine={false}
                                            tickMargin={8}
                                            interval="preserveStartEnd"
                                            minTickGap={isTablet ? 56 : 48}
                                        />
                                        <YAxis
                                            hide={!isTablet}
                                            orientation="right"
                                            width={48}
                                            fill="currentColor"
                                            axisLine={false}
                                            tickLine={false}
                                            domain={["auto", "auto"]}
                                            tickFormatter={(v) => Number(v).toLocaleString("nb-NO", { maximumFractionDigits: 0 })}
                                        />
                                        <Tooltip
                                            content={<ChartTooltipContent />}
                                            formatter={(v) => `${nok(Number(v))} kr`}
                                            cursor={{ className: "stroke-utility-gray-300 stroke-2" }}
                                        />
                                        <Area
                                            dataKey="close"
                                            name="Equinor (EQNR)"
                                            type="monotone"
                                            isAnimationActive={false}
                                            className={lineColor}
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            fill="none"
                                            activeDot={{ className: "fill-bg-primary stroke-utility-gray-500 stroke-2" }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="mt-2 text-xs text-tertiary">
                                Equinor er {activePeriod.change < 0 ? "ned" : "opp"} {nok(Math.abs(activePeriod.change))} % siste{" "}
                                {activePeriod.label === "Maks" ? "tilgjengelige periode" : `periode (${activePeriod.label})`}. Kurser vises i NOK.
                            </p>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 lg:grid-cols-8">
                            {keyStats.map((s) => (
                                <Stat key={s.label} label={s.label}>
                                    {s.value}
                                </Stat>
                            ))}
                            <Stat label="Neste rapport">
                                <span className="flex items-center gap-1">
                                    28.10.2026
                                    <ButtonUtility icon={CalendarAdd} size="xs" color="tertiary" tooltip="Legg til i kalender" />
                                </span>
                            </Stat>
                        </dl>

                        {/* Section navigation */}
                        <Tabs selectedKey={section} onSelectionChange={setSection}>
                            <NativeSelect
                                aria-label="Velg område"
                                value={String(section)}
                                onChange={(e) => {
                                    setSection(e.target.value);
                                    window.location.hash = sections.find((s) => s.id === e.target.value)?.href ?? "";
                                }}
                                options={sections.map((s) => ({ label: s.label, value: s.id }))}
                                className="md:hidden"
                            />
                            <div className="overflow-x-auto max-md:hidden">
                                <Tabs.List type="underline" aria-label="Aksjeinformasjon for Equinor" items={sections}>
                                    {(s) => <Tabs.Item id={s.id} label={s.label} href={s.href} />}
                                </Tabs.List>
                            </div>
                        </Tabs>
                    </div>
                </div>

                {/* Card grid */}
                <div className="mx-auto flex w-full flex-col gap-6 px-4 py-6 md:px-8">
                    <Alert
                        variant="floating"
                        color="gray"
                        icon={Clock}
                        title="Du ser sanntidskurser fra Oslo Børs."
                        description="Uten sanntid er kursene forsinket 15 minutter. Noe av analysen under er forbeholdt abonnenter."
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
                        <WidgetCard
                            id="nyheter"
                            title="Siste nytt"
                            className="md:col-span-2 lg:col-span-4"
                            slot={
                                <Button href="#nyheter" color="link-color" size="sm">
                                    Se alle
                                </Button>
                            }
                        >
                            <div className="-mx-4 mb-2 overflow-x-auto px-4 md:mx-0 md:px-0">
                                <ButtonGroup
                                    aria-label="Filtrer nyheter"
                                    size="sm"
                                    selectedKeys={newsFilter}
                                    onSelectionChange={setNewsFilter}
                                    disallowEmptySelection
                                >
                                    {newsFilters.map((f) => (
                                        <ButtonGroupItem key={f} id={f}>
                                            {f}
                                        </ButtonGroupItem>
                                    ))}
                                </ButtonGroup>
                            </div>
                            {visibleNews.length === 0 ? (
                                <p className="py-6 text-sm text-tertiary">Ingen saker i denne kategorien i dag.</p>
                            ) : (
                                <ul>
                                    {visibleNews.map((n) => (
                                        <li key={n.id} className="flex gap-3 border-b border-secondary py-3 last:border-b-0">
                                            <Avatar size="sm" initials={n.source} rounded={false} alt="" />
                                            <div className="min-w-0">
                                                <p className="flex flex-wrap items-center gap-x-1.5 text-xs text-tertiary">
                                                    <span>{n.time}</span>·
                                                    <Badge color="brand" size="sm" type="pill-color">
                                                        EQNR
                                                    </Badge>
                                                    ·<span>{n.category}</span>
                                                    {n.pluss && <Lock className="size-3.5 text-fg-quaternary" aria-label="Pluss-artikkel" />}
                                                </p>
                                                <a
                                                    href="#nyheter"
                                                    className="mt-1 block rounded-xs text-sm font-semibold text-primary outline-focus-ring hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                >
                                                    {n.title}
                                                </a>
                                                <p className="mt-1 line-clamp-2 text-sm text-tertiary">{n.excerpt}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </WidgetCard>

                        <WidgetCard
                            id="konsensus"
                            title="Konsensus"
                            className="lg:col-span-2"
                            slot={<span className="text-xs text-tertiary">Levert av Finwire</span>}
                        >
                            <div className="rounded-xl bg-tertiary p-3">
                                <p className="text-xs font-medium text-tertiary">Median kursmål</p>
                                <p className="mt-0.5 text-display-xs font-semibold text-primary tabular-nums">{nok(MEDIAN_TARGET)} kr</p>
                                <p className="mt-0.5 text-xs">
                                    <Change pct={(MEDIAN_TARGET / PRICE - 1) * 100} /> <span className="text-tertiary">fra dagens kurs</span>
                                </p>
                            </div>
                            <ul className="mt-4 flex flex-col gap-3">
                                {analysts.map((a) => (
                                    <li key={a.id} className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-secondary">{a.label}</span>
                                        <ProgressBar min={0} max={24} value={a.count} labelPosition="right" valueFormatter={(v) => `${v} analytikere`} />
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-3 text-xs text-tertiary">24 analytikere har anbefalt aksjen de siste 90 dagene.</p>
                        </WidgetCard>

                        <WidgetCard
                            id="regnskap"
                            title="Resultat og omsetning"
                            className="lg:col-span-3"
                            slot={
                                <ButtonGroup aria-label="Visning" size="sm" selectedKeys={finView} onSelectionChange={setFinView} disallowEmptySelection>
                                    <ButtonGroupItem id="year">Årlig</ButtonGroupItem>
                                    <ButtonGroupItem id="quarter">Kvartal</ButtonGroupItem>
                                </ButtonGroup>
                            }
                        >
                            <div className="flex h-60 flex-col">
                                <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                                    <BarChart data={financials[finId]} className={chartText} margin={{ left: 0, right: 0 }}>
                                        <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                                        <Legend verticalAlign="top" align="right" content={<ChartLegendContent className="-translate-y-2" />} />
                                        <XAxis dataKey="label" fill="currentColor" axisLine={false} tickLine={false} tickMargin={8} />
                                        <YAxis
                                            width={36}
                                            fill="currentColor"
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(v) => Number(v).toLocaleString("nb-NO")}
                                        />
                                        <Tooltip
                                            content={<ChartTooltipContent />}
                                            formatter={(v) => `${nok(Number(v), 1)} mrd. USD`}
                                            cursor={{ className: "fill-utility-gray-200/20" }}
                                        />
                                        <Bar
                                            isAnimationActive={false}
                                            dataKey="revenue"
                                            name="Omsetning"
                                            className="text-utility-brand-600"
                                            fill="currentColor"
                                            maxBarSize={28}
                                            radius={[4, 4, 0, 0]}
                                        />
                                        <Bar
                                            isAnimationActive={false}
                                            dataKey="profit"
                                            name="Resultat"
                                            className="text-utility-brand-300"
                                            fill="currentColor"
                                            maxBarSize={28}
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="mt-2 text-xs text-tertiary">
                                Mrd. USD.{" "}
                                {finId === "year" ? "Omsetning 102,4 og resultat 6,9 mrd. i 2025." : "Omsetning 25,2 og resultat 1,7 mrd. i 2. kvartal 2026."}
                            </p>
                        </WidgetCard>

                        <WidgetCard
                            id="ordredybde"
                            title="Ordredybde"
                            className="lg:col-span-3"
                            slot={<span className="text-xs text-tertiary">Topp 5 nivåer</span>}
                        >
                            <Table aria-label="Ordredybde for Equinor" size="sm">
                                <Table.Header>
                                    <Table.Head id="bidVol" label="Kjøp, antall" isRowHeader />
                                    <Table.Head id="bid" label="Kjøp" className="text-right" />
                                    <Table.Head id="ask" label="Salg" className="text-right" />
                                    <Table.Head id="askVol" label="Salg, antall" className="text-right" />
                                </Table.Header>
                                <Table.Body items={depth}>
                                    {(d) => (
                                        <Table.Row id={d.id}>
                                            <Table.Cell className="tabular-nums">{d.bidVol}</Table.Cell>
                                            <Table.Cell className="text-right font-medium text-primary tabular-nums">{d.bid}</Table.Cell>
                                            <Table.Cell className="text-right font-medium text-primary tabular-nums">{d.ask}</Table.Cell>
                                            <Table.Cell className="text-right tabular-nums">{d.askVol}</Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </WidgetCard>

                        <WidgetCard
                            id="analyse"
                            title="Anbefalinger"
                            className="lg:col-span-3"
                            slot={
                                <Button href="#analyse" color="link-color" size="sm">
                                    Se alle
                                </Button>
                            }
                        >
                            <Table aria-label="Siste anbefalinger for Equinor" size="sm">
                                <Table.Header>
                                    <Table.Head id="broker" label="Megler" isRowHeader />
                                    <Table.Head id="rec" label="Anbefaling" />
                                    <Table.Head id="target" label="Kursmål" className="text-right" />
                                </Table.Header>
                                <Table.Body items={recommendations}>
                                    {(r) => (
                                        <Table.Row id={r.id}>
                                            <Table.Cell>
                                                <span className="block text-sm font-medium text-primary">{r.broker}</span>
                                                <span className="block text-xs text-tertiary">{r.date}</span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge size="sm" color={recColor[r.rec as keyof typeof recColor]}>
                                                    {r.rec}
                                                </Badge>
                                            </Table.Cell>
                                            <Table.Cell className="text-right tabular-nums">{r.target}</Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                            <Alert
                                className="mt-3"
                                color="brand"
                                icon={Lock}
                                title="Begrunnelsene er for abonnenter."
                                description="Bli abonnent for å lese hva meglerne mener om Equinor."
                                actions={
                                    <Button size="sm" color="link-color" href="/abonnement">
                                        Bli abonnent
                                    </Button>
                                }
                            />
                        </WidgetCard>

                        <WidgetCard
                            id="teknisk-analyse"
                            title="Tekniske indikatorer"
                            className="lg:col-span-3"
                            slot={
                                <Button href="#teknisk-analyse" color="link-color" size="sm">
                                    Teknisk analyse
                                </Button>
                            }
                        >
                            <div className="mb-3 flex items-center gap-2 text-sm text-tertiary">
                                Samlet signal:{" "}
                                <Badge size="sm" color="gray">
                                    Nøytral
                                </Badge>
                            </div>
                            <Table aria-label="Tekniske signaler for Equinor" size="sm">
                                <Table.Header>
                                    <Table.Head id="name" label="Indikator" isRowHeader />
                                    <Table.Head id="value" label="Verdi" className="text-right" />
                                    <Table.Head id="signal" label="Signal" className="text-right" />
                                </Table.Header>
                                <Table.Body items={technicals}>
                                    {(t) => (
                                        <Table.Row id={t.id}>
                                            <Table.Cell className="font-medium text-primary">{t.name}</Table.Cell>
                                            <Table.Cell className="text-right tabular-nums">{t.value}</Table.Cell>
                                            <Table.Cell className="text-right">
                                                <Badge size="sm" color={t.signal === "Kjøp" ? "success" : "error"}>
                                                    {t.signal.toUpperCase()}
                                                </Badge>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </WidgetCard>

                        <WidgetCard
                            title="Nøkkeltall"
                            className="lg:col-span-2"
                            slot={
                                <Button href="#regnskap" color="link-color" size="sm">
                                    Regnskap
                                </Button>
                            }
                        >
                            <dl>
                                {keyFigures.map((k) => (
                                    <Row key={k.label} label={k.label}>
                                        {k.value}
                                    </Row>
                                ))}
                            </dl>
                        </WidgetCard>

                        <WidgetCard title="Siste handler" className="lg:col-span-2" slot={<span className="text-xs text-tertiary">14:12</span>}>
                            <Table aria-label="Siste handler i Equinor" size="sm">
                                <Table.Header>
                                    <Table.Head id="time" label="Tid" isRowHeader />
                                    <Table.Head id="price" label="Kurs" className="text-right" />
                                    <Table.Head id="vol" label="Antall" className="text-right" />
                                </Table.Header>
                                <Table.Body items={trades}>
                                    {(t) => (
                                        <Table.Row id={t.id}>
                                            <Table.Cell className="tabular-nums">{t.time}</Table.Cell>
                                            <Table.Cell className="text-right font-medium text-primary tabular-nums">{t.price}</Table.Cell>
                                            <Table.Cell className="text-right tabular-nums">{t.vol}</Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </WidgetCard>

                        <WidgetCard title="Utbytte" className="lg:col-span-2" slot={<span className="text-xs text-tertiary">NOK per aksje</span>}>
                            <Table aria-label="Utbytte fra Equinor" size="sm">
                                <Table.Header>
                                    <Table.Head id="date" label="Dato" isRowHeader />
                                    <Table.Head id="kind" label="Type" />
                                    <Table.Head id="amount" label="Beløp" className="text-right" />
                                </Table.Header>
                                <Table.Body items={dividends}>
                                    {(d) => (
                                        <Table.Row id={d.id}>
                                            <Table.Cell className="tabular-nums">{d.date}</Table.Cell>
                                            <Table.Cell>{d.kind}</Table.Cell>
                                            <Table.Cell className="text-right font-medium text-primary tabular-nums">{d.amount}</Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </WidgetCard>

                        <WidgetCard title="Finanskalender" className="lg:col-span-2">
                            <ul>
                                {calendar.map((c) => (
                                    <li key={c.id} className="flex items-center gap-3 border-b border-secondary py-2.5 last:border-b-0">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-primary">{c.title}</p>
                                            <p className="text-xs text-tertiary tabular-nums">{c.date}</p>
                                        </div>
                                        <ButtonUtility
                                            className="ml-auto"
                                            icon={CalendarAdd}
                                            size="sm"
                                            color="tertiary"
                                            tooltip={`Legg til «${c.title}» i kalender`}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </WidgetCard>

                        <WidgetCard title="Rapporter" className="lg:col-span-2">
                            <ul>
                                {reports.map((r) => (
                                    <li key={r.id} className="flex items-center gap-3 border-b border-secondary py-2.5 last:border-b-0">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-primary">{r.title}</p>
                                            <p className="text-xs text-tertiary">{r.meta}</p>
                                        </div>
                                        <ButtonUtility className="ml-auto" icon={Download} size="sm" color="tertiary" tooltip={`Last ned ${r.title}`} />
                                    </li>
                                ))}
                            </ul>
                        </WidgetCard>

                        <WidgetCard title="Resultatpresentasjoner" className="lg:col-span-2">
                            <ul>
                                {calls.map((c) => (
                                    <li key={c.id} className="flex items-center gap-3 border-b border-secondary py-2.5 last:border-b-0">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-primary">{c.title}</p>
                                            <p className="text-xs text-tertiary">{c.meta}</p>
                                        </div>
                                        <ButtonUtility className="ml-auto" icon={Play} size="sm" color="tertiary" tooltip={`Spill av ${c.title}`} />
                                    </li>
                                ))}
                            </ul>
                        </WidgetCard>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button color="secondary" size="sm" iconLeading={Plus} href="#forum">
                            Åpne Equinor-forumet
                        </Button>
                        <Button color="secondary" size="sm" iconLeading={ArrowUp} href="#bjellesauer">
                            Se bjellesauer i Equinor
                        </Button>
                        <Button color="secondary" size="sm" iconLeading={ArrowDown} href="#topp-50">
                            Topp 50 aksjonærer
                        </Button>
                    </div>
                </div>
            </main>

            <SiteFooter
                brand="fa"
                links={footerLinks}
                publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, 0214 Oslo"]}
                copyright="©2026 Hegnar Media AS"
                disclaimer="Børsdata levert av Millistream. Kursene kan være forsinket."
                contactHref="/kontakt-oss"
                appStoreHref="/app"
                googlePlayHref="/app"
            />
        </div>
    );
};
