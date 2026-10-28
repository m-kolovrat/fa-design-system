"use client";

import { type ReactNode, useMemo, useState } from "react";
import { type DateValue, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { ArrowDown, ArrowUp, Download, Lock, Mail } from "fa-icons";
import type { Key, SortDescriptor } from "react-aria-components";
import { I18nProvider as AriaI18nProvider } from "react-aria-components";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { SiteFooter } from "@/components/application/site-footer/site-footer";
import { footerLinks } from "@/components/application/site-footer/site-footer.demo";
import { SiteHeader } from "@/components/application/site-header/site-header";
import { menu, navigation, shortcuts, tickerItems } from "@/components/application/site-header/site-header.demo";
import { Table, TableCard } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { cx } from "@/utils/cx";

/* ------------------------------------------------------------------ data */

interface Trade {
    id: string;
    investor: string;
    initials: string;
    ticker: string;
    company: string;
    /** Change in number of shares, negative = sale. */
    shares: number;
    /** Relative change of the holding, in percent. */
    relative: number;
    /** Transaction value in million NOK, negative = sale. */
    valueM: number;
    /** New ownership share, in percent. */
    ownership: number;
    /** New holding, number of shares. */
    holding: number;
    executor: string;
    /** ISO date of the trade. */
    date: string;
}

/** PLACEHOLDER data. Only the first two rows come from the brief; everything else is invented. */
const trades: Trade[] = [
    {
        id: "t1",
        investor: "Aasulv Tveitereid",
        initials: "AT",
        ticker: "NOD",
        company: "Nordic Semiconductor",
        shares: 400000,
        relative: 25,
        valueM: 67.88,
        ownership: 1.00109,
        holding: 2000000,
        executor: "AAT Invest AS",
        date: "2026-10-22",
    },
    {
        id: "t2",
        investor: "John Fredriksen",
        initials: "JF",
        ticker: "NAS",
        company: "Norwegian Air Shuttle",
        shares: 743950,
        relative: 0.27,
        valueM: 8.23,
        ownership: 14.32,
        holding: 273700000,
        executor: "Geveran Trading Co Ltd",
        date: "2026-10-22",
    },
    {
        id: "t3",
        investor: "Kari Bruun-Hansen",
        initials: "KB",
        ticker: "EQNR",
        company: "Equinor",
        shares: -25000,
        relative: -8.3,
        valueM: -7.19,
        ownership: 0.01,
        holding: 276000,
        executor: "Bruun Invest AS",
        date: "2026-10-21",
    },
    {
        id: "t4",
        investor: "Ole Martin Sæther",
        initials: "OS",
        ticker: "KOG",
        company: "Kongsberg Gruppen",
        shares: 12000,
        relative: 4.1,
        valueM: 11.4,
        ownership: 0.35,
        holding: 304500,
        executor: "Sæther Holding AS",
        date: "2026-10-21",
    },
    {
        id: "t5",
        investor: "Aasulv Tveitereid",
        initials: "AT",
        ticker: "AKER",
        company: "Aker ASA",
        shares: -6000,
        relative: -3.2,
        valueM: -5.52,
        ownership: 0.78,
        holding: 181000,
        executor: "AAT Invest AS",
        date: "2026-10-20",
    },
    {
        id: "t6",
        investor: "Randi Lunde Nygård",
        initials: "RN",
        ticker: "DNB",
        company: "DNB Bank",
        shares: 40000,
        relative: 12.5,
        valueM: 9.32,
        ownership: 0.03,
        holding: 360000,
        executor: "Nygård Kapital AS",
        date: "2026-10-20",
    },
    {
        id: "t7",
        investor: "Ole Martin Sæther",
        initials: "OS",
        ticker: "MOWI",
        company: "Mowi",
        shares: -90000,
        relative: -15,
        valueM: -17.1,
        ownership: 0.12,
        holding: 510000,
        executor: "Sæther Holding AS",
        date: "2026-10-19",
    },
    {
        id: "t8",
        investor: "Kari Bruun-Hansen",
        initials: "KB",
        ticker: "TEL",
        company: "Telenor",
        shares: 55000,
        relative: 18.3,
        valueM: 8.14,
        ownership: 0.04,
        holding: 355500,
        executor: "Bruun Invest AS",
        date: "2026-10-16",
    },
    {
        id: "t9",
        investor: "John Fredriksen",
        initials: "JF",
        ticker: "FRO",
        company: "Frontline",
        shares: -300000,
        relative: -0.4,
        valueM: -52.8,
        ownership: 39.1,
        holding: 78200000,
        executor: "Hemen Holding Ltd",
        date: "2026-10-14",
    },
    {
        id: "t10",
        investor: "Randi Lunde Nygård",
        initials: "RN",
        ticker: "ORK",
        company: "Orkla",
        shares: 25000,
        relative: 6.9,
        valueM: 3.01,
        ownership: 0.03,
        holding: 387500,
        executor: "Nygård Kapital AS",
        date: "2026-10-09",
    },
    {
        id: "t11",
        investor: "Aasulv Tveitereid",
        initials: "AT",
        ticker: "NOD",
        company: "Nordic Semiconductor",
        shares: 150000,
        relative: 10.3,
        valueM: 24.3,
        ownership: 0.8,
        holding: 1600000,
        executor: "AAT Invest AS",
        date: "2026-09-29",
    },
    {
        id: "t12",
        investor: "Ole Martin Sæther",
        initials: "OS",
        ticker: "YAR",
        company: "Yara International",
        shares: 8000,
        relative: 2.8,
        valueM: 2.62,
        ownership: 0.01,
        holding: 293500,
        executor: "Sæther Holding AS",
        date: "2026-09-18",
    },
    {
        id: "t13",
        investor: "Kari Bruun-Hansen",
        initials: "KB",
        ticker: "SALM",
        company: "SalMar",
        shares: -4500,
        relative: -11.1,
        valueM: -2.04,
        ownership: 0.0,
        holding: 36000,
        executor: "Bruun Invest AS",
        date: "2026-08-27",
    },
    {
        id: "t14",
        investor: "Randi Lunde Nygård",
        initials: "RN",
        ticker: "EQNR",
        company: "Equinor",
        shares: 18000,
        relative: 5.2,
        valueM: 5.04,
        ownership: 0.01,
        holding: 364000,
        executor: "Nygård Kapital AS",
        date: "2026-07-03",
    },
    {
        id: "t15",
        investor: "John Fredriksen",
        initials: "JF",
        ticker: "GOGL",
        company: "Golden Ocean Group",
        shares: 500000,
        relative: 0.9,
        valueM: 41.5,
        ownership: 43.0,
        holding: 59800000,
        executor: "Hemen Holding Ltd",
        date: "2026-05-12",
    },
    {
        id: "t16",
        investor: "Aasulv Tveitereid",
        initials: "AT",
        ticker: "KOG",
        company: "Kongsberg Gruppen",
        shares: -2000,
        relative: -1.6,
        valueM: -1.9,
        ownership: 0.07,
        holding: 123000,
        executor: "AAT Invest AS",
        date: "2025-12-02",
    },
];

interface InvestorRow {
    id: string;
    name: string;
    initials: string;
    portfolioM: number;
    positions: number;
    ytd: number;
    lastTrade: string;
}

const investors: InvestorRow[] = [
    { id: "john-fredriksen", name: "John Fredriksen", initials: "JF", portfolioM: 18420, positions: 9, ytd: 11.8, lastTrade: "2026-10-22" },
    { id: "aasulv-tveitereid", name: "Aasulv Tveitereid", initials: "AT", portfolioM: 1240, positions: 14, ytd: 34.2, lastTrade: "2026-10-22" },
    { id: "ole-martin-saether", name: "Ole Martin Sæther", initials: "OS", portfolioM: 612, positions: 21, ytd: -6.4, lastTrade: "2026-10-21" },
    { id: "kari-bruun-hansen", name: "Kari Bruun-Hansen", initials: "KB", portfolioM: 388, positions: 11, ytd: 4.7, lastTrade: "2026-10-21" },
    { id: "randi-lunde-nygard", name: "Randi Lunde Nygård", initials: "RN", portfolioM: 254, positions: 8, ytd: -14.9, lastTrade: "2026-10-20" },
];

const LATEST_DATA = "26.10.2026";
const REFERENCE_DATE = parseDate("2026-10-26");

/* -------------------------------------------------------------- formatting */

const nb = (digits: [number, number], sign = false) =>
    new Intl.NumberFormat("nb-NO", { minimumFractionDigits: digits[0], maximumFractionDigits: digits[1], signDisplay: sign ? "exceptZero" : "auto" });

const fmtInt = nb([0, 0]);
const fmtIntSigned = nb([0, 0], true);
const fmtPctSigned = nb([0, 2], true);
const fmtMillionSigned = nb([2, 2], true);
const fmtOwnership = nb([2, 5]);

const formatDate = (iso: string) => iso.split("-").reverse().join(".");

const direction = (v: number) => (v > 0 ? "buy" : "sell");

/** Signed number colored by direction. The sign is always printed, color is only a second cue. */
const Signed = ({ value, children }: { value: number; children: ReactNode }) => (
    <span className={cx("tabular-nums", value > 0 && "text-success-primary", value < 0 && "text-error-primary", value === 0 && "text-tertiary")}>
        {children}
    </span>
);

const TradeBadge = ({ shares }: { shares: number }) => (
    <BadgeWithIcon size="sm" color={direction(shares) === "buy" ? "success" : "error"} iconLeading={direction(shares) === "buy" ? ArrowUp : ArrowDown}>
        {direction(shares) === "buy" ? "Kjøp" : "Salg"}
    </BadgeWithIcon>
);

/* ----------------------------------------------------------------- periods */

const periods = [
    { id: "1D", label: "1D" },
    { id: "1U", label: "1U" },
    { id: "1M", label: "1M" },
    { id: "3M", label: "3M" },
    { id: "6M", label: "6M" },
    { id: "YTD", label: "YTD" },
    { id: "1Y", label: "1Å" },
    { id: "3Y", label: "3Å" },
    { id: "ALL", label: "Alle" },
];

const periodStart = (id: string): DateValue => {
    switch (id) {
        case "1D":
            return REFERENCE_DATE.subtract({ days: 1 });
        case "1U":
            return REFERENCE_DATE.subtract({ weeks: 1 });
        case "1M":
            return REFERENCE_DATE.subtract({ months: 1 });
        case "3M":
            return REFERENCE_DATE.subtract({ months: 3 });
        case "6M":
            return REFERENCE_DATE.subtract({ months: 6 });
        case "YTD":
            return parseDate("2026-01-01");
        case "1Y":
            return REFERENCE_DATE.subtract({ years: 1 });
        case "3Y":
            return REFERENCE_DATE.subtract({ years: 3 });
        default:
            return parseDate("2020-01-01");
    }
};

/* ---------------------------------------------------------------- sorting */

type SortColumn = "investor" | "ticker" | "shares" | "relative" | "valueM" | "ownership" | "holding" | "executor" | "date";

const sortOptions: { id: string; label: string; column: SortColumn; direction: "ascending" | "descending" }[] = [
    { id: "date-desc", label: "Dato, nyeste først", column: "date", direction: "descending" },
    { id: "date-asc", label: "Dato, eldste først", column: "date", direction: "ascending" },
    { id: "value-desc", label: "Verdi, høyest først", column: "valueM", direction: "descending" },
    { id: "value-asc", label: "Verdi, lavest først", column: "valueM", direction: "ascending" },
    { id: "relative-desc", label: "Relativ endring, høyest først", column: "relative", direction: "descending" },
    { id: "relative-asc", label: "Relativ endring, lavest først", column: "relative", direction: "ascending" },
    { id: "ownership-desc", label: "Eierandel, høyest først", column: "ownership", direction: "descending" },
    { id: "holding-desc", label: "Beholdning, høyest først", column: "holding", direction: "descending" },
    { id: "investor-asc", label: "Investor, A–Å", column: "investor", direction: "ascending" },
    { id: "ticker-asc", label: "Aksje, A–Å", column: "ticker", direction: "ascending" },
];

const sortRows = (rows: Trade[], sort: SortDescriptor) =>
    [...rows].sort((a, b) => {
        const col = sort.column as SortColumn;
        const av = a[col];
        const bv = b[col];
        const d = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv), "nb");
        return sort.direction === "descending" ? -d : d;
    });

/* ----------------------------------------------------------------- layout */

const card = "rounded-2xl border border-secondary bg-primary_alt";

const PAGE_SIZE = 8;

/* ---------------------------------------------------------- mobile trade row */

const TradeListItem = ({ trade }: { trade: Trade }) => (
    <li className="flex flex-col gap-3 border-b border-secondary px-4 py-4 last:border-b-0">
        <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
                <Avatar size="sm" initials={trade.initials} alt="" />
                <Button color="link-gray" size="sm" href={`/bjellesauer/${trade.investor.toLowerCase().replace(/\s+/g, "-")}`} className="truncate">
                    {trade.investor}
                </Button>
            </div>
            <span className="shrink-0 text-xs text-tertiary tabular-nums">{formatDate(trade.date)}</span>
        </div>
        <div className="flex items-center gap-2">
            <Badge color="brand" size="sm" type="pill-color">
                {trade.ticker}
            </Badge>
            <span className="truncate text-sm font-medium text-primary">{trade.company}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <TradeBadge shares={trade.shares} />
            <Signed value={trade.shares}>
                <span className="text-sm font-semibold">{`${fmtIntSigned.format(trade.shares)} aksjer`}</span>
            </Signed>
            <Signed value={trade.relative}>{`(${fmtPctSigned.format(trade.relative)} %)`}</Signed>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-tertiary p-3">
            <div>
                <dt className="text-xs font-medium text-tertiary">Verdi</dt>
                <dd className="text-sm font-semibold text-primary tabular-nums">{`${fmtMillionSigned.format(trade.valueM)} M NOK`}</dd>
            </div>
            <div>
                <dt className="text-xs font-medium text-tertiary">Ny eierandel</dt>
                <dd className="text-sm font-semibold text-primary tabular-nums">{`${fmtOwnership.format(trade.ownership)} %`}</dd>
            </div>
            <div>
                <dt className="text-xs font-medium text-tertiary">Ny beholdning</dt>
                <dd className="text-sm font-semibold text-primary tabular-nums">{fmtInt.format(trade.holding)}</dd>
            </div>
            <div>
                <dt className="text-xs font-medium text-tertiary">Utført av</dt>
                <dd className="truncate text-sm font-semibold text-primary">{trade.executor}</dd>
            </div>
        </dl>
    </li>
);

/* ------------------------------------------------------------ desktop table */

const TradesTable = ({ rows, sort, onSortChange }: { rows: Trade[]; sort?: SortDescriptor; onSortChange?: (s: SortDescriptor) => void }) => {
    const sortable = Boolean(onSortChange);
    return (
        <Table aria-label="Siste registrerte handler" size="sm" sortDescriptor={sort} onSortChange={onSortChange}>
            <Table.Header>
                <Table.Head id="investor" label="Investor" isRowHeader allowsSorting={sortable} />
                <Table.Head id="ticker" label="Aksje" allowsSorting={sortable} />
                <Table.Head id="shares" label="Endring" allowsSorting={sortable} tooltip="Endring i antall aksjer. Pluss er kjøp, minus er salg." />
                <Table.Head id="relative" label="Relativ" allowsSorting={sortable} tooltip="Endring i prosent av investorens forrige beholdning" />
                <Table.Head id="valueM" label="Verdi (MNOK)" allowsSorting={sortable} />
                <Table.Head id="ownership" label="Eierandel" allowsSorting={sortable} />
                <Table.Head id="holding" label="Beholdning" allowsSorting={sortable} />
                <Table.Head id="executor" label="Utførende selskap" allowsSorting={sortable} />
                <Table.Head id="date" label="Dato" allowsSorting={sortable} />
            </Table.Header>
            <Table.Body items={rows}>
                {(t) => (
                    <Table.Row id={t.id}>
                        <Table.Cell className="whitespace-nowrap">
                            <div className="flex items-center gap-2">
                                <Avatar size="sm" initials={t.initials} alt="" />
                                <Button color="link-gray" size="sm" href={`/bjellesauer/${t.investor.toLowerCase().replace(/\s+/g, "-")}`}>
                                    {t.investor}
                                </Button>
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="flex flex-col items-start gap-0.5">
                                <Badge color="brand" size="sm" type="pill-color">
                                    {t.ticker}
                                </Badge>
                                <span className="text-xs whitespace-nowrap text-tertiary">{t.company}</span>
                            </div>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                            <div className="flex flex-col items-start gap-0.5">
                                <TradeBadge shares={t.shares} />
                                <Signed value={t.shares}>{fmtIntSigned.format(t.shares)}</Signed>
                            </div>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                            <Signed value={t.relative}>{`${fmtPctSigned.format(t.relative)} %`}</Signed>
                        </Table.Cell>
                        <Table.Cell className="font-medium whitespace-nowrap text-primary tabular-nums">{fmtMillionSigned.format(t.valueM)}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap tabular-nums">{`${fmtOwnership.format(t.ownership)} %`}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap tabular-nums">{fmtInt.format(t.holding)}</Table.Cell>
                        <Table.Cell className="max-w-48 truncate">{t.executor}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap tabular-nums">{formatDate(t.date)}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
};

/* -------------------------------------------------------------- trades card */

const allStocks = Array.from(new Map(trades.map((t) => [t.ticker, t.company])).entries()).map(([ticker, company]) => ({
    id: ticker,
    label: company,
    supportingText: ticker,
}));
const allInvestors = investors.map((i) => ({ id: i.name, label: i.name }));

const TradesCard = () => {
    const [stock, setStock] = useState<Key | null>("all");
    const [investor, setInvestor] = useState<Key | null>("all");
    const [periodKeys, setPeriodKeys] = useState<Set<Key>>(new Set(["1U"]));
    const [range, setRange] = useState<{ start: DateValue; end: DateValue }>({ start: periodStart("1U"), end: REFERENCE_DATE });
    const [sort, setSort] = useState<SortDescriptor>({ column: "date", direction: "descending" });
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const start = range.start.toString();
        const end = range.end.toString();
        return trades.filter(
            (t) => t.date >= start && t.date <= end && (stock === "all" || stock === t.ticker) && (investor === "all" || investor === t.investor),
        );
    }, [range, stock, investor]);

    const sorted = useMemo(() => sortRows(filtered, sort), [filtered, sort]);
    const total = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    const rows = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const sortId = sortOptions.find((o) => o.column === sort.column && o.direction === sort.direction)?.id ?? null;

    const reset = () => {
        setStock("all");
        setInvestor("all");
        setPeriodKeys(new Set(["ALL"]));
        setRange({ start: periodStart("ALL"), end: REFERENCE_DATE });
        setPage(1);
    };

    return (
        <TableCard.Root size="sm" className="bg-primary_alt">
            <TableCard.Header
                title="Siste registrerte handler"
                badge={`${sorted.length} handler`}
                description={`Siste data mottatt: ${LATEST_DATA}`}
                contentTrailing={
                    <Button color="secondary" size="sm" iconLeading={Download} href="/bjellesauer/last-ned">
                        Last ned
                    </Button>
                }
            />

            <div className="flex flex-col gap-4 border-b border-secondary p-4 md:p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Select.ComboBox
                        label="Aksje"
                        placeholder="Søk etter aksje"
                        shortcut={false}
                        size="md"
                        items={[{ id: "all", label: "Alle aksjer" }, ...allStocks]}
                        value={stock}
                        onChange={(k) => {
                            setStock(k);
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
                        shortcut={false}
                        size="md"
                        items={[{ id: "all", label: "Alle investorer" }, ...allInvestors]}
                        value={investor}
                        onChange={(k) => {
                            setInvestor(k);
                            setPage(1);
                        }}
                    >
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select.ComboBox>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-secondary">Datoperiode</span>
                        <AriaI18nProvider locale="nb-NO">
                            <DateRangePicker
                                aria-label="Velg datoperiode"
                                size="md"
                                value={range}
                                maxValue={today(getLocalTimeZone())}
                                onChange={(value) => {
                                    if (value) {
                                        setRange(value);
                                        setPeriodKeys(new Set());
                                        setPage(1);
                                    }
                                }}
                            />
                        </AriaI18nProvider>
                    </div>
                    <div className="md:hidden">
                        <Select
                            label="Sorter etter"
                            size="md"
                            items={sortOptions}
                            value={sortId}
                            onChange={(k) => {
                                const o = sortOptions.find((x) => x.id === k);
                                if (o) setSort({ column: o.column, direction: o.direction });
                            }}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                    </div>
                </div>

                <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
                    <ButtonGroup
                        aria-label="Periode"
                        size="sm"
                        selectedKeys={periodKeys}
                        onSelectionChange={(keys) => {
                            const id = [...keys][0] as string | undefined;
                            if (!id) return;
                            setPeriodKeys(new Set([id]));
                            setRange({ start: periodStart(id), end: REFERENCE_DATE });
                            setPage(1);
                        }}
                    >
                        {periods.map((p) => (
                            <ButtonGroupItem key={p.id} id={p.id}>
                                {p.label}
                            </ButtonGroupItem>
                        ))}
                    </ButtonGroup>
                </div>
            </div>

            {sorted.length === 0 ? (
                <EmptyState
                    icon={Mail}
                    title="Ingen handler i valgt periode"
                    description="Registerendringer kommer rundt to børsdager etter selve handelen. Prøv en lengre periode."
                    primaryAction={
                        <Button size="md" onPress={reset}>
                            Vis alle handler
                        </Button>
                    }
                    className="py-12"
                />
            ) : (
                <>
                    <div className="max-md:hidden">
                        <TradesTable rows={rows} sort={sort} onSortChange={setSort} />
                    </div>
                    <ul className="md:hidden" aria-label="Siste registrerte handler">
                        {rows.map((t) => (
                            <TradeListItem key={t.id} trade={t} />
                        ))}
                    </ul>
                    <PaginationCardDefault page={page} total={total} onPageChange={setPage} />
                </>
            )}
        </TableCard.Root>
    );
};

/* ------------------------------------------------------- investor tables */

const InvestorsCard = () => (
    <TableCard.Root size="sm">
        <TableCard.Header title="Alle investorer" badge={`${investors.length} investorer`} description="Åpne en portefølje for å se beholdning og handler" />
        <Table aria-label="Alle investorer">
            <Table.Header>
                <Table.Head id="name" label="Investor" isRowHeader />
                <Table.Head id="portfolio" label="Portefølje (MNOK)" className="max-md:hidden" />
                <Table.Head id="positions" label="Poster" className="max-md:hidden" />
                <Table.Head id="ytd" label="Hittil i år" />
                <Table.Head id="last" label="Siste handel" className="max-md:hidden" />
                <Table.Head id="open" label="Portefølje" />
            </Table.Header>
            <Table.Body items={investors}>
                {(i) => (
                    <Table.Row id={i.id}>
                        <Table.Cell>
                            <div className="flex items-center gap-2">
                                <Avatar size="sm" initials={i.initials} alt="" />
                                <span className="text-sm font-medium text-primary">{i.name}</span>
                            </div>
                        </Table.Cell>
                        <Table.Cell className="tabular-nums max-md:hidden">{fmtInt.format(i.portfolioM)}</Table.Cell>
                        <Table.Cell className="tabular-nums max-md:hidden">{i.positions}</Table.Cell>
                        <Table.Cell>
                            <Signed value={i.ytd}>{`${fmtPctSigned.format(i.ytd)} %`}</Signed>
                        </Table.Cell>
                        <Table.Cell className="tabular-nums max-md:hidden">{formatDate(i.lastTrade)}</Table.Cell>
                        <Table.Cell>
                            <Button color="link-color" size="sm" href={`/bjellesauer/${i.id}`}>
                                Åpne
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </TableCard.Root>
);

const RankCard = ({ title, icon, rows }: { title: string; icon: typeof ArrowUp; rows: InvestorRow[] }) => {
    const Icon = icon;
    return (
        <section className={cx(card, "p-4 md:p-5")} aria-labelledby={`rank-${title}`}>
            <header className="mb-3 flex items-center gap-3">
                <Icon className="size-5 text-fg-quaternary" />
                <h2 id={`rank-${title}`} className="text-lg font-semibold text-primary">
                    {title}
                </h2>
                <span className="ml-auto text-xs text-tertiary">Hittil i år</span>
            </header>
            <ul>
                {rows.map((i) => (
                    <li key={i.id} className="flex items-center justify-between gap-3 border-b border-secondary py-3 last:border-b-0">
                        <div className="flex min-w-0 items-center gap-3">
                            <Avatar size="sm" initials={i.initials} alt="" />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-primary">{i.name}</p>
                                <p className="text-xs text-tertiary">{`Portefølje ${fmtInt.format(i.portfolioM)} MNOK`}</p>
                            </div>
                        </div>
                        <Signed value={i.ytd}>{`${fmtPctSigned.format(i.ytd)} %`}</Signed>
                    </li>
                ))}
            </ul>
        </section>
    );
};

const WinnersLosers = () => {
    const sorted = [...investors].sort((a, b) => b.ytd - a.ytd);
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <RankCard title="Vinnere" icon={ArrowUp} rows={sorted.filter((i) => i.ytd > 0)} />
            <RankCard title="Tapere" icon={ArrowDown} rows={sorted.filter((i) => i.ytd < 0).reverse()} />
        </div>
    );
};

/* ------------------------------------------------------- info, newsletter */

const InfoCards = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className={cx(card, "p-4 md:p-5")} aria-labelledby="inkludering">
            <h2 id="inkludering" className="text-lg font-semibold text-primary">
                Hvem og hva er med?
            </h2>
            <div className="mt-3 flex flex-col gap-3 text-sm text-tertiary">
                <p>
                    [Plassholder for innlemmelsesregler] Oversikten viser handler som er registrert i Euronext Securities Oslo (VPS) for investorer og selskaper
                    Finansavisen følger.
                </p>
                <p>
                    Dataene oppdateres hver natt rundt klokken 23:00 og viser endringer i registeret omtrent to børsdager etter at handelen ble gjort. Enkelte
                    handler kan derfor mangle eller vises med forsinkelse.
                </p>
                <p>Dette er ikke investeringsråd. Finansavisen er ikke ansvarlig for tap som følge av beslutninger tatt på grunnlag av oversikten.</p>
            </div>
        </section>
        <section className={cx(card, "p-4 md:p-5")} aria-labelledby="nyhetsbrev">
            <h2 id="nyhetsbrev" className="text-lg font-semibold text-primary">
                Nyhetsbrev om bjellesauene
            </h2>
            <p className="mt-3 text-sm text-tertiary">Få en oppsummering når nye handler er registrert, rett i innboksen.</p>
            <form className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={(e) => e.preventDefault()}>
                <Input label="E-post" type="email" isRequired placeholder="navn@firma.no" wrapperClassName="flex-1" />
                <Button type="submit" size="md">
                    Abonner på nyhetsbrev
                </Button>
            </form>
        </section>
    </div>
);

/* ------------------------------------------------------------- paywall box */

const PaywallBox = () => (
    <section className={cx(card, "mx-auto flex w-full max-w-md flex-col items-center gap-4 p-6 text-center")} aria-labelledby="paywall">
        <Lock className="size-6 text-fg-quaternary" aria-label="Kun for abonnenter" />
        <h2 id="paywall" className="text-lg font-semibold text-primary">
            Se alle handlene fra bjellesauene
        </h2>
        <p className="text-sm text-tertiary">Filtrer på aksje og investor, velg periode, sorter på alle verdier og last ned. Bli abonnent fra 99 kr.</p>
        <div className="flex w-full flex-col gap-3">
            <Button size="lg" href="/abonnement" className="w-full">
                Kjøp abonnement
            </Button>
            <Button size="lg" color="secondary" href="/logg-inn" className="w-full">
                Logg inn
            </Button>
        </div>
    </section>
);

/* -------------------------------------------------------------------- page */

const tabs = [
    { id: "handler", label: "Siste handler" },
    { id: "investorer", label: "Alle investorer" },
    { id: "vinnere", label: "Vinnere og tapere" },
];

export interface BjellesauerProps {
    /** Logged-out readers see a teaser of the first trades and a paywall box. */
    isSubscriber?: boolean;
}

export const Bjellesauer = ({ isSubscriber = true }: BjellesauerProps) => {
    const [tab, setTab] = useState<Key>("handler");

    return (
        <div className="min-h-dvh bg-secondary_alt">
            <SiteHeader
                brand="fa"
                tickerItems={tickerItems}
                navigation={navigation}
                shortcuts={shortcuts}
                menu={menu}
                user={isSubscriber ? { initials: "NH", href: "/min-side" } : undefined}
                loginHref="/logg-inn"
                subscribeHref="/abonnement"
            />
            <main className="mx-auto flex w-full flex-col gap-6 px-4 py-6 md:px-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">Bjellesauer</h1>
                    <p className="max-w-3xl text-md text-tertiary">Følg hva Norges mest kjente investorer kjøper og selger.</p>
                    <p className="text-sm text-tertiary">
                        <span className="font-medium text-secondary">{`Siste data mottatt: ${LATEST_DATA}`}</span>
                        {" · Oppdateres hver natt rundt 23:00 og viser registerendringer om lag to børsdager etter handelen."}
                    </p>
                </div>

                {isSubscriber ? (
                    <>
                        <Tabs selectedKey={tab} onSelectionChange={setTab}>
                            <Tabs.List type="underline" aria-label="Visning av bjellesauer" items={tabs}>
                                {(t) => <Tabs.Item {...t} />}
                            </Tabs.List>
                            <Tabs.Panel id="handler" className="pt-6">
                                <TradesCard />
                            </Tabs.Panel>
                            <Tabs.Panel id="investorer" className="pt-6">
                                <InvestorsCard />
                            </Tabs.Panel>
                            <Tabs.Panel id="vinnere" className="pt-6">
                                <WinnersLosers />
                            </Tabs.Panel>
                        </Tabs>
                        <InfoCards />
                    </>
                ) : (
                    <>
                        <section className={cx(card, "overflow-hidden")} aria-labelledby="teaser">
                            <div className="flex items-center gap-3 border-b border-secondary p-4 md:p-5">
                                <h2 id="teaser" className="text-lg font-semibold text-primary">
                                    Siste registrerte handler
                                </h2>
                                <Badge color="gray" size="sm" type="pill-color" className="ml-auto">
                                    Utdrag
                                </Badge>
                            </div>
                            <div className="max-md:hidden">
                                <TradesTable rows={trades.slice(0, 3)} />
                            </div>
                            <ul className="md:hidden" aria-label="Utdrag av siste handler">
                                {trades.slice(0, 3).map((t) => (
                                    <TradeListItem key={t.id} trade={t} />
                                ))}
                            </ul>
                        </section>
                        <PaywallBox />
                    </>
                )}
            </main>
            <SiteFooter
                brand="fa"
                links={footerLinks}
                publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, PO Box 724 Skøyen, 0214 Oslo", "Sjefredaktør/adm.dir: Trygve Hegnar"]}
                copyright="©2026 Hegnar Media AS"
                disclaimer="Børsdata levert av Millistream. Nikkei 225 ©Nikkei Inc."
                disclaimerHref="/om-data"
                socialLinks={[
                    { platform: "x", href: "https://x.com" },
                    { platform: "facebook", href: "https://facebook.com" },
                ]}
                contactHref="/kontakt-oss"
            />
        </div>
    );
};
