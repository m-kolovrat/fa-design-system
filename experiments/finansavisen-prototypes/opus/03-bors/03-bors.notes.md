# 03-bors: notes (opus)

Børs market overview built from brief `briefs/03-bors.md`. Files:

- `03-bors.tsx`: `BorsPage` (`loggedIn` prop, default `true`)
- `03-bors.story.tsx`: "Experiments/opus/03-bors" → Desktop, Mobile, Logged out (desktop), Logged out (mobile)

Checks: `npx tsc --noEmit -p .` shows no errors in this folder, and `npx eslint` on the folder is clean
(after a prettier pass). A server-side `renderToString` smoke test of both login states runs without
errors. **I did not look at it in Storybook** (the task said not to start it), so step 6 of the
skill (check Mobile and Desktop in both themes) was skipped. The visual result hasn't been checked.

## Page structure

Page shell "Market overview" (card grid, mostly ⅓ and ½), `bg-secondary_alt` page,
`SiteHeader`/`SiteFooter` with `brand="fa"`, Børs marked `current`, `max-w-container`.

Title row above the cards: `h1` "Børs" + date line, ticker search (`Select.ComboBox`) and the
"Sanntidskurser" `Toggle` (turned off and with a hint when logged out).

| lg row | Cards (span of 6)                                                    |
| :----- | :------------------------------------------------------------------- |
| 1      | Index + chart (4), Watchlist (2)                                     |
| 2      | Markeder (2), Vinnere (2), Tapere (2)                                |
| 3      | Børsnyheter (4), Børsmorgen TV (2)                                   |
| 4      | Mest omsatte (3), Hot stocks (3)                                     |
| 5      | Mest shortet (4), Rekordnivåer (new highs/lows) (2)                  |
| 6      | Rapporter og webcasts (2), Sektorer (2), Kommende utbytter (2)       |
| 7      | Finanskalender (6)                                                   |

At `md` the index and news cards span both columns. Every other card takes half, so the rows fill
(Mest shortet is half at `md` even though it's ⅔ at `lg`, to avoid a hole). Below `md` it's one
column in source order, so the watchlist comes right after the index on a phone.

## Components used

| Component                                   | Path                                                         | Where                                                                                 |
| :------------------------------------------ | :----------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| `SiteHeader` (+ `TickerItem`, `SiteNavItem`) | `@/components/application/site-header/site-header`           | Header, ticker bar, `user` only when logged in, `onSearchPress` focuses the ComboBox  |
| `SiteFooter`                                | `@/components/application/site-footer/site-footer`           | Footer with the Millistream / delay disclaimer                                        |
| `Table`                                     | `@/components/application/table/table`                       | Vinnere, Tapere, Mest omsatte, Hot stocks, Mest shortet (sortable), Kommende utbytter |
| `EmptyState`                                | `@/components/application/empty-state/empty-state`           | Logged-out watchlist ("Lag din egen watchlist – helt gratis" + Logg inn)              |
| `ChartTooltipContent`, `selectEvenlySpacedItems` + Recharts `AreaChart` | `@/components/application/charts/charts-base` | Index chart                                                            |
| `ButtonGroup` / `ButtonGroupItem`           | `@/components/base/button-group/button-group`                | Market switch (with flags), period selector, news filter chips, highs/lows switch     |
| `Button`                                    | `@/components/base/buttons/button`                           | Legg til aksje, Logg inn, Se direkte, market rows as `link-gray` links                |
| `ButtonUtility`                             | `@/components/base/buttons/button-utility`                   | Chevron "Se alle" link in every card header, play/download on reports                 |
| `Select`, `Select.ComboBox`                 | `@/components/base/select/select`                            | Switch watchlist; search ticker                                                       |
| `Toggle`                                    | `@/components/base/toggle/toggle`                            | Real-time prices                                                                      |
| `Badge`, `BadgeWithDot`                     | `@/components/base/badges/badges`                            | Ticker badges, "Live", "Forsinket 15 min"                                             |
| `Avatar`, `AvatarLabelGroup`                | `@/components/base/avatar/*`                                 | News source "logo" (initials), company rows in reports                                |
| `FeaturedIcon`                              | `@/components/foundations/featured-icon/featured-icon`       | Widget card header tiles                                                              |
| `Flag`                                      | `fa-icons`                                                   | Market switch (norway-nok, sweden-sek, denmark-dkk, united-states-usd)                |
| `useBreakpoint`, `cx`                       | `@/hooks/use-breakpoint`, `@/utils/cx`                       | Chart ticks/axis width                                                                |

Icons (all `fa-icons`): ArrowUp, ArrowDown, Calendar (as CalendarIcon), ChevronRight, DocumentCash,
Download, Flame, GraphDown, GraphLine, GraphUp, Grid, Medal, News, Play, Plus, Search, Star, Tv, Wallet.

## Composed myself (no Figma component) and why

All of these are the stand-ins from `page-patterns.md`, except where noted:

- **Widget card** (`WidgetCard`): `section` with the level-2 card classes, `FeaturedIcon` sm, `h2`,
  optional inline meta, and a `ButtonUtility` chevron as the single right-slot item.
- **Change value** (`ChangeValue`): the snippet from page-patterns, extended to absolute values
  (`signDisplay: "exceptZero"`) and a suffix (" kr").
- **Ticker badge as a link** (`TickerLink`): the pattern says the ticker badge is "always a link when
  it's interactive", but `Badge` has no `href`, so I wrapped it in an `AriaLink` with the focus-ring
  classes. That's hand-styled link markup, which the fa-links rule says to avoid.
- **Period selector**: `ButtonGroupItem` with label + change value stacked inside, each item with an
  `aria-label` like "1D, −0,04 %".
- **Filter chips**: `ButtonGroup selectionMode="single"`. "Min watchlist" is left out when logged out.
- **Live indicator**: `BadgeWithDot color="error"` "Live" + "Oppdatert 14:10". **Not in the skill:**
  how to show that prices are *delayed*. I used a gray `Badge` "Forsinket 15 min" in place of the live
  badge, plus a hint on the toggle.
- **News feed item**: `Avatar` sm with source initials, meta line (time · ticker badge · source),
  bold title link, `line-clamp-2` excerpt.
- **Key figures** (watchlist): `dl` with Porteføljeverdi / Endring i dag.
- **Key-figure list** (Sektorer) and simple divided `ul` rows (Markeder, watchlist holdings,
  highs/lows, reports).
- **Company row**: `AvatarLabelGroup` + trailing `ButtonUtility`s (play webcast, download report).
- **Index header block** (my own, not in page-patterns): name + ticker, `text-display-sm` value,
  absolute and percent change, live/delayed badge, and a one-line text summary under the chart
  (charts-text-alternative).
- **Video player** for Børsmorgen: the skill lists the video player as a coverage gap with "no
  stand-in, ask before building". I couldn't ask, so I put in an inset placeholder (`rounded-xl
  bg-tertiary aspect-video`) with a primary "Se direkte" link button. **Needs a decision.**
- **Calendar day tiles**: insets (`rounded-xl bg-tertiary p-3`) in a 5-column grid inside one card,
  following the "day tiles" example in layout.md.

## Patterns

**New patterns**

- **Market switcher with flags:** `ButtonGroup` with a `Flag` as `iconLeading` (index card). Not
  described anywhere; the skill only covers country chips as `Dropdown`s.
- **Index header block:** value, then change (abs + pct), then a live/delayed badge and timestamp,
  then the period selector and chart. Like the instrument header band, but inside a ⅔ card.
- **Delayed vs real-time state:** a page-level `Toggle` in the title row plus a gray "Forsinket"
  badge. No pattern exists for it.
- **Title row with search and setting:** `h1` on the left, ComboBox + Toggle on the right, above the
  card grid.
- **Table bleeding to the card edge:** `Table` inside a widget card with `-mx-4 md:-mx-5`, so its
  gray header row runs edge to edge as in a `TableCard`. Not described; the alternative is a table
  indented by the card padding *plus* the cell padding.
- **View switch inside a widget card** ("Ny toppnotering / Ny bunnotering") as a `ButtonGroup` under
  the header.
- **Ratio figure** "9,6x" (turnover vs. average) for Hot stocks. No format guidance exists.

**Clashes**

1. **`TableCard.Root` vs. the card surface.** TableCard is `rounded-xl bg-primary shadow-xs ring-1
   ring-secondary`. layout.md's card is `rounded-2xl border border-secondary bg-primary_alt`, no
   shadow (layout-no-card-shadow), and its dark mode is different (`bg-primary` vs `bg-primary_alt`).
   I didn't use `TableCard`; I put a bare `Table` in my own widget card.
2. **Table header labels.** page-patterns says `text-xs font-medium uppercase tracking-wide
   text-quaternary`; `Table.Head` renders `text-xs font-semibold text-quaternary`, not uppercase.
   I left the component as it is.
3. **Row hover.** layout.md: row hover is `bg-primary_hover`. `Table.Row` uses `hover:bg-secondary`.
4. **Two ways of showing a change.** table.md's example puts change in a `BadgeWithIcon` with arrows.
   page-patterns' "Change value" is colored signed text. I used the text version everywhere.
5. **Two ways of showing a company in a table.** page-patterns → Data table: "Show a ticker as a
   ticker badge, a company with its round logo (`Avatar size="xs"`)". layout.md: "Name over
   identifier: Equinor / EQNR". I used name-over-ticker in tables (no logos exist) and ticker badges
   in news meta, highs/lows and the calendar.
6. **⅔ card at `md`.** layout.md's grid example gives the ⅔ card `md:col-span-2`. The responsive rule
   right under it says "two columns from `md` (every card takes half, full-width cards stay full)".
   I followed the example for the index and news cards and the rule for Mest shortet.
7. **Ticker value formats differ.** site-header.md wants `"1 193,30"` / `"-1,59%"` (hyphen-minus, no
   space before %). The site-header demo uses `"1.193,30"` (dot thousands). The change-value pattern
   produces `−0,04 %` (U+2212 minus, space before %). So the ticker bar and the cards format the same
   number differently on one page. I followed site-header.md for the bar.
8. **Key-figure size.** page-patterns says key figures are `text-display-xs`. For the main index
   value I used `text-display-sm` because it's the page's headline number. This is my choice, not a
   documented step.

## Rules I bent

- **fa-links / anti-hand-built:** the news title links and the ticker-badge links are hand-styled
  (`<a>` / `AriaLink` with the focus-ring classes). News titles aren't running text in `prose`, and
  they aren't "action links" for `Button`, so the skill has no answer for them.
- **className on library components:** `Table.Head` gets `*:justify-end` to right-align numeric
  headers (there's no `align` prop), and `hidden md:table-cell` (which is allowed). Table wrappers get
  negative margins (layout).
- **Video player:** built a placeholder despite "ask before building" (see above).
- **Storybook viewports:** set with `globals: { viewport: { value: "mobile" | "desktop" } }`
  (Storybook 10 syntax). Neither the skill nor CLAUDE.md shows how a story picks a viewport.

## Library bugs and gaps found (not fixed, outside my folder)

- **`Table.Head` padding ignores `size`.** It's always `px-6`, while `size="sm"` cells are `px-5`, so
  header labels are 4px out of line with their column in every `sm` table. Right-aligned numeric
  columns show it most.
- **`Table.Head` has no alignment prop.** Right-aligning a numeric column's header needs a
  `className` hack on the inner flex group, but the skill requires numbers right-aligned with headers
  aligned to their columns.
- **`Badge` can't be a link,** while page-patterns requires interactive ticker badges to be links.
- **No source logos** (TDN, Oslo Børs/Newsweb, NTB) in `fa-icons`. The news feed pattern asks for a
  source logo, so I used initials.
- **No company logos.** Initials are used for companies in reports.
- **Coverage gaps hit on this page:** video player, live indicator, period selector, change value,
  widget card, filter chips, key figures, news feed item.

## Placeholder data that needs replacing

Everything numeric except the two figures given in the brief (Hovedindeksen 2 124,29, −0,04 %, live
14:10; Techstep +15,62 %; Proximar Seafood −89,19 %) is invented:

- Period changes (1U–5Å) for all four markets; the values of OMXS30, OMXC25 and S&P 500; the whole
  chart series (a generated deterministic curve, not real ticks).
- The Markeder list (OBX, Dow Jones, S&P 500, NASDAQ, Brent, gull, EURNOK, USDNOK, Bitcoin, US 10Y,
  VIX) and the header ticker values.
- All share prices and the other winners/losers, Mest omsatte turnover, Hot stocks ratios, short
  shares/values/days-to-cover, the "Finanstilsynet, 26. okt" source date, highs/lows lists.
- Watchlist values (412 380 kr, +3 214 kr / +0,79 %) and the holdings; the second list
  "Utbytteaksjer".
- All news headlines and excerpts (invented events: Techstep contract, Proximar emission, Johan
  Castberg, Kongsberg contract with Lithuania, salmon prices). **Don't publish them as real news.**
- Report/webcast times, dividend amounts and ex-dates, the calendar events (incl. a Norges Bank
  meeting on 29. okt), sector changes.
- Footer URLs for the app stores and social profiles, and the user initials "KH".
- The Børsmorgen episode title. Also, the brief asks for "Live Børsmorgen TV" at 14:10, but
  Børsmorgen is a morning show. The live state needs real broadcast data.

## Where the skill was unclear, contradictory or missing something

1. **Delayed data.** The brief and the footer example mention delay, but the skill has a live
   indicator and nothing for "forsinket", nor where a real-time switch goes.
2. **Video player** has "no stand-in, ask", which blocks an autonomous build. A placeholder stand-in
   (inset + play button) would help.
3. **Links that are neither prose nor actions** (feed titles, ticker badges, table rows). Rows can
   take `href` (React Aria), but the table page doesn't mention it; I used `Table.Row href`.
4. **Tables in narrow (⅓) widget cards.** No guidance on whether to use `Table`, `TableCard` or a
   list, or how to place a table in a padded card. Combined with clash 1, there's no way to use
   `TableCard` that follows layout.md.
5. **Number formats.** Neither "abs + pct" with `kr`, nor "MNOK" units, ratios ("9,6x"), basis points
   for yields, or currency pairs with 4 decimals is covered. `Intl` `nb-NO` emits U+2212 and narrow
   no-break spaces, while the ticker bar strings use ASCII. The skill should pick one.
6. **Period selector on mobile.** "Below `md`, keep it on one row" is impossible for six two-line
   items at 375 px (each `ButtonGroupItem` sm has 32 px of horizontal padding). I wrapped it in an
   `overflow-x-auto`, which the skill doesn't mention. The same goes for the six filter chips.
7. **Chart color for direction vs. hover tokens.** charts-direction-color says success/error for a
   single series vs. previous close, but the documented cursor/active dot are brand. A red line with
   a brand hover dot looks inconsistent. There's also no guidance for intraday x-axis labels or the
   y-axis on mobile.
8. **Storybook viewport** usage for stories isn't documented (see above).
9. **ButtonGroup with flags:** button-group.md says icons go through `iconLeading` (component
   reference or JSX for a `Dot`). Passing a `Flag` element works, but nothing says it's allowed.
10. **Watchlist select label:** `Select` has a visible label by default; in a card whose title is
    already "Watchlist", I used `aria-label`. The rule allows it, but there's no pattern for a
    "switch list" control in a card header.
11. **EmptyState in a ⅓ card:** the component is centred with a 512 px max width and `h3` title,
    which works, but its `md` buttons are larger than everything else in the card. There's no small
    variant.
