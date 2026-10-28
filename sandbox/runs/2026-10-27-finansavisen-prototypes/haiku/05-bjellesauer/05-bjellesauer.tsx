"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Download, Lock, Search } from "fa-icons";
import type { SortDescriptor as AriaSortDescriptor, Key } from "react-aria-components";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { SiteFooter } from "@/components/application/site-footer/site-footer";
import type { SiteNavItem } from "@/components/application/site-header/site-brands";
import { SiteHeader } from "@/components/application/site-header/site-header";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { getInitials } from "@/components/base/avatar/utils";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

/* -------------------------------------------------------------------------- */
/* Data. Rows 1 and 2 are the brief's examples. Rows 3-10 are PLACEHOLDERS:  */
/* fictional investors and invented figures, to be replaced by the nightly    */
/* register feed. Fredriksen's row has no relative change, holding, company   */
/* or date in the brief, so those cells show "–".                             */
/* -------------------------------------------------------------------------- */

type Trade = {
    id: string;
    investor: string;
    ticker: string;
    company: string | null;
    /** Change in shares. Positive = buy, negative = sell. */
    sharesChange: number;
    /** Relative change as a fraction (0.25 = +25 %). */
    relChange: number | null;
    /** Transaction value in NOK millions. */
    value: number | null;
    /** New ownership share in percent. */
    ownership: number | null;
    /** New holding in shares. */
    holding: number | null;
    executor: string | null;
    /** ISO date yyyy-mm-dd. */
    date: string | null;
};

const TRADES: Trade[] = [
    {
        id: "t1",
        investor: "Aasulv Tveitereid",
        ticker: "NOD",
        company: "Nordic Semiconductor",
        sharesChange: 400000,
        relChange: 0.25,
        value: 67.88,
        ownership: 1.00109,
        holding: 2000000,
        executor: "AAT Invest AS",
        date: "2026-10-22",
    },
    {
        id: "t2",
        investor: "John Fredriksen",
        ticker: "NAS",
        company: null,
        sharesChange: 743950,
        relChange: null,
        value: 8.23,
        ownership: 14.32,
        holding: null,
        executor: null,
        date: null,
    },
    // PLACEHOLDER rows below
    {
        id: "t3",
        investor: "Magnus Dahl",
        ticker: "EQNR",
        company: "Equinor",
        sharesChange: -120000,
        relChange: -0.08,
        value: 34.42,
        ownership: 0.42,
        holding: 1480000,
        executor: "Dahl Invest AS",
        date: "2026-10-21",
    },
    {
        id: "t4",
        investor: "Ragnhild Vik",
        ticker: "MOWI",
        company: "Mowi",
        sharesChange: 85000,
        relChange: 0.06,
        value: 15.86,
        ownership: 0.31,
        holding: 1500000,
        executor: "Vik Holding AS",
        date: "2026-10-16",
    },
    {
        id: "t5",
        investor: "Torbjørn Lie",
        ticker: "DNB",
        company: "DNB Bank",
        sharesChange: -200000,
        relChange: -0.12,
        value: 45.2,
        ownership: 0.09,
        holding: 1400000,
        executor: "Lie Capital AS",
        date: "2026-10-02",
    },
    {
        id: "t6",
        investor: "Silje Aas",
        ticker: "YAR",
        company: "Yara International",
        sharesChange: 50000,
        relChange: 0.11,
        value: 17.61,
        ownership: 0.12,
        holding: 500000,
        executor: "Aas Invest ANS",
        date: "2026-08-14",
    },
    {
        id: "t7",
        investor: "Henrik Moe",
        ticker: "AKRBP",
        company: "Aker BP",
        sharesChange: 30000,
        relChange: 0.03,
        value: 9.18,
        ownership: 0.02,
        holding: 1030000,
        executor: "Moe Invest AS",
        date: "2026-04-08",
    },
    {
        id: "t8",
        investor: "Kari Nygård",
        ticker: "EQNR",
        company: "Equinor",
        sharesChange: -15000,
        relChange: -0.02,
        value: 4.3,
        ownership: 0.01,
        holding: 300000,
        executor: "Nygård Eiendom AS",
        date: "2026-01-29",
    },
    {
        id: "t9",
        investor: "Magnus Dahl",
        ticker: "DNB",
        company: "DNB Bank",
        sharesChange: 60000,
        relChange: 0.04,
        value: 12.9,
        ownership: 0.05,
        holding: 900000,
        executor: "Dahl Invest AS",
        date: "2025-11-12",
    },
    {
        id: "t10",
        investor: "Ragnhild Vik",
        ticker: "YAR",
        company: "Yara International",
        sharesChange: -40000,
        relChange: -0.1,
        value: 6.1,
        ownership: 0.07,
        holding: 450000,
        executor: "Vik Holding AS",
        date: "2025-06-03",
    },
];

/* Reference date: the "Siste data mottatt" date. Periods count back from it. */
const LATEST_DATA = "2026-10-26";
const LATEST_DATA_LABEL = "26.10.2026";

const NAVIGATION: SiteNavItem[][] = [
    [
        { label: "Nyheter", href: "#" },
        { label: "Børs", href: "#" },
        { label: "Aksjer", href: "#" },
    ],
    [
        { label: "Bjellesauene", href: "#", current: true },
        { label: "Rapporter", href: "#" },
        { label: "Meninger", href: "#" },
    ],
];

const SHORTCUTS: SiteNavItem[] = [
    { label: "Watchlist", href: "#" },
    { label: "Forum", href: "#" },
];

const PERIODS = [
    { id: "1d", label: "1D" },
    { id: "1u", label: "1U" },
    { id: "1m", label: "1M" },
    { id: "3m", label: "3M" },
    { id: "6m", label: "6M" },
    { id: "ytd", label: "YTD" },
    { id: "1y", label: "1Å" },
    { id: "3y", label: "3Å" },
    { id: "all", label: "Alle" },
];

const numberFormat = (options: Intl.NumberFormatOptions) => new Intl.NumberFormat("nb-NO", options);
const formatInt = (n: number) => numberFormat({ maximumFractionDigits: 0 }).format(n);
const formatSigned = (n: number) => numberFormat({ signDisplay: "exceptZero", maximumFractionDigits: 0 }).format(n);
const formatPercentSigned = (fraction: number | null) =>
    fraction === null ? "–" : numberFormat({ style: "percent", signDisplay: "exceptZero", maximumFractionDigits: 2 }).format(fraction);
const formatMillions = (n: number | null) => (n === null ? "–" : `${numberFormat({ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)} mill. kr`);
const formatOwnership = (n: number | null) => (n === null ? "–" : `${numberFormat({ minimumFractionDigits: 2, maximumFractionDigits: 5 }).format(n)} %`);
const formatDate = (iso: string | null) => {
    if (!iso) return "–";
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y}`;
};

/** Start of a period, as an ISO date, counted back from the latest data date. `null` = no limit. */
const periodStart = (id: Key): string | null => {
    const ref = new Date(`${LATEST_DATA}T00:00:00Z`);
    switch (id) {
        case "1d":
            ref.setUTCDate(ref.getUTCDate() - 1);
            break;
        case "1u":
            ref.setUTCDate(ref.getUTCDate() - 7);
            break;
        case "1m":
            ref.setUTCMonth(ref.getUTCMonth() - 1);
            break;
        case "3m":
            ref.setUTCMonth(ref.getUTCMonth() - 3);
            break;
        case "6m":
            ref.setUTCMonth(ref.getUTCMonth() - 6);
            break;
        case "ytd":
            return "2026-01-01";
        case "1y":
            ref.setUTCFullYear(ref.getUTCFullYear() - 1);
            break;
        case "3y":
            ref.setUTCFullYear(ref.getUTCFullYear() - 3);
            break;
        default:
            return null;
    }
    return ref.toISOString().slice(0, 10);
};

type SortColumn = "change" | "value" | "date";

const sortValue = (t: Trade, column: SortColumn): number | string | null => {
    if (column === "change") return t.sharesChange;
    if (column === "value") return t.value;
    return t.date;
};

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

const PAGE_SIZE = 10;

export interface BjellesauerProps {
    /** Subscribers see the full list and filters; logged-out readers see a teaser. */
    isSubscriber?: boolean;
}

export default function Bjellesauer({ isSubscriber = true }: BjellesauerProps) {
    const [ticker, setTicker] = useState<Key | null>(null);
    const [investor, setInvestor] = useState<Key | null>(null);
    const [period, setPeriod] = useState<Key | null>("1m");
    const [view, setView] = useState<Set<Key>>(new Set(["all"]));
    const [sort, setSort] = useState<AriaSortDescriptor>({ column: "date", direction: "descending" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);

    const tickerItems = useMemo(() => {
        const seen = new Map<string, string | null>();
        TRADES.forEach((t) => seen.set(t.ticker, t.company));
        return [...seen].map(([id, company]) => ({ id, label: company ? `${id} · ${company}` : id }));
    }, []);

    const investorItems = useMemo(() => [...new Set(TRADES.map((t) => t.investor))].map((name) => ({ id: name, label: name })), []);

    const filtered = useMemo(() => {
        const start = periodStart(period ?? "all");
        const mode = [...view][0];
        return TRADES.filter((t) => {
            if (ticker && t.ticker !== ticker) return false;
            if (investor && t.investor !== investor) return false;
            if (mode === "buy" && t.sharesChange <= 0) return false;
            if (mode === "sell" && t.sharesChange >= 0) return false;
            if (start && (!t.date || t.date < start)) return false;
            return true;
        });
    }, [ticker, investor, period, view]);

    const sorted = useMemo(() => {
        const column = sort.column as SortColumn;
        const dir = sort.direction === "descending" ? -1 : 1;
        return [...filtered].sort((a, b) => {
            const av = sortValue(a, column);
            const bv = sortValue(b, column);
            if (av === null && bv === null) return 0;
            if (av === null) return 1; // missing values last, both directions
            if (bv === null) return -1;
            return av < bv ? -dir : av > bv ? dir : 0;
        });
    }, [filtered, sort]);

    const total = Math.max(1, Math.ceil(sorted.length / pageSize));
    const currentPage = Math.min(page, total);
    const pageRows = isSubscriber ? sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize) : TRADES.slice(0, 2);

    const resetPage = () => setPage(1);

    return (
        <div className="min-h-dvh bg-secondary_alt">
            <SiteHeader brand="fa" navigation={NAVIGATION} shortcuts={SHORTCUTS} />

            <main className="mx-auto flex w-full flex-col gap-6 px-4 py-6 md:px-8">
                <header className="flex flex-col gap-2">
                    <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">Bjellesauene</h1>
                    <p className="max-w-3xl text-md text-tertiary">
                        Følg hva Norges mest kjente investorer kjøper og selger på Oslo Børs. Bruk listen som inspirasjon, ikke som råd.
                    </p>
                    <p className="text-xs font-medium text-tertiary">
                        Siste data mottatt: {LATEST_DATA_LABEL} · Oppdateres hver natt ca. kl. 23.00 · Registreringer vises to handelsdager etter handelen (T+2)
                    </p>
                </header>

                {isSubscriber ? (
                    <>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            <Select.ComboBox
                                label="Aksje"
                                placeholder="Søk etter aksje"
                                shortcut={false}
                                items={tickerItems}
                                value={ticker}
                                onChange={(key) => {
                                    setTicker(key);
                                    resetPage();
                                }}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select.ComboBox>
                            <Select.ComboBox
                                label="Investor"
                                placeholder="Søk etter investor"
                                shortcut={false}
                                items={investorItems}
                                value={investor}
                                onChange={(key) => {
                                    setInvestor(key);
                                    resetPage();
                                }}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select.ComboBox>
                            <Select
                                label="Periode"
                                placeholder="Velg periode"
                                items={PERIODS}
                                value={period}
                                onChange={(key) => {
                                    setPeriod(key);
                                    resetPage();
                                }}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <ButtonGroup
                                aria-label="Visning"
                                size="sm"
                                selectedKeys={view}
                                onSelectionChange={(keys) => {
                                    setView(keys);
                                    resetPage();
                                }}
                                disallowEmptySelection
                            >
                                <ButtonGroupItem id="all">Alle</ButtonGroupItem>
                                <ButtonGroupItem id="buy">Kjøp</ButtonGroupItem>
                                <ButtonGroupItem id="sell">Salg</ButtonGroupItem>
                            </ButtonGroup>
                            <Button color="secondary" size="sm" iconLeading={Download}>
                                Last ned CSV
                            </Button>
                        </div>
                    </>
                ) : null}

                <TableCard.Root size="sm">
                    <TableCard.Header
                        title="Transaksjoner"
                        badge={isSubscriber ? `${sorted.length} treff` : undefined}
                        description={`Siste data mottatt ${LATEST_DATA_LABEL}`}
                    />
                    <Table
                        aria-label="Bjellesauenes transaksjoner"
                        sortDescriptor={sort}
                        onSortChange={(next) => {
                            setSort(next);
                            resetPage();
                        }}
                    >
                        <Table.Header>
                            <Table.Head id="investor" label="Investor" isRowHeader />
                            <Table.Head id="stock" label="Aksje" />
                            <Table.Head id="change" label="Endring i aksjer" allowsSorting />
                            <Table.Head id="value" label="Verdi" allowsSorting className="hidden md:table-cell" />
                            <Table.Head id="ownership" label="Ny eierandel" className="hidden md:table-cell" />
                            <Table.Head id="holding" label="Beholdning" className="hidden md:table-cell" />
                            <Table.Head id="executor" label="Utført av" className="hidden lg:table-cell" />
                            <Table.Head id="date" label="Dato" allowsSorting className="hidden md:table-cell" />
                        </Table.Header>
                        <Table.Body
                            items={pageRows}
                            renderEmptyState={() => (
                                <EmptyState
                                    icon={Search}
                                    title="Ingen transaksjoner i valgt periode"
                                    description="Prøv en lengre periode eller fjern filtrene."
                                    className="py-8"
                                />
                            )}
                        >
                            {(t) => (
                                <Table.Row id={t.id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <Avatar size="sm" initials={getInitials(t.investor)} />
                                            <div className="flex min-w-0 flex-col items-start">
                                                <Button href="#" color="link-gray" size="sm">
                                                    {t.investor}
                                                </Button>
                                                <span className="text-xs text-tertiary md:hidden">{formatDate(t.date)}</span>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-col items-start gap-1">
                                            <Badge color="brand" size="sm" type="pill-color">
                                                {t.ticker}
                                            </Badge>
                                            <span className="text-xs text-tertiary">{t.company ?? "–"}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="tabular-nums">
                                        <div className="flex flex-col items-start gap-1">
                                            <BadgeWithIcon
                                                size="sm"
                                                color={t.sharesChange >= 0 ? "success" : "error"}
                                                iconLeading={t.sharesChange >= 0 ? ArrowUp : ArrowDown}
                                            >
                                                {formatSigned(t.sharesChange)}
                                            </BadgeWithIcon>
                                            <span className="text-xs text-tertiary">{formatPercentSigned(t.relChange)}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="hidden tabular-nums md:table-cell">{formatMillions(t.value)}</Table.Cell>
                                    <Table.Cell className="hidden tabular-nums md:table-cell">{formatOwnership(t.ownership)}</Table.Cell>
                                    <Table.Cell className="hidden tabular-nums md:table-cell">{t.holding === null ? "–" : formatInt(t.holding)}</Table.Cell>
                                    <Table.Cell className="hidden text-tertiary lg:table-cell">{t.executor ?? "–"}</Table.Cell>
                                    <Table.Cell className="hidden tabular-nums md:table-cell">{formatDate(t.date)}</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                    {isSubscriber ? (
                        <PaginationCardMinimal
                            page={currentPage}
                            total={total}
                            pageSize={pageSize}
                            onPageChange={setPage}
                            onPageSizeChange={(size) => {
                                setPageSize(size);
                                setPage(1);
                            }}
                        />
                    ) : null}
                </TableCard.Root>

                {!isSubscriber ? (
                    <section className="flex flex-col items-center gap-4 rounded-2xl border border-secondary bg-primary_alt p-6 text-center md:p-8">
                        <FeaturedIcon icon={Lock} color="brand" theme="light" size="lg" />
                        <h2 className="text-lg font-semibold text-primary">Se alle transaksjonene som abonnent</h2>
                        <p className="max-w-md text-sm text-tertiary">
                            Bjellesauene viser hver registrerte handel, med filtre på aksje, investor og periode, og kan lastes ned som CSV. Bli abonnent fra 99
                            kr i måneden.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button href="#" size="md">
                                Start abonnement
                            </Button>
                            <Button href="#" size="md" color="secondary">
                                Logg inn
                            </Button>
                        </div>
                    </section>
                ) : null}

                <section className="flex flex-col gap-3 rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5">
                    <h2 className="text-lg font-semibold text-primary">Slik lager vi listen</h2>
                    {/* PLACEHOLDER copy: the inclusion rules are not in the brief. */}
                    <p className="text-sm text-tertiary">
                        Listen tar med kjøp og salg som investorene er pålagt å melde til Finanstilsynet, for aksjer notert på Oslo Børs. Endringer vises når de
                        er registrert i VPS, normalt to handelsdager etter handelen.
                    </p>
                    <p className="text-sm text-tertiary">
                        Bjellesauene er ikke en anbefaling. Investorene kan ha andre motiver for handelen enn det som fremgår av listen.
                    </p>
                </section>

                <section className="flex flex-col gap-4 rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-semibold text-primary">Nyhetsbrev</h2>
                        <p className="text-sm text-tertiary">Få Bjellesauene på e-post etter hver oppdatering.</p>
                    </div>
                    <Form className="flex flex-col gap-3 md:flex-row md:items-end" onSubmit={(event) => event.preventDefault()}>
                        <Input label="E-post" type="email" autoComplete="email" placeholder="navn@firma.no" className="w-full md:max-w-sm" />
                        <Button type="submit">Abonner</Button>
                    </Form>
                </section>
            </main>

            <SiteFooter
                brand="fa"
                links={[
                    [
                        { label: "Om Finansavisen", href: "#" },
                        { label: "Kontakt", href: "#" },
                    ],
                ]}
                publisherInfo={["Finansavisen AS", "Org.nr. 000 000 000"]}
                copyright="© 2026 Finansavisen AS"
                disclaimer="PLACEHOLDER: ansvarsfraskrivelse for Bjellesauene (innhold ikke oppgitt i brief)."
            />
        </div>
    );
}
