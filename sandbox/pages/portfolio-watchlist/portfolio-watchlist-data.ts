// Placeholder data for the portfolio watchlist page. Every figure here is invented (see the notes).
import type { Period } from "fa-design-system/components/application/period-selector/period-selector";

export type AssetType = "stock" | "commodity" | "fx";

export interface Instrument {
    ticker: string;
    name: string;
    initials: string;
    assetType: AssetType;
    last: number;
    change: number;
    changePct: number;
    /** Returns in percent; `null` when there's no data (shown as "–"). */
    returns: { "1M": number | null; "3M": number | null; YTD: number | null; "1Y": number | null; "5Y": number | null };
    pe: number | null;
    pb: number | null;
    dividendYield: number | null;
}

export interface Holding {
    ticker: string;
    quantity: number;
    avgPrice: number;
}

export interface Transaction {
    id: string;
    ticker: string;
    date: string;
    type: "buy" | "sell";
    quantity: number;
    price: number;
    fees: number;
    affectsCash: boolean;
}

export interface CashMovement {
    id: string;
    date: string;
    type: "Innskudd" | "Uttak" | "Utbytte";
    amount: number;
}

export interface ReceivedDividend {
    id: string;
    ticker: string;
    date: string;
    perShare: number;
    quantity: number;
}

export interface NewsItem {
    id: string;
    ticker: string;
    source: "FA" | "TDN" | "Børsmelding" | "Pressemelding";
    category: "Resultater" | "Utbytte" | "Oppkjøp" | "Analyse" | "Marked";
    time: string;
    headline: string;
    snippet: string;
}

export interface CalendarEvent {
    id: string;
    ticker: string;
    type: string;
    date: string;
}

export interface UpcomingDividend {
    id: string;
    ticker: string;
    perShare: number;
    date: string;
}

export interface Kpi {
    label: string;
    value: number;
    /** Percent; left out for the portfolio value, which shows its currency instead. */
    percent?: number;
    signed?: boolean;
}

export interface Watchlist {
    id: string;
    name: string;
    dayChange: number;
    holdings: Holding[];
    cash: number;
    kpis: Kpi[];
    periods: { id: Period; change: number; benchmark: number }[];
    metrics: {
        value: number;
        holdingsValue: number;
        cash: number;
        alpha: number;
        beta: number;
        stdDev: number;
        dividendYield: number;
        pe: number;
        pb: number;
        dividendsReceived: number;
    };
}

export const instruments: Record<string, Instrument> = {
    EQNR: {
        ticker: "EQNR",
        name: "Equinor",
        initials: "EQ",
        assetType: "stock",
        last: 268.4,
        change: 3.15,
        changePct: 1.19,
        returns: { "1M": 4.82, "3M": -2.14, YTD: 6.35, "1Y": 1.92, "5Y": 61.4 },
        pe: 7.9,
        pb: 1.8,
        dividendYield: 9.1,
    },
    DNB: {
        ticker: "DNB",
        name: "DNB Bank",
        initials: "DN",
        assetType: "stock",
        last: 248.9,
        change: -1.3,
        changePct: -0.52,
        returns: { "1M": 1.12, "3M": 5.66, YTD: 14.2, "1Y": 19.8, "5Y": 88.5 },
        pe: 9.4,
        pb: 1.4,
        dividendYield: 6.8,
    },
    KOG: {
        ticker: "KOG",
        name: "Kongsberg Gruppen",
        initials: "KO",
        assetType: "stock",
        last: 412.6,
        change: 9.8,
        changePct: 2.43,
        returns: { "1M": 7.4, "3M": 12.9, YTD: 41.3, "1Y": 58.2, "5Y": 512.4 },
        pe: 34.6,
        pb: 9.2,
        dividendYield: 1.4,
    },
    MOWI: {
        ticker: "MOWI",
        name: "Mowi",
        initials: "MO",
        assetType: "stock",
        last: 196.35,
        change: -2.45,
        changePct: -1.23,
        returns: { "1M": -3.8, "3M": -6.1, YTD: -4.2, "1Y": 2.7, "5Y": 14.9 },
        pe: 16.2,
        pb: 2.9,
        dividendYield: 4.3,
    },
    NHY: {
        ticker: "NHY",
        name: "Norsk Hydro",
        initials: "NH",
        assetType: "stock",
        last: 71.84,
        change: 0.62,
        changePct: 0.87,
        returns: { "1M": 2.6, "3M": 9.3, YTD: 18.7, "1Y": 22.4, "5Y": 79.1 },
        pe: 13.1,
        pb: 1.6,
        dividendYield: 3.5,
    },
    TEL: {
        ticker: "TEL",
        name: "Telenor",
        initials: "TE",
        assetType: "stock",
        last: 152.1,
        change: 0,
        changePct: 0,
        returns: { "1M": 0.8, "3M": 3.2, YTD: 11.6, "1Y": 14.9, "5Y": -2.3 },
        pe: 18.4,
        pb: 3.7,
        dividendYield: 6.2,
    },
    ORK: {
        ticker: "ORK",
        name: "Orkla",
        initials: "OR",
        assetType: "stock",
        last: 112.45,
        change: -0.55,
        changePct: -0.49,
        returns: { "1M": -1.4, "3M": 2.2, YTD: 9.8, "1Y": 16.1, "5Y": 21.7 },
        pe: 17.9,
        pb: 2.6,
        dividendYield: 3.6,
    },
    GJF: {
        ticker: "GJF",
        name: "Gjensidige Forsikring",
        initials: "GJ",
        assetType: "stock",
        last: 241.2,
        change: -1.8,
        changePct: -0.74,
        returns: { "1M": -2.2, "3M": 4.5, YTD: 12.3, "1Y": 17.6, "5Y": null },
        pe: 19.7,
        pb: 4.1,
        dividendYield: 4.6,
    },
    XAUNOK: {
        ticker: "XAU/NOK",
        name: "Gull",
        initials: "AU",
        assetType: "commodity",
        last: 43812.5,
        change: 286.4,
        changePct: 0.66,
        returns: { "1M": 3.9, "3M": 8.8, YTD: 31.2, "1Y": 38.4, "5Y": 142.6 },
        pe: null,
        pb: null,
        dividendYield: null,
    },
    NOKSEK: {
        ticker: "NOK/SEK",
        name: "Norske kroner / svenske kroner",
        initials: "NS",
        assetType: "fx",
        last: 0.9412,
        change: -0.0021,
        changePct: -0.22,
        returns: { "1M": -0.6, "3M": 0.4, YTD: -1.8, "1Y": -2.9, "5Y": null },
        pe: null,
        pb: null,
        dividendYield: null,
    },
};

export const watchlists: Watchlist[] = [
    {
        id: "langsiktig",
        name: "Langsiktig",
        dayChange: 0.84,
        holdings: [
            { ticker: "EQNR", quantity: 800, avgPrice: 231.4 },
            { ticker: "DNB", quantity: 900, avgPrice: 186.2 },
            { ticker: "KOG", quantity: 450, avgPrice: 198.75 },
            { ticker: "MOWI", quantity: 600, avgPrice: 204.1 },
            { ticker: "NHY", quantity: 2500, avgPrice: 58.3 },
            { ticker: "TEL", quantity: 700, avgPrice: 129.9 },
            { ticker: "XAUNOK", quantity: 2, avgPrice: 31250 },
            { ticker: "NOKSEK", quantity: 50000, avgPrice: 0.9685 },
        ],
        cash: 88250,
        kpis: [
            { label: "Porteføljeverdi", value: 1284650 },
            { label: "Avkastning i dag", value: 10712, percent: 0.84, signed: true },
            { label: "Avkastning siden start", value: 312480, percent: 32.14, signed: true },
            { label: "Urealisert siden start", value: 268300, percent: 27.6, signed: true },
            { label: "Realisert siden start", value: 44180, percent: 4.54, signed: true },
        ],
        periods: [
            { id: "5D", change: 1.64, benchmark: 0.92 },
            { id: "1M", change: 3.48, benchmark: 2.15 },
            { id: "6M", change: -2.31, benchmark: 1.08 },
            { id: "YTD", change: 14.82, benchmark: 10.4 },
            { id: "1Y", change: 18.4, benchmark: 12.1 },
            { id: "5Y", change: 71.6, benchmark: 48.3 },
        ],
        metrics: {
            value: 1284650,
            holdingsValue: 1196400,
            cash: 88250,
            alpha: 2.8,
            beta: 0.92,
            stdDev: 14.6,
            dividendYield: 4.1,
            pe: 11.8,
            pb: 1.9,
            dividendsReceived: 38420,
        },
    },
    {
        id: "utbytte",
        name: "Utbytteaksjer",
        dayChange: -0.32,
        holdings: [
            { ticker: "DNB", quantity: 400, avgPrice: 201.5 },
            { ticker: "TEL", quantity: 1200, avgPrice: 141.2 },
            { ticker: "ORK", quantity: 1500, avgPrice: 92.4 },
            { ticker: "GJF", quantity: 350, avgPrice: 198.6 },
            { ticker: "MOWI", quantity: 300, avgPrice: 188.9 },
        ],
        cash: 21400,
        kpis: [
            { label: "Porteføljeverdi", value: 618930 },
            { label: "Avkastning i dag", value: -1990, percent: -0.32, signed: true },
            { label: "Avkastning siden start", value: 96420, percent: 18.45, signed: true },
            { label: "Urealisert siden start", value: 71880, percent: 13.76, signed: true },
            { label: "Realisert siden start", value: 24540, percent: 4.69, signed: true },
        ],
        periods: [
            { id: "5D", change: -0.48, benchmark: 0.92 },
            { id: "1M", change: 1.12, benchmark: 2.15 },
            { id: "6M", change: 4.85, benchmark: 1.08 },
            { id: "YTD", change: 9.36, benchmark: 10.4 },
            { id: "1Y", change: 13.2, benchmark: 12.1 },
            { id: "5Y", change: 39.8, benchmark: 48.3 },
        ],
        metrics: {
            value: 618930,
            holdingsValue: 597530,
            cash: 21400,
            alpha: -1.2,
            beta: 0.71,
            stdDev: 10.9,
            dividendYield: 5.6,
            pe: 15.3,
            pb: 2.4,
            dividendsReceived: 31760,
        },
    },
    {
        id: "ny-liste",
        name: "Ny liste",
        dayChange: 0,
        holdings: [],
        cash: 0,
        kpis: [],
        periods: [],
        metrics: { value: 0, holdingsValue: 0, cash: 0, alpha: 0, beta: 0, stdDev: 0, dividendYield: 0, pe: 0, pb: 0, dividendsReceived: 0 },
    },
];

export const transactions: Transaction[] = [
    { id: "t1", ticker: "KOG", date: "2026-10-21", type: "buy", quantity: 50, price: 398.2, fees: 49, affectsCash: true },
    { id: "t2", ticker: "MOWI", date: "2026-10-14", type: "sell", quantity: 200, price: 201.6, fees: 49, affectsCash: true },
    { id: "t3", ticker: "DNB", date: "2026-10-02", type: "buy", quantity: 150, price: 242.1, fees: 49, affectsCash: true },
    { id: "t4", ticker: "EQNR", date: "2026-09-18", type: "buy", quantity: 200, price: 252.75, fees: 49, affectsCash: true },
    { id: "t5", ticker: "XAUNOK", date: "2026-09-03", type: "buy", quantity: 1, price: 41020, fees: 99, affectsCash: true },
    { id: "t6", ticker: "TEL", date: "2026-08-22", type: "sell", quantity: 300, price: 148.3, fees: 49, affectsCash: true },
    { id: "t7", ticker: "NHY", date: "2026-08-07", type: "buy", quantity: 1000, price: 64.12, fees: 49, affectsCash: false },
    { id: "t8", ticker: "ORK", date: "2026-07-15", type: "buy", quantity: 500, price: 104.8, fees: 49, affectsCash: true },
    { id: "t9", ticker: "KOG", date: "2026-06-30", type: "sell", quantity: 100, price: 371.4, fees: 49, affectsCash: true },
    { id: "t10", ticker: "GJF", date: "2026-06-11", type: "buy", quantity: 150, price: 226.9, fees: 49, affectsCash: true },
    { id: "t11", ticker: "NOKSEK", date: "2026-05-27", type: "buy", quantity: 50000, price: 0.9685, fees: 0, affectsCash: true },
    { id: "t12", ticker: "DNB", date: "2026-04-16", type: "buy", quantity: 300, price: 214.5, fees: 49, affectsCash: true },
    { id: "t13", ticker: "MOWI", date: "2026-03-04", type: "buy", quantity: 400, price: 207.25, fees: 49, affectsCash: true },
    { id: "t14", ticker: "EQNR", date: "2026-02-12", type: "buy", quantity: 600, price: 224.3, fees: 49, affectsCash: true },
];

export const cashMovements: CashMovement[] = [
    { id: "c1", date: "2026-10-01", type: "Innskudd", amount: 50000 },
    { id: "c2", date: "2026-09-22", type: "Utbytte", amount: 7360 },
    { id: "c3", date: "2026-08-15", type: "Uttak", amount: -25000 },
    { id: "c4", date: "2026-05-28", type: "Utbytte", amount: 12480 },
    { id: "c5", date: "2026-01-05", type: "Innskudd", amount: 200000 },
];

export const receivedDividends: ReceivedDividend[] = [
    { id: "d1", ticker: "EQNR", date: "2026-08-26", perShare: 3.86, quantity: 800 },
    { id: "d2", ticker: "TEL", date: "2026-05-15", perShare: 4.6, quantity: 1000 },
    { id: "d3", ticker: "DNB", date: "2026-05-02", perShare: 16.5, quantity: 750 },
    { id: "d4", ticker: "NHY", date: "2026-05-12", perShare: 2.25, quantity: 1500 },
    { id: "d5", ticker: "KOG", date: "2026-05-20", perShare: 5.6, quantity: 500 },
];

export const news: NewsItem[] = [
    {
        id: "n1",
        ticker: "KOG",
        source: "FA",
        category: "Resultater",
        time: "14:32",
        headline: "Kongsberg Gruppen knuste forventningene – ordreboken passerer 130 milliarder",
        snippet:
            "Forsvars- og maritimkonsernet leverte et driftsresultat på 2,1 milliarder kroner i tredje kvartal, godt over analytikernes snitt. Aksjen stiger over 2 prosent.",
    },
    {
        id: "n2",
        ticker: "EQNR",
        source: "TDN",
        category: "Marked",
        time: "13:58",
        headline: "Equinor opp etter sterk oljepris: Brent nærmer seg 82 dollar",
        snippet: "Oljeprisen stiger for tredje dag på rad etter nye produksjonskutt fra Opec+, og energiaksjene leder an på Oslo Børs.",
    },
    {
        id: "n3",
        ticker: "MOWI",
        source: "Børsmelding",
        category: "Resultater",
        time: "12:10",
        headline: "Mowi ASA – Trading update Q3 2026",
        snippet:
            "Mowi høstet 128 000 tonn i tredje kvartal. Selskapet justerer volumguidingen for 2026 ned med 5 000 tonn som følge av lavere biologisk vekst i Midt-Norge.",
    },
    {
        id: "n4",
        ticker: "DNB",
        source: "FA",
        category: "Analyse",
        time: "11:45",
        headline: "Analytikerne kutter kursmålet på DNB etter rentesignalene fra Norges Bank",
        snippet: "Tre meglerhus har nedjustert kursmålet den siste uken. – Rentemarginen har toppet ut, sier banksjefanalytiker i Pareto.",
    },
    {
        id: "n5",
        ticker: "NHY",
        source: "Pressemelding",
        category: "Oppkjøp",
        time: "10:02",
        headline: "Hydro kjøper resirkuleringsanlegg i Tyskland for 1,4 milliarder kroner",
        snippet: "Oppkjøpet øker Hydros kapasitet for resirkulert aluminium med 120 000 tonn i året og skal være fullført innen første kvartal 2027.",
    },
    {
        id: "n6",
        ticker: "TEL",
        source: "TDN",
        category: "Utbytte",
        time: "09:31",
        headline: "Telenor bekrefter utbyttepolitikken og varsler tilbakekjøp",
        snippet: "Konsernsjefen gjentok målet om økende utbytte per aksje og åpner for tilbakekjøp på opptil 3 milliarder kroner neste år.",
    },
    {
        id: "n7",
        ticker: "EQNR",
        source: "Børsmelding",
        category: "Resultater",
        time: "08:00",
        headline: "Equinor ASA: Invitasjon til presentasjon av resultatene for tredje kvartal",
        snippet: "Equinor legger fram resultatene for tredje kvartal 2026 onsdag 5. november klokken 07.00. Presentasjonen strømmes direkte.",
    },
    {
        id: "n8",
        ticker: "KOG",
        source: "FA",
        category: "Marked",
        time: "07:42",
        headline: "Børsmorgen: Forsvarsaksjene fortsetter oppturen",
        snippet: "Kongsberg Gruppen er opp 41 prosent hittil i år. Analytikerne venter at nye NATO-kontrakter gir mer drahjelp i fjerde kvartal.",
    },
];

export const calendarEvents: CalendarEvent[] = [
    { id: "e1", ticker: "KOG", type: "Kvartalsrapport Q3", date: "2026-10-29" },
    { id: "e2", ticker: "MOWI", type: "Kvartalsrapport Q3", date: "2026-11-04" },
    { id: "e3", ticker: "EQNR", type: "Kvartalsrapport Q3", date: "2026-11-05" },
    { id: "e4", ticker: "NHY", type: "Kapitalmarkedsdag", date: "2026-11-12" },
    { id: "e5", ticker: "DNB", type: "Kapitalmarkedsdag", date: "2026-11-19" },
];

export const upcomingDividends: UpcomingDividend[] = [
    { id: "u1", ticker: "EQNR", perShare: 3.92, date: "2026-11-13" },
    { id: "u2", ticker: "MOWI", perShare: 1.7, date: "2026-11-20" },
    { id: "u3", ticker: "TEL", perShare: 2.35, date: "2026-12-04" },
    { id: "u4", ticker: "ORK", perShare: 1.5, date: "2026-12-10" },
];
