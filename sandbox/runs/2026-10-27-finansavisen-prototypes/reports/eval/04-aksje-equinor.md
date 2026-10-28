# Evaluation: 04-aksje-equinor (Equinor stock page)

Independent evaluation of `experiments/finansavisen-prototypes/{opus,sonnet}/04-aksje-equinor/`, compared with the brief, the ground truth (finansavisen.no/ticker/EQNR/markedsdata) and `skills/fa-design-system/`.

## Scores

| Criterion                  |  Opus  | Sonnet |
| :------------------------- | :----: | :----: |
| Component reuse            |   3    |   3    |
| Rule compliance            |   3    |   2    |
| Fidelity to the real page  |   2    |   2    |
| Visual quality as rendered |   2    |   2    |
| Accessibility              |   2    |   2    |
| Honesty of notes.md        |   3    |   3    |
| **Total (of 18)**          | **15** | **14** |

Within the 2s on fidelity: Sonnet is closer to the real page. It is one long page with a 10-item sub-nav and 14 cards in the default view. Opus shows 7 cards on "Oversikt" and puts the rest behind invented tabs. On rule compliance and accessibility, Opus is the cleaner of the two.

## 1. Screenshots and console

Shots are in `(session scratchpad)/shots/04-aksje-equinor/`: `{opus,sonnet}-{desktop,mobile}-{light,dark}.png`, plus `extra/` with these:

- the page scrolled, to check the sticky price
- the watchlist menu open, and the page after picking a watchlist
- Opus's Analyse, Regnskap and Rapporter tabs
- the 5Y period

- **Console:** both prototypes log one 404 per story, for `/_vercel/insights/script.js`. That comes from the Storybook build, not the prototypes. There are no React errors or page errors.
- **Page height:** desktop is 2567 px (Opus) and 3779 px (Sonnet). Mobile is 5030 px and 7219 px.
- **Horizontal overflow at 375 px:** both pages are 382 px wide. The cause is the library's `SiteHeader`: the menu button ends at x=382. It is not the prototypes.
- **Dark mode:** both pages switch cleanly, with no unstyled parts. The second bar series (`utility-brand-300`) is low-contrast against the dark card in both.

## 2. Per-prototype findings

### Opus

**Component reuse (3).**

- **Library components used:** SiteHeader/Footer, Tabs with real `Tabs.Panel`s, NativeSelect, ButtonGroup, Button, ButtonUtility, Dropdown (multi-select section with `selectionIndicator="checkbox"`), Badge/BadgeWithDot, Avatar, FeaturedIcon, Tooltip, Table, ProgressBar, EmptyState, `notify` toasts and the Recharts helpers.
- **Elements it composed itself:**
    - Stand-ins documented in `page-patterns.md`: WidgetCard (with FeaturedIcon, as the stand-in shows), ChangeValue, LiveIndicator, news item, key-figure `dl`, filter chips, paywall box (adapted to an inset).
    - Not documented anywhere: the sticky PriceBar, the "Forsinket 15 min" variant of the live indicator, the flush WidgetCard for tables, the "Mer om Equinor" link card (link-gray Buttons) and the watchlist menu.
    - It hand-wrote a `HelpTip` (`TooltipTrigger` with `aria-label`, `04-aksje-equinor.tsx:472-480`), which is correct.
    - Every one of these was declared in the notes.

**Rule compliance (3).**

- No hex values, palette colors, `dark:`, `duration-`/`ease-` or `outline-none`.
- One primary button (the paywall CTA, `:1012`).
- `className` on library components is limited to layout and `hidden sm:table-cell`.
- **Minor issues:**
    - `import type { Key } from "react-aria-components"` (`:26`) is unprefixed. It is a type, but rule 13 is literal.
    - `font-medium text-primary` on `Table.Cell` (`:823`, `:847`) breaks **table-no-restyle**. The table.md example does the same thing (see root causes).

**Fidelity (2).**

- **Present:**
    - quote head with live indicator, sticky price, period selector with changes, chart
    - key figures (8 of the 12 in the ground truth)
    - news with FA/TDN/Børsmeldinger/Pressemeldinger filters
    - analyst consensus, recommendations table, technical indicators (behind a paywall), results chart with Årlig/Kvartal
    - order depth, key figures card, latest trades (with broker codes, which is a nice touch)
    - dividends, financial calendar, reports and earnings calls, and a "further areas" link card
- **Missing:**
    - the real-time notice bar (it only appears when `realtime={false}`)
    - depth bars and totals in the order book
    - the stacked recommendations chart, the median-target range slider and "Omsetning i dag vs. historisk"
    - EPS, Børsverdi and Siste rapport in the key-figure grid
- **Invented:**
    - The ticker strip. The ground truth says "No ticker strip".
    - Five content tabs: Oversikt, Nyheter, Analyse, Regnskap og utbytte, Rapporter og kalender. The real page is one long page, and its sub-nav links to _other pages_.
    - On Oversikt the reader does not see recommendations, technical signals, results, dividends or reports.
    - Technical signals are paywalled and the story has no subscriber state, so SMA/RSI/MACD never render (`extra/opus-desktop-tab-Analyse.png`).

**Visual quality (2).**

- **Good:** desktop is tidy within `max-w-container`, and the header band (chart ⅔, figures ⅓) reads well.
- **Problems:**
    - **Order book clipped on desktop.** At 1440 px the Ordredybde table is 552 px inside a 389 px card. 163 px is hidden behind a horizontal scroll, so the _sell volume and count columns are not visible_ (`opus-desktop-light.png`, second crop).
    - **Trades clipped.** "Siste handler" cuts "Kjøper / selger" to "NON / MSI".
    - **Rows too tall.** Table rows are 72 px even though the code sets `size="sm"` (library bug, see root causes). Density is far below the real page, which shows about 9 trade rows.
    - **Empty space.** The consensus card has a large empty area under three bars, because it is stretched to the news card's height.
    - **Mobile:** the sticky bar is about 150 px tall (roughly 20 % of the viewport), the period selector hides "Maks" behind a sideways scroll, and "24 analytikere" runs to the card edge.

**Accessibility (2).**

- **Good:**
    - one `h1`, `h2` on every card, all tables named
    - period items carry their change in `aria-label` ("1D, −1,46 %")
    - Pluss `Lock` icons are named, changes are signed, and the watchlist menu uses `menuitemcheckbox` with toast feedback
- **Problems as rendered (both from library bugs):**
    - One unnamed button: the `Table.Head` tooltip trigger on "Kjøper / selger".
    - The section `NativeSelect`'s `aria-label="Velg seksjon"` is overridden by `aria-labelledby` pointing to its own id.
- **Prototype choice:** numbers are left-aligned (a deliberate trade-off so headers line up), which goes against layout.md.

**Notes honesty (3).**

- Accurate and very thorough. It flags 17 skill gaps, including the NativeSelect bug, the table alignment clash, the `TableCard` vs card-surface clash and the period selector not fitting.
- It says plainly that Storybook was not viewed.
- One claim is wrong: it says `Table.Cell` at `size="sm"` is `px-5`. In fact `sm` is never applied. It could not have seen that without rendering.

### Sonnet

**Component reuse (3).**

- **Library components used:** the same set as Opus (minus FeaturedIcon and EmptyState), plus `Alert` and `AvatarLabelGroup`.
- **Elements it composed itself:**
    - Documented stand-ins: WidgetCard, Change, news item, filter chips, period selector, live indicator, the `Stat` grid and the `Row` key-figure list.
    - Not documented: the fixed compact price strip (IntersectionObserver), the watchlist dropdown, the "Åpne Equinor-forumet / Se bjellesauer / Topp 50" button row, and the Alert used as the paywall inside a card.
- **Deviation:** WidgetCard drops the FeaturedIcon tile that the stand-in specifies (`:300-311`). The notes don't mention this.

**Rule compliance (2).**

- No hex values, palette colors, `dark:`, motion classes or `outline-none`. React Aria types are imported from `react-aria`.
- **Violations:**
    - `Tabs` used as page navigation: items have `href` and there are no `Tabs.Panel`s (`:525-531`). That breaks the MUST **tabs-ids**, and tabs.md says page navigation should not be tabs.
    - `Alert` nested inside a card as the paywall (layout-one-card-level).
    - Content straight on the page background: the real-time Alert and the bottom button row.
    - **Signal vocabulary not "the same everywhere"** (layout.md): recommendations use sentence-case `Kjøp/Hold/Selg` badges, while technical signals use `KJØP/SELG`.
    - **Misleading icons:** `ArrowUp` on "Se bjellesauer" and `ArrowDown` on "Topp 50 aksjonærer" (`:902-906`).
    - `className="text-right"` on `Table.Head` (`:691-693`) has no effect.
    - `text-primary` on cells, the same issue as Opus.

**Fidelity (2, the stronger of the two).**

- **Structure:** one long page, like the real one.
    - The sub-nav has 10 of the real 12 items.
    - The real-time notice Alert matches section 2 of the ground truth (without the toggle).
    - Every brief module is visible without clicking: results chart, recommendations, technical indicators with values, dividends, reports and calls.
    - The three-up rows mirror the real page.
- **Missing:** the same as Opus (depth bars and totals, stacked recommendations chart and slider, turnover vs. history).
- **Invented:** the ticker strip.
- **Mismatch:** the 1Å/5Å labels don't match the brief's 1Y/5Y.

**Visual quality (2).**

- **Good:** dense and well proportioned on desktop.
- **Problems:**
    - No max width: at 1440 px the cards run to 1376 px.
    - Order book headers are left-aligned over right-aligned numbers, and visibly misaligned ("Kjøp" header at x≈948, values ending at x≈1046).
    - About 160 px of empty space under the results chart.
    - The EQNR badge floats far right next to "Følg".
    - **Mobile:**
        - the chart drops the y-axis (`YAxis hide={!isTablet}`, `:465`), so it has no price scale
        - "Oslo Børs ·…" is truncated
        - Ordredybde hides 93 px (the "Salg, antall" column) and Utbytte hides 29 px (the "Beløp" column) behind a sideways scroll
    - The compact sticky strip works well (`extra/sonnet-mobile-scrolled.png`).

**Accessibility (2).**

- **Good:** headings, named tables, and a named icon-only star button in the sticky strip.
- **Problems:**
    - Tab semantics are used for links.
    - The NativeSelect navigates on `onChange` through `location.hash`.
    - Visible "−1,5 %" doesn't match the aria label "−1,46 prosent".
    - The watchlist menu shows no checkbox affordance until an item is picked.
    - No y-axis on mobile.
    - It has the same NativeSelect naming bug as Opus.

**Notes honesty (3).**

- It reports the Tabs-without-panels choice, the nested Alert clash, the `text-right` and `text-primary` contradiction, the missing max width and that Storybook was not viewed.
- It does not mention dropping the FeaturedIcon or the arrow icons. Both are minor.

## 3. Cross-model consistency

Wherever the two models diverge, the system is missing guidance.

| Concept                       | Opus                                                                                                | Sonnet                                                                                             | Verdict                                                                                                          |
| :---------------------------- | :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| Quote header                  | One row: square EQ avatar, `h1`, ticker badge, price `text-display-xs`; lives inside the sticky bar | `AvatarLabelGroup` (round), ticker badge on the far right, price `text-display-lg` on its own line | **Diverged.** No instrument-header spec                                                                          |
| Sticky price                  | Whole quote row `sticky top-0`, always on (~150 px on mobile)                                       | Compact `fixed` strip shown by IntersectionObserver after the big price leaves the screen          | **Diverged.** No pattern; both invented one                                                                      |
| Period selector + changes     | ButtonGroup with two-line items; changes hidden below `md`; sideways scroll; labels 1Y/5Y           | Same structure; labels 1Å/5Å; changes rounded to 1 decimal                                         | **Converged on the workaround.** The stand-in ("keep on one row") is impossible at 375 px, and the labels differ |
| Key-figure grid               | 2×4 `dl` in a column beside the chart                                                               | 8-up row under the chart (2/4/8 columns)                                                           | **Diverged**                                                                                                     |
| Sub-navigation                | 5 content tabs with panels, plus a "Mer om Equinor" link card                                       | 10 Tabs-as-links (no panels) + NativeSelect + a bottom button row                                  | **Strongly diverged.** No component or pattern for instrument sub-nav                                            |
| News + source filters         | ButtonGroup chips, Avatar source, meta line, lock                                                   | Identical                                                                                          | **Converged** (the stand-in works)                                                                               |
| Order depth                   | 6 columns (count/volume/bid/ask/volume/count), left-aligned                                         | 4 columns, right-aligned cells under left headers                                                  | **Diverged.** Neither has depth bars; no bid/ask pattern                                                         |
| Analyst consensus             | Inset with median target + 3 ProgressBars (Kjøp/Nøytral/Selg)                                       | Inset + 3 ProgressBars (Kjøp/**Hold**/Selg)                                                        | **Converged on the component, diverged on wording.** No distribution pattern                                     |
| Technical signals             | Fully paywalled (inset + primary CTA)                                                               | Visible table with KJØP/SELG badges + overall "Nøytral"                                            | **Diverged.** No "partly gated card" pattern; the brief is ambiguous                                             |
| Trades / dividends / calendar | Tables; dividends per year with yield; calendar with CalendarAdd                                    | Tables; dividends per payment; calendar with CalendarAdd                                           | Mostly converged                                                                                                 |
| Watchlist action              | "Watchlist" Dropdown, checkbox section, "Ny watchlist", toast                                       | "Følg" Dropdown, checkmarks, no feedback; strip has a plain toggle                                 | **Diverged** in label, indicator and feedback                                                                    |
| Real-time / delayed           | Gray "Forsinket 15 min" badge (only when not real-time)                                             | Full-width `Alert` "Du ser sanntidskurser…"                                                        | **Diverged.** No delayed state for the live indicator                                                            |
| Card header                   | FeaturedIcon + `h2`                                                                                 | `h2` only                                                                                          | **Diverged** from the stand-in                                                                                   |
| Page width                    | `max-w-container`                                                                                   | None                                                                                               | **Diverged.** "Page width isn't fixed"                                                                           |

## 4. Root causes and where to fix them

| #   | Failure seen                                                                                                                                                                           | Cause                                                                                                                                                                                         | Type                                                                          | File to fix                                                                                                                  |
| :-- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| 1   | 72 px rows and `px-6` cells although both set `<Table size="sm">`; tables overflow ⅓ cards (Opus order book hides 163 px on desktop; Sonnet hides columns on mobile); low data density | `TableRoot` provides `context?.size ?? size`, but the default context is `{size:"md"}`, so the `size` prop on `Table` is ignored outside `TableCard`                                          | **Library bug.** table.md **table-size-once** documents the intended behavior | `components/application/table/table.tsx:50,110-114`                                                                          |
| 2   | Numbers can't be right-aligned under their headers (Opus left-aligns everything; Sonnet's headers don't line up)                                                                       | `Table.Head` wraps the label in a flex group with no alignment prop; `className="text-right"` does nothing                                                                                    | **Missing prop**, which contradicts layout.md "Alignment"                     | `table.tsx:172-200` (add `align`); `skills/.../components/table.md`                                                          |
| 3   | Unnamed button in Opus                                                                                                                                                                 | `Table.Head` tooltip `TooltipTrigger` has no `aria-label` and no focus ring                                                                                                                   | **Library bug**                                                               | `table.tsx:~195`                                                                                                             |
| 4   | Section select named by its option, not "Velg seksjon"                                                                                                                                 | `<label>` and `<select>` share an id; `aria-labelledby` points to itself and overrides `aria-label`                                                                                           | **Library bug.** select.md tells you to pass `aria-label`                     | `components/base/select/select-native.tsx:40-50`                                                                             |
| 5   | Both mobile pages are 382 px wide at 375 px                                                                                                                                            | SiteHeader top row: `gap-8` + search + Logg inn + Kjøp + menu are too wide                                                                                                                    | **Library bug** (every page at 375 px)                                        | `components/application/site-header/site-header.tsx:202`                                                                     |
| 6   | Sub-nav built two incompatible ways (content tabs vs Tabs-as-links)                                                                                                                    | tabs.md says page navigation isn't tabs and points to SiteHeader or app-navigation; neither fits a stock page's 12-item sub-nav. The Instrument profile shell lists "tabs" in the header band | **Contradictory docs / missing pattern**                                      | `skills/.../references/page-patterns.md` (Page shells: add an "Instrument sub-nav" pattern); `references/components/tabs.md` |
| 7   | Two different sticky prices; Opus's takes about 20 % of a phone screen                                                                                                                 | "Price always at hand" is common on this page type, but there is no sticky price bar pattern or guidance on stacking with the header                                                          | **Missing pattern**                                                           | `page-patterns.md` (Instrument profile header band, sticky price bar); `site-header.md` (sticky stacking)                    |
| 8   | Period selector can't fit; both hide changes on mobile and scroll sideways                                                                                                             | The stand-in requires one row with the change under each label                                                                                                                                | **Unclear / impossible rule**                                                 | `page-patterns.md` → Period selector                                                                                         |
| 9   | Order book has no depth bars or totals; analyst split shown with ProgressBar (Hold vs Nøytral)                                                                                         | No order-book or distribution (stacked bar) pattern                                                                                                                                           | **Missing component/pattern**                                                 | `page-patterns.md`; `references/components/progress.md` / `charts.md`                                                        |
| 10  | Technical signals fully paywalled (Opus) vs nested Alert (Sonnet)                                                                                                                      | The paywall box stand-in is a full-page card; nothing covers gating one card                                                                                                                  | **Missing pattern**                                                           | `page-patterns.md` → Paywall box (add an in-card variant)                                                                    |
| 11  | Delayed-data state invented differently                                                                                                                                                | The live indicator has no delayed variant; the brief says both "live 14:12" and "delayed unless real-time"                                                                                    | **Missing pattern + brief ambiguity**                                         | `page-patterns.md` → Live indicator; `briefs/04-aksje-equinor.md`                                                            |
| 12  | Both added a ticker strip that the real stock page doesn't have                                                                                                                        | The page frame snippet always passes `tickerItems`                                                                                                                                            | **Doc default**                                                               | `page-patterns.md` → "The frame every page sits in"                                                                          |
| 13  | `text-primary` on `Table.Cell` in both                                                                                                                                                 | **table-no-restyle** forbids cell colors, but the table.md example uses `font-medium text-primary`                                                                                            | **Contradictory doc**                                                         | `references/components/table.md:46` vs `:64,97`                                                                              |
| 14  | Padding doubled or hand-made "flush" cards around tables; `TableCard` avoided                                                                                                          | `TableCard` (`rounded-xl shadow-xs ring-1`) contradicts the layout.md card surface; no guidance on a table inside a widget card                                                               | **Contradictory docs**                                                        | `table.md`, `layout.md` §1 / Widget card                                                                                     |
| 15  | One model is width-capped, the other full-bleed at 1440                                                                                                                                | "Page width isn't fixed yet"                                                                                                                                                                  | **Unclear rule**                                                              | `page-patterns.md`, `layout.md`                                                                                              |
| 16  | Signal wording inconsistent (Sonnet), Hold vs Nøytral across models                                                                                                                    | layout.md fixes KJØP/NØYTRAL/SELG for signals but says nothing about broker recommendations, and the live site uses "Hold"                                                                    | **Unclear rule**                                                              | `layout.md` → Signals                                                                                                        |
| 17  | Visual bugs (clipped tables, missing y-axis, empty card space) went unreported in both notes                                                                                           | Agents were told not to start Storybook, but SKILL.md step 6 requires viewing it                                                                                                              | **Process / brief**                                                           | experiment harness; `SKILL.md` step 6                                                                                        |
