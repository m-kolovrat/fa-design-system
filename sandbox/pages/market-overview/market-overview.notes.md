# Market overview (Børs)

**Prompt:** `/Users/mihovil/Desktop/market-overview-brief.md` (an English PM brief written from
screenshots of finansavisen.no/bors at about 1050 px). Brand `fa`; all copy in Norwegian.

Shell: "Market overview" from `page-patterns.md`: `SiteHeader`, `main` at `max-w-[1376px]`, a
6-column card grid (one column below `md`, two from `md`, six from `lg`), `SiteFooter`.

## Plan: brief section → component

| #   | Brief section           | Built with                                                                                                           |
| :-- | :---------------------- | :------------------------------------------------------------------------------------------------------------------- |
| 1   | Global header           | `SiteHeader brand="fa"`, sticky, Børs `current`                                                                      |
| 2   | Real-time banner        | Card row: `BadgeWithDot color="error"` + text, `Toggle` with `hint` (delay note when off)                            |
| 3   | Market header           | `h1`, `ButtonGroup` with flag icons (market), `Button` icon-only (search), `Select` (watchlist), prev/next `Button`s |
| 4   | Index chart             | Card + `CardHeader` (live indicator in `badge`, + and fullscreen actions), Recharts `AreaChart`, `PeriodSelector`    |
| 5   | Market list             | `Table` (`selectionMode="single"`, `selectionBehavior="replace"`), `Dropdown` "Markeder [n]" with checkbox items     |
| 6   | Winners / Losers        | Two cards: `CardHeader` + chevron `Button`, `Table` with instrument cells                                            |
| 7   | Video player            | **Not in the system**: 16:9 `bg-tertiary` placeholder with a mute `Button`                                           |
| 8   | My watchlist            | `CardHeader` (`Select`, edit, open), key figure with eye `Button`, `Table` with "–" for missing values               |
| 9   | Market news             | `ButtonGroup` (filter chips stand-in), meta-over-title rows, ticker `Badge`, fixed-height scroll region              |
| 10  | Most traded             | `Table`                                                                                                              |
| 11  | Hot stocks              | `Table`, `Table.Head tooltip` on the ratio column                                                                    |
| 12  | Ad slot                 | Neutral `aside`, `h-64` reserved                                                                                     |
| 13  | Most shorted            | `Table`; explanation in `CardHeader description` and `Table.Head tooltip`                                            |
| 14  | All-time highs / lows   | Two `Table` cards                                                                                                    |
| 15  | Second ad slot          | Same as 12                                                                                                           |
| 16  | Reports                 | `Tabs type="button-minimal"`, company rows with a download `Button`                                                  |
| 17  | Earnings calls          | `Tabs`, company rows, `BadgeWithDot` "Live", `EmptyState` for an empty tab                                           |
| 18  | Quarterly presentations | `Tabs`, company rows with a play `Button`, `EmptyState` on "Kommende"                                                |
| 19  | Sectors                 | `Table` with controlled sorting (% descending)                                                                       |
| 20  | Upcoming dividends      | `Table`                                                                                                              |
| 21  | Financial calendar      | `Table`, `ButtonUtility` download in the row                                                                         |
| 22  | Footer                  | `SiteFooter brand="fa"`                                                                                              |

Grid (lg): chart ⅔ + sectors ⅓ · markets ⅓ + winners ⅓ + losers ⅓ · video ⅔ + news ⅓ · watchlist
full · most traded ½ + hot ½ · ad · shorted ⅔ + dividends ⅓ · highs ½ + lows ½ · ad · reports ⅓ +
calls ⅓ + presentations ⅓ · calendar full. At `md`, wide tables take the full width so no row has a
hole.

## Components

`SiteHeader`, `SiteFooter`, `CardHeader`, `Table`, `PeriodSelector`, `ChartTooltipContent` (with
Recharts), `Tabs`, `ButtonGroup` / `ButtonGroupItem`, `Button`, `ButtonUtility`, `Dropdown`,
`Select`, `Toggle`, `Badge`, `BadgeWithDot`, `Avatar`, `EmptyState`, `useBreakpoint`, flags and icons
from `fa-icons`. All imported by package path.

## Stand-ins

- **Change value, instrument cell, company row, key figure, live indicator, filter chips, ticker
  badge**: composed as `page-patterns.md` describes (no Figma component yet).
- **Video player**: placeholder surface; no component, and `fa-icons` has no volume/mute icon, so the
  mute control is a text `Button` ("Slå på lyd").
- **Ad slots**: neutral reserved-height placeholders.
- **Market flags**: `ButtonGroup` items with a flag `iconLeading` and the country name, instead of
  the brief's round flag buttons with a ring.

## Placeholders

Every figure is invented (`market-overview-data.ts`): all prices, changes, period returns, turnover,
volume ratios, short positions, dividends, dates, headlines, watchlist holdings, and the chart series
(a seeded random walk ending at the last price). "Levert av Quartr" and the publisher lines in the
footer need checking. Logos are `Avatar` initials. Links point to `#…` anchors.

## Figures and live updates

Every figure is `Num` (`fa-design-system/components/base/num/num`); strings (chart axis ticks and
tooltip) use `formatNumber`. No `Intl.NumberFormat` left; units go in `suffix` (`%`, ` kr`, ` M`,
` mrd`). Fixed on the way: the space before `%` in short interest and in the chart sentence, and the
`+` on the volume ratio (a ratio, not a change).

Ticking via `useMockTicks` (prototype data, a seeded random walk), with the day change derived from
the moving price: the chart card's last price and change (and its "i dag" sentence and the 1D period
chip), the market list rows, winners/losers, most traded and hot stocks (last, +/−, %), and the
watchlist rows plus the portfolio value and day change above them. Static: turnover, volume ratio,
short interest, days to cover, all-time highs/lows, 1-year and period returns, sectors, the chart
series. Seeds come from the ticker, so a stock in several cards shows the same price; the chart card
takes its quote from the selected market row, so the two agree.

## Not built

- The green/red cell flash on update (no motion token or component; deferred).
- Loading skeletons (no skeleton component in the library).
- Search view for the mobile header search icon and the "Finn instrument" button (handlers are
  no-ops).
- Market switching changes only the `h1`; the data stays Norwegian.

## Patterns

**New patterns**

- Real-time data strip above the page title: a full-width card row with a status badge, a sentence
  and a `Toggle` (section 2). No reference file describes a page-level setting row.
- Market switcher next to the `h1` (flag `ButtonGroup`) and an instrument stepper (watchlist
  `Select` + prev/next buttons) under it (section 3).
- A table row that drives the chart above it (market list, `selectionBehavior="replace"`): the
  selected row is the charted instrument.
- Fixed-height lists that scroll inside a card (news, reports, calls, presentations), as a focusable
  `role="region"`. `layout-equal-height` suggests "Vis mer" instead; the brief asks for scrolling.
- Card header actions holding a `Select` (watchlist picker); `card-header` lists only `Button` and
  `Dropdown`.
- Tabular cards with only a title (all-time highs/lows, dividends) where the title alone says it all.

**Clashes**

- **Mobile tables:** the brief and the lead ask for horizontal scrolling; `table-no-sideways-scroll`
  and "Data table on mobile" ask for a two-column list with a sheet below `md`. Followed the brief:
  `Table`'s own `overflow-x-auto` wrapper plus `min-w-*` on wide tables.
- **Ticker column:** the brief has a separate ticker pill column in most traded, hot stocks,
  shorted, highs/lows, dividends and calendar; `table-instrument-cell` forbids it. Followed the rule
  (ticker under the name).
- **Header icons:** the brief puts icons before card titles (green/red chart, flame, calendar);
  `card-header-always` has no icon slot and forbids an icon tile. Left out.
- **Column headers:** the brief and `page-patterns.md` ("Data table") want `uppercase tracking-wide`
  headers; `Table.Head` renders `text-xs font-semibold text-quaternary` without uppercase. Kept the
  component.
- **Selected row:** the brief has a light blue row with blue text; `Table.Row` uses `bg-secondary`.
  `layout-states` says a selected row is `bg-active` or `bg-brand-primary_alt`. Kept the component.
- **Number format:** settled: the system's format is now the brief's ("1.612,48", `Num` /
  `formatNumber`). "M" / "mrd" for millions and billions come from the brief; the skill has no rule
  for them.
- **Number of rows:** the brief has about 20 winners/losers; used 14 so the row matches the market
  list.
- **Row actions:** "Company row" says a trailing icon-only `Button`; `table-actions-label` says
  `ButtonUtility` with `tooltip` inside a `Table`. Used `Button` in lists and `ButtonUtility` in the
  calendar table, so the same download action looks different in two cards.
- **Header search:** the brief's pill search with an AI sparkle and "Søk ticker eller spør AI" is not
  a `SiteHeader` option; used the header's own search.

**`live` (30 Oct):** only the ticking prices (market list, winners/losers, watchlist, most traded, hot stocks, the chart card) and the watchlist's values and total are `live`. Changes and percentages aren't (num.md). The chart card's price is keyed by instrument and the watchlist figures by list, so switching either doesn't flash.
