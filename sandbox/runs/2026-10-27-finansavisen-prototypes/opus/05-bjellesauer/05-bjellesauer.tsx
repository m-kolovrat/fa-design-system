"use client";

import { useMemo, useState } from "react";
import type { CalendarDate } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
import { ArrowDown, ArrowUp, Clock, Download, Lock, Mail, Restart, Search, Users } from "fa-icons";
import type { DateValue, Key, SortDescriptor } from "react-aria-components";
import { I18nProvider as AriaI18nProvider } from "react-aria-components";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { SiteFooter } from "@/components/application/site-footer/site-footer";
import type { SiteNavItem } from "@/components/application/site-header/site-brands";
import { SiteHeader } from "@/components/application/site-header/site-header";
import type { TickerItem } from "@/components/application/site-header/ticker-bar";
import { Table, TableCard } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { getInitials } from "@/components/base/avatar/utils";
import { Badge } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select, type SelectItemType } from "@/components/base/select/select";
import { NativeSelect } from "@/components/base/select/select-native";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

/* -------------------------------------------------------------------------------------------------
 * Placeholder data. Investor names come from the brief; every trade except the two in the brief is
 * invented and must be replaced by the real register feed.
 * -----------------------------------------------------------------------------------------------*/

/** Date of the latest data received from the register (brief: "Siste data mottatt: 26.10.2026"). */
const DATA_DATE = "2026-10-26";

interface Investor {
    slug: string;
    name: string;
    /** Portfolio value in NOK (placeholder). */
    portfolioValue: number;
    /** Number of Oslo Børs positions (placeholder). */
    positions: number;
    /** Portfolio change this year in percent (placeholder). */
    changeYtd: number;
}

const investors: Investor[] = [
    { slug: "aasulv-tveitereid", name: "Aasulv Tveitereid", portfolioValue: 1_284_000_000, positions: 9, changeYtd: 31.42 },
    { slug: "john-fredriksen", name: "John Fredriksen", portfolioValue: 48_920_000_000, positions: 14, changeYtd: 12.08 },
    { slug: "kjell-inge-rokke", name: "Kjell Inge Røkke", portfolioValue: 39_410_000_000, positions: 11, changeYtd: -4.37 },
    { slug: "oystein-stray-spetalen", name: "Øystein Stray Spetalen", portfolioValue: 3_105_000_000, positions: 17, changeYtd: 22.9 },
    { slug: "christen-sveaas", name: "Christen Sveaas", portfolioValue: 9_870_000_000, positions: 12, changeYtd: 8.15 },
    { slug: "petter-stordalen", name: "Petter Stordalen", portfolioValue: 742_000_000, positions: 5, changeYtd: -11.64 },
    { slug: "gustav-witzoe", name: "Gustav Witzøe", portfolioValue: 27_300_000_000, positions: 4, changeYtd: -7.02 },
    { slug: "stein-erik-hagen", name: "Stein Erik Hagen", portfolioValue: 31_650_000_000, positions: 6, changeYtd: 5.48 },
    { slug: "tor-olav-troim", name: "Tor Olav Trøim", portfolioValue: 2_480_000_000, positions: 7, changeYtd: 18.73 },
    { slug: "bjorn-rune-gjelsten", name: "Bjørn Rune Gjelsten", portfolioValue: 1_960_000_000, positions: 8, changeYtd: -2.11 },
    { slug: "arne-fredly", name: "Arne Fredly", portfolioValue: 1_215_000_000, positions: 10, changeYtd: -15.86 },
    { slug: "trond-mohn", name: "Trond Mohn", portfolioValue: 5_530_000_000, positions: 6, changeYtd: 3.92 },
];

const investorBySlug = Object.fromEntries(investors.map((i) => [i.slug, i])) as Record<string, Investor>;

interface Stock {
    ticker: string;
    company: string;
}

const stocks: Stock[] = [
    { ticker: "NOD", company: "Nordic Semiconductor" },
    { ticker: "NAS", company: "Norwegian Air Shuttle" },
    { ticker: "PEXIP", company: "Pexip Holding" },
    { ticker: "KIT", company: "Kitron" },
    { ticker: "AKRBP", company: "Aker BP" },
    { ticker: "FRO", company: "Frontline" },
    { ticker: "MOWI", company: "Mowi" },
    { ticker: "SALM", company: "SalMar" },
    { ticker: "ORK", company: "Orkla" },
    { ticker: "SCATC", company: "Scatec" },
    { ticker: "AUTO", company: "AutoStore Holdings" },
    { ticker: "HAFNI", company: "Hafnia" },
    { ticker: "ELK", company: "Elkem" },
    { ticker: "TGS", company: "TGS" },
    { ticker: "BWLPG", company: "BW LPG" },
];

const companyByTicker = Object.fromEntries(stocks.map((s) => [s.ticker, s.company])) as Record<string, string>;

interface Trade {
    id: string;
    investor: string;
    ticker: string;
    /** Change in number of shares; negative is a sale. */
    change: number;
    /** Holding after the trade. */
    holding: number;
    /** Ownership after the trade, in percent of the company's shares. */
    ownership: number;
    /** Transaction value in NOK (always positive; the sign of `change` says buy or sell). */
    value: number;
    /** The company that executed the trade. */
    via: string;
    /** Trade date (ISO). */
    date: string;
}

const t = (
    id: number,
    date: string,
    investor: string,
    ticker: string,
    change: number,
    holding: number,
    ownership: number,
    valueM: number,
    via: string,
): Trade => ({
    id: `t${id}`,
    date,
    investor,
    ticker,
    change,
    holding,
    ownership,
    value: valueM * 1_000_000,
    via,
});

const trades: Trade[] = [
    t(1, "2026-10-22", "aasulv-tveitereid", "NOD", 400_000, 2_000_000, 1.00109, 67.88, "AAT Invest AS"),
    t(2, "2026-10-22", "john-fredriksen", "NAS", 743_950, 149_102_300, 14.32, 8.23, "Geveran Trading Co. Ltd"),
    t(3, "2026-10-22", "oystein-stray-spetalen", "PEXIP", -1_250_000, 6_800_000, 6.52, 71.25, "Ferncliff TIH AS"),
    t(4, "2026-10-21", "christen-sveaas", "KIT", 2_000_000, 9_500_000, 4.8, 66.4, "Kistefos AS"),
    t(5, "2026-10-21", "kjell-inge-rokke", "AKRBP", -150_000, 132_840_000, 21.0, 37.95, "Aker Capital AS"),
    t(6, "2026-10-20", "john-fredriksen", "FRO", 1_100_000, 105_600_000, 47.42, 254.1, "Hemen Holding Ltd"),
    t(7, "2026-10-20", "petter-stordalen", "SCATC", -300_000, 1_450_000, 0.91, 27.6, "Strawberry Equities AS"),
    t(8, "2026-10-17", "tor-olav-troim", "HAFNI", 500_000, 3_250_000, 0.64, 31.2, "Magni Partners Ltd"),
    t(9, "2026-10-16", "gustav-witzoe", "SALM", 25_000, 66_410_000, 50.12, 15.43, "Kverva Industrier AS"),
    t(10, "2026-10-15", "stein-erik-hagen", "ORK", -2_000_000, 249_800_000, 24.97, 214.0, "Canica AS"),
    t(11, "2026-10-14", "aasulv-tveitereid", "ELK", 1_500_000, 4_100_000, 0.64, 29.85, "AAT Invest AS"),
    t(12, "2026-10-13", "arne-fredly", "AUTO", -4_000_000, 12_300_000, 0.36, 41.2, "Apollo Asset Ltd"),
    t(13, "2026-10-09", "bjorn-rune-gjelsten", "BWLPG", 200_000, 2_700_000, 1.84, 26.4, "Velocity AS"),
    t(14, "2026-10-06", "trond-mohn", "TGS", 350_000, 5_850_000, 2.98, 32.9, "Frank Mohn AS"),
    t(15, "2026-10-02", "oystein-stray-spetalen", "NAS", 3_000_000, 21_400_000, 2.06, 33.3, "Ferncliff TIH AS"),
    t(16, "2026-09-29", "christen-sveaas", "MOWI", -120_000, 4_880_000, 0.94, 24.1, "Kistefos AS"),
    t(17, "2026-09-24", "john-fredriksen", "MOWI", 900_000, 74_920_000, 14.48, 180.9, "Geveran Trading Co. Ltd"),
    t(18, "2026-09-18", "tor-olav-troim", "FRO", -250_000, 1_900_000, 0.85, 60.25, "Magni Partners Ltd"),
    t(19, "2026-09-10", "petter-stordalen", "NOD", 60_000, 260_000, 0.13, 10.18, "Strawberry Equities AS"),
    t(20, "2026-08-27", "kjell-inge-rokke", "SCATC", 1_000_000, 26_400_000, 16.6, 92.0, "Aker Horizons AS"),
    t(21, "2026-08-12", "aasulv-tveitereid", "KIT", -600_000, 2_400_000, 1.21, 19.92, "AAT Invest AS"),
    t(22, "2026-07-03", "arne-fredly", "ELK", 2_500_000, 8_000_000, 1.25, 49.75, "Apollo Asset Ltd"),
    t(23, "2026-06-15", "stein-erik-hagen", "PEXIP", 800_000, 4_300_000, 4.12, 44.8, "Canica AS"),
    t(24, "2026-05-04", "trond-mohn", "HAFNI", -1_000_000, 6_200_000, 1.22, 62.4, "Frank Mohn AS"),
    t(25, "2026-03-19", "bjorn-rune-gjelsten", "AUTO", 3_200_000, 9_700_000, 0.28, 33.6, "Velocity AS"),
    t(26, "2026-02-02", "gustav-witzoe", "SALM", -40_000, 66_385_000, 50.09, 26.8, "Kverva Industrier AS"),
    t(27, "2025-11-20", "christen-sveaas", "TGS", 1_200_000, 7_100_000, 3.62, 129.6, "Kistefos AS"),
    t(28, "2024-09-05", "john-fredriksen", "BWLPG", 500_000, 9_100_000, 6.2, 73.0, "Hemen Holding Ltd"),
];

/* -------------------------------------------------------------------------------------------------
 * Formatting (Norwegian)
 * -----------------------------------------------------------------------------------------------*/

const intShares = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 });
const signedShares = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0, signDisplay: "exceptZero" });
const signedPercent = new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: "exceptZero" });
const ownershipFormat = new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 5 });
const millions = new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatMillions = (nok: number) => `${millions.format(nok / 1_000_000)} M NOK`;
const formatPortfolio = (nok: number) => (nok >= 1_000_000_000 ? `${millions.format(nok / 1_000_000_000)} mrd. NOK` : formatMillions(nok));
const formatDate = (iso: string) => iso.split("-").reverse().join(".");

/** Relative change in the holding: change ÷ holding before the trade. `null` for a new position. */
const relativeChange = (trade: Trade) => {
    const before = trade.holding - trade.change;
    return before <= 0 ? null : (trade.change / before) * 100;
};

/** Change value pattern from page-patterns.md (no component yet): sign and color by direction. */
const ChangeValue = ({ value, children, className }: { value: number; children: string; className?: string }) => (
    <span className={cx("tabular-nums", value > 0 && "text-success-primary", value < 0 && "text-error-primary", value === 0 && "text-tertiary", className)}>
        {children}
    </span>
);

const RelativeChange = ({ trade, className }: { trade: Trade; className?: string }) => {
    const relative = relativeChange(trade);
    if (relative === null) return <span className={cx("text-tertiary", className)}>Ny post</span>;
    return (
        <ChangeValue value={relative} className={className}>
            {`${signedPercent.format(relative)} %`}
        </ChangeValue>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Small composed pieces
 * -----------------------------------------------------------------------------------------------*/

const linkFocus = "rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2";

/** Ticker badge as a link to the stock page (page-patterns.md: "Always a link … when it's interactive"). */
const TickerLink = ({ ticker }: { ticker: string }) => (
    <a href={`/aksje/${ticker}`} className={cx("inline-flex rounded-full outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2")}>
        <Badge color="brand" size="sm" type="pill-color">
            {ticker}
        </Badge>
    </a>
);

const InvestorLink = ({ slug }: { slug: string }) => (
    <a href={`/bjellesauer/investor/${slug}`} className={cx("font-medium text-primary transition hover:underline", linkFocus)}>
        {investorBySlug[slug].name}
    </a>
);

const card = "rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5";

/* -------------------------------------------------------------------------------------------------
 * Periods
 * -----------------------------------------------------------------------------------------------*/

const periods = [
    { id: "1d", label: "1D" },
    { id: "1u", label: "1U" },
    { id: "1m", label: "1M" },
    { id: "3m", label: "3M" },
    { id: "6m", label: "6M" },
    { id: "ytd", label: "YTD" },
    { id: "1y", label: "1Y" },
    { id: "3y", label: "3Y" },
    { id: "all", label: "Alle" },
] as const;

type PeriodId = (typeof periods)[number]["id"];

const periodStart = (period: PeriodId): CalendarDate => {
    const end = parseDate(DATA_DATE);
    switch (period) {
        case "1d":
            return end.subtract({ days: 4 }); // last trading day before the T+2 register date
        case "1u":
            return end.subtract({ weeks: 1 });
        case "1m":
            return end.subtract({ months: 1 });
        case "3m":
            return end.subtract({ months: 3 });
        case "6m":
            return end.subtract({ months: 6 });
        case "ytd":
            return end.set({ month: 1, day: 1 });
        case "1y":
            return end.subtract({ years: 1 });
        case "3y":
            return end.subtract({ years: 3 });
        case "all":
            return parseDate("2000-01-01");
    }
};

type DateRange = { start: DateValue; end: DateValue };

const rangeForPeriod = (period: PeriodId): DateRange => ({ start: periodStart(period), end: parseDate(DATA_DATE) });

/* -------------------------------------------------------------------------------------------------
 * Sorting
 * -----------------------------------------------------------------------------------------------*/

type TradeColumn = "investor" | "stock" | "change" | "relative" | "value" | "ownership" | "holding" | "via" | "date";

const sortValue = (trade: Trade, column: TradeColumn): number | string => {
    switch (column) {
        case "investor":
            return investorBySlug[trade.investor].name;
        case "stock":
            return trade.ticker;
        case "change":
            return trade.change;
        case "relative":
            return relativeChange(trade) ?? Number.POSITIVE_INFINITY;
        case "value":
            return trade.value;
        case "ownership":
            return trade.ownership;
        case "holding":
            return trade.holding;
        case "via":
            return trade.via;
        case "date":
            return trade.date;
    }
};

const compare = (a: number | string, b: number | string) => (typeof a === "number" && typeof b === "number" ? a - b : String(a).localeCompare(String(b), "nb"));

/** The mobile sort select: the column heads behind it are hidden below `md`. */
const mobileSortOptions: { value: string; label: string; column: TradeColumn; direction: "ascending" | "descending" }[] = [
    { value: "date-descending", label: "Nyeste først", column: "date", direction: "descending" },
    { value: "date-ascending", label: "Eldste først", column: "date", direction: "ascending" },
    { value: "value-descending", label: "Størst verdi", column: "value", direction: "descending" },
    { value: "change-descending", label: "Største kjøp (antall)", column: "change", direction: "descending" },
    { value: "change-ascending", label: "Største salg (antall)", column: "change", direction: "ascending" },
    { value: "relative-descending", label: "Størst relativ endring", column: "relative", direction: "descending" },
    { value: "ownership-descending", label: "Høyest eierandel", column: "ownership", direction: "descending" },
    { value: "investor-ascending", label: "Investor A–Å", column: "investor", direction: "ascending" },
];

/* -------------------------------------------------------------------------------------------------
 * Trades table
 * -----------------------------------------------------------------------------------------------*/

const hideMobile = "hidden md:table-cell";
const PAGE_SIZE = 10;

const stockItems: SelectItemType[] = stocks.map((s) => ({ id: s.ticker, label: s.company, supportingText: s.ticker }));
const investorItems: SelectItemType[] = investors.map((i) => ({ id: i.slug, label: i.name }));

const TradeRows = ({ rows, teaser }: { rows: Trade[]; teaser?: boolean }) => (
    <Table.Body
        items={rows}
        renderEmptyState={() => (
            <EmptyState
                icon={Search}
                title="Ingen handler med disse filtrene"
                description="Velg en lengre periode, eller fjern filteret på aksje eller investor."
                className="py-12"
            />
        )}
    >
        {(trade) => (
            <Table.Row id={trade.id}>
                <Table.Cell>
                    <div className="flex items-start gap-3">
                        <Avatar size="sm" initials={getInitials(investorBySlug[trade.investor].name)} className="max-md:hidden" />
                        <div className="flex min-w-0 flex-col gap-1">
                            {teaser ? (
                                <span className="font-medium text-primary">{investorBySlug[trade.investor].name}</span>
                            ) : (
                                <InvestorLink slug={trade.investor} />
                            )}
                            {/* Below md the stock, executing company and date move under the name. */}
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:hidden">
                                <TickerLink ticker={trade.ticker} />
                                <span className="text-xs text-tertiary">{companyByTicker[trade.ticker]}</span>
                            </div>
                            <span className="text-xs text-tertiary md:hidden">
                                {formatDate(trade.date)} · {trade.via}
                            </span>
                        </div>
                    </div>
                </Table.Cell>
                <Table.Cell className={hideMobile}>
                    <div className="flex flex-col items-start gap-1">
                        <TickerLink ticker={trade.ticker} />
                        <span className="text-xs whitespace-nowrap text-tertiary">{companyByTicker[trade.ticker]}</span>
                    </div>
                </Table.Cell>
                <Table.Cell className="text-right">
                    <div className="flex flex-col items-end gap-0.5">
                        <ChangeValue value={trade.change} className="font-medium whitespace-nowrap">
                            {signedShares.format(trade.change)}
                        </ChangeValue>
                        {/* Below md the relative change, value, ownership and holding stack under the change. */}
                        <RelativeChange trade={trade} className="text-xs md:hidden" />
                        <span className="text-xs whitespace-nowrap text-primary tabular-nums md:hidden">{formatMillions(trade.value)}</span>
                        <span className="text-xs whitespace-nowrap text-tertiary tabular-nums md:hidden">Eier {ownershipFormat.format(trade.ownership)} %</span>
                        <span className="text-xs whitespace-nowrap text-tertiary tabular-nums md:hidden">{intShares.format(trade.holding)} aksjer</span>
                    </div>
                </Table.Cell>
                <Table.Cell className={cx(hideMobile, "text-right whitespace-nowrap")}>
                    <RelativeChange trade={trade} />
                </Table.Cell>
                <Table.Cell className={cx(hideMobile, "text-right whitespace-nowrap text-primary tabular-nums")}>{formatMillions(trade.value)}</Table.Cell>
                <Table.Cell className={cx(hideMobile, "text-right whitespace-nowrap tabular-nums")}>{ownershipFormat.format(trade.ownership)} %</Table.Cell>
                <Table.Cell className={cx(hideMobile, "text-right whitespace-nowrap tabular-nums")}>{intShares.format(trade.holding)}</Table.Cell>
                <Table.Cell className={cx(hideMobile, "whitespace-nowrap")}>{trade.via}</Table.Cell>
                <Table.Cell className={cx(hideMobile, "text-right whitespace-nowrap tabular-nums")}>{formatDate(trade.date)}</Table.Cell>
            </Table.Row>
        )}
    </Table.Body>
);

const TradeHeader = ({ sortable }: { sortable: boolean }) => (
    <Table.Header>
        <Table.Head id="investor" label="Investor" isRowHeader allowsSorting={sortable} />
        <Table.Head id="stock" label="Aksje" allowsSorting={sortable} className={hideMobile} />
        <Table.Head
            id="change"
            label="Endring"
            allowsSorting={sortable}
            tooltip="Endring i antall aksjer. + er kjøp, − er salg."
            className="[&>div]:justify-end"
        />
        <Table.Head
            id="relative"
            label="Endring %"
            allowsSorting={sortable}
            tooltip="Endringen i prosent av beholdningen før handelen."
            className={cx(hideMobile, "[&>div]:justify-end")}
        />
        <Table.Head
            id="value"
            label="Verdi"
            allowsSorting={sortable}
            tooltip="Transaksjonsverdi i millioner kroner."
            className={cx(hideMobile, "[&>div]:justify-end")}
        />
        <Table.Head id="ownership" label="Eierandel" allowsSorting={sortable} className={cx(hideMobile, "[&>div]:justify-end")} />
        <Table.Head id="holding" label="Beholdning" allowsSorting={sortable} className={cx(hideMobile, "[&>div]:justify-end")} />
        <Table.Head id="via" label="Utført av" allowsSorting={sortable} className={hideMobile} />
        <Table.Head id="date" label="Dato" allowsSorting={sortable} className={cx(hideMobile, "[&>div]:justify-end")} />
    </Table.Header>
);

const TradesCard = () => {
    const [stock, setStock] = useState<Key | null>(null);
    const [investor, setInvestor] = useState<Key | null>(null);
    const [period, setPeriod] = useState<PeriodId | null>("1m");
    const [range, setRange] = useState<DateRange>(rangeForPeriod("1m"));
    const [draftRange, setDraftRange] = useState<DateRange>(range);
    const [sort, setSort] = useState<SortDescriptor>({ column: "date", direction: "descending" });
    const [page, setPage] = useState(1);

    const choosePeriod = (id: PeriodId) => {
        const next = rangeForPeriod(id);
        setPeriod(id);
        setRange(next);
        setDraftRange(next);
        setPage(1);
    };

    const filtered = useMemo(() => {
        const rows = trades.filter((trade) => {
            const date = parseDate(trade.date);
            if (stock && trade.ticker !== stock) return false;
            if (investor && trade.investor !== investor) return false;
            return date.compare(range.start) >= 0 && date.compare(range.end) <= 0;
        });
        const column = sort.column as TradeColumn;
        return rows.sort((a, b) => {
            const d = compare(sortValue(a, column), sortValue(b, column));
            return sort.direction === "descending" ? -d : d;
        });
    }, [stock, investor, range, sort]);

    const total = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const isFiltered = stock !== null || investor !== null || period !== "1m";

    const reset = () => {
        setStock(null);
        setInvestor(null);
        choosePeriod("1m");
    };

    return (
        <TableCard.Root size="sm">
            <TableCard.Header
                title="Siste registrerte handler"
                description={`${filtered.length} handler · Siste data mottatt: ${formatDate(DATA_DATE)}`}
                contentTrailing={
                    <Button color="secondary" size="sm" iconLeading={Download} href="/bjellesauer/eksport.csv">
                        Last ned CSV
                    </Button>
                }
            />

            {/* Filter bar */}
            <div className="flex flex-col gap-4 border-b border-secondary px-4 py-4 md:px-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Select.ComboBox
                        label="Aksje"
                        placeholder="Søk etter aksje"
                        size="sm"
                        shortcut={false}
                        items={stockItems}
                        value={stock}
                        onChange={(key) => {
                            setStock(key);
                            setPage(1);
                        }}
                    >
                        {(item) => (
                            <Select.Item id={item.id} supportingText={item.supportingText}>
                                {item.label}
                            </Select.Item>
                        )}
                    </Select.ComboBox>
                    <Select.ComboBox
                        label="Investor"
                        placeholder="Søk etter investor"
                        size="sm"
                        shortcut={false}
                        icon={Users}
                        items={investorItems}
                        value={investor}
                        onChange={(key) => {
                            setInvestor(key);
                            setPage(1);
                        }}
                    >
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select.ComboBox>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
                    {/* Nine periods don't fit a 375 px row: native select below md, button group from md. */}
                    <NativeSelect
                        label="Periode"
                        size="sm"
                        className="md:hidden"
                        value={period ?? "custom"}
                        onChange={(event) => event.target.value !== "custom" && choosePeriod(event.target.value as PeriodId)}
                        options={[
                            ...periods.map((p) => ({ label: p.label, value: p.id })),
                            ...(period === null ? [{ label: "Egendefinert", value: "custom" }] : []),
                        ]}
                    />
                    <ButtonGroup
                        aria-label="Periode"
                        size="sm"
                        className="max-md:hidden"
                        selectedKeys={period ? [period] : []}
                        onSelectionChange={(keys) => {
                            const [first] = [...keys];
                            if (first) choosePeriod(first as PeriodId);
                        }}
                    >
                        {periods.map((p) => (
                            <ButtonGroupItem key={p.id} id={p.id}>
                                {p.label}
                            </ButtonGroupItem>
                        ))}
                    </ButtonGroup>

                    <div className="flex flex-wrap items-center gap-3">
                        <DateRangePicker
                            aria-label="Velg periode med datoer"
                            size="sm"
                            maxValue={parseDate(DATA_DATE)}
                            value={draftRange}
                            onChange={(value) => value && setDraftRange(value)}
                            onApply={() => {
                                setRange(draftRange);
                                setPeriod(null);
                                setPage(1);
                            }}
                            onCancel={() => setDraftRange(range)}
                        />
                        {isFiltered && (
                            <Button color="link-gray" size="sm" iconLeading={Restart} onPress={reset}>
                                Nullstill filtre
                            </Button>
                        )}
                    </div>
                </div>

                <NativeSelect
                    label="Sorter etter"
                    size="sm"
                    className="md:hidden"
                    value={`${String(sort.column)}-${sort.direction}`}
                    onChange={(event) => {
                        const option = mobileSortOptions.find((o) => o.value === event.target.value);
                        if (option) setSort({ column: option.column, direction: option.direction });
                    }}
                    options={[
                        ...mobileSortOptions.map((o) => ({ label: o.label, value: o.value })),
                        ...(mobileSortOptions.some((o) => o.value === `${String(sort.column)}-${sort.direction}`)
                            ? []
                            : [{ label: "Valgt i tabellen", value: `${String(sort.column)}-${sort.direction}` }]),
                    ]}
                />
            </div>

            <Table aria-label="Siste registrerte handler" sortDescriptor={sort} onSortChange={setSort}>
                <TradeHeader sortable />
                <TradeRows rows={visible} />
            </Table>

            {filtered.length > PAGE_SIZE && <PaginationCardDefault page={page} total={total} onPageChange={setPage} />}
        </TableCard.Root>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Investors table
 * -----------------------------------------------------------------------------------------------*/

type InvestorColumn = "name" | "positions" | "portfolioValue" | "changeYtd" | "lastTrade";

const lastTradeDate = (slug: string) =>
    trades
        .filter((trade) => trade.investor === slug)
        .map((trade) => trade.date)
        .sort()
        .at(-1) ?? "";

const InvestorsCard = () => {
    const [sort, setSort] = useState<SortDescriptor>({ column: "portfolioValue", direction: "descending" });

    const rows = useMemo(() => {
        const column = sort.column as InvestorColumn;
        const value = (i: Investor) => (column === "name" ? i.name : column === "lastTrade" ? lastTradeDate(i.slug) : i[column]);
        return [...investors].sort((a, b) => {
            const d = compare(value(a), value(b));
            return sort.direction === "descending" ? -d : d;
        });
    }, [sort]);

    return (
        <TableCard.Root size="sm">
            <TableCard.Header title="Alle investorer" description={`${investors.length} investorer · Porteføljer på Oslo Børs`} />
            <Table aria-label="Alle investorer" sortDescriptor={sort} onSortChange={setSort}>
                <Table.Header>
                    <Table.Head id="name" label="Investor" isRowHeader allowsSorting />
                    <Table.Head id="positions" label="Aksjer" allowsSorting className={cx(hideMobile, "[&>div]:justify-end")} />
                    <Table.Head id="portfolioValue" label="Porteføljeverdi" allowsSorting className="[&>div]:justify-end" />
                    <Table.Head id="changeYtd" label="I år" allowsSorting tooltip="Endring i porteføljeverdi hittil i år." className="[&>div]:justify-end" />
                    <Table.Head id="lastTrade" label="Siste handel" allowsSorting className={cx(hideMobile, "[&>div]:justify-end")} />
                </Table.Header>
                <Table.Body items={rows}>
                    {(i) => (
                        <Table.Row id={i.slug}>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <Avatar size="sm" initials={getInitials(i.name)} />
                                    <InvestorLink slug={i.slug} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className={cx(hideMobile, "text-right tabular-nums")}>{i.positions}</Table.Cell>
                            <Table.Cell className="text-right whitespace-nowrap text-primary tabular-nums">{formatPortfolio(i.portfolioValue)}</Table.Cell>
                            <Table.Cell className="text-right whitespace-nowrap">
                                <ChangeValue value={i.changeYtd}>{`${signedPercent.format(i.changeYtd)} %`}</ChangeValue>
                            </Table.Cell>
                            <Table.Cell className={cx(hideMobile, "text-right tabular-nums")}>{formatDate(lastTradeDate(i.slug))}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Winners and losers (widget cards)
 * -----------------------------------------------------------------------------------------------*/

const RankingCard = ({ kind }: { kind: "winners" | "losers" }) => {
    const winners = kind === "winners";
    const rows = [...investors].sort((a, b) => (winners ? b.changeYtd - a.changeYtd : a.changeYtd - b.changeYtd)).slice(0, 5);
    const title = winners ? "Vinnere i år" : "Tapere i år";

    return (
        <section className={card} aria-labelledby={`${kind}-title`}>
            <header className="mb-3 flex items-center gap-3">
                <FeaturedIcon icon={winners ? ArrowUp : ArrowDown} color={winners ? "success" : "error"} theme="light" size="sm" />
                <h2 id={`${kind}-title`} className="text-lg font-semibold text-primary">
                    {title}
                </h2>
            </header>
            <ol>
                {rows.map((i, index) => (
                    <li key={i.slug} className="flex items-center gap-3 border-b border-secondary py-3 last:border-b-0">
                        <span className="w-4 text-sm text-quaternary tabular-nums">{index + 1}</span>
                        <Avatar size="sm" initials={getInitials(i.name)} />
                        <div className="flex min-w-0 flex-1 flex-col">
                            <InvestorLink slug={i.slug} />
                            <span className="text-xs text-tertiary tabular-nums">{formatPortfolio(i.portfolioValue)}</span>
                        </div>
                        <ChangeValue value={i.changeYtd} className="text-sm font-medium">{`${signedPercent.format(i.changeYtd)} %`}</ChangeValue>
                    </li>
                ))}
            </ol>
        </section>
    );
};

/* -------------------------------------------------------------------------------------------------
 * About the data and newsletter
 * -----------------------------------------------------------------------------------------------*/

const AboutCard = () => (
    <section className={cx(card, "lg:col-span-4")} aria-labelledby="om-dataene">
        <h2 id="om-dataene" className="text-lg font-semibold text-primary">
            Om dataene
        </h2>
        <div className="mt-3 flex flex-col gap-3 text-sm text-tertiary">
            <p>
                Oversikten bygger på endringer i aksjonærregisteret for selskaper notert på Oslo Børs og Euronext Growth. Registeret oppdateres om lag to
                handelsdager etter at handelen er gjort (T+2), og vi henter nye data hver natt ca. kl. 23.00.
            </p>
            <h3 className="font-semibold text-secondary">Hvem er med</h3>
            <ul className="list-disc space-y-1 pl-5">
                <li>Investorer på Finansavisens liste over bjellesauer, med alle selskaper de kontrollerer.</li>
                <li>Endringer på minst 1 MNOK eller 0,1 prosentpoeng av selskapets aksjer.</li>
                <li>Aksjelån, emisjoner og interne overføringer mellom investorens egne selskaper er holdt utenfor.</li>
            </ul>
            <p className="text-xs">
                Ansvarsfraskrivelse: Oversikten er ment som inspirasjon og er ikke investeringsråd. Finansavisen tar forbehold om feil i registerdataene.
                Handler kan være gjort av grunner som ikke fremgår av registeret.
            </p>
        </div>
    </section>
);

const NewsletterCard = () => {
    const [email, setEmail] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [done, setDone] = useState(false);

    return (
        <section className={cx(card, "lg:col-span-2")} aria-labelledby="nyhetsbrev">
            <header className="mb-3 flex items-center gap-3">
                <FeaturedIcon icon={Mail} color="brand" theme="light" size="sm" />
                <h2 id="nyhetsbrev" className="text-lg font-semibold text-primary">
                    Bjellesau-varsel
                </h2>
            </header>
            <p className="text-sm text-tertiary">Få de nyeste handlene på e-post hver morgen kl. 07.00.</p>
            <form
                className="mt-4 flex flex-col gap-3"
                onSubmit={(event) => {
                    event.preventDefault();
                    const ok = /^\S+@\S+\.\S+$/.test(email);
                    setInvalid(!ok);
                    setDone(ok);
                }}
            >
                <Input
                    label="E-post"
                    type="email"
                    autoComplete="email"
                    icon={Mail}
                    placeholder="kari.nordmann@firma.no"
                    value={email}
                    onChange={setEmail}
                    isInvalid={invalid}
                    hint={invalid ? "Skriv inn en gyldig e-postadresse" : undefined}
                />
                <Button type="submit" size="md">
                    Abonner på nyhetsbrevet
                </Button>
                <p aria-live="polite" className="text-sm text-success-primary">
                    {done ? "Takk! Du får første nyhetsbrev i morgen tidlig." : ""}
                </p>
            </form>
        </section>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Logged-out teaser
 * -----------------------------------------------------------------------------------------------*/

const teaserRows = [...trades].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

const TeaserCard = () => (
    <TableCard.Root size="sm">
        <TableCard.Header title="Siste registrerte handler" description={`Siste data mottatt: ${formatDate(DATA_DATE)}`} />
        <Table aria-label="Utvalg av siste registrerte handler">
            <TradeHeader sortable={false} />
            <TradeRows rows={teaserRows} teaser />
        </Table>

        {/* Paywall box: page-patterns.md stand-in, no component yet. */}
        <div className="border-t border-secondary px-4 py-8 md:px-5">
            <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
                <FeaturedIcon icon={Lock} color="brand" theme="light" size="lg" />
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-primary">Se alle handlene med Finansavisen Pluss</h2>
                    <p className="text-sm text-tertiary">
                        Følg hva bjellesauene kjøper og selger, filtrer på aksje og investor, se porteføljene og last ned dataene.
                    </p>
                </div>
                <p className="text-md font-semibold text-primary">Bli abonnent fra 99 kr første måned</p>
                <Button size="lg" href="/abonnement" className="w-full sm:w-auto">
                    Bli abonnent
                </Button>
                <p className="text-sm text-tertiary">
                    Har du allerede en konto?{" "}
                    <Button color="link-color" size="sm" href="/logg-inn">
                        Logg inn
                    </Button>
                </p>
            </div>
        </div>
    </TableCard.Root>
);

/* -------------------------------------------------------------------------------------------------
 * Page frame
 * -----------------------------------------------------------------------------------------------*/

const navigation: SiteNavItem[][] = [
    [
        { label: "Siste nytt", href: "/siste" },
        { label: "MittFA", href: "/mittfa" },
    ],
    [
        {
            label: "Børs",
            href: "/bors",
            current: true,
            items: [
                { label: "Børsoversikt", href: "/bors" },
                { label: "Aksjer", href: "/bors/aksjer" },
                { label: "Bjellesauer", href: "/bjellesauer" },
                { label: "Rapporter", href: "/bors/rapporter" },
            ],
        },
        { label: "Makro", href: "/makro" },
        { label: "Eiendom", href: "/eiendom" },
        { label: "Shipping", href: "/shipping" },
        { label: "Forum", href: "/forum" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors", current: true },
    { label: "Forum", href: "/forum" },
    { label: "MittFA", href: "/mittfa" },
];

const ticker: TickerItem[] = [
    { label: "Oslo Børs", value: "1 712,48", change: "0,62%", direction: "up", href: "/ticker/OSEBX" },
    { label: "Brent spot", value: "74,15", change: "-0,88%", direction: "down", href: "/ticker/BRENT" },
    { label: "USD/NOK", value: "10,94", change: "0,21%", direction: "up", href: "/ticker/USDNOK" },
    { label: "Nordic Semi", value: "169,70", change: "2,35%", direction: "up", href: "/aksje/NOD" },
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

const tabs = [
    { id: "handler", label: "Siste handler" },
    { id: "investorer", label: "Investorer" },
    { id: "vinnere", label: "Vinnere og tapere" },
];

export interface BjellesauerPageProps {
    /** `false` shows the logged-out teaser with three trades and a paywall box. */
    isSubscriber?: boolean;
}

export const BjellesauerPage = ({ isSubscriber = true }: BjellesauerPageProps) => {
    const [tab, setTab] = useState<Key>("handler");

    return (
        <AriaI18nProvider locale="nb-NO">
            <div className="min-h-dvh bg-secondary_alt">
                <SiteHeader
                    brand="fa"
                    navigation={navigation}
                    shortcuts={shortcuts}
                    tickerItems={ticker}
                    user={isSubscriber ? { initials: "KN", href: "/min-side" } : undefined}
                    loginHref="/logg-inn"
                    subscribeHref="/abonnement"
                    onSearchPress={() => undefined}
                />

                <main className="mx-auto w-full max-w-container px-4 py-6 md:px-8">
                    <div className="mb-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">Bjellesauer</h1>
                            {!isSubscriber && <Lock aria-label="Pluss-innhold" className="size-5 text-fg-quaternary" />}
                        </div>
                        <p className="text-md text-tertiary">Se hva Norges mest kjente investorer kjøper og selger på Oslo Børs.</p>
                        <p className="flex items-start gap-1.5 text-xs font-medium text-tertiary">
                            <Clock className="size-4 shrink-0 text-fg-quaternary" />
                            <span>
                                Siste data mottatt: {formatDate(DATA_DATE)} · Oppdateres hver natt ca. kl. 23.00 med handler fra om lag to handelsdager
                                tidligere (T+2)
                            </span>
                        </p>
                    </div>

                    {isSubscriber ? (
                        <Tabs selectedKey={tab} onSelectionChange={setTab}>
                            <NativeSelect
                                aria-label="Velg visning"
                                className="mb-4 md:hidden"
                                value={String(tab)}
                                onChange={(event) => setTab(event.target.value)}
                                options={tabs.map((x) => ({ label: x.label, value: x.id }))}
                            />
                            <Tabs.List type="underline" aria-label="Bjellesauer" items={tabs} className="max-md:hidden">
                                {(item) => <Tabs.Item {...item} />}
                            </Tabs.List>
                            <Tabs.Panel id="handler" className="md:pt-6">
                                <TradesCard />
                            </Tabs.Panel>
                            <Tabs.Panel id="investorer" className="md:pt-6">
                                <InvestorsCard />
                            </Tabs.Panel>
                            <Tabs.Panel id="vinnere" className="md:pt-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <RankingCard kind="winners" />
                                    <RankingCard kind="losers" />
                                </div>
                            </Tabs.Panel>
                        </Tabs>
                    ) : (
                        <TeaserCard />
                    )}

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-6">
                        <AboutCard />
                        <NewsletterCard />
                    </div>
                </main>

                <SiteFooter
                    brand="fa"
                    links={footerLinks}
                    publisherInfo={["Utgis av Finansavisen AS", "Ansvarlig redaktør: Trond Sundnes", "Hoffsveien 70 A, 0214 Oslo"]}
                    copyright="©2026 Finansavisen AS"
                    disclaimer="Børsdata levert av Millistream. Aksjonærdata fra VPS."
                    disclaimerHref="/om-data"
                    contactHref="/kontakt-oss"
                    socialLinks={[
                        { platform: "facebook", href: "https://www.facebook.com/finansavisen" },
                        { platform: "x", href: "https://x.com/finansavisen" },
                        { platform: "linkedin", href: "https://www.linkedin.com/company/finansavisen" },
                    ]}
                    appStoreHref="https://apps.apple.com/no/app/finansavisen"
                    googlePlayHref="https://play.google.com/store/apps/details?id=no.finansavisen"
                />
            </div>
        </AriaI18nProvider>
    );
};
