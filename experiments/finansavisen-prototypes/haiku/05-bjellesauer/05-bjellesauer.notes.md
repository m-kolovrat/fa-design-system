# Bjellesauer prototype: notes for the design system owner

Files: `05-bjellesauer.tsx` (page), `05-bjellesauer.story.tsx` (stories: Desktop, Mobile, LoggedOutTeaser).
Brief: `experiments/finansavisen-prototypes/briefs/05-bjellesauer.md`.

Checks: `npx tsc --noEmit -p .` has no errors in this folder (one unrelated error in `sonnet/03-bors`).
`npx eslint` on this folder: 0 errors, 0 warnings after fix. Prettier clean.
Not done: Storybook was not started, so nothing was checked visually in Mobile or Desktop, light or dark.
`npm test` in the repo was not run. Nothing committed.

## Components used (import paths as `@/components/...`)

- `application/site-header/site-header` (`SiteHeader`) and `application/site-header/site-brands` (type `SiteNavItem`)
- `application/site-footer/site-footer` (`SiteFooter`)
- `application/table/table` (`Table`, `TableCard`): `TableCard.Root size="sm"`, `TableCard.Header` with `badge` and `description`, `Table.Head` with `isRowHeader`, `allowsSorting`, and `hidden md:table-cell` classes, `Table.Body` with `renderEmptyState`
- `application/pagination/pagination` (`PaginationCardMinimal`), placed inside `TableCard.Root` after the table
- `application/empty-state/empty-state` (`EmptyState`), used inside the table's empty state
- `base/select/select` (`Select`, `Select.ComboBox`, `Select.Item`): stock and investor filters (ComboBox), period (Select)
- `base/button-group/button-group` (`ButtonGroup`, `ButtonGroupItem`): view switch Alle / Kjøp / Salg
- `base/buttons/button` (`Button`): CSV download, link-gray investor names, paywall CTA, subscribe
- `base/badges/badges` (`Badge`, `BadgeWithIcon`): ticker badge, signed share change with arrow
- `base/avatar/avatar` and `base/avatar/utils` (`getInitials`): investor initials
- `base/form/form` (`Form`) and `base/input/input` (`Input`): newsletter sign-up
- `foundations/featured-icon/featured-icon` (`FeaturedIcon`): lock on the logged-out teaser
- Icons from `fa-icons`: `ArrowUp`, `ArrowDown`, `Download`, `Lock`, `Search`

## Composed myself, and why

- **Teaser** (logged-out): a `<section>` card with FeaturedIcon, heading, text and two Buttons. The paywall box is listed as "no component yet", so I built the stand-in.
- **Mobile values**: the table hides four of the nine values below `md` (value, ownership, holding, executor). Investor name, ticker, company, share change and relative change stay visible. The date sits under the investor name on mobile. There is no stand-in for the mobile detail view.
- **Relative change under the share change** in the same cell: the page-patterns "Value with its change" pairing, done inside the table.
- **Empty-period state**: `EmptyState` in `Table.Body renderEmptyState`, as the table doc suggests.
- **Period reference date**: periods count back from the "Siste data mottatt" date (26.10.2026), not from today.
- **Sort logic**: the table is sorted in the page, as the table rules require. Missing values sort last in both directions.

## Patterns section

**New patterns** (not in any reference file):

- A two-line number cell: a `BadgeWithIcon` with the signed share change, and the relative change in `text-xs` underneath. Used in the main data table.
- Investor cell: avatar, name as `Button color="link-gray"`, and the date as a `md:hidden` line. Used in the main data table.
- Three filters in a row above the table (`grid md:grid-cols-3`), on the page background, with the view switch and the CSV download on a second row.
- A logged-out teaser under the first two rows of the table, with no blur or gradient.

**Clashes:**

- **Filters above or inside the card.** `page-patterns.md` ("Data table") says "one card with filters on top and the Table". `layout.md` says "filter rows above the cards are the exception". I put the filters above the card, following `layout.md`.
- **Period control.** `page-patterns.md` gives `ButtonGroup` as the stand-in for the period selector. `SKILL.md` says `ButtonGroup` is for about six options at most. The brief has nine periods, so I used `Select` (rule followed).
- **Table key vs sort.** The table doc's example imports `SortDescriptor` from `react-aria-components` without the `Aria` prefix. `CLAUDE.md` requires the prefix. I used `AriaSortDescriptor`.
- **Key import.** `button-group.md` imports `Key` from `react-aria`. I imported it from `react-aria-components`. Both work; the skill should pick one.
- **Mobile tables.** The skill says a mobile data table should have fewer columns, and gives `hidden md:table-cell` as the only tool. The brief says mobile-first with nine values. Hiding four values loses data on phones. This needs a decision (detail sheet, expandable row, or full horizontal scroll).

## Rules bent or unresolved

- **Winners and losers.** The brief asks for views of "winners and losers". The brief has no performance data, so I did not build it. I used Alle / Kjøp / Salg (buys and sells, by the sign of the share change). This needs a decision.
- **Date range.** Brief: "period ... or date range". I built the period select only. `DateRangePicker` exists and was not used.
- **Download and subscribe** are buttons without handlers. The CSV button and the newsletter form do nothing.
- **Investor portfolio link** points to `href="#"`. The route is unknown.
- **Avatars** use initials only. The brief gives no photos. `getInitials` takes only the first two words of a name.
- **Table cells with missing data**: John Fredriksen's row has no company, relative change, holding, executor or date in the brief. Those cells show "–", as `layout.md` says for missing values.
- **Live indicator**: not used. The brief says "Siste data mottatt" as plain text, so I kept it as text.
- **Mobile sorting**: only the share change is sortable below `md`, because value and date are hidden there.

## Placeholder data (replace before any real use)

- Rows 3 to 10 in `TRADES` are invented: fictional investor names (Magnus Dahl, Ragnhild Vik, Torbjørn Lie, Silje Aas, Henrik Moe, Kari Nygård), invented shares, values, dates, holdings and executing companies. Only rows 1 and 2 come from the brief. Do not show these names with real trades; they were chosen to avoid implying real trades.
- Trade dates in rows 3 to 10 are chosen to span the period filters.
- "Fra 99 kr i måneden" in the teaser: placeholder price.
- Inclusion rules text ("Slik lager vi listen") is invented copy. The brief gives no text. It also states a legal basis that needs checking.
- Disclaimer in the footer is a placeholder string.
- Footer and header navigation links, publisher info ("Org.nr. 000 000 000") and copyright are placeholders.
- "Last ned CSV" and newsletter copy are my wording.
- `mill. kr` is used for the brief's "M NOK". The brief's format was not confirmed.
- Period labels: `1Å` and `3Å` follow the skill's ButtonGroup example, not the brief's `1Y` and `3Y`.

## Where the skill was unclear, contradictory or missing

1. **Mobile data tables.** No rule for a table with more than four or five columns on phones, and no detail pattern (sheet, expandable row). This was the main blocker for the brief's constraint.
2. **Icon example uses `Edit`.** `SKILL.md` (fa-icon-names) uses `ButtonUtility icon={Edit}` as the correct example. `Edit` is not exported by `fa-icons` (v0.2.0), so the example will not compile. Also, `EditIcon`-style names are not listed anywhere.
3. **Period control: two rules disagree** (see clashes above).
4. **Filters on top of a table card**: page-patterns and layout disagree (see clashes).
5. **Paywall box** is described in page-patterns but has no reference page or component. The stand-in is only prose. I composed it without any shared structure, so the teaser may differ from the Figma design once one exists.
6. **Date range filter**: no stand-in is given for a date range, although the period pattern exists.
7. **Table row click or detail**: the table doc has `onRowAction` in props but no pattern for what it should do.
8. **Badge for a sign**: `badge-color-meaning` and `badge-not-only-color` are satisfied by the sign in the text, but the skill does not say whether the sign should be a real minus (U+2212) or a hyphen in Norwegian formatting. I used the locale's output from `Intl` (U+2212).
9. **`fa-links`**: the rule says standalone action links use `Button href`. Investor names in table cells use `link-gray` `Button`. The skill does not say whether a link inside a table cell counts as standalone; I treated it as standalone.
10. **Teaser primary**: "one primary per section" was satisfied, but the newsletter `Abonner` button is also primary on the same page. The skill does not say whether the one-primary rule is per page or per section.
11. **Storybook checks not possible here**: the skill's Step 6 asks for Mobile and Desktop in both themes. I could not check either, so the layout at 375px and 1440px is unverified.
