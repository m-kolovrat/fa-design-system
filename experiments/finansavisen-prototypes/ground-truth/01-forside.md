# Ground truth: Forside — https://www.finansavisen.no/

Captured 2026-10-27, logged in (subscriber "ND"), desktop viewport 1280×900. Non-essential cookies were declined, so ad slots are empty.
Screenshot: [01-forside.png](01-forside.png). It was stitched from scrolled viewport captures. Fixed and sticky elements are hidden after the first frame, so the header appears only at the top.

## Sections in order

1. **Market ticker strip.** A thin, dark, horizontally scrolling line: Brent Spot 114,93 −0,20 %, Nikkei 225 63 268,37 +1,73 %, Oslo Børs 2 126,86 +0,09 %, Bitcoin 80 278 +0,34 %, Euro 10,40 −0,21 %, Gull 4 023,93 +0,17 %, Dollar 9,32 0,00 %, SEK 0,94 +0,19 %, US 10 ÅR 4,99 0,00 %. Each item has a green up or red down triangle. The whole set is repeated three times in the DOM to make the loop seamless.
2. **Header (Finansavisen blue).** The wordmark sits on the left. In the centre is a pill search field, "Søk på ticker eller spør Investorchat", with an AI sparkle icon. On the right are a purple circle with the user's initials ("ND") and "Meny" with a hamburger icon. Logged out, these are a "Logg inn" button and a white "Kjøp" pill.
3. **Primary nav row** (centred text links in three groups with thin dividers): Siste nytt, MittFa | Forum, Børs, Investorchat [red "NY" badge], Watchlist, Bjellesauer, Aksjer, Valuta | 400 Rikeste [NY], Video.
4. **Top ad slot.** About 200 px of empty grey reserved space.
5. **App promo strip** (dark navy, full content width): Fa logo tile, "Nikola, last ned appen og få varsel når noe skjer", "Nyheter, kurser og markedsdata", white "Last ned →" pill. It is personalised with the first name when logged in.
6. **Live market headline** (white strip): "Rally i rigg og oljemygg – full kollaps i sjømat" with a dark grey "Børsoppdatering" pill and a small blue "+" (follow) square.
7. **Front-page news grid**, the main body. Rows pair one wide teaser with a stack of two narrow teasers on the right, sometimes mirrored, sometimes with a narrow column on the left.
    - A teaser is an image, an optional kicker line in regular weight ("Fredrik Dyve forhandlet i måneder:"), then a very heavy headline. Line sizes are set per line, so one headline can mix 90 px and 40 px lines ("– Vi har krevd / en del ting").
    - Pills sit on the image: "Siste" (red clock outline), "Mye lest" (blue star), "Populært" (orange flame), "Kapital" (dark), "MOTOR" (black), "Annonse" (white), "Børsoppdatering" (dark grey).
    - Some teasers are inverted (white text on Finansavisen blue). These are usually the "Populært" ones.
    - Opinion teasers show a round columnist photo plus a blue quote badge, the author name in italic serif ("Trygve Hegnar"), and a large italic serif headline ("Norway sucks", "Vedum bedre enn Stoltenberg?").
    - Sponsored teasers ("Annonse": "Knut lager date night…", "Først i Skandinavia: Nå kan du chatte med regnskapet") use the same frame and typography as editorial ones.
8. **Mest lest** (dark rounded panel, horizontal slider): a "Mest lest" label, prev/next arrows, 4 visible items (thumbnail plus 2–4 line title) and segmented progress bars below. There are about 20 items in total.
9. More grid rows with ~250 px empty ad gaps between groups. This repeats roughly every 2–3 rows down the page.
10. **Video block (Økonomi Nyhetene):** an embedded player with a play button and duration "14:53 · 26/10/2026". To its right is a dark playlist of 5 items, each a thumbnail, a truncated title ("Norsk konsernsjef …") and a date. The caption below the player is cut off mid-sentence ("Norsk konsernsjef i Sverige: – Et").
11. **Børsmorgen video teasers** (play icon in the image corner), and "Dagens forside" (the eAvis front page shown as an image).
12. **Karriere** (light blue rounded panel, horizontal slider): Fa logo, "Karriere", grey "Annonsørinnhold", white pills "Kjøp stillingsannonse" and "Vis alle stillinger", prev/next arrows. Each job shows a white logo tile, location ("Oslo"), job title and employer (Norion Bank, Nordic Trustee, ABG Sundal Collier, Hegnar Media…). There are about 20 jobs, with progress bars.
13. More grid, with mixed politics, markets and opinion teasers.
14. **Kapital slider** (dark panel, orange "Kapital" wordmark, orange arrows): same shape as Mest lest. Its items are cloned in the DOM (the first story appears 3×).
15. More grid.
16. **MOTOR slider** (dark panel, white "MOTOR" logotype): car news items.
17. Final grid rows, ending with "Vraker to aksjer: DNB Carnegie anbefaler ni aksjer" and "Seks på rad: Uventet utvikling i Tyskland".
18. **Footer** (Finansavisen blue): wordmark; publisher block (Hegnar Media AS, address, CEO and editor, "Grunnlagt i 1992", ©2026); white "Kontakt oss" pill; round social icons (X, Facebook, Instagram, TikTok, LinkedIn); two link columns (eAvis, Annonse, Arkiv, Event, Bedriftsabonnement / Personvernerklæring, Vilkår, Cookies, Samtykkeinnstillinger); an app box ("Bruk Finansavisen-appen", App Store and Google Play badges); a data credit line (Millistream, Nikkei, TradingView).

**Logged-out at ~1024 px only:** a right rail appears with "Lag din egen watchlist – helt gratis" plus "Opprett bruker", "Siste fra aksjeforumet" (ticker logo, ticker, thread title, time, "Vis mer ↗"), and a dark "Markedsnytt" panel with Nyheter / Børsmeldinger toggle pills and timestamped wire items (Finansavisen, TDN). The logged-in 1280 px capture had no right rail.

## Design debt and inconsistencies

- Empty ad slots keep their full height, leaving ~10 large grey gaps down the page.
- At 1280 px the content column is off-centre. The space to the right is reserved for a rail or skyscraper that never renders.
- Headline type is set per line at arbitrary sizes. Weight and size don't come from a type scale.
- At least seven label pill styles, each with its own colour, icon and outline treatment, and no shared system.
- Four slider modules (Mest lest, Kapital, Motor, Karriere) each have their own colours, arrow styles and header treatment, with the same progress-bar mechanic.
- Sponsored teasers are hard to tell apart from editorial; only a small "Annonse" pill marks them.
- Text is truncated in the video playlist and the caption under the player is clipped.
- The DOM has duplicate content: ticker ×3, cloned slider items. Screen readers will hear these repeats.
- The same story appears in several places (for example "Norway sucks" in Mest lest and in the grid; "Timedronning i Fornebubanen" twice).
- Two "NY" badges in the nav compete with the red "Siste" pills.
