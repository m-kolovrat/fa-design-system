"use client";

import { type ReactNode, type Ref, useEffect, useMemo, useRef, useState } from "react";
import { CardHeader } from "fa-design-system/components/application/card-header/card-header";
import { Carousel, useCarousel } from "fa-design-system/components/application/carousel/carousel-base";
import { ChartLegendContent, ChartTooltipContent } from "fa-design-system/components/application/charts/charts-base";
import { EmptyState } from "fa-design-system/components/application/empty-state/empty-state";
import { notify } from "fa-design-system/components/application/notifications/notification";
import { PaginationCardDefault } from "fa-design-system/components/application/pagination/pagination";
import { type Period, type PeriodOption, PeriodSelector } from "fa-design-system/components/application/period-selector/period-selector";
import { SiteFooter } from "fa-design-system/components/application/site-footer/site-footer";
import type { SiteNavItem } from "fa-design-system/components/application/site-header/site-brands";
import { SiteHeader } from "fa-design-system/components/application/site-header/site-header";
import { Table } from "fa-design-system/components/application/table/table";
import { Tabs } from "fa-design-system/components/application/tabs/tabs";
import { Avatar } from "fa-design-system/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "fa-design-system/components/base/badges/badges";
import { Button } from "fa-design-system/components/base/buttons/button";
import { ButtonUtility } from "fa-design-system/components/base/buttons/button-utility";
import { NativeSelect } from "fa-design-system/components/base/select/select-native";
import { Toggle } from "fa-design-system/components/base/toggle/toggle";
import { useBreakpoint } from "fa-design-system/hooks/use-breakpoint";
import { cx } from "fa-design-system/utils/cx";
import { Ai, ArrowRight, CalendarAdd, ChevronLeft, ChevronRight, Download, Eye, EyeFilled, Maximize, Play, Plus, Tv } from "fa-icons";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// ─── Formatting (nb-NO everywhere) ─────────────────────────────────────────────

const nb = (v: number, options: Intl.NumberFormatOptions = {}) =>
    new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2, ...options }).format(v);

const int = (v: number) => new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(v);

const pct = (v: number) => nb(v / 100, { style: "percent", signDisplay: "exceptZero" });

/** Change value stand-in from page-patterns.md: `percent` in percent (2.1 for +2,10 %), `value` in NOK. */
const Change = ({ percent, value, className }: { percent: number; value?: number; className?: string }) => (
    <span
        className={cx("tabular-nums", percent > 0 && "text-success-primary", percent < 0 && "text-error-primary", percent === 0 && "text-tertiary", className)}
    >
        {value === undefined ? pct(percent) : `${nb(value, { signDisplay: "exceptZero" })} (${pct(percent)})`}
    </span>
);

// ─── Surfaces (layout.md) ──────────────────────────────────────────────────────

const card = "overflow-hidden rounded-2xl border border-secondary bg-primary_alt";
const cardBody = "px-4 py-5 md:px-6";
const inset = "rounded-xl bg-tertiary p-3";
const tableHeadLabel = "text-xs font-medium uppercase tracking-wide text-quaternary";

const Card = ({ id, className, children }: { id: string; className?: string; children: ReactNode }) => (
    <section aria-labelledby={id} className={cx(card, "flex flex-col", className)}>
        {children}
    </section>
);

// ─── Placeholder data: Norwegian Air Shuttle ASA (NAS), all figures invented ────

const stock = {
    name: "Norwegian Air Shuttle",
    ticker: "NAS",
    isin: "NO0010196140",
    exchange: "Oslo Børs",
    currency: "NOK",
    last: 18.46,
    change: 0.38,
    changePct: 2.1,
    time: "28. okt. 14:32:05",
};

const keyData: { label: string; value: ReactNode }[] = [
    { label: "Åpning", value: nb(18.1) },
    { label: "Høy", value: nb(18.62) },
    { label: "P/E 12M", value: nb(7.84) },
    { label: "Kjøper", value: nb(18.44) },
    { label: "Lav", value: nb(17.98) },
    { label: "EPS 12M", value: nb(2.35) },
    { label: "Selger", value: nb(18.46) },
    { label: "Markedsverdi", value: "19,5 mrd" },
    {
        label: "Siste rapport",
        value: (
            <Button color="link-color" size="sm" href="/ticker/NAS/rapporter" iconTrailing={ArrowRight}>
                23. okt. 26
            </Button>
        ),
    },
    { label: "Volum", value: int(6_482_117) },
    { label: "Omsetning", value: "119,4 M" },
    { label: "Neste rapport", value: "5. feb. 27" },
];

const periods: PeriodOption[] = [
    { id: "1D", change: 2.1 },
    { id: "5D", change: -1.32 },
    { id: "6M", change: 14.85 },
    { id: "YTD", change: 31.2 },
    { id: "1Y", change: 42.56 },
    { id: "5Y", change: -12.4 },
];

const periodSummary: Record<string, string> = {
    "1D": "i dag",
    "5D": "siste fem dager",
    "6M": "siste seks måneder",
    YTD: "hittil i år",
    "1Y": "siste 12 måneder",
    "5Y": "siste fem år",
};

/** A deterministic random walk that ends at the last price, so every period's line is stable between renders. */
const priceSeries = (period: Period) => {
    const change = periods.find((p) => p.id === period)?.change ?? 0;
    const count = period === "1D" ? 23 : period === "5D" ? 40 : 60;
    const start = stock.last / (1 + change / 100);
    let seed = period.charCodeAt(0) * 31 + period.length * 7;
    const rand = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280 - 0.5;
    };
    return Array.from({ length: count }, (_, i) => {
        const t = i / (count - 1);
        const trend = start + (stock.last - start) * t;
        const noise = i === count - 1 ? 0 : rand() * stock.last * (period === "1D" ? 0.006 : 0.04);
        const label =
            period === "1D"
                ? `${String(9 + Math.floor((i * 15) / 60)).padStart(2, "0")}:${String((i * 15) % 60).padStart(2, "0")}`
                : new Date(2026, 9, 28 - Math.round((1 - t) * { "5D": 5, "6M": 182, YTD: 300, "1Y": 365, "5Y": 1826 }[period as "5D"])).toLocaleDateString(
                      "nb-NO",
                      period === "5D" ? { weekday: "short" } : period === "5Y" ? { year: "numeric" } : { day: "numeric", month: "short" },
                  );
        return { label, close: Math.round((trend + noise) * 100) / 100 };
    });
};

const videos = [
    "Norwegian-sjefen om rekordkvartalet: – Billettprisene holder seg",
    "Analytikerne løfter kursmålet på Norwegian etter tallene",
    "Slik påvirker drivstoffprisen flyaksjene på Oslo Børs",
    "Widerøe og Norwegian: Dette betyr oppkjøpet for kundene",
    "Børsoppdatering: Flyaksjene til værs før helgen",
    "Investorene om Norwegian-utbyttet: – Et vendepunkt",
    "Kapasitetsveksten fortsetter i Norden neste sommer",
    "Pareto-analytiker: Derfor er Norwegian billig priset",
    "Slik leser du kvartalsrapporten fra Norwegian",
    "Flyaksjene og kronekursen: Hva skjer når krona styrkes?",
];

type NewsCategory = "fa" | "byra" | "bors" | "presse";

const newsFilters: { id: "alle" | NewsCategory; label: string }[] = [
    { id: "alle", label: "Alle" },
    { id: "fa", label: "Finansavisen" },
    { id: "byra", label: "Nyhetsbyrå" },
    { id: "bors", label: "Børsmeldinger" },
    { id: "presse", label: "Pressemeldinger" },
];

const news: { id: string; time: string; source: string; initials: string; category: NewsCategory; headline: string; snippet: string }[] = [
    {
        id: "n1",
        time: "28. okt. 14:05",
        source: "Finansavisen",
        initials: "FA",
        category: "fa",
        headline: "Norwegian-aksjen stiger etter sterke passasjertall for oktober",
        snippet:
            "Flyselskapet fraktet 2,1 millioner passasjerer i oktober, opp 8 prosent fra samme måned i fjor. Kabinfaktoren endte på 84,6 prosent, over analytikernes forventninger.",
    },
    {
        id: "n2",
        time: "28. okt. 08:00",
        source: "Oslo Børs",
        initials: "OB",
        category: "bors",
        headline: "Norwegian Air Shuttle ASA – Trafikktall for oktober 2026",
        snippet:
            "Norwegian Air Shuttle ASA offentliggjør trafikktall for oktober 2026. Selskapet hadde en punktlighet på 87,2 prosent og en regularitet på 99,6 prosent.",
    },
    {
        id: "n3",
        time: "27. okt. 16:42",
        source: "NTB",
        initials: "NT",
        category: "byra",
        headline: "Flyselskapene venter rekordvinter til Syden",
        snippet:
            "Både Norwegian og SAS melder om økt etterspørsel etter reiser til Kanariøyene og Thailand i vinter. Billettprisene ligger fortsatt over nivået fra 2019.",
    },
    {
        id: "n4",
        time: "24. okt. 11:20",
        source: "Finansavisen",
        initials: "FA",
        category: "fa",
        headline: "Analytikerne hever kursmålet på Norwegian etter kvartalstallene",
        snippet:
            "Tre meglerhus har oppjustert kursmålet sitt etter at Norwegian leverte et driftsresultat på 2,4 milliarder kroner i tredje kvartal. Snittet ligger nå på 22 kroner.",
    },
    {
        id: "n5",
        time: "23. okt. 07:00",
        source: "Norwegian",
        initials: "NA",
        category: "presse",
        headline: "Norwegian leverer sitt beste tredjekvartal noensinne",
        snippet:
            "Norwegian Air Shuttle rapporterte et resultat før skatt på 2,6 milliarder kroner for tredje kvartal 2026, mot 2,1 milliarder kroner i samme kvartal året før.",
    },
    {
        id: "n6",
        time: "23. okt. 07:00",
        source: "Oslo Børs",
        initials: "OB",
        category: "bors",
        headline: "Norwegian Air Shuttle ASA – Kvartalsrapport for tredje kvartal 2026",
        snippet:
            "Vedlagt følger kvartalsrapporten og presentasjonen for tredje kvartal 2026. Selskapet holder presentasjon for investorer og analytikere klokken 08.30.",
    },
    {
        id: "n7",
        time: "21. okt. 13:15",
        source: "NTB",
        initials: "NT",
        category: "byra",
        headline: "Avinor: Rekordmange reisende gjennom Gardermoen i høstferien",
        snippet: "Over 1,2 millioner passasjerer reiste via Oslo lufthavn i løpet av høstferien. Norwegian sto for nesten halvparten av avgangene.",
    },
];

const financials = {
    annual: [
        { period: "2021", revenue: 5.1, result: -4.1 },
        { period: "2022", revenue: 19.0, result: 1.2 },
        { period: "2023", revenue: 25.9, result: 2.6 },
        { period: "2024", revenue: 35.6, result: 2.4 },
        { period: "2025", revenue: 38.2, result: 3.4 },
    ],
    quarterly: [
        { period: "4K25", revenue: 8.1, result: -0.6 },
        { period: "1K26", revenue: 7.4, result: -1.1 },
        { period: "2K26", revenue: 11.2, result: 1.9 },
        { period: "3K26", revenue: 12.6, result: 2.6 },
    ],
};

const orderBook = {
    bids: [
        { qty: 152_300, price: 18.44 },
        { qty: 98_450, price: 18.42 },
        { qty: 210_000, price: 18.4 },
        { qty: 64_200, price: 18.38 },
        { qty: 120_750, price: 18.36 },
    ],
    asks: [
        { qty: 88_900, price: 18.46 },
        { qty: 143_100, price: 18.48 },
        { qty: 76_400, price: 18.5 },
        { qty: 190_250, price: 18.52 },
        { qty: 55_000, price: 18.54 },
    ],
};

const keyFigures: { label: string; value: string }[] = [
    { label: "ISIN", value: stock.isin },
    { label: "12 mnd lav–høy", value: `${nb(11.02)} – ${nb(19.35)}` },
    { label: "Utbytte 12M", value: `${nb(1.25)} kr` },
    { label: "Direkteavkastning 12M", value: "6,77 %" },
    { label: "Pris/salg", value: nb(0.51) },
    { label: "Pris/bok", value: nb(2.18) },
    { label: "Egenkapitalavkastning 12M", value: "31,40 %" },
    { label: "Eks-dato", value: "6. mai 26" },
    { label: "Antall aksjer", value: int(1_056_412_830) },
];

const recommendationSeries = [
    { key: "buy", name: "Kjøp", className: "text-utility-success-700" },
    { key: "overweight", name: "Overvekt", className: "text-utility-success-400" },
    { key: "hold", name: "Hold", className: "text-utility-warning-300" },
    { key: "underweight", name: "Undervekt", className: "text-utility-warning-500" },
] as const;

const recommendations = [
    { quarter: "4K25", buy: 4, overweight: 2, hold: 3, underweight: 1 },
    { quarter: "1K26", buy: 5, overweight: 2, hold: 2, underweight: 1 },
    { quarter: "2K26", buy: 5, overweight: 3, hold: 2, underweight: 0 },
    { quarter: "3K26", buy: 6, overweight: 3, hold: 1, underweight: 0 },
];

const estimateScale = ["Kjøp", "Overvekt", "Hold", "Undervekt", "Selg"];

const recommendationHistory = [
    { quarter: "4K25", label: "Overvekt", score: 2.2 },
    { quarter: "1K26", label: "Overvekt", score: 2.0 },
    { quarter: "2K26", label: "Overvekt", score: 1.9 },
    { quarter: "3K26", label: "Overvekt", score: 1.8 },
];

const target = { now: 18.46, average: 21.8, median: 22.0, high: 26.0, low: 15.0, upside: 19.18 };

type Signal = "buy" | "sell" | "neutral";

const technicals: { id: string; name: string; value: string; signal: Signal }[] = [
    { id: "sma20", name: "SMA 20", value: nb(17.92), signal: "buy" },
    { id: "sma50", name: "SMA 50", value: nb(17.1), signal: "buy" },
    { id: "sma200", name: "SMA 200", value: nb(15.84), signal: "buy" },
    { id: "rsi14", name: "RSI 14", value: nb(72.4), signal: "sell" },
    { id: "macd", name: "MACD", value: nb(0.21), signal: "neutral" },
];

const signalBadge: Record<Signal, { color: "success" | "error" | "gray"; label: string }> = {
    buy: { color: "success", label: "KJØP" },
    sell: { color: "error", label: "SELG" },
    neutral: { color: "gray", label: "NØYTRAL" },
};

const volumeVs = [
    { label: "Mot snitt 1 uke", value: 189.96 },
    { label: "Mot snitt 1 mnd", value: 142.1 },
    { label: "Mot snitt 3 mnd", value: 118.45 },
    { label: "Mot snitt 1 år", value: 96.3 },
];

const trades = [
    { id: "t1", time: "14:32:05", price: 18.46, qty: 2_500 },
    { id: "t2", time: "14:31:58", price: 18.46, qty: 12_000 },
    { id: "t3", time: "14:31:40", price: 18.44, qty: 800 },
    { id: "t4", time: "14:31:12", price: 18.44, qty: 4_150 },
    { id: "t5", time: "14:30:47", price: 18.42, qty: 9_300 },
    { id: "t6", time: "14:30:21", price: 18.44, qty: 1_200 },
    { id: "t7", time: "14:29:55", price: 18.4, qty: 25_000 },
];

const dividends = [
    { id: "d1", amount: 1.25, date: "6. mai 26" },
    { id: "d2", amount: 0.4, date: "7. mai 25" },
];

const calendar = [
    { id: "c1", type: "Kvartalsrapport", date: "5. feb. 27", file: false },
    { id: "c2", type: "Årsrapport", date: "31. mar. 27", file: false },
    { id: "c3", type: "Generalforsamling", date: "6. mai 27", file: false },
    { id: "c4", type: "Kvartalsrapport", date: "23. okt. 26", file: true },
    { id: "c5", type: "Ekstraordinær generalforsamling", date: "12. aug. 26", file: true },
];

const reports = [
    { id: "r1", title: "3. kv. 2026", period: "01.07.2026–30.09.2026", date: "23. okt. 26", type: "Kvartalsrapport" },
    { id: "r2", title: "2. kv. 2026", period: "01.04.2026–30.06.2026", date: "16. jul. 26", type: "Kvartalsrapport" },
    { id: "r3", title: "1. kv. 2026", period: "01.01.2026–31.03.2026", date: "29. apr. 26", type: "Kvartalsrapport" },
    { id: "r4", title: "Årsrapport 2025", period: "01.01.2025–31.12.2025", date: "27. mar. 26", type: "Årsrapport" },
];

const earningsCalls = [
    { id: "e1", title: "3. kv. 2026", date: "23. okt. 26", minutes: 48 },
    { id: "e2", title: "2. kv. 2026", date: "16. jul. 26", minutes: 52 },
    { id: "e3", title: "1. kv. 2026", date: "29. apr. 26", minutes: 41 },
];

const stockTabs = [
    { slug: "markedsdata", label: "Markedsdata" },
    { slug: "forum", label: "Forum" },
    { slug: "nyheter", label: "Nyheter" },
    { slug: "finans", label: "Finans" },
    { slug: "profil", label: "Profil" },
    { slug: "bjellesauer", label: "Bjellesauer" },
    { slug: "aksjonaerer", label: "Topp 50 aksjonærer" },
    { slug: "historikk", label: "Historikk" },
    { slug: "rapporter", label: "Rapporter" },
    { slug: "teknisk-analyse", label: "Teknisk analyse" },
    { slug: "konsensus", label: "Konsensus" },
    { slug: "faq", label: "FAQ" },
].map((t) => ({ id: `/ticker/NAS/${t.slug}`, href: `/ticker/NAS/${t.slug}`, label: t.label }));

// ─── Header and footer content ─────────────────────────────────────────────────

const navigation: SiteNavItem[][] = [
    [
        { label: "Siste nytt", href: "/siste" },
        { label: "MittFA", href: "/mittfa" },
        { label: "Forum", href: "/forum" },
    ],
    [
        {
            label: "Børs",
            href: "/bors",
            current: true,
            items: [
                { label: "Børsoversikt", href: "/bors" },
                { label: "Aksjer", href: "/bors/aksjer" },
                { label: "Valuta", href: "/bors/valuta" },
            ],
        },
        { label: "AI-chat", href: "/ai-chat" },
        { label: "Watchlist", href: "/watchlist" },
        { label: "Bjellesauer", href: "/bjellesauer" },
        { label: "Aksjer", href: "/bors/aksjer" },
        { label: "Valuta", href: "/bors/valuta" },
        { label: "400 Rikeste", href: "/400-rikeste" },
        { label: "Video", href: "/video" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors", current: true },
    { label: "Forum", href: "/forum" },
    { label: "Watchlist", href: "/watchlist" },
    { label: "AI-chat", href: "/ai-chat" },
];

const footerLinks: SiteNavItem[][] = [
    [
        { label: "eAvis", href: "/eavis" },
        { label: "Annonse", href: "/annonse" },
        { label: "Bedriftsabonnement", href: "/bedrift" },
        { label: "Tips oss", href: "/tips" },
    ],
    [
        { label: "Personvernerklæring", href: "/personvern" },
        { label: "Vilkår", href: "/vilkar" },
        { label: "Samtykkeinnstillinger", href: "/samtykke" },
    ],
];

// ─── Sections ──────────────────────────────────────────────────────────────────

const RealtimeBanner = ({ realtime, onRealtimeChange }: { realtime: boolean; onRealtimeChange: (next: boolean) => void }) => (
    <div className={cx(card, "flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6")}>
        <div className="flex items-center gap-2">
            <BadgeWithDot color="error" size="sm">
                Sanntid
            </BadgeWithDot>
            <p className="text-sm text-secondary">Abonnenter har tilgang til sanntidsdata</p>
        </div>
        <Toggle
            label="Slå på sanntidsdata fra børsen"
            isSelected={realtime}
            onChange={(next) => {
                onRealtimeChange(next);
                notify({ type: "success", title: next ? "Sanntidsdata er slått på" : "Kursene vises nå med 15 minutters forsinkelse" });
            }}
        />
    </div>
);

interface Watch {
    watching: boolean;
    onToggle: () => void;
}

const WatchlistButton = ({ watching, onToggle }: Watch) => (
    <Button color="secondary" size="sm" iconLeading={watching ? EyeFilled : Eye} onPress={onToggle}>
        {watching ? "I watchlist" : "Watchlist"}
    </Button>
);

const PriceChart = ({ period }: { period: Period }) => {
    const isDesktop = useBreakpoint("md");
    const data = useMemo(() => priceSeries(period), [period]);
    const change = periods.find((p) => p.id === period)?.change ?? 0;
    const color = change >= 0 ? "text-utility-success-600" : "text-utility-error-600";

    return (
        <div className="h-60">
            <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                <AreaChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }} className="text-tertiary [&_.recharts-text]:text-xs">
                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                    <XAxis dataKey="label" fill="currentColor" axisLine={false} tickLine={false} interval="preserveStartEnd" minTickGap={24} />
                    <YAxis
                        orientation="right"
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        width={isDesktop ? 48 : 40}
                        domain={["auto", "auto"]}
                        tickFormatter={(v) => nb(Number(v))}
                    />
                    <Tooltip
                        content={<ChartTooltipContent />}
                        formatter={(v) => `${nb(Number(v))} kr`}
                        cursor={{ className: "stroke-utility-brand-600 stroke-2" }}
                    />
                    <Area
                        dataKey="close"
                        name="Kurs"
                        type="monotone"
                        isAnimationActive={false}
                        className={color}
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

const StockHeaderCard = ({ priceRef, watch, realtime }: { priceRef: Ref<HTMLDivElement>; watch: Watch; realtime: boolean }) => {
    const [period, setPeriod] = useState<Period>("1D");
    const change = periods.find((p) => p.id === period)?.change ?? 0;

    return (
        <section aria-labelledby="stock-title" className={cx(card, "md:col-span-2 lg:col-span-4")}>
            <div className="flex flex-col gap-1 px-4 pt-5 md:px-6" ref={priceRef}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h1 id="stock-title" className="text-xl font-semibold text-primary">
                            {stock.name} ({stock.ticker})
                        </h1>
                        <p className="flex items-baseline gap-3">
                            <span className="text-display-sm font-semibold text-primary tabular-nums">{nb(stock.last)}</span>
                            <Change className="text-md font-medium" percent={stock.changePct} value={stock.change} />
                        </p>
                    </div>
                    <WatchlistButton {...watch} />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {realtime ? (
                        <BadgeWithDot color="error" size="sm">
                            Live
                        </BadgeWithDot>
                    ) : (
                        <BadgeWithDot color="gray" size="sm">
                            Forsinket 15 min
                        </BadgeWithDot>
                    )}
                    <span className="text-xs text-tertiary">
                        {stock.time} · {stock.exchange} · {stock.currency}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 px-4 py-5 md:px-6 xl:grid-cols-[minmax(0,1fr)_14rem]">
                <div className="min-w-0">
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-sm text-tertiary">
                            NAS er {change >= 0 ? "opp" : "ned"} {pct(change).replace(/^[+−-]/, "")} {periodSummary[period]}
                        </p>
                        <div className="flex gap-3">
                            <Button color="secondary" size="md" iconLeading={Plus} aria-label="Sammenlign eller legg til indikator" />
                            <Button color="secondary" size="md" iconLeading={Maximize} aria-label="Vis grafen i fullskjerm" />
                        </div>
                    </div>
                    <PriceChart period={period} />
                    <PeriodSelector className="mt-4" periods={periods} selectedPeriod={period} onPeriodChange={setPeriod} aria-label="Periode for kursgrafen" />
                </div>
                <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-4 sm:grid-cols-3 xl:grid-cols-2">
                    {keyData.map((d) => (
                        <div key={d.label} className="flex flex-col gap-0.5">
                            <dt className="text-xs font-medium text-tertiary">{d.label}</dt>
                            <dd className="text-sm font-semibold text-primary tabular-nums">{d.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};

const VideoCounter = () => {
    const { selectedIndex, scrollSnaps } = useCarousel();
    return (
        <p className="mt-3 flex items-baseline justify-between gap-3 text-sm" aria-live="polite">
            <span className="line-clamp-1 font-medium text-secondary">{videos[selectedIndex]}</span>
            <span className="shrink-0 text-tertiary tabular-nums">
                {selectedIndex + 1} / {scrollSnaps.length || videos.length}
            </span>
        </p>
    );
};

const VideoCard = () => (
    <Carousel.Root aria-label="Videoer om Norwegian" className={cx(card, "flex flex-col md:col-span-2 lg:col-span-2")}>
        <CardHeader
            titleId="card-video"
            title="Video"
            actions={
                <>
                    <Carousel.PrevTrigger>
                        {({ onClick, isDisabled }) => (
                            <Button
                                color="secondary"
                                size="sm"
                                iconLeading={ChevronLeft}
                                aria-label="Forrige video"
                                onPress={onClick}
                                isDisabled={isDisabled}
                            />
                        )}
                    </Carousel.PrevTrigger>
                    <Carousel.NextTrigger>
                        {({ onClick, isDisabled }) => (
                            <Button color="secondary" size="sm" iconLeading={ChevronRight} aria-label="Neste video" onPress={onClick} isDisabled={isDisabled} />
                        )}
                    </Carousel.NextTrigger>
                </>
            }
        />
        <div className={cardBody}>
            <Carousel.Content className="gap-2">
                {videos.map((title) => (
                    <Carousel.Item key={title}>
                        {/* Stand-in: the library has no video player. A 16:9 placeholder surface. */}
                        <div className="flex aspect-video items-center justify-center rounded-xl bg-tertiary text-tertiary">
                            <span className="flex flex-col items-center gap-2 text-sm">
                                <Play className="size-6 text-fg-quaternary" />
                                Videospiller
                            </span>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel.Content>
            <VideoCounter />
        </div>
    </Carousel.Root>
);

const StockTabs = () => {
    const selected = stockTabs[0].id;
    return (
        <>
            <NativeSelect
                aria-label="Velg side for Norwegian"
                value={selected}
                onChange={(event) => window.location.assign(event.target.value)}
                options={stockTabs.map((t) => ({ label: t.label, value: t.id }))}
                className="xl:hidden"
            />
            <Tabs.List type="underline" size="sm" aria-label="Norwegian Air Shuttle (NAS)" items={stockTabs} className="max-xl:hidden">
                {(tab) => <Tabs.Item {...tab} />}
            </Tabs.List>
        </>
    );
};

const NewsCard = () => {
    const [filter, setFilter] = useState<string>("alle");
    const [page, setPage] = useState(1);
    const items = filter === "alle" ? news : news.filter((n) => n.category === filter);

    return (
        <Card id="card-news" className="md:col-span-2 lg:col-span-4">
            <CardHeader
                titleId="card-news"
                title="Siste nytt"
                actions={<Button color="secondary" size="sm" iconLeading={ChevronRight} href="/ticker/NAS/nyheter" aria-label="Se alle nyheter om NAS" />}
            />
            <Tabs
                selectedKey={filter}
                onSelectionChange={(key) => {
                    setFilter(String(key));
                    setPage(1);
                }}
                className={cx(cardBody, "flex flex-1 flex-col gap-4")}
            >
                <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
                    <Tabs.List type="button-minimal" size="sm" aria-label="Filtrer nyheter">
                        {newsFilters.map((f) => (
                            <Tabs.Item key={f.id} id={f.id} label={f.label} />
                        ))}
                    </Tabs.List>
                </div>
                <Tabs.Panel id={filter}>
                    <ul className="flex flex-col">
                        {items.slice(0, 5).map((n) => (
                            <li key={n.id} className="flex gap-3 border-b border-secondary py-3 first:pt-0 last:border-b-0 last:pb-0">
                                <Avatar initials={n.initials} alt="" size="sm" />
                                <div className="flex min-w-0 flex-col gap-1">
                                    <p className="text-xs text-tertiary">
                                        {n.time} · {n.source}
                                    </p>
                                    <a
                                        href={`/nyheter/${n.id}`}
                                        className="text-sm font-semibold text-primary outline-focus-ring hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        {n.headline}
                                    </a>
                                    <p className="line-clamp-2 text-sm text-tertiary">{n.snippet}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Tabs.Panel>
            </Tabs>
            <PaginationCardDefault page={page} total={45} onPageChange={setPage} />
        </Card>
    );
};

const ConsensusCard = () => (
    <Card id="card-consensus" className="lg:col-span-2">
        <CardHeader titleId="card-consensus" title="Konsensus" />
        <div className={cx(cardBody, "flex flex-1 flex-col gap-4")}>
            <div className="flex flex-col gap-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Ai className="size-4 text-fg-brand-primary" />
                    Utsikter fra siste rapport
                </h3>
                <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-tertiary">
                    <li>Selskapet venter en kapasitetsvekst på 4–6 prosent i 2027, med størst økning på Syden-rutene.</li>
                    <li>Enhetskostnaden utenom drivstoff ventes å falle svakt, blant annet på grunn av nye fly.</li>
                    <li>Styret vil foreslå utbytte på nivå med i fjor dersom resultatet holder seg.</li>
                </ul>
            </div>
            <div className={cx(inset, "mt-auto flex flex-col gap-3")}>
                <p className="text-sm text-secondary">Gi ditt estimat for å se konsensus fra investorer og analytikere.</p>
                <Button size="sm" className="self-start">
                    Estimer
                </Button>
            </div>
        </div>
    </Card>
);

const FinancialsCard = () => {
    const [view, setView] = useState<"annual" | "quarterly">("annual");
    const data = financials[view];
    const latest = data[data.length - 1];

    return (
        <Card id="card-financials" className="lg:col-span-2">
            <CardHeader titleId="card-financials" title="Resultat og omsetning" />
            <Tabs selectedKey={view} onSelectionChange={(key) => setView(key as "annual" | "quarterly")} className={cx(cardBody, "flex flex-col gap-4")}>
                <Tabs.List type="button-minimal" size="sm" aria-label="Periode">
                    <Tabs.Item id="annual" label="Årlig" />
                    <Tabs.Item id="quarterly" label="Kvartalsvis" />
                </Tabs.List>
                <Tabs.Panel id={view} className="flex flex-col gap-4">
                    <p className="text-sm text-tertiary">
                        Omsetning {latest.period}: {nb(latest.revenue, { maximumFractionDigits: 1, minimumFractionDigits: 1 })} mrd, driftsresultat{" "}
                        {nb(latest.result, { maximumFractionDigits: 1, minimumFractionDigits: 1 })} mrd.
                    </p>
                    <div className="h-60">
                        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                            <BarChart data={data} margin={{ left: 0, right: 0, top: 4, bottom: 0 }} className="text-tertiary [&_.recharts-text]:text-xs">
                                <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                                <Legend verticalAlign="top" align="right" content={<ChartLegendContent className="pb-2" />} />
                                <XAxis dataKey="period" fill="currentColor" axisLine={false} tickLine={false} />
                                <YAxis
                                    fill="currentColor"
                                    axisLine={false}
                                    tickLine={false}
                                    width={32}
                                    tickFormatter={(v) => nb(Number(v), { maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                                />
                                <Tooltip
                                    content={<ChartTooltipContent />}
                                    formatter={(v) => `${nb(Number(v), { maximumFractionDigits: 1, minimumFractionDigits: 1 })} mrd`}
                                    cursor={{ className: "fill-utility-gray-200/20" }}
                                />
                                <Bar
                                    dataKey="revenue"
                                    name="Omsetning"
                                    isAnimationActive={false}
                                    className="text-utility-brand-600"
                                    fill="currentColor"
                                    maxBarSize={20}
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar
                                    dataKey="result"
                                    name="Driftsresultat"
                                    isAnimationActive={false}
                                    className="text-utility-brand-300"
                                    fill="currentColor"
                                    maxBarSize={20}
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Tabs.Panel>
            </Tabs>
        </Card>
    );
};

const OrderSide = ({ side, levels, max }: { side: "buy" | "sell"; levels: { qty: number; price: number }[]; max: number }) => {
    const buy = side === "buy";
    const total = levels.reduce((sum, l) => sum + l.qty, 0);
    const bar = buy ? "bg-fg-success-secondary" : "bg-fg-error-secondary";

    return (
        <div className="flex min-w-0 flex-col">
            <div className={cx("grid grid-cols-2 gap-2 pb-2", tableHeadLabel)} aria-hidden>
                <span className={buy ? "" : "order-2 text-right"}>Antall</span>
                <span className={buy ? "text-right" : "order-1"}>{buy ? "Kjøp" : "Selg"}</span>
            </div>
            <ul aria-label={buy ? "Kjøpsordre" : "Salgsordre"} className="flex flex-col">
                {levels.map((l) => (
                    <li key={l.price} className="flex flex-col gap-1 border-b border-secondary py-2">
                        <div className="grid grid-cols-2 gap-2 text-sm tabular-nums">
                            <span className={cx("text-tertiary", buy ? "" : "order-2 text-right")}>
                                {int(l.qty)}
                                <span className="sr-only"> aksjer til</span>
                            </span>
                            <span className={cx("font-medium text-primary", buy ? "text-right" : "order-1")}>{nb(l.price)}</span>
                        </div>
                        <div className={cx("flex", buy ? "justify-end" : "justify-start")} aria-hidden>
                            <div className={cx("h-1 rounded-full", bar)} style={{ width: `${(l.qty / max) * 100}%` }} />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex flex-col gap-1 pt-2">
                <p className={cx("text-sm font-semibold text-primary tabular-nums", buy ? "" : "text-right")}>
                    <span className="sr-only">{buy ? "Totalt kjøp: " : "Totalt salg: "}</span>
                    {int(total)}
                </p>
                <div className={cx("flex", buy ? "justify-end" : "justify-start")} aria-hidden>
                    <div className={cx("h-1 rounded-full", bar)} style={{ width: "100%" }} />
                </div>
            </div>
        </div>
    );
};

const OrderBookCard = () => {
    const max = Math.max(...orderBook.bids.map((l) => l.qty), ...orderBook.asks.map((l) => l.qty));
    const totalBuy = orderBook.bids.reduce((s, l) => s + l.qty, 0);
    const totalSell = orderBook.asks.reduce((s, l) => s + l.qty, 0);
    const totalMax = Math.max(totalBuy, totalSell);
    return (
        <Card id="card-orderbook" className="lg:col-span-2">
            <CardHeader
                titleId="card-orderbook"
                title="Ordredybde"
                badge={
                    <BadgeWithDot color="success" size="sm">
                        Ordinær handel
                    </BadgeWithDot>
                }
            />
            <div className={cx(cardBody, "grid grid-cols-2 gap-4")}>
                <OrderSide side="buy" levels={orderBook.bids} max={max} />
                <OrderSide side="sell" levels={orderBook.asks} max={max} />
                <p className="sr-only">
                    Totalt {int(totalBuy)} aksjer på kjøpssiden og {int(totalSell)} på salgssiden ({Math.round((totalBuy / totalMax) * 100)} mot{" "}
                    {Math.round((totalSell / totalMax) * 100)}).
                </p>
            </div>
        </Card>
    );
};

const KeyFiguresCard = () => (
    <Card id="card-keyfigures" className="lg:col-span-2">
        <CardHeader titleId="card-keyfigures" title="Nøkkeltall" />
        <dl className={cx(cardBody, "flex flex-col")}>
            {keyFigures.map((k) => (
                <div
                    key={k.label}
                    className="flex items-center justify-between gap-4 border-b border-secondary py-2.5 text-sm first:pt-0 last:border-b-0 last:pb-0"
                >
                    <dt className="text-tertiary">{k.label}</dt>
                    <dd className="font-medium text-primary tabular-nums">{k.value}</dd>
                </div>
            ))}
        </dl>
    </Card>
);

/** Stand-in: a marker on a neutral track (no Figma component). `position` is 0–100 %. */
const ScaleTrack = ({ markers }: { markers: { position: number; className: string }[] }) => (
    <div className="relative h-2 rounded-full bg-quaternary" aria-hidden>
        {markers.map((m, i) => (
            <span
                key={i}
                className={cx("absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full", m.className)}
                style={{ left: `${m.position}%` }}
            />
        ))}
    </div>
);

const RecommendationsCard = () => {
    const average = 1.8;
    const span = target.high - target.low;
    const at = (v: number) => ((v - target.low) / span) * 100;

    return (
        <Card id="card-recommendations" className="lg:col-span-3">
            <CardHeader titleId="card-recommendations" title="Anbefalinger" />
            <div className={cx(cardBody, "grid grid-cols-1 gap-6 xl:grid-cols-2")}>
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-tertiary">6 av 10 analytikere anbefalte kjøp i 3. kvartal 2026.</p>
                    <div className="h-60">
                        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                            <BarChart
                                data={recommendations}
                                margin={{ left: 0, right: 0, top: 4, bottom: 0 }}
                                className="text-tertiary [&_.recharts-text]:text-xs"
                            >
                                <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                                <Legend verticalAlign="bottom" content={<ChartLegendContent className="flex-wrap pt-2" />} />
                                <XAxis dataKey="quarter" fill="currentColor" axisLine={false} tickLine={false} />
                                <YAxis fill="currentColor" axisLine={false} tickLine={false} width={24} allowDecimals={false} />
                                <Tooltip content={<ChartTooltipContent />} cursor={{ className: "fill-utility-gray-200/20" }} />
                                {recommendationSeries.map((s, i) => (
                                    <Bar
                                        key={s.key}
                                        dataKey={s.key}
                                        name={s.name}
                                        stackId="rec"
                                        isAnimationActive={false}
                                        className={s.className}
                                        fill="currentColor"
                                        maxBarSize={28}
                                        radius={i === recommendationSeries.length - 1 ? [4, 4, 0, 0] : undefined}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className={cx(inset, "flex flex-col gap-3")}>
                        <div className="flex items-baseline justify-between gap-3">
                            <h3 className="text-sm font-medium text-tertiary">Snittanbefaling</h3>
                            <p className="text-sm font-semibold text-primary tabular-nums">
                                Overvekt {nb(average, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                            </p>
                        </div>
                        <ScaleTrack markers={[{ position: ((average - 1) / 4) * 100, className: "bg-fg-success-secondary" }]} />
                        <ol className="flex justify-between text-xs text-tertiary" aria-label="Skala fra 1 (Kjøp) til 5 (Selg)">
                            {estimateScale.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ol>
                    </div>
                    <div className={cx(inset, "flex flex-col gap-3")}>
                        <div className="flex items-baseline justify-between gap-3">
                            <h3 className="text-sm font-medium text-tertiary">Median kursmål</h3>
                            <p className="text-sm font-semibold text-primary tabular-nums">
                                {nb(target.median)} kr <Change percent={target.upside} />
                            </p>
                        </div>
                        <ScaleTrack
                            markers={[
                                { position: at(target.now), className: "bg-fg-quaternary" },
                                { position: at(target.average), className: "bg-fg-brand-primary" },
                                { position: at(target.high), className: "bg-fg-success-secondary" },
                            ]}
                        />
                        <dl className="grid grid-cols-3 text-xs">
                            <div>
                                <dt className="text-tertiary">Nå</dt>
                                <dd className="font-medium text-primary tabular-nums">{nb(target.now)}</dd>
                            </div>
                            <div className="text-center">
                                <dt className="text-tertiary">Snitt</dt>
                                <dd className="font-medium text-primary tabular-nums">{nb(target.average)}</dd>
                            </div>
                            <div className="text-right">
                                <dt className="text-tertiary">Høy</dt>
                                <dd className="font-medium text-primary tabular-nums">{nb(target.high)}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className={cx(inset, "flex flex-col gap-3")}>
                        <h3 className="text-sm font-medium text-tertiary">Historikk</h3>
                        <ol className="grid grid-cols-4 gap-2">
                            {recommendationHistory.map((h) => (
                                <li key={h.quarter} className="flex flex-col gap-0.5">
                                    <span className="text-xs text-tertiary">{h.quarter}</span>
                                    <span className="text-xs font-semibold text-primary tabular-nums">
                                        {h.label} {nb(h.score, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const TechnicalsCard = () => (
    <Card id="card-technicals" className="lg:col-span-3">
        <CardHeader titleId="card-technicals" title="Tekniske indikatorer" />
        <Table aria-labelledby="card-technicals" size="sm">
            <Table.Header>
                <Table.Head id="name" label="Navn" isRowHeader />
                <Table.Head id="value" label="Verdi" className="*:justify-end" />
                <Table.Head id="signal" label="Signal" className="*:justify-end" />
            </Table.Header>
            <Table.Body items={technicals}>
                {(t) => (
                    <Table.Row id={t.id}>
                        <Table.Cell>{t.name}</Table.Cell>
                        <Table.Cell className="text-right tabular-nums">{t.value}</Table.Cell>
                        <Table.Cell className="text-right">
                            <Badge color={signalBadge[t.signal].color} size="sm">
                                {signalBadge[t.signal].label}
                            </Badge>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
        <div className={cx(cardBody, "mt-auto flex flex-col gap-3 border-t border-secondary")}>
            <h3 className="text-sm font-semibold text-primary">Volum i dag mot historisk volum</h3>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {volumeVs.map((v) => (
                    <div key={v.label} className={cx(inset, "flex flex-col gap-0.5")}>
                        <dt className="text-xs font-medium text-tertiary">{v.label}</dt>
                        <dd className="text-sm font-semibold">
                            <Change percent={v.value} />
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    </Card>
);

const TradesCard = () => (
    <Card id="card-trades" className="lg:col-span-2">
        <CardHeader titleId="card-trades" title="Siste handler" />
        <Table aria-labelledby="card-trades" size="sm">
            <Table.Header>
                <Table.Head id="time" label="Tid" isRowHeader />
                <Table.Head id="price" label="Kurs" className="*:justify-end" />
                <Table.Head id="qty" label="Antall" className="*:justify-end" />
            </Table.Header>
            <Table.Body items={trades}>
                {(t) => (
                    <Table.Row id={t.id}>
                        <Table.Cell className="tabular-nums">{t.time}</Table.Cell>
                        <Table.Cell className="text-right tabular-nums">{nb(t.price)}</Table.Cell>
                        <Table.Cell className="text-right tabular-nums">{int(t.qty)}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </Card>
);

const DividendsCard = () => (
    <Card id="card-dividends" className="lg:col-span-2">
        <CardHeader titleId="card-dividends" title="Utbytte" />
        <Table aria-labelledby="card-dividends" size="sm">
            <Table.Header>
                <Table.Head id="amount" label="NOK per aksje" isRowHeader />
                <Table.Head id="date" label="Dato" className="*:justify-end" />
            </Table.Header>
            <Table.Body items={dividends}>
                {(d) => (
                    <Table.Row id={d.id}>
                        <Table.Cell className="tabular-nums">{nb(d.amount)}</Table.Cell>
                        <Table.Cell className="text-right tabular-nums">{d.date}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </Card>
);

const CalendarCard = () => (
    <Card id="card-calendar" className="lg:col-span-2">
        <CardHeader titleId="card-calendar" title="Finanskalender" />
        <Table aria-labelledby="card-calendar" size="sm">
            <Table.Header>
                <Table.Head id="type" label="Type" isRowHeader />
                <Table.Head id="date" label="Dato" />
                <Table.Head id="file" label="Fil" className="*:justify-end" />
            </Table.Header>
            <Table.Body items={calendar}>
                {(c) => (
                    <Table.Row id={c.id}>
                        <Table.Cell>{c.type}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap tabular-nums">{c.date}</Table.Cell>
                        <Table.Cell className="text-right">
                            <ButtonUtility
                                color="tertiary"
                                icon={Download}
                                tooltip={c.file ? `Last ned ${c.type.toLowerCase()} (PDF)` : "Ingen fil ennå"}
                                isDisabled={!c.file}
                                href={c.file ? `/filer/NAS/${c.id}.pdf` : undefined}
                            />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </Card>
);

const ReportsCard = () => (
    <Card id="card-reports" className="lg:col-span-2">
        <CardHeader titleId="card-reports" title="Års- og kvartalsrapporter" />
        <div className={cx(cardBody, "flex flex-col gap-4")}>
            <div className={cx(inset, "flex items-center gap-3")}>
                <Avatar initials="NA" alt="" size="sm" />
                <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate text-sm font-medium text-primary">4. kv. 2026</p>
                    <p className="text-xs text-tertiary">5. feb. 27 · Kvartalsrapport</p>
                </div>
                <Badge color="brand" size="sm">
                    Kommende
                </Badge>
            </div>
            <ul className="flex flex-col">
                {reports.map((r) => (
                    <li key={r.id} className="flex items-center justify-between gap-3 border-b border-secondary py-3 first:pt-0 last:border-b-0 last:pb-0">
                        <div className="flex min-w-0 flex-col gap-0.5">
                            <p className="text-sm font-medium text-primary">
                                {r.title} <span className="font-normal text-tertiary tabular-nums">{r.period}</span>
                            </p>
                            <p className="text-xs text-tertiary">
                                {r.date} · {r.type}
                            </p>
                        </div>
                        <ButtonUtility color="tertiary" icon={Download} tooltip={`Last ned ${r.title}`} href={`/filer/NAS/${r.id}.pdf`} />
                    </li>
                ))}
            </ul>
        </div>
    </Card>
);

const EarningsCallsCard = () => (
    <Card id="card-calls" className="lg:col-span-2">
        <CardHeader titleId="card-calls" title="Earnings calls" />
        <div className={cx(cardBody, "flex flex-col gap-4")}>
            <div className={cx(inset, "flex flex-col gap-3")}>
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col">
                        <p className="text-sm font-medium text-primary">4. kv. 2026</p>
                        <p className="text-xs text-tertiary">5. feb. 27 kl. 08.30</p>
                    </div>
                    <Badge color="brand" size="sm">
                        Kommende
                    </Badge>
                </div>
                <Button color="secondary" size="sm" iconLeading={CalendarAdd} className="self-start">
                    Legg i kalender
                </Button>
            </div>
            <ul className="flex flex-col">
                {earningsCalls.map((c) => (
                    <li key={c.id} className="flex items-center justify-between gap-3 border-b border-secondary py-3 first:pt-0 last:border-b-0 last:pb-0">
                        <div className="flex min-w-0 flex-col gap-0.5">
                            <p className="text-sm font-medium text-primary">{c.title}</p>
                            <p className="text-xs text-tertiary">
                                {c.date} · {c.minutes} min
                            </p>
                        </div>
                        <ButtonUtility color="tertiary" icon={Play} tooltip={`Spill av ${c.title}`} />
                    </li>
                ))}
            </ul>
        </div>
    </Card>
);

const PresentationsCard = () => (
    <Card id="card-presentations" className="lg:col-span-2">
        <CardHeader titleId="card-presentations" title="Kvartalspresentasjoner" />
        <div className={cx(cardBody, "flex flex-1 items-center justify-center")}>
            <EmptyState icon={Tv} title="Ingen presentasjoner" description="Norwegian har ingen kvartalspresentasjoner på video ennå." className="py-8" />
        </div>
    </Card>
);

/** Stand-in: the compact stock bar under the collapsed header (no component, no Figma frame). */
const StickyStockBar = ({ visible, watch }: { visible: boolean; watch: Watch }) => (
    <div className={cx("absolute inset-x-0 top-full border-b border-secondary bg-primary_alt", !visible && "hidden")} aria-hidden={!visible}>
        <div className="mx-auto flex w-full max-w-[1376px] items-center justify-between gap-3 px-4 py-2 md:px-8">
            <div className="flex min-w-0 items-baseline gap-3">
                <p className="truncate text-sm font-semibold text-primary">
                    {stock.name} <span className="font-normal text-tertiary">{stock.ticker}</span>
                </p>
                <p className="flex items-baseline gap-2 text-sm whitespace-nowrap">
                    <span className="font-semibold text-primary tabular-nums">{nb(stock.last)}</span>
                    <Change percent={stock.changePct} value={stock.change} className="max-sm:hidden" />
                    <Change percent={stock.changePct} className="sm:hidden" />
                </p>
            </div>
            <WatchlistButton {...watch} />
        </div>
    </div>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

/** Stock page, Markedsdata tab, for Norwegian Air Shuttle (NAS). Built from /Users/mihovil/Desktop/stock-page-brief.md. */
export const StockPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [showBar, setShowBar] = useState(false);
    const priceRef = useRef<HTMLDivElement>(null);
    const [watching, setWatching] = useState(false);
    const [realtime, setRealtime] = useState(false);
    const watch: Watch = {
        watching,
        onToggle: () => {
            setWatching(!watching);
            notify({ type: "success", title: watching ? "NAS er fjernet fra watchlisten" : "NAS er lagt til i watchlisten" });
        },
    };

    useEffect(() => {
        const onScroll = () => setCollapsed(window.scrollY > 120);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const el = priceRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0), {
            rootMargin: "-96px 0px 0px 0px",
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-dvh bg-secondary_alt">
            <div className="sticky top-0 z-30">
                <SiteHeader
                    brand="fa"
                    collapsed={collapsed}
                    navigation={navigation}
                    shortcuts={shortcuts}
                    user={{ initials: "MK", href: "/min-side" }}
                    menu={{
                        columns: [
                            {
                                title: "Børs",
                                href: "/bors",
                                items: [
                                    { label: "Aksjer", href: "/bors/aksjer" },
                                    { label: "Valuta", href: "/bors/valuta" },
                                ],
                            },
                            { title: "Podcast", href: "/podcast", items: [{ label: "Aksjepodden", href: "/podcast/aksjepodden" }] },
                        ],
                        eAvis: { weekday: "Onsdag", date: "28.10.2026", href: "/eavis" },
                    }}
                    loginHref="/logg-inn"
                    subscribeHref="/abonnement"
                    onSearchPress={() => undefined}
                />
                <StickyStockBar visible={showBar} watch={watch} />
            </div>

            <main className="mx-auto flex w-full max-w-[1376px] flex-col gap-6 px-4 py-6 md:px-8">
                <RealtimeBanner realtime={realtime} onRealtimeChange={setRealtime} />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
                    <StockHeaderCard priceRef={priceRef} watch={watch} realtime={realtime} />
                    <VideoCard />
                </div>

                <Tabs selectedKey={stockTabs[0].id}>
                    <StockTabs />
                    <Tabs.Panel id={stockTabs[0].id} className="pt-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
                            <NewsCard />
                            <ConsensusCard />
                            <FinancialsCard />
                            <OrderBookCard />
                            <KeyFiguresCard />
                            <RecommendationsCard />
                            <TechnicalsCard />
                            <TradesCard />
                            <DividendsCard />
                            <CalendarCard />
                            <ReportsCard />
                            <EarningsCallsCard />
                            <PresentationsCard />
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </main>

            <SiteFooter
                brand="fa"
                links={footerLinks}
                publisherInfo={["Utgis av Hegnar Media AS", "Ansvarlig redaktør: Trond Sundnes", "Hoffsveien 70 A, 0214 Oslo"]}
                copyright="©2026 Hegnar Media AS"
                disclaimer="Børsdata levert av Millistream og Infront. Kursene er forsinket med minst 15 minutter."
                disclaimerHref="/om-data"
                socialLinks={[
                    { platform: "facebook", href: "https://www.facebook.com/finansavisen" },
                    { platform: "x", href: "https://x.com/finansavisen" },
                    { platform: "linkedin", href: "https://www.linkedin.com/company/finansavisen" },
                ]}
                contactHref="/kontakt-oss"
                appStoreHref="https://apps.apple.com/no/app/finansavisen"
                googlePlayHref="https://play.google.com/store/apps/details?id=no.finansavisen"
            />
        </div>
    );
};
