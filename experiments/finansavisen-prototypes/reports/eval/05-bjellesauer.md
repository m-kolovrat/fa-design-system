# Eval: 05-bjellesauer (Bjellesauer, big-investor trades)

Evaluator: independent. Inputs: brief `experiments/finansavisen-prototypes/briefs/05-bjellesauer.md`, ground truth `scratchpad/ground-truth/05-bjellesauer.md`, rules `skills/fa-design-system/`. Rendered from the static Storybook (localhost:6007), desktop at 1440 px and mobile at 375 px, light and dark. Screenshots are in `scratchpad/shots/05-bjellesauer/`. The Sonnet and Haiku logged-out stories are flagged mobile, so they were also shot at 375 px (`*-logged-out-teaser-mobile-*`).

## Scores (0–3)

| Criterion             |  Opus  | Sonnet | Haiku  |
| :-------------------- | :----: | :----: | :----: |
| Component reuse       |   3    |   3    |   2    |
| Rule compliance       |   2    |   2    |   2    |
| Fidelity to real page |   3    |   3    |   1    |
| Visual quality        |   2    |   2    |   1    |
| Accessibility         |   3    |   2    |   2    |
| Honesty of notes      |   3    |   2    |   2    |
| **Total (/18)**       | **16** | **14** | **10** |

Console: every story logs one error, a 404 for `/_vercel/insights/script.js`. It comes from the Storybook build, not the prototypes. There were no page errors.

Measured horizontal overflow at 375 px (`scrollWidth`):

- Opus Mobile: 375 (OK). Opus Teaser Mobile: 382.
- Sonnet Mobile: 375. Sonnet teaser: 382.
- Haiku Mobile: 382. Haiku teaser: 382.

The 382 cases have one shared cause: the **logged-out `SiteHeader`** pushes its "Meny" button to x=382. That is a library bug (see root causes). Haiku's subscriber view is logged out too because it never passes `user`, so it overflows as well.

---

## Opus

**Reuse (3).**

- Components used: `SiteHeader`/`SiteFooter`, `Tabs`, `TableCard` + `Table` (controlled sort, `renderEmptyState`), `Select.ComboBox` ×2, `ButtonGroup` (9 periods), `NativeSelect` (period, sort and view below md), `DateRangePicker` in `AriaI18nProvider`, `PaginationCardDefault`, `Badge` ticker, `Avatar`, `FeaturedIcon`, `EmptyState`, `Input`, `Button` (opus .tsx:9-27).
- Invented pieces, each against a documented stand-in:
    - `ChangeValue`: the page-patterns stand-in.
    - Widget cards for winners and losers: the stand-in.
    - Paywall box: a stand-in, adapted.
    - `TickerLink` / `InvestorLink` as hand-made `<a>` (.tsx:205-217). `Button href color="link-gray"` existed and was not used. Reported as bent.

**Rules (2).**

- Clean: no hex, palette, `dark:`, `duration-` or `outline-none`.
- Bent:
    - fa-links: hand-made `<a>` (.tsx:206, 214).
    - `[&>div]:justify-end` reaches into `Table.Head` internals (.tsx:394-413). Reported.
    - Two primaries in the teaser: "Bli abonnent" .tsx:779 and newsletter .tsx:743. With the header's own primary "Logg inn", the teaser screen shows three filled buttons.
- Type-only `Key`/`SortDescriptor` imports have no `Aria` prefix (.tsx:7). `table.md` does the same.

**Fidelity (3).**

- Present:
    - All three views (Siste handler / Investorer / Vinnere og tapere).
    - All 9 columns.
    - Aksje and Investor filters, the 9 period chips, a date range, "Siste data mottatt", a download button, newsletter, inclusion rules and disclaimer, pagination, investor-portfolio links.
- Missing: breadcrumb, the sheep-bell intro icon, "Les mer", rows-per-page.
- Invented: a ticker strip (the real page has none), and a relative change of +0,50 % on the Fredriksen NAS trade.
- The trades default to 1M, not 1D. The Dato column is clipped at 1440 px, exactly as on the real page (.png: opus-desktop-light). Density is close to the real page.

**Visual (2).**

- Desktop: the Dato column is cut off with no visible scroll cue. `max-w-container` plus 9 columns makes investor names wrap to 2–3 lines ("Øystein / Stray / Spetalen").
- Mobile: the "stacked cell" table keeps all 9 values (opus-mobile-light). It is dense but legible. Numbers are right-aligned with `tabular-nums`.
- Dark mode is clean.
- Teaser mobile overflows 7 px (library header).

**A11y (3).**

- Fields: every field has a label. The date range has `aria-label`.
- Table: `isRowHeader`, `aria-label` on the table, tooltips on the header columns that need them.
- Signs are explicit (`signDisplay: exceptZero`).
- On mobile the tablist is hidden and replaced by a `NativeSelect` labelled "Velg visning". It works, but a hidden tablist has to be checked with a screen reader.

**Notes (3).**

- Accurate and specific. Lists the bent rules, the clashes (TableCard vs card surface, header casing, `transition-colors`), the English strings and the placeholders.
- Says plainly that the page was not checked visually.

## Sonnet

**Reuse (3).**

- Uses the same set as Opus, plus `BadgeWithIcon` for Kjøp/Salg and `Select` for sorting on mobile.
- Invented pieces:
    - Mobile `TradeListItem` card list with a `dl` inset (sonnet .tsx:396-439). No stand-in exists; reported.
    - Rank cards: a widget-card stand-in, but without `FeaturedIcon`.
    - Paywall box: stand-in.
    - Info cards.
- Imports the header and footer fixtures from `*.demo.tsx` (.tsx:12-14). These do not ship in the package. Reported.

**Rules (2).**

- Clean tokens.
- Violations:
    - `TableCard.Root className="bg-primary_alt"` (.tsx:538) restyles a component's fill (anti-classname-restyle). Not reported.
    - `Button className="truncate"` (.tsx:401).
    - A primary "Vis alle handler" in the `EmptyState` (.tsx:646) sits next to the newsletter primary.
    - The 'Datoperiode' label is a bare `<span>` (.tsx:585), not tied to the picker.

**Fidelity (3).**

- Present: all three views, all 9 columns, filters, the 9 periods, a date range, download, disclaimer, newsletter.
- Changes and inventions:
    - The brief's 1Y/3Y were relabelled 1Å/3Å.
    - Kjøp/Salg text badges were added. Neither the brief nor the real page has them.
    - Fictional investors (Kari Bruun-Hansen and others) replace the real bjellesauer. This was deliberate and reported.
    - The transaction value is signed (−7,19).
    - Invented ticker strip.
- It reads as Finansavisen.

**Visual (2).**

- Desktop fits 1440 without clipping (sonnet-desktop-light).
- **Numbers are left-aligned** (Verdi, Eierandel, Beholdning, Dato). This goes against the data-table pattern.
- Mobile: the 9-option `ButtonGroup` scrolls sideways and cuts off at "YTD". "1Å / 3Å / Alle" are hidden with no cue (sonnet-mobile-light).
- Mobile cards are readable but long (4119 px for 7 trades).
- Dark mode is OK. Teaser overflows 7 px (library header).

**A11y (2).**

- Signs plus text badges make buy and sell very clear.
- Issues: the date picker's visible label is not associated with it, and the `EmptyState` icon is `Mail` (meaningless).
- Otherwise good: row header, labelled combos.

**Notes (2).**

- Mostly honest: demo imports, English strings, unverified visuals.
- Misses the `TableCard.Root` fill override.
- Says "className … only for layout/typography", which is not true for .tsx:538.

## Haiku

**Reuse (2).**

- Uses library parts well: `TableCard`/`Table`, `PaginationCardMinimal` (it has a rows-per-page select, like the real page), `Select.ComboBox`, `Select` for the period, `ButtonGroup`, `BadgeWithIcon`, `FeaturedIcon`, `Form`/`Input`.
- But `Tabs` and `DateRangePicker` existed and were not used. The brief's views and date range were dropped instead.
- Invented: a teaser `section` (stand-in) and info cards.

**Rules (2).**

- Clean tokens.
- Issues:
    - Two primaries on the teaser page, three with the header's "Logg inn" (.tsx:511, 540).
    - "Last ned CSV" has no href or handler (.tsx:404).
    - Investor links use `href="#"`.
    - The logged-out header is shown on the subscriber view because no `user` is passed (.tsx:333).

**Fidelity (1).**

- Missing:
    - "Alle investorer" and "Vinnere og tapere". They were replaced by an invented Alle/Kjøp/Salg filter (.tsx:390-403).
    - The date range.
    - The period as a visible chip row (it is a `Select`).
    - Sorting on 6 of the 9 values: only 3 columns sort, while the brief says "sort by any value".
- **The brief's own John Fredriksen trade is invisible in the default view.** Its date is `null`, so the 1M filter drops it (.tsx:307). The desktop render shows 4 rows and no Fredriksen.
- The teaser shows 2 rows, mostly "–" for Fredriksen.
- The title is "Bjellesauene" (the real page says "Bjellesauer").
- The missing ticker strip happens to match the real page.

**Visual (1).**

- Mobile: the table keeps Investor and Aksje on screen and pushes **the signed change, the only buy/sell signal, off-screen** into horizontal scroll (haiku-mobile-light). Its notes claim this column "stays visible".
- The page overflows to 382 px.
- English "Page 1 of 1", "10 per page".
- Desktop is tidy but sparse. Dark mode is OK.

**A11y (2).**

- Labels and row header are fine. Sign and arrow are on the badge.
- Issues: the sort arrows are still active in the teaser, links point to `#`, and the download button does nothing.

**Notes (2).**

- Candid about the omitted views, date range and handlers.
- Correctly found that the SKILL.md example `Edit` is not exported by `fa-icons` (verified: no Edit or Pencil export).
- But it says the change column stays visible on mobile, which the render contradicts. It also doesn't notice that its own Fredriksen row is filtered out.

---

## Cross-model consistency (where the system lets models diverge)

| Concept                    | Opus                                                                  | Sonnet                                                                    | Haiku                                                                   |
| :------------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------ | :---------------------------------------------------------------------- |
| 9 values on desktop        | Table, numbers right-aligned via `[&>div]` hack, clipped Dato         | Table, numbers **left-aligned**, fits                                     | Table, 8 columns, relative change folded under the change value         |
| 9 values on mobile         | Same `Table`, values stacked into 2 cells, plus a sort `NativeSelect` | Table swapped for a **card list** with a `dl` inset, plus a sort `Select` | `hidden md:table-cell` on 4 columns, the change value pushed off-screen |
| Period selector, 9 options | `ButtonGroup` from md, `NativeSelect` below                           | `ButtonGroup` everywhere, side-scrolling on mobile                        | `Select` everywhere                                                     |
| Period labels              | 1Y/3Y/Alle (brief)                                                    | 1Å/3Å/Alle                                                                | 1Å/3Å/Alle                                                              |
| Date range                 | `DateRangePicker` with apply/cancel draft                             | `DateRangePicker`, live                                                   | none                                                                    |
| Filters                    | 2 ComboBoxes inside TableCard                                         | 2 ComboBoxes + date inside TableCard, "Alle …" items                      | 3 fields **above** the card                                             |
| Buy/sell signal            | sign + color only                                                     | sign + color + Kjøp/Salg `BadgeWithIcon`                                  | sign inside a colored `BadgeWithIcon` with an arrow                     |
| Investor identity          | initials `Avatar` + hand `<a>`                                        | `Avatar` + `Button link-gray`                                             | `Avatar` + `Button link-gray` (`#`)                                     |
| Ticker identity            | `Badge` brand pill wrapped in `<a>`                                   | `Badge` (not a link)                                                      | `Badge` (not a link)                                                    |
| Views                      | `Tabs` underline (NativeSelect on mobile)                             | `Tabs` underline                                                          | none (Kjøp/Salg ButtonGroup)                                            |
| Paywall teaser             | 3 rows + paywall inside the same TableCard                            | 3 rows card + separate paywall card                                       | 2 rows + separate paywall card                                          |
| Money format               | "67,88 M NOK"                                                         | "+67,88" in "Verdi (MNOK)"                                                | "67,88 mill. kr"                                                        |

All three agree on: ticker as a brand `Badge`, `Avatar` initials, `TableCard`, ComboBox filters, and signed nb-NO numbers.

They diverge on the same concepts everywhere the docs say nothing or contradict each other:

- the mobile many-column table
- the >6-option period selector
- filter placement
- the buy/sell badge
- link-in-cell
- number alignment
- the money unit
- the teaser shape

## Root causes

1. **No mobile pattern for wide data tables** (all three; Haiku's off-screen sign; Sonnet's 4100 px card list; Opus's custom stacked cells).
    - `page-patterns.md` says only "Fewer columns; ticker stacked over name"; `table.md` offers only `hidden md:table-cell`.
    - Fix in `skills/fa-design-system/references/page-patterns.md` (Data table) and `references/components/table.md`. Pick one: stacked cells (Opus) or a row card, and say which value may never be hidden (the signed change).
    - Ideally design it in Figma.
2. **Period selector rules contradict each other.**
    - `button-group.md:13-21` says 2–6 options, otherwise `Select`.
    - `page-patterns.md` (Period selector) says `ButtonGroup`, "keep it on one row below md".
    - The brief and the live page have 9 periods. The result was three different controls.
    - Fix: a period-selector component, or one rule covering >6 periods, in `page-patterns.md` and `button-group.md`.
3. **Library bug: logged-out `SiteHeader` overflows at 375 px.** The "Meny" button ends at x=382 in all three logged-out renders.
    - Fix in `components/application/site-header/site-header.tsx` (the right-hand actions: Logg inn + Kjøp + Meny don't fit). Add it to `docs/figma-parity.md` or a bug list.
4. **No way to right-align a `Table.Head`, and no link-in-cell guidance.**
    - Opus hacked `[&>div]:justify-end`. Sonnet left numbers left-aligned. Haiku didn't align.
    - The ticker badge "always a link" has no `href`.
    - Fix: add `align` to `Table.Head` in `components/application/table/table.tsx` and document it in `table.md`. Add a "link in a table cell" rule (or `Table.Row href` / `onRowAction`) to `table.md` and `page-patterns.md` (Ticker badge).
5. **`TableCard` vs the layout card surface clash.**
    - `TableCard.Root` is `rounded-xl bg-primary shadow-xs ring-1`; `layout.md` cards are `rounded-2xl border bg-primary_alt`.
    - Sonnet "fixed" it with a className fill override; Opus reported it.
    - Fix: align `TableCard` with the card surface in `table.tsx` (or document the exception in `layout.md`).
6. **Filters above or inside the card contradict each other.** `layout.md:34` ("filter rows above the cards") vs `page-patterns.md` ("One card with filters on top"). Haiku went one way, the others the other. Fix: one sentence in both files.
7. **Paywall stand-in describes a login wall, not a data teaser.**
    - The `page-patterns.md` paywall box uses SocialButtons and "Fortsett med e-post". It doesn't say how many rows a teaser shows, whether sort and filters are disabled, or how one-primary applies next to the header's primary.
    - Result: 2 vs 3 rows, inside vs outside the card, 2–3 filled buttons on screen.
    - Fix in `page-patterns.md` (Paywall box), and clarify per-section vs per-view in SKILL.md rule 11.
8. **No buy/sell or number-format rule.** Kjøp/Salg badge or not; "M NOK" vs "MNOK" vs "mill. kr"; ownership decimals; signed transaction value. Fix in `page-patterns.md` (Change value) and `anti-patterns.md` (anti-placeholder-data gives only "1 234,50 kr").
9. **English strings in library components** (`Pagination` "Previous/Next/Page 1 of 1/10 per page", `DateRangePicker` presets and footer, ComboBox "Search"/⌘K). These are documented gaps, not fixed. Visible on every render. Fix: label props in `components/application/pagination/pagination.tsx` and `date-picker/*`.
10. **SKILL.md's own example doesn't compile.** `ButtonUtility icon={Edit}` (SKILL.md rule 5), but `fa-icons` exports no `Edit` (verified). Fix in `skills/fa-design-system/SKILL.md`.
11. **Brief ambiguity.** The Fredriksen example has no date, holding or executing company. Haiku kept it null and the period filter hid it. Opus and Sonnet invented values. Fix: complete the example in `briefs/05-bjellesauer.md`, or state "invent plausible values".
12. **Haiku's story uses `parameters.viewport.defaultViewport`** while the others use `globals.viewport`. Nothing in the skill says how experiment stories should set the viewport. Minor; document it in CONTRIBUTING or the experiment brief template.
