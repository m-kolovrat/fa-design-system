# Ground truth: Pluss article

URL: https://www.finansavisen.no/shipping/2026/10/27/8390747/andreas-wold-hofstad-shorter-shippingaksje-for-25-millioner
The structured data has `isAccessibleForFree: false`, so this is Pluss/paywalled. Captured 2026-10-27, logged in as a subscriber, 1280×900, non-essential cookies declined.
Screenshot: [02-pluss-artikkel.png](02-pluss-artikkel.png). It is stitched and covers the article plus the first ~6 screens of the endless "more stories" feed. The feed keeps loading, so the capture stops there and the footer is not shown.

## Sections in order

1. **Ticker strip, header and nav**, identical to the front page.
2. **House ad (in content column):** a Finansavisen blue panel, "Norges ledende bedrifter leser Fa / Gi dine ansatte det samme – med ett bedriftsabonnement", a white "Kom i gang →" pill, the italic footnote "*Nye bedriftskunder får første måned gratis", and four small illustrated feature tiles (Alt innhold, Alle tjenester, Skreddersydde nyhetsbrev, Én faktura). It has an AdChoices mark. A subscriber is being shown an ad for a business subscription.
3. **Article head:** the kicker "Andreas Wold Hofstad (31):" in bold (smaller); the headline "Shorter shippingaksje for 25 millioner" in a heavy sans at ~48 px; the ingress in grey at ~20 px.
4. **Tag/entity row** (small pills): "⚓ Shipping" (section), a person pill with an avatar ("Andreas Wold Hofstad"), and stock pills showing a logo, ticker, price and % change in red or green ("B BRUT · 57,00 −1,04%", "I INSW.US · 113,70 +2,64%").
5. **Meta row:** "Publisert 11:39" on the left. On the right is a blue "☆ Legg til MittFa" pill.
6. **Lead image** (full column width) with the caption below: "PÅ SHORTSIDEN: Andreas Hofstad har …". The caption is truncated with "… Mer" to expand it.
7. **Byline row:** round photo, "Eivind Aakre", "Journalist". On the right are a "Tips meg" pill and round icon buttons for copy link, Facebook, X and LinkedIn.
8. **Body text** (narrower column, ~16 px sans): paragraphs, bold subheadings ("Shorter for 25 mill.", "Skillet går ved 10.000 aksjer.", the quote-heading «Ikke opplevd før»), and a bold lead-in sentence.
9. **In-article ad slot:** a tiny "ADVERTISEMENT" label above ~250 px of empty space, in the middle of the body.
10. **Inline stock widget (Bruton):** a light grey rounded box with a round logo, name, price 57,00, change "−0,59 (−1,04%)" in red, a "Vis profil ↗" pill, a "● Live 27. Okt 14:09 Euronext Growth Oslo – NOK" status line, a blue line chart with a right-hand price axis and date labels, and a period row (1D, 5D [selected, blue pill], 1M, 3M, 6M, YTD, 1Y, 5Y) with the return for each period coloured below. A small Finansavisen watermark sits bottom right.
11. More body, then a second **stock widget (International Seaways)** with a "Marked Stengt" grey dot status. It uses the same pattern.
12. **"Les også" inline teaser:** a light rounded box with a thumbnail on the left, the grey label "Les også", a bold title and a 2-line summary.
13. Rest of the body, ending with "Hofstad har ikke ønsket å kommentere saken."
14. **Investor profile box:** a light grey rounded box. On the left are a big round photo, the name and a "Se profil ↗" pill. On the right is a stat grid: Beholdning (NOK) ⓘ 22,06 M (large); Aksjer i porteføljen 6; Største investering ● LUMI; Verdi kjøpt (12M) 41,39 M; Verdi solgt (12M) −25,31 M; Finansavisen watermark.
15. **"Legg til MittFa [NY]" box:** subtitle "Lag din egen nyhetsfeed", a "★ MittFa ↗" pill, and follow chips with avatars or logos and a star for the person, the two stocks, the section and the journalist.
16. **"✦ Informasjon om bruk av AI"** grey pill (expands a disclosure).
17. **Comments:** a blue rule, "Kommentarer (0) ↗", a blue "+ Ny kommentar" button, and a "Siste ⌄" sort dropdown. The empty state is a chat-bubble icon tile, "Ingen kommentarer ennå" and "Bli den første til å kommentere denne artikkelen".
18. **Endless story feed:** front-page-style teaser grid on a grey background inside a white frame (Børsintervjuet, Kapital, Børsbjellen and Populært pills, opinion teasers in italic serif). It keeps loading on scroll.
19. Footer (same as the front page). It is only reachable when the feed stops.

## Design debt and inconsistencies

- Paying subscribers are shown a house ad for a business subscription before the headline.
- The in-article ad label says "ADVERTISEMENT" in English while everything else is Norwegian ("Annonse" elsewhere). The slot leaves a large blank when empty.
- Three content widths: header/ad, image/head, and a narrower body. The left edges don't line up.
- MittFa follow appears twice (the pill at the top and the box at the bottom). The NY badge style differs from the nav NY badge.
- Pill styles differ across tag row, follow chips, "Tips meg", "Vis profil", "Se profil" and "Legg til MittFa". Some are filled blue, some outlined and some grey.
- Stock widgets show both "Live" (red dot) and "Marked Stengt" (grey dot) states. The selected period is a pale blue pill, but returns use red/green text with "-" for missing data.
- The feed below the article reuses front-page teasers, so the same stories reappear. Infinite load makes the footer unreachable.
- The caption is truncated with "Mer" even at desktop width.
