# Audit: how agents use the design system (28 Oct 2026)

Status: **findings and proposals, nothing applied.** Branch `agent-guidance` at `fdc5cdf` (main
pulled). Evidence: the skill, the component source, 17 agent-built pages (5 in `sandbox/pages/`,
12 in `sandbox/runs/2026-10-27-finansavisen-prototypes/`), their notes, the run's eval reports, and
live checks in Storybook at 375 px.

## TL;DR

1. **The header problem has three causes, all verified.** (a) The Meny button is clipped 7 px off
   the right edge at 375 px when logged out: a library bug. (b) 9 of 16 prototypes never pass
   `menu`, so the button does nothing: the page-shell snippet every builder copies omits it. (c) The
   ones that pass `menu` copy the reference's example, which carries about 5 of 38 navigation
   entries and 1 of ~75 menu entries. The full content exists only in `site-header.demo.tsx`, which
   the package excludes. Agents cannot get it, and two prototypes imported the demo anyway.
2. **Agents get nothing from Storybook.** Their only input is the skill (`SKILL.md` +
   `references/`), linked into apps by `scripts/setup.mjs`. Storybook's Docs pages show the same
   skill pages, so Storybook and agents can't disagree; but the skill points at demos and stories
   in 12 places that an app agent can't open.
3. **The reference pages are accurate.** Every props table, union and default matched the code.
   The gaps are omissions: undocumented statics and seven components with no page.
4. **Token and markup rules are solved.** Across 17 pages: zero hex, palette, `dark:`, motion,
   emoji, foreign icons, raw buttons or placeholder names. Drift is now structural: rebuilding what
   the library has, restyling `Table` cells, hand-rolled `<a>` links, unprefixed type imports,
   under-fed `SiteHeader`, and notes that describe the plan instead of the code.
5. **The skill contradicts itself in 17 places and repeats itself in ~20**, and the always-loaded
   path is 74 KB (target was 40). Most of the earlier run's recommendations are still open.

---

## 1. The site header

### What was verified (Storybook, 375 × 812, logged out)

| Check                                                         | Library story `Application/Site header/Fa` | `runs/…/opus/02-pluss-artikkel` | `runs/…/sonnet/03-bors` | `pages/stock-page` |
| :------------------------------------------------------------ | :----------------------------------------: | :-----------------------------: | :---------------------: | :----------------: |
| Document width (viewport 375)                                 |                    382                     |               382               |           382           |        375         |
| Meny button right edge                                        |                    382                     |               382               |           382           |         –          |
| Clicking Meny opens a panel                                   |                    yes                     |             **no**              |         **no**          |        yes         |
| Links in the panel (library demo has 76, 2 groups, 5 columns) |                     76                     |                –                |            –            |       **6**        |

### Causes

- **Overflow bug** ([site-header.tsx:205](../components/application/site-header/site-header.tsx:205)).
  The top row is `gap-8` and the right cluster holds Logg inn + Kjøp + Meny with `gap-3`; the row's
  content is 366 px in a 343 px box, so the Meny icon's right 7 px are off-screen and the page
  scrolls sideways. Signed in, it fits. Every eval in the run flagged it; it is not in
  `docs/figma-parity.md` or any bug list.
- **The page-shell snippet omits the menu.**
  [page-patterns.md:16](../skills/fa-design-system/references/page-patterns.md:16) is
  `<SiteHeader brand="fa" navigation={navigation} shortcuts={shortcuts} tickerItems={ticker} />`:
  no `menu`, `user`, `onSearchPress`, `current`, no sticky class. It is the first code a builder
  copies. The MUSTs that would add them live only on `site-header.md` (lines 48–66), and
  `site-header-menu` is a SHOULD. Without `menu` the component renders a button that calls an
  undefined `onMenuPress` and does nothing.
- **The reference example is a stub and there is no data source.** `site-header.md` `## Example`
  has 2 nav groups / 5 items / 1 dropdown of 3, 3 shortcuts, 2 ticker items, and a menu of one
  column with one item. It also invents "Makro" and "Eiendom" as nav items (they are Meny
  categories) and omits Forum, Investorchat, Watchlist, Bjellesauer, Aksjer, Valuta, 400 Rikeste
  and Video. `groups`, `links`, `publications`, `partners`, `highlights` appear only as type names.
  The complete Finansavisen content (3 groups, 3 dropdowns with 27 sub-links, 6 shortcuts, 8 ticker
  items, menu with 24 column links, 32 categories, 5 lists, 2 publications, 4 partners, 3
  highlights, eAvis) exists only in `site-header.demo.tsx`, and `package.json` `files` has
  `!**/*.demo.tsx`. Kapital and Motor have no content anywhere.
- **Secondary:** the skill's ticker format (`"1 193,30"`, `"-1,59%"`) differs from the demo's
  (`"1.193,30"`, `"11,69%"`) and from the change-value rule (`+2,4 %`), so pages end up with two
  number formats (opus 03, haiku 01). `SiteNavItem` has no badge field for the "NY" marker. The
  desktop search field has no `value`/`onSubmit`, so "search for a ticker" briefs rebuild it.

### Prototype header data, for the record

| Page                           | `menu` | nav entries | `user` | `onSearchPress` | notes                                 |
| :----------------------------- | :----: | ----------: | :----: | :-------------: | :------------------------------------ |
| pages/stock-page               |  yes   |          51 |  yes   |       yes       | menu: 2 columns, 3 links              |
| pages/portfolio-watchlist      |  yes   |         ~45 |  yes   |       yes       | small menu                            |
| pages/notable-investors-trades |  yes   |         ~15 |  yes   |       yes       | small menu                            |
| pages/market-overview          |   no   |         ~25 |   no   |       yes       |                                       |
| opus 01 / haiku 01             |  yes   |     ~35/~15 |  yes   |       yes       | haiku: "one placeholder column"       |
| opus 02, 03, 04, 05            |   no   |       15–66 |  some  |      some       | 04: 66 items but no handlers          |
| sonnet 01, 03, 04              |   no   |      ~25–40 |  some  |      some       |                                       |
| sonnet 02, 05                  |  yes   |      (demo) |   no   |       no        | import `site-header.demo` (unshipped) |
| haiku 05                       |   no   |          10 |   no   |       no        | bare header, no ticker                |

### Fixes

1. Ship the real content: `components/application/site-header/site-content.ts` (or per brand:
   `fa-site-content.ts`, `kapital-…`, `motor-…`) exporting `navigation`, `shortcuts`, `menu`,
   `tickerSample`. Make the demo import it, make `site-header.md`'s example import it, and add a
   rule: "Use the shipped content unless the brief changes it; never type a navigation by hand."
2. Make the page-shell snippet complete (`menu`, `user`, `onSearchPress`, `current`, sticky +
   `collapsed`), or better, make it import the shipped content.
3. Fix the 375 px overflow (shrink gaps below `sm`, or hide "Kjøp" below `sm`, which Figma's
   "Site header Buy can be off" gap already suggests). Add a 375 px logged-out story and a layout
   check in `npm test` (Storybook test-runner or a Playwright probe asserting
   `scrollWidth === 375`).
4. Either require `menu` (type-level: `menu: SiteMenuContent`) or hide the Meny button when neither
   `menu` nor `onMenuPress` is given. A rendered button that does nothing is the worst option.
5. One ticker/number format, in one place (see §5, change value).

---

## 2. Where agents get their information

```
Figma ──(hand-written)──► skills/fa-design-system/*.md ──► SKILL + references (shipped in package)
                                                           │
components/*.tsx ──(react-docgen)──► Storybook props table  │   scripts/setup.mjs ──► app/.claude/skills (symlink)
                                     + the same .md page    │                      ──► app/AGENTS.md (rules + index)
                                                           ▼
                                                   agent builds the page
```

- Storybook is **not** an input. The run's builders were forbidden to open it; app agents can't.
  Its Docs pages render the same `.md` (`parameters.skillDoc`), so Storybook can't be more right
  than the skill. 12 of 54 story files don't attach a skill page (five chart stories,
  `header-navigation`, `badge-groups`, `radio-cards`, `file-upload-trigger`, `payment-icons`,
  `featured-cards`, `foundations`), so a human reading Storybook sees the default autodocs there.
- Props are the one thing generated from code (docgen in Storybook). The skill's props tables are
  typed by hand and happen to match today; nothing checks them.
- **What the skill tells agents to use but an app can't open:** demo files (`carousel.md:12,38,45,105`
  "start from it / copy the arrow classes from the demo"; `charts.md:5,29-32` "the demo files are
  the patterns; copy the one closest"; `app-navigation.md:125`; `pagination.md:35`;
  `figma-map.md:409,435`), Storybook (every "See also", `tabs.md:43`, `slideout-menu.md:36`,
  `SKILL.md` step 5 `npm test`), `@/` aliases (`SKILL.md:27,85`), `public/images` (`SKILL.md:207`),
  `docs/agents/page-analysis.md` (`layout.md:5`, not in `files`). The two sonnet prototypes that
  imported `site-header.demo` did exactly what `SKILL.md`'s Setup paragraph invited ("inside the
  library repo … imported as `@/components/...`").
- `scripts/setup.mjs` writes an AGENTS.md block with four rules and the index, no version, no
  allow-list. Nothing in an app enforces any rule mechanically: no eslint preset, no
  `no-restricted-imports`/`no-restricted-syntax`, no manifest.

---

## 3. Accuracy of the reference pages

All 41 pages checked against their `*Props` interfaces, defaults and statics: **no wrong size,
color, default or union value found.** The header page's data shapes (`SiteNavItem`, `TickerItem`,
`SiteMenuContent`) are complete. Omissions, ranked by how likely they are to produce wrong UI:

1. `app-navigation.md` never gives the `NavAccountType` shape (`nav-account-card.tsx:16-26`) that it
   tells agents to fill, and under-specifies `NavItemType.items` / optional `href` (`config.ts:6,12`).
2. `select.md` omits `MultiSelect.Footer` and `MultiSelect.EmptyState` (`multi-select.tsx:44-92`),
   whose English defaults leak when search finds nothing; also `defaultSelectedKeys`,
   `NativeSelect` option `disabled`.
3. No page at all for `BackgroundPattern`, `Illustration`, `QRCode`, `IPhoneMockup`,
   `SectionDivider`, `PlayButtonIcon`, `Dot` (`button-group.md` says "JSX for a `Dot`" with no
   import path).
4. `TickerBar.duration` exists but `SiteHeader` doesn't expose it; the page says use the bar only
   through `tickerItems`.
5. `slideout-menu.tsx` exports a second `Modal`, `ModalOverlay`, `Dialog`; an auto-import of the
   wrong `Modal` renders a side sheet.
6. `input.md` omits `TextField` and the `*ClassName` hooks; `charts.md` omits
   `ChartLegendContent.reversed` and has no `## Props`; `prompt-modal.md` omits
   `isKeyboardDismissDisabled`.
7. Doc errors that survived the run: `SKILL.md:178` uses an `Edit` icon that `fa-icons` doesn't
   export; `table.md:10` imports `SortDescriptor` unprefixed, breaking rule 19 in the rule's own
   example (8 prototypes copied it); `input-variants.md:99` names a Storybook title that doesn't
   exist.

---

## 4. Organization of the skill

**Size.** Must-read before the first component: `SKILL.md` 23 KB + `page-patterns.md` 15 +
`layout.md` 11 + `tokens.md` 25 = **74 KB** (~19k tokens); +56 KB `figma-map.md` for a Figma
frame. ~60 % of `tokens.md` (lines 15–123) is Untitled boilerplate prose, including palette advice
("gray-500 is more accessible") that contradicts rule 7.

**Contradictions (17).** The ones that produced drift:

| Topic                | Side A                                                                           | Side B                                                                                                                    |
| :------------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| Change value         | `page-patterns.md:167` and `table.md:69`: always a colored `span`, never a Badge | `charts.md:46`, `progress.md:23`, `badge.md:3`: `BadgeWithIcon` ("+2,4 %")                                                |
| Table header labels  | `page-patterns.md:69`, `tokens.md:170`: `font-medium uppercase tracking-wide`    | `Table.Head` renders `font-semibold`, sentence case; `table-no-restyle` forbids fixing it                                 |
| Row hover            | `layout.md:55`: `bg-primary_hover`                                               | `table.md:57`: keeps `bg-secondary`                                                                                       |
| Number format        | `SKILL.md:197`: `+2,4 %`                                                         | `page-patterns.md:185`: two decimals, U+2212; `site-header.md:63`: `"-1,59%"`; demo: `1.193,30`                           |
| Links                | `SKILL.md:127` fa-links: `Button` link colors                                    | `table.md:53`: never a link `Button` in cells; headline/ticker links unspecified anywhere                                 |
| `stroke-*`           | `SKILL.md:165`: never                                                            | `charts.md:62`: `stroke-utility-brand-600 stroke-2` required                                                              |
| Card title           | `card-header.md:25` card-header-always MUST                                      | `period-selector.md:71` bare `h2`; `table.md:118` `description="Oppdatert 14:32"` which `card-header-no-subtitle` forbids |
| Inset radius/padding | `layout.md:22` `rounded-xl`                                                      | `page-patterns.md:251` `rounded-2xl p-4`                                                                                  |
| Sheet breakpoint     | `modal.md:52`: below `sm`                                                        | `page-patterns.md:76`: below `md`                                                                                         |
| Empty table          | `layout.md:154`: `EmptyState`, not an empty table                                | `empty-state.md:40`: inside `Table.Body` so headers stay                                                                  |
| Aligned figures      | `tokens.md:152`: `font-mono`                                                     | `layout.md:145`, `table.md:64`: `tabular-nums`                                                                            |
| "Not in code" lists  | `SKILL.md:239`                                                                   | `figma-map.md:401`, `figma-parity.md` §2: three lists, different entries                                                  |

**Duplication (~20 pairs).** Card surface classes in 4 files; body padding under `CardHeader` in 3;
Tabs-vs-ButtonGroup in 5 files plus 7 unqualified "ButtonGroup or Tabs" mentions; period-selector
rule under two ids (`period-selector-under-chart`, `charts-period-below`); `logos-*` rules twice in
`flags-logos.md` with different `aria-hidden` text; the component index in `SKILL.md`,
`figma-map.md` and the generated AGENTS.md block; contributor rules (Aria prefix, kebab-case) in
both `SKILL.md` and `CLAUDE.md` although `CLAUDE.md:17` says it doesn't repeat them.

**Stale/fragile references.** 17 `§N` anchors into `figma-parity.md` across 13 pages; 16
`file.tsx:NN` line refs in `figma-map.md`; 12 pointers to demos/Storybook; a circular logo-stack
reference (`page-patterns.md:220` ↔ `SKILL.md:247`) with no stand-in anywhere; `cx` used in 3
files with its import path (`fa-design-system/utils/cx`) stated nowhere; Figma node ids live in 19
story `design` parameters but in only one skill page, so a Figma-first agent can't get from a node
id to a rule.

**Structure.** Step 1 sends the agent to `page-patterns.md` for the shell, every shell row defers to
`layout.md`, and widths live in `layout.md` while the frame snippet hard-codes 1376. The two
"decided" layout rules sit under a "Status: flexible" banner (`layout.md:7`), which is why four
prototypes shipped no `max-w`. Page template varies: opener `Use when` (37) / `Which one` (2) /
`Choose` (2); `## Figma parity` on 15 of 41; `## Props` missing on charts; 97 rules without a
"Because", 2 without a modal verb, none with ids in `page-patterns.md` despite MUST-strength text.

---

## 5. Drift in agent-built pages

Hard rules: **0 hits in 17 pages** for hex, palette steps, `white`/`black`, `dark:`, motion
classes, `onClick` on div/span, raw `<button>`/`<input>`/`<select>`, foreign icon libraries, emoji,
Lorem/John Doe/`$`, `outline-none`, gradients/animations, external images, `{open && <Modal`.

What drifts, with the cause the evidence supports:

| Drift                                                                                                                                            | Pages | Cause                                                                                                                                                                                                                      |
| :----------------------------------------------------------------------------------------------------------------------------------------------- | ----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rebuilt card header / period selector / in-card switch                                                                                           | 9 run | Components didn't exist on 27 Oct (`CardHeader`, `PeriodSelector` landed 28 Oct); the prose stand-in couldn't fit 375 px; `ButtonGroup` capped at 6 while briefs had 9 periods. **0 of 5 sandbox pages** rebuilt anything. |
| `Table.Cell className="font-medium text-primary"`, `[&>div]:justify-end` on `Table.Head`, `TableCard` fill override                              |     8 | `layout.md:158` demands right-aligned numeric headers but `Table.Head` has no `align`; docs prescribe uppercase heads the component can't render; `table.md`'s own example restyles a cell                                 |
| Hand-rolled `<a>` for headlines, names, tickers                                                                                                  |    14 | fa-links covers "Se alle" and prose only; four builders wrote that headlines "fit neither"; `Badge` has no `href` though the ticker badge is "always a link"                                                               |
| Unprefixed `Key` / `SortDescriptor` / `Selection` type imports                                                                                   |     8 | `table.md:10` shows it; rule 19 is #19 of 20 and doesn't mention type imports                                                                                                                                              |
| `@/` imports (12) and `.demo` imports (2)                                                                                                        |    14 | `SKILL.md` Setup says in-repo code uses `@/`; the run folder was in the repo; no shipped nav data                                                                                                                          |
| `SiteHeader` under-fed (no `menu` 9, no `onSearchPress` 5, no `current` 5, no `user` when signed in 1)                                           |     9 | Shell snippet omits them; the MUSTs are only on the component page                                                                                                                                                         |
| No `max-w`, arbitrary width, inset on page bg, card on reading page                                                                              |     7 | "Status: flexible" banner; widths undecided at run time                                                                                                                                                                    |
| Placeholder content ("Annonsør AS", `href="#"` ×13)                                                                                              |     6 | Rule 15 bans three literal strings, not the behaviour; nothing covers hrefs or advertiser names                                                                                                                            |
| Notes describe the plan, not the code (3 of 5 sandbox pages say `ButtonGroup` where the code has `Tabs`; `CardHeader description` doesn't exist) |     7 | No step says "re-read the notes against the final file"                                                                                                                                                                    |

By model (run, 18-point eval): Opus 15.8, over-builds and discloses; Sonnet 12.6, silently drops
parts and restyles, under-reports in notes; Haiku 11.0, under-fills the header and duplicates its
features as cards, cleanest tokens. By page type: front page reads as a dashboard for all three;
article links all hand-rolled; market overview tables clip in ⅓ cards; instrument sub-nav built two
incompatible ways; data-table mobile solved three ways.

---

## 6. Library bugs surfaced (not in any bug list today)

| Bug                                                                                                                                                          | Where                                                           |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| Logged-out header overflows 375 px by 7 px; Meny icon clipped                                                                                                | `site-header.tsx:205`                                           |
| Meny renders as a live button with no `menu`/`onMenuPress`                                                                                                   | `site-header.tsx:180`                                           |
| `NativeSelect` gives label and `<select>` the same id, and `aria-labelledby` points at the select itself                                                     | `select-native.tsx:46-56`                                       |
| `Table.Head` has no `align`; numeric columns can't have right-aligned headers                                                                                | `table.tsx`                                                     |
| `Table.Row` uses `transition-colors` (rule 10 says bare `transition`)                                                                                        | `table.tsx`                                                     |
| `Table.Cell size="sm"` never applied on instrument pages (72 px rows)                                                                                        | eval 04                                                         |
| `TableCard.Root` is `shadow-xs ring-1` while `layout-card-border`/`layout-no-card-shadow` say border, no shadow                                              | `table.tsx:65`                                                  |
| English strings in shipped components: `pagination.tsx` (10), `DateRangePicker` Cancel/Apply, `MultiSelect.EmptyState`                                       | builders wrap in `AriaI18nProvider` themselves                  |
| `SiteHeader` desktop search has no `value`/`onSubmit`                                                                                                        | `site-header.tsx:79-95`                                         |
| 44 unprefixed `react-aria-components` import lines in `components/` itself                                                                                   | `grep -rn 'from "react-aria-components"' components`            |
| `MultiSelect.Footer` labels ("Reset", "Select all") and `MultiSelect.EmptyState` "Clear search" are hard-coded English with no prop                          | `multi-select.tsx:64,67,106`                                    |
| `InputGroup.Prefix` accepts `position` and `isDisabled` but never uses them (the addon wrapper decides the side)                                             | `input-group.tsx:10-15`                                         |
| `BackgroundPattern pattern="grid-check" size="lg"` type-checks but throws at render (no `lg` SVG); patterns drop every prop except `className`               | `shared-assets/background-patterns/index.tsx`, `grid-check.tsx` |
| `grid-check.tsx` uses palette hex (`#D0D5DD`, `#F2F4F7`), so it ignores dark mode and `className` color                                                      | `shared-assets/background-patterns/grid-check.tsx`              |
| `QRCode` appends a new QR on every `value`/`size`/`options` change without clearing the container; an inline `options` literal re-appends every render       | `shared-assets/qr-code.tsx`                                     |
| `Illustration` spreads `type` onto the `<div>`; `IPhoneMockup` has a fixed `clipPath` id (two on a page share it) and its JSDoc default for `theme` is wrong | `shared-assets/illustrations/index.tsx`, `iphone-mockup.tsx`    |
| `PlayButtonIcon` is a plain `div` with hover styles and `text-white`; unused in the library                                                                  | `foundations/play-button-icon.tsx`                              |

---

## 7. Making agents always use the right specs, tokens and rules

Ranked by leverage. A = mechanical (can't be ignored), B = content, C = library, D = process.

### A. Make the right thing the only thing available

1. **Ship data, not examples.** Site navigation, shortcuts, menu, ticker sample, footer links,
   publisher info: one shipped module per brand. Reference pages import it. Same for any content an
   agent would otherwise invent (Oslo Børs instrument list with tickers and names, a `nb` number
   formatter, a `Change` component). This is the only fix that makes "all menu items" guaranteed.
2. **Generate what can be generated.** A `components.json` manifest (export → import path → props
   from docgen) produced by a script, checked in CI against the hand-written `## Props` tables and
   the `SKILL.md` index. Today nothing stops a props table from going stale; it matches by luck.
3. **An eslint preset shipped as `fa-design-system/eslint`**, run by `npm run sandbox:check` and by
   apps: `no-restricted-imports` (`react-aria-components` without `Aria` alias, `lucide-react`,
   `*.demo`, `@/` outside the repo), `no-restricted-syntax` (hex/palette/`dark:` class strings,
   `className` with `bg-`/`text-`/`rounded-` on library components, `onClick` on div/span,
   `href="#"`, Lorem). The run found 0 token violations because models are good at string rules;
   the remaining drift is exactly what a linter catches (type imports, restyles, demo imports).
4. **A layout probe in CI**: render each story and sandbox page at 375 and 1440, assert
   `scrollWidth === viewport`, no element past the edge. The header bug would never have shipped.

### B. Fix the content

5. **One page-shell snippet, complete, importing the shipped data**, and the shell/width/surface
   material merged into one ordered "Page" reference (shell → width → surfaces → grid → card →
   text pairings). Drop the "flexible" banner; the rules are decided.
6. **Resolve the 17 contradictions** (§4), starting with the four that drive drift: change value,
   table header style, links in cells/headlines/tickers, `stroke-*` scope. Delete duplicates so each
   rule has one home; keep cross-links.
7. **Cut the always-loaded path below 40 KB**: strip `tokens.md` 15–123 to one Fa line per token,
   move contributor rules (19, 20, `npm test`) to `CLAUDE.md`, move the index to the generated
   manifest.
8. **Remove every pointer an app can't follow** (demos, Storybook, `@/`, `public/images`,
   `page-analysis.md`), or ship the thing (export `CarouselIndicator`/arrows, chart presets, add
   `page-analysis.md` to `files`). Replace `§N` anchors with heading anchors; drop `file.tsx:NN`.
9. **Fill the omissions** (§3): `NavAccountType`, `MultiSelect.Footer`/`EmptyState`, pages for the
   shared assets and `Dot`, `TickerBar.duration`, the second `Modal` warning, `cx` import path, the
   `Edit` icon, `table.md:10`.
10. **Normalize the page template** and give every rule an id, one modal verb and a Because;
    `page-patterns.md` gets ids. Add a closing self-check paragraph to `SKILL.md` ("before handing
    over: shipped nav data used, no `@/`, no type import unprefixed, notes match the file, 375 px
    has no horizontal scroll").

### C. Fix the library

11. Header: overflow, dead Meny button, ticker format, `SiteNavItem.badge`, search API.
12. Table: `Table.Head align`, header style matching the docs (or docs matching the code),
    `TableCard` surface, `size="sm"`, `transition-colors`.
13. Norwegian defaults in `Pagination`, `DateRangePicker`, `MultiSelect.EmptyState`; fix
    `NativeSelect` ids; prefix the 44 in-library imports.

### D. Process

14. **Notes reconciliation step** in `sandbox/README.md`: after the page passes `sandbox:check`,
    re-read the notes against the file; a notes claim that names a component the file doesn't
    import is a failed build.
15. **Re-run the five briefs** (new run folder, same ground truth) after A1–A3 and B5–B6 land, and
    compare the compliance scan. The run README already describes the procedure; the sandbox pages
    from 28 Oct show the direction is right (0 rebuilt components), so the next run should confirm
    structural drift drops too.
16. **Golden pages**: promote the best sandbox page per shell to a linked, maintained example (or
    ship it), so agents copy a verified page instead of a prose stand-in.

---

## 8. Earlier recommendations, status today

From `reports/setup-audit.md` and `reports/best-practices-research.md` (27 Oct):

| Recommendation                                                                                      | Status                                                                                       |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| One change-value recipe                                                                             | Applied in `page-patterns`; `charts.md`, `progress.md`, `badge.md` still say `BadgeWithIcon` |
| Build CardHeader, PeriodSelector, ChangeValue, Teaser, NewsItem, KeyFigure, filter chip Figma-first | CardHeader + PeriodSelector done; rest still prose                                           |
| Golden pages linked from the skill                                                                  | Sandbox pages exist, unlinked, unshipped                                                     |
| Lint preset for apps                                                                                | Not started                                                                                  |
| Generated manifest / drift check                                                                    | Not started                                                                                  |
| Table fixes (surface, heads, align)                                                                 | Not started                                                                                  |
| Norwegian defaults                                                                                  | Not started                                                                                  |
| Header overflow, NativeSelect ids, search API                                                       | Not started                                                                                  |
| Doc fixes (`Edit`, ticker format, `table.md:10`, badge field)                                       | `ButtonUtility href` fixed; the rest open                                                    |
| Always-loaded context < 40 KB, self-check, scored eval                                              | 74 KB (was 69); no self-check; no scoring script                                             |
| Sandbox with its own Storybook, Untitled content removed, Figma map, PR template                    | Done                                                                                         |
