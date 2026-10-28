"use client";

import { type ReactNode, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Calendar, ChevronDown, ChevronRight, Download, Flame, GraphDown, GraphUp, Play, Search, Star, Tv, Wallet } from "fa-icons";
import type { Key } from "react-aria";
import type { SortDescriptor } from "react-aria-components";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { SiteFooter } from "@/components/application/site-footer/site-footer";
import type { SiteNavItem } from "@/components/application/site-header/site-brands";
import { SiteHeader } from "@/components/application/site-header/site-header";
import type { TickerItem } from "@/components/application/site-header/ticker-bar";
import { Table } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";

/* -------------------------------------------------------------------------------------------------
 * Formatting (Norwegian: space as thousands separator, comma as decimal, real minus sign)
 * ---------------------------------------------------------------------------------------------- */

const num = (v: number, digits = 2) => new Intl.NumberFormat("nb-NO", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(v);
const signed = (v: number, digits = 2) =>
    new Intl.NumberFormat("nb-NO", { minimumFractionDigits: digits, maximumFractionDigits: digits, signDisplay: "exceptZero" }).format(v);
const pct = (v: number) =>
    new Intl.NumberFormat("nb-NO", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: "exceptZero" }).format(v / 100);

/** Signed, colored change value (stand-in from page-patterns.md: no component yet). The sign is always printed. */
const Change = ({ value, absolute, className }: { value: number; absolute?: number; className?: string }) => (
    <span className={cx("tabular-nums", value > 0 && "text-success-primary", value < 0 && "text-error-primary", value === 0 && "text-tertiary", className)}>
        {absolute !== undefined && <>{signed(absolute)} </>}
        {absolute !== undefined ? `(${pct(value)})` : pct(value)}
    </span>
);

/* -------------------------------------------------------------------------------------------------
 * Page data (placeholder values, see notes)
 * ---------------------------------------------------------------------------------------------- */

const t = (label: string, value: number, change: number, href: string): TickerItem => ({
    label,
    value: num(value),
    change: `${change > 0 ? "+" : "−"}${num(Math.abs(change))}%`,
    direction: change >= 0 ? "up" : "down",
    href,
});

const tickerItems: TickerItem[] = [
    t("Oslo Børs", 2124.29, -0.04, "/ticker/OSEBX"),
    t("OBX", 1486.12, 0.11, "/ticker/OBX"),
    t("Brent spot", 81.42, -1.12, "/ticker/BRENT"),
    t("Dollar", 10.58, 0.27, "/ticker/USDNOK"),
    t("Euro", 11.71, 0.09, "/ticker/EURNOK"),
    t("US 10 ÅR", 4.12, -0.64, "/ticker/US10Y"),
    t("Bitcoin", 748210, 1.84, "/ticker/BTCNOK"),
];

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
                { label: "Krypto", href: "/krypto" },
                { label: "Renter", href: "/renter" },
                { label: "Fond", href: "/fond" },
                { label: "Kalender", href: "/kalender" },
                { label: "Rapporter", href: "/rapporter" },
            ],
        },
        { label: "Investorchat", href: "/investorchat" },
        { label: "Watchlist", href: "/watchlist" },
        { label: "Bjellesauer", href: "/bjellesauer" },
        { label: "Aksjer", href: "/aksjer" },
        { label: "Valuta", href: "/valuta" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors", current: true },
    { label: "Watchlist", href: "/watchlist" },
    { label: "Forum", href: "/forum" },
    { label: "Aksjer", href: "/aksjer" },
];

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
        { label: "Cookies", href: "/cookies" },
    ],
];

/* ---- Main index chart ---- */

type MarketId = "no" | "se" | "dk" | "us";
type PeriodId = "1d" | "5d" | "1m" | "6m" | "ytd" | "1y" | "5y";

const periods: { id: PeriodId; label: string; aria: string; points: number; days: number }[] = [
    { id: "1d", label: "1D", aria: "1 dag", points: 48, days: 0 },
    { id: "5d", label: "5D", aria: "5 dager", points: 40, days: 5 },
    { id: "1m", label: "1M", aria: "1 måned", points: 30, days: 30 },
    { id: "6m", label: "6M", aria: "6 måneder", points: 60, days: 182 },
    { id: "ytd", label: "YTD", aria: "hittil i år", points: 60, days: 300 },
    { id: "1y", label: "1Å", aria: "1 år", points: 70, days: 365 },
    { id: "5y", label: "5Å", aria: "5 år", points: 80, days: 1826 },
];

const markets: Record<MarketId, { label: string; name: string; last: number; abs: number; changes: Record<PeriodId, number>; seed: number }> = {
    no: {
        label: "Norge",
        name: "Hovedindeksen Oslo Børs",
        last: 2124.29,
        abs: -0.85,
        seed: 3,
        changes: { "1d": -0.04, "5d": 0.62, "1m": -1.35, "6m": 4.8, ytd: 7.92, "1y": 9.35, "5y": 48.2 },
    },
    se: {
        label: "Sverige",
        name: "OMXS30 Stockholm",
        last: 2541.17,
        abs: 7.83,
        seed: 11,
        changes: { "1d": 0.31, "5d": -0.4, "1m": 1.9, "6m": 6.2, ytd: 9.1, "1y": 12.4, "5y": 39.7 },
    },
    dk: {
        label: "Danmark",
        name: "OMXC25 København",
        last: 1962.4,
        abs: -4.35,
        seed: 21,
        changes: { "1d": -0.22, "5d": 0.18, "1m": -2.4, "6m": -5.1, ytd: -3.8, "1y": -1.2, "5y": 21.5 },
    },
    us: {
        label: "USA",
        name: "S&P 500",
        last: 6804.12,
        abs: 12.2,
        seed: 31,
        changes: { "1d": 0.18, "5d": 0.9, "1m": 2.7, "6m": 8.8, ytd: 14.3, "1y": 19.6, "5y": 82.4 },
    },
};

const random = (seed: number) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
};

const NOW = new Date("2026-10-27T14:10:00").getTime();

/** A repeatable random walk that starts at end / (1 + change) and ends exactly at `end`. */
const buildSeries = (market: MarketId, period: PeriodId) => {
    const m = markets[market];
    const p = periods.find((x) => x.id === period)!;
    const rnd = random(m.seed * 100 + periods.indexOf(p) * 7 + 1);
    const start = m.last / (1 + m.changes[period] / 100);
    const vol = period === "1d" ? 0.0016 : 0.012;
    let acc = 0;
    const walk = Array.from({ length: p.points }, () => (acc += (rnd() - 0.5) * 2));
    const endWalk = walk[walk.length - 1];
    const span = period === "1d" ? 5 * 3600 * 1000 + 10 * 60 * 1000 : p.days * 86400000;
    return walk.map((w, i) => {
        const f = i / (p.points - 1);
        const bridged = w - f * endWalk;
        return { t: NOW - span * (1 - f), value: start + (m.last - start) * f + bridged * vol * m.last * 0.6 };
    });
};

/* ---- Instruments ---- */

interface Quote {
    id: string;
    name: string;
    last: number;
    change: number;
    ytd: number;
    digits?: number;
    unit?: string;
}

const instruments: Quote[] = [
    { id: "OBX", name: "OBX", last: 1486.12, change: 0.11, ytd: 8.4 },
    { id: "DJI", name: "Dow Jones", last: 46280.4, change: 0.06, ytd: 9.7 },
    { id: "SPX", name: "S&P 500", last: 6804.12, change: 0.18, ytd: 14.3 },
    { id: "IXIC", name: "NASDAQ", last: 23140.77, change: 0.35, ytd: 19.8 },
    { id: "BRENT", name: "Brent (USD)", last: 81.42, change: -1.12, ytd: -4.1 },
    { id: "XAU", name: "Gull (USD)", last: 3412.6, change: 0.48, ytd: 29.6 },
    { id: "EURNOK", name: "EURNOK", last: 11.7142, change: 0.09, ytd: 0.6, digits: 4 },
    { id: "USDNOK", name: "USDNOK", last: 10.5836, change: 0.27, ytd: -6.2, digits: 4 },
    { id: "BTC", name: "Bitcoin (NOK)", last: 748210, change: 1.84, ytd: 41.2, digits: 0 },
    { id: "US10Y", name: "US 10Y (%)", last: 4.12, change: -0.64, ytd: -2.9 },
    { id: "VIX", name: "VIX", last: 16.8, change: -3.2, ytd: -11.0 },
];

interface Stock {
    id: string;
    ticker: string;
    name: string;
    last: number;
    change: number;
    turnover?: number;
}

const winners: Stock[] = [
    { id: "w1", ticker: "TECH", name: "Techstep", last: 3.12, change: 15.62 },
    { id: "w2", ticker: "KIT", name: "Kitron", last: 54.6, change: 8.74 },
    { id: "w3", ticker: "NOD", name: "Nordic Semiconductor", last: 142.3, change: 6.11 },
    { id: "w4", ticker: "ELMRA", name: "Elmera Group", last: 38.95, change: 4.82 },
    { id: "w5", ticker: "VOW", name: "Vow", last: 7.46, change: 4.2 },
];

const losers: Stock[] = [
    { id: "l1", ticker: "PROXI", name: "Proximar Seafood", last: 0.41, change: -89.19 },
    { id: "l2", ticker: "AKH", name: "Aker Horizons", last: 1.18, change: -9.31 },
    { id: "l3", ticker: "HPUR", name: "Hexagon Purus", last: 6.92, change: -7.4 },
    { id: "l4", ticker: "OBSRV", name: "Observe Medical", last: 0.27, change: -6.85 },
    { id: "l5", ticker: "SATS", name: "SATS", last: 31.5, change: -5.12 },
];

const mostTraded: Stock[] = [
    { id: "t1", ticker: "EQNR", name: "Equinor", last: 261.8, change: 0.46, turnover: 812.4 },
    { id: "t2", ticker: "DNB", name: "DNB Bank", last: 238.5, change: -0.31, turnover: 534.9 },
    { id: "t3", ticker: "NHY", name: "Norsk Hydro", last: 59.24, change: 1.12, turnover: 391.7 },
    { id: "t4", ticker: "MOWI", name: "Mowi", last: 176.9, change: -0.78, turnover: 288.3 },
    { id: "t5", ticker: "YAR", name: "Yara International", last: 342.1, change: 0.9, turnover: 241.6 },
];

const hotStocks = [
    { id: "h1", ticker: "TECH", name: "Techstep", turnover: 48.2, factor: 12.4 },
    { id: "h2", ticker: "KIT", name: "Kitron", turnover: 61.7, factor: 5.8 },
    { id: "h3", ticker: "PROXI", name: "Proximar Seafood", turnover: 22.9, factor: 31.0 },
    { id: "h4", ticker: "ELMRA", name: "Elmera Group", turnover: 37.4, factor: 3.6 },
];

const shorted = [
    { id: "s1", ticker: "AKH", name: "Aker Horizons", share: 7.84, value: 142.6, dtc: 9.2 },
    { id: "s2", ticker: "HPUR", name: "Hexagon Purus", share: 6.31, value: 98.4, dtc: 12.7 },
    { id: "s3", ticker: "NEL", name: "Nel", share: 5.92, value: 276.1, dtc: 4.1 },
    { id: "s4", ticker: "TOM", name: "Tomra Systems", share: 4.77, value: 812.5, dtc: 3.3 },
    { id: "s5", ticker: "AUTO", name: "Autostore", share: 4.12, value: 355.9, dtc: 5.6 },
    { id: "s6", ticker: "SATS", name: "SATS", share: 3.58, value: 168.2, dtc: 8.0 },
];

const allTimeHighs = [
    { id: "a1", ticker: "KOG", name: "Kongsberg Gruppen", last: 412.6 },
    { id: "a2", ticker: "GJF", name: "Gjensidige", last: 231.4 },
    { id: "a3", ticker: "SALM", name: "SalMar", last: 618.0 },
];
const allTimeLows = [
    { id: "b1", ticker: "PROXI", name: "Proximar Seafood", last: 0.41 },
    { id: "b2", ticker: "OBSRV", name: "Observe Medical", last: 0.27 },
];

const sectors = [
    { name: "Energi", change: 0.52 },
    { name: "Sjømat", change: -0.94 },
    { name: "Finans", change: -0.18 },
    { name: "Shipping", change: 1.37 },
    { name: "Industri", change: 0.74 },
    { name: "Teknologi", change: 2.41 },
    { name: "Kraft og fornybar", change: -1.62 },
    { name: "Eiendom", change: 0.0 },
];

const dividends = [
    { id: "d1", date: "29. okt.", ticker: "SPOL", name: "Sparebank 1 Østlandet", dps: 3.5 },
    { id: "d2", date: "30. okt.", ticker: "PARB", name: "Pareto Bank", dps: 1.1 },
    { id: "d3", date: "3. nov.", ticker: "MING", name: "SpareBank 1 SMN", dps: 4.0 },
    { id: "d4", date: "5. nov.", ticker: "SB1NO", name: "SpareBank 1 Sør-Norge", dps: 2.75 },
    { id: "d5", date: "7. nov.", ticker: "GJF", name: "Gjensidige", dps: 4.5 },
];

const calendar = [
    { day: "I dag", items: [{ time: "15:00", who: "Pexip", what: "Kvartalsrapport Q3" }] },
    {
        day: "Onsdag 28. okt.",
        items: [
            { time: "07:00", who: "Aker BP", what: "Kvartalsrapport Q3" },
            { time: "07:00", who: "Borr Drilling", what: "Kvartalsrapport Q3" },
            { time: "10:00", who: "Norges Bank", what: "Rentemøte" },
        ],
    },
    {
        day: "Torsdag 29. okt.",
        items: [
            { time: "07:00", who: "DNB", what: "Kvartalsrapport Q3" },
            { time: "07:00", who: "Orkla", what: "Kvartalsrapport Q3" },
        ],
    },
];

const reports = [
    { id: "r1", name: "Aker BP", meta: "Kvartalsrapport Q3 2026 · 28. okt.", initials: "AK" },
    { id: "r2", name: "Telenor", meta: "Kvartalsrapport Q3 2026 · 22. okt.", initials: "TE" },
    { id: "r3", name: "Equinor", meta: "Kvartalsrapport Q3 2026 · 22. okt.", initials: "EQ" },
    { id: "r4", name: "Norsk Hydro", meta: "Kvartalsrapport Q3 2026 · 21. okt.", initials: "NH" },
];

const webcasts = [
    { id: "c1", name: "Pexip", meta: "Resultatpresentasjon · I dag 15:30", initials: "PX" },
    { id: "c2", name: "Aker BP", meta: "Resultatpresentasjon · 28. okt. 09:00", initials: "AK" },
    { id: "c3", name: "DNB", meta: "Resultatpresentasjon · 29. okt. 09:30", initials: "DN" },
    { id: "c4", name: "Orkla", meta: "Resultatpresentasjon · 29. okt. 10:00", initials: "OR" },
];

const watchlist = [
    { id: "p1", ticker: "EQNR", name: "Equinor", shares: 1200, last: 261.8, change: 0.46 },
    { id: "p2", ticker: "DNB", name: "DNB Bank", shares: 800, last: 238.5, change: -0.31 },
    { id: "p3", ticker: "KOG", name: "Kongsberg Gruppen", shares: 150, last: 412.6, change: 2.18 },
    { id: "p4", ticker: "NHY", name: "Norsk Hydro", shares: 2000, last: 59.24, change: 1.12 },
];

type Source = "FA" | "TDN" | "Børsmeldinger" | "Pressemeldinger";
const news: { id: string; source: Source; time: string; ticker: string; category: string; title: string; excerpt: string }[] = [
    {
        id: "n1",
        source: "FA",
        time: "14:02",
        ticker: "TECH",
        category: "Oppgang",
        title: "Techstep til værs etter ny rammeavtale med forsvaret",
        excerpt: "Aksjen har steget kraftig siden åpning, med omsetning mer enn tolv ganger normalt. Analytikerne er delt i synet på verdsettelsen.",
    },
    {
        id: "n2",
        source: "TDN",
        time: "13:48",
        ticker: "NHY",
        category: "Metaller",
        title: "Hydro-sjefen: Aluminiumsprisen holder seg høy ut året",
        excerpt: "Lagrene i Europa er lave og etterspørselen fra bilindustrien tar seg opp, ifølge konsernsjefen.",
    },
    {
        id: "n3",
        source: "Børsmeldinger",
        time: "13:31",
        ticker: "PROXI",
        category: "Børsmelding",
        title: "Proximar Seafood: Melding om endring i driftsplan",
        excerpt: "Selskapet opplyser at produksjonen settes på pause i påvente av avklaring med långiverne.",
    },
    {
        id: "n4",
        source: "FA",
        time: "13:12",
        ticker: "EQNR",
        category: "Olje",
        title: "Equinor henter inn 1,2 milliarder kroner i ny gassavtale",
        excerpt: "Avtalen gjelder leveranser til Tyskland fra 2028 og er den største siden i fjor.",
    },
    {
        id: "n5",
        source: "Pressemeldinger",
        time: "12:55",
        ticker: "KOG",
        category: "Pressemelding",
        title: "Kongsberg Gruppen vinner kontrakt for 2,4 milliarder kroner",
        excerpt: "Kontrakten omfatter levering av missilsystemer til en europeisk kunde og går over seks år.",
    },
    {
        id: "n6",
        source: "TDN",
        time: "12:20",
        ticker: "DNB",
        category: "Bank",
        title: "DNB venter flat rentenetto i fjerde kvartal",
        excerpt: "Analytikerne i Pareto og Carnegie har justert ned forventningene noe før torsdagens regnskap.",
    },
    {
        id: "n7",
        source: "FA",
        time: "11:47",
        ticker: "MOWI",
        category: "Sjømat",
        title: "Laksprisen faller for femte uke på rad",
        excerpt: "Spotprisen er nå under 70 kroner kiloen, og Mowi-aksjen følger etter ned.",
    },
];

const sourceFilters: { id: "all" | Source | "watch"; label: string }[] = [
    { id: "all", label: "Alle" },
    { id: "FA", label: "FA" },
    { id: "TDN", label: "TDN" },
    { id: "Børsmeldinger", label: "Børsmeldinger" },
    { id: "Pressemeldinger", label: "Pressemeldinger" },
    { id: "watch", label: "Min watchlist" },
];

/* -------------------------------------------------------------------------------------------------
 * Page building blocks
 * ---------------------------------------------------------------------------------------------- */

const card = "rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5";
const stockLink = "flex items-center gap-2 rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2";

/** Widget card (stand-in from page-patterns.md: no component yet). */
const WidgetCard = ({
    title,
    icon,
    iconColor = "brand",
    href,
    linkLabel,
    meta,
    className,
    children,
}: {
    title: string;
    icon: Parameters<typeof FeaturedIcon>[0]["icon"];
    iconColor?: "brand" | "success" | "error" | "gray";
    href?: string;
    linkLabel?: string;
    meta?: string;
    className?: string;
    children: ReactNode;
}) => {
    const id = `card-${title.toLowerCase().replace(/[^a-zæøå0-9]+/g, "-")}`;
    return (
        <section aria-labelledby={id} className={cx(card, "flex min-w-0 flex-col", className)}>
            <header className="mb-3 flex items-center gap-3">
                <FeaturedIcon icon={icon} color={iconColor} theme="light" size="sm" />
                <div className="min-w-0">
                    <h2 id={id} className="text-lg font-semibold text-primary">
                        {title}
                    </h2>
                    {meta && <p className="text-xs text-tertiary">{meta}</p>}
                </div>
                {href && <ButtonUtility icon={ChevronRight} href={href} tooltip={linkLabel ?? `Se alle ${title.toLowerCase()}`} className="ml-auto" />}
            </header>
            {children}
        </section>
    );
};

const TickerLink = ({ ticker, name, showName = true }: { ticker: string; name?: string; showName?: boolean }) => (
    <a href={`/aksje/${ticker}`} className={stockLink}>
        <Badge color="brand" size="sm" type="pill-color">
            {ticker}
        </Badge>
        {name && showName && <span className="hidden truncate text-sm font-medium text-primary md:inline">{name}</span>}
    </a>
);

interface Column<T> {
    id: string;
    label: string;
    tooltip?: string;
    right?: boolean;
    hideBelowMd?: boolean;
    sort?: (row: T) => number;
    cell: (row: T) => ReactNode;
}

/** A compact sortable table inside a card. The table bleeds to the card edge so its header band is flush. */
const DataTable = <T extends { id: string }>({
    label,
    rows,
    columns,
    defaultSort,
}: {
    label: string;
    rows: T[];
    columns: Column<T>[];
    defaultSort?: SortDescriptor;
}) => {
    const [sort, setSort] = useState<SortDescriptor | undefined>(defaultSort);
    const sorted = useMemo(() => {
        const col = columns.find((c) => c.id === sort?.column);
        if (!col?.sort) return rows;
        const fn = col.sort;
        return [...rows].sort((a, b) => (sort?.direction === "descending" ? fn(b) - fn(a) : fn(a) - fn(b)));
    }, [rows, columns, sort]);

    return (
        <div className="-mx-4 -mb-4 md:-mx-5 md:-mb-5">
            <Table aria-label={label} size="sm" sortDescriptor={sort} onSortChange={setSort}>
                <Table.Header>
                    {columns.map((c, i) => (
                        <Table.Head
                            key={c.id}
                            id={c.id}
                            label={c.label}
                            tooltip={c.tooltip}
                            isRowHeader={i === 0}
                            allowsSorting={!!c.sort}
                            className={cx(c.right && "[&>div]:justify-end", c.hideBelowMd && "hidden md:table-cell")}
                        />
                    ))}
                </Table.Header>
                <Table.Body items={sorted}>
                    {(row) => (
                        <Table.Row id={row.id}>
                            {columns.map((c) => (
                                <Table.Cell key={c.id} className={cx(c.right && "text-right tabular-nums", c.hideBelowMd && "hidden md:table-cell")}>
                                    {c.cell(row)}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    );
};

const stockColumns = (opts: { loggedIn: boolean; turnover?: boolean }): Column<Stock>[] => [
    { id: "ticker", label: "Aksje", sort: undefined, cell: (s) => <TickerLink ticker={s.ticker} name={s.name} /> },
    { id: "last", label: "Siste", right: true, sort: (s) => s.last, cell: (s) => num(s.last) },
    { id: "change", label: "Endring", right: true, sort: (s) => s.change, cell: (s) => <Change value={s.change} /> },
    ...(opts.turnover
        ? [
              {
                  id: "turnover",
                  label: "Omsatt (MNOK)",
                  right: true,
                  hideBelowMd: true,
                  sort: (s: Stock) => s.turnover ?? 0,
                  cell: (s: Stock) => num(s.turnover ?? 0, 1),
              } satisfies Column<Stock>,
          ]
        : []),
    ...(opts.loggedIn
        ? [
              {
                  id: "watch",
                  label: "Legg til",
                  right: true,
                  cell: (s: Stock) => <ButtonUtility icon={Star} size="xs" color="tertiary" tooltip={`Legg til ${s.name} i watchlist`} />,
              } satisfies Column<Stock>,
          ]
        : []),
];

/* -------------------------------------------------------------------------------------------------
 * Cards
 * ---------------------------------------------------------------------------------------------- */

const IndexCard = ({ loggedIn }: { loggedIn: boolean }) => {
    const [market, setMarket] = useState<Set<Key>>(new Set(["no"]));
    const [period, setPeriod] = useState<Set<Key>>(new Set(["1d"]));
    const marketId = ([...market][0] ?? "no") as MarketId;
    const periodId = ([...period][0] ?? "1d") as PeriodId;
    const m = markets[marketId];
    const periodChange = m.changes[periodId];
    const data = useMemo(() => buildSeries(marketId, periodId), [marketId, periodId]);
    const isDesktop = useBreakpoint("lg");
    const periodMeta = periods.find((p) => p.id === periodId)!;
    const up = periodChange >= 0;

    const tickFormat = (v: number) =>
        periodId === "1d"
            ? new Date(v).toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit" })
            : periodMeta.days <= 40
              ? new Date(v).toLocaleDateString("nb-NO", { day: "numeric", month: "short" })
              : new Date(v).toLocaleDateString("nb-NO", { month: "short", year: "2-digit" });

    return (
        <section aria-labelledby="card-hovedindeks" className={cx(card, "min-w-0 lg:col-span-4")}>
            <div className="flex flex-wrap items-center gap-3">
                <ButtonGroup aria-label="Marked" size="sm" selectedKeys={market} onSelectionChange={setMarket} disallowEmptySelection>
                    {(Object.keys(markets) as MarketId[]).map((id) => (
                        <ButtonGroupItem key={id} id={id}>
                            {markets[id].label}
                        </ButtonGroupItem>
                    ))}
                </ButtonGroup>
                <div className="ml-auto flex items-center gap-2 text-xs text-tertiary">
                    {marketId === "no" && loggedIn ? (
                        <>
                            <BadgeWithDot color="error" size="sm" type="color">
                                Live
                            </BadgeWithDot>
                            <span>14:10</span>
                        </>
                    ) : (
                        <span>Kurser forsinket 15 min · 14:10</span>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <h2 id="card-hovedindeks" className="text-sm font-medium text-tertiary">
                    {m.name}
                </h2>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-display-sm font-semibold text-primary tabular-nums">{num(m.last)}</p>
                    <Change value={markets[marketId].changes["1d"]} absolute={m.abs} className="text-md font-medium" />
                </div>
                <p className="mt-1 text-sm text-tertiary">
                    Siste {periodMeta.aria}: <Change value={periodChange} className="font-medium" />
                </p>
            </div>

            <div className="mt-4 h-60">
                <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                    <AreaChart data={data} margin={{ left: 0, right: 8 }} className="text-tertiary [&_.recharts-text]:text-xs">
                        <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                        <XAxis
                            dataKey="t"
                            type="number"
                            scale="time"
                            domain={["dataMin", "dataMax"]}
                            fill="currentColor"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={tickFormat}
                            minTickGap={48}
                        />
                        {isDesktop && (
                            <YAxis
                                orientation="right"
                                domain={["auto", "auto"]}
                                width={64}
                                fill="currentColor"
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => num(Number(v), 0)}
                            />
                        )}
                        {!isDesktop && <YAxis hide domain={["auto", "auto"]} />}
                        <Tooltip
                            content={<ChartTooltipContent />}
                            formatter={(v) => num(Number(v))}
                            labelFormatter={(v) =>
                                periodId === "1d"
                                    ? new Date(Number(v)).toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit" })
                                    : new Date(Number(v)).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })
                            }
                            cursor={{ className: up ? "stroke-utility-success-600 stroke-2" : "stroke-utility-error-600 stroke-2" }}
                        />
                        <Area
                            dataKey="value"
                            name={m.name}
                            type="monotone"
                            isAnimationActive={false}
                            className={up ? "text-utility-success-600" : "text-utility-error-600"}
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            activeDot={{ className: cx("fill-bg-primary stroke-2", up ? "stroke-utility-success-600" : "stroke-utility-error-600") }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 overflow-x-auto">
                <ButtonGroup aria-label="Periode" size="sm" selectedKeys={period} onSelectionChange={setPeriod} disallowEmptySelection>
                    {periods.map((p) => (
                        <ButtonGroupItem key={p.id} id={p.id} aria-label={p.aria}>
                            {p.label}
                        </ButtonGroupItem>
                    ))}
                </ButtonGroup>
            </div>
        </section>
    );
};

const WatchlistCard = ({ loggedIn }: { loggedIn: boolean }) => {
    const total = watchlist.reduce((s, w) => s + w.shares * w.last, 0);
    const todayAbs = watchlist.reduce((s, w) => s + w.shares * w.last * (w.change / 100), 0);
    const todayPct = (todayAbs / (total - todayAbs)) * 100;

    return (
        <WidgetCard title="Min watchlist" icon={Star} href={loggedIn ? "/watchlist" : undefined} linkLabel="Åpne watchlist" className="lg:col-span-2">
            {loggedIn ? (
                <>
                    <Dropdown.Root>
                        <Button color="secondary" size="sm" iconTrailing={ChevronDown} className="self-start">
                            Langsiktig
                        </Button>
                        <Dropdown.Popover className="w-56">
                            <Dropdown.Menu>
                                <Dropdown.Item id="long">Langsiktig</Dropdown.Item>
                                <Dropdown.Item id="trading">Trading</Dropdown.Item>
                                <Dropdown.Separator />
                                <Dropdown.Item id="new" icon={Wallet}>
                                    Ny watchlist
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>
                    <dl className="mt-4 grid grid-cols-2 gap-4 rounded-xl bg-tertiary p-3">
                        <div>
                            <dt className="text-xs font-medium text-tertiary">Porteføljeverdi</dt>
                            <dd className="mt-1 text-display-xs font-semibold text-primary tabular-nums">{num(total, 0)} kr</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-medium text-tertiary">Endring i dag</dt>
                            <dd className="mt-1 text-display-xs font-semibold tabular-nums">
                                <Change value={todayPct} />
                                <span className="block text-sm font-medium text-tertiary">
                                    <Change value={todayAbs} className="text-sm" />
                                </span>
                            </dd>
                        </div>
                    </dl>
                    <ul className="mt-2">
                        {watchlist.map((w) => (
                            <li key={w.id} className="flex items-center gap-3 border-b border-secondary py-3 last:border-b-0">
                                <TickerLink ticker={w.ticker} />
                                <span className="min-w-0 flex-1 truncate text-sm text-tertiary">{w.name}</span>
                                <span className="text-sm text-primary tabular-nums">{num(w.last)}</span>
                                <Change value={w.change} className="w-20 text-right text-sm" />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <EmptyState
                    icon={Star}
                    title="Lag din egen watchlist"
                    description="Logg inn for å følge aksjene dine og se porteføljeverdi og dagens endring her. Det er helt gratis."
                    primaryAction={
                        <Button size="md" href="/logg-inn">
                            Logg inn
                        </Button>
                    }
                    className="py-6"
                />
            )}
        </WidgetCard>
    );
};

const MarketsCard = () => {
    const columns: Column<Quote>[] = [
        {
            id: "name",
            label: "Navn",
            cell: (q) => (
                <a href={`/ticker/${q.id}`} className={cx(stockLink, "text-sm font-medium text-primary")}>
                    {q.name}
                </a>
            ),
        },
        { id: "last", label: "Siste", right: true, sort: (q) => q.last, cell: (q) => num(q.last, q.digits ?? 2) },
        { id: "change", label: "Endring", right: true, sort: (q) => q.change, cell: (q) => <Change value={q.change} /> },
        { id: "ytd", label: "I år", right: true, hideBelowMd: true, sort: (q) => q.ytd, cell: (q) => <Change value={q.ytd} /> },
    ];
    return (
        <WidgetCard
            title="Indekser, råvarer og valuta"
            icon={GraphUp}
            href="/bors/markeder"
            linkLabel="Se alle markeder"
            meta="Forsinket 15 min"
            className="lg:col-span-4"
        >
            <DataTable label="Indekser, råvarer og valuta" rows={instruments} columns={columns} />
        </WidgetCard>
    );
};

const TvCard = () => (
    <WidgetCard title="Børsmorgen" icon={Tv} href="/tv/borsmorgen" linkLabel="Se alle sendinger">
        {/* No video player component exists; a poster inset with a play button stands in. */}
        <div className="flex aspect-video flex-col justify-between rounded-xl bg-tertiary p-3">
            <BadgeWithDot color="error" size="sm" type="color" className="self-start">
                Live
            </BadgeWithDot>
            <div className="flex items-end justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-primary">Børsmorgen med Hanne Skaar</p>
                    <p className="text-xs text-tertiary">Sendes direkte hverdager 08:30</p>
                </div>
                <Button size="sm" iconLeading={Play} href="/tv/borsmorgen">
                    Se live
                </Button>
            </div>
        </div>
    </WidgetCard>
);

const SectorsCard = () => (
    <WidgetCard title="Sektorer" icon={Flame} href="/bors/sektorer" linkLabel="Se alle sektorer" meta="Endring i dag">
        <dl>
            {sectors.map((s) => (
                <div key={s.name} className="flex items-center justify-between border-b border-secondary py-2.5 text-sm last:border-b-0">
                    <dt className="text-tertiary">{s.name}</dt>
                    <dd>
                        <Change value={s.change} className="font-medium" />
                    </dd>
                </div>
            ))}
        </dl>
    </WidgetCard>
);

const NewsCard = ({ loggedIn }: { loggedIn: boolean }) => {
    const [filter, setFilter] = useState<Set<Key>>(new Set(["all"]));
    const f = ([...filter][0] ?? "all") as (typeof sourceFilters)[number]["id"];
    const watchTickers = watchlist.map((w) => w.ticker);
    const visible = news.filter((n) => (f === "all" ? true : f === "watch" ? watchTickers.includes(n.ticker) : n.source === f));

    return (
        <WidgetCard title="Børsnyheter" icon={Tv} href="/siste" linkLabel="Se alle nyheter" className="lg:col-span-4">
            <div className="mb-2 overflow-x-auto pb-1">
                <ButtonGroup aria-label="Kilde" size="sm" selectedKeys={filter} onSelectionChange={setFilter} disallowEmptySelection>
                    {sourceFilters.map((s) => (
                        <ButtonGroupItem key={s.id} id={s.id} isDisabled={s.id === "watch" && !loggedIn}>
                            {s.label}
                        </ButtonGroupItem>
                    ))}
                </ButtonGroup>
            </div>
            {!loggedIn && <p className="mb-2 text-xs text-tertiary">Logg inn for å filtrere på aksjene i din watchlist.</p>}
            {visible.length === 0 ? (
                <EmptyState
                    icon={Search}
                    title="Ingen nyheter fra denne kilden akkurat nå"
                    description="Prøv en annen kilde eller velg Alle."
                    className="py-6"
                />
            ) : (
                <ul>
                    {visible.map((n) => (
                        <li key={n.id} className="flex gap-3 border-b border-secondary py-3 last:border-b-0">
                            <Avatar size="sm" initials={n.source.slice(0, 2).toUpperCase()} alt="" />
                            <div className="min-w-0">
                                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-tertiary">
                                    <span className="tabular-nums">{n.time}</span>·<TickerLink ticker={n.ticker} />·<span>{n.category}</span>
                                </p>
                                <h3 className="mt-1 text-sm font-semibold text-primary">
                                    <a
                                        href={`/artikkel/${n.id}`}
                                        className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        {n.title}
                                    </a>
                                </h3>
                                <p className="mt-1 line-clamp-2 text-sm text-tertiary">{n.excerpt}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </WidgetCard>
    );
};

const HotStocksCard = () => {
    const columns: Column<(typeof hotStocks)[number]>[] = [
        { id: "ticker", label: "Aksje", cell: (s) => <TickerLink ticker={s.ticker} name={s.name} /> },
        { id: "turnover", label: "Omsatt (MNOK)", right: true, sort: (s) => s.turnover, cell: (s) => num(s.turnover, 1) },
        {
            id: "factor",
            label: "× normalt",
            tooltip: "Omsetning i dag delt på gjennomsnittlig daglig omsetning siste 30 dager",
            right: true,
            sort: (s) => s.factor,
            cell: (s) => `${num(s.factor, 1)}×`,
        },
    ];
    return (
        <WidgetCard title="Hot stocks" icon={Flame} iconColor="error" href="/bors/hot-stocks" meta="Uvanlig høy omsetning">
            <DataTable label="Hot stocks" rows={hotStocks} columns={columns} defaultSort={{ column: "factor", direction: "descending" }} />
        </WidgetCard>
    );
};

const ExtremesCard = () => (
    <WidgetCard title="Nye ekstremkurser" icon={GraphUp} href="/bors/ekstremkurser" linkLabel="Se alle ekstremkurser" meta="All-time high og low">
        <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-tertiary p-3">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                    <ArrowUp className="size-4 text-fg-success-secondary" />
                    Ny all-time high
                </h3>
                <ul>
                    {allTimeHighs.map((s) => (
                        <li key={s.id} className="flex items-center justify-between gap-3 py-1.5">
                            <TickerLink ticker={s.ticker} name={s.name} />
                            <span className="text-sm text-primary tabular-nums">{num(s.last)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="rounded-xl bg-tertiary p-3">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                    <ArrowDown className="size-4 text-fg-error-secondary" />
                    Ny all-time low
                </h3>
                <ul>
                    {allTimeLows.map((s) => (
                        <li key={s.id} className="flex items-center justify-between gap-3 py-1.5">
                            <TickerLink ticker={s.ticker} name={s.name} />
                            <span className="text-sm text-primary tabular-nums">{num(s.last)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </WidgetCard>
);

const ShortedCard = () => {
    const columns: Column<(typeof shorted)[number]>[] = [
        { id: "ticker", label: "Aksje", cell: (s) => <TickerLink ticker={s.ticker} name={s.name} /> },
        { id: "share", label: "Andel", right: true, sort: (s) => s.share, cell: (s) => `${num(s.share)} %` },
        { id: "value", label: "Verdi (MNOK)", right: true, hideBelowMd: true, sort: (s) => s.value, cell: (s) => num(s.value, 1) },
        {
            id: "dtc",
            label: "Days to cover",
            tooltip: "Antall handelsdager det tar å dekke inn alle shortposisjoner med dagens omsetning",
            right: true,
            sort: (s) => s.dtc,
            cell: (s) => num(s.dtc, 1),
        },
    ];
    return (
        <WidgetCard title="Mest shortet" icon={GraphDown} iconColor="error" href="/bors/short" linkLabel="Se alle shortposisjoner" className="lg:col-span-3">
            <DataTable label="Mest shortet" rows={shorted} columns={columns} defaultSort={{ column: "share", direction: "descending" }} />
        </WidgetCard>
    );
};

const DividendsCard = () => {
    const columns: Column<(typeof dividends)[number]>[] = [
        { id: "ticker", label: "Aksje", cell: (s) => <TickerLink ticker={s.ticker} name={s.name} /> },
        { id: "date", label: "Ex-dato", right: true, cell: (s) => s.date },
        { id: "dps", label: "Utbytte", right: true, sort: (s) => s.dps, cell: (s) => `${num(s.dps)} kr` },
    ];
    return (
        <WidgetCard title="Kommende utbytter" icon={Wallet} href="/bors/utbytter" linkLabel="Se alle utbytter" className="lg:col-span-3">
            <DataTable label="Kommende utbytter" rows={dividends} columns={columns} />
        </WidgetCard>
    );
};

const CalendarCard = () => (
    <WidgetCard title="Finanskalender" icon={Calendar} href="/kalender" linkLabel="Åpne finanskalenderen" className="lg:col-span-2">
        <div className="flex flex-col gap-3">
            {calendar.map((d) => (
                <div key={d.day} className="rounded-xl bg-tertiary p-3">
                    <h3 className="mb-1 text-sm font-semibold text-primary">{d.day}</h3>
                    <ul>
                        {d.items.map((i) => (
                            <li key={i.time + i.who} className="py-1.5">
                                <p className="text-xs text-tertiary">
                                    <span className="tabular-nums">{i.time}</span> · {i.what}
                                </p>
                                <p className="text-sm font-medium text-primary">{i.who}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </WidgetCard>
);

const CompanyList = ({
    rows,
    actionIcon,
    actionLabel,
}: {
    rows: { id: string; name: string; meta: string; initials: string }[];
    actionIcon: typeof Play;
    actionLabel: string;
}) => (
    <ul>
        {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 border-b border-secondary py-3 last:border-b-0">
                <AvatarLabelGroup size="md" alt="" initials={r.initials} title={r.name} subtitle={r.meta} />
                <ButtonUtility icon={actionIcon} color="tertiary" tooltip={`${actionLabel} – ${r.name}`} />
            </li>
        ))}
    </ul>
);

/* -------------------------------------------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------------------------------------- */

export const BorsPage = ({ loggedIn = true }: { loggedIn?: boolean }) => {
    const winnerColumns = stockColumns({ loggedIn });
    const tradedColumns = stockColumns({ loggedIn, turnover: true });

    return (
        <div className="min-h-dvh bg-secondary_alt">
            <SiteHeader
                brand="fa"
                navigation={navigation}
                shortcuts={shortcuts}
                tickerItems={tickerItems}
                user={loggedIn ? { initials: "NK", href: "/min-side" } : undefined}
                loginHref="/logg-inn"
                subscribeHref="/abonnement"
                onSearchPress={() => {}}
            />
            <main className="mx-auto flex w-full flex-col gap-6 px-4 py-6 md:px-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">Børs</h1>
                        <p className="mt-1 text-sm text-tertiary">
                            {loggedIn ? "Sanntidskurser er slått på." : "Kursene er forsinket 15 minutter."} Oppdatert 27. okt. 14:10
                        </p>
                    </div>
                    <form role="search" action="/sok" className="w-full md:w-80">
                        <Input name="q" aria-label="Søk etter aksje eller ticker" placeholder="Søk etter aksje eller ticker" icon={Search} size="md" />
                    </form>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
                    <IndexCard loggedIn={loggedIn} />
                    <WatchlistCard loggedIn={loggedIn} />

                    <MarketsCard />
                    <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-2">
                        <TvCard />
                        <SectorsCard />
                    </div>

                    <WidgetCard title="Vinnere" icon={ArrowUp} iconColor="success" href="/bors/vinnere" linkLabel="Se alle vinnere" className="lg:col-span-2">
                        <DataTable
                            label="Vinnere på Oslo Børs"
                            rows={winners}
                            columns={winnerColumns}
                            defaultSort={{ column: "change", direction: "descending" }}
                        />
                    </WidgetCard>
                    <WidgetCard title="Tapere" icon={ArrowDown} iconColor="error" href="/bors/tapere" linkLabel="Se alle tapere" className="lg:col-span-2">
                        <DataTable
                            label="Tapere på Oslo Børs"
                            rows={losers}
                            columns={winnerColumns}
                            defaultSort={{ column: "change", direction: "ascending" }}
                        />
                    </WidgetCard>
                    <WidgetCard
                        title="Mest omsatte"
                        icon={GraphUp}
                        href="/bors/mest-omsatte"
                        linkLabel="Se alle mest omsatte"
                        className="md:col-span-2 lg:col-span-2"
                    >
                        <DataTable
                            label="Mest omsatte aksjer"
                            rows={mostTraded}
                            columns={tradedColumns}
                            defaultSort={{ column: "turnover", direction: "descending" }}
                        />
                    </WidgetCard>

                    <NewsCard loggedIn={loggedIn} />
                    <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-2">
                        <HotStocksCard />
                        <ExtremesCard />
                    </div>

                    <ShortedCard />
                    <DividendsCard />

                    <CalendarCard />
                    <WidgetCard title="Rapporter" icon={Download} href="/rapporter" linkLabel="Se alle rapporter" className="lg:col-span-2">
                        <CompanyList rows={reports} actionIcon={Download} actionLabel="Last ned rapport" />
                    </WidgetCard>
                    <WidgetCard
                        title="Webcasts"
                        icon={Play}
                        href="/rapporter/webcasts"
                        linkLabel="Se alle webcasts"
                        meta="Resultatpresentasjoner"
                        className="md:col-span-2 lg:col-span-2"
                    >
                        <CompanyList rows={webcasts} actionIcon={Play} actionLabel="Spill av webcast" />
                    </WidgetCard>
                </div>
            </main>
            <SiteFooter
                brand="fa"
                links={footerLinks}
                publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, PO Box 724 Skøyen, 0214 Oslo", "Sjefredaktør/adm.dir: Trygve Hegnar"]}
                copyright="©2026 Hegnar Media AS"
                disclaimer="Børsdata levert av Millistream. Nikkei 225 ©Nikkei Inc. TradingView Lightweight Charts™ og TradingView Advanced Charts™ er levert av TradingView, Inc."
                disclaimerHref="/om-data"
                socialLinks={[
                    { platform: "x", href: "https://x.com" },
                    { platform: "facebook", href: "https://facebook.com" },
                    { platform: "linkedin", href: "https://linkedin.com" },
                ]}
                contactHref="/kontakt"
                appStoreHref="/app/ios"
                googlePlayHref="/app/android"
            />
        </div>
    );
};
