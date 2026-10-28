# 04-aksje-equinor: notes

Stock page for Equinor (EQNR), built on the "Instrument profile" shell from `page-patterns.md`: a
header band (price, chart, key figures, tabs), then the card grid. Storybook:
`Experiments/opus/04-aksje-equinor` → Desktop, Mobile. Props: `realtime` (default `true`),
`isSubscriber` (default `false`, so the paywall stand-in shows), `defaultTab`.

I checked it with `tsc`, `eslint` and a server-side render of every tab in both subscriber states.
I did **not** look at it in Storybook (I was told not to start it), so light/dark/mobile have not
been checked by eye.

## Components used

| Component                                                                         | Path                                                      | Where                                                                                       |
| :-------------------------------------------------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `SiteHeader` (+ `TickerItem`, `SiteNavItem`)                                      | `components/application/site-header/site-header`          | Page frame, Børs marked `current`                                                           |
| `SiteFooter`                                                                      | `components/application/site-footer/site-footer`          | Page frame                                                                                  |
| `Tabs` / `Tabs.List` / `Tabs.Item` / `Tabs.Panel`                                 | `components/application/tabs/tabs`                        | Oversikt · Nyheter · Analyse · Regnskap og utbytte · Rapporter og kalender                  |
| `NativeSelect`                                                                    | `components/base/select/select-native`                    | Replaces the tabs below `md` (5 tabs, rule **tabs-mobile**)                                 |
| `ButtonGroup` / `ButtonGroupItem`                                                 | `components/base/button-group/button-group`               | Period selector, news filter, Årlig/Kvartal switch                                          |
| `Button`                                                                          | `components/base/buttons/button`                          | Watchlist trigger, "Se alle", "Vis flere nyheter", links, paywall CTA                       |
| `ButtonUtility`                                                                   | `components/base/buttons/button-utility`                  | Download report, play/pause call, add to calendar                                           |
| `Dropdown`                                                                        | `components/base/dropdown/dropdown`                       | Watchlist menu (multi-select section with checkboxes, plus "Ny watchlist")                  |
| `Badge`, `BadgeWithDot`                                                           | `components/base/badges/badges`                           | Ticker badge, KJØP/NØYTRAL/SELG, Live / Forsinket                                           |
| `Avatar`                                                                          | `components/base/avatar/avatar`                           | Company tile ("EQ", square), news source                                                    |
| `FeaturedIcon`                                                                    | `components/foundations/featured-icon/featured-icon`      | Widget card header icons                                                                    |
| `Tooltip`, `TooltipTrigger`                                                       | `components/base/tooltip/tooltip`                         | Help on P/E, P/B, Direkteavkastning                                                         |
| `Table`                                                                           | `components/application/table/table`                      | Order book, latest trades, recommendations, technicals, dividends                           |
| `ProgressBar`                                                                     | `components/base/progress-indicators/progress-indicators` | Analyst split (Kjøp / Nøytral / Selg out of 24)                                             |
| `EmptyState`                                                                      | `components/application/empty-state/empty-state`          | News filter with no results                                                                 |
| `notify` + `NotificationToaster`                                                  | `components/application/notifications/notification`       | Watchlist added/removed, calendar added (toaster in the story decorator)                    |
| Recharts + `ChartTooltipContent`, `ChartLegendContent`, `selectEvenlySpacedItems` | `components/application/charts/charts-base`               | Price chart (area), results (bars)                                                          |
| `useBreakpoint`                                                                   | `hooks/use-breakpoint`                                    | Chart ticks and bar width                                                                   |
| Icons                                                                             | `fa-icons`                                                | Star/StarFilled, ChevronDown, Lock, Help, News, Download, Play/Pause, CalendarAdd, Check, … |

## Composed myself (no Figma component)

All are stand-ins listed in `page-patterns.md`, except where marked **new**.

- **Widget card** (`WidgetCard`): section with the level-2 card classes, `FeaturedIcon` + `h2` +
  one right-slot item. Added a `flush` mode (no body padding) because tables inside a padded card
  get double padding (the Table cells have their own `px-5`/`px-6`). **New**: flush card.
- **Change value** (`ChangeValue`): the snippet from page-patterns, extended with an optional
  absolute value: `−6,60 (−1,46 %)`.
- **Live indicator**: `BadgeWithDot color="error"` "Live" + time; when `realtime` is false a gray
  "Forsinket 15 min" badge instead. **New**: the delayed state has no pattern.
- **Period selector**: `ButtonGroup` with label plus change value. Change values are hidden below
  `md` (see bent rules).
- **Filter chips**: `ButtonGroup` single selection (Alle, FA, TDN, Børsmeldinger, Pressemeldinger).
- **News feed item**: source `Avatar`, meta line (time · ticker badge · source · Pluss lock), title,
  two-line excerpt. The whole item is one `<a>` with the focus ring.
- **Key figures** in the band: label over value in a `dl` grid. **Key-figure list** card: label/value
  rows with dividers and help tooltips.
- **Paywall box** for technical signals: a centered inset with title, one line, a primary
  "Bli abonnent fra 99 kr" and a "Logg inn" link. No SocialButtons (it sits inside a card, not a
  full paywall).
- **Sticky price bar** — **new**: name, ticker badge, price, change, live indicator and the
  watchlist menu in a `sticky top-0` strip (`bg-primary_alt border-b`) above the header band, so
  the price stays on screen while scrolling (brief: "Current price must always be at hand").
- **Watchlist menu** — **new**: `Dropdown` whose first section is `selectionMode="multiple"` with
  `selectionIndicator="checkbox"`, one item per watchlist, and an action item "Ny watchlist".
  Trigger label switches between "Watchlist" and "I watchlist" (star filled).
- **Company row / call row**: title + meta + trailing `ButtonUtility` (download, play). Earnings
  calls are insets (`rounded-xl bg-tertiary`). Play only toggles state; there is no player
  (video/audio player is a coverage gap).
- **"Mer om Equinor"** card — **new**: link-gray `Button`s for Forum, Regnskap, Profil,
  Bjellesauer, Topp 50 aksjonærer, Historikk, Teknisk analyse (the brief's "further areas", which I
  read as separate pages, not tabs).

## Patterns

**New patterns**

- Sticky price bar above the header band (see above). It's the only way I found to satisfy "price
  always at hand"; the header band itself scrolls away.
- Header band containing a chart, a period selector, a key-figure grid and the tab list, with the
  tab panels in `<main>` below. The instrument-profile shell names these but gives no layout.
- Watchlist multi-select dropdown (checkbox items + an action item in a second section).
- Delayed-data state for the live indicator, and a "Kursene er forsinket 15 minutter. Få
  sanntidskurser" line in the band.
- Flush widget card for tables (header padded, table edge to edge).
- Paywall box as an inset inside a card (the pattern describes a full centered card).
- Bar chart with an Årlig/Kvartal `ButtonGroup` in the card header's right slot.
- Analyst split shown with `ProgressBar`s (count out of total). Not described anywhere; may be the
  wrong component (it's "progress against a target").

**Clashes**

- **Table header labels** — `page-patterns.md` (Data table) says `text-xs font-medium uppercase
tracking-wide text-quaternary`; `Table.Head` renders `text-xs font-semibold text-quaternary`,
  sentence case. I kept the component.
- **Numbers right-aligned** — `layout.md` says numbers right and each header aligned with its
  column; `Table.Head` wraps its label in a flex group with no alignment prop, so a right-aligned
  cell ends up under a left-aligned header. I left numeric cells left-aligned so headers and cells
  line up. Needs an `align` prop on `Table.Head` / `Table.Cell`.
- **Table cell vs head padding** — `Table.Head` is always `px-6`; `Table.Cell` at `size="sm"` is
  `px-5`, so header and cell text are 4 px apart in sm tables.
- **Row hover** — `layout.md` says row hover `bg-primary_hover`; `Table.Row` uses
  `hover:bg-secondary` (and `transition-colors`, not bare `transition`).
- **TableCard vs card surface** — `TableCard.Root` is `rounded-xl bg-primary shadow-xs ring-1`,
  while `layout.md` cards are `rounded-2xl border bg-primary_alt` and **layout-no-card-shadow**.
  I didn't use `TableCard` and put tables in my own card.
- **Period selector on mobile** — page-patterns says "Below `md`, keep it on one row". Seven items
  (1D … Maks) at `sm` are ~373 px wide even without change values, more than 343 px of content
  width at 375 px. I keep one row and let it scroll sideways (`overflow-x-auto`), and hide the
  per-period changes below `md` (the selected period's change is in the summary line). Same
  overflow for the news filter chips.
- **Tabs vs separate pages** — the shell puts tabs in the header band, but `tabs.md` says page
  navigation isn't tabs. I used tabs for sections of this page and a link card for the further
  areas.
- **Ticker formatting** — `site-header.md` says `"1 193,30"`, the library's own header demo uses
  `"1.193,30"`. I followed the skill.
- Page width: not settled; I used `max-w-container` (1280 px).

## Rules I bent

- `ButtonGroupItem` children are a two-line label (period + change value); the docs only show short
  text. Colored text inside a toggle button isn't covered.
- Scrolling wrappers (`-mx-4 overflow-x-auto px-4`) around `ButtonGroup`s (layout only, but not a
  documented pattern).
- `className` on `Table.Head`/`Table.Cell` only for `hidden sm:table-cell` / `whitespace-nowrap`
  (allowed by **table-no-restyle**).
- Utility color classes used directly: `text-utility-error-600` / `-success-600` for the price line
  (allowed by **charts-direction-color**), `text-utility-brand-300` for the second bar series (not in
  the listed brand order 600, 400, 700, 500, 300 as a second series), `stroke-utility-gray-300` for
  the chart cursor (charts.md says the cursor is `stroke-utility-brand-600`; brand looked wrong on a
  red line).
- No `ReferenceLine` for previous close; I put it in the summary text instead, since no demo shows
  one.
- The paywall CTA is the one `primary` button in that card; the page has a few sections, each with
  at most one primary.

## Placeholder data that needs replacing

Everything in the page except the brief's figures (444,30, −6,60 / −1,46 %, 14:12, Åpne/Høy/Lav,
kjøp/salg, volum, omsetning, P/E 12,59, neste rapport 28.10, median kursmål 393,53,
direkteavkastning 3,39 %) is invented:

- Period changes for 5D … Maks and the whole price series (generated, seeded random walk).
- Previous close 450,90 (derived from the brief's change).
- Ticker bar values, news headlines/excerpts/times, Pluss flags.
- Order book, latest trades and broker codes.
- Analyst split 5/11/8, overall "NØYTRAL", every broker recommendation and target (real broker
  names, made-up calls), the "Levert av Infront" credit.
- Technical indicator values and signals.
- Revenue and profit per year/quarter (mrd. USD), market cap, P/B, EPS, share count, beta, 52-week
  range, dividend history, ex-dates and payout amounts, calendar dates, report file sizes and
  URLs, call lengths.
- "Bli abonnent fra 99 kr" price, all hrefs, app store links.

## Where the skill was unclear, contradictory or missing something

1. **No layout guidance for the instrument header band.** "Header band (name, price, chart, key
   figures, tabs)" is all there is: no order, no breakpoints, no sticky behavior, although the
   brief's "price always at hand" is a typical requirement for this page type.
2. **Period selector stand-in can't fit on a phone** (see Clashes) and the doc says to keep it on
   one row.
3. **Table alignment, header style, padding and hover** contradict `layout.md` / page-patterns (see
   Clashes). There's no way to right-align a numeric column header.
4. **`TableCard` contradicts the card surface** and there's no guidance for a table inside a widget
   card (padding doubles).
5. **NativeSelect labelling bug**: `select-native.tsx` gives the `<label>` and the `<select>` the
   same `id` and sets `aria-labelledby` on the select to its own id. `aria-labelledby` wins over
   `aria-label`, so `aria-label="Velg seksjon"` (which `tabs.md` recommends) is ignored and the
   select is named by its current option. The `<label>` also gets `htmlFor` = its own id.
6. **`ButtonUtility` uses `onClick`**, while `button.md` says "Use `onPress`, not `onClick`" for
   Button. The page documents `ButtonUtility`'s props but not which handler; the library itself uses
   `onClick` (file upload).
7. **Notification toaster in Storybook**: "mount once at the app root" — there is no global
   decorator that does it, so each story must add `<NotificationToaster />` itself. I added it in my
   story decorator.
8. **Live indicator has no delayed/non-realtime variant**, and the brief says data is delayed unless
   real-time is on.
9. **Subscriber-only content**: only the full paywall box is described; nothing for gating one
   card or one table. Also no lock-badge pattern for a gated card title (I used `Lock` with
   `aria-label`, which the icon rules allow).
10. **Watchlist (add/remove, several lists)**: no pattern. Follow chips (star toggle) are close but
    single-list.
11. **Company logo**: `fa-icons` has no Equinor logo, and the skill says logos come only from
    `fa-icons`. I used `Avatar initials="EQ" rounded={false}` as `avatar.md` suggests; real pages
    will need company logos from a data provider, which the rules don't allow for.
12. **Chart cursor/active dot colors for a red/green series** aren't specified; `ChartActiveDot` is
    hard-coded to `stroke-utility-brand-600`.
13. **Order book / bid-ask table layout** (mirrored columns) isn't covered.
14. **ProgressBar for distributions**: unclear whether a count-of-total is a valid use.
15. **Number formats**: the skill says `+2,4 %` but doesn't say that `nb-NO` emits U+2212 (−) and
    non-breaking spaces; mixing hand-written "-" with Intl output gives two different minus signs.
    I hand-wrote "−2,14" to match.
16. **`Dropdown.SectionHeader`** is the bare React Aria `Header` with no styles, so a labelled
    section ("Dine watchlister") would need hand styling; I used `aria-label` on the sections
    instead.
17. **Story viewports**: the instructions say "use the viewports in .storybook/preview" but no
    story in the library sets one, so how (`globals.viewport` in Storybook 10) isn't shown anywhere.
