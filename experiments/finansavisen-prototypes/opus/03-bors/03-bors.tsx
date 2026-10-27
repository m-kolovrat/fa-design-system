"use client";

import { type FC, type ReactNode, useMemo, useRef, useState } from "react";
import {
    ArrowDown,
    ArrowUp,
    Calendar as CalendarIcon,
    ChevronRight,
    DocumentCash,
    Download,
    Flag,
    type FlagName,
    Flame,
    GraphDown,
    GraphLine,
    GraphUp,
    Grid,
    Medal,
    News,
    Play,
    Plus,
    Search,
    Star,
    Tv,
    Wallet,
} from "fa-icons";
import type { Key } from "react-aria-components";
import { Link as AriaLink, type SortDescriptor } from "react-aria-components";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltipContent, selectEvenlySpacedItems } from "@/components/application/charts/charts-base";
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
import { Select, type SelectItemType } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";

/* -------------------------------------------------------------------------------------------------
 * Formatting (Norwegian)
 * -----------------------------------------------------------------------------------------------*/

const num = (value: number, decimals = 2) => new Intl.NumberFormat("nb-NO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);

const signedNum = (value: number, decimals = 2) =>
    new Intl.NumberFormat("nb-NO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, signDisplay: "exceptZero" }).format(value);

const signedPct = (value: number, decimals = 2) =>
    new Intl.NumberFormat("nb-NO", { style: "percent", minimumFractionDigits: decimals, maximumFractionDigits: decimals, signDisplay: "exceptZero" }).format(
        value / 100,
    );

const kr = (value: number, decimals = 0) => `${num(value, decimals)} kr`;

/** Change value — no Figma component yet (page-patterns.md → Change value). */
const ChangeValue = ({
    value,
    kind = "pct",
    decimals = 2,
    suffix,
    className,
}: {
    value: number;
    kind?: "pct" | "abs";
    decimals?: number;
    suffix?: string;
    className?: string;
}) => (
    <span
        className={cx(
            "whitespace-nowrap tabular-nums",
            value > 0 && "text-success-primary",
            value < 0 && "text-error-primary",
            value === 0 && "text-tertiary",
            className,
        )}
    >
        {kind === "pct" ? signedPct(value, decimals) : signedNum(value, decimals)}
        {suffix}
    </span>
);

/** Ticker badge as a link to the stock page (page-patterns.md → Ticker badge). */
const TickerLink = ({ ticker }: { ticker: string }) => (
    <AriaLink
        href={`/aksjer/${ticker}`}
        aria-label={`Gå til ${ticker}`}
        className="inline-flex rounded-full outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
    >
        <Badge color="brand" size="sm" type="pill-color">
            {ticker}
        </Badge>
    </AriaLink>
);

/** Name over identifier (layout.md §3). */
const NameTicker = ({ name, ticker }: { name: string; ticker: string }) => (
    <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-primary">{name}</span>
        <span className="text-xs text-tertiary">{ticker}</span>
    </div>
);

/* -------------------------------------------------------------------------------------------------
 * Widget card — no Figma component yet (page-patterns.md → Widget card)
 * -----------------------------------------------------------------------------------------------*/

interface WidgetCardProps {
    id: string;
    title: string;
    icon?: FC<{ className?: string }>;
    iconColor?: "brand" | "gray" | "success" | "warning" | "error";
    /** Inline meta next to the heading ("Live 14:10", "Oppdatert 14:10"). */
    meta?: ReactNode;
    /** Right slot: exactly one item. Defaults to a chevron link when `href` is given. */
    action?: ReactNode;
    href?: string;
    linkLabel?: string;
    className?: string;
    children: ReactNode;
}

const WidgetCard = ({ id, title, icon, iconColor = "brand", meta, action, href, linkLabel, className, children }: WidgetCardProps) => (
    <section aria-labelledby={id} className={cx("flex min-w-0 flex-col rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5", className)}>
        <header className="mb-3 flex items-center gap-3">
            {icon && <FeaturedIcon icon={icon} color={iconColor} theme="light" size="sm" />}
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                <h2 id={id} className="text-lg font-semibold text-primary">
                    {title}
                </h2>
                {meta && <span className="text-xs text-tertiary">{meta}</span>}
            </div>
            <div className="ml-auto shrink-0">
                {action ?? (href ? <ButtonUtility icon={ChevronRight} href={href} tooltip={linkLabel ?? `Se alle: ${title}`} /> : null)}
            </div>
        </header>
        {children}
    </section>
);

/** Rows separated by dividers; the padding sits on the card (layout-card-dividers). */
const RowList = ({ children, label }: { children: ReactNode; label?: string }) => (
    <ul aria-label={label} className="flex flex-col">
        {children}
    </ul>
);

const Row = ({ children, className }: { children: ReactNode; className?: string }) => (
    <li className={cx("flex items-center gap-3 border-b border-secondary py-2.5 last:border-b-0", className)}>{children}</li>
);

/* -------------------------------------------------------------------------------------------------
 * Placeholder data — every number below is plausible but invented (see 03-bors.notes.md)
 * -----------------------------------------------------------------------------------------------*/

type MarketId = "norge" | "sverige" | "danmark" | "usa";
type PeriodId = "1d" | "1u" | "1m" | "ytd" | "1y" | "5y";

const periods: { id: PeriodId; label: string }[] = [
    { id: "1d", label: "1D" },
    { id: "1u", label: "1U" },
    { id: "1m", label: "1M" },
    { id: "ytd", label: "I år" },
    { id: "1y", label: "1Å" },
    { id: "5y", label: "5Å" },
];

interface Market {
    id: MarketId;
    tab: string;
    flag: FlagName;
    name: string;
    ticker: string;
    value: number;
    changes: Record<PeriodId, number>;
}

const markets: Market[] = [
    {
        id: "norge",
        tab: "Norge",
        flag: "norway-nok",
        name: "Hovedindeksen Oslo Børs",
        ticker: "OSEBX",
        value: 2124.29,
        changes: { "1d": -0.04, "1u": 1.12, "1m": 2.85, ytd: 11.4, "1y": 14.62, "5y": 72.1 },
    },
    {
        id: "sverige",
        tab: "Sverige",
        flag: "sweden-sek",
        name: "OMX Stockholm 30",
        ticker: "OMXS30",
        value: 2581.44,
        changes: { "1d": 0.32, "1u": 0.84, "1m": -1.2, ytd: 6.35, "1y": 8.9, "5y": 41.2 },
    },
    {
        id: "danmark",
        tab: "Danmark",
        flag: "denmark-dkk",
        name: "OMX Copenhagen 25",
        ticker: "OMXC25",
        value: 1702.18,
        changes: { "1d": -0.51, "1u": -1.84, "1m": -3.1, ytd: -9.6, "1y": -12.4, "5y": 18.3 },
    },
    {
        id: "usa",
        tab: "USA",
        flag: "united-states-usd",
        name: "S&P 500",
        ticker: "SPX",
        value: 6712.35,
        changes: { "1d": 0.18, "1u": 1.05, "1m": 3.4, ytd: 14.1, "1y": 17.8, "5y": 94.6 },
    },
];

/** Deterministic walk from the period's start value to today's value. */
const buildSeries = (market: Market, period: PeriodId) => {
    const counts: Record<PeriodId, number> = { "1d": 45, "1u": 35, "1m": 22, ytd: 60, "1y": 52, "5y": 60 };
    const n = counts[period];
    const end = market.value;
    const start = end / (1 + market.changes[period] / 100);
    const amplitude = Math.abs(end - start) * 0.35 + end * 0.002;
    const seed = market.value % 7;

    return Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const noise = Math.sin(i * 1.7 + seed) * 0.6 + Math.sin(i * 0.53 + seed * 2) * 0.4;
        const value = start + (end - start) * t + (i === 0 || i === n - 1 ? 0 : noise * amplitude * Math.sin(Math.PI * t));
        let label: string;
        if (period === "1d") {
            const minutes = 9 * 60 + Math.round(t * (5 * 60 + 10)); // 09:00–14:10
            label = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
        } else {
            const days: Record<Exclude<PeriodId, "1d">, number> = { "1u": 7, "1m": 30, ytd: 300, "1y": 365, "5y": 1826 };
            const date = new Date(2026, 9, 27);
            date.setDate(date.getDate() - Math.round((1 - t) * days[period]));
            label = date.toLocaleDateString("nb-NO", period === "5y" ? { month: "short", year: "numeric" } : { day: "numeric", month: "short" });
        }
        return { label, value: Math.round(value * 100) / 100 };
    });
};

const marketOverview = [
    { label: "OBX", value: num(1387.4), change: -0.12, href: "/ticker/OBX" },
    { label: "Dow Jones", value: num(46210.55), change: 0.21, href: "/ticker/DJI" },
    { label: "S&P 500", value: num(6712.35), change: 0.18, href: "/ticker/SPX" },
    { label: "NASDAQ", value: num(22941.07), change: 0.44, href: "/ticker/COMP" },
    { label: "Brent", value: `${num(64.82)} USD`, change: -1.35, href: "/ticker/BRENT" },
    { label: "Gull", value: `${num(4118.2)} USD`, change: 0.62, href: "/ticker/XAUUSD" },
    { label: "EURNOK", value: num(11.62, 4), change: 0.08, href: "/ticker/EURNOK" },
    { label: "USDNOK", value: num(9.98, 4), change: -0.15, href: "/ticker/USDNOK" },
    { label: "Bitcoin", value: `${num(1142310, 0)} NOK`, change: -2.1, href: "/ticker/BTCNOK" },
    { label: "US 10 år", value: `${num(4.02, 3)} %`, change: -0.74, href: "/ticker/US10Y" },
    { label: "VIX", value: num(17.84), change: 3.42, href: "/ticker/VIX" },
];

interface Stock {
    ticker: string;
    name: string;
    last: number;
    change: number;
}

const winners: Stock[] = [
    { ticker: "TECH", name: "Techstep", last: 10.3, change: 15.62 },
    { ticker: "KIT", name: "Kitron", last: 48.92, change: 6.84 },
    { ticker: "NOD", name: "Nordic Semiconductor", last: 142.6, change: 5.21 },
    { ticker: "HPUR", name: "Hexagon Purus", last: 6.12, change: 4.87 },
    { ticker: "PHO", name: "Photocure", last: 61.4, change: 4.1 },
];

const losers: Stock[] = [
    { ticker: "PROXI", name: "Proximar Seafood", last: 0.31, change: -89.19 },
    { ticker: "ULTI", name: "Ultimovacs", last: 1.84, change: -12.4 },
    { ticker: "NEXT", name: "NEXT Biometrics", last: 4.21, change: -9.85 },
    { ticker: "RECSI", name: "REC Silicon", last: 3.06, change: -7.42 },
    { ticker: "VOW", name: "Vow", last: 0.95, change: -6.9 },
];

const mostTraded = [
    { ticker: "EQNR", name: "Equinor", last: 248.6, change: 0.45, turnover: 1284 },
    { ticker: "DNB", name: "DNB Bank", last: 262.4, change: -0.3, turnover: 802 },
    { ticker: "NOD", name: "Nordic Semiconductor", last: 142.6, change: 5.21, turnover: 655 },
    { ticker: "MOWI", name: "Mowi", last: 198.1, change: -0.86, turnover: 498 },
    { ticker: "KOG", name: "Kongsberg Gruppen", last: 312.8, change: 1.14, turnover: 471 },
];

const hotStocks = [
    { ticker: "TECH", name: "Techstep", change: 15.62, turnover: 38.4, ratio: 9.6 },
    { ticker: "PROXI", name: "Proximar Seafood", change: -89.19, turnover: 21.7, ratio: 31.2 },
    { ticker: "KIT", name: "Kitron", change: 6.84, turnover: 164, ratio: 4.1 },
    { ticker: "PHO", name: "Photocure", change: 4.1, turnover: 42.3, ratio: 3.8 },
    { ticker: "BWE", name: "BW Energy", change: -2.32, turnover: 88.9, ratio: 3.2 },
];

const shorted = [
    { ticker: "NOD", name: "Nordic Semiconductor", share: 6.12, value: 1420, daysToCover: 3.4 },
    { ticker: "HEX", name: "Hexagon Composites", share: 5.48, value: 312, daysToCover: 6.1 },
    { ticker: "TOM", name: "Tomra Systems", share: 4.1, value: 1180, daysToCover: 4.8 },
    { ticker: "SALM", name: "SalMar", share: 3.62, value: 2130, daysToCover: 7.2 },
    { ticker: "NAS", name: "Norwegian Air Shuttle", share: 3.05, value: 498, daysToCover: 1.9 },
    { ticker: "AUTO", name: "AutoStore", share: 2.88, value: 640, daysToCover: 5.5 },
];

const highs: Stock[] = [
    { ticker: "KOG", name: "Kongsberg Gruppen", last: 312.8, change: 1.14 },
    { ticker: "GJF", name: "Gjensidige Forsikring", last: 268.4, change: 0.62 },
    { ticker: "DNB", name: "DNB Bank", last: 262.4, change: -0.3 },
    { ticker: "KIT", name: "Kitron", last: 48.92, change: 6.84 },
];

const lows: Stock[] = [
    { ticker: "PROXI", name: "Proximar Seafood", last: 0.31, change: -89.19 },
    { ticker: "VOW", name: "Vow", last: 0.95, change: -6.9 },
    { ticker: "NSKOG", name: "Norske Skog", last: 18.42, change: -1.75 },
    { ticker: "ULTI", name: "Ultimovacs", last: 1.84, change: -12.4 },
];

type NewsSource = "fa" | "tdn" | "bors" | "press";

const sourceNames: Record<NewsSource, { label: string; initials: string }> = {
    fa: { label: "Finansavisen", initials: "FA" },
    tdn: { label: "TDN Direkt", initials: "TDN" },
    bors: { label: "Børsmelding", initials: "OB" },
    press: { label: "Pressemelding", initials: "PM" },
};

const news: { id: string; source: NewsSource; time: string; ticker: string; title: string; excerpt: string; watched?: boolean }[] = [
    {
        id: "n1",
        source: "fa",
        time: "14:06",
        ticker: "TECH",
        title: "Techstep til værs etter ny rammeavtale med Statens innkjøpssenter",
        excerpt: "Aksjen har steget over 15 prosent etter at selskapet meldte om en avtale verdt opptil 400 millioner kroner over fire år.",
    },
    {
        id: "n2",
        source: "bors",
        time: "13:52",
        ticker: "PROXI",
        title: "Proximar Seafood AB – Resultat av fortrinnsrettsemisjon og ny finansieringsplan",
        excerpt: "Styret har besluttet å gjennomføre en rettet emisjon til 0,25 kroner per aksje. Eksisterende aksjonærer utvannes betydelig.",
    },
    {
        id: "n3",
        source: "tdn",
        time: "13:41",
        ticker: "EQNR",
        title: "Equinor øker produksjonen på Johan Castberg etter oppstart av ny brønn",
        excerpt: "Feltet produserer nå rundt 220 000 fat per dag, ifølge selskapet.",
        watched: true,
    },
    {
        id: "n4",
        source: "fa",
        time: "13:15",
        ticker: "NOD",
        title: "Analytikerne snur: Nå anbefales kjøp av Nordic Semiconductor igjen",
        excerpt: "To meglerhus har oppjustert kursmålet i forkant av tredjekvartalsrapporten neste uke.",
        watched: true,
    },
    {
        id: "n5",
        source: "press",
        time: "12:58",
        ticker: "KOG",
        title: "Kongsberg Gruppen signerer kontrakt om luftvern med Litauen",
        excerpt: "Kontrakten har en verdi på rundt 2,1 milliarder kroner og omfatter leveranser frem til 2029.",
        watched: true,
    },
    {
        id: "n6",
        source: "tdn",
        time: "12:30",
        ticker: "MOWI",
        title: "Mowi faller etter svake laksepriser i uke 43",
        excerpt: "Spotprisen for laks falt til 58 kroner kiloen, det laveste nivået siden mars.",
    },
];

const newsFilters: { id: string; label: string; loggedInOnly?: boolean }[] = [
    { id: "alle", label: "Alle" },
    { id: "fa", label: "FA" },
    { id: "tdn", label: "TDN" },
    { id: "bors", label: "Børsmeldinger" },
    { id: "press", label: "Pressemeldinger" },
    { id: "watch", label: "Min watchlist", loggedInOnly: true },
];

const reports = [
    { id: "r1", company: "Equinor", ticker: "EQNR", what: "Q3-rapport · webcast 08:00", hasWebcast: true },
    { id: "r2", company: "Telenor", ticker: "TEL", what: "Q3-rapport · webcast 07:30", hasWebcast: true },
    { id: "r3", company: "Orkla", ticker: "ORK", what: "Q3-rapport · earnings call 10:00", hasWebcast: true },
    { id: "r4", company: "Yara International", ticker: "YAR", what: "Q3-rapport", hasWebcast: false },
];

const sectors = [
    { name: "Teknologi", change: 1.22 },
    { name: "Industri", change: 0.4 },
    { name: "Energi", change: 0.35 },
    { name: "Finans", change: -0.12 },
    { name: "Sjømat", change: -0.84 },
    { name: "Shipping", change: -0.95 },
    { name: "Helse", change: -2.1 },
];

const dividends = [
    { ticker: "EQNR", name: "Equinor", exDate: "30. okt", amount: "3,72 kr" },
    { ticker: "FRO", name: "Frontline", exDate: "3. nov", amount: "3,05 kr" },
    { ticker: "MPCC", name: "MPC Container Ships", exDate: "4. nov", amount: "0,62 kr" },
    { ticker: "AKRBP", name: "Aker BP", exDate: "5. nov", amount: "6,38 kr" },
];

const calendar = [
    {
        day: "Onsdag 28. okt",
        events: [
            { ticker: "TEL", label: "Q3-rapport" },
            { ticker: "STB", label: "Q3-rapport" },
        ],
    },
    {
        day: "Torsdag 29. okt",
        events: [
            { ticker: "EQNR", label: "Q3-rapport" },
            { ticker: "NHY", label: "Q3-rapport" },
            { ticker: "", label: "Norges Bank: rentemøte" },
        ],
    },
    {
        day: "Fredag 30. okt",
        events: [
            { ticker: "EQNR", label: "Utbytte, ex-dato" },
            { ticker: "", label: "SSB: Arbeidsledighet (AKU)" },
        ],
    },
    { day: "Mandag 2. nov", events: [{ ticker: "YAR", label: "Q3-rapport" }] },
    {
        day: "Tirsdag 3. nov",
        events: [
            { ticker: "ORK", label: "Q3-rapport" },
            { ticker: "FRO", label: "Utbytte, ex-dato" },
        ],
    },
];

const watchlists: SelectItemType[] = [
    { id: "min", label: "Min watchlist" },
    { id: "utbytte", label: "Utbytteaksjer" },
];

const watchlistData: Record<string, { value: number; todayKr: number; todayPct: number; holdings: Stock[] }> = {
    min: {
        value: 412380,
        todayKr: 3214,
        todayPct: 0.79,
        holdings: [
            { ticker: "EQNR", name: "Equinor", last: 248.6, change: 0.45 },
            { ticker: "NOD", name: "Nordic Semiconductor", last: 142.6, change: 5.21 },
            { ticker: "KOG", name: "Kongsberg Gruppen", last: 312.8, change: 1.14 },
            { ticker: "MOWI", name: "Mowi", last: 198.1, change: -0.86 },
        ],
    },
    utbytte: {
        value: 186900,
        todayKr: -642,
        todayPct: -0.34,
        holdings: [
            { ticker: "DNB", name: "DNB Bank", last: 262.4, change: -0.3 },
            { ticker: "FRO", name: "Frontline", last: 241.2, change: -1.02 },
            { ticker: "AKRBP", name: "Aker BP", last: 241.9, change: 0.21 },
        ],
    },
};

/* -------------------------------------------------------------------------------------------------
 * Header and footer data
 * -----------------------------------------------------------------------------------------------*/

const tickerItems: TickerItem[] = [
    { label: "Oslo Børs", value: "2 124,29", change: "-0,04%", direction: "down", href: "/ticker/OSEBX" },
    { label: "Brent spot", value: "64,82", change: "-1,35%", direction: "down", href: "/ticker/BRENT" },
    { label: "Dollar", value: "9,98", change: "-0,15%", direction: "down", href: "/ticker/USDNOK" },
    { label: "Euro", value: "11,62", change: "0,08%", direction: "up", href: "/ticker/EURNOK" },
    { label: "Gull", value: "4 118,20", change: "0,62%", direction: "up", href: "/ticker/XAUUSD" },
    { label: "Bitcoin", value: "1 142 310", change: "-2,10%", direction: "down", href: "/ticker/BTCNOK" },
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
                { label: "Indekser", href: "/indekser" },
                { label: "Kalender", href: "/kalender" },
                { label: "Rapporter", href: "/rapporter" },
            ],
        },
        { label: "Investorchat", href: "/investorchat" },
        { label: "Watchlist", href: "/watchlist" },
        { label: "Aksjer", href: "/aksjer" },
        { label: "Valuta", href: "/valuta" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors", current: true },
    { label: "Aksjer", href: "/aksjer" },
    { label: "Forum", href: "/forum" },
    { label: "Watchlist", href: "/watchlist" },
];

const footerLinks: SiteNavItem[][] = [
    [
        { label: "eAvis", href: "/eavis" },
        { label: "Annonse", href: "/annonse" },
        { label: "Bedriftsabonnement", href: "/bedrift" },
    ],
    [
        { label: "Personvernerklæring", href: "/personvern" },
        { label: "Vilkår", href: "/vilkar" },
        { label: "Samtykkeinnstillinger", href: "/samtykke" },
    ],
];

/* -------------------------------------------------------------------------------------------------
 * Cards
 * -----------------------------------------------------------------------------------------------*/

const card = "rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5";

const IndexCard = ({ realtime }: { realtime: boolean }) => {
    const [marketKeys, setMarketKeys] = useState<Set<Key>>(new Set(["norge"]));
    const [periodKeys, setPeriodKeys] = useState<Set<Key>>(new Set(["1d"]));
    const isDesktop = useBreakpoint("lg");

    const market = markets.find((m) => marketKeys.has(m.id)) ?? markets[0];
    const period = (periods.find((p) => periodKeys.has(p.id)) ?? periods[0]).id;
    const change = market.changes[period];
    const absChange = market.value - market.value / (1 + change / 100);
    const data = useMemo(() => buildSeries(market, period), [market, period]);
    const ticks = selectEvenlySpacedItems(data, isDesktop ? 6 : 4).map((d) => d.label);
    const periodLabel = periods.find((p) => p.id === period)?.label ?? "";
    const lineColor = change < 0 ? "text-utility-error-600" : "text-utility-success-600";

    return (
        <section aria-labelledby="indeks-tittel" className={cx(card, "flex min-w-0 flex-col gap-4 md:col-span-2 lg:col-span-4")}>
            <div className="-mx-1 overflow-x-auto px-1 py-1">
                <ButtonGroup aria-label="Marked" size="sm" selectedKeys={marketKeys} onSelectionChange={setMarketKeys} disallowEmptySelection>
                    {markets.map((m) => (
                        <ButtonGroupItem key={m.id} id={m.id} iconLeading={<Flag name={m.flag} data-icon className="size-5" />}>
                            {m.tab}
                        </ButtonGroupItem>
                    ))}
                </ButtonGroup>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h2 id="indeks-tittel" className="text-lg font-semibold text-primary">
                        {market.name}
                    </h2>
                    <span className="text-xs text-tertiary">{market.ticker}</span>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-display-sm font-semibold text-primary tabular-nums">{num(market.value)}</p>
                    <p className="text-md font-medium">
                        <ChangeValue value={absChange} kind="abs" /> <span className="text-tertiary">(</span>
                        <ChangeValue value={change} />
                        <span className="text-tertiary">)</span>
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {realtime ? (
                        <BadgeWithDot color="error" size="sm">
                            Live
                        </BadgeWithDot>
                    ) : (
                        <Badge color="gray" size="sm">
                            Forsinket 15 min
                        </Badge>
                    )}
                    <span className="text-xs text-tertiary">Oppdatert 14:10</span>
                </div>
            </div>

            {/* Period selector — no Figma component yet. Kept on one row; scrolls sideways on narrow screens. */}
            <div className="-mx-1 overflow-x-auto px-1 py-1">
                <ButtonGroup aria-label="Periode" size="sm" selectedKeys={periodKeys} onSelectionChange={setPeriodKeys} disallowEmptySelection>
                    {periods.map((p) => (
                        <ButtonGroupItem key={p.id} id={p.id} aria-label={`${p.label}, ${signedPct(market.changes[p.id])}`}>
                            <span className="flex flex-col items-center leading-tight">
                                <span>{p.label}</span>
                                <ChangeValue value={market.changes[p.id]} className="text-xs" />
                            </span>
                        </ButtonGroupItem>
                    ))}
                </ButtonGroup>
            </div>

            <div className="h-60">
                <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                    <AreaChart data={data} className="text-tertiary [&_.recharts-text]:text-xs" margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
                        <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                        <XAxis dataKey="label" fill="currentColor" axisLine={false} tickLine={false} ticks={ticks} interval="preserveStartEnd" />
                        <YAxis
                            orientation="right"
                            fill="currentColor"
                            axisLine={false}
                            tickLine={false}
                            width={isDesktop ? 56 : 44}
                            domain={["auto", "auto"]}
                            tickFormatter={(v) => num(Number(v), 0)}
                        />
                        <Tooltip
                            content={<ChartTooltipContent />}
                            formatter={(v) => num(Number(v))}
                            cursor={{ className: "stroke-utility-brand-600 stroke-2" }}
                        />
                        <Area
                            dataKey="value"
                            name={market.name}
                            type="monotone"
                            isAnimationActive={false}
                            className={lineColor}
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <p className="text-sm text-tertiary">
                {market.name} er {change >= 0 ? "opp" : "ned"} {num(Math.abs(change))} % {period === "1d" ? "i dag" : `siste periode (${periodLabel})`}.
            </p>
        </section>
    );
};

const WatchlistCard = ({ loggedIn }: { loggedIn: boolean }) => {
    const [list, setList] = useState<Key | null>("min");
    const data = watchlistData[String(list ?? "min")];

    return (
        <WidgetCard
            id="watchlist-tittel"
            title="Watchlist"
            icon={Star}
            href={loggedIn ? "/watchlist" : undefined}
            linkLabel="Åpne watchlist"
            className="lg:col-span-2"
        >
            {loggedIn ? (
                <div className="flex flex-1 flex-col gap-4">
                    <Select aria-label="Velg watchlist" size="sm" items={watchlists} value={list} onChange={setList} placeholder="Velg watchlist">
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select>
                    {/* Key figures — no Figma component yet. */}
                    <dl className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <dt className="text-xs font-medium text-tertiary">Porteføljeverdi</dt>
                            <dd className="text-display-xs font-semibold text-primary tabular-nums">{kr(data.value)}</dd>
                        </div>
                        <div className="flex flex-col gap-1">
                            <dt className="text-xs font-medium text-tertiary">Endring i dag</dt>
                            <dd className="text-display-xs font-semibold">
                                <ChangeValue value={data.todayKr} kind="abs" decimals={0} suffix=" kr" />
                            </dd>
                            <dd className="text-sm">
                                <ChangeValue value={data.todayPct} />
                            </dd>
                        </div>
                    </dl>
                    <RowList label="Aksjer i watchlisten">
                        {data.holdings.map((s) => (
                            <Row key={s.ticker}>
                                <NameTicker name={s.name} ticker={s.ticker} />
                                <span className="ml-auto text-sm text-primary tabular-nums">{num(s.last)}</span>
                                <ChangeValue value={s.change} className="w-18 text-right text-sm" />
                            </Row>
                        ))}
                    </RowList>
                    <Button color="secondary" size="sm" iconLeading={Plus} className="mt-auto self-start">
                        Legg til aksje
                    </Button>
                </div>
            ) : (
                <EmptyState
                    icon={Star}
                    title="Lag din egen watchlist – helt gratis"
                    description="Logg inn for å følge aksjene dine og se porteføljeverdi og dagens endring her."
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

const MarketOverviewCard = () => (
    <WidgetCard id="markeder-tittel" title="Markeder" icon={GraphLine} href="/indekser" linkLabel="Se alle markeder" className="lg:col-span-2">
        <RowList>
            {marketOverview.map((m) => (
                <Row key={m.label} className="py-2">
                    <Button href={m.href} color="link-gray" size="sm">
                        {m.label}
                    </Button>
                    <span className="ml-auto text-sm text-primary tabular-nums">{m.value}</span>
                    <ChangeValue value={m.change} className="w-18 text-right text-sm" />
                </Row>
            ))}
        </RowList>
    </WidgetCard>
);

interface Column<T> {
    id: string;
    label: string;
    isRowHeader?: boolean;
    numeric?: boolean;
    sortable?: boolean;
    hideOnMobile?: boolean;
    render: (item: T) => ReactNode;
}

const StockTable = <T extends { ticker: string }>({
    label,
    columns,
    rows,
    sortDescriptor,
    onSortChange,
}: {
    label: string;
    columns: Column<T>[];
    rows: T[];
    sortDescriptor?: SortDescriptor;
    onSortChange?: (d: SortDescriptor) => void;
}) => (
    <div className="-mx-4 md:-mx-5">
        <Table aria-label={label} size="sm" sortDescriptor={sortDescriptor} onSortChange={onSortChange}>
            <Table.Header columns={columns}>
                {(c) => (
                    <Table.Head
                        id={c.id}
                        label={c.label}
                        isRowHeader={c.isRowHeader}
                        allowsSorting={c.sortable}
                        className={cx(c.numeric && "*:justify-end", c.hideOnMobile && "hidden md:table-cell")}
                    />
                )}
            </Table.Header>
            <Table.Body items={rows.map((r) => ({ ...r, id: r.ticker }))}>
                {(row) => (
                    <Table.Row id={row.ticker} columns={columns} href={`/aksjer/${row.ticker}`}>
                        {(c) => (
                            <Table.Cell className={cx(c.numeric && "text-right whitespace-nowrap tabular-nums", c.hideOnMobile && "hidden md:table-cell")}>
                                {c.render(row)}
                            </Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </div>
);

const priceColumns: Column<Stock>[] = [
    { id: "name", label: "Aksje", isRowHeader: true, render: (s) => <NameTicker name={s.name} ticker={s.ticker} /> },
    { id: "last", label: "Siste", numeric: true, render: (s) => <span className="text-primary">{num(s.last)}</span> },
    { id: "change", label: "I dag", numeric: true, render: (s) => <ChangeValue value={s.change} /> },
];

const MoversCard = ({ kind }: { kind: "winners" | "losers" }) => {
    const isWinners = kind === "winners";
    return (
        <WidgetCard
            id={`${kind}-tittel`}
            title={isWinners ? "Vinnere" : "Tapere"}
            icon={isWinners ? ArrowUp : ArrowDown}
            iconColor={isWinners ? "success" : "error"}
            href={isWinners ? "/bors/vinnere" : "/bors/tapere"}
            linkLabel={isWinners ? "Se alle vinnere" : "Se alle tapere"}
            className="lg:col-span-2"
        >
            <StockTable
                label={isWinners ? "Vinnere på Oslo Børs i dag" : "Tapere på Oslo Børs i dag"}
                columns={priceColumns}
                rows={isWinners ? winners : losers}
            />
        </WidgetCard>
    );
};

const NewsCard = ({ loggedIn }: { loggedIn: boolean }) => {
    const [filter, setFilter] = useState<Set<Key>>(new Set(["alle"]));
    const active = [...filter][0] ?? "alle";
    const items = news.filter((n) => active === "alle" || (active === "watch" ? n.watched : n.source === active));

    return (
        <WidgetCard id="nyheter-tittel" title="Børsnyheter" icon={News} href="/siste" linkLabel="Se alle børsnyheter" className="md:col-span-2 lg:col-span-4">
            {/* Filter chips — no Figma component yet; ButtonGroup stand-in. */}
            <div className="-mx-1 mb-2 overflow-x-auto px-1 py-1">
                <ButtonGroup aria-label="Filtrer nyheter etter kilde" size="sm" selectedKeys={filter} onSelectionChange={setFilter} disallowEmptySelection>
                    {newsFilters
                        .filter((f) => loggedIn || !f.loggedInOnly)
                        .map((f) => (
                            <ButtonGroupItem key={f.id} id={f.id}>
                                {f.label}
                            </ButtonGroupItem>
                        ))}
                </ButtonGroup>
            </div>
            {/* News feed item — no Figma component yet. */}
            <ul className="flex flex-col" aria-live="polite">
                {items.map((n) => (
                    <li key={n.id} className="flex gap-3 border-b border-secondary py-3 last:border-b-0">
                        <Avatar size="sm" initials={sourceNames[n.source].initials} />
                        <div className="flex min-w-0 flex-col gap-1">
                            <p className="flex flex-wrap items-center gap-x-1.5 text-xs font-medium text-tertiary">
                                <span>{n.time}</span>
                                <span aria-hidden>·</span>
                                <TickerLink ticker={n.ticker} />
                                <span aria-hidden>·</span>
                                <span>{sourceNames[n.source].label}</span>
                            </p>
                            <a
                                href={`/nyheter/${n.id}`}
                                className="rounded-xs text-sm font-semibold text-primary outline-focus-ring hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                {n.title}
                            </a>
                            <p className="line-clamp-2 text-sm text-tertiary">{n.excerpt}</p>
                        </div>
                    </li>
                ))}
                {items.length === 0 && <li className="py-6 text-sm text-tertiary">Ingen nyheter for dette filteret ennå i dag.</li>}
            </ul>
        </WidgetCard>
    );
};

const TvCard = () => (
    <WidgetCard
        id="tv-tittel"
        title="Børsmorgen"
        icon={Tv}
        meta={
            <BadgeWithDot color="error" size="sm">
                Live
            </BadgeWithDot>
        }
        href="/tv/borsmorgen"
        linkLabel="Se alle sendinger av Børsmorgen"
        className="lg:col-span-2"
    >
        {/* Video player — not in the library (coverage gap, no stand-in). Placeholder inset only. */}
        <div className="flex aspect-video items-center justify-center rounded-xl bg-tertiary p-3">
            <Button size="md" iconLeading={Play} href="/tv/borsmorgen/direkte">
                Se direkte
            </Button>
        </div>
        <div className="mt-3 flex flex-col gap-1">
            <p className="text-xs font-medium text-tertiary">Fa TV · direkte</p>
            <p className="text-md font-bold text-primary">Børsmorgen: Techstep til værs, Proximar kollapser</p>
            <p className="line-clamp-2 text-sm text-tertiary">
                Markedsanalytikerne gjennomgår dagens største bevegelser på Oslo Børs og hva du bør følge med på før stengetid.
            </p>
        </div>
    </WidgetCard>
);

const MostTradedCard = () => (
    <WidgetCard
        id="omsatt-tittel"
        title="Mest omsatte"
        icon={GraphUp}
        meta="Oppdatert 14:10"
        href="/bors/mest-omsatte"
        linkLabel="Se alle mest omsatte"
        className="lg:col-span-3"
    >
        <StockTable
            label="Mest omsatte aksjer på Oslo Børs i dag"
            rows={mostTraded}
            columns={[
                { id: "name", label: "Aksje", isRowHeader: true, render: (s) => <NameTicker name={s.name} ticker={s.ticker} /> },
                { id: "last", label: "Siste", numeric: true, render: (s) => <span className="text-primary">{num(s.last)}</span> },
                { id: "change", label: "I dag", numeric: true, render: (s) => <ChangeValue value={s.change} /> },
                { id: "turnover", label: "Omsetning (MNOK)", numeric: true, hideOnMobile: true, render: (s) => num(s.turnover, 0) },
            ]}
        />
    </WidgetCard>
);

const HotStocksCard = () => (
    <WidgetCard
        id="hot-tittel"
        title="Hot stocks"
        icon={Flame}
        iconColor="warning"
        meta="Uvanlig høy omsetning"
        href="/bors/hot-stocks"
        linkLabel="Se alle hot stocks"
        className="lg:col-span-3"
    >
        <StockTable
            label="Aksjer med uvanlig høy omsetning i dag"
            rows={hotStocks}
            columns={[
                { id: "name", label: "Aksje", isRowHeader: true, render: (s) => <NameTicker name={s.name} ticker={s.ticker} /> },
                { id: "ratio", label: "Mot snitt", numeric: true, render: (s) => <span className="text-primary">{num(s.ratio, 1)}x</span> },
                { id: "turnover", label: "Omsetning (MNOK)", numeric: true, hideOnMobile: true, render: (s) => num(s.turnover, 1) },
                { id: "change", label: "I dag", numeric: true, render: (s) => <ChangeValue value={s.change} /> },
            ]}
        />
    </WidgetCard>
);

type ShortRow = (typeof shorted)[number];

const ShortedCard = () => {
    const [sort, setSort] = useState<SortDescriptor>({ column: "share", direction: "descending" });
    const rows = useMemo(
        () =>
            [...shorted].sort((a, b) => {
                const key = sort.column as "share" | "value" | "daysToCover";
                const d = a[key] - b[key];
                return sort.direction === "descending" ? -d : d;
            }),
        [sort],
    );

    return (
        <WidgetCard
            id="short-tittel"
            title="Mest shortet"
            icon={GraphDown}
            iconColor="gray"
            meta="Kilde: Finanstilsynet, 26. okt"
            href="/bors/short"
            linkLabel="Se alle shortposisjoner"
            className="lg:col-span-4"
        >
            <StockTable<ShortRow>
                label="Mest shortede aksjer på Oslo Børs"
                rows={rows}
                sortDescriptor={sort}
                onSortChange={setSort}
                columns={[
                    { id: "name", label: "Aksje", isRowHeader: true, render: (s) => <NameTicker name={s.name} ticker={s.ticker} /> },
                    { id: "share", label: "Andel", numeric: true, sortable: true, render: (s) => <span className="text-primary">{num(s.share)} %</span> },
                    { id: "value", label: "Verdi (MNOK)", numeric: true, sortable: true, render: (s) => num(s.value, 0) },
                    { id: "daysToCover", label: "Days to cover", numeric: true, sortable: true, hideOnMobile: true, render: (s) => num(s.daysToCover, 1) },
                ]}
            />
        </WidgetCard>
    );
};

const HighsLowsCard = () => {
    const [mode, setMode] = useState<Set<Key>>(new Set(["high"]));
    const isHigh = mode.has("high");
    const rows = isHigh ? highs : lows;

    return (
        <WidgetCard id="rekord-tittel" title="Rekordnivåer" icon={Medal} href="/bors/rekorder" linkLabel="Se alle nye rekordnivåer" className="lg:col-span-2">
            <ButtonGroup
                aria-label="Vis nye toppnivåer eller bunnivåer"
                size="sm"
                selectedKeys={mode}
                onSelectionChange={setMode}
                disallowEmptySelection
                className="mb-2"
            >
                <ButtonGroupItem id="high">Ny toppnotering</ButtonGroupItem>
                <ButtonGroupItem id="low">Ny bunnotering</ButtonGroupItem>
            </ButtonGroup>
            <RowList label={isHigh ? "Aksjer på ny toppnotering" : "Aksjer på ny bunnotering"}>
                {rows.map((s) => (
                    <Row key={s.ticker}>
                        <TickerLink ticker={s.ticker} />
                        <span className="min-w-0 truncate text-sm text-secondary">{s.name}</span>
                        <span className="ml-auto text-sm text-primary tabular-nums">{num(s.last)}</span>
                        <ChangeValue value={s.change} className="w-18 text-right text-sm" />
                    </Row>
                ))}
            </RowList>
        </WidgetCard>
    );
};

const ReportsCard = () => (
    <WidgetCard
        id="rapporter-tittel"
        title="Rapporter og webcasts"
        icon={DocumentCash}
        href="/rapporter"
        linkLabel="Se alle rapporter"
        className="lg:col-span-2"
    >
        <RowList>
            {reports.map((r) => (
                <Row key={r.id}>
                    {/* Company row (page-patterns.md). */}
                    <AvatarLabelGroup size="sm" initials={r.ticker.slice(0, 2)} rounded={false} title={r.company} subtitle={r.what} />
                    <div className="ml-auto flex shrink-0 gap-1">
                        {r.hasWebcast && (
                            <ButtonUtility icon={Play} color="tertiary" tooltip={`Spill av webcast fra ${r.company}`} href={`/rapporter/${r.ticker}/webcast`} />
                        )}
                        <ButtonUtility
                            icon={Download}
                            color="tertiary"
                            tooltip={`Last ned rapport fra ${r.company} (PDF)`}
                            href={`/rapporter/${r.ticker}.pdf`}
                        />
                    </div>
                </Row>
            ))}
        </RowList>
    </WidgetCard>
);

const SectorsCard = () => (
    <WidgetCard id="sektorer-tittel" title="Sektorer" icon={Grid} href="/bors/sektorer" linkLabel="Se alle sektorer" className="lg:col-span-2">
        {/* Key-figure list (label left, value right). */}
        <dl className="flex flex-col">
            {sectors.map((s) => (
                <div key={s.name} className="flex items-center justify-between border-b border-secondary py-2.5 text-sm last:border-b-0">
                    <dt className="text-secondary">{s.name}</dt>
                    <dd>
                        <ChangeValue value={s.change} />
                    </dd>
                </div>
            ))}
        </dl>
    </WidgetCard>
);

const DividendsCard = () => (
    <WidgetCard
        id="utbytte-tittel"
        title="Kommende utbytter"
        icon={Wallet}
        href="/bors/utbytte"
        linkLabel="Se alle kommende utbytter"
        className="lg:col-span-2"
    >
        <StockTable
            label="Kommende utbytter"
            rows={dividends}
            columns={[
                { id: "name", label: "Aksje", isRowHeader: true, render: (s) => <NameTicker name={s.name} ticker={s.ticker} /> },
                { id: "exDate", label: "Ex-dato", numeric: true, render: (s) => s.exDate },
                { id: "amount", label: "Per aksje", numeric: true, render: (s) => <span className="text-primary">{s.amount}</span> },
            ]}
        />
    </WidgetCard>
);

const CalendarCard = () => (
    <WidgetCard
        id="kalender-tittel"
        title="Finanskalender"
        icon={CalendarIcon}
        href="/kalender"
        linkLabel="Se hele finanskalenderen"
        className="md:col-span-2 lg:col-span-6"
    >
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {calendar.map((d) => (
                <li key={d.day} className="flex flex-col gap-2 rounded-xl bg-tertiary p-3">
                    <h3 className="text-sm font-semibold text-primary">{d.day}</h3>
                    <ul className="flex flex-col gap-1.5">
                        {d.events.map((e) => (
                            <li key={e.ticker + e.label} className="flex items-center gap-2 text-sm text-tertiary">
                                {e.ticker && <TickerLink ticker={e.ticker} />}
                                <span>{e.label}</span>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ol>
    </WidgetCard>
);

/* -------------------------------------------------------------------------------------------------
 * Page
 * -----------------------------------------------------------------------------------------------*/

const tickerSearch: SelectItemType[] = [
    { id: "EQNR", label: "Equinor", supportingText: "EQNR" },
    { id: "DNB", label: "DNB Bank", supportingText: "DNB" },
    { id: "NOD", label: "Nordic Semiconductor", supportingText: "NOD" },
    { id: "TECH", label: "Techstep", supportingText: "TECH" },
    { id: "PROXI", label: "Proximar Seafood", supportingText: "PROXI" },
    { id: "KOG", label: "Kongsberg Gruppen", supportingText: "KOG" },
    { id: "MOWI", label: "Mowi", supportingText: "MOWI" },
];

export interface BorsPageProps {
    /** Logged-out users have no watchlist and can't turn on real-time prices. */
    loggedIn?: boolean;
}

export const BorsPage = ({ loggedIn = true }: BorsPageProps) => {
    const [realtime, setRealtime] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const focusSearch = () => {
        const input = searchRef.current?.querySelector("input");
        input?.scrollIntoView({ block: "center" });
        input?.focus();
    };

    return (
        <div className="min-h-dvh bg-secondary_alt">
            <SiteHeader
                brand="fa"
                navigation={navigation}
                shortcuts={shortcuts}
                tickerItems={tickerItems}
                user={loggedIn ? { initials: "KH", href: "/min-side" } : undefined}
                loginHref="/logg-inn"
                subscribeHref="/abonnement"
                onSearchPress={focusSearch}
            />

            <main className="mx-auto w-full max-w-container px-4 py-6 md:px-8">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">Børs</h1>
                        <p className="text-sm text-tertiary">Tirsdag 27. oktober · Oslo Børs er åpen til 16:20</p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                        <div ref={searchRef} className="w-full sm:w-72">
                            <Select.ComboBox
                                label="Søk etter aksje"
                                placeholder="Ticker eller selskap"
                                icon={Search}
                                shortcut={false}
                                size="sm"
                                items={tickerSearch}
                                onChange={(key) => {
                                    if (key) window.location.assign(`/aksjer/${key}`);
                                }}
                            >
                                {(item) => (
                                    <Select.Item id={item.id} supportingText={item.supportingText}>
                                        {item.label}
                                    </Select.Item>
                                )}
                            </Select.ComboBox>
                        </div>
                        <Toggle
                            label="Sanntidskurser"
                            hint={
                                loggedIn ? (realtime ? "Kursene oppdateres løpende." : "Kursene er forsinket 15 minutter.") : "Logg inn for å slå på sanntid."
                            }
                            isSelected={realtime}
                            onChange={setRealtime}
                            isDisabled={!loggedIn}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
                    <IndexCard realtime={realtime} />
                    <WatchlistCard loggedIn={loggedIn} />
                    <MarketOverviewCard />
                    <MoversCard kind="winners" />
                    <MoversCard kind="losers" />
                    <NewsCard loggedIn={loggedIn} />
                    <TvCard />
                    <MostTradedCard />
                    <HotStocksCard />
                    <ShortedCard />
                    <HighsLowsCard />
                    <ReportsCard />
                    <SectorsCard />
                    <DividendsCard />
                    <CalendarCard />
                </div>
            </main>

            <SiteFooter
                brand="fa"
                links={footerLinks}
                publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, 0214 Oslo"]}
                copyright="©2026 Hegnar Media AS"
                disclaimer="Børsdata levert av Millistream. Kursene er forsinket med minst 15 minutter med mindre sanntid er slått på."
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

export default BorsPage;
