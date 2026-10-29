# Layout

How surfaces stack, how cards are arranged on a page, and how two pieces of text are paired.
Measured on the live Finansavisen pages (October 2026); the measurements are kept in the library
repo, not in the package.

> **Decided:** cards have a border, three page widths, and a 16 px gutter on mobile (the MUST rules
> below). **Everything else is flexible:** it describes what the pages do today. Follow it by
> default, but when a design or an existing page does something else, follow the design and say so
> in your reply (see "Redesigning an existing page" in `SKILL.md`).

## 1. Surfaces

Every page is built from the same few layers. Each layer has one token pair that works in light
and dark mode.

| Level          | What                                                                                         | Classes                                                                |
| :------------- | :------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| 0. Page        | The background behind everything                                                             | `bg-secondary_alt`                                                     |
| 1. Header band | Optional white full-width band at the top of a profile page (name, price, key figures, tabs) | `bg-primary_alt border-b border-secondary`                             |
| 2. Card        | Where content lives                                                                          | `rounded-2xl border border-secondary bg-primary_alt`                   |
| 3. Inset       | A group inside a card (day tiles, a forum box inside an article)                             | `rounded-xl bg-tertiary`, no border                                    |
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

Rules:

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

- **layout-card-border** MUST Give every card a `border-secondary` border, although the live site
  has none. Decided by the design owner.
- **layout-mobile-gutter** MUST Keep a 16 px gutter on mobile (`px-4`), 32 px from `md`
  (`md:px-8`). Cards keep their radius and border at every width; they don't run edge to edge.
  Decided by the design owner.

Open (decide with the design owner): the live inset is `#F8F9F9`; `bg-tertiary` is `#F5F5F5`.

## 2. Arranging cards

**Gap:** 24 px between cards and between rows, everywhere: `gap-6`.

### Page width

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

```tsx
<main className="mx-auto w-full max-w-[1376px] px-4 py-6 md:px-8">{/* cards */}</main>
```

### Card grid (market and profile pages)

A 6-column grid. A card spans 2 (⅓), 3 (½), 4 (⅔) or 6 (full) columns:

There is no `Card` component yet; a card is a `section` with the level-2 classes.

```tsx
// A card with a CardHeader has no padding of its own; its body is px-4 py-5 md:px-6.
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

## 3. Pairing two pieces of text

The same pairings appear on every page. Use these instead of inventing a new arrangement.

| Pairing                    | Example                                                     | How                                                                                                                                                                                          |
| :------------------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Label over value           | "Åpne" / 7,20 · "Aksjer i porteføljen" / 20                 | Label `text-xs` or `text-sm` `font-medium text-tertiary`, value `font-semibold text-primary` under it. Label always first                                                                    |
| Label and value on one row | Pris/bok 1Y ······ 3,59                                     | Label left, value right with `tabular-nums`; divider between rows; help tooltip on the label when it needs explaining                                                                        |
| Meta over title            | 14:44 · DOFG · Børsmelding / DOF Group ASA – Sale of vessel | Meta `text-xs text-tertiary`, items separated by `·`; title under it                                                                                                                         |
| Name over identifier       | Equinor / EQNR · Forumhai / 15:07                           | Name `text-sm font-medium text-primary`, identifier `text-sm text-tertiary` under it; an instrument adds its logo before (instrument cell in `page-patterns.md`)                             |
| Heading with inline meta   | Siste nytt 23. okt 15:09 · Innlegg og svar (1.912)          | Heading, then the meta on the same baseline in a smaller `text-tertiary` style; counts in parentheses                                                                                        |
| Value with its change      | 7,16 +0,03 (+0,42%)                                         | Value first, then the signed, colored change: absolute, then percent in parentheses                                                                                                          |
| Card header, right slot    | → · "Last ned" · filter · sort dropdown                     | Up to three actions in `CardHeader`'s `actions`: sm icon-only `Button`s, or a labelled sm `Button` / `Dropdown`; a source credit ("Levert av Finwire") goes in the card body, not the header |

And:

- **Missing value:** "–" in a table cell. An empty table shows `EmptyState` ("Ingen data
  tilgjengelig") through `Table.Body`'s `renderEmptyState`, so the headers stay (`empty-state-in-table`).
- **Truncation:** names in tables end in "…"; excerpts are clamped to two lines (`line-clamp-2`);
  long posts end in "Les mer".
- **Alignment:** text left, numbers right, each column header aligned with its column.
- **Signals:** KJØP / NØYTRAL / SELG as `Badge` in `success` / `gray` / `error`, the same everywhere.
