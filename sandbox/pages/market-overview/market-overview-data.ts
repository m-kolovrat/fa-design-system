/**
 * Placeholder figures for the market overview page. Every number, date and headline here is invented
 * (plausible for Oslo Børs on Wednesday 28 October 2026) and needs replacing with live data.
 */

export type AssetGroup = "indekser" | "ravarer" | "valuta" | "krypto" | "renter";

export interface MarketInstrument {
    id: string;
    name: string;
    /** The short code shown under the name. */
    code: string;
    group: AssetGroup;
    last: number;
    /** Absolute change today, in the instrument's unit. */
    change: number;
    /** Change today in percent (0.84 = +0,84 %). */
    changePct: number;
    /** Decimals to show for the last price. */
    decimals: number;
    /** Change over each chart period in percent; 1D equals `changePct`. */
    periods: { "5D": number; "6M": number; "1Y": number; "5Y": number };
}

export const assetGroups: { id: AssetGroup; label: string }[] = [
    { id: "indekser", label: "Indekser" },
    { id: "ravarer", label: "Råvarer" },
    { id: "valuta", label: "Valuta" },
    { id: "krypto", label: "Krypto" },
    { id: "renter", label: "Renter" },
];

export const marketInstruments: MarketInstrument[] = [
    {
        id: "OSEBX",
        name: "Hovedindeksen",
        code: "OSEBX",
        group: "indekser",
        last: 1612.48,
        change: 13.39,
        changePct: 0.84,
        decimals: 2,
        periods: { "5D": 1.92, "6M": 6.41, "1Y": 12.86, "5Y": 58.3 },
    },
    {
        id: "OBX",
        name: "OBX",
        code: "OBX",
        group: "indekser",
        last: 1498.21,
        change: 13.68,
        changePct: 0.92,
        decimals: 2,
        periods: { "5D": 2.05, "6M": 5.88, "1Y": 11.4, "5Y": 61.2 },
    },
    {
        id: "DJI",
        name: "Dow Jones",
        code: "DJI",
        group: "indekser",
        last: 46812.3,
        change: -98.52,
        changePct: -0.21,
        decimals: 2,
        periods: { "5D": -0.64, "6M": 7.12, "1Y": 9.86, "5Y": 71.5 },
    },
    {
        id: "SPX",
        name: "S&P 500",
        code: "SPX",
        group: "indekser",
        last: 6742.18,
        change: 8.08,
        changePct: 0.12,
        decimals: 2,
        periods: { "5D": 0.38, "6M": 9.45, "1Y": 15.2, "5Y": 98.4 },
    },
    {
        id: "IXIC",
        name: "Nasdaq",
        code: "IXIC",
        group: "indekser",
        last: 22905.66,
        change: 109.42,
        changePct: 0.48,
        decimals: 2,
        periods: { "5D": 1.12, "6M": 12.8, "1Y": 21.6, "5Y": 124.1 },
    },
    {
        id: "VIX",
        name: "VIX",
        code: "VIX",
        group: "indekser",
        last: 16.42,
        change: -0.53,
        changePct: -3.1,
        decimals: 2,
        periods: { "5D": -8.4, "6M": -12.6, "1Y": -4.2, "5Y": -38.9 },
    },
    {
        id: "BRENT",
        name: "Brent spot",
        code: "BRENT",
        group: "ravarer",
        last: 64.82,
        change: -0.73,
        changePct: -1.12,
        decimals: 2,
        periods: { "5D": -2.84, "6M": -6.5, "1Y": -11.3, "5Y": 58.2 },
    },
    {
        id: "XAU",
        name: "Gull",
        code: "XAU",
        group: "ravarer",
        last: 4012.5,
        change: 14.39,
        changePct: 0.36,
        decimals: 2,
        periods: { "5D": 1.48, "6M": 18.2, "1Y": 46.1, "5Y": 112.6 },
    },
    {
        id: "EURNOK",
        name: "EURNOK",
        code: "EUR/NOK",
        group: "valuta",
        last: 11.642,
        change: -0.0093,
        changePct: -0.08,
        decimals: 4,
        periods: { "5D": 0.21, "6M": -1.4, "1Y": -0.9, "5Y": 12.8 },
    },
    {
        id: "USDNOK",
        name: "USDNOK",
        code: "USD/NOK",
        group: "valuta",
        last: 10.0185,
        change: -0.022,
        changePct: -0.22,
        decimals: 4,
        periods: { "5D": -0.35, "6M": -3.2, "1Y": -8.6, "5Y": 14.1 },
    },
    {
        id: "GBPNOK",
        name: "GBPNOK",
        code: "GBP/NOK",
        group: "valuta",
        last: 13.349,
        change: 0.0067,
        changePct: 0.05,
        decimals: 4,
        periods: { "5D": 0.12, "6M": -2.1, "1Y": -1.8, "5Y": 9.4 },
    },
    {
        id: "CHFNOK",
        name: "CHFNOK",
        code: "CHF/NOK",
        group: "valuta",
        last: 12.571,
        change: 0.0138,
        changePct: 0.11,
        decimals: 4,
        periods: { "5D": 0.4, "6M": 1.9, "1Y": 3.6, "5Y": 31.2 },
    },
    {
        id: "BTC",
        name: "Bitcoin",
        code: "BTC/NOK",
        group: "krypto",
        last: 1128400,
        change: 25476,
        changePct: 2.31,
        decimals: 0,
        periods: { "5D": 4.8, "6M": 21.4, "1Y": 38.9, "5Y": 284.5 },
    },
    {
        id: "US10Y",
        name: "USA 10 år",
        code: "US10Y",
        group: "renter",
        last: 4.08,
        change: -0.03,
        changePct: -0.73,
        decimals: 2,
        periods: { "5D": -1.2, "6M": -5.6, "1Y": -2.4, "5Y": 168.4 },
    },
];

export interface Stock {
    name: string;
    ticker: string;
}

export interface Mover extends Stock {
    last: number;
    changePct: number;
}

export const winners: Mover[] = [
    { name: "Nordic Mining", ticker: "NOM", last: 2.145, changePct: 18.42 },
    { name: "Ultimovacs", ticker: "ULTI", last: 0.0556, changePct: 11.2 },
    { name: "Pexip Holding", ticker: "PEXIP", last: 52.8, changePct: 9.12 },
    { name: "Kongsberg Gruppen", ticker: "KOG", last: 312.4, changePct: 6.12 },
    { name: "Nordic Semiconductor", ticker: "NOD", last: 148.9, changePct: 4.87 },
    { name: "Hafnia", ticker: "HAFNI", last: 61.24, changePct: 3.95 },
    { name: "Aker BP", ticker: "AKRBP", last: 254.1, changePct: 3.1 },
    { name: "Frontline", ticker: "FRO", last: 228.6, changePct: 2.84 },
    { name: "Tomra Systems", ticker: "TOM", last: 131.25, changePct: 2.41 },
    { name: "Kitron", ticker: "KIT", last: 58.9, changePct: 2.15 },
    { name: "DNB Bank", ticker: "DNB", last: 268.4, changePct: 1.92 },
    { name: "Vår Energi", ticker: "VAR", last: 34.86, changePct: 1.74 },
    { name: "Aker Solutions", ticker: "AKSO", last: 33.12, changePct: 1.61 },
    { name: "Storebrand", ticker: "STB", last: 141.7, changePct: 1.43 },
];

export const losers: Mover[] = [
    { name: "Hexagon Purus", ticker: "HPUR", last: 3.212, changePct: -12.4 },
    { name: "Vow", ticker: "VOW", last: 0.842, changePct: -9.3 },
    { name: "Nel", ticker: "NEL", last: 2.486, changePct: -7.85 },
    { name: "Aker Carbon Capture", ticker: "ACC", last: 4.98, changePct: -5.12 },
    { name: "Borr Drilling", ticker: "BORR", last: 26.74, changePct: -4.62 },
    { name: "Norwegian Air Shuttle", ticker: "NAS", last: 13.05, changePct: -3.88 },
    { name: "Scatec", ticker: "SCATC", last: 84.3, changePct: -3.12 },
    { name: "Mowi", ticker: "MOWI", last: 191.8, changePct: -2.45 },
    { name: "SalMar", ticker: "SALM", last: 512, changePct: -2.1 },
    { name: "Equinor", ticker: "EQNR", last: 248.35, changePct: -1.46 },
    { name: "Orkla", ticker: "ORK", last: 112.6, changePct: -1.21 },
    { name: "Telenor", ticker: "TEL", last: 158.9, changePct: -0.94 },
    { name: "Yara International", ticker: "YAR", last: 362.2, changePct: -0.81 },
    { name: "Gjensidige Forsikring", ticker: "GJF", last: 246.5, changePct: -0.52 },
];

export interface MostTraded extends Stock {
    /** Turnover in NOK. */
    turnover: number;
    last: number;
    change: number;
    changePct: number;
}

export const mostTraded: MostTraded[] = [
    { name: "Equinor", ticker: "EQNR", turnover: 640_890_000, last: 248.35, change: -3.68, changePct: -1.46 },
    { name: "DNB Bank", ticker: "DNB", turnover: 412_300_000, last: 268.4, change: 5.06, changePct: 1.92 },
    { name: "Kongsberg Gruppen", ticker: "KOG", turnover: 388_120_000, last: 312.4, change: 18.02, changePct: 6.12 },
    { name: "Mowi", ticker: "MOWI", turnover: 254_760_000, last: 191.8, change: -4.72, changePct: -2.45 },
    { name: "Aker BP", ticker: "AKRBP", turnover: 231_480_000, last: 254.1, change: 7.64, changePct: 3.1 },
    { name: "Frontline", ticker: "FRO", turnover: 198_050_000, last: 228.6, change: 6.32, changePct: 2.84 },
    { name: "Nordic Semiconductor", ticker: "NOD", turnover: 176_930_000, last: 148.9, change: 6.92, changePct: 4.87 },
    { name: "Telenor", ticker: "TEL", turnover: 152_410_000, last: 158.9, change: -1.51, changePct: -0.94 },
];

export interface UnusualVolume extends Stock {
    /** Today's volume against the normal daily volume, in percent. */
    volumeRatioPct: number;
    last: number;
    change: number;
    changePct: number;
}

export const unusualVolume: UnusualVolume[] = [
    { name: "Nordic Mining", ticker: "NOM", volumeRatioPct: 1303.74, last: 2.145, change: 0.3336, changePct: 18.42 },
    { name: "Ultimovacs", ticker: "ULTI", volumeRatioPct: 864.2, last: 0.0556, change: 0.0056, changePct: 11.2 },
    { name: "Pexip Holding", ticker: "PEXIP", volumeRatioPct: 512.9, last: 52.8, change: 4.41, changePct: 9.12 },
    { name: "Hexagon Purus", ticker: "HPUR", volumeRatioPct: 388.15, last: 3.212, change: -0.4547, changePct: -12.4 },
    { name: "Vow", ticker: "VOW", volumeRatioPct: 301.4, last: 0.842, change: -0.0863, changePct: -9.3 },
    { name: "Kitron", ticker: "KIT", volumeRatioPct: 244.6, last: 58.9, change: 1.24, changePct: 2.15 },
    { name: "Borr Drilling", ticker: "BORR", volumeRatioPct: 198.3, last: 26.74, change: -1.3, changePct: -4.62 },
    { name: "Hafnia", ticker: "HAFNI", volumeRatioPct: 176.8, last: 61.24, change: 2.33, changePct: 3.95 },
];

export interface ShortPosition extends Stock {
    /** Share of the company's shares that are shorted, in percent. */
    shortPct: number;
    /** Value of the short positions in NOK. */
    shortValue: number;
    daysToCover: number;
}

export const shortPositions: ShortPosition[] = [
    { name: "Nel", ticker: "NEL", shortPct: 8.42, shortValue: 342_000_000, daysToCover: 6.8 },
    { name: "Hexagon Composites", ticker: "HEX", shortPct: 6.15, shortValue: 418_000_000, daysToCover: 4.2 },
    { name: "Norwegian Air Shuttle", ticker: "NAS", shortPct: 4.88, shortValue: 1_310_000_000, daysToCover: 3.1 },
    { name: "Scatec", ticker: "SCATC", shortPct: 4.21, shortValue: 562_000_000, daysToCover: 5.4 },
    { name: "Aker Horizons", ticker: "AKH", shortPct: 3.96, shortValue: 74_000_000, daysToCover: 9.7 },
    { name: "Tomra Systems", ticker: "TOM", shortPct: 3.12, shortValue: 1_210_000_000, daysToCover: 2.6 },
    { name: "Salmar", ticker: "SALM", shortPct: 2.84, shortValue: 2_150_000_000, daysToCover: 3.9 },
    { name: "Mowi", ticker: "MOWI", shortPct: 2.31, shortValue: 2_290_000_000, daysToCover: 2.2 },
];

export interface ExtremeRecord extends Stock {
    price: number;
    date: string;
    /** Return over the last year, in percent. */
    return1Y: number;
}

export const allTimeHighs: ExtremeRecord[] = [
    { name: "Kongsberg Gruppen", ticker: "KOG", price: 312.4, date: "28. okt. 2026", return1Y: 62.4 },
    { name: "DNB Bank", ticker: "DNB", price: 268.4, date: "28. okt. 2026", return1Y: 24.8 },
    { name: "Storebrand", ticker: "STB", price: 141.7, date: "27. okt. 2026", return1Y: 31.2 },
    { name: "Gjensidige Forsikring", ticker: "GJF", price: 248.9, date: "23. okt. 2026", return1Y: 18.6 },
    { name: "Kitron", ticker: "KIT", price: 59.4, date: "22. okt. 2026", return1Y: 88.1 },
    { name: "Wilh. Wilhelmsen", ticker: "WWI", price: 512, date: "20. okt. 2026", return1Y: 41.5 },
];

export const allTimeLows: ExtremeRecord[] = [
    { name: "Hexagon Purus", ticker: "HPUR", price: 3.212, date: "28. okt. 2026", return1Y: -71.4 },
    { name: "Vow", ticker: "VOW", price: 0.842, date: "28. okt. 2026", return1Y: -82.6 },
    { name: "Aker Carbon Capture", ticker: "ACC", price: 4.98, date: "26. okt. 2026", return1Y: -38.2 },
    { name: "Nel", ticker: "NEL", price: 2.486, date: "21. okt. 2026", return1Y: -54.9 },
    { name: "Ultimovacs", ticker: "ULTI", price: 0.0498, date: "19. okt. 2026", return1Y: -91.3 },
    { name: "Agilyx", ticker: "AGLX", price: 11.04, date: "15. okt. 2026", return1Y: -44.7 },
];

export type NewsCategory = "fa" | "tdn" | "borsmelding" | "pressemelding";

export const newsCategories: { id: NewsCategory | "alle" | "watchlist"; label: string }[] = [
    { id: "alle", label: "Alle" },
    { id: "fa", label: "FA" },
    { id: "tdn", label: "TDN" },
    { id: "borsmelding", label: "Børsmeldinger" },
    { id: "pressemelding", label: "Pressemeldinger" },
    { id: "watchlist", label: "Min watchlist" },
];

export const newsCategoryLabel: Record<NewsCategory, string> = {
    fa: "FA",
    tdn: "TDN Direkt",
    borsmelding: "Børsmelding",
    pressemelding: "Pressemelding",
};

export interface NewsItem {
    id: string;
    time: string;
    ticker?: string;
    headline: string;
    category: NewsCategory;
}

export const news: NewsItem[] = [
    { id: "n1", time: "14:32", ticker: "KOG", headline: "Kongsberg Gruppen vinner forsvarskontrakt verdt 4,2 milliarder kroner", category: "fa" },
    { id: "n2", time: "14:18", ticker: "NOM", headline: "Nordic Mining – Oppdatering om finansiering av Engebø-prosjektet", category: "borsmelding" },
    { id: "n3", time: "14:05", headline: "Oslo Børs stiger for tredje dag på rad, oljeaksjene trekker opp", category: "tdn" },
    { id: "n4", time: "13:51", ticker: "EQNR", headline: "Equinor kutter produksjonsanslaget for Johan Castberg etter vedlikehold", category: "fa" },
    { id: "n5", time: "13:40", ticker: "HPUR", headline: "Hexagon Purus – Resultat for tredje kvartal 2026", category: "borsmelding" },
    { id: "n6", time: "13:22", ticker: "DNB", headline: "DNB Markets oppjusterer kursmålet på Storebrand til 160 kroner", category: "tdn" },
    { id: "n7", time: "13:05", ticker: "MOWI", headline: "Mowi lanserer ny fôrfabrikk i Midt-Norge", category: "pressemelding" },
    { id: "n8", time: "12:47", headline: "Norges Bank holder renten uendret på 3,75 prosent", category: "tdn" },
    { id: "n9", time: "12:30", ticker: "PEXIP", headline: "Pexip Holding – Ny avtale med offentlig kunde i Tyskland", category: "borsmelding" },
    { id: "n10", time: "12:12", ticker: "NEL", headline: "Nel faller etter svak ordreinngang i tredje kvartal", category: "fa" },
    { id: "n11", time: "11:58", ticker: "TOM", headline: "Tomra inngår samarbeid om pantesystem i Spania", category: "pressemelding" },
    { id: "n12", time: "11:40", ticker: "FRO", headline: "Frontline – Ekstraordinær generalforsamling avholdt", category: "borsmelding" },
];

export interface WatchlistItem extends Stock {
    last: number;
    changePct: number;
    /** Shares owned; undefined when the instrument is only watched. */
    quantity?: number;
    /** Return since purchase in percent; undefined when not owned. */
    totalPct?: number;
}

export const watchlists: { id: string; label: string }[] = [
    { id: "hoved", label: "Hovedliste" },
    { id: "utbytte", label: "Utbytteaksjer" },
    { id: "shipping", label: "Shipping" },
];

export const watchlistItems: WatchlistItem[] = [
    { name: "Equinor", ticker: "EQNR", last: 248.35, changePct: -1.46, quantity: 120, totalPct: 8.42 },
    { name: "DNB Bank", ticker: "DNB", last: 268.4, changePct: 1.92, quantity: 80, totalPct: 21.6 },
    { name: "Kongsberg Gruppen", ticker: "KOG", last: 312.4, changePct: 6.12, quantity: 40, totalPct: 64.1 },
    { name: "Mowi", ticker: "MOWI", last: 191.8, changePct: -2.45, quantity: 60, totalPct: -4.8 },
    { name: "Nordic Semiconductor", ticker: "NOD", last: 148.9, changePct: 4.87 },
    { name: "Hafnia", ticker: "HAFNI", last: 61.24, changePct: 3.95 },
];

export const sectors: { id: string; name: string; changePct: number }[] = [
    { id: "telekom", name: "Telekom", changePct: -0.94 },
    { id: "industri", name: "Industri", changePct: 2.68 },
    { id: "teknologi", name: "Teknologi", changePct: 1.85 },
    { id: "energi", name: "Energi", changePct: 0.42 },
    { id: "finans", name: "Finans", changePct: 1.12 },
    { id: "sjomat", name: "Sjømat", changePct: -1.94 },
    { id: "eiendom", name: "Eiendom", changePct: -0.36 },
    { id: "helse", name: "Helse", changePct: 0.08 },
    { id: "forbruk", name: "Forbruksvarer", changePct: -0.61 },
    { id: "materialer", name: "Materialer", changePct: 0.73 },
];

export const dividends: (Stock & { amount: string; date: string })[] = [
    { name: "Equinor", ticker: "EQNR", amount: "0,37 USD", date: "12. nov." },
    { name: "Hafnia", ticker: "HAFNI", amount: "0,18 USD", date: "14. nov." },
    { name: "Frontline", ticker: "FRO", amount: "0,62 USD", date: "18. nov." },
    { name: "Wilh. Wilhelmsen", ticker: "WWI", amount: "8,00 NOK", date: "20. nov." },
    { name: "Aker BP", ticker: "AKRBP", amount: "0,63 USD", date: "25. nov." },
    { name: "Vår Energi", ticker: "VAR", amount: "0,30 USD", date: "26. nov." },
    { name: "Mowi", ticker: "MOWI", amount: "1,70 NOK", date: "2. des." },
];

export const calendarEvents: (Stock & { id: string; type: string; date: string; hasFile: boolean })[] = [
    { id: "c1", name: "Telenor", ticker: "TEL", type: "Kvartalsrapport", date: "28. okt. 2026", hasFile: true },
    { id: "c2", name: "Equinor", ticker: "EQNR", type: "Kvartalsrapport", date: "29. okt. 2026", hasFile: false },
    { id: "c3", name: "Yara International", ticker: "YAR", type: "Kvartalsrapport", date: "29. okt. 2026", hasFile: false },
    { id: "c4", name: "Storebrand", ticker: "STB", type: "Kvartalsrapport", date: "30. okt. 2026", hasFile: false },
    { id: "c5", name: "Frontline", ticker: "FRO", type: "Generalforsamling", date: "3. nov. 2026", hasFile: false },
    { id: "c6", name: "Mowi", ticker: "MOWI", type: "Kvartalsrapport", date: "4. nov. 2026", hasFile: false },
    { id: "c7", name: "Hafnia", ticker: "HAFNI", type: "Eks. utbytte", date: "14. nov. 2026", hasFile: false },
    { id: "c8", name: "Kitron", ticker: "KIT", type: "Kapitalmarkedsdag", date: "19. nov. 2026", hasFile: false },
];

export const reports: { latest: Report[]; upcoming: Report[] } = {
    latest: [
        { id: "r1", name: "Telenor", ticker: "TEL", date: "28. okt. 2026", type: "Kvartalsrapport", hasFile: true },
        { id: "r2", name: "Hexagon Purus", ticker: "HPUR", date: "28. okt. 2026", type: "Kvartalsrapport", hasFile: true },
        { id: "r3", name: "Orkla", ticker: "ORK", date: "27. okt. 2026", type: "Kvartalsrapport", hasFile: true },
        { id: "r4", name: "Aker BP", ticker: "AKRBP", date: "27. okt. 2026", type: "Kvartalsrapport", hasFile: false },
        { id: "r5", name: "Kongsberg Gruppen", ticker: "KOG", date: "23. okt. 2026", type: "Kvartalsrapport", hasFile: true },
        { id: "r6", name: "Tomra Systems", ticker: "TOM", date: "22. okt. 2026", type: "Kvartalsrapport", hasFile: true },
        { id: "r7", name: "Nel", ticker: "NEL", date: "21. okt. 2026", type: "Kvartalsrapport", hasFile: true },
    ],
    upcoming: [
        { id: "r8", name: "Equinor", ticker: "EQNR", date: "29. okt. 2026", type: "Kvartalsrapport", hasFile: false },
        { id: "r9", name: "Yara International", ticker: "YAR", date: "29. okt. 2026", type: "Kvartalsrapport", hasFile: false },
        { id: "r10", name: "Storebrand", ticker: "STB", date: "30. okt. 2026", type: "Kvartalsrapport", hasFile: false },
        { id: "r11", name: "Mowi", ticker: "MOWI", date: "4. nov. 2026", type: "Kvartalsrapport", hasFile: false },
    ],
};

export interface Report extends Stock {
    id: string;
    date: string;
    type: string;
    hasFile: boolean;
}

export interface EarningsCall extends Stock {
    id: string;
    date: string;
    time: string;
    quarter: string;
    isLive?: boolean;
}

export const earningsCalls: { latest: EarningsCall[]; upcoming: EarningsCall[]; live: EarningsCall[] } = {
    latest: [
        { id: "e1", name: "Telenor", ticker: "TEL", date: "28. okt. 2026", time: "08:00", quarter: "3. kv. 2026" },
        { id: "e2", name: "Orkla", ticker: "ORK", date: "27. okt. 2026", time: "08:30", quarter: "3. kv. 2026" },
        { id: "e3", name: "Aker BP", ticker: "AKRBP", date: "27. okt. 2026", time: "08:00", quarter: "3. kv. 2026" },
        { id: "e4", name: "Kongsberg Gruppen", ticker: "KOG", date: "23. okt. 2026", time: "08:00", quarter: "3. kv. 2026" },
        { id: "e5", name: "Tomra Systems", ticker: "TOM", date: "22. okt. 2026", time: "09:00", quarter: "3. kv. 2026" },
    ],
    upcoming: [
        { id: "e6", name: "Equinor", ticker: "EQNR", date: "29. okt. 2026", time: "10:00", quarter: "3. kv. 2026" },
        { id: "e7", name: "Yara International", ticker: "YAR", date: "29. okt. 2026", time: "09:00", quarter: "3. kv. 2026" },
        { id: "e8", name: "Storebrand", ticker: "STB", date: "30. okt. 2026", time: "08:00", quarter: "3. kv. 2026" },
    ],
    live: [{ id: "e9", name: "Hexagon Purus", ticker: "HPUR", date: "28. okt. 2026", time: "14:00", quarter: "3. kv. 2026", isLive: true }],
};

export interface Presentation extends Stock {
    id: string;
    title: string;
    date: string;
}

export const presentations: { latest: Presentation[]; upcoming: Presentation[] } = {
    latest: [
        { id: "p1", name: "Telenor", ticker: "TEL", title: "Telenor webcast 3. kv. 2026", date: "28. okt. 2026" },
        { id: "p2", name: "Orkla", ticker: "ORK", title: "Orkla webcast 3. kv. 2026", date: "27. okt. 2026" },
        { id: "p3", name: "Kongsberg Gruppen", ticker: "KOG", title: "Kongsberg Gruppen webcast 3. kv. 2026", date: "23. okt. 2026" },
        { id: "p4", name: "Tomra Systems", ticker: "TOM", title: "Tomra webcast 3. kv. 2026", date: "22. okt. 2026" },
        { id: "p5", name: "Nel", ticker: "NEL", title: "Nel webcast 3. kv. 2026", date: "21. okt. 2026" },
    ],
    upcoming: [],
};
