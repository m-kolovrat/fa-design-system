# Stock page (Markedsdata)

**Prompt:** `/Users/mihovil/Desktop/stock-page-brief.md` (stock page, Markedsdata tab). Example stock:
Norwegian Air Shuttle (NAS). Brand `fa`; all copy in Norwegian; ad rails dropped.

## Plan: brief section → component

| #   | Brief section           | Built with                                                                                                                                        |
| :-- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Global header           | `SiteHeader brand="fa"` with `collapsed` from scroll, `user`, `menu`; sticky wrapper                                                              |
| 2   | Real-time banner        | Card row: `BadgeWithDot` (Forsinket / Sanntid) + text + `Toggle` (stand-in, no component)                                                         |
| 3   | Stock header + chart    | Card: `h1`, price, change value, `BadgeWithDot` "Live" (live indicator), Watchlist `Button`, Recharts area chart, `PeriodSelector`, key-data `dl` |
| 4   | Video carousel          | `Carousel` + `CardHeader` (prev/next as md `Button`s through the triggers' render prop); 16:9 placeholder surface (no video player)               |
| 5   | Stock sub-navigation    | `Tabs` link tabs, `type="underline"`, `NativeSelect` below `xl`                                                                                   |
| 6   | Latest news             | `CardHeader`, `ButtonGroup` (filter chips stand-in), news feed item stand-in with `Avatar` initials, `PaginationCardDefault`                      |
| 7   | Analyst consensus       | `CardHeader` (credit in `description`), `Ai` icon subheading, list, inset CTA with `Button`                                                       |
| 8   | Results and revenue     | `ButtonGroup` (Årlig / Kvartalsvis) + Recharts bar chart                                                                                          |
| 9   | Order book              | `CardHeader` + `BadgeWithDot` "Ordinær handel"; levels and bars composed from tokens (not in the system)                                          |
| 10  | Key figures             | Key-figure list (`dl`)                                                                                                                            |
| 11  | Recommendations         | Recharts stacked bar; 1–5 scale, target range and history composed in insets (not in the system)                                                  |
| 12  | Technical indicators    | `Table size="sm"` + `Badge` KJØP / SELG / NØYTRAL; volume stats as label-over-value insets with change values                                     |
| 13  | Latest trades           | `Table size="sm"`                                                                                                                                 |
| 14  | Dividends               | `Table size="sm"`                                                                                                                                 |
| 15  | Financial calendar      | `Table size="sm"` + `ButtonUtility` download (`isDisabled` when no file)                                                                          |
| 16  | Reports                 | Inset "Kommende" row (`Avatar`, `Badge brand`) + company rows with `ButtonUtility` download                                                       |
| 17  | Earnings calls          | Inset "Kommende" with `Button` "Legg i kalender" + rows with `ButtonUtility` play                                                                 |
| 18  | Quarterly presentations | `EmptyState icon={Tv}`                                                                                                                            |
| 19  | Footer                  | `SiteFooter brand="fa"`                                                                                                                           |
| —   | Sticky stock bar        | Stand-in bar under the header (not in the system)                                                                                                 |

- **Components:** `SiteHeader`, `SiteFooter`, `CardHeader`, `PeriodSelector`, `Tabs`, `NativeSelect`, `Carousel`,
  `ButtonGroup`, `Button`, `ButtonUtility`, `Badge`, `BadgeWithDot`, `Toggle`, `Avatar`, `Table`, `PaginationCardDefault`,
  `EmptyState`, `notify` (toaster mounted in the story decorator), chart helpers `ChartTooltipContent` /
  `ChartLegendContent`. All imported by package path.
- **Patterns from the skill:** page frame and 1376 px width, card grid on 6 columns (⅔+⅓, ⅓×3, ½+½), card with a
  header, change value, live indicator, filter chips, news feed item, key-figure list, label over value, signals
  as badges, link tabs.

## Stand-ins (no component, no Figma frame)

- Real-time banner, sticky compact stock bar, key-data grid, news feed item, filter chips (`ButtonGroup`), change
  value, live indicator.
- Order book levels with proportional bars (`bg-fg-success-secondary` / `bg-fg-error-secondary`, width inline).
- Recommendation mini-visualizations: 1–5 scale and target-price range as a `bg-quaternary` track with dot markers;
  history as four label-over-value cells.
- Video player: 16:9 `bg-tertiary` placeholder with a play icon.

## Placeholders

All figures are invented and need real data: NAS price 18,46, change +0,38 (+2,10%), period returns, key data
(open, high, low, bid, ask, volume 6.482.117, turnover 119,4 M, market cap 19,5 mrd, P/E 7,84, EPS 2,35, report
dates), the price series (generated), revenue and operating result, order book, key figures (ISIN is NAS's real
one, NO0010196140; shares 1.056.412.830 is invented), dividends, recommendations, target prices, technicals,
volume comparisons, trades, calendar, reports, earnings calls, news items and video titles. "Levert av Infront"
is a placeholder data-vendor credit.

## Patterns

**New patterns**

- **Real-time strip** above the page: status badge, sentence and a `Toggle` in a slim card row.
- **Sticky compact stock bar** under the collapsed header (name, ticker, price, change, Watchlist).
- **Instrument title line:** `h1` name (ticker), price in `text-display-sm`, change value, action on the right,
  status line under it. The skill has no "instrument header" pattern.
- **Order book:** two mirrored columns with proportional bars and side totals.
- **Scale with marker** (1–5 recommendation, target-price range) and a **quarter history row**.
- **Upcoming item highlight** at the top of a list (reports, earnings calls) as an inset with a "Kommende" badge.
- **Chart toolbar** (+ / fullscreen) above a chart, outside the `CardHeader`.

**Clashes**

- **Instrument profile shell vs brief:** `page-patterns.md` says header band (level 1) with underline tabs; the brief
  puts the stock header in a ⅔ card beside a video card and the tabs between two card grids. Followed the brief.
- **Tabs:** `tabs-mobile` switches to `NativeSelect` below `md`; with 12 tabs the underline list doesn't fit until
  `xl`, so the select shows below `xl`.
- **Key-data labels:** brief wants small uppercase grey labels; layout.md says uppercase only for table headers.
  Followed layout.md (`text-xs font-medium text-tertiary`).
- **Thousands separator:** brief says period (`1.234`); now the system format too (`Num` / `formatNumber`), so no clash.
- **News card:** brief scrolls the list inside a fixed-height card; `layout-equal-height` says show a limited
  number of rows. Showed 5 rows plus pagination. Thumbnails dropped (no images).
- **"Upcoming" highlight:** brief uses a light red tint; no token means "upcoming" and red reads as negative. Used a
  neutral inset plus `Badge color="brand"`.
- **Financial calendar icon in the title:** `card-header-always` forbids an icon before the title. Left out.
- **Tables inside cards:** `card-header.md` says a table card uses `TableCard.Header`, while page-patterns shows a
  card with `CardHeader`. Used the card + `CardHeader` + `Table` so every card on the page has the same surface
  (`TableCard.Root` is `bg-primary` with a shadow ring, not the layout card).
- **Small tables on mobile:** kept the 2–3 column tables below `md` instead of the list-and-sheet pattern; they fit.
- **Flash on change:** not built (`fa-no-invented-effects`); the brief's flash green/red has no token or motion
  preset. Live figures roll their digits through `Num` instead (see Figures).

## Figures

Every figure renders with `Num` (JSX) or `formatNumber` (chart ticks and tooltips); the page's own `nb` / `int` /
`pct` helpers on `Intl.NumberFormat("nb-NO")` are gone. `Change` keeps its colour-by-sign span and renders `Num`s
inside. Dates still use `toLocaleDateString("nb-NO")`.

**Live (prototype data):** `useMockTicks(stock.last)` is called once in `StockPage`; the day's change and percent are
derived from it, so they always agree. Ticking: the header price and change, the sticky bar's price and change, the 1D
change in the period selector and the "NAS er opp … i dag" line, bid (last − 0,02) and ask (last), day high/low
(widen when the price passes them), market cap (shares × last), and "Nå" plus the upside to the median target in
Anbefalinger. Static: key figures, longer periods, the price chart series, order book, trades, technicals, news.

**`live` (30 Oct):** the last price (header, sticky bar, recommendations "Nå"), Kjøper/Selger and Høy/Lav are `live`. Changes, the 1D period change and market value aren't (num.md).
