# Page patterns

How a Finansavisen, Kapital or Motor page is built, from the live site (October 2026): the frame
every page sits in, the page widths, the surface levels, how cards are arranged, how two pieces of
text are paired, which shell each page type uses, and the recurring patterns on those pages. The
measurements are kept in the library repo, not in the package.

Patterns marked **no component yet** have no library component or Figma main component: build the
stand-in from library parts as shown, and say in your reply that it has no Figma component yet.
Don't turn a stand-in into a new shared component on your own.

> **Decided:** cards have a border, three page widths, and a 16 px gutter on mobile (the MUST rules
> below). **Everything else is flexible:** it describes what the pages do today. Follow it by
> default, but when a design or an existing page does something else, follow the design and say so
> in your reply (see "Redesigning an existing page" in `SKILL.md`).

## The frame every page sits in

```tsx
<div className="min-h-dvh bg-secondary_alt">
    <SiteHeader brand="fa" className="sticky top-0 z-30" tickerItems={ticker} user={user} onSearchPress={openSearch} />
    <main className="mx-auto w-full max-w-[1376px] px-4 py-6 md:px-8">{/* page content */}</main>
    <SiteFooter brand="fa" />
</div>
```

- The page background and the cards follow the surface levels in "Surfaces" below; `main` takes
  one of the three widths in "Page width".
- Navigation, shortcuts, the Meny panel and the footer content are the publication's defaults
  (`siteContent[brand]`, see [site-header](components/site-header.md)); don't pass them unless the
  page has its own. To mark the current section, map over `siteContent[brand].navigation`.
- One `SiteHeader` and one `SiteFooter` per page, with the same `brand`. An article takes the brand
  of its publication (a Kapital article shows `brand="kapital"`).
- One `h1` per page.

## Page width

The main content has one of three widths on desktop, centered. Below the width it's full width with
the gutter (`px-4 md:px-8`).

| Width   | Class             | Proposed for                                                         |
| :------ | :---------------- | :------------------------------------------------------------------- |
| 1376 px | `max-w-[1376px]`  | Front page and card-grid pages (Børs, Rapporter, instrument, Aksjer) |
| 1280 px | `max-w-container` | Logged-in app pages (MittFA, Watchlist, investor profile)            |
| 980 px  | `max-w-[980px]`   | One-column pages: feeds, Forum, Siste nytt, articles                 |

Ads may sit in the side rails beside a 980 px page; leave that space empty rather than widening the
content. The page-to-width mapping is proposed; follow the design when it says otherwise. 1376 and
980 have no token yet, hence the arbitrary values.

- **layout-mobile-gutter** MUST Keep a 16 px gutter on mobile (`px-4`), 32 px from `md`
  (`md:px-8`). Cards keep their radius and border at every width; they don't run edge to edge.
  Decided by the design owner.

## Surfaces

Every page is built from the same few layers. Each layer has one token pair that works in light
and dark mode.

| Level          | What                                                                                         | Classes                                                                |
| :------------- | :------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| 0. Page        | The background behind everything                                                             | `bg-secondary_alt`                                                     |
| 1. Header band | Optional white full-width band at the top of a profile page (name, price, key figures, tabs) | `bg-primary_alt border-b border-secondary`                             |
| 2. Card        | Where content lives                                                                          | `rounded-2xl border border-secondary bg-primary_alt`                   |
| 3. Inset       | A group inside a card (day tiles, a forum box inside an article)                             | `rounded-xl bg-tertiary p-3`, no border                                |
| Emphasis       | A card that has to stand out (Markedsnytt, a teaser on brand)                                | `bg-brand-solid` or `bg-primary-solid`, text and icons in `*_on-brand` |
| Overlay        | Modal, dropdown, popover, tooltip                                                            | Owned by the component; don't restyle                                  |

Why the `_alt` pair: `bg-primary_alt` is white in light mode and switches to `bg-secondary` in dark
mode; `bg-secondary_alt` is gray in light mode and switches to `bg-primary` in dark. So the card
stays lighter than the page in both modes. The plain `bg-primary` card on a `bg-secondary` page
comes out darker than the page in dark mode.

What they resolve to:

| Level | Token              | Light     | Dark      |
| :---- | :----------------- | :-------- | :-------- |
| Page  | `bg-secondary_alt` | `#FAFAFA` | `#0C0E12` |
| Card  | `bg-primary_alt`   | `#FFFFFF` | `#13161B` |
| Inset | `bg-tertiary`      | `#F5F5F5` | `#22262F` |

There is no `Card` component yet; a card is a `section` with the level-2 classes. A card with a
`CardHeader` has no padding of its own: see "Card with a header".

Rules:

- **layout-card-border** MUST Give every card a `border-secondary` border, although the live site
  has none. Decided by the design owner.
- **layout-content-in-cards** SHOULD Put content (text, tables, lists, charts) in a card on the page
  background, not straight on the page. Page titles, breadcrumbs and filter rows above the cards
  are the exception.
- **layout-one-card-level** SHOULD Group inside a card with an inset, not with a second bordered card.
  Because that's how the live pages nest (the earning-call tiles on Rapporter), and two white
  bordered boxes blur together.
- **layout-no-card-shadow** SHOULD Separate cards with the gap and the border, not with a shadow.
  Shadows belong to overlays.
- **layout-card-dividers** SHOULD Separate rows inside a card with `border-b border-secondary`; the
  padding sits on the card (`p-4 md:p-5`), or on the body under a `CardHeader` (`px-4 py-5 md:px-6`),
  not on each row.
- **layout-reading-page** SHOULD Set article pages on a white page (`bg-primary_alt`); widgets
  inside the article are insets.
- **layout-emphasis-rare** SHOULD Use at most one or two emphasis cards per view.
- **layout-states** SHOULD Keep the components' own hover and selected fills: a table row hovers
  `bg-secondary` (what `Table.Row` renders); a selected row or chip `bg-active` or
  `bg-brand-primary_alt`. Because a second hover token per page is an untracked restyle.

Open (decide with the design owner): the live inset is `#F8F9F9`; `bg-tertiary` is `#F5F5F5`.

## Arranging cards

**Gap:** 24 px between cards and between rows, everywhere: `gap-6`.

### Page shells

Each page type uses one of the three arrangements below.

| Page type                                      | Layout                                                                                    | Below `lg`                           |
| :--------------------------------------------- | :---------------------------------------------------------------------------------------- | :----------------------------------- |
| Front page                                     | Main and sidebar: teaser stream ⅔, widget cards ⅓                                         | One column, sidebar under the stream |
| Market overview (Børs, Rapporter)              | Card grid, mostly ⅓ and ½ cards                                                           | Two columns from `md`, then one      |
| Instrument profile                             | Header band (name, price, chart, key figures, underline tabs), then the card grid         | Two columns from `md`, then one      |
| Investor profile                               | Header band (avatar, name, key figures), then stacked full-width table cards              | Stacked                              |
| Feed or discussion (Siste nytt, Forum, MittFA) | Main and sidebar, or one main card                                                        | One column                           |
| Data table (Aksjer, Bjellesauer)               | One card with filters on top and the `Table`                                              | Two-column rows; tap opens a sheet   |
| Article                                        | White reading page; header and image wider than the body text; embedded widgets as insets | One column with `px-4`               |

### Card grid (market and profile pages)

A 6-column grid. A card spans 2 (⅓), 3 (½), 4 (⅔) or 6 (full) columns:

```tsx
const card = "rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5";

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
    <section className={cx(card, "md:col-span-2 lg:col-span-4")}>{/* Siste nytt, ⅔ */}</section>
    <section className={cx(card, "lg:col-span-2")}>{/* Konsensus, ⅓ */}</section>
    <section className={cx(card, "lg:col-span-2")}>{/* Resultat og omsetning */}</section>
    <section className={cx(card, "lg:col-span-2")}>{/* Ordredybde */}</section>
    <section className={cx(card, "lg:col-span-2")}>{/* Nøkkeltall */}</section>
    <section className={cx(card, "lg:col-span-3")}>{/* Anbefalinger, ½ */}</section>
    <section className={cx(card, "lg:col-span-3")}>{/* Tekniske indikatorer */}</section>
</div>;
```

- **layout-full-rows** SHOULD Fill each row: ⅓+⅓+⅓, ½+½, ⅔+⅓, ⅓+⅔ or full. Don't leave a hole at the
  end of a row.
- **layout-equal-height** SHOULD Let cards in a row stretch to the same height (the grid default).
  When a card has more content than the row allows, show a limited number of rows and a "Vis mer"
  link instead of growing taller.
- Responsive: one column below `md`, two columns from `md` (every card takes half, full-width cards
  stay full), six columns from `lg`.

### Main and sidebar (reading and discussion pages)

Forum thread, MittFA, the front page: main content ⅔, sidebar ⅓.

```tsx
<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
    <div className="flex flex-col gap-6 lg:col-span-2">{/* main cards */}</div>
    <aside className="flex flex-col gap-6">{/* sidebar cards */}</aside>
</div>
```

- **layout-sidebar-context** SHOULD Keep only context in the sidebar (the instrument, quick links,
  related news), never the primary content. Main comes first in the markup, so below `lg` the
  sidebar falls under it.

### Stacked

Data pages and some profiles (an investor in Bjellesauer): full-width cards one under the other,
`flex flex-col gap-6`, usually under a header band.

## Pairing two pieces of text

The same pairings appear on every page. Use these instead of inventing a new arrangement.

| Pairing                    | Example                                                     | How                                                                                                                                              |
| :------------------------- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| Label over value           | "Åpne" / 7,20 · "Aksjer i porteføljen" / 20                 | Label `text-xs` or `text-sm` `font-medium text-tertiary`, value `font-semibold text-primary` under it. Label always first                        |
| Label and value on one row | Pris/bok 1Y ······ 3,59                                     | Label left, value right with `tabular-nums`; divider between rows; help tooltip on the label when it needs explaining                            |
| Meta over title            | 14:44 · DOFG · Børsmelding / DOF Group ASA – Sale of vessel | Meta `text-xs text-tertiary`, items separated by `·`; title under it                                                                             |
| Name over identifier       | Equinor / EQNR · Forumhai / 15:07                           | Name `text-sm font-medium text-primary`, identifier `text-sm text-tertiary` under it; an instrument adds its logo before (see "Instrument cell") |
| Heading with inline meta   | Siste nytt 23. okt 15:09 · Innlegg og svar (1.912)          | Heading, then the meta on the same baseline in a smaller `text-tertiary` style; counts in parentheses                                            |
| Value with its change      | 7,16 +0,03 (+0,42%)                                         | Value first, then the signed, colored change: absolute, then percent in parentheses                                                              |
| Card header, right slot    | → · "Last ned" · filter · sort dropdown                     | Up to three actions in `CardHeader`'s `actions`: sm icon-only `Button`s, or a labelled sm `Button` / `Dropdown` (see "Card with a header")       |

And:

- **Missing value:** "–" in a table cell. An empty table shows `EmptyState` ("Ingen data
  tilgjengelig") through `Table.Body`'s `renderEmptyState`, so the headers stay (`empty-state-in-table`).
- **Truncation:** names in tables end in "…"; excerpts are clamped to two lines (`line-clamp-2`);
  long posts end in "Les mer".
- **Alignment:** text left, numbers right, each column header aligned with its column.
- **Signals:** KJØP / NØYTRAL / SELG as `Badge` in `success` / `gray` / `error`, the same everywhere.

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

- Up to three actions on the right, as sm icon-only `Button`s (any hierarchy, at most one primary),
  or a labelled sm `Button` / `Dropdown` when the action needs words;
  never a `ButtonUtility` and never a tinted icon tile before the title. No subtitle line. A source
  credit ("Levert av Finwire") goes in the card body, not the header.
- Inside the card, group with an inset, not a second bordered card (`layout-one-card-level`, "Surfaces").
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
change followed by the relative one in brackets (`+0,03 (+0,42%)`). Always a colored `span` around
[`Num`](components/num.md), never a `Badge` or `BadgeWithIcon`. The span colours it by sign, so its `Num`s are never `live`.

```tsx
import { Num } from "fa-design-system/components/base/num/num";

/** `percent` in percent (0.42 for +0,42%), `value` in the instrument's currency. */
const Change = ({ percent, value }: { percent: number; value?: number }) => (
    <span className={cx(percent > 0 && "text-success-primary", percent < 0 && "text-error-primary", percent === 0 && "text-tertiary")}>
        {value === undefined ? (
            <Num value={percent} sign suffix="%" />
        ) : (
            <>
                <Num value={value} sign /> (<Num value={percent} sign suffix="%" />)
            </>
        )}
    </span>
);
```

- Norwegian number format, wherever a figure shows: a dot between thousands, a comma before
  decimals, a hyphen for minus, no space before `%`, and a plus on every positive change. Decimals
  follow the figure (prices and percentages usually 2, share counts 0, rates up to 4). The output
  is `+0,03 (+0,42%)`, `-1.234,50 (-2,10%)`, `0,00%`. Show prices and counts with `Num` too
  (`<Num value={1234.5} />` → `1.234,50`, `<Num value={60278} decimals={0} />` → `60.278`), and use
  `formatNumber` from `fa-design-system/utils/format-number` where only a string fits. Never
  `toLocaleString` or `Intl.NumberFormat` for numbers, which put a space between thousands.
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
(level 3 in "Surfaces") on the white reading page.

### Follow chips — no component yet

Pill with an avatar or logo, a name and a star toggle ("Simen Aas ☆", "Pareto Bank (PARB) ☆",
"Finans ☆") to follow a journalist, company or category. Stand-in: `Button color="secondary"
size="sm"` with the avatar as `iconLeading` and a star `iconTrailing`, `aria-pressed` for the state.

### AI prompt chips — no component yet

A label ("Investorchat:") followed by pill buttons that send a prompt ("Oppsummer nyheter",
"Analyser nøkkeltall"). Stand-in: `Button color="secondary" size="sm"` per prompt.

### Key-figure list

The "Label and value on one row" pairing in `text-sm`, with sub-rows indented. Stand-in: a
definition list (`dl`) in a card with a `CardHeader`.

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
