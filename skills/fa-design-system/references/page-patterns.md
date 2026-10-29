# Page patterns

How Finansavisen, Kapital and Motor pages are put together, from the live site (October 2026).
Patterns marked **no component yet** have no library component or Figma main component: build the
stand-in from library parts as shown, and say in your reply that it has no Figma component yet.
Don't turn a stand-in into a new shared component on your own.

Surfaces, grids and text pairings are in [layout.md](layout.md); this file covers what goes on
which page. Both are flexible for now: when a design or an existing page differs, follow it and
report the difference.

## The frame every page sits in

```tsx
<div className="min-h-dvh bg-secondary_alt">
    <SiteHeader brand="fa" className="sticky top-0 z-30" collapsed={isScrolled} tickerItems={ticker} user={user} onSearchPress={openSearch} />
    <main className="mx-auto w-full max-w-[1376px] px-4 py-6 md:px-8">{/* page content */}</main>
    <SiteFooter brand="fa" />
</div>
```

- The page background and the cards follow the surface levels in [layout.md](layout.md). The
  main width is 1376, 1280 or 980 px depending on the page type ("Page width" in layout.md).
- Navigation, shortcuts, the Meny panel and the footer content are the publication's defaults
  (`siteContent[brand]`, see [site-header](components/site-header.md)); don't pass them unless the
  page has its own. To mark the current section, map over `siteContent[brand].navigation`.
- One `SiteHeader` and one `SiteFooter` per page, with the same `brand`. An article takes the brand
  of its publication (a Kapital article shows `brand="kapital"`).
- One `h1` per page.

## Page shells

| Page type                                      | Layout ([layout.md](layout.md))                                                           | Below `lg`                           |
| :--------------------------------------------- | :---------------------------------------------------------------------------------------- | :----------------------------------- |
| Front page                                     | Main and sidebar: teaser stream ⅔, widget cards ⅓                                         | One column, sidebar under the stream |
| Market overview (Børs, Rapporter)              | Card grid, mostly ⅓ and ½ cards                                                           | Two columns from `md`, then one      |
| Instrument profile                             | Header band (name, price, chart, key figures, underline tabs), then the card grid         | Two columns from `md`, then one      |
| Investor profile                               | Header band (avatar, name, key figures), then stacked full-width table cards              | Stacked                              |
| Feed or discussion (Siste nytt, Forum, MittFA) | Main and sidebar, or one main card                                                        | One column                           |
| Data table (Aksjer, Bjellesauer)               | One card with filters on top and the `Table`                                              | Two-column rows; tap opens a sheet   |
| Article                                        | White reading page; header and image wider than the body text; embedded widgets as insets | One column with `px-4`               |

## Patterns

### Card with a header

The building block of Børs, Rapporter, instrument pages and the front page sidebar, and of any
other titled block of content: a card with a `CardHeader` ([card-header](components/card-header.md))
and a body under it. Not every card is a widget; the same card and header hold lists, charts and
plain page content.

```tsx
<section aria-labelledby="card-winners" className="overflow-hidden rounded-2xl border border-secondary bg-primary_alt">
    <CardHeader
        titleId="card-winners"
        title="Vinnere"
        actions={<Button color="secondary" size="sm" iconLeading={ChevronRight} href="/bors/vinnere" aria-label="Se alle vinnere" />}
    />
    <div className="px-4 py-5 md:px-6">{/* table, list, chart or text */}</div>
</section>
```

- Up to three actions on the right, as sm icon-only `Button`s (any hierarchy, at most one primary);
  never a `ButtonUtility` and never a tinted icon tile before the title. No subtitle line.
- Inside the card, group with an inset (`rounded-xl bg-tertiary p-3`), not a second bordered card.
- Anything that switches what the card shows (view, source, period of a table or bar chart): tabs
  in the body, `type="button-minimal"` `size="sm"`; they hug their content. Never a `ButtonGroup`
  inside a card.

### Data table

`Table` (or `TableCard`) with: the header labels `Table.Head` renders (`text-xs font-semibold
text-quaternary`, sentence case; don't restyle them), cells `text-sm`, numbers right-aligned with
`tabular-nums`, sortable headers (`allowsSorting`). Show each instrument as one cell: see "Instrument cell".

From `md` up, show every column with no sideways scroll. Below `md`, the table becomes a list: see
"Data table on mobile".

### Data table on mobile

Below `md`, the table becomes a list: each row shows only the key information, and tapping it opens
a sheet with the rest. Example: a Bjellesauer trade shows the investor and the company on the left,
the trade value and the change in shares on the right; the sheet shows the full transaction. The
sheet is `Modal mobile="sheet"`: a bottom sheet below `sm`, a centered dialog between `sm` and `md`.

- **Row, left:** what the row is about. Two columns may share it, one over the other (investor over
  company): the main one in `text-sm text-primary`, the second in `text-sm text-tertiary`.
  Logo or avatar before them when the table has one; an instrument is always the instrument cell.
- **Row, right:** the one or two key figures, one over the other (value over change), right-aligned
  with `tabular-nums`. The signed change is never hidden.
- **Labels:** one header line above the list names what each side holds, both values with a slash
  ("Investor / aksje", "Verdi / aksjer").
- **Sheet:** `Modal` with `mobile="sheet"`, titled with what the row is ("Transaksjon"). Inside, in
  this order: the key figure, larger, with its change; the related items (investor, company) as rows
  that link to their pages; then every other column as label-and-value rows; then the table's
  footnote, if it has one.

```tsx
const [selected, setSelected] = useState<Stock | null>(null);

<Table aria-label="Aksjer" className="max-md:hidden">{/* every column */}</Table>

<ul className="divide-y divide-secondary md:hidden">
    {stocks.map((s) => (
        <li key={s.ticker}>
            <AriaButton
                onPress={() => setSelected(s)}
                className="flex w-full items-center justify-between gap-4 py-3 text-left outline-focus-ring focus-visible:outline-2 focus-visible:-outline-offset-2"
            >
                <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm text-primary">{s.name}</span>
                    <span className="text-xs text-tertiary">{s.ticker}</span>
                </span>
                <span className="flex flex-col items-end text-sm">
                    <span className="font-medium text-primary tabular-nums">{s.lastLabel}</span>
                    <Change percent={s.change} />
                </span>
            </AriaButton>
        </li>
    ))}
</ul>

<Modal isOpen={selected !== null} onOpenChange={(open) => !open && setSelected(null)} mobile="sheet">
    <ModalHeader title={selected?.name} description={selected?.ticker} />
    <ModalBody>{/* <dl>: the other columns as label-and-value rows */}</ModalBody>
</Modal>
```

The `Modal` stays mounted and opens through `isOpen` (`fa-overlays-mounted`).

### Instrument cell

Wherever a company, fund or other instrument appears in a table, list or card row: its logo, the
full name on top and the ticker under it, in one column. Never separate columns for the ticker and
the name. This is Figma's table cell `Type=Avatar`. In a table it is `Table.Cell` props:

```tsx
<Table.Cell leading={<Avatar src={logo} alt="" size="sm" />} leadText="Equinor" supportingText="EQNR" />
```

In a list or card row, the same thing composed:

```tsx
<div className="flex min-w-0 items-center gap-3">
    <Avatar src={logo} alt="" size="sm" />
    <div className="min-w-0">
        <p className="truncate text-sm text-primary">Equinor</p>
        <p className="text-sm text-tertiary">EQNR</p>
    </div>
</div>
```

- The logo is the company's own (`Avatar` with `src`), or `initials` until a logo exists; `alt=""`
  because the name is right next to it.
- Mark the cell as the row header in a table (`isRowHeader` on its `Table.Head`, labelled "Aksje" or
  "Selskap"), and give that head `className="w-full"`: the name is one line and truncates to the
  column (rule `table-cell-width`).
- The avatar is `sm` (32px), matching Figma's table cell `Type=Avatar`, `Size=sm`.

### Ticker badge

```tsx
<Badge color="brand" size="sm" type="pill-color">
    EQNR
</Badge>
```

Uppercase ticker, brand pill. Always a link to the stock page when it's interactive. Use it inline
(meta lines, article tags), not as a table column: rows use the instrument cell.

### Change value — no component yet

A signed number colored by direction: the relative change alone (`+0,42%`), or the absolute
change followed by the relative one in brackets (`+0,03 (+0,42%)`). Always a colored `span`, never
a `Badge` or `BadgeWithIcon`.

```tsx
/** Norwegian number: a dot between thousands, a comma before decimals. `sign` adds + or - (for changes). */
const nb = (v: number, { decimals = 2, sign = false }: { decimals?: number; sign?: boolean } = {}) => {
    const rounded = Number(v.toFixed(decimals));
    const [int, frac] = Math.abs(rounded).toFixed(decimals).split(".");
    const prefix = rounded < 0 ? "-" : sign && rounded > 0 ? "+" : "";
    return `${prefix}${int.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${frac ? `,${frac}` : ""}`;
};

/** `percent` in percent (0.42 for +0,42%), `value` in the instrument's currency. */
const Change = ({ percent, value }: { percent: number; value?: number }) => (
    <span className={cx("tabular-nums", percent > 0 && "text-success-primary", percent < 0 && "text-error-primary", percent === 0 && "text-tertiary")}>
        {value === undefined ? `${nb(percent, { sign: true })}%` : `${nb(value, { sign: true })} (${nb(percent, { sign: true })}%)`}
    </span>
);
```

- Norwegian number format, wherever a figure shows: a dot between thousands, a comma before
  decimals, a hyphen for minus, no space before `%`, and a plus on every positive change. Decimals
  follow the figure (prices and percentages usually 2, share counts 0, rates up to 4). The output
  is `+0,03 (+0,42%)`, `-1.234,50 (-2,10%)`, `0,00%`. Use `nb` for prices and counts too
  (`nb(1234.5)` → `1.234,50`, `nb(60278, { decimals: 0 })` → `60.278`); never `toLocaleString` or
  `Intl.NumberFormat` for numbers, which put a space between thousands.
- Color follows the sign: green up, red down, `text-tertiary` for 0. The sign is always shown, so
  the color is never the only signal.
- Never color by hand with green/red palette classes; never drop the sign.

### Filter chips — no component yet

A row of pill toggles above a feed or table ("Alle", "FA", "TDN", "Børsmeldinger", "Min
watchlist"). Inside a card they switch the card's content, so they are tabs: `Tabs.List
type="button-minimal" size="sm"` with one `Tabs.Panel` around the list. Dropdown chips ("Kategorier",
"Marked 4") are a `Dropdown` with a `Button color="secondary" size="sm"` trigger and a `Badge` for the
count. Country chips add `<Flag name="norway-nok" />` (check the flag name in `fa-icons`).

### Period selector

Use `PeriodSelector` ([period-selector](components/period-selector.md)), directly under the chart
it controls. Periods, in this fixed order: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 3Y, 5Y, 10Y; pass only the
ones the chart has data for, optionally with each period's change.

### Live indicator — no component yet

`BadgeWithDot color="error"` with "Live" plus the timestamp in `text-xs text-tertiary`.

### News feed item — no component yet

Source logo (`Avatar size="sm"`), a meta line (time · ticker badge · category, `text-xs
text-tertiary`), a bold title (`text-sm font-semibold text-primary`), a two-line excerpt
(`text-sm text-tertiary line-clamp-2`), and an optional thumbnail on the right. Rows are separated by
`border-b border-secondary`.

### Company row

The instrument cell (logo, name over ticker or a meta line), plus a trailing action as an icon-only
`Button` (play, download). Several logos for one day overlap as a logo stack (see Coverage gaps in `SKILL.md`).

### Key figures — no component yet

Label above a large figure, several side by side in one card (Watchlist: Porteføljeverdi,
Gevinst/tap i dag, …). Label `text-xs font-medium text-tertiary`, figure `text-display-xs font-semibold`, the
change under it as a change value.

### Article teaser — no component yet

Image, kicker ("Oppgang på Oslo Børs:"), bold headline, optional label pill ("Mye lest",
"Børsoppdatering", "Pluss"), and a save button (`ButtonUtility icon={Plus}`). Some teasers sit on a
solid brand or dark fill with `text-primary_on-brand` headlines. Opinion teasers use a serif italic
headline, which has **no token yet**: report it rather than adding a font.
The headline is a plain `<a>` with the focus ring and `hover:underline` (rule `fa-links`); the save
button is the only `Button` in a teaser.

### Article header — no component yet

Label pill ("Meninger"), `h1` headline (news: bold sans, opinion: serif italic, see above), lead in
`text-display-xs font-medium text-tertiary`, tag chips (section, author, ticker with live price as a ticker badge plus
change value), "Publisert 14. okt. 11:06 | Oppdatert 14:13" in `text-xs text-tertiary`, and a
"Lagre i MittFA" button. Then the image with a caption ("FOTO: …"), then the byline
(`AvatarLabelGroup`: name and role) with "Tips meg" and share buttons (`ButtonUtility` with `Link`,
plus `SocialButton`s).

### Article body

Running text in the `prose` class, about 690 px wide on the live site. The live body is 18/30 while
`prose` sets 16/24: keep `prose` and mention the difference rather than overriding it. Subheadings `text-xl
font-bold`; quotes as bold body text; captions `text-sm text-tertiary` with the credit ("FOTO: …").
After the body, in this order: a "Legg til MittFa" follow card, related widgets (for example the
forum threads for the company), the AI-use note, and the comments section. Those boxes are insets
(`rounded-xl bg-tertiary p-3`, the inset from `layout.md`) on the white reading page.

### Follow chips — no component yet

Pill with an avatar or logo, a name and a star toggle ("Simen Aas ☆", "Pareto Bank (PARB) ☆",
"Finans ☆") to follow a journalist, company or category. Stand-in: `Button color="secondary"
size="sm"` with the avatar as `iconLeading` and a star `iconTrailing`, `aria-pressed` for the state.

### AI prompt chips — no component yet

A label ("Investorchat:") followed by pill buttons that send a prompt ("Oppsummer nyheter",
"Analyser nøkkeltall"). Stand-in: `Button color="secondary" size="sm"` per prompt.

### Key-figure list

Label left, value right, `text-sm`, rows separated by `border-b border-secondary`, a help tooltip
on labels that need one, sub-rows indented. Stand-in: a definition list (`dl`) in a card with a `CardHeader`.

### "NY" marker

`Badge color="error" size="sm"` with "NY", next to a navigation item or a widget title.

### Paywall box — no component yet

Centered card: "Bli abonnent fra 99 kr", one line of payment info, sign-in options as full-width
`SocialButton`s and a secondary "Fortsett med e-post" `Button`, and a "Har du allerede en konto?
Logg inn" link.

### Info message

`Alert color="brand"` with a title and a link ("Viktig melding – Nytt forum lansert").

### Empty and logged-out states

`EmptyState` with a heading, one line of text and one primary `Button` ("Lag watchlist",
"Logg inn"). MittFA's onboarding shows three illustrated cards above the button.
