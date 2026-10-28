# Portfolio watchlist

**Prompt:** `/Users/mihovil/Desktop/portfolio-watchlist-brief.md` (PM brief written from screenshots, in
English). Built as Finansavisen (`brand="fa"`), logged in, all copy in Norwegian.

- **Shell:** `SiteHeader` (sticky, `collapsed` from scroll, Watchlist `current`, `user`) and `SiteFooter`;
  `max-w-container` (1280 px, "logged-in app pages") with `px-4 md:px-8`; card grid with `gap-6`.
- **Components:** `SiteHeader`, `SiteFooter`, `Tabs` (watchlists: `underline`; transactions:
  `button-minimal` in the card body), `NativeSelect` (watchlist picker below `md`), `CardHeader`,
  `PeriodSelector`, charts (`ChartTooltipContent`, `ChartLegendContent` with Recharts `LineChart`),
  `Tooltip` / `TooltipTrigger` (risk metrics), `ButtonGroup` (holdings view, news source filter),
  `Dropdown` (sort, categories), `Button`, `ButtonUtility` (list settings), `Avatar` (initials),
  `Badge` (ticker, Kjøp/Salg), `Table` (`size="sm"`, sortable date), `PaginationCardAdvanced`,
  `EmptyState` (empty watchlist, empty news filter, no dividends), `Modal` (`mobile="sheet"`).
- **Patterns from the skill:** card with a header, key figures, key-figure list (`dl`), instrument
  cell, change value, ticker badge, filter chips, AI prompt chips, news feed item, company row,
  period selector under the chart, data table on mobile (two-column rows + sheet), main and sidebar
  (⅔ news + ⅓ calendar/dividends).
- **Stand-ins (no Figma component yet):** key figures row, key-figure list, change value, filter
  chips (`ButtonGroup` + `Dropdown` chip with count `Badge`), AI prompt chips (`Button secondary sm`),
  news feed item, upcoming-dividends list (a `grid` with header labels instead of a table, which also
  fixes the brief's overlapping "Company"/"Ticker" headers).
- **Placeholders:** every figure is invented: prices, changes, returns, P/E, P/B, yields, holdings,
  cash, KPIs, alpha/beta/std. dev., period returns, chart series (seeded random walk), news
  headlines and times, calendar dates, dividend amounts, transactions, ticker bar values. The
  `onSearchPress` handler is a no-op, and buttons ("Ny transaksjon", "Rediger", AI prompts) have no
  handlers.

## Differences from the brief

- Period "MAX" doesn't exist in `PERIODS`; 5Y is used instead ("Avkastning siden start" for the max KPIs).
- Holdings/transactions tables don't scroll sideways: below `md` they become two-column rows with a
  sheet (skill rule), and from `md` to `lg` some columns hide (`max-lg:hidden`) so the rest fit.
- News list doesn't scroll inside a fixed-height card; it shows 5 items and "Vis flere nyheter"
  (layout-equal-height).
- KPI figures are neutral `text-primary` with the colored change under them (key-figures pattern),
  not green/red figures.
- Chart: horizontal grid only (charts pattern), not dashed vertical lines; benchmark line in
  `text-utility-orange-dark-500`.
- Hero ⅔ + metrics ⅓ instead of 60/40 (6-column grid).
- Loading skeletons: not built (no skeleton component).

## Patterns

**New patterns**

- Watchlist switcher as `underline` tabs whose label carries a change value (`Tabs.Item` children:
  name + colored `+0,84 %`); on mobile a `NativeSelect` with the change in the option text.
- Page title row: `h1` + `ButtonUtility` (settings) on the left, AI prompt chips on the right.
- `Table` inside a `CardHeader` card: the controls (ButtonGroup / Tabs) sit in a padded strip, the
  table runs edge to edge under it, pagination is the card's last child. No reference describes this.
- Two-series comparison chart (portfolio vs. index): no guidance on the second series color.
- Help tooltips on labels inside a key-figure list (`TooltipTrigger` + `Help`).
- Upcoming-dividends list with a header label row (`Selskap / Per aksje / Dato`) in a ⅓ card.

**Clashes**

- `TableCard.Root` is `rounded-xl bg-primary shadow-xs ring-1` vs. the layout card `rounded-2xl
border bg-primary_alt`; used the layout card + `CardHeader` instead of `TableCard`.
- page-patterns "Data table" asks for uppercase `font-medium tracking-wide` header labels;
  `Table.Head` renders `text-xs font-semibold text-quaternary`, not uppercase, with no prop to change it.
- `Table.Head` is always `px-6`; `Table.Cell` at `size="sm"` is `px-5`, so headers and cells are 4 px
  apart.
- Instrument cell uses the round `Avatar` (page-patterns); avatar.md says companies use
  `rounded={false}`.
- Brief: chips/tables scroll, fixed-height news list; skill: no sideways table scroll, no inner scroll.
