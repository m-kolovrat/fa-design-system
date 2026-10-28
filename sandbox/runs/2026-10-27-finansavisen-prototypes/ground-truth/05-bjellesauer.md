# Ground truth: Bjellesauer — https://www.finansavisen.no/bjellesauer

Captured 2026-10-27, logged in, 1280×900, non-essential cookies declined.
Screenshot: [05-bjellesauer.png](05-bjellesauer.png). It is stitched from overlapping frames so the sticky header doesn't hide any rows. The default "Siste handler" view is shown; the "Alle investorer" and "Vinnere og tapere" views were not captured.

## Sections in order

1. **Header and nav.** "Bjellesauer" is highlighted. No ticker strip. On scroll the header **condenses** into a compact bar: a white "Fa" monogram on the left, the nav links centred, and only a hamburger on the right. The search and avatar disappear.
2. **Breadcrumb:** "Bjellesauer › Siste handler" (grey, small).
3. **Intro block:** a round black sheep-bell illustration icon; the bold title "Bjellesauenes aksjehandler – trykk på en investor for å se portefølje"; a ~3-line grey explanation (newsletter link in blue, nightly update ~23:00, T+2 registration, VWAP pricing); a blue "Les mer" link.
4. **View switch:** text tabs "Siste handler" (active, blue underline), "Alle investorer", "Vinnere og tapere". On the right is a "⤓ Last ned" outline pill (download).
5. **Filter bar:**
    - "Aksje ⌄" and "Investor ⌄" dropdown pills.
    - A date-range pill "‹ 📅 Oct 22, 2026 – Oct 22, 2026 ›" with prev/next arrows.
    - Period chips 1D (selected, pale blue), 1U, 1M, 3M, 6M, YTD, 1Y, 3Y, ALLE.
    - Right-aligned: "Siste data mottatt: 26.10.2026".
6. **Trades table** (55 rows, 100 per page):
    - Columns: INVESTOR (frozen/sticky first column with a round photo and name, truncated with "…" for long names such as "Tom Hagen/Fredrik Dayl…"), AKSJE (blue ticker pill + company name), ENDRING I AKSJER (green "+400.000" / red "−100.000"), REL. ENDRING (coloured %), ▼ TRANSAKSJONSVERDI (sorted desc, "67,88 M"), NY EIERANDEL ("1,00109%"), NY BEHOLDNING, UTFØRT AV (holding company), DATO.
    - The last two columns are cut off at 1280 px and need horizontal scrolling inside the panel.
    - Rows are separated by thin rules. Row height is ~40 px.
7. **Pagination row:** "Rader per side [100 ⌄]", "Viser 1–55 av 55", and ‹ [1] › on the right.
8. **Disclaimer paragraph:** small grey text explaining the inclusion thresholds (≥0,01 % or >100 000 kr), T+2 and caveats.
9. Footer (standard).

## Design debt and inconsistencies

- The date-range label is in English US format ("Oct 22, 2026") while the rest of the page uses "22.10.2026" and Norwegian labels.
- The period chip set (1D, 1U, 1M, 3M, 6M, YTD, 1Y, 3Y, ALLE) mixes Norwegian (U = uke, ALLE) and English (YTD, 1Y). Other pages use 5D/MAKS/5Y instead.
- Column headers are duplicated in the DOM (title-case and uppercase versions). The source has a typo: "Ny beholding".
- The table overflows horizontally on desktop, and long investor names are truncated.
- Number formatting mixes "0,00 M" values with "0%" (no decimals). A full exit shows "0" holding and "−100%".
- The header changes shape on scroll. No other captured page does this.
- The page's own icon tile style (black round illustration) is not used anywhere else.
