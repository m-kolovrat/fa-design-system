# Page patterns

How a Finansavisen, Kapital or Motor page is built, from the live site (October 2026): the frame
every page sits in, the page widths, the surface levels, how cards are arranged, how two pieces of
text are paired, which shell each page type uses, and the recurring patterns on those pages. The
measurements are kept in the library repo, not in the package.

Patterns marked **no component yet** have no library component or Figma main component: build the
stand-in from library parts as shown, and say in your reply that it has no Figma component yet.
Don't turn a stand-in into a new shared component on your own.

> **Decided, never overridden by a page:** one 980 px content column, the page gutter, and the
> desktop ad slots. They're a contract with the ad setup, so a design that breaks them is reported,
> not followed. Only the design owner changes them (the front page's own layout is their call).
>
> **Decided, can be overridden:** the four card layouts and the page shells. Follow them by default.
> A frame the person gives you, or the person's own instruction, may do something else; then follow
> it and list it under **Clashes** in your reply's Patterns section (see "Redesigning an existing
> page" in `SKILL.md`). Never override them on your own judgement.
>
> **Also decided:** cards have a border. **Everything else is flexible:** it describes what the
> pages do today. Follow it by default, but when a design or an existing page does something else,
> follow the design and say so in your reply.

## The frame every page sits in

```tsx
<div className="min-h-dvh bg-secondary_alt">
    <SiteHeader brand="fa" className="sticky top-0 z-30" tickerItems={ticker} user={user} onSearchPress={openSearch} />
    <main className="mx-auto w-full max-w-[1028px] p-4 md:p-6">{/* page content, at most 980 px */}</main>
    <SiteFooter brand="fa" />
</div>
```

`max-w-[1028px]` is the 980 px column plus the 24 px gutter on each side. A page that shows ads
uses the frame in "Ads (desktop)" instead, which adds the ad slots around the same column.

- The page background and the cards follow the surface levels in "Surfaces" below; the content
  column is 980 px ("Page width").
- Navigation, shortcuts, the Meny panel and the footer content are the publication's defaults
  (`siteContent[brand]`, see [site-header](components/site-header.md)); don't pass them unless the
  page has its own. To mark the current section, map over `siteContent[brand].navigation`.
- One `SiteHeader` and one `SiteFooter` per page, with the same `brand`. An article takes the brand
  of its publication (a Kapital article shows `brand="kapital"`).
- One `h1` per page.

## Page width

- **layout-page-width** MUST Keep the page content in one centered column at most 980 px wide, on
  every page type except the front page (market and instrument pages, feeds, articles, logged-in
  pages; the front page keeps its own layout for now, see "Page shells"). The
  980 px is the outer width: the cards, their borders and their padding all fit inside it. Never
  widen the content into the margins; on desktop they belong to the skyscraper ads ("Ads
  (desktop)"). Below 980 px plus the gutter, the column is full width with the gutter. Because
  the ad layout is built around a 980 px column. Decided by the design owner (2026-11-19). 980 has
  no token yet, hence the arbitrary value.
- **layout-mobile-gutter** MUST Keep 16 px around the content on mobile, top and bottom included
  (`p-4`); from `md`, 24 px all round (`md:p-6`), the same as the space around the ad slots. Cards
  keep their radius and border at every width; they don't run edge to edge. Decided by the design
  owner.

The site header and footer keep their own, wider inner width; only the page content is 980 px.

## Ads (desktop)

Every Finansavisen, Kapital and Motor page carries ads in fixed places. The design system doesn't
ship ad components: the app's ad script fills the slots. A page built with the system only
**reserves the space** for each slot, and a demo or prototype **simulates** the ad in it (see
"Simulating an ad"). Each size below is the largest creative in that slot; a smaller creative is
centered in the same box, so the page never moves.

These rules are for desktop (from `lg`). Below `lg`, ads follow "Ads (mobile and tablet)".

- **ads-confirm-skyscrapers** SHOULD Check whether the page shows the skyscrapers before you build
  it: ask the person when you aren't sure (the front page, a page or design that has none, a page
  with a layout of its own), and say in your plan which way you went. When nobody says otherwise,
  follow these rules: they're the default. Because not every page has been checked against the ad
  layout yet.

| Slot        | Largest creative | Where                                                      | Space reserved                                 |
| :---------- | :--------------- | :--------------------------------------------------------- | :--------------------------------------------- |
| Top banner  | 980 × 300        | Above the content, full column width, on every page type   | Always 300 px high, 24 px above and below      |
| Skyscrapers | 300 × 600 each   | Left and right margins, outside the content column; sticky | The margins stay empty; scaled down, or hidden |
| Superboard  | 980 × 600        | Between sections, for example between two rows of cards    | 600 px high, 24 px above and below             |

### The frame with ads

```tsx
const showRails = "hidden min-[1344px]:flex"; // skyscrapers from 1344 px

<div className="min-h-dvh bg-secondary_alt">
    <SiteHeader brand="fa" className="sticky top-0 z-30" tickerItems={ticker} user={user} onSearchPress={openSearch} />
    <div className="mx-auto w-full max-w-[1028px] p-4 min-[1344px]:grid min-[1344px]:max-w-none min-[1344px]:grid-cols-[1fr_980px_1fr] min-[1344px]:gap-x-6 min-[1344px]:px-2 md:p-6">
        <div className="flex min-w-0 flex-col gap-6 min-[1344px]:col-start-2 min-[1344px]:row-start-1">
            <AdPlaceholder name="Top banner" size="980×300" className="h-75 w-full max-lg:hidden" />
            <main className="flex flex-col gap-4">{/* rows of cards; a superboard (`my-2`) sits between two rows */}</main>
        </div>
        <aside aria-label="Annonse" className={cx(showRails, "col-start-1 row-start-1 justify-end")}>
            <AdPlaceholder name="Skyscraper" size="300×600" className="sticky aspect-[1/2] w-full max-w-75 self-start" style={{ top: headerHeight + 24 }} />
        </aside>
        <aside aria-label="Annonse" className={cx(showRails, "col-start-3 row-start-1 justify-start")}>
            <AdPlaceholder name="Skyscraper" size="300×600" className="sticky aspect-[1/2] w-full max-w-75 self-start" style={{ top: headerHeight + 24 }} />
        </aside>
    </div>
    <SiteFooter brand="fa" />
</div>;
```

The content comes first in the markup and the rails after it, placed into the margins by the grid,
so a screen reader reaches the page before the ads. From 1344 px the grid is 8 px window edge,
rail, 24 px gap, the 980 px column, 24 px gap, rail, 8 px window edge; each skyscraper fills its
rail up to 300 px wide and keeps its 1:2 shape.

### Rules

- **ads-top-banner** MUST Reserve the top banner on every page type: a box the full width of the
  column (980 px) and always 300 px high (`h-75`), the first thing in the column, with 24 px above
  it (the page's top padding) and 24 px below it (the column's `gap-6`). Never collapse it when a
  smaller banner or no banner runs. Because the content must not jump when the ad loads or
  changes.
- **ads-skyscrapers** MUST Put the skyscrapers in the margins, outside the content column: 24 px
  from the column and at least 8 px from the window edge. They're sticky: their top lines up with
  the top of the top banner, and while the reader scrolls they stay 24 px under the sticky
  `SiteHeader` (`top` = the header's height + 24 px; measure the header, it differs by brand and
  breakpoint). Because they follow the reader down the page.
- **ads-skyscraper-scaling** MUST Scale the skyscrapers with the window, keeping the 1:2 shape:
  300 × 600 at full size (from about 1650 px: 980 + 2 × (24 + 300 + 8) = 1644), down to 50 %,
  150 × 300, at 1344 px (980 + 2 × (24 + 150 + 8)). Below 1344 px there's no room: hide them, and the
  page uses the normal gutter. Because the column never gives up width to an ad.
- **ads-empty-margins** MUST Keep the margins beside the column empty: no content, sticky widget or
  decoration, at any width. Because they belong to the skyscrapers even where none runs.
- **ads-superboard** MUST Reserve a superboard as a full-column box (980 px wide, `w-full`), 600 px
  high (`h-150`), between two sections or two rows of cards, with 24 px above and below it. Cards
  are 16 px apart (`gap-4`), so the slot adds `my-2`: 16 + 8 = 24 px on each side. Because the ad
  spec asks for 24 px around the slot.
- **ads-reserve-only** MUST Reserve the space and stop there: no ad markup, scripts or iframes of
  your own, and no card style (border, radius, shadow) on a slot. The app's developers fill the
  slots in their own way. Because the ad script controls the creative and its loading.

Not covered yet on desktop: the **in-article** slot (580 × 400, inserted by the ad script between
paragraphs) and the **parallax** slot (full-bleed, breaks out of the text column). Their article
rules are pending; leave them out and don't reserve space for them.

### Simulating an ad

In a demo, story, sandbox page or prototype, show each reserved slot as a dark gray box that names
the slot and its largest size, in white:

```tsx
/** Stands in for an ad: fills the slot it's given and names it. The app's ad script replaces it. */
const AdPlaceholder = ({ name, size, className, style }: { name: string; size?: string; className?: string; style?: React.CSSProperties }) => (
    <div
        style={style}
        className={cx("flex flex-col items-center justify-center gap-1 bg-secondary-solid p-2 text-center text-sm font-semibold text-white", className)}
    >
        <span>{name}</span>
        {size && <span>{size}</span>}
    </div>
);
```

- `bg-secondary-solid` with `text-white` reads the same in both themes. The box is square-cornered
  and has no border, because it stands for the creative, not a card.
- Name the slot as in the table ("Top banner", "Skyscraper", "Superboard") and give its largest
  size, even where the box is drawn smaller (a scaled skyscraper still says "300×600"). A mobile
  ad is named "Annonse", with no size (see "Ads (mobile and tablet)").
- A top banner or superboard outside a skyscraper rail goes in an `aside aria-label="Annonse"` too.
- Hide the desktop slots below `lg` (`max-lg:hidden`): the top banner and superboards are desktop
  only, and the skyscrapers already hide below 1344 px.

## Ads (mobile and tablet)

Provisional: taken from the live sites, not from an ad spec. Sizes will come later; until then,
these rules say where ads go and what a page must not get in the way of. They apply below `lg`
(tablet follows mobile until it has rules of its own).

On mobile there is no top banner and no skyscrapers. Ads come **between pieces of content**: between
rows of cards, between feed items or forum posts, and between paragraphs in an article (the
in-article slot, whose article rules are still pending). The ad script inserts each slot, sizes it
once an ad has loaded and adds its own spacing. On the live site it often sits in a light gray band
that runs to the screen edges, with a parallax ad that breaks out of the gutter. Neither is built
by the page.

- **ads-mobile-between** SHOULD Leave room for ads only between pieces of content: never inside a
  card, between a card's header and its body, or inside a list or table. Because the ad script
  inserts between whole items.
- **ads-mobile-clean-breaks** SHOULD Keep each row, feed item, post or paragraph its own element,
  as siblings in the same container. Don't wrap a whole feed or thread in one card or one element
  with no breaks. Because the script needs a gap between two siblings to insert into.
- **ads-mobile-no-reserve** SHOULD Reserve no height or padding for a mobile ad. Because the slot
  takes height only when an ad loads; reserved space would stay empty when none runs.
- **ads-mobile-full-bleed** SHOULD Let the content column overflow sideways: no `overflow-hidden`
  or `overflow-x-hidden` on `main` or the content column. Because a mobile ad, a parallax ad
  especially, runs past the 16 px gutter to the screen edges, and a clipping wrapper cuts it off.

### Simulating a mobile ad

A real page reserves nothing, but a prototype can show where ads will land: put a full-bleed
`AdPlaceholder` named "Annonse" between two rows, mobile only. One or two on a page are enough to
show the rhythm; follow the design where it shows them.

```tsx
<main className="flex flex-col gap-4">
    {/* a row of cards */}
    <aside aria-label="Annonse" className="-mx-4 md:-mx-6 lg:hidden">
        <AdPlaceholder name="Annonse" className="h-62.5" />
    </aside>
    {/* the next row */}
</main>
```

- `-mx-4 md:-mx-6` cancels the page gutter, so the box runs to the screen edges like the live ad
  band. The 250 px height is only for the prototype.
- Prototypes only. In an app, leave the gap and let the ad script fill it.

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
  `bg-secondary` (what `Table.Row` renders); a current or selected item keeps its component's fill
  (`bg-active` for nav items, button group segments, gray tabs and menu items;
  `bg-brand-primary_alt` for brand tabs and the current page). Because a second hover token per page is an untracked restyle.

Open (decide with the design owner):

- The live inset is `#F8F9F9`; `bg-tertiary` is `#F5F5F5`.
- A header band across the full window runs into the skyscraper margins (`ads-empty-margins`).
  Until it's decided, build it inside the 980 px column and report it.

## Arranging cards

**Gap:** 16 px between cards, in columns and in rows, everywhere: `gap-4`. Decided by the design
owner (2026-11-19). Ad slots get 24 px around them instead (see "Ads (desktop)").

### Card layouts

These layouts and the page shells below can be overridden by a frame or the person's instruction,
never by your own judgement; report each override (see the note at the top of this page).

Inside the 980 px column, cards sit in rows, and every row is one of four layouts. The rows stack
with the same 16 px gap (`flex flex-col gap-4`). Widths are at the full 980 px column; below it
they shrink in proportion.

| Layout       | Cards in the row                  | Widths at 980 px | Below `lg`                    |
| :----------- | :-------------------------------- | :--------------- | :---------------------------- |
| One column   | One card, full width              | 980              | The same                      |
| Two column   | Two cards, equal                  | 482 + 482        | Two from `md`, one below `md` |
| Three column | Three cards, equal; use sparingly | 316 + 316 + 316  | One column                    |
| Sidebar      | Content on the left, sidebar      | 648 + 316        | One column, sidebar under it  |

```tsx
const card = "rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5";

<div className="flex flex-col gap-4">
    {/* One column */}
    <section className={card}>{/* Aksjer */}</section>

    {/* Two column */}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className={card}>{/* Anbefalinger */}</section>
        <section className={card}>{/* Tekniske indikatorer */}</section>
    </div>

    {/* Three column, sparingly */}
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className={card}>{/* Vinnere */}</section>
        <section className={card}>{/* Tapere */}</section>
        <section className={card}>{/* Mest omsatt */}</section>
    </div>

    {/* Sidebar: 648 + 316 */}
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">{/* content cards */}</div>
        <aside className="flex flex-col gap-4">{/* sidebar cards */}</aside>
    </div>
</div>;
```

- **layout-card-rows** MUST Build every row from one of the four layouts: one column, two column,
  three column or sidebar. No other splits (no ¼ cards, no ⅔ + ⅓ outside the sidebar layout, no
  sidebar on the left), and no hole at the end of a row. Decided by the design owner (2026-11-19).
  Because the four layouts are the 980 px column's grid.
- **layout-three-column-sparingly** SHOULD Use the three-column layout sparingly: at most one or
  two such rows on a page, for short cards of the same kind (Vinnere, Tapere, Mest omsatt). A 316 px
  card fits a short list or a few key figures, not a wide table. Because three narrow cards side by
  side are hard to read.
- **layout-sidebar-context** SHOULD Keep only context in the sidebar (the instrument, quick links,
  related news), never the primary content. The content comes first in the markup, so below `lg`
  the sidebar falls under it. A sidebar column may hold several cards, stacked with `gap-4`.
- **layout-equal-height** SHOULD Let cards in a row stretch to the same height (the grid default).
  When a card has more content than the row allows, show a limited number of rows and a "Vis mer"
  link instead of growing taller.

### Page shells

Each page type and the card layouts it uses. When a frame or the person lays a page out
differently, follow them and report it, as for the card layouts.

| Page type                                      | Layout                                                                                    | Below `lg`                         |
| :--------------------------------------------- | :---------------------------------------------------------------------------------------- | :--------------------------------- |
| Front page                                     | Its own layout for now, see below                                                         | One column, sidebar under stream   |
| Market overview (Børs, Rapporter)              | Rows of two-column and one-column cards; sidebar rows; a three-column row now and then    | As each layout says                |
| Instrument profile                             | Header band (name, price, chart, key figures, underline tabs), then rows of cards         | As each layout says                |
| Investor profile                               | Header band (avatar, name, key figures), then one-column table cards                      | Stacked                            |
| Feed or discussion (Siste nytt, Forum, MittFA) | Sidebar layout, or one main card                                                          | One column                         |
| Data table (Aksjer, Bjellesauer)               | One column: one card with filters on top and the `Table`                                  | Two-column rows; tap opens a sheet |
| Article                                        | White reading page; header and image wider than the body text; embedded widgets as insets | One column with `p-4`              |

**Front page:** keeps today's layout until it's redesigned: `max-w-[1376px]`, a teaser stream ⅔
and widget cards ⅓ (`grid grid-cols-1 gap-4 lg:grid-cols-3`, the stream `lg:col-span-2`), with the
same gutter. It isn't held to `layout-page-width` or `layout-card-rows`. Next to 1376 px the
skyscrapers only fit from about 2040 px, so ask whether the front page shows ads
(`ads-confirm-skyscrapers`).

**Article:** the article rules are on hold until article work starts; build articles as described
here and in "Article body".

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
  in the body, `type="button-gray"` `size="sm"`; they hug their content. Never a `ButtonGroup`
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
type="button-gray" size="sm"` with one `Tabs.Panel` around the list. Dropdown chips ("Kategorier",
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
