# 05 Bjellesauer: notes

Prototype of the big-investor trades page ("Bjellesauer") built from the brief only. Files:
`05-bjellesauer.tsx` (the page, `BjellesauerPage`, prop `isSubscriber`) and `05-bjellesauer.story.tsx`
(Desktop, Mobile, Teaser Desktop, Teaser Mobile). Not looked at in Storybook (the task said not to
start it), so the light and dark, mobile and desktop look is unverified; `tsc` and `eslint` pass.

## Components used

| Component                                                                                            | Path                                                                       | Where                                                                                     |
| :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `SiteHeader` (with ticker, `user` only when signed in)                                               | `components/application/site-header/site-header`                           | Page frame, Børs marked current                                                           |
| `SiteFooter`                                                                                         | `components/application/site-footer/site-footer`                           | Page frame                                                                                |
| `Tabs` (`underline`) + `NativeSelect` below `md`                                                     | `components/application/tabs/tabs`, `components/base/select/select-native` | Siste handler / Investorer / Vinnere og tapere                                            |
| `TableCard.Root` / `TableCard.Header`, `Table` (`size="sm"`, controlled sorting, `renderEmptyState`) | `components/application/table/table`                                       | Trades table, investors table, teaser table                                               |
| `PaginationCardDefault`                                                                              | `components/application/pagination/pagination`                             | Under the trades table (10 per page)                                                      |
| `Select.ComboBox`                                                                                    | `components/base/select/select`                                            | Filter by stock, filter by investor                                                       |
| `ButtonGroup` / `ButtonGroupItem`                                                                    | `components/base/button-group/button-group`                                | Period 1D … Alle from `md`                                                                |
| `NativeSelect`                                                                                       | `components/base/select/select-native`                                     | Period and sort order below `md`, tab switcher below `md`                                 |
| `DateRangePicker` in `AriaI18nProvider locale="nb-NO"`                                               | `components/application/date-picker/date-range-picker`                     | Custom date range, draft/commit via `onApply`/`onCancel`                                  |
| `Button` (`secondary` download, `link-gray` reset, `primary` subscribe, `link-color` login)          | `components/base/buttons/button`                                           | Card header slot, filter bar, newsletter, paywall                                         |
| `Badge` (`brand`, `pill-color`, `sm`)                                                                | `components/base/badges/badges`                                            | Ticker badge                                                                              |
| `Avatar` (initials) + `getInitials`                                                                  | `components/base/avatar/avatar`, `.../avatar/utils`                        | Investor pictures                                                                         |
| `FeaturedIcon` (`light`)                                                                             | `components/foundations/featured-icon/featured-icon`                       | Widget card headers, paywall box                                                          |
| `EmptyState`                                                                                         | `components/application/empty-state/empty-state`                           | Table body when filters return nothing                                                    |
| `Input`                                                                                              | `components/base/input/input`                                              | Newsletter e-mail                                                                         |
| Icons from `fa-icons`                                                                                |                                                                            | `ArrowUp`, `ArrowDown`, `Clock`, `Download`, `Lock`, `Mail`, `Restart`, `Search`, `Users` |

## Composed myself (no Figma component)

- **Change value** (`ChangeValue`, `RelativeChange`): the page-patterns stand-in, `Intl` nb-NO with
  `signDisplay: "exceptZero"`, so buys read `+400 000` and sells `−1 250 000` (sign carries the
  meaning; color is extra). A holding with no previous position would show "Ny post".
- **Mobile trade row**: nine values per trade don't fit 375 px as columns. Below `md` the table shows
  two columns. The row header cell stacks investor name, ticker badge + company, and "date ·
  executing company"; the "Endring" cell stacks shares change, relative change, value, ownership and
  holding. The other seven heads/cells are `hidden md:table-cell`. A mobile-only "Sorter etter"
  `NativeSelect` drives the same `sortDescriptor`, because the hidden heads can't be tapped.
- **Period selector**: the brief's nine periods in a `ButtonGroup` from `md`, a `NativeSelect` below
  `md`. Picking a period also sets the `DateRangePicker` value; applying a custom range deselects the
  period ("Egendefinert" in the native select).
- **Widget cards** for winners and losers (FeaturedIcon `success`/`error`, `text-lg` title, ranked
  `ol` with `border-b` rows), per the widget card stand-in.
- **Paywall box** for the logged-out teaser: three latest trades in the table, then a centered
  block with a lock FeaturedIcon, title, price line, `primary` "Bli abonnent" and "Logg inn" link.
  Filters, sorting, tabs, investor links and download are not shown to logged-out readers.
- **Investor link and ticker link**: plain `<a>` with the focus-ring classes (`outline-focus-ring
focus-visible:outline-2 …`). The ticker link wraps the `Badge`.
- **Newsletter card** (⅓) and **Om dataene** card (⅔, inclusion rules + disclaimer) at the bottom.
- **Page title block**: h1, lead, and "Siste data mottatt: 26.10.2026 · Oppdateres hver natt ca.
  kl. 23.00 … (T+2)" as a meta line with a `Clock` icon.

## Patterns

**New patterns**

- _Responsive "stacked cell" table_: on mobile, hidden columns' values are folded into the visible
  cells (row header cell and the main numeric cell) instead of being dropped. page-patterns.md only
  says "Fewer columns; ticker stacked over name" for data tables; it doesn't say what happens to the
  dropped values, or to sorting by them. Used in the trades table.
- _Mobile sort select_: a `NativeSelect` that mirrors the table's `sortDescriptor` below `md`.
- _Period selector + date range together_: preset periods and a custom range on the same filter,
  kept in sync. The period-selector pattern only covers chart periods with a change under each label.
- _Filter bar inside a `TableCard`_, between `TableCard.Header` and the table, separated by
  `border-b border-secondary`.
- _Paywall teaser over a truncated table_ (rows shown, then the paywall box inside the same card).
- _Meta line with an icon_ ("Siste data mottatt …" with `Clock`) under the h1.

**Clashes**

- `TableCard.Root` is `rounded-xl bg-primary shadow-xs ring-1 ring-secondary`; layout.md's card is
  `rounded-2xl border border-secondary bg-primary_alt` with no shadow (**layout-no-card-shadow**). So
  table cards and the widget cards on the same page have different radius, surface token (dark mode
  differs: `bg-primary` vs `bg-primary_alt`) and a shadow. I used `TableCard` (component wins per
  anti-patterns.md) and plain cards elsewhere.
- Table header labels: page-patterns.md says `text-xs font-medium uppercase tracking-wide
text-quaternary`; `Table.Head` renders `text-xs font-semibold text-quaternary`, not uppercase. I
  kept the component.
- Row hover: layout.md says `bg-primary_hover`; `Table.Row` uses `hover:bg-secondary` and
  `transition-colors` (not bare `transition`, so it bypasses the 0 ms convention only by name; the
  tokens still resolve it).
- `TableCard.Header` has its own title type (`text-md font-semibold`) while widget cards use
  `text-lg font-semibold`. Two card title sizes on one page.
- ButtonGroup rule says 2–6 options, otherwise `Select`; the brief requires nine periods. I kept a
  ButtonGroup on desktop (fits) and a native select on mobile, i.e. two controls for one state.
- The period labels "1Y", "3Y" and "YTD" come from the brief; the button-group page's example uses
  Norwegian "1Å", "5Å" and suggests "I år". Kept the brief.

## Rules bent

- `className="[&>div]:justify-end"` on numeric `Table.Head`s, to right-align the label (and the sort
  arrow) with right-aligned numbers ("each column header aligned with its column"). It's alignment,
  not color or size, but it reaches into the component's inner markup.
- **fa-links**: investor names and ticker badges are hand-made `<a>` links (with the focus-ring
  classes and `hover:underline`), not `Button href`. `Button color="link-gray"` would set its own
  type and color and doesn't read as the "name over identifier" pairing.
- Two `primary` buttons can be on screen in the teaser (paywall "Bli abonnent" and newsletter
  "Abonner"); they're in different sections.
- `max-w-container` (1280 px) chosen for the main width; the skill leaves width open.

## Placeholder data to replace

- Every trade except the two in the brief (Tveitereid NOD, Fredriksen NAS) is invented: dates,
  share counts, holdings, ownership, values. For Fredriksen NAS the holding (149 102 300), relative
  change and executing company ("Geveran Trading Co. Ltd") are invented; the brief only gives
  change, value and ownership.
- Investors are real people. Their executing companies, portfolio values, number of positions and
  "I år" returns (winners/losers) are invented. Winners/losers is fixed to "hittil i år" and doesn't
  follow the period filter.
- No investor photos: `Avatar` shows initials. Real photos need `src` + `alt=""`.
- Inclusion rules (1 MNOK / 0,1 prosentpoeng, exclusions) and the disclaimer text are invented.
- Price "Bli abonnent fra 99 kr første måned", newsletter time (07.00), ticker bar values, footer
  publisher lines, social and app URLs, `/bjellesauer/...` and `/aksje/...` hrefs, CSV export URL.
- "1D" is approximated as the last four calendar days before the data date.

## Where the skill was unclear, contradictory or missing something

1. **Table card vs. layout card** (see Clashes): which one is right for a data page? page-patterns
   says the Bjellesauer shell is "One card with filters on top and the `Table`", but `TableCard`
   doesn't follow the card surface.
2. **Mobile data tables**: no guidance for a table with many values per row on a phone beyond
   "fewer columns". Nothing on folding values into cells, expandable rows, or sorting by hidden
   columns. This brief explicitly asks for mobile-first with nine values, so this was the biggest gap.
3. **Links inside table cells**: the ticker badge "always a link" but `Badge` has no `href`, and
   there's no guidance on how to wrap it (or a name) as a link inside a React Aria grid cell.
   Unclear whether `Table.Row href` / `onRowAction` should be used for "open an investor's
   portfolio" instead.
4. **Right-aligned numeric headers**: table.md says numbers right-aligned and layout.md says headers
   align with their column, but `Table.Head` has no `align` prop; `className` lands on the `th` while
   the label sits in an inner flex `div`.
5. **Hard-coded English** I couldn't avoid: `PaginationCardDefault` ("Previous", "Next"),
   `DateRangePicker` presets ("Today", "Last week" …), footer buttons ("Cancel", "Apply") and its
   dialog `aria-label` default. Visible on a Norwegian page.
6. **More than six periods**: the button-group rule says use `Select`, the period-selector pattern
   says keep a `ButtonGroup` on one row below `md`. Neither fits nine periods on 375 px.
7. **Teaser / paywall**: the paywall-box pattern describes sign-in `SocialButton`s and "Fortsett med
   e-post", which suits a login wall, not an in-page teaser for a subscriber feature. No guidance on
   how much data a teaser may show or whether to fake a fade (blur/gradient are rejected).
8. **Buy/sell signal**: no guidance on whether to add a KJØP/SALG badge next to the signed value;
   layout.md's signals (KJØP / NØYTRAL / SELG) are analyst recommendations, not trades. I relied on
   the sign only.
9. **Number formats**: nothing on million abbreviations ("67,88 M NOK" vs "67,9 mill." vs "MNOK"),
   or on how many decimals an ownership share should show (the brief has both 1,00109 % and 14,32 %).
10. **Date picker in a filter bar**: no label prop (`DatePicker` "is a button with no label"), so it
    sits unlabeled next to labelled ComboBoxes; alignment with labelled fields is left to the page.
11. **"Sist oppdatert" meta under an h1**: no pairing in layout.md for a page-level data freshness
    line; I used the meta style (`text-xs font-medium text-tertiary`).
12. **Dark mode**: the skill doesn't say whether `Table.Header`'s `bg-secondary` band on a
    `bg-primary` `TableCard` and the `bg-primary_alt` widget cards next to it look consistent; not
    checked visually.

## Possible library bugs seen while reading (not changed)

- `Table.Row` uses `transition-colors` rather than bare `transition` (CLAUDE.md convention).
- `DateRangePicker` computes `now` presets at module scope (real today), so presets don't respect a
  data date like 26.10.2026, and labels are English.
- `Select.ComboBox` defaults to the English placeholder "Search" and shows "⌘K" unless
  `shortcut={false}`.
