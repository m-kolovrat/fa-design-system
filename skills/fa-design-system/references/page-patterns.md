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
    <SiteHeader brand="fa" navigation={navigation} shortcuts={shortcuts} tickerItems={ticker} />
    <main className="mx-auto w-full px-4 py-6 md:px-8">{/* page content */}</main>
    <SiteFooter brand="fa" links={footerLinks} publisherInfo={publisher} copyright={copyright} disclaimer={disclaimer} />
</div>
```

- The page background and the cards follow the surface levels in [layout.md](layout.md). Page
  width isn't fixed yet; take it from the design.
- One `SiteHeader` and one `SiteFooter` per page, with the same `brand`. An article takes the brand
  of its publication (a Kapital article shows `brand="kapital"`).
- One `h1` per page.

## Page shells

| Page type                                      | Layout ([layout.md](layout.md))                                                           | Below `lg`                              |
| :--------------------------------------------- | :---------------------------------------------------------------------------------------- | :-------------------------------------- |
| Front page                                     | Main and sidebar: teaser stream ⅔, widget cards ⅓                                         | One column, sidebar under the stream    |
| Market overview (Børs, Rapporter)              | Card grid, mostly ⅓ and ½ cards                                                           | Two columns from `md`, then one         |
| Instrument profile                             | Header band (name, price, chart, key figures, tabs), then the card grid                   | Two columns from `md`, then one         |
| Investor profile                               | Header band (avatar, name, key figures), then stacked full-width table cards              | Stacked                                 |
| Feed or discussion (Siste nytt, Forum, MittFA) | Main and sidebar, or one main card                                                        | One column                              |
| Data table (Aksjer, Bjellesauer)               | One card with filters on top and the `Table`                                              | Fewer columns; ticker stacked over name |
| Article                                        | White reading page; header and image wider than the body text; embedded widgets as insets | One column with `px-4`                  |

## Patterns

### Widget card — no component yet

The building block of Børs, Rapporter and the front page sidebar. White card, 16 px radius,
header with a tinted icon tile, a title and a round chevron link; body is a table or list.

```tsx
<section className="rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5">
    <header className="mb-3 flex items-center gap-3">
        <FeaturedIcon icon={ArrowUp} color="success" theme="light" size="sm" />
        <h2 className="text-lg font-semibold text-primary">Vinnere</h2>
        <ButtonUtility icon={ChevronRight} href="/bors/vinnere" tooltip="Se alle vinnere" className="ml-auto" />
    </header>
    {/* Table or list */}
</section>
```

The icon tile carries meaning (green for winners, red for losers, brand for neutral). Inside a
widget card, group with an inset (`rounded-xl bg-tertiary p-3`), not a second bordered card.

### Data table

`Table` (or `TableCard`) with: header labels `text-xs font-medium uppercase tracking-wide
text-quaternary`, cells `text-sm`, numbers right-aligned with `tabular-nums`, sortable headers
(`allowsSorting`). Show a ticker as a ticker badge, a company with its round logo (`Avatar size="xs"`).

### Ticker badge

```tsx
<Badge color="brand" size="sm" type="pill-color">
    EQNR
</Badge>
```

Uppercase ticker, brand pill. Always a link to the stock page when it's interactive.

### Change value — no component yet

A signed number colored by direction, in Norwegian format.

```tsx
const change = (v: number) => (
    <span className={cx("tabular-nums", v > 0 && "text-success-primary", v < 0 && "text-error-primary", v === 0 && "text-tertiary")}>
        {new Intl.NumberFormat("nb-NO", { style: "percent", minimumFractionDigits: 2, signDisplay: "exceptZero" }).format(v / 100)}
    </span>
);
```

Never color by hand with green/red palette classes; never drop the sign.

### Filter chips — no component yet

A row of pill toggles above a feed or table ("Alle", "FA", "TDN", "Børsmeldinger", "Min
watchlist"). Stand-in: `ButtonGroup` with `selectionMode="single"`. Dropdown chips ("Kategorier",
"Marked 4") are a `Dropdown` with a `Button color="secondary" size="sm"` trigger and a `Badge` for the
count. Country chips add `<Flag name="norway-nok" />` (check the flag name in `fa-icons`).

### Period selector — no component yet

Chart periods (1D, 5D, 6M, YTD, 1Y, 5Y) with each period's change under the label. Stand-in:
`ButtonGroup` items whose content is the label plus a change value. Below `md`, keep it on one row.

### Live indicator — no component yet

`BadgeWithDot color="error"` with "Live" plus the timestamp in `text-xs text-tertiary`.

### News feed item — no component yet

Source logo (`Avatar size="sm"`), a meta line (time · ticker badge · category, `text-xs
text-tertiary`), a bold title (`text-sm font-semibold text-primary`), a two-line excerpt
(`text-sm text-tertiary line-clamp-2`), and an optional thumbnail on the right. Rows are separated by
`border-b border-secondary`.

### Company row

`AvatarLabelGroup` with the company logo, name and a meta line, plus a trailing `ButtonUtility`
(play, download). Several logos for one day overlap as a logo stack (see Coverage gaps in `SKILL.md`).

### Key figures — no component yet

Label above a large figure, several side by side in one card (Watchlist: Porteføljeverdi,
Gevinst/tap i dag, …). Label `text-xs text-tertiary`, figure `text-display-xs font-semibold`, the
change under it as a change value.

### Article teaser — no component yet

Image, kicker ("Oppgang på Oslo Børs:"), bold headline, optional label pill ("Mye lest",
"Børsoppdatering", "Pluss"), and a save button (`ButtonUtility icon={Plus}`). Some teasers sit on a
solid brand or dark fill with `text-primary_on-brand` headlines. Opinion teasers use a serif italic
headline, which has **no token yet**: report it rather than adding a font.

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
(`rounded-2xl bg-tertiary p-4`) on the white reading page.

### Follow chips — no component yet

Pill with an avatar or logo, a name and a star toggle ("Simen Aas ☆", "Pareto Bank (PARB) ☆",
"Finans ☆") to follow a journalist, company or category. Stand-in: `Button color="secondary"
size="sm"` with the avatar as `iconLeading` and a star `iconTrailing`, `aria-pressed` for the state.

### AI prompt chips — no component yet

A label ("Investorchat:") followed by pill buttons that send a prompt ("Oppsummer nyheter",
"Analyser nøkkeltall"). Stand-in: `Button color="secondary" size="sm"` per prompt.

### Key-figure list

Label left, value right, `text-sm`, rows separated by `border-b border-secondary`, a help tooltip
on labels that need one, sub-rows indented. Stand-in: a definition list (`dl`) in a widget card.

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
