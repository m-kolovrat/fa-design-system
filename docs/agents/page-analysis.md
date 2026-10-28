# Finansavisen page analysis

Working notes behind `skills/fa-design-system/references/page-patterns.md` and the content and
style rules in `SKILL.md`. Not shipped as agent instructions; this is the evidence.

**Captured:** 2026-10-23 on finansavisen.no at 1440 px and 390 px wide. Logged out: front page,
Siste nytt, Børs, Aksjer, Rapporter, Forum, and a Kapital opinion article (paywall). Logged in
(1440 px only): MittFA feed, Watchlist, Bjellesauer, and a full news article body.

Measurements come from computed styles in the browser (font size / line height / weight, colors,
radii, container widths). Colors are matched to `styles/theme.css` where they exist.

---

## 1. What the live site is built from

- Several stacks: the front page is a CMS teaser grid (`k5a-*` classes), the market widgets are web
  components (`finansavisen-winners-losers`, `hegnar-market-news`, `hegnar-reports-element`, …,
  some in shadow DOM), the forum is a MUI app. The design system will replace the look of all of
  them, so the analysis records **patterns**, not markup.
- Font: Inter everywhere, plus **Merriweather italic** for opinion headlines and the "Meninger"
  label.
- The article page takes the publication's header: a Kapital article on finansavisen.no shows the
  orange Kapital header (`SiteHeader brand="kapital"`).

## 2. Layout

| Page                                   | Desktop layout                                                 |
| :------------------------------------- | :------------------------------------------------------------- |
| Header                                 | Full bleed brand bar; inner row max 1380 px                    |
| Front page                             | Two columns: 980 px teaser stream + 368 px sidebar, 16 px gap  |
| Siste nytt, Forum, Bjellesauer, MittFA | One white panel, ~980–1100 px, centered                        |
| Børs, Rapporter                        | Grid of white widget cards, 2–3 per row, 16 px gap             |
| Aksjer                                 | Full-width table (no side panel)                               |
| Article                                | One column: 1000 px section, 936 px content; body text ~600 px |

- Page background is light gray (`#F8F9F9` / `#EAECED`), content sits on **white cards with
  16 px radius** (`rounded-2xl`).
- Mobile (390 px): cards go edge to edge with no side gutter on the front page; widget cards keep
  their radius; tables drop columns and stack ticker above company name; the header shows a
  horizontally scrolling shortcut row.

## 3. Recurring patterns

| Pattern             | Where                                                                | What it is                                                                                                                                                                                                        | In the library?                                               |
| :------------------ | :------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| Widget card         | Børs, Rapporter, front page sidebar                                  | White card, 16 px radius. Header: tinted icon tile (green for Vinnere, red for Tapere) + 18/24 semibold title + round chevron link. Body: table or list                                                           | **No.** No `Card` component                                   |
| Filter chips        | Siste nytt, Aksjer, Forum, Rapporter                                 | Pill buttons; selected = light brand fill + brand text; some open a dropdown and show a count badge                                                                                                               | Partly: `ButtonGroup` / `Tags`; no chip with dropdown + count |
| Country chips       | Børs, Aksjer, Rapporter                                              | Chip with a round flag                                                                                                                                                                                            | `Flag` exists; chip doesn't                                   |
| Segmented control   | Forum (Aksjeforum / Kommentarer)                                     | Two options in a gray track                                                                                                                                                                                       | `ButtonGroup` (check Figma style)                             |
| Tabs (underline)    | Aksjer (Kurs / Historikk / Nøkkeltall), Rapporter cards, Bjellesauer | Underline tabs, small                                                                                                                                                                                             | `Tabs`                                                        |
| Data table          | Børs, Aksjer, Forum, Bjellesauer                                     | Dense rows (14/20 regular), header row 12/16 medium **uppercase, 0.4 px tracking**, `#67737E`; sortable headers                                                                                                   | `Table` (density and uppercase header to check)               |
| Ticker badge        | Everywhere tickers appear                                            | Small pill, light brand fill, brand uppercase text (`EQNR`)                                                                                                                                                       | `Badge color="brand"` (verify size)                           |
| Change value        | All market data                                                      | `+1,65 %` green `#14985E`, `-3,53 %` red `#CA2B3D`, plain for 0                                                                                                                                                   | **No.** Number formatting + color is ad hoc                   |
| Period selector     | Børs chart, Watchlist                                                | 1D / 5D / 6M / YTD / 1Y / 5Y, each with its % change under the label; selected = light brand fill                                                                                                                 | **No.** Closest: `ButtonGroup`                                |
| Live indicator      | Børs, Aksjer, Markedsnytt                                            | Red pulsing dot + "Live" + timestamp                                                                                                                                                                              | **No.** (`BadgeWithDot` is close)                             |
| Realtime toggle bar | Børs, Aksjer                                                         | Info line + `Toggle` "Slå på sanntidsdata"                                                                                                                                                                        | `Toggle`                                                      |
| News feed item      | Siste nytt, Børsnyheter, Markedsnytt                                 | Source avatar (round logo), meta line (time · ticker badge · category), bold title, 2-line excerpt, optional thumbnail right                                                                                      | **No**                                                        |
| Company row         | Forum, Rapporter, front page sidebar                                 | Round company logo + ticker/name + meta + trailing action (play, download)                                                                                                                                        | `AvatarLabelGroup` is close                                   |
| Logo stack          | Rapporter (earning calls per day)                                    | Overlapping round company logos                                                                                                                                                                                   | **No** (`AvatarGroup` is a known gap)                         |
| Stat row            | Watchlist header                                                     | Label above a large figure, several side by side inside one card                                                                                                                                                  | **No**                                                        |
| Article teaser      | Front page                                                           | Image, kicker ("Oppgang på Oslo Børs:"), bold headline, label pill ("Mye lest", "Pluss", "Børsoppdatering"); some on a solid brand or dark fill with white text; opinion teasers use Merriweather italic          | **No.** CMS-rendered today                                    |
| Article header      | Articles                                                             | Label pill ("Meninger"), headline (news: Inter 68/76 bold; opinion: Merriweather italic 62/76 bold), lead 24/32 medium gray, tag chips (section, author, ticker with live price), "Publisert …", "Lagre i MittFA" | **No**                                                        |
| Byline and share    | Articles                                                             | Avatar + name + role; "Tips meg" + icon buttons (link, Facebook, X, LinkedIn)                                                                                                                                     | `AvatarLabelGroup` + `ButtonUtility`                          |
| Paywall box         | Articles, Bjellesauer                                                | "Bli abonnent fra 99 kr", social sign-in buttons, business subscription box                                                                                                                                       | `SocialButton`; the box itself no                             |
| Info message        | Forum                                                                | Light brand box with info icon and link                                                                                                                                                                           | `Alert color="brand"`                                         |
| Empty / onboarding  | MittFA, Watchlist (logged out)                                       | Heading, short text, primary button, illustration cards                                                                                                                                                           | `EmptyState` is close                                         |

## 4. Tokens seen on the live site

**Type** (Inter unless noted):

| Use                                    | Live                           | Library token                                    |
| :------------------------------------- | :----------------------------- | :----------------------------------------------- |
| Meta, labels, badges, table headers    | 12/16, 500 (most common)       | `text-xs font-medium` ✓                          |
| Table cells, excerpts, body in widgets | 14/20, 400                     | `text-sm` ✓                                      |
| Ticker / name in rows                  | 14/16–20, 600                  | `text-sm font-semibold` (line height differs)    |
| Teaser title (small)                   | 16, 700                        | `text-md font-bold`                              |
| Widget card title                      | 18/24, 600                     | `text-lg font-semibold` (library line height 30) |
| Section title ("Mest lest")            | 20/24, 500–700                 | `text-xl` (library line height 30)               |
| Front page lead headline               | 44 px, 700                     | No step (`display-md` 36, `display-lg` 48)       |
| Article headline (news)                | 68/76, 700                     | No step (`display-xl` 60, `display-2xl` 72)      |
| Article headline (opinion)             | Merriweather italic 62/76, 700 | **No serif font token**                          |
| Article lead                           | 24/32, 500, gray               | `text-display-xs font-medium text-tertiary`      |
| Article body                           | 18/30, 400, 690 px column      | `text-lg` (18/30) ✓                              |
| Article subheading                     | 20/34, 700                     | `text-xl font-bold` (line height differs)        |
| Image caption                          | 14/20, gray                    | `text-sm text-tertiary`                          |

**Color:**

| Live                  | Use                                  | Library                                           |
| :-------------------- | :----------------------------------- | :------------------------------------------------ |
| `#0373E3`             | Links, selected text, primary button | `brand-500` ✓                                     |
| `#024588`             | Header bar                           | `brand-700` ✓ (`siteBrands.fa`)                   |
| `#E6F1FC` / `#CDE3F9` | Selected chip, ticker badge fill     | ≈ `brand-50` / `brand-100`                        |
| `#151719`             | Primary text                         | ≈ `gray-900` `#181D27` (different ramp)           |
| `#67737E`             | Secondary text, table headers        | ≈ `gray-500` `#717680` (different ramp)           |
| `#EAECED`, `#D5D9DC`  | Page background, borders             | ≈ `gray-200` / `gray-300` (different ramp)        |
| `#14985E` / `#CA2B3D` | Positive / negative change           | ≈ `success-600` `#079455` / `error-600` `#B82636` |

The live grays are a cooler, bluer ramp than the library's `gray`. Brand blue matches exactly. This
is a parity question for the design owner (keep the library's gray, or bring the live ramp into
Figma), not something to fix in code.

**Radius:** 16 px cards (`rounded-2xl`), full pills for chips and badges, 4–6 px for small tags,
round logos and avatars.

**Shadows:** almost none; cards are separated by the gray page, not by shadow.

## 5. What this means for the provisional rules

The `anti-*` rules below were in `anti-patterns.md`, since folded into `SKILL.md`: nested cards is
`layout-one-card-level` in `layout.md`, emoji and hype are `fa-plain-copy`, scroll reveal is part of
`fa-no-invented-effects`.

| Rule                 | Evidence                                                                              | Decision                                                                                     |
| :------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------- |
| anti-icon-decoration | Widget headers use tinted icon tiles (Vinnere, Tapere, Sektorer)                      | **Removed.** Replaced by the widget card header pattern                                      |
| anti-nested-cards    | Rapporter puts gray tiles inside white cards; front page sidebar nests lists in cards | **Rewritten:** inside a white card, group with a gray fill, not another bordered white card  |
| anti-stat-card-row   | Watchlist header shows figures side by side; Rapporter shows a row of day tiles       | **Removed**                                                                                  |
| anti-emoji           | Forum categories use emoji (🏥 Helse, ⚓ Shipping, 🌍 ESG)                            | **Kept as SHOULD**, forum categories noted as the existing exception; design owner to decide |
| anti-scroll-reveal   | None seen                                                                             | Kept provisional                                                                             |
| anti-hype            | Copy is factual ("Lag din egen watchlist – helt gratis")                              | Kept provisional                                                                             |
| button-one-primary   | One filled button per area (header "Logg inn", "Lag watchlist", "Ny tråd")            | **Confirmed**                                                                                |
| Uppercase text       | Table headers and tickers are uppercase                                               | Allowed for table headers and tickers only (recorded in tokens.md)                           |

## 6. Gaps to raise with the design owner

Components the pages need that have no library component (and no Figma main component that we
know of):

1. Widget card (card with icon-tile header and chevron link)
2. Filter chip (toggle, dropdown with count, with flag)
3. Change value (signed, colored, Norwegian number format)
4. Period selector with per-period change
5. Live indicator
6. News feed item
7. Article teaser (several sizes and fills) and article header
8. Stat row / key figure
9. Logo stack (the existing `AvatarGroup` gap)
10. Paywall box

Token questions:

- A serif font token for opinion (Merriweather italic).
- Editorial headline sizes (44, 62, 68 px) that fall between display steps.
- Line heights for `text-lg` / `text-xl` (live 24 vs library 30).
- The gray ramp and the positive/negative greens and reds (section 4).
- Page width: live content is 1364–1380 px; `max-w-container` is 1280 px.

**Decided 2026-10-28:** cards keep a `border-secondary` border; main content is 1376, 1280 or 980 px
wide (ads may sit beside 980); mobile keeps a 16 px gutter (not edge to edge); the serif token is parked. The
gap components above are drafted in Figma on the "Test" page (node 17349:456) for review; none is
in code yet.

## 7. Logged-in pages

**MittFA** (personal feed): page header with an icon tile (star), "MittFa | Mihovil" and "Sist
oppdatert kl. 14:57", a secondary "Rediger" button on the right. Two columns: the feed card (filter
dropdown chips "Nyheter", "Bjellesauenes aksjehandler", "Forumtråder", then news feed items with a
save button on the thumbnail) and a sidebar widget card "Mine faste spalter" (title + thumbnail
rows). Category markers in the feed are 16 px **image icons** per category, not emoji.

**Watchlist:** a row of watchlist chips (name + change, selected = brand fill) with a "+" to add
one; title "Main Watchlist" with a settings icon button; a row of **AI prompt chips** after an
"Investorchat:" label ("Oppsummer nyheter", "Analyser nøkkeltall", "Vis bullcase"); a card with
**key figures** (Porteføljeverdi 53.792 NOK, Avkastning (1D) +853 / +1,61 %, …) above a two-line
chart and a **period selector** (5D … MAKS, each with its change); beside it a **key-figure list**
card (label left, value right, help icons, indented sub-rows). Below: a wide table (logo, name with
ticker under it, last price, change columns 1D … 5Y), then "Siste nytt om Min watchlist" with filter
chips and a "Finanskalender" widget card.

**Bjellesauer:** breadcrumbs ("Bjellesauer > Siste handler"), page header with an icon, an
explanation paragraph with "Les mer", underline tabs ("Siste handler", "Alle investorer", "Vinnere
og tapere"), a "Last ned" button, filter dropdowns, a date-range picker, a period selector without
values (1D … ALLE), and a dense table: investor (photo avatar + name, sticky first column), ticker
badge + company, signed colored changes, transaction value, holding percentages, owner company.

**Article body:** body 18/30 regular in a 690 px column; subheadings 20 px bold; quotes as bold body
text; ads in the side rails and between paragraphs. After the body: a gray (`#F8F9F9`) rounded card
"Legg til MittFa" with **follow chips** (avatar or logo + name + star) for the journalist, company
and category; a gray card "Siste fra aksjeforumet: PARB" (forum rows, "Vis mer"); an "Informasjon om
bruk av AI" chip; the comments section ("Kommentarer (0)", primary "Ny kommentar", sort dropdown).
The "NY" marker is a small red pill (also in the main navigation).

**What changed in the conclusions:**

- Key figures confirmed on Watchlist; period selector confirmed with and without values.
- Gray cards inside the white article page confirm the nesting rule (gray fill, no second border).
- Emoji: the forum uses emoji for categories, but MittFA uses image icons for the same categories.
  The direction is icons, so the emoji rule stays.
- New patterns: watchlist chips, AI prompt chips, follow chips, key-figure list, comments section,
  "NY" pill (`Badge color="error"`).
