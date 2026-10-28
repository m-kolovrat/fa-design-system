# Ground truth: Børs — https://www.finansavisen.no/bors

Captured 2026-10-27 ~14:10, logged in, 1280×900, non-essential cookies declined.
Screenshot: [03-bors.png](03-bors.png) (stitched; fixed and sticky elements hidden after the first frame).
This page uses the **full-width** layout: white rounded panels on a light grey page, about 1210 px wide. The front page and articles use a ~980 px column instead.

## Sections in order

1. **Header and nav.** Same as the front page, but there is no market ticker strip on this page. "Børs" is highlighted as a filled light-blue pill in the nav.
2. **Real-time notice bar:** a red dot and "FA Investor- og ordinære abonnenter har tilgang til sanntidsdata". On the right is "Slå på sanntidsdata fra Oslo Børs" with a toggle switch (off).
3. **Market overview panel:**
    - Title "Norge". Round flag buttons on the right (NO selected with a ring, SE, DK, US).
    - A row with a magnifier icon button on the left, and on the right a watchlist dropdown "Main Watc… ⌄" (truncated) plus ‹ › arrow buttons.
    - The selected instrument name "Hovedindeksen Oslo Børs", price "2.124,29" and change "−0,76 (−0,04%)" in red, then "● Live 27. okt 14:10".
    - "+" (add) and fullscreen icon buttons on the right.
    - A green line chart (5D) with a right-hand price axis and time labels.
    - Period chips: 1D −0,04%, 5D +1,65% (selected, pale blue pill), 6M +6,93%, 1Y +29,00%, 5Y +75,29%. Each period's return is coloured.
    - An instrument list with columns NAVN / SISTE / %: Hovedindeksen Oslo Børs (highlighted row, blue text), OBX, Dow Jones/100, S&P 500, NASDAQ Comp, Brent Spot, Gull, EURNOK, USDNOK, GBPNOK, CHFNOK, Bitcoin, US 10Y Bond, VIX. Clicking a row switches the chart.
    - A "Marked [4] ⌄" pill that expands more markets.
4. **Vinnere | Tapere**, two panels side by side. Each has a header with an icon tile (green chart / red chart) and a "›" link, columns AKSJE / SISTE / %, and ~18 rows each (Techstep 1,850 +15,62% … ; Proximar Seafood 0,0466 −89,19% …).
5. **Live TV embed (Børsmorgen):** a 16:9 broadcast stream with a muted icon. The broadcast graphics include its own "Bjellesauene på Oslo Børs – Dagens vinnere" overlay, currency boxes and a "SISTE" news crawl.
6. **Main Watchlist panel** (the user's): a "Main Watchlist ⌄" title with pencil and ↗ icon buttons. Below are Porteføljeverdi (NOK) in large type with an eye toggle (hide values) and the day change in green. Columns: NAVN (logo + name + ticker) / SISTE / VERDI (NOK) / +/- (NOK) / % / TOTAL %. Instruments without holdings show "-".
7. **Børsnyheter panel:** the title with a timestamp "27. okt 14:10". Filter pills: Alle (selected), FA, TDN, Børsmeldinger, Pressemeldinger, Min watchlist. Each item is a time, a blue ticker pill (HKY, SCATC, BRUT) where relevant, and a headline. Items are separated by thin rules. Duplicates appear in Norwegian and English.
8. **Mest omsatte ›:** columns AKSJE / TICKER (blue pill) / OMSETNING (479,9 M) / SISTE / +/- / %.
9. **🔥 Hot stocks – uvanlig omsetning:** columns AKSJE / TICKER / OMS. RATIO (+8011,34%) / SISTE / +/- / %.
10. **Empty ad panel:** a white panel ~470 px tall with nothing in it.
11. **Mest shortet ⓘ:** columns AKSJE / TICKER / ANDEL / VERDI / DAYS-TO-COVER (Golar Lng 9,97 % 4,65 mrd 2,38 M).
12. **Nyeste all-time high:** AKSJE / TICKER / KURS / DATO / 1Y.
13. **Nyeste all-time low:** same columns as all-time high.
14. **House ad** in a panel: the "Norges ledende bedrifter leser Fa" business-subscription ad, at 300×250-style size.
15. **Års- og kvartalsrapporter:** underline toggle Siste / Kommende. Each row has a company logo, name, "27.10.2026 • Delårsrapport" and a download icon.
16. **Earnings calls** ("Levert av Quartr" logo): Siste / Kommende / Live. Each row has a logo, company, date • duration • "Q3 2026 (Q&A)" and a ▶ play icon.
17. **Kvartalpresentasjoner** ("Hegnar Media Videoproduksjon" wordmark): Siste / Kommende. Each row has a logo, "Elopak Webcast Q3 2026", the date and ▶.
18. **Sektorer:** a sortable list (NAVN ▾, ▲ %) of OBX sector indices with % change.
19. **Kommende utbytter:** SELSKAP / TICKER / ANTALL (amount per share) / DATO.
20. **📅 Finanskalender ›:** SELSKAP / TICKER / TYPE (Delårsrapport) / DATO, with a download icon. The icon is blue for today and grey for future dates.
21. Footer (standard).

## Design debt and inconsistencies

- The column header label is "ANTALL" for the dividend amount, which is the wrong term (it should be beløp/utbytte per aksje).
- Number formats are mixed: "479,9 M", "4,65 mrd", "908,71 M", and DAYS-TO-COVER shown as "2,38 M". English and Norwegian column headers are mixed too (DAYS-TO-COVER, OMS. RATIO).
- Ticker pills appear in some lists but not in Vinnere/Tapere. Logos appear in Watchlist and reports but not in the market lists.
- Section headers are inconsistent: some have icon tiles (Vinnere, Tapere, Hot stocks, Finanskalender), some have "›" links, some an ⓘ, and the rest plain text.
- Three toggle styles: underline tabs (reports), filled pills (news filters, period chips) and round flag buttons.
- An empty ad panel keeps ~470 px of white space. A house ad for a business subscription is shown to a subscriber.
- The watchlist dropdown label is truncated ("Main Watc…") although there is plenty of room.
- The news feed shows the same Havila notice four times (NO and EN, twice each).
- The live TV stream draws its own market numbers that disagree with the page (for example Bitcoin 79 472 on TV vs 80 047 in the list).
- No ticker strip here, unlike the other pages.
