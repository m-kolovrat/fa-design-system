"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { type CalendarDate, parseDate, startOfYear } from "@internationalized/date";
import { Breadcrumbs } from "fa-design-system/components/application/breadcrumbs/breadcrumbs";
import { DateRangePicker } from "fa-design-system/components/application/date-picker/date-range-picker";
import { EmptyState } from "fa-design-system/components/application/empty-state/empty-state";
import { Modal, ModalBody, ModalHeader } from "fa-design-system/components/application/modals/modal";
import { PaginationCardAdvanced } from "fa-design-system/components/application/pagination/pagination";
import { type Period, type PeriodOption, PeriodSelector } from "fa-design-system/components/application/period-selector/period-selector";
import { SiteFooter } from "fa-design-system/components/application/site-footer/site-footer";
import type { SiteNavItem } from "fa-design-system/components/application/site-header/site-brands";
import { SiteHeader } from "fa-design-system/components/application/site-header/site-header";
import { Table } from "fa-design-system/components/application/table/table";
import { Tabs } from "fa-design-system/components/application/tabs/tabs";
import { Avatar } from "fa-design-system/components/base/avatar/avatar";
import { getInitials } from "fa-design-system/components/base/avatar/utils";
import { Badge } from "fa-design-system/components/base/badges/badges";
import { Button } from "fa-design-system/components/base/buttons/button";
import { Input } from "fa-design-system/components/base/input/input";
import { MultiSelect } from "fa-design-system/components/base/select/multi-select";
import type { SelectItemType } from "fa-design-system/components/base/select/select";
import { NativeSelect } from "fa-design-system/components/base/select/select-native";
import { FeaturedIcon } from "fa-design-system/components/foundations/featured-icon/featured-icon";
import { cx } from "fa-design-system/utils/cx";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Download, Users } from "fa-icons";
import type { Selection, SortDescriptor } from "react-aria-components";
import { Button as AriaButton, I18nProvider as AriaI18nProvider } from "react-aria-components";
import { LATEST_DATA_RECEIVED, LATEST_TRADE_DATE, type Trade, instruments, investors, trades } from "./data";

// ── Site chrome ─────────────────────────────────────────────────────────────

const navigation: SiteNavItem[][] = [
    [
        { label: "Siste nytt", href: "/siste" },
        { label: "MittFa", href: "/mittfa" },
    ],
    [
        { label: "Børs", href: "/bors" },
        { label: "Forum", href: "/forum" },
        { label: "Bjellesauer", href: "/bjellesauer", current: true },
        { label: "Watchlist", href: "/watchlist" },
        { label: "Investorchat", href: "/investorchat" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors" },
    { label: "Forum", href: "/forum" },
    { label: "Bjellesauer", href: "/bjellesauer", current: true },
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

const tabs = [
    { id: "/bjellesauer/siste-handler", label: "Siste handler" },
    { id: "/bjellesauer/investorer", label: "Alle investorer" },
    { id: "/bjellesauer/vinnere-og-tapere", label: "Vinnere og tapere" },
];
const currentTab = tabs[0].id;

// ── Formatting (nb-NO) ──────────────────────────────────────────────────────

const fmt = (v: number, options: Intl.NumberFormatOptions = {}) => new Intl.NumberFormat("nb-NO", options).format(v);
const shares = (v: number) => fmt(v, { maximumFractionDigits: 0, signDisplay: "exceptZero" });
const count = (v: number) => fmt(v, { maximumFractionDigits: 0 });
const millions = (v: number) => `${fmt(v / 1_000_000, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} mill.`;
const percent = (v: number, digits = 2) =>
    fmt(v / 100, { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: digits, signDisplay: "exceptZero" });
const ownership = (v: number) => fmt(v / 100, { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 4 });
const dateLabel = (iso: string) => new Intl.DateTimeFormat("nb-NO", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${iso}T12:00:00`));

const investorById = Object.fromEntries(investors.map((i) => [i.id, i]));
const instrumentByTicker = Object.fromEntries(instruments.map((i) => [i.ticker, i]));
const investorHref = (id: string) => `/bjellesauer/investor/${id}`;
const stockHref = (ticker: string) => `/aksje/${ticker}`;
const isSoldOut = (t: Trade) => t.newHolding === 0;

/** A name in a table cell that opens its own page: Figma's table cell lead text, brand blue on hover. */
const CellLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <a
        href={href}
        className="rounded-xs text-sm text-primary outline-focus-ring transition hover:text-brand-secondary focus-visible:outline-2 focus-visible:outline-offset-2"
    >
        {children}
    </a>
);

/** Signed number coloured by direction: the skill's "Change value" stand-in. */
const Signed = ({ value, children }: { value: number; children: ReactNode }) => (
    <span className={cx("tabular-nums", value > 0 && "text-success-primary", value < 0 && "text-error-primary", value === 0 && "text-tertiary")}>
        {children}
    </span>
);

// ── Periods ─────────────────────────────────────────────────────────────────

const anchor = parseDate(LATEST_TRADE_DATE);
const maxDate = parseDate("2026-10-28");

/** PeriodSelector only knows its fixed ids: 5D stands in for the brief's 1W, and there is no ALL. */
const periodOptions: PeriodOption[] = (["1D", "5D", "1M", "3M", "6M", "YTD", "1Y", "3Y"] as Period[]).map((id) => ({ id }));

type Range = { start: CalendarDate; end: CalendarDate };

const rangeFor = (period: Period): Range => {
    const end = anchor;
    switch (period) {
        case "1D":
            return { start: end, end };
        case "5D":
            return { start: end.subtract({ days: 4 }), end };
        case "1M":
            return { start: end.subtract({ months: 1 }).add({ days: 1 }), end };
        case "3M":
            return { start: end.subtract({ months: 3 }).add({ days: 1 }), end };
        case "6M":
            return { start: end.subtract({ months: 6 }).add({ days: 1 }), end };
        case "YTD":
            return { start: startOfYear(end), end };
        case "1Y":
            return { start: end.subtract({ years: 1 }).add({ days: 1 }), end };
        default:
            return { start: end.subtract({ years: 3 }).add({ days: 1 }), end };
    }
};

// ── Sorting and export ──────────────────────────────────────────────────────

type SortKey = "investor" | "stock" | "shareChange" | "relChange" | "value" | "newOwnership" | "newHolding" | "date";

const sortValue = (t: Trade, key: SortKey): number | string => {
    if (key === "investor") return investorById[t.investorId].name;
    if (key === "stock") return instrumentByTicker[t.ticker].name;
    if (key === "date") return t.date;
    return t[key];
};

const exportCsv = (rows: Trade[]) => {
    const header = ["Investor", "Utført av", "Aksje", "Ticker", "Endring aksjer", "Rel. endring %", "Verdi NOK", "Ny eierandel %", "Ny beholdning", "Dato"];
    const lines = rows.map((t) =>
        [
            investorById[t.investorId].name,
            t.entity,
            instrumentByTicker[t.ticker].name,
            t.ticker,
            t.shareChange,
            fmt(t.relChange, { maximumFractionDigits: 2 }),
            t.value,
            fmt(t.newOwnership, { maximumFractionDigits: 4 }),
            t.newHolding,
            dateLabel(t.date),
        ].join(";"),
    );
    const blob = new Blob([[header.join(";"), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bjellesauer-siste-handler.csv";
    link.click();
    URL.revokeObjectURL(url);
};

const tableHead = "uppercase tracking-wide";
const numHead = cx(tableHead, "[&>div]:justify-end");
const numCell = "text-right tabular-nums whitespace-nowrap";

const caveat =
    "Handlene vises når aksjonærregisteret oppdateres, ikke når de skjer – som regel to handelsdager etter handelen. Dataene oppdateres hver natt rundt kl. 23.00.";

// ── Page ────────────────────────────────────────────────────────────────────

export interface NotableInvestorsTradesPageProps {
    /** Shows skeleton rows instead of the trades, as while the data loads. */
    isLoading?: boolean;
}

/** Bjellesauer – Siste handler: the latest trades by notable investors, with filters, sorting and export. */
export const NotableInvestorsTradesPage = ({ isLoading = false }: NotableInvestorsTradesPageProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [methodOpen, setMethodOpen] = useState(false);

    const [stockKeys, setStockKeys] = useState<Selection>(new Set());
    const [investorKeys, setInvestorKeys] = useState<Selection>(new Set());
    const [period, setPeriod] = useState<Period | null>("1D");
    const [range, setRange] = useState<Range>(rangeFor("1D"));
    const [draft, setDraft] = useState<Range>(range);
    const [sort, setSort] = useState<SortDescriptor>({ column: "value", direction: "descending" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [selected, setSelected] = useState<Trade | null>(null);

    useEffect(() => {
        const onScroll = () => setCollapsed(window.scrollY > 160);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const applyRange = (next: Range, nextPeriod: Period | null) => {
        setRange(next);
        setDraft(next);
        setPeriod(nextPeriod);
        setPage(1);
    };

    const step = (direction: 1 | -1) => {
        const days = range.end.compare(range.start) + 1;
        applyRange({ start: range.start.add({ days: days * direction }), end: range.end.add({ days: days * direction }) }, null);
    };

    const filtered = useMemo(() => {
        const start = range.start.toString();
        const end = range.end.toString();
        const rows = trades.filter(
            (t) =>
                t.date >= start &&
                t.date <= end &&
                (!(stockKeys instanceof Set) || stockKeys.size === 0 || stockKeys.has(t.ticker)) &&
                (!(investorKeys instanceof Set) || investorKeys.size === 0 || investorKeys.has(t.investorId)),
        );
        const key = sort.column as SortKey;
        return rows.sort((a, b) => {
            const x = sortValue(a, key);
            const y = sortValue(b, key);
            const d = typeof x === "string" ? x.localeCompare(y as string, "nb") : x - (y as number);
            return sort.direction === "descending" ? -d : d;
        });
    }, [range, stockKeys, investorKeys, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);
    const firstShown = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
    const lastShown = Math.min(page * pageSize, filtered.length);

    const stockItems: SelectItemType[] = instruments.map((i) => ({ id: i.ticker, label: i.name, supportingText: i.ticker }));
    const investorItems: SelectItemType[] = investors.map((i) => ({ id: i.id, label: i.name }));

    const empty = (
        <EmptyState
            icon={Calendar}
            title="Ingen handler i perioden"
            description="Aksjonærregisteret oppdateres bare på handelsdager. Velg en lengre periode eller fjern filtrene."
            primaryAction={
                <Button size="md" onPress={() => applyRange(rangeFor("1M"), "1M")}>
                    Vis siste måned
                </Button>
            }
            className="py-12"
        />
    );

    return (
        <AriaI18nProvider locale="nb-NO">
            <div className="min-h-dvh bg-secondary_alt">
                <SiteHeader
                    brand="fa"
                    className="sticky top-0 z-30"
                    collapsed={collapsed}
                    navigation={navigation}
                    shortcuts={shortcuts}
                    menu={{
                        columns: [
                            {
                                title: "Bjellesauer",
                                href: "/bjellesauer",
                                items: tabs.map((t) => ({ label: t.label, href: t.id })),
                            },
                        ],
                    }}
                    loginHref="/logg-inn"
                    subscribeHref="/abonnement"
                    onSearchPress={() => setSearchOpen(true)}
                />

                <main className="mx-auto flex w-full max-w-[1376px] flex-col gap-6 px-4 py-6 md:px-8">
                    {/* Intro: breadcrumb, title, description with the data caveat */}
                    <div className="flex flex-col gap-4">
                        <Breadcrumbs>
                            <Breadcrumbs.Item href="/bjellesauer">Bjellesauer</Breadcrumbs.Item>
                            <Breadcrumbs.Item href={currentTab}>Siste handler</Breadcrumbs.Item>
                        </Breadcrumbs>
                        <div className="flex items-start gap-4">
                            <FeaturedIcon icon={Users} color="brand" theme="light" size="lg" className="shrink-0 max-md:hidden" />
                            <div className="flex min-w-0 flex-col gap-2">
                                <h1 className="text-display-xs font-semibold text-primary">
                                    Bjellesauenes handler – klikk på en investor for å se porteføljen
                                </h1>
                                <div className="prose max-w-[80ch]">
                                    <p>
                                        Her ser du de siste aksjehandlene til kjente norske investorer, også når de handler gjennom holdingselskaper.{" "}
                                        <a href="/nyhetsbrev/bjellesauer">Få handlene på e-post hver morgen.</a> {caveat}
                                    </p>
                                </div>
                                <Button
                                    color="link-color"
                                    size="md"
                                    iconTrailing={methodOpen ? ChevronUp : ChevronDown}
                                    aria-expanded={methodOpen}
                                    aria-controls="metode"
                                    onPress={() => setMethodOpen((open) => !open)}
                                    className="self-start"
                                >
                                    {methodOpen ? "Les mindre" : "Les mer om metoden"}
                                </Button>
                                <div id="metode" hidden={!methodOpen} className="prose max-w-[80ch]">
                                    <p>
                                        Hver handel knyttes til personen bak, også når den går gjennom et selskap personen kontrollerer. Vi sammenligner
                                        aksjonærregisteret dag for dag og regner endringen i antall aksjer som en handel.
                                    </p>
                                    <p>
                                        Handelsdatoen er anslått til to handelsdager før registreringen. Transaksjonskursen er den volumveide snittkursen (VWAP)
                                        på den anslåtte handelsdagen, og verdien er antall aksjer ganger denne kursen. Ny eierandel er ny beholdning delt på
                                        antall utestående aksjer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Views and export */}
                    <Tabs selectedKey={currentTab}>
                        <div className="flex items-end justify-between gap-4">
                            <NativeSelect
                                aria-label="Velg visning"
                                value={currentTab}
                                onChange={(event) => window.location.assign(event.target.value)}
                                options={tabs.map((t) => ({ label: t.label, value: t.id }))}
                                className="md:hidden"
                            />
                            <Tabs.List type="underline" size="sm" aria-label="Bjellesauer" className="max-md:hidden">
                                {tabs.map((t) => (
                                    <Tabs.Item key={t.id} id={t.id} href={t.id} label={t.label} />
                                ))}
                            </Tabs.List>
                            <Button color="secondary" size="sm" iconLeading={Download} onPress={() => exportCsv(filtered)} className="shrink-0">
                                Last ned
                            </Button>
                        </div>

                        <Tabs.Panel id={currentTab} className="pt-6">
                            <section
                                aria-label="Siste handler"
                                aria-busy={isLoading}
                                className="overflow-hidden rounded-2xl border border-secondary bg-primary_alt"
                            >
                                {/* Filter bar */}
                                <div className="flex flex-col gap-4 border-b border-secondary px-4 py-4 md:px-6 xl:flex-row xl:flex-wrap xl:items-end">
                                    <div className="grid grid-cols-2 gap-3 md:flex md:items-end">
                                        <MultiSelect
                                            label="Aksje"
                                            placeholder="Alle aksjer"
                                            size="sm"
                                            items={stockItems}
                                            selectedKeys={stockKeys}
                                            onSelectionChange={(keys) => {
                                                setStockKeys(keys);
                                                setPage(1);
                                            }}
                                            onReset={() => setStockKeys(new Set())}
                                            onSelectAll={() => setStockKeys(new Set(stockItems.map((i) => i.id)))}
                                            selectedCountFormatter={(n) => `${n} valgt`}
                                            emptyStateTitle="Ingen aksjer funnet"
                                            emptyStateDescription="Prøv et annet navn eller en ticker."
                                            className="md:w-52"
                                        >
                                            {(item) => (
                                                <MultiSelect.Item id={item.id} supportingText={item.supportingText} selectionIndicator="checkbox">
                                                    {item.label}
                                                </MultiSelect.Item>
                                            )}
                                        </MultiSelect>
                                        <MultiSelect
                                            label="Investor"
                                            placeholder="Alle investorer"
                                            size="sm"
                                            items={investorItems}
                                            selectedKeys={investorKeys}
                                            onSelectionChange={(keys) => {
                                                setInvestorKeys(keys);
                                                setPage(1);
                                            }}
                                            onReset={() => setInvestorKeys(new Set())}
                                            onSelectAll={() => setInvestorKeys(new Set(investorItems.map((i) => i.id)))}
                                            selectedCountFormatter={(n) => `${n} valgt`}
                                            emptyStateTitle="Ingen investorer funnet"
                                            emptyStateDescription="Prøv et annet navn."
                                            className="md:w-52"
                                        >
                                            {(item) => (
                                                <MultiSelect.Item id={item.id} selectionIndicator="checkbox">
                                                    {item.label}
                                                </MultiSelect.Item>
                                            )}
                                        </MultiSelect>
                                    </div>

                                    <div className="h-9 w-px self-end bg-border-secondary max-xl:hidden" aria-hidden="true" />

                                    <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
                                        <div className="flex items-center gap-1">
                                            <Button
                                                color="secondary"
                                                size="sm"
                                                iconLeading={ChevronLeft}
                                                aria-label="Forrige periode"
                                                onPress={() => step(-1)}
                                            />
                                            <DateRangePicker
                                                aria-label="Velg periode"
                                                size="sm"
                                                maxValue={maxDate}
                                                value={draft}
                                                onChange={(value) => value && setDraft(value as Range)}
                                                onApply={() => applyRange(draft, null)}
                                                onCancel={() => setDraft(range)}
                                            />
                                            <Button
                                                color="secondary"
                                                size="sm"
                                                iconLeading={ChevronRight}
                                                aria-label="Neste periode"
                                                isDisabled={range.end.add({ days: 1 }).compare(maxDate) > 0}
                                                onPress={() => step(1)}
                                            />
                                        </div>
                                        {/* Remounted on a custom range so no period shows as selected. */}
                                        <PeriodSelector
                                            key={period ?? "custom"}
                                            layout="scroll"
                                            aria-label="Periode"
                                            periods={periodOptions}
                                            selectedPeriod={period ?? undefined}
                                            onPeriodChange={(p) => applyRange(rangeFor(p), p)}
                                            className="md:w-auto"
                                        />
                                    </div>

                                    <p className="text-xs text-tertiary xl:ml-auto xl:self-center">
                                        Viser {count(firstShown)}–{count(lastShown)} av {count(filtered.length)} · Siste data mottatt{" "}
                                        {dateLabel(LATEST_DATA_RECEIVED)}
                                    </p>
                                </div>

                                {/* Desktop and tablet: the table */}
                                <Table
                                    aria-label="Siste handler"
                                    size="sm"
                                    sortDescriptor={sort}
                                    onSortChange={(next) => {
                                        setSort(next);
                                        setPage(1);
                                    }}
                                    className="max-md:hidden"
                                >
                                    <Table.Header>
                                        <Table.Head id="investor" label="Investor" isRowHeader allowsSorting className={cx(tableHead, "w-1/4")} />
                                        <Table.Head id="stock" label="Aksje" allowsSorting className={cx(tableHead, "w-1/5")} />
                                        <Table.Head id="shareChange" label="Endring aksjer" allowsSorting className={numHead} />
                                        <Table.Head id="relChange" label="Rel. endring" allowsSorting className={cx(numHead, "max-lg:hidden")} />
                                        <Table.Head
                                            id="value"
                                            label="Verdi"
                                            allowsSorting
                                            tooltip="Antall aksjer × volumveid snittkurs (VWAP)"
                                            className={numHead}
                                        />
                                        <Table.Head
                                            id="newOwnership"
                                            label="Ny eierandel"
                                            allowsSorting
                                            tooltip="Ny beholdning i prosent av utestående aksjer"
                                            className={cx(numHead, "max-xl:hidden")}
                                        />
                                        <Table.Head id="newHolding" label="Ny beholdning" allowsSorting className={cx(numHead, "max-2xl:hidden")} />
                                        <Table.Head id="date" label="Dato" allowsSorting tooltip="Anslått handelsdato" className={numHead} />
                                    </Table.Header>
                                    <Table.Body items={isLoading ? skeletonRows : pageRows} renderEmptyState={() => empty}>
                                        {(t) =>
                                            isLoading ? (
                                                <Table.Row id={t.id}>
                                                    {skeletonCells.map((c, i) => (
                                                        <Table.Cell key={i} className={c.className}>
                                                            <div className={cx("h-4 rounded-xs bg-tertiary", c.width, c.align)} />
                                                        </Table.Cell>
                                                    ))}
                                                </Table.Row>
                                            ) : (
                                                <Table.Row id={t.id}>
                                                    <Table.Cell
                                                        leading={<Avatar size="sm" alt="" initials={getInitials(investorById[t.investorId].name)} />}
                                                        leadText={<CellLink href={investorHref(t.investorId)}>{investorById[t.investorId].name}</CellLink>}
                                                        supportingText={t.entity}
                                                    />
                                                    <Table.Cell
                                                        leading={<Avatar size="sm" alt="" initials={t.ticker.slice(0, 2)} />}
                                                        leadText={<CellLink href={stockHref(t.ticker)}>{instrumentByTicker[t.ticker].name}</CellLink>}
                                                        supportingText={t.ticker}
                                                    />
                                                    <Table.Cell className={numCell}>
                                                        <Signed value={t.shareChange}>{shares(t.shareChange)}</Signed>
                                                    </Table.Cell>
                                                    <Table.Cell className={cx(numCell, "max-lg:hidden")}>
                                                        <Signed value={t.relChange}>{percent(t.relChange)}</Signed>
                                                    </Table.Cell>
                                                    <Table.Cell className={numCell}>{millions(t.value)}</Table.Cell>
                                                    <Table.Cell className={cx(numCell, "max-xl:hidden")}>
                                                        {isSoldOut(t) ? "–" : ownership(t.newOwnership)}
                                                    </Table.Cell>
                                                    <Table.Cell className={cx(numCell, "max-2xl:hidden")}>
                                                        {isSoldOut(t) ? (
                                                            <Badge color="gray" size="sm">
                                                                Solgt ut
                                                            </Badge>
                                                        ) : (
                                                            count(t.newHolding)
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell className={numCell}>{dateLabel(t.date)}</Table.Cell>
                                                </Table.Row>
                                            )
                                        }
                                    </Table.Body>
                                </Table>

                                {/* Mobile: two-column rows, tap opens the transaction sheet */}
                                <div className="md:hidden">
                                    <div className="flex justify-between gap-4 border-b border-secondary px-4 py-2 text-xs font-medium tracking-wide text-quaternary uppercase">
                                        <span>Investor / aksje</span>
                                        <span>Verdi / aksjer</span>
                                    </div>
                                    {isLoading ? (
                                        <ul className="divide-y divide-secondary px-4">
                                            {skeletonRows.map((r) => (
                                                <li key={r.id} className="flex items-center justify-between gap-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 rounded-full bg-tertiary" />
                                                        <div className="flex flex-col gap-1.5">
                                                            <div className="h-4 w-32 rounded-xs bg-tertiary" />
                                                            <div className="h-3 w-20 rounded-xs bg-tertiary" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-1.5">
                                                        <div className="h-4 w-16 rounded-xs bg-tertiary" />
                                                        <div className="h-3 w-12 rounded-xs bg-tertiary" />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : pageRows.length === 0 ? (
                                        empty
                                    ) : (
                                        <ul className="divide-y divide-secondary px-4">
                                            {pageRows.map((t) => (
                                                <li key={t.id}>
                                                    <AriaButton
                                                        onPress={() => setSelected(t)}
                                                        className="flex w-full items-center justify-between gap-4 py-3 text-left outline-focus-ring focus-visible:outline-2 focus-visible:-outline-offset-2"
                                                    >
                                                        <span className="flex min-w-0 items-center gap-3">
                                                            <Avatar size="sm" alt="" initials={getInitials(investorById[t.investorId].name)} />
                                                            <span className="flex min-w-0 flex-col">
                                                                <span className="truncate text-sm text-primary">{investorById[t.investorId].name}</span>
                                                                <span className="truncate text-sm text-tertiary">
                                                                    {instrumentByTicker[t.ticker].name} ({t.ticker})
                                                                </span>
                                                            </span>
                                                        </span>
                                                        <span className="flex shrink-0 flex-col items-end text-sm">
                                                            <span className="font-medium text-primary tabular-nums">{millions(t.value)}</span>
                                                            <Signed value={t.shareChange}>{shares(t.shareChange)}</Signed>
                                                        </span>
                                                    </AriaButton>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <PaginationCardAdvanced
                                    page={page}
                                    total={totalPages}
                                    pageSize={pageSize}
                                    onPageChange={setPage}
                                    onPageSizeChange={(size) => {
                                        setPageSize(size);
                                        setPage(1);
                                    }}
                                />
                            </section>
                        </Tabs.Panel>
                    </Tabs>
                </main>

                <SiteFooter
                    brand="fa"
                    links={footerLinks}
                    publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, 0214 Oslo"]}
                    copyright="©2026 Hegnar Media AS"
                    disclaimer="Børsdata levert av Millistream. Aksjonærdata fra Verdipapirsentralen (Euronext Securities Oslo)."
                    disclaimerHref="/om-data"
                    socialLinks={[
                        { platform: "facebook", href: "https://www.facebook.com/finansavisen" },
                        { platform: "linkedin", href: "https://www.linkedin.com/company/finansavisen" },
                    ]}
                    contactHref="/kontakt-oss"
                    appStoreHref="https://apps.apple.com/no/app/finansavisen"
                    googlePlayHref="https://play.google.com/store/apps/details?id=no.finansavisen"
                />

                {/* Transaction sheet (mobile rows) */}
                <Modal isOpen={selected !== null} onOpenChange={(open) => !open && setSelected(null)} mobile="sheet">
                    <ModalHeader title="Transaksjon" description={selected ? dateLabel(selected.date) : undefined} />
                    <ModalBody>{selected && <TradeDetails trade={selected} />}</ModalBody>
                </Modal>

                {/* Mobile search view (the header's search icon) */}
                <Modal isOpen={searchOpen} onOpenChange={setSearchOpen} mobile="fullscreen">
                    <ModalHeader title="Søk" />
                    <ModalBody>
                        <Input label="Søk etter aksje eller investor" placeholder="For eksempel Equinor eller EQNR" autoFocus />
                    </ModalBody>
                </Modal>
            </div>
        </AriaI18nProvider>
    );
};

// ── Sheet content ───────────────────────────────────────────────────────────

const TradeDetails = ({ trade: t }: { trade: Trade }) => {
    const investor = investorById[t.investorId];
    const stock = instrumentByTicker[t.ticker];
    const rows: [string, ReactNode][] = [
        [
            "Endring aksjer",
            <Signed key="s" value={t.shareChange}>
                {shares(t.shareChange)}
            </Signed>,
        ],
        [
            "Rel. endring",
            <Signed key="r" value={t.relChange}>
                {percent(t.relChange)}
            </Signed>,
        ],
        ["Ny eierandel", isSoldOut(t) ? "–" : ownership(t.newOwnership)],
        [
            "Ny beholdning",
            isSoldOut(t) ? (
                <Badge key="b" color="gray" size="sm">
                    Solgt ut
                </Badge>
            ) : (
                count(t.newHolding)
            ),
        ],
        ["Utført av", t.entity],
        ["Anslått handelsdato", dateLabel(t.date)],
    ];

    return (
        <>
            <div>
                <p className="text-xs font-medium text-tertiary">Verdi</p>
                <p className="text-display-xs font-semibold text-primary tabular-nums">{millions(t.value)}</p>
                <p className="text-sm">
                    <Signed value={t.shareChange}>{shares(t.shareChange)} aksjer</Signed>
                </p>
            </div>
            <div className="flex flex-col divide-y divide-secondary border-y border-secondary">
                <div className="flex items-center gap-3 py-3">
                    <Avatar size="sm" alt="" initials={getInitials(investor.name)} />
                    <Button color="link-color" size="md" href={investorHref(investor.id)} iconTrailing={ChevronRight}>
                        {investor.name}
                    </Button>
                </div>
                <div className="flex items-center gap-3 py-3">
                    <Avatar size="sm" alt="" initials={t.ticker.slice(0, 2)} />
                    <div className="flex flex-col items-start">
                        <Button color="link-gray" size="md" href={stockHref(t.ticker)} iconTrailing={ChevronRight}>
                            {stock.name}
                        </Button>
                        <span className="text-sm text-tertiary">{t.ticker}</span>
                    </div>
                </div>
            </div>
            <dl className="flex flex-col divide-y divide-secondary text-sm">
                {rows.map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 py-2.5">
                        <dt className="text-tertiary">{label}</dt>
                        <dd className="text-right font-medium text-primary tabular-nums">{value}</dd>
                    </div>
                ))}
            </dl>
            <p className="text-xs text-tertiary">{caveat} Kursen er anslått som volumveid snittkurs (VWAP) på handelsdatoen.</p>
        </>
    );
};

// ── Skeleton ────────────────────────────────────────────────────────────────

const skeletonRows = Array.from({ length: 8 }, (_, i) => ({ id: `skeleton-${i}` })) as unknown as Trade[];

const skeletonCells = [
    { width: "w-40" },
    { width: "w-32" },
    { width: "w-20", align: "ml-auto" },
    { width: "w-16", align: "ml-auto", className: "max-lg:hidden" },
    { width: "w-16", align: "ml-auto" },
    { width: "w-16", align: "ml-auto", className: "max-xl:hidden" },
    { width: "w-20", align: "ml-auto", className: "max-2xl:hidden" },
    { width: "w-20", align: "ml-auto" },
] as { width: string; align?: string; className?: string }[];
