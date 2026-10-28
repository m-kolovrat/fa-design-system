"use client";

import { type FC, type ReactNode, useMemo, useState } from "react";
import {
    ArrowRight,
    BulletList,
    CalendarAdd,
    Calendar as CalendarIcon,
    Check,
    ChevronDown,
    DocumentCash,
    Download,
    GraphLine,
    Help,
    Lock,
    Microphone,
    News,
    Pause,
    Play,
    Plus,
    Star,
    StarFilled,
    Table as TableIcon,
    Users,
} from "fa-icons";
import type { Key } from "react-aria-components";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartLegendContent, ChartTooltipContent, selectEvenlySpacedItems } from "@/components/application/charts/charts-base";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { notify } from "@/components/application/notifications/notification";
import { SiteFooter } from "@/components/application/site-footer/site-footer";
import type { SiteNavItem } from "@/components/application/site-header/site-brands";
import { SiteHeader } from "@/components/application/site-header/site-header";
import type { TickerItem } from "@/components/application/site-header/ticker-bar";
import { Table } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { NativeSelect } from "@/components/base/select/select-native";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";

/* -------------------------------------------------------------------------------------------------
 * Formatting
 * -----------------------------------------------------------------------------------------------*/

const num = (v: number, digits = 2) => v.toLocaleString("nb-NO", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const signed = (v: number, digits = 2) =>
    new Intl.NumberFormat("nb-NO", { minimumFractionDigits: digits, maximumFractionDigits: digits, signDisplay: "exceptZero" }).format(v);
const pct = (v: number) =>
    new Intl.NumberFormat("nb-NO", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: "exceptZero" }).format(v / 100);

/** Change value — stand-in from page-patterns.md (no Figma component yet). */
const ChangeValue = ({ value, absolute, className }: { value: number; absolute?: number; className?: string }) => (
    <span className={cx("tabular-nums", value > 0 && "text-success-primary", value < 0 && "text-error-primary", value === 0 && "text-tertiary", className)}>
        {absolute !== undefined && `${signed(absolute)} (`}
        {pct(value)}
        {absolute !== undefined && ")"}
    </span>
);

/* -------------------------------------------------------------------------------------------------
 * Placeholder data (replace with live data from the market data feed)
 * -----------------------------------------------------------------------------------------------*/

const quote = {
    name: "Equinor",
    ticker: "EQNR",
    market: "Oslo Børs",
    last: 444.3,
    change: -6.6,
    changePct: -1.46,
    previousClose: 450.9,
    time: "14:12",
    open: 448.4,
    high: 450.7,
    low: 440.1,
    bid: 444.3,
    ask: 444.4,
    volume: "1,08 M",
    turnover: "480,77 M",
    pe: 12.59,
    nextReport: "28.10",
};

type PeriodId = "1d" | "5d" | "6m" | "ytd" | "1y" | "5y" | "max";

const periods: { id: PeriodId; label: string; change: number; phrase: string }[] = [
    { id: "1d", label: "1D", change: -1.46, phrase: "i dag" },
    { id: "5d", label: "5D", change: -2.31, phrase: "siste fem handelsdager" },
    { id: "6m", label: "6M", change: 4.87, phrase: "siste seks måneder" },
    { id: "ytd", label: "YTD", change: 9.12, phrase: "hittil i år" },
    { id: "1y", label: "1Y", change: -3.64, phrase: "siste år" },
    { id: "5y", label: "5Y", change: 118.4, phrase: "siste fem år" },
    { id: "max", label: "Maks", change: 385.57, phrase: "siden børsnoteringen i 2001" },
];

const NOW = new Date(2026, 9, 27, 14, 12);

/** Deterministic pseudo-random numbers so the chart looks the same on every render. */
const seeded = (seed: number) => {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
};

const tradingDaysBack = (count: number, step = 1) => {
    const days: Date[] = [];
    const d = new Date(NOW);
    d.setHours(16, 20, 0, 0);
    while (days.length < count) {
        if (d.getDay() !== 0 && d.getDay() !== 6) days.unshift(new Date(d));
        d.setDate(d.getDate() - step);
    }
    return days;
};

const buildTimes = (period: PeriodId): Date[] => {
    switch (period) {
        case "1d":
            return Array.from({ length: 79 }, (_, i) => new Date(2026, 9, 27, 9, i * 4));
        case "5d":
            return tradingDaysBack(5).flatMap((day) => Array.from({ length: 8 }, (_, h) => new Date(day.getFullYear(), day.getMonth(), day.getDate(), 9 + h)));
        case "6m":
            return tradingDaysBack(128);
        case "ytd":
            return tradingDaysBack(212);
        case "1y":
            return tradingDaysBack(254);
        case "5y":
            return Array.from({ length: 261 }, (_, i) => new Date(2021, 9, 25 + i * 7));
        case "max":
            return Array.from({ length: 305 }, (_, i) => new Date(2001, 5 + i, 1));
    }
};

const buildSeries = (period: PeriodId) => {
    const meta = periods.find((p) => p.id === period)!;
    const times = buildTimes(period);
    const end = quote.last;
    const start = end / (1 + meta.change / 100);
    const random = seeded(period.length * 97 + times.length);
    const n = times.length;

    let walk = 0;
    const steps = times.map(() => (walk += random() - 0.5));
    const last = steps[n - 1];
    const amplitude = Math.max(start, end) * (period === "1d" ? 0.004 : 0.03);

    return times.map((t, i) => {
        const trend = start + ((end - start) * i) / (n - 1);
        const bridge = steps[i] - (last * i) / (n - 1);
        return { t: t.getTime(), close: Math.round((trend + bridge * amplitude) * 10) / 10 };
    });
};

const tickFormat = (period: PeriodId, t: number) => {
    const d = new Date(t);
    if (period === "1d") return d.toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit" });
    if (period === "5d") return d.toLocaleDateString("nb-NO", { weekday: "short" });
    if (period === "5y" || period === "max") return d.toLocaleDateString("nb-NO", { year: "numeric" });
    return d.toLocaleDateString("nb-NO", { month: "short" });
};

const tooltipLabel = (period: PeriodId, t: number) => {
    const d = new Date(t);
    if (period === "1d" || period === "5d")
        return d.toLocaleString("nb-NO", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    return d.toLocaleDateString("nb-NO", { day: "numeric", month: "short", year: "numeric" });
};

type NewsSource = "fa" | "tdn" | "bors" | "presse";

const sourceMeta: Record<NewsSource, { label: string; initials: string }> = {
    fa: { label: "FA", initials: "FA" },
    tdn: { label: "TDN", initials: "TDN" },
    bors: { label: "Børsmelding", initials: "OB" },
    presse: { label: "Pressemelding", initials: "EQ" },
};

const news: { id: string; time: string; source: NewsSource; title: string; excerpt: string; pluss?: boolean }[] = [
    {
        id: "n1",
        time: "13:58",
        source: "fa",
        title: "Equinor faller etter svakere gasspriser – analytikerne kutter kursmålene før kvartalstallene",
        excerpt: "Europeiske gasspriser har falt over 6 prosent denne uken. Flere meglerhus venter nå lavere kontantstrøm fra norsk sokkel i tredje kvartal.",
        pluss: true,
    },
    {
        id: "n2",
        time: "12:41",
        source: "tdn",
        title: "Equinor: Pareto senker kursmålet til 360 kroner, gjentar selg",
        excerpt: "Pareto Securities justerer ned estimatene for gassvolumer og realiserte priser i fjerde kvartal.",
    },
    {
        id: "n3",
        time: "11:05",
        source: "bors",
        title: "Equinor ASA – Meldepliktig handel for primærinnsider",
        excerpt: "En primærinnsider i Equinor ASA har kjøpt 2 500 aksjer til en snittkurs på 446,20 kroner.",
    },
    {
        id: "n4",
        time: "09:30",
        source: "fa",
        title: "Oljeaksjene trekker Oslo Børs ned: – Markedet priser inn en mildere vinter",
        excerpt: "Hovedindeksen faller 0,8 prosent i formiddagshandelen, med Equinor, Aker BP og Vår Energi blant de største taperne.",
    },
    {
        id: "n5",
        time: "08:12",
        source: "presse",
        title: "Equinor tildeler kontrakter for 4,2 milliarder kroner på Johan Castberg",
        excerpt: "Kontraktene gjelder vedlikehold og modifikasjoner over fem år, med opsjon på ytterligere tre år.",
    },
    {
        id: "n6",
        time: "I går 17:20",
        source: "tdn",
        title: "Equinor: Starter produksjon fra Halten øst-feltet i Norskehavet",
        excerpt: "Feltet ventes å produsere rundt 30 000 fat oljeekvivalenter per dag på platå.",
    },
    {
        id: "n7",
        time: "I går 08:00",
        source: "bors",
        title: "Equinor ASA – Invitasjon til presentasjon av resultatene for tredje kvartal 2026",
        excerpt: "Resultatene legges fram onsdag 28. oktober klokken 07.00, med webcast og telefonkonferanse klokken 10.00.",
    },
    {
        id: "n8",
        time: "23. okt.",
        source: "fa",
        title: "Analytikerne venter fortsatt aksjetilbakekjøp på 5 milliarder dollar i år",
        excerpt: "Finansavisen har samlet estimatene fra 24 meglerhus foran rapporten. Her er tallene de følger med på.",
        pluss: true,
    },
];

const orderBook = [
    { id: "o1", bidCount: 14, bidQty: 12_400, bid: 444.3, ask: 444.4, askQty: 6_200, askCount: 9 },
    { id: "o2", bidCount: 11, bidQty: 8_150, bid: 444.2, ask: 444.5, askQty: 14_750, askCount: 12 },
    { id: "o3", bidCount: 19, bidQty: 21_300, bid: 444.1, ask: 444.6, askQty: 18_100, askCount: 15 },
    { id: "o4", bidCount: 27, bidQty: 35_900, bid: 444.0, ask: 444.7, askQty: 11_400, askCount: 8 },
    { id: "o5", bidCount: 8, bidQty: 9_800, bid: 443.9, ask: 444.8, askQty: 27_600, askCount: 21 },
];

const trades = [
    { id: "t1", time: "14:12:08", price: 444.3, qty: 350, buyer: "NON", seller: "MSE" },
    { id: "t2", time: "14:11:54", price: 444.4, qty: 1_200, buyer: "DNB", seller: "NRD" },
    { id: "t3", time: "14:11:31", price: 444.3, qty: 85, buyer: "AVA", seller: "NON" },
    { id: "t4", time: "14:11:02", price: 444.2, qty: 2_400, buyer: "PAR", seller: "SEB" },
    { id: "t5", time: "14:10:47", price: 444.3, qty: 510, buyer: "NON", seller: "DNB" },
];

const consensus = { buy: 5, hold: 11, sell: 8, target: 393.53 };
const consensusTotal = consensus.buy + consensus.hold + consensus.sell;

type Signal = "kjop" | "noytral" | "selg";
const signalBadge: Record<Signal, { label: string; color: "success" | "gray" | "error" }> = {
    kjop: { label: "KJØP", color: "success" },
    noytral: { label: "NØYTRAL", color: "gray" },
    selg: { label: "SELG", color: "error" },
};

const SignalBadge = ({ signal }: { signal: Signal }) => (
    <Badge size="sm" type="pill-color" color={signalBadge[signal].color}>
        {signalBadge[signal].label}
    </Badge>
);

const recommendations: { id: string; date: string; broker: string; signal: Signal; target: number; previous?: number }[] = [
    { id: "r1", date: "27.10", broker: "Pareto Securities", signal: "selg", target: 360, previous: 375 },
    { id: "r2", date: "22.10", broker: "DNB Carnegie", signal: "noytral", target: 420 },
    { id: "r3", date: "21.10", broker: "Arctic Securities", signal: "kjop", target: 480, previous: 470 },
    { id: "r4", date: "17.10", broker: "SEB", signal: "noytral", target: 410 },
    { id: "r5", date: "15.10", broker: "Clarksons Securities", signal: "selg", target: 370, previous: 385 },
    { id: "r6", date: "10.10", broker: "Nordea Markets", signal: "noytral", target: 400 },
];

const technicals: { id: string; name: string; value: string; signal: Signal }[] = [
    { id: "sma20", name: "SMA 20", value: "452,10", signal: "selg" },
    { id: "sma50", name: "SMA 50", value: "438,70", signal: "kjop" },
    { id: "sma200", name: "SMA 200", value: "421,95", signal: "kjop" },
    { id: "rsi", name: "RSI (14)", value: "41,2", signal: "noytral" },
    { id: "macd", name: "MACD (12, 26, 9)", value: "−2,14", signal: "selg" },
];

const results = {
    annual: [
        { label: "2021", revenue: 90.9, profit: 8.6 },
        { label: "2022", revenue: 150.8, profit: 28.7 },
        { label: "2023", revenue: 107.2, profit: 11.9 },
        { label: "2024", revenue: 103.8, profit: 8.8 },
        { label: "2025", revenue: 98.4, profit: 7.1 },
    ],
    quarterly: [
        { label: "3K 25", revenue: 25.1, profit: 1.0 },
        { label: "4K 25", revenue: 24.6, profit: 1.9 },
        { label: "1K 26", revenue: 27.3, profit: 2.6 },
        { label: "2K 26", revenue: 24.9, profit: 1.3 },
    ],
};

const keyFigures: { label: string; value: string; help?: string }[] = [
    { label: "Markedsverdi", value: "1 151,2 mrd. NOK" },
    { label: "P/E", value: "12,59", help: "Kurs delt på resultat per aksje siste 12 måneder." },
    { label: "P/B", value: "2,05", help: "Kurs delt på bokført egenkapital per aksje." },
    { label: "Direkteavkastning", value: "3,39 %", help: "Utbytte siste 12 måneder delt på dagens kurs." },
    { label: "Resultat per aksje", value: "35,29 NOK" },
    { label: "Antall aksjer", value: "2,59 mrd." },
    { label: "Beta", value: "0,82" },
    { label: "52 uker høy / lav", value: "498,60 / 381,20" },
];

const dividends = [
    { id: "d2025", year: "2025", perShare: 15.06, yieldPct: 3.39, exDate: "12.11.2026" },
    { id: "d2024", year: "2024", perShare: 15.87, yieldPct: 5.82, exDate: "13.11.2025" },
    { id: "d2023", year: "2023", perShare: 31.52, yieldPct: 9.21, exDate: "14.11.2024" },
    { id: "d2022", year: "2022", perShare: 22.87, yieldPct: 6.57, exDate: "15.11.2023" },
    { id: "d2021", year: "2021", perShare: 6.44, yieldPct: 2.75, exDate: "11.11.2022" },
];

const calendar = [
    { id: "c1", date: "28.10.2026", title: "Kvartalsrapport 3K 2026", meta: "Kl. 07.00 · webcast kl. 10.00" },
    { id: "c2", date: "12.11.2026", title: "Utbytte, eks. dato", meta: "0,37 USD per aksje" },
    { id: "c3", date: "26.11.2026", title: "Utbetaling av utbytte", meta: "0,37 USD per aksje" },
    { id: "c4", date: "04.02.2027", title: "Kvartalsrapport 4K 2026 og kapitalmarkedsdag", meta: "Kl. 07.00" },
    { id: "c5", date: "12.05.2027", title: "Ordinær generalforsamling", meta: "Stavanger" },
];

const reports = [
    { id: "q2-2026", title: "Kvartalsrapport 2K 2026", meta: "23.07.2026 · PDF, 2,4 MB", href: "/rapporter/equinor/2k-2026.pdf" },
    { id: "q1-2026", title: "Kvartalsrapport 1K 2026", meta: "29.04.2026 · PDF, 2,1 MB", href: "/rapporter/equinor/1k-2026.pdf" },
    { id: "ar-2025", title: "Årsrapport 2025", meta: "19.03.2026 · PDF, 11,8 MB", href: "/rapporter/equinor/arsrapport-2025.pdf" },
];

const calls = [
    { id: "call-q2", title: "Resultatpresentasjon 2K 2026", meta: "23.07.2026 · 58 min" },
    { id: "call-q1", title: "Resultatpresentasjon 1K 2026", meta: "29.04.2026 · 52 min" },
];

const moreLinks = [
    { label: "Forum", href: "/forum/aksjer/EQNR" },
    { label: "Regnskap", href: "/aksjer/EQNR/regnskap" },
    { label: "Profil", href: "/aksjer/EQNR/profil" },
    { label: "Bjellesauer", href: "/bjellesauer/aksje/EQNR" },
    { label: "Topp 50 aksjonærer", href: "/aksjer/EQNR/aksjonaerer" },
    { label: "Historikk", href: "/aksjer/EQNR/historikk" },
    { label: "Teknisk analyse", href: "/aksjer/EQNR/teknisk-analyse" },
];

const watchlists = [
    { id: "min", label: "Min watchlist" },
    { id: "olje", label: "Olje og gass" },
    { id: "utbytte", label: "Utbytteaksjer" },
];

/* -------------------------------------------------------------------------------------------------
 * Page frame data
 * -----------------------------------------------------------------------------------------------*/

const tickerItems: TickerItem[] = [
    { label: "Oslo Børs", value: "1 712,48", change: "-0,82%", direction: "down", href: "/ticker/OSEBX" },
    { label: "Brent spot", value: "71,36", change: "-1,94%", direction: "down", href: "/ticker/BRENT" },
    { label: "Equinor", value: "444,30", change: "-1,46%", direction: "down", href: "/aksjer/EQNR" },
    { label: "Dollar", value: "10,86", change: "0,21%", direction: "up", href: "/ticker/USDNOK" },
    { label: "Euro", value: "11,72", change: "0,08%", direction: "up", href: "/ticker/EURNOK" },
    { label: "Gull", value: "3 981,20", change: "0,37%", direction: "up", href: "/ticker/XAUUSD" },
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
                { label: "Kalender", href: "/kalender" },
                { label: "Rapporter", href: "/rapporter" },
                { label: "Aksjonærer", href: "/aksjonaerregister" },
            ],
        },
        { label: "Investorchat", href: "/investorchat" },
        { label: "Watchlist", href: "/watchlist" },
        { label: "Bjellesauer", href: "/bjellesauer" },
        { label: "Aksjer", href: "/aksjer" },
    ],
    [
        { label: "Makro", href: "/makro" },
        { label: "Energi", href: "/energi" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors", current: true },
    { label: "Forum", href: "/forum" },
    { label: "Watchlist", href: "/watchlist" },
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
        { label: "Samtykkeinnstillinger", href: "/samtykke" },
    ],
];

/* -------------------------------------------------------------------------------------------------
 * Building blocks composed for this page (no Figma component yet)
 * -----------------------------------------------------------------------------------------------*/

const cardSurface = "rounded-2xl border border-secondary bg-primary_alt";

/** Widget card — stand-in from page-patterns.md. `flush` drops the body padding for tables. */
const WidgetCard = ({
    title,
    icon,
    iconColor = "brand",
    titleAddon,
    action,
    flush,
    className,
    children,
}: {
    title: string;
    icon: FC<{ className?: string }>;
    iconColor?: "brand" | "gray" | "success" | "error" | "warning";
    titleAddon?: ReactNode;
    action?: ReactNode;
    flush?: boolean;
    className?: string;
    children: ReactNode;
}) => (
    <section className={cx(cardSurface, "flex min-w-0 flex-col", !flush && "p-4 md:p-5", flush && "overflow-hidden", className)}>
        <header className={cx("mb-3 flex items-center gap-3", flush && "px-4 pt-4 md:px-5 md:pt-5")}>
            <FeaturedIcon icon={icon} color={iconColor} theme="light" size="sm" />
            <h2 className="text-lg font-semibold text-primary">{title}</h2>
            {titleAddon}
            {action && <div className="ml-auto shrink-0">{action}</div>}
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
    </section>
);

const HelpTip = ({ label, text }: { label: string; text: string }) => (
    <Tooltip title={label} description={text}>
        <TooltipTrigger
            aria-label={`Hva er ${label}?`}
            className="cursor-pointer rounded-xs text-fg-quaternary outline-focus-ring transition hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
        >
            <Help className="size-4" />
        </TooltipTrigger>
    </Tooltip>
);

const LiveIndicator = ({ realtime }: { realtime: boolean }) => (
    <span className="flex items-center gap-2">
        {realtime ? (
            <BadgeWithDot color="error" size="sm">
                Live
            </BadgeWithDot>
        ) : (
            <BadgeWithDot color="gray" size="sm">
                Forsinket 15 min
            </BadgeWithDot>
        )}
        <span className="text-xs text-tertiary">{quote.time}</span>
    </span>
);

/* -------------------------------------------------------------------------------------------------
 * Price bar (sticky) with the watchlist menu
 * -----------------------------------------------------------------------------------------------*/

const WatchlistMenu = () => {
    const [selected, setSelected] = useState<Set<Key>>(new Set());
    const isWatched = selected.size > 0;

    const onChange = (keys: "all" | Set<Key>) => {
        const next = keys === "all" ? new Set<Key>(watchlists.map((w) => w.id)) : new Set(keys);
        const added = [...next].find((k) => !selected.has(k));
        const removed = [...selected].find((k) => !next.has(k));
        const name = (id?: Key) => watchlists.find((w) => w.id === id)?.label;

        if (added) notify({ type: "success", title: `Equinor er lagt til i ${name(added)}` });
        else if (removed) notify({ type: "gray", title: `Equinor er fjernet fra ${name(removed)}` });

        setSelected(next);
    };

    return (
        <Dropdown.Root>
            <Button color="secondary" size="sm" iconLeading={isWatched ? StarFilled : Star} iconTrailing={ChevronDown}>
                {isWatched ? "I watchlist" : "Watchlist"}
            </Button>
            <Dropdown.Popover className="w-64">
                <Dropdown.Menu aria-label="Watchlister for Equinor">
                    <Dropdown.Section selectionMode="multiple" selectedKeys={selected} onSelectionChange={onChange} aria-label="Dine watchlister">
                        {watchlists.map((w) => (
                            <Dropdown.Item key={w.id} id={w.id} label={w.label} selectionIndicator="checkbox" />
                        ))}
                    </Dropdown.Section>
                    <Dropdown.Separator />
                    <Dropdown.Section aria-label="Andre valg">
                        <Dropdown.Item id="ny" icon={Plus} href="/watchlist/ny" label="Ny watchlist" />
                    </Dropdown.Section>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};

const PriceBar = ({ realtime }: { realtime: boolean }) => (
    <div className="sticky top-0 z-20 border-b border-secondary bg-primary_alt">
        <div className="mx-auto flex w-full max-w-container flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:px-8">
            <div className="flex min-w-0 items-center gap-3">
                <Avatar size="md" initials="EQ" rounded={false} />
                <div className="min-w-0">
                    <h1 className="text-lg font-semibold text-primary md:text-display-xs">{quote.name}</h1>
                    <p className="flex items-center gap-1.5 text-xs text-tertiary">
                        <Badge color="brand" size="sm" type="pill-color">
                            {quote.ticker}
                        </Badge>
                        <span aria-hidden="true">·</span>
                        <span>{quote.market}</span>
                    </p>
                </div>
            </div>

            <div className="order-3 flex w-full flex-wrap items-baseline gap-x-3 gap-y-1 md:order-none md:w-auto">
                <p className="flex items-baseline gap-1">
                    <span className="text-display-xs font-semibold text-primary tabular-nums">{num(quote.last)}</span>
                    <span className="text-sm text-tertiary">NOK</span>
                </p>
                <ChangeValue value={quote.changePct} absolute={quote.change} className="text-md font-medium" />
                <LiveIndicator realtime={realtime} />
            </div>

            <div className="ml-auto">
                <WatchlistMenu />
            </div>
        </div>
    </div>
);

/* -------------------------------------------------------------------------------------------------
 * Header band: period selector, price chart, key figures
 * -----------------------------------------------------------------------------------------------*/

const PriceChart = () => {
    const isDesktop = useBreakpoint("lg");
    const [period, setPeriod] = useState<Set<Key>>(new Set(["1d"]));
    const periodId = [...period][0] as PeriodId;
    const meta = periods.find((p) => p.id === periodId)!;
    const data = useMemo(() => buildSeries(periodId), [periodId]);
    const ticks = useMemo(() => selectEvenlySpacedItems(data, isDesktop ? 7 : 4).map((d) => d.t), [data, isDesktop]);
    const colorClass = meta.change < 0 ? "text-utility-error-600" : "text-utility-success-600";
    const dotClass = meta.change < 0 ? "fill-bg-primary stroke-utility-error-600 stroke-2" : "fill-bg-primary stroke-utility-success-600 stroke-2";

    return (
        <div className="flex min-w-0 flex-col gap-4">
            {/* Period selector — stand-in (ButtonGroup with each period's change). Scrolls sideways on narrow screens. */}
            <div className="-mx-4 overflow-x-auto px-4 py-1 md:mx-0 md:px-0">
                <ButtonGroup aria-label="Periode" size="sm" selectedKeys={period} onSelectionChange={setPeriod} disallowEmptySelection>
                    {periods.map((p) => (
                        <ButtonGroupItem key={p.id} id={p.id} aria-label={`${p.label}, ${pct(p.change)}`}>
                            <span className="flex flex-col items-center leading-tight">
                                <span>{p.label}</span>
                                <ChangeValue value={p.change} className="hidden text-xs md:block" />
                            </span>
                        </ButtonGroupItem>
                    ))}
                </ButtonGroup>
            </div>

            <p className="text-sm text-tertiary">
                Equinor er {meta.change < 0 ? "ned" : "opp"} <span className="font-medium text-primary tabular-nums">{num(Math.abs(meta.change))} %</span>{" "}
                {meta.phrase}
                {periodId === "1d" && ` (forrige sluttkurs ${num(quote.previousClose)})`}.
            </p>

            <div className="h-60 md:h-72">
                <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                    <AreaChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }} className="text-tertiary [&_.recharts-text]:text-xs">
                        <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                        <XAxis
                            dataKey="t"
                            ticks={ticks}
                            fill="currentColor"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={8}
                            tickFormatter={(t) => tickFormat(periodId, Number(t))}
                        />
                        <YAxis
                            orientation="right"
                            domain={["auto", "auto"]}
                            width={isDesktop ? 56 : 44}
                            fill="currentColor"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => num(Number(v), 0)}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent />}
                            formatter={(v) => `${num(Number(v))} NOK`}
                            labelFormatter={(t) => tooltipLabel(periodId, Number(t))}
                            cursor={{ className: "stroke-utility-gray-300 stroke-1" }}
                        />
                        <Area
                            dataKey="close"
                            name="Equinor (EQNR)"
                            type="monotone"
                            isAnimationActive={false}
                            className={colorClass}
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            activeDot={{ className: dotClass }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const QuoteFigures = () => {
    const items: { label: string; value: string; help?: string }[] = [
        { label: "Åpne", value: num(quote.open) },
        { label: "Høy", value: num(quote.high) },
        { label: "Lav", value: num(quote.low) },
        { label: "Kjøp / salg", value: `${num(quote.bid)} / ${num(quote.ask)}` },
        { label: "Volum", value: quote.volume },
        { label: "Omsetning", value: `${quote.turnover} NOK` },
        { label: "P/E", value: num(quote.pe), help: "Kurs delt på resultat per aksje siste 12 måneder." },
        { label: "Neste rapport", value: quote.nextReport },
    ];

    return (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 lg:content-start">
            {items.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                    <dt className="flex items-center gap-1 text-xs font-medium text-tertiary">
                        {item.label}
                        {item.help && <HelpTip label={item.label} text={item.help} />}
                    </dt>
                    <dd className="text-md font-semibold text-primary tabular-nums">{item.value}</dd>
                </div>
            ))}
        </dl>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Cards
 * -----------------------------------------------------------------------------------------------*/

const NewsList = ({ items }: { items: typeof news }) => (
    <ul className="flex flex-col">
        {items.map((item) => (
            <li key={item.id} className="border-b border-secondary py-3 first:pt-0 last:border-b-0 last:pb-0">
                <a
                    href={`/nyheter/${item.id}`}
                    className="group flex gap-3 rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    <Avatar size="sm" initials={sourceMeta[item.source].initials} />
                    <span className="flex min-w-0 flex-col gap-1">
                        <span className="flex flex-wrap items-center gap-1.5 text-xs text-tertiary">
                            <span>{item.time}</span>
                            <span aria-hidden="true">·</span>
                            <Badge color="brand" size="sm" type="pill-color">
                                EQNR
                            </Badge>
                            <span aria-hidden="true">·</span>
                            <span>{sourceMeta[item.source].label}</span>
                            {item.pluss && <Lock aria-label="Pluss-artikkel" className="size-4 text-fg-brand-primary" />}
                        </span>
                        <span className="text-sm font-semibold text-primary group-hover:underline">{item.title}</span>
                        <span className="line-clamp-2 text-sm text-tertiary">{item.excerpt}</span>
                    </span>
                </a>
            </li>
        ))}
    </ul>
);

const newsFilters: { id: "alle" | NewsSource; label: string }[] = [
    { id: "alle", label: "Alle" },
    { id: "fa", label: "FA" },
    { id: "tdn", label: "TDN" },
    { id: "bors", label: "Børsmeldinger" },
    { id: "presse", label: "Pressemeldinger" },
];

const NewsCard = ({ limit, onShowAll, className }: { limit?: number; onShowAll?: () => void; className?: string }) => {
    const [filter, setFilter] = useState<Set<Key>>(new Set(["alle"]));
    const active = [...filter][0] as "alle" | NewsSource;
    const filtered = news.filter((n) => active === "alle" || n.source === active);
    const shown = limit ? filtered.slice(0, limit) : filtered;

    return (
        <WidgetCard
            title="Nyheter og børsmeldinger"
            icon={News}
            className={className}
            action={
                onShowAll && (
                    <Button color="link-color" size="sm" iconTrailing={ArrowRight} onPress={onShowAll}>
                        Se alle
                    </Button>
                )
            }
        >
            {/* Filter chips — stand-in (ButtonGroup, single selection) */}
            <div className="-mx-4 mb-4 overflow-x-auto px-4 py-1 md:-mx-5 md:px-5">
                <ButtonGroup aria-label="Filtrer nyheter" size="sm" selectedKeys={filter} onSelectionChange={setFilter} disallowEmptySelection>
                    {newsFilters.map((f) => (
                        <ButtonGroupItem key={f.id} id={f.id}>
                            {f.label}
                        </ButtonGroupItem>
                    ))}
                </ButtonGroup>
            </div>

            {shown.length > 0 ? (
                <NewsList items={shown} />
            ) : (
                <EmptyState icon={News} title="Ingen saker i denne kategorien" description="Velg «Alle» for å se alle nyheter om Equinor." className="py-8" />
            )}

            {!limit && filtered.length > 0 && (
                <Button color="secondary" size="sm" className="mt-4 self-center">
                    Vis flere nyheter
                </Button>
            )}
        </WidgetCard>
    );
};

const ConsensusCard = ({ className }: { className?: string }) => {
    const upside = (consensus.target / quote.last - 1) * 100;
    const rows = [
        { label: "Kjøp", value: consensus.buy },
        { label: "Nøytral", value: consensus.hold },
        { label: "Selg", value: consensus.sell },
    ];

    return (
        <WidgetCard
            title="Analytikerkonsensus"
            icon={Users}
            className={className}
            action={<span className="text-xs text-tertiary">{consensusTotal} analytikere</span>}
        >
            <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-tertiary p-3">
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-tertiary">Median kursmål</span>
                    <span className="text-display-xs font-semibold text-primary tabular-nums">{num(consensus.target)}</span>
                    <span className="text-xs text-tertiary">
                        <ChangeValue value={upside} /> fra dagens kurs
                    </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-medium text-tertiary">Konsensus</span>
                    <SignalBadge signal="noytral" />
                </div>
            </div>
            <ul className="flex flex-col gap-3">
                {rows.map((row) => (
                    <li key={row.label} className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
                        <span className="text-sm font-medium text-secondary">{row.label}</span>
                        <ProgressBar value={row.value} max={consensusTotal} labelPosition="right" valueFormatter={(v) => `${v}`} />
                    </li>
                ))}
            </ul>
        </WidgetCard>
    );
};

const OrderBookCard = ({ className }: { className?: string }) => (
    <WidgetCard title="Ordredybde" icon={TableIcon} flush className={className}>
        <Table aria-label="Ordredybde for Equinor" size="sm">
            <Table.Header>
                <Table.Head id="bidCount" label="Antall" className="hidden sm:table-cell" />
                <Table.Head id="bidQty" label="Volum" />
                <Table.Head id="bid" label="Kjøp" isRowHeader />
                <Table.Head id="ask" label="Salg" />
                <Table.Head id="askQty" label="Volum" />
                <Table.Head id="askCount" label="Antall" className="hidden sm:table-cell" />
            </Table.Header>
            <Table.Body items={orderBook}>
                {(row) => (
                    <Table.Row id={row.id}>
                        <Table.Cell className="hidden tabular-nums sm:table-cell">{row.bidCount}</Table.Cell>
                        <Table.Cell className="tabular-nums">{row.bidQty.toLocaleString("nb-NO")}</Table.Cell>
                        <Table.Cell className="font-medium text-primary tabular-nums">{num(row.bid)}</Table.Cell>
                        <Table.Cell className="font-medium text-primary tabular-nums">{num(row.ask)}</Table.Cell>
                        <Table.Cell className="tabular-nums">{row.askQty.toLocaleString("nb-NO")}</Table.Cell>
                        <Table.Cell className="hidden tabular-nums sm:table-cell">{row.askCount}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </WidgetCard>
);

const TradesCard = ({ className }: { className?: string }) => (
    <WidgetCard title="Siste handler" icon={GraphLine} flush className={className}>
        <Table aria-label="Siste handler i Equinor" size="sm">
            <Table.Header>
                <Table.Head id="time" label="Tid" isRowHeader />
                <Table.Head id="price" label="Pris" />
                <Table.Head id="qty" label="Antall" />
                <Table.Head id="brokers" label="Kjøper / selger" tooltip="Meglerkoder fra Oslo Børs" className="hidden sm:table-cell" />
            </Table.Header>
            <Table.Body items={trades}>
                {(row) => (
                    <Table.Row id={row.id}>
                        <Table.Cell className="tabular-nums">{row.time}</Table.Cell>
                        <Table.Cell className="font-medium text-primary tabular-nums">{num(row.price)}</Table.Cell>
                        <Table.Cell className="tabular-nums">{row.qty.toLocaleString("nb-NO")}</Table.Cell>
                        <Table.Cell className="hidden whitespace-nowrap sm:table-cell">
                            {row.buyer} / {row.seller}
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </WidgetCard>
);

const KeyFiguresCard = ({ className }: { className?: string }) => (
    <WidgetCard title="Nøkkeltall" icon={DocumentCash} className={className}>
        <dl className="flex flex-col">
            {keyFigures.map((row) => (
                <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 border-b border-secondary py-2.5 text-sm first:pt-0 last:border-b-0 last:pb-0"
                >
                    <dt className="flex items-center gap-1 text-tertiary">
                        {row.label}
                        {row.help && <HelpTip label={row.label} text={row.help} />}
                    </dt>
                    <dd className="font-medium text-primary tabular-nums">{row.value}</dd>
                </div>
            ))}
        </dl>
    </WidgetCard>
);

const CalendarCard = ({ className }: { className?: string }) => {
    const [added, setAdded] = useState<Set<string>>(new Set());

    const add = (id: string, title: string, date: string) => {
        setAdded((prev) => new Set(prev).add(id));
        notify({ type: "success", title: "Lagt til i kalenderen", description: `${title}, ${date}.` });
    };

    return (
        <WidgetCard title="Finanskalender" icon={CalendarIcon} className={className}>
            <ul className="flex flex-col">
                {calendar.map((event) => {
                    const isAdded = added.has(event.id);
                    return (
                        <li key={event.id} className="flex items-center gap-3 border-b border-secondary py-3 first:pt-0 last:border-b-0 last:pb-0">
                            <span className="w-22 shrink-0 text-sm font-medium text-primary tabular-nums">{event.date}</span>
                            <span className="flex min-w-0 flex-1 flex-col">
                                <span className="text-sm font-medium text-primary">{event.title}</span>
                                <span className="text-xs text-tertiary">{event.meta}</span>
                            </span>
                            <ButtonUtility
                                icon={isAdded ? Check : CalendarAdd}
                                tooltip={isAdded ? `${event.title} er lagt til i kalenderen` : `Legg ${event.title.toLowerCase()} til i kalenderen`}
                                isDisabled={isAdded}
                                onClick={() => add(event.id, event.title, event.date)}
                            />
                        </li>
                    );
                })}
            </ul>
        </WidgetCard>
    );
};

const ReportsCard = ({ className }: { className?: string }) => {
    const [playing, setPlaying] = useState<string | null>(null);

    return (
        <WidgetCard title="Rapporter og presentasjoner" icon={Microphone} className={className}>
            <h3 className="mb-2 text-xs font-medium text-tertiary">Rapporter</h3>
            <ul className="mb-4 flex flex-col">
                {reports.map((r) => (
                    <li key={r.id} className="flex items-center gap-3 border-b border-secondary py-3 first:pt-0 last:border-b-0">
                        <span className="flex min-w-0 flex-1 flex-col">
                            <span className="text-sm font-medium text-primary">{r.title}</span>
                            <span className="text-xs text-tertiary">{r.meta}</span>
                        </span>
                        <ButtonUtility icon={Download} href={r.href} download tooltip={`Last ned ${r.title.toLowerCase()}`} />
                    </li>
                ))}
            </ul>
            <h3 className="mb-2 text-xs font-medium text-tertiary">Resultatpresentasjoner</h3>
            <ul className="flex flex-col gap-2">
                {calls.map((c) => {
                    const isPlaying = playing === c.id;
                    return (
                        <li key={c.id} className="flex items-center gap-3 rounded-xl bg-tertiary p-3">
                            <span className="flex min-w-0 flex-1 flex-col">
                                <span className="text-sm font-medium text-primary">{c.title}</span>
                                <span className="text-xs text-tertiary">{isPlaying ? "Spilles av" : c.meta}</span>
                            </span>
                            <ButtonUtility
                                icon={isPlaying ? Pause : Play}
                                tooltip={isPlaying ? `Pause ${c.title.toLowerCase()}` : `Spill av ${c.title.toLowerCase()}`}
                                onClick={() => setPlaying(isPlaying ? null : c.id)}
                            />
                        </li>
                    );
                })}
            </ul>
        </WidgetCard>
    );
};

const RecommendationsCard = ({ className }: { className?: string }) => (
    <WidgetCard title="Anbefalinger" icon={Users} flush className={className} action={<span className="text-xs text-tertiary">Levert av Infront</span>}>
        <Table aria-label="Siste anbefalinger for Equinor" size="sm">
            <Table.Header>
                <Table.Head id="date" label="Dato" />
                <Table.Head id="broker" label="Meglerhus" isRowHeader />
                <Table.Head id="signal" label="Anbefaling" />
                <Table.Head id="target" label="Kursmål" />
            </Table.Header>
            <Table.Body items={recommendations}>
                {(r) => (
                    <Table.Row id={r.id}>
                        <Table.Cell className="tabular-nums">{r.date}</Table.Cell>
                        <Table.Cell className="font-medium whitespace-nowrap text-primary">{r.broker}</Table.Cell>
                        <Table.Cell>
                            <SignalBadge signal={r.signal} />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap tabular-nums">
                            <span className="font-medium text-primary">{num(r.target, 0)}</span>
                            {r.previous && <span className="block text-xs text-tertiary">fra {num(r.previous, 0)}</span>}
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </WidgetCard>
);

const TechnicalCard = ({ isSubscriber, className }: { isSubscriber: boolean; className?: string }) => (
    <WidgetCard
        title="Tekniske indikatorer"
        icon={GraphLine}
        flush
        className={className}
        titleAddon={!isSubscriber && <Lock aria-label="Kun for abonnenter" className="size-4 text-fg-quaternary" />}
    >
        {isSubscriber ? (
            <Table aria-label="Tekniske indikatorer for Equinor" size="sm">
                <Table.Header>
                    <Table.Head id="name" label="Indikator" isRowHeader />
                    <Table.Head id="value" label="Verdi" />
                    <Table.Head id="signal" label="Signal" />
                </Table.Header>
                <Table.Body items={technicals}>
                    {(t) => (
                        <Table.Row id={t.id}>
                            <Table.Cell className="font-medium text-primary">{t.name}</Table.Cell>
                            <Table.Cell className="tabular-nums">{t.value}</Table.Cell>
                            <Table.Cell>
                                <SignalBadge signal={t.signal} />
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        ) : (
            /* Paywall box — stand-in (no Figma component yet) */
            <div className="mx-4 mb-4 flex flex-col items-center gap-3 rounded-xl bg-tertiary px-4 py-8 text-center md:mx-5 md:mb-5">
                <p className="text-md font-semibold text-primary">Kjøps- og salgssignaler for SMA, RSI og MACD er for abonnenter</p>
                <p className="max-w-md text-sm text-tertiary">Med abonnement får du tekniske signaler, sanntidskurser og alle Pluss-artikler om Equinor.</p>
                <Button href="/abonnement" size="md">
                    Bli abonnent fra 99 kr
                </Button>
                <p className="text-sm text-tertiary">
                    Har du allerede en konto?{" "}
                    <Button href="/logg-inn" color="link-color" size="sm">
                        Logg inn
                    </Button>
                </p>
            </div>
        )}
    </WidgetCard>
);

const ResultsCard = ({ className }: { className?: string }) => {
    const isDesktop = useBreakpoint("lg");
    const [view, setView] = useState<Set<Key>>(new Set(["annual"]));
    const isAnnual = view.has("annual");
    const data = isAnnual ? results.annual : results.quarterly;
    const latest = data[data.length - 1];
    const fmt = (v: number) => `${num(v, 1)} mrd. USD`;

    return (
        <WidgetCard
            title="Resultat og omsetning"
            icon={DocumentCash}
            className={className}
            action={
                <ButtonGroup aria-label="Vis per" size="sm" selectedKeys={view} onSelectionChange={setView} disallowEmptySelection>
                    <ButtonGroupItem id="annual">Årlig</ButtonGroupItem>
                    <ButtonGroupItem id="quarterly">Kvartal</ButtonGroupItem>
                </ButtonGroup>
            }
        >
            <p className="mb-3 text-sm text-tertiary">
                Driftsinntekter {fmt(latest.revenue)} og resultat etter skatt {fmt(latest.profit)} i{" "}
                {isAnnual ? latest.label : latest.label.replace("K", ". kvartal 20")}.
            </p>
            <div className="h-60">
                <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                    <BarChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }} className="text-tertiary [&_.recharts-text]:text-xs">
                        <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                        <Legend verticalAlign="top" align="right" content={<ChartLegendContent className="-translate-y-2" />} />
                        <XAxis dataKey="label" fill="currentColor" axisLine={false} tickLine={false} tickMargin={8} />
                        <YAxis fill="currentColor" axisLine={false} tickLine={false} width={40} tickFormatter={(v) => num(Number(v), 0)} />
                        <ChartTooltip content={<ChartTooltipContent />} formatter={(v) => fmt(Number(v))} cursor={{ className: "fill-utility-gray-200/20" }} />
                        <Bar
                            dataKey="revenue"
                            name="Driftsinntekter"
                            isAnimationActive={false}
                            className="text-utility-brand-600"
                            fill="currentColor"
                            maxBarSize={isDesktop ? 32 : 16}
                        />
                        <Bar
                            dataKey="profit"
                            name="Resultat etter skatt"
                            isAnimationActive={false}
                            className="text-utility-brand-300"
                            fill="currentColor"
                            maxBarSize={isDesktop ? 32 : 16}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </WidgetCard>
    );
};

const DividendsCard = ({ className }: { className?: string }) => (
    <WidgetCard title="Utbytte" icon={DocumentCash} iconColor="success" flush className={className}>
        <Table aria-label="Utbytte per år for Equinor" size="sm">
            <Table.Header>
                <Table.Head id="year" label="Regnskapsår" isRowHeader />
                <Table.Head id="perShare" label="Utbytte per aksje" />
                <Table.Head id="yield" label="Direkteavkastning" tooltip="Utbytte for året delt på kursen ved årsslutt" />
                <Table.Head id="exDate" label="Siste eks. dato" className="hidden md:table-cell" />
            </Table.Header>
            <Table.Body items={dividends}>
                {(d) => (
                    <Table.Row id={d.id}>
                        <Table.Cell className="font-medium text-primary">{d.year}</Table.Cell>
                        <Table.Cell className="tabular-nums">{num(d.perShare)} NOK</Table.Cell>
                        <Table.Cell className="tabular-nums">{num(d.yieldPct)} %</Table.Cell>
                        <Table.Cell className="hidden tabular-nums md:table-cell">{d.exDate}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </WidgetCard>
);

const MoreCard = ({ className }: { className?: string }) => (
    <WidgetCard title="Mer om Equinor" icon={BulletList} iconColor="gray" className={className}>
        <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {moreLinks.map((link) => (
                <li key={link.href} className="border-b border-secondary py-2.5">
                    <Button href={link.href} color="link-gray" size="sm" iconTrailing={ArrowRight}>
                        {link.label}
                    </Button>
                </li>
            ))}
        </ul>
    </WidgetCard>
);

/* -------------------------------------------------------------------------------------------------
 * Page
 * -----------------------------------------------------------------------------------------------*/

export type TabId = "oversikt" | "nyheter" | "analyse" | "regnskap" | "rapporter";

const tabs: { id: TabId; label: string }[] = [
    { id: "oversikt", label: "Oversikt" },
    { id: "nyheter", label: "Nyheter" },
    { id: "analyse", label: "Analyse" },
    { id: "regnskap", label: "Regnskap og utbytte" },
    { id: "rapporter", label: "Rapporter og kalender" },
];

const grid = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6";

export interface AksjeEquinorProps {
    /** Real-time prices on (otherwise shown as delayed 15 minutes). */
    realtime?: boolean;
    /** Subscriber: unlocks technical signals. */
    isSubscriber?: boolean;
    /** The tab shown first. */
    defaultTab?: TabId;
}

export const AksjeEquinor = ({ realtime = true, isSubscriber = false, defaultTab = "oversikt" }: AksjeEquinorProps) => {
    const [tab, setTab] = useState<Key>(defaultTab);

    return (
        <div className="min-h-dvh bg-secondary_alt">
            <SiteHeader brand="fa" navigation={navigation} shortcuts={shortcuts} tickerItems={tickerItems} loginHref="/logg-inn" subscribeHref="/abonnement" />

            <PriceBar realtime={realtime} />

            <Tabs selectedKey={tab} onSelectionChange={setTab}>
                {/* Header band */}
                <div className="border-b border-secondary bg-primary_alt">
                    <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 pt-4 md:px-8 md:pt-6">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="min-w-0 lg:col-span-2">
                                <PriceChart />
                            </div>
                            <QuoteFigures />
                        </div>

                        {!realtime && (
                            <p className="text-xs text-tertiary">
                                Kursene er forsinket 15 minutter.{" "}
                                <Button href="/abonnement/sanntid" color="link-color" size="sm">
                                    Få sanntidskurser
                                </Button>
                            </p>
                        )}

                        <div className="pb-4 md:pb-0">
                            <NativeSelect
                                aria-label="Velg seksjon"
                                value={tab as string}
                                onChange={(event) => setTab(event.target.value)}
                                options={tabs.map((t) => ({ label: t.label, value: t.id }))}
                                className="md:hidden"
                            />
                            <Tabs.List type="underline" aria-label="Aksjeinformasjon for Equinor" items={tabs} className="max-md:hidden">
                                {(t) => <Tabs.Item {...t} />}
                            </Tabs.List>
                        </div>
                    </div>
                </div>

                <main className="mx-auto w-full max-w-container px-4 py-6 md:px-8">
                    <Tabs.Panel id="oversikt">
                        <div className={grid}>
                            <NewsCard limit={5} onShowAll={() => setTab("nyheter")} className="md:col-span-2 lg:col-span-4" />
                            <ConsensusCard className="md:col-span-2 lg:col-span-2" />
                            <OrderBookCard className="lg:col-span-2" />
                            <TradesCard className="lg:col-span-2" />
                            <KeyFiguresCard className="md:col-span-2 lg:col-span-2" />
                            <CalendarCard className="lg:col-span-3" />
                            <MoreCard className="lg:col-span-3" />
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel id="nyheter">
                        <div className={grid}>
                            <NewsCard className="md:col-span-2 lg:col-span-6" />
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel id="analyse">
                        <div className={grid}>
                            <ConsensusCard className="md:col-span-2 lg:col-span-2" />
                            <RecommendationsCard className="md:col-span-2 lg:col-span-4" />
                            <TechnicalCard isSubscriber={isSubscriber} className="md:col-span-2 lg:col-span-6" />
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel id="regnskap">
                        <div className={grid}>
                            <ResultsCard className="md:col-span-2 lg:col-span-4" />
                            <KeyFiguresCard className="md:col-span-2 lg:col-span-2" />
                            <DividendsCard className="md:col-span-2 lg:col-span-6" />
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel id="rapporter">
                        <div className={grid}>
                            <CalendarCard className="lg:col-span-3" />
                            <ReportsCard className="lg:col-span-3" />
                        </div>
                    </Tabs.Panel>
                </main>
            </Tabs>

            <SiteFooter
                brand="fa"
                links={footerLinks}
                publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, 0214 Oslo"]}
                copyright="©2026 Hegnar Media AS"
                disclaimer="Børsdata levert av Millistream. Kurser er forsinket minst 15 minutter med mindre annet er oppgitt."
                disclaimerHref="/om-data"
                contactHref="/kontakt-oss"
                appStoreHref="https://apps.apple.com/no/app/finansavisen"
                googlePlayHref="https://play.google.com/store/apps/details?id=no.finansavisen"
            />
        </div>
    );
};
