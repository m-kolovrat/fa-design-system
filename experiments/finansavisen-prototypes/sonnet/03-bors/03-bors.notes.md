# 03-bors (sonnet): notes

Files: `03-bors.tsx` (`BorsPage`, prop `loggedIn`), `03-bors.story.tsx` (Desktop, Mobile, Logged out desktop, Logged out mobile; title `Experiments/sonnet/03-bors`).
Checks: `npx tsc --noEmit -p .` and `npx eslint` clean for this folder. Storybook was not started, so the result has **not been looked at** in light/dark or at 375 px; layout problems below are predictions from reading the component source.

## Components used (all `@/components/...`)

- `application/site-header/site-header` (`SiteHeader` brand `fa`, ticker bar, `user` only when logged in, Børs `current`)
- `application/site-footer/site-footer` (`SiteFooter`)
- `application/table/table` (`Table`, no `TableCard`) in 8 cards
- `application/charts/charts-base` (`ChartTooltipContent`) with Recharts `AreaChart` per charts.md
- `application/empty-state/empty-state` (`EmptyState`: logged-out watchlist, empty news filter)
- `base/button-group/button-group` (market switch, period switch, news source filter)
- `base/badges/badges` (`Badge` ticker pill, `BadgeWithDot` live)
- `base/buttons/button`, `base/buttons/button-utility`
- `base/dropdown/dropdown` (switch watchlist)
- `base/input/input` (ticker search with `icon={Search}`)
- `base/avatar/avatar`, `base/avatar/avatar-label-group`
- `foundations/featured-icon/featured-icon` (widget card icon tile)
- `hooks/use-breakpoint`, `utils/cx`
- Icons from `fa-icons` only.

## Composed myself (no component)

All of these are stand-ins from page-patterns.md, so they have no Figma frame:

- Widget card (`WidgetCard`), card grid per layout.md (4+2, 4+2 with a stacked ⅓ column, 2+2+2, 4+2 with a stacked ⅓ column, 3+3, 2+2+2).
- Change value (`Change`), live indicator, ticker badge link, key figures (a `dl` in an inset), key-figure list (sectors), news feed item, company row.
- `DataTable`: a generic wrapper that turns a column config into `Table` + sorting state. App-level wrapper, library table inside is untouched.
- Börsmorgen TV: a poster inset (`aspect-video rounded-xl bg-tertiary`) with a "Live" dot and "Se live" button. The skill says video player has no stand-in and to ask before building; I built only a link poster, not a player, because I could not ask. It needs a decision.
- Period selector: plain labels in `ButtonGroup` (see skill gaps).

## Patterns (skill section)

New patterns (nothing in references describes them):

1. **Stacked ⅓ column inside the card grid**: a `flex flex-col gap-6` wrapper that takes `lg:col-span-2` and holds two cards (TV + Sektorer; Hot stocks + Nye ekstremkurser). Needed so ⅔ cards with long content don't leave holes next to short cards. layout.md only shows single cards per span.
2. **Table flush to the card edge**: `-mx-4 -mb-4 md:-mx-5 md:-mb-5` so the Table header band reaches the card border. Neither layout.md nor table.md says how `Table` sits in a widget card (it says `TableCard` or `Table` without card).
3. **Market switch row above a hero card** (ButtonGroup of markets, live/delayed status on the right).
4. **Delayed vs live data notice**: "Kurser forsinket 15 min · 14:10" versus the `Live` dot + time. Same slot, two states, depends on login/real-time.
5. **Disabled filter for logged-out users** ("Min watchlist" item `isDisabled` + one line of help text).
6. **Ranked table with an "add to watchlist" star column** (`ButtonUtility icon={Star}` per row, logged-in only).
7. **Two-sided inset card** (Nye ekstremkurser: all-time high and all-time low as two insets in one card, each with a small direction arrow in its heading).

Clashes:

1. **Sign vs. visual**: the brief wants rises/falls readable by sign. `Change` prints the sign, but `TickerBar` shows only an arrow and "Opp/Ned" for sr-only, with the sign in the string I pass. I passed `+0,11%` / `−0,04%` (the demos pass unsigned values for up). Skill says "pass formatted strings"; it doesn't say whether the sign belongs in them.
2. **Chart colour vs. neutral change**: charts.md says `text-utility-success-600`/`error-600` for up/down. Hovedindeksen is −0,04 %, so the line is red although the day is effectively flat. There is no neutral direction rule.
3. **Period selector**: page-patterns.md says each period shows its change under the label. `ButtonGroupItem` at `sm` is 36 px high and has no two-line layout, and button-group.md says labels should be 1-2 words. I show only the labels and print the selected period's change above the chart. Two sources disagree.
4. **Table cell padding vs. ⅓ cards**: `Table.Cell`/`Head` have fixed `px-6`. In a ⅓ card or at 375 px that leaves little room (3 columns × 48 px of padding). `table-no-restyle` forbids changing it. I hide the company name below `md` and secondary columns with `hidden md:table-cell`.
5. **Row height**: `Table size="sm"` rows are 56 px (`h-14`). The brief is "number-dense, mobile first"; 5 rows ≈ 280 px. No denser size exists.
6. **Right-aligned headers**: `Table.Head` has no `align` prop. I used `className="[&>div]:justify-end"` (targets the internal group), which is a hack at the edge of `table-no-restyle` (layout only, but it reaches into the component's DOM).
7. **layout-equal-height vs. long tables**: Indekser (11 rows) is 4 columns wide and tall; its row partner is a stacked column. The "limit rows + Vis mer" rule would conflict with the brief requiring all eleven instruments visible.
8. **Mobile gutter**: kept `px-4` and rounded bordered cards as layout.md says; the live Børs apparently does the same, no clash, but the open question about edge-to-edge cards remains.
9. **Hover/row links**: `Table.Row` has hover `bg-secondary` but rows aren't links, only the ticker is (hand-made `<a>` with the focus-ring classes, see "Bent rules").

## Rules bent

- **fa-components-first / anti-hand-built** (mild): ticker links, instrument names and news headlines are plain `<a>` with the focus-ring classes (`outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2`). `Button color="link-gray" href` would give a 36 px-high padded button and would break inside table cells and the news meta line. fa-links covers "standalone action links" only; there is no rule for links to entities inside cells.
- **fa-layout**: `lg:col-span-4/2` etc. follow it; the stacked column (Pattern 1) is my addition.
- **table-no-restyle**: the header alignment class (clash 6) and negative margins on the wrapper.
- **charts**: `YAxis hide` on mobile instead of `useBreakpoint` swapping the legend (no legend, one series).
- **One primary button per view**: the header's "Kjøp" is primary (brand fill), "Se live" in the TV poster is a primary `Button`, and the logged-out watchlist `EmptyState` has a primary "Logg inn". That is three primaries (the header one is a fixed override). Acceptable by section (`SHOULD`), but "Se live" could be secondary.
- The `h1` page title is `text-display-xs md:text-display-sm`; layout.md has no page-title spec.

## Placeholder data that needs replacing

All numbers except those in the brief (Hovedindeksen 2 124,29, −0,04 %, 14:10; Techstep +15,62 %; Proximar Seafood −89,19 %) are invented:

- Index/commodity/FX values and YTD figures (OBX, Dow Jones, S&P 500, NASDAQ, Brent, gull, EURNOK, USDNOK, Bitcoin, US 10Y, VIX), the ticker bar.
- Sverige/Danmark/USA index levels and all period changes; the chart series are generated by a seeded random walk that ends on the stated value (`buildSeries`), not real history.
- Tickers/names for Techstep (TECH) and Proximar (PROXI) are guesses; all other winners, losers, most-traded, hot stocks, shorted (share, value, days to cover), all-time highs/lows, sector changes, dividends, calendar items, reports and webcasts, news headlines/excerpts, source/time/ticker.
- Watchlist holdings, shares, "Porteføljeverdi", the watchlist names "Langsiktig"/"Trading", user initials "NK".
- "Børsmorgen med Hanne Skaar" and "hverdager 08:30" in the TV card (host name and time are made up).
- Hrefs (`/aksje/{ticker}`, `/bors/...`) are guesses. Footer text is copied from the library demo.
- The 15-minute delay wording and the "sanntid" logic (`loggedIn` implies real-time) are assumptions.

## Skill: unclear, contradictory or missing

1. Page patterns/layout say a market page is "mostly ⅓ and ½ cards"; there is no guidance for a hero (⅔) with a chart, nor for stacking two cards in one column slot. I used ⅔ and a stacked column.
2. No guidance on how `Table` sits in a widget card (flush, padded, with or without `TableCard`). `TableCard` brings its own border and header, which would double the widget card's.
3. **No right-align/numeric column support** in `Table.Head` although table.md says numbers right-aligned with headers aligned (layout.md "Alignment").
4. **Table density** (row height, cell padding) is fixed; fine for ranking lists, wrong for number-dense mobile.
5. **Video player**: Coverage gaps says "ask before building", but the brief asks for Børsmorgen TV and I can't ask. A decision rule for unattended runs is missing.
6. **Live/delayed**: a "Live indicator" exists but not its delayed counterpart, nor a rule for real-time vs delayed. Brief requires delayed unless real-time on.
7. **Change value**: stand-in prints percent only; the layout "Value with its change" pairing wants absolute + percent in parentheses. `Change` here takes an optional `absolute`. The stand-in should cover both. It also uses `Intl` percent format that yields a real minus (U+2212) and NBSP, which is probably right for Norwegian but isn't stated; the ticker bar demo uses plain `-`.
8. `fa-icons` exports: the skill lists icons only by example. I had to grep `fa-icons/dist/index.d.ts` to find that `Flame`, `Tv`, `GraphDown`, `Wallet` exist and that `Trophy`, `PieChart`, `Bank`, `Coins`, `Video`, `TrendUp` don't. An icon index in the skill would save the grep.
9. `Badge` pill for tickers: the skill says "Uppercase ticker, brand pill", but `Badge` renders as non-interactive; I wrapped it in `<a>`. Page-patterns says "always a link", with no example.
10. `ButtonGroup` in a horizontally scrolling wrapper (6 news filters, 7 periods): the skill gives no mobile treatment for filter chips beyond "stand-in `ButtonGroup`". I wrapped in `overflow-x-auto`, which clips the focus ring slightly.
11. The anti-patterns list "no-card-shadow"/"inset" fit, but nothing about nested sections at `md` where two cards are side by side and a third spans two columns (I used `md:col-span-2` on full-width third cards; the 2-column grid at `md` leaves the stacked columns/hero as full width, which is OK but undocumented).
12. `docs/figma-parity.md` was not consulted (not available through the skill path and I was told to read only the brief). The skill says "check the component in figma-parity before working" only in CLAUDE.md, which I can't act on from an app.
13. Storybook viewport usage in stories (`globals.viewport`) is not documented anywhere in the skill; I took it from `.storybook/preview` (Storybook 10 syntax).
14. Dark mode was not verified; all colours are semantic tokens, the chart uses `text-utility-*` classes.

## Possible library bugs / observations (not changed)

- `Dropdown.Item` requires `id`, and the menu `Dropdown.Item` with no `onAction` just closes; fine, but no demo shows a watchlist switch with selection state.
- `ChartTooltipContent` is documented with `formatter` returning a string; I couldn't check how it prints the series name for a single series.
