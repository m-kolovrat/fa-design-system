# Ground truth: Aksjeside Equinor — https://www.finansavisen.no/ticker/EQNR/markedsdata

Captured 2026-10-27 ~14:12, logged in, 1280×900, non-essential cookies declined.
Screenshot: [04-aksje-equinor.png](04-aksje-equinor.png). It is stitched. The sticky price bar ("Equinor (EQNR) 444,30 −6,60 (−1,46%)" + "Lagt til i 1 watchlister") attaches itself on scroll and so shows in every frame after the first. That is how it behaves on the site.
Most widgets render in shadow DOM or iframes, so the page's text could not be read out. This description is taken from the screenshots.

## Sections in order

1. Header and nav (standard). No ticker strip.
2. **Real-time notice bar:** the same as on /bors, with a "Slå på sanntidsdata fra Oslo Børs" toggle.
3. **Quote head (left two-thirds):**
    - "Equinor (EQNR)" in bold, the price "444,30" and the change "−6,60 (−1,46%)" in red, all on one line.
    - On the right, a pale blue pill "👁 Lagt til i 1 watchlister" (watchlist state and action).
    - "● Live 27. okt 14:12 Oslo Børs – NOK".
    - Period chips in two rows: 1D −1,46%, 5D +3,98% (selected), 6M +24,80%, YTD +87,47%, 1Y +82,02%, 5Y +94,95%, MAKS.
    - A green line chart with "+" and fullscreen icons and time labels.
    - A key-figure grid of 3×4 label/value pairs (small grey caps label above a bold value): ÅPNE 448,40, HØY 450,70, P/E 12 MND. 12,59; KJØP 444,30, LAV 440,10, EPS 12 MND. 35,27; SALG 444,40, BØRSVERDI 1,06 B, SISTE RAPPORT 2026-07-22 ↗; VOLUM 1,08 M, OMSETNING 480,77 M, NESTE RAPPORT 2026-10-28.
4. **Video promo (right third):** "Vi besøker Empire: Prosjektet Trump hater" with ‹ › arrows and a video thumbnail labelled "Advertisement: 0:11". It is a sponsored video placed next to the quote.
5. **Sub-navigation** (horizontal text links, the active one underlined in blue): Markedsdata, Forum, Nyheter, Regnskap, Profil, Bjellesauer, Topp 50 aksjonærer, Historikk, Rapporter, Teknisk analyse, Pinpoint, FAQ.
6. **Siste nytt panel** (left, internal scroll with its own scrollbar): the title plus timestamp; filter pills Alle (selected), FA, TDN, Børsmeldinger, Pressemeldinger. Each item has a round source logo (Equinor logo or a "TDN" circle), "08:00 · Børsmelding", a bold title and a 2-line excerpt. Items appear in both Norwegian and English.
7. **Pinpointkonsensus panel** (right): a Pinpoint logo and title; "Investorer forventer inntekter og resultat for **Q3 2026** innen disse intervallene:"; a mini grid KPI, MDUSD / Forventninger / YoY (Salgsinntekter 19–35 ↗, EBIT 12–108,385 ↗); "Antall estimater: 4"; a note; a blue "Se estimater og konsensus" button.
8. **Three-up row:**
    - **Resultat og omsetning:** Årlig / Kvartalsvis toggle pills; a bar chart of blue Inntekter (M) vs yellow Resultat (M) for 2025, 2024, 2023, 2022. The years run newest-first from left to right.
    - **Ordredybde:** a green "Ordinær handel" label; columns ANTALL / KJØP | SALG / ANTALL; 5 levels, each with a horizontal depth bar (green for buy, red for sell); a totals row (6 101 vs 8 121).
    - **Nøkkeltall:** TYPE / VERDI rows: ISIN, Lav-høy 12 mnd., Utbytte 12 mnd., Direkteavkastning 12 mnd., Pris/salg 1Y, Pris/bok 1Y, Avkastning på egenkapital 12 mnd., Eks-dato, Antall aksjer.
9. **Two-up row:**
    - **Anbefalinger** ("Levert av Finwire"): a stacked bar chart per quarter (Selg/Undervekt/Hold/Overvekt/Kjøp in red, orange, yellow, green and dark green). Snittestimat on a 1–5 scale with an orange marker at 3,5. Median kurs is a range slider: Lav 320,00, Snitt 393,53 (tooltip), Nå 444,20 (blue tag), Høy 480,00, with "Oppside 8,06% / Nedside −27,96%". Historikk is a dot timeline Q1'26–Q4'26 (Hold 3,4 … Undervekt 3,5).
    - **Tekniske indikatorer:** NAVN / VERDI / VALG. SMA(20), SMA(50), SMA(200), RSI(14) and MACD(26/12), each with a KJØP (green) or SELG (red) pill. Below is "Omsetning i dag vs. historisk omsetning" with 1 uke, 1 måned, 3 måneders and 1 års snitt (+34,64 % … +41,03 %).
10. **Three-up row:**
    - **Siste handler:** TID / PRIS / ANTALL, live, about 9 rows.
    - **Utbytter:** NOK/AKSJE / DATO.
    - **📅 Finanskalender:** TYPE / DATO with a download icon (blue when a document exists, grey when not).
11. **Three-up row:**
    - **Års- og kvartalsrapporter:** a pink highlighted "Kommende Q3 28.10.2026 • Delårsrapport" item, then past reports with the Equinor logo, period ("Q2 2026-04-01 – 2026-06-30"), date • type, and a download icon.
    - **Earnings calls** (Levert av Quartr): a pink "Kommende Q3 2026 (Media) 28.10.2026 • 09:00" with a "📅 Kalender" button, then past calls with duration and ▶.
    - **Kvartalpresentasjoner** (Hegnar Media Videoproduksjon): an empty state with an illustration and "Ingen treff".
12. Footer (standard).

## Design debt and inconsistencies

- "Børsverdi 1,06 B" uses the English "B". Elsewhere the site says "mrd". Number formats mix "1,08 M", "480,77 M", "2.390.749.040" and "1,600,000" (chart axis with US thousands separators).
- Dates appear as both "2026-07-22" (ISO) and "13. nov 26" on the same page.
- The bar chart orders years newest→oldest left→right, against the usual time-axis convention.
- A sponsored video ("Advertisement" in English) is placed in the most valuable slot next to the price.
- Panels in the same row have different heights, so there are empty gaps (Kvartalpresentasjoner is empty while its neighbours are full).
- The news panel scrolls inside the page (a nested scrollbar).
- Status and label styles differ: KJØP/SELG pills, "Ordinær handel" green text, pink "Kommende" blocks, blue/grey download icons.
- The sub-nav has 12 items with no overflow handling visible; on mobile it must scroll horizontally.
- "Lagt til i 1 watchlister" is ungrammatical for the singular (it should be "1 watchlist").
