# Bjellesauer – Siste handler

**Prompt:** `/Users/mihovil/Desktop/insider-trades-brief.md` (the "Latest trades" view only; the sibling
views exist as link tabs). Brand `fa`, Norwegian copy, invented investors.

- **Shell:** "Data table (Aksjer, Bjellesauer)" from `page-patterns.md`: one card with the filters on
  top and the `Table`, page width 1376 px, `px-4 md:px-8`. Below `md` the table becomes two-column
  rows that open a `Modal` sheet ("Data table on mobile").
- **Components:** `SiteHeader` (brand `fa`, Bjellesauer `current`, sticky,
  `onSearchPress` opens a search `Modal`), `SiteFooter`, `Breadcrumbs`, `FeaturedIcon`, `Tabs`
  (link tabs, `underline`, `sm`) with `NativeSelect` below `md`, `Button` (secondary "Last ned",
  link-color "Les mer om metoden", link names in cells, icon-only prev/next), `MultiSelect` ×2,
  `DateRangePicker`, `PeriodSelector`, `Table` (`size="sm"`, every column sortable, default Verdi
  descending), `Avatar` (initials), `Badge` ("Solgt ut"), `PaginationCardAdvanced`, `EmptyState`,
  `Modal` / `ModalHeader` / `ModalBody`, `Input`. All imported by package path.
- **Stand-ins:**
    - Change value: coloured `span` (`Signed`) for change in shares and relative change.
    - Instrument cell for the stock column (logo initials, name over ticker), not the brief's ticker pill.
    - Section mascot (sheep's head): `FeaturedIcon icon={Users}`; no mascot or illustration exists.
    - "Read more" disclosure: `Button color="link-color"` with `aria-expanded` toggling a hidden block;
      no disclosure/accordion component.
    - Date range stepping arrows: two icon-only `Button`s beside `DateRangePicker`; the picker has no
      arrows.
    - Loading skeleton: `bg-tertiary` blocks in table rows and mobile rows (no skeleton component).
    - "Executed by" column folded under the investor name (name over identifier) to fit the table.
    - "Viser 1–38 av 38 · Siste data mottatt" line in the filter bar (pagination has no such text).
    - CSV export of the filtered and sorted rows (semicolon-separated).
- **Placeholders:** all investors, holding companies, trades, values, holdings and ownership
  percentages are invented. Dates: latest trade 23.10.2026, data received 27.10.2026. Newsletter,
  investor, stock, app store and social links are guessed URLs.

## Patterns

**New patterns**

- Filter bar inside the data-table card: two `MultiSelect`s, a vertical divider, date range with
  prev/next arrows, period presets, and a meta line on the right (count + "Siste data mottatt").
  No reference file describes a filter bar or its layout.
- Period presets as a filter for a table, not a chart (`PeriodSelector` outside a chart).
- Date range stepping (prev/next by the range's own length).
- Link inside a table cell (investor name, company name) as `Button` link colours.
- Intro block on the page background: `FeaturedIcon` + `h1` + `prose` description + disclosure.
- Name over identifier with the entity in `text-xs` under a person (investor / holding company).
- "Solgt ut" status badge replacing a zero holding.

**Clashes**

- `PeriodSelector` rule `period-selector-under-chart` (only under a chart) vs the brief's period
  chips in a filter bar. Used `PeriodSelector` anyway; ids limited to `PERIODS`, so the brief's
  `1W` became `5D` and `ALL` is missing.
- `page-patterns.md` "Filter chips": dropdown chips are a `Dropdown` + `Button sm` + count `Badge`;
  the brief needs search inside, so `MultiSelect` (shows "2 valgt" text in a field, no badge).
- `page-patterns.md` table header labels say `font-medium uppercase tracking-wide`; `Table.Head`
  renders `text-xs font-semibold` without uppercase. Added `uppercase tracking-wide` via `className`.
- Brief: sticky investor column with horizontal scroll on mobile; skill: no sideways scroll, list +
  sheet below `md`. Followed the skill; columns also drop by width (`Rel. endring` from `lg`,
  `Ny eierandel` from `xl`, `Ny beholdning` from `2xl`).
- Brief: ticker pill in the stock column; skill: instrument cell in tables. Followed the skill.
- Brief: rows ~40 px; `Table size="sm"` rows are 56 px.
- Brief: period as thousands separator ("1.256.050"), "M" for millions. Resolved: the decided
  format is now the brief's (dot thousands, comma decimals, no space before `%`); "mill." kept.
- Brief: pill search with AI sparkle in the header; `SiteHeader` has its own search field.

## Figures (2026-10-29)

Every figure now goes through the library: `<Num>` in JSX (share changes, relative change,
value in mill., new stake, new holding, the "Viser x–y av z" counts, the sheet), `formatNumber`
where only a string fits (CSV export, the "n valgt" count). The page's `Intl.NumberFormat("nb-NO")`
helpers are gone, which also fixes the space before `%` and the real minus sign. New stake keeps
2 to 4 decimals, as many as it needs. Nothing ticks: every figure is a
historical trade.
