/** Invented data for the Bjellesauer page. Investors and holding companies are fictional; tickers are Oslo Børs. */

export interface Investor {
    id: string;
    name: string;
}

export interface Instrument {
    ticker: string;
    name: string;
}

export interface Trade {
    id: string;
    investorId: string;
    /** The legal entity that traded: a holding company or the person. */
    entity: string;
    ticker: string;
    /** Estimated trade date, ISO. */
    date: string;
    shareChange: number;
    /** Change relative to the previous holding, in percent (100 = new position, −100 = full exit). */
    relChange: number;
    /** NOK value of the trade (|shareChange| × VWAP). */
    value: number;
    /** Stake after the trade, in percent of shares outstanding. */
    newOwnership: number;
    newHolding: number;
}

export const investors: Investor[] = [
    { id: "fjellheim", name: "Kristian Fjellheim" },
    { id: "aasland", name: "Ingrid Aasland" },
    { id: "ravnaas", name: "Torbjørn Ravnås" },
    { id: "solvberg", name: "Marit Sølvberg" },
    { id: "brekkestad", name: "Henrik Brekkestad" },
    { id: "lunde-holm", name: "Sigrid Lunde Holm" },
    { id: "kvalvik", name: "Øystein Kvalvik" },
    { id: "myrvold", name: "Anders Myrvold" },
    { id: "tveit", name: "Live Tveit Haraldsen" },
    { id: "strand", name: "Jon Erik Strand" },
];

export const instruments: Instrument[] = [
    { ticker: "EQNR", name: "Equinor" },
    { ticker: "DNB", name: "DNB Bank" },
    { ticker: "KOG", name: "Kongsberg Gruppen" },
    { ticker: "NHY", name: "Norsk Hydro" },
    { ticker: "MOWI", name: "Mowi" },
    { ticker: "AKRBP", name: "Aker BP" },
    { ticker: "NOD", name: "Nordic Semiconductor" },
    { ticker: "FRO", name: "Frontline" },
    { ticker: "HAFNI", name: "Hafnia" },
    { ticker: "ORK", name: "Orkla" },
    { ticker: "TEL", name: "Telenor" },
    { ticker: "SALM", name: "SalMar" },
    { ticker: "TOM", name: "Tomra Systems" },
    { ticker: "VAR", name: "Vår Energi" },
];

type Row = [
    investorId: string,
    entity: string,
    ticker: string,
    date: string,
    shareChange: number,
    relChange: number,
    value: number,
    newOwnership: number,
    newHolding: number,
];

const rows: Row[] = [
    ["fjellheim", "FJELLHEIM INVEST AS", "FRO", "2026-10-23", 1_256_050, 0.83, 14_040_000, 14.4433, 152_411_575],
    ["aasland", "AASLAND HOLDING AS", "KOG", "2026-10-23", 25_000, 100, 10_315_000, 0.1406, 25_000],
    ["ravnaas", "RAVNÅS KAPITAL AS", "HAFNI", "2026-10-23", -480_000, -100, 29_395_200, 0, 0],
    ["solvberg", "SØLVBERG EIENDOM OG INVEST AS", "MOWI", "2026-10-23", 60_000, 12.5, 11_820_000, 0.1043, 540_000],
    ["brekkestad", "Henrik Brekkestad", "NOD", "2026-10-23", 15_400, 4.21, 2_293_060, 0.1987, 381_200],
    ["lunde-holm", "LUNDE HOLM AS", "EQNR", "2026-10-23", -32_000, -6.4, 8_752_000, 0.0168, 468_000],
    ["kvalvik", "KVALVIK SHIPPING LTD", "FRO", "2026-10-23", 300_000, 18.75, 3_354_000, 0.8526, 1_900_000],
    ["myrvold", "MYRVOLD INDUSTRI AS", "TOM", "2026-10-23", 120_000, 100, 16_644_000, 0.0405, 120_000],
    ["fjellheim", "FJELLHEIM MARITIME LTD", "HAFNI", "2026-10-23", 2_400_000, 3.2, 146_976_000, 15.2214, 77_400_000],
    ["tveit", "TVEIT HARALDSEN AS", "ORK", "2026-10-23", 85_000, 9.04, 9_052_500, 0.1025, 1_025_000],
    ["strand", "STRAND CAPITAL AS", "AKRBP", "2026-10-23", -14_000, -35, 3_570_000, 0.0041, 26_000],
    ["aasland", "Ingrid Aasland", "DNB", "2026-10-23", 5_000, 25, 1_212_500, 0.0016, 25_000],
    ["ravnaas", "RAVNÅS KAPITAL AS", "VAR", "2026-10-23", 400_000, 66.67, 13_880_000, 0.04, 1_000_000],
    ["brekkestad", "BREKKESTAD TEKNOLOGI AS", "NOD", "2026-10-23", -2_000, -0.91, 297_800, 0.1134, 218_000],
    ["kvalvik", "KVALVIK SHIPPING LTD", "HAFNI", "2026-10-22", 150_000, 2.73, 9_180_000, 1.1006, 5_650_000],
    ["solvberg", "SØLVBERG EIENDOM OG INVEST AS", "SALM", "2026-10-22", -4_500, -100, 2_664_000, 0, 0],
    ["myrvold", "MYRVOLD INDUSTRI AS", "NHY", "2026-10-22", 250_000, 50, 17_125_000, 0.0377, 750_000],
    ["lunde-holm", "LUNDE HOLM AS", "TEL", "2026-10-22", 40_000, 8.33, 5_232_000, 0.0377, 520_000],
    ["fjellheim", "FJELLHEIM INVEST AS", "FRO", "2026-10-21", 500_000, 0.33, 5_510_000, 14.36, 151_155_525],
    ["strand", "STRAND CAPITAL AS", "KOG", "2026-10-21", 3_000, 7.5, 1_236_000, 0.0244, 43_000],
    ["tveit", "TVEIT HARALDSEN AS", "EQNR", "2026-10-21", 20_000, 100, 5_470_000, 0.0007, 20_000],
    ["aasland", "AASLAND HOLDING AS", "MOWI", "2026-10-19", -10_000, -20, 1_968_000, 0.0077, 40_000],
    ["ravnaas", "Torbjørn Ravnås", "TOM", "2026-10-19", 7_500, 15, 1_039_500, 0.0195, 57_500],
    ["kvalvik", "KVALVIK SHIPPING LTD", "FRO", "2026-10-14", -200_000, -9.52, 2_190_000, 0.8526, 1_900_000],
    ["myrvold", "MYRVOLD INDUSTRI AS", "ORK", "2026-10-14", 60_000, 100, 6_336_000, 0.006, 60_000],
    ["brekkestad", "BREKKESTAD TEKNOLOGI AS", "NOD", "2026-10-14", 30_000, 15.96, 4_410_000, 0.1139, 220_000],
    ["solvberg", "SØLVBERG EIENDOM OG INVEST AS", "DNB", "2026-10-06", 12_000, 100, 2_874_000, 0.0008, 12_000],
    ["lunde-holm", "LUNDE HOLM AS", "AKRBP", "2026-10-06", -8_000, -100, 2_032_000, 0, 0],
    ["fjellheim", "FJELLHEIM MARITIME LTD", "HAFNI", "2026-09-15", 1_000_000, 1.35, 59_800_000, 14.7494, 75_000_000],
    ["strand", "STRAND CAPITAL AS", "VAR", "2026-09-15", 100_000, 100, 3_520_000, 0.004, 100_000],
    ["tveit", "TVEIT HARALDSEN AS", "SALM", "2026-08-20", 2_000, 11.11, 1_150_000, 0.0152, 20_000],
];

export const trades: Trade[] = rows.map(([investorId, entity, ticker, date, shareChange, relChange, value, newOwnership, newHolding], index) => ({
    id: `t${index + 1}`,
    investorId,
    entity,
    ticker,
    date,
    shareChange,
    relChange,
    value,
    newOwnership,
    newHolding,
}));

/** The latest estimated trade date in the data. */
export const LATEST_TRADE_DATE = "2026-10-23";

/** When the shareholder register data last arrived. */
export const LATEST_DATA_RECEIVED = "2026-10-27";
