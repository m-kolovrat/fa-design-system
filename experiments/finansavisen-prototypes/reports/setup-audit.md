# Fa Design System: setup audit for prototyping with real components

**Repo:** `/home/user/fa-design-system` at `1cb5aad` (main, package v0.1.1). **Date:** 2026-10-27.
**Method:** read-only. I read every AI entry point (CLAUDE.md, AGENTS.md, SKILL.md and all
references, docs/, TOKENS.md, CONTRIBUTING.md, scripts/, package.json, .storybook/, CI) and
checked their claims against the TypeScript props and style objects with grep and by reading the
source. `npm run tokens:check` passes. I did not run Storybook, the agent, or Figma, so I
couldn't check how things look or whether the Figma file matches. Everything below cites a file
and line.

---

## 0. Verdict in one paragraph

The _library-level_ documentation is unusually good. 39 component pages have accurate prop
tables, written rules, a priority order and honest "known gap" notes. The prop docs matched the
code on 13 of 14 components I checked closely. The weak point is the layer above the components,
which is what a Finansavisen prototype is mostly made of. Widget cards, change values, article
teasers, news feed items, key figures, period selectors and filter chips exist only as prose
stand-ins. Several of those stand-ins contradict the component pages or the components
themselves, and some send the agent to demo files the npm package doesn't ship. There are no
golden pages, no machine-readable manifest, no lint enforcement of the skill's rules and no eval
of agent output. Most stories still carry Untitled UI sample content in English, so the examples
humans and agents copy contradict the skill's own content rules. A PM has no runnable starting
point: no template app and no sandbox.

---

## 1. Coverage map

Legend: ✓ = yes, ✗ = no, ~ = partial or indirect. "Page" = a page in
`skills/fa-design-system/references/components/`. "Index" = listed in the SKILL.md component
index. "Story" = has its own story, or appears in one. "Demo" = a `.demo.tsx` exists. "Pkg" =
importable from the npm package. `exports["./components/*"]` exposes every non-story, non-demo
file (tsconfig.build.json excludes `**/*.story.tsx`, `**/*.demo.tsx` and `components/internal`),
and package.json `files` also excludes demos. **Demos are never in the package.** "Used" = imported
by anything other than itself.

### base/

| Component (file)                                                        | Page                                                              | Index                    | Story                                      | Demo                               | Pkg                 | Notes                                                                                    |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------ | ------------------------------------------ | ---------------------------------- | ------------------- | ---------------------------------------------------------------------------------------- |
| Button (`buttons/button.tsx`)                                           | ✓ button.md                                                       | ✓                        | ✓ (autodocs)                               | ✗                                  | ✓                   |                                                                                          |
| ButtonUtility (`buttons/button-utility.tsx`)                            | ~ 2 lines in button.md:65                                         | ~ mentioned              | ✗ (only inside table/featured-cards demos) | ✗                                  | ✓                   | The widget card, company row and byline stand-ins all depend on it                       |
| CloseButton (`buttons/close-button.tsx`)                                | ~ import line only                                                | ~ mentioned              | ✗                                          | ✗                                  | ✓                   |                                                                                          |
| SocialButton (`buttons/social-button.tsx`)                              | ✗ (flags-logos.md:30 says "see button.md"; button.md has nothing) | ~ mentioned              | ✓                                          | ✓                                  | ✓                   | The paywall stand-in needs it                                                            |
| App store buttons (`app-store-buttons.tsx`, `-outline.tsx`)             | ✗                                                                 | ~ "app store buttons"    | ✓                                          | ✓                                  | ✓                   | `GooglePlayWhiteButton` is code-only (parity §2)                                         |
| ButtonGroup                                                             | ✓                                                                 | ✓                        | ✓                                          | ✓                                  | ✓                   |                                                                                          |
| Badge family (`badges/badges.tsx`)                                      | ✓ badge.md                                                        | ✓                        | ✓ (autodocs)                               | ✗                                  | ✓                   | `BadgeIcon` appears in no story                                                          |
| BadgeGroup (`badges/badge-groups.tsx`)                                  | ✓ in badge.md                                                     | ✓                        | ✓                                          | ✓                                  | ✓                   |                                                                                          |
| Tags (`tags/tags.tsx` + base-components)                                | ✓                                                                 | ✓                        | ✓ (autodocs)                               | ✗                                  | ✓                   |                                                                                          |
| Dropdown (`dropdown/dropdown.tsx`)                                      | ✓                                                                 | ✓                        | ✓                                          | ✗                                  | ✓                   |                                                                                          |
| 14 dropdown "flavors" (`dropdown-account-*`, `-search-*`, `-avatar`, …) | ~ dropdown.md:40 says never import them                           | ✗                        | ✓                                          | ✗ (they are demos in all but name) | ✓                   | They ship in the package with Untitled UI content (§4)                                   |
| Select / ComboBox / MultiSelect / TagSelect / NativeSelect              | ✓ select.md                                                       | ✓ (one path for 5 files) | ✓                                          | ✓                                  | ✓                   | The SKILL.md:234 index gives only `select/select`; the other four live in separate files |
| Input, InputGroup, Label, HintText                                      | ✓ input.md                                                        | ✓                        | ✓                                          | ✓                                  | ✓                   |                                                                                          |
| InputDate / InputNumber / InputFile / InputTags(+Outer) / PaymentInput  | ✓ input-variants.md                                               | ✓                        | ~ through inputs.story                     | ✓                                  | ✓                   |                                                                                          |
| PinInput                                                                | ✓                                                                 | ✓                        | ✓                                          | ✓                                  | ✓                   |                                                                                          |
| Textarea                                                                | ✓                                                                 | ✓                        | ✓                                          | ✓                                  | ✓                   | sm/md vs one size in Figma (parity §4)                                                   |
| Checkbox                                                                | ✓                                                                 | ✓                        | ✓ (autodocs)                               | ✗                                  | ✓                   |                                                                                          |
| RadioButton / RadioGroup                                                | ✓ radio.md                                                        | ✓                        | ✓                                          | ✓                                  | ✓                   |                                                                                          |
| RadioCard / RadioCardGroup                                              | ✓ in radio.md                                                     | ✓                        | ✓ (Untitled content, `$10/month`)          | ✗                                  | ✓                   |                                                                                          |
| Toggle                                                                  | ✓                                                                 | ✓                        | ✓ (autodocs)                               | ✗                                  | ✓                   |                                                                                          |
| Slider                                                                  | ✓                                                                 | ✓                        | ✓                                          | ✓                                  | ✓                   |                                                                                          |
| Tooltip                                                                 | ✓                                                                 | ✓                        | ✓                                          | ✓                                  | ✓                   |                                                                                          |
| Avatar, AvatarLabelGroup                                                | ✓ avatar.md                                                       | ✓                        | ✓ (autodocs)                               | ✗                                  | ✓                   |                                                                                          |
| AvatarProfilePhoto                                                      | ✓ in avatar.md                                                    | ✓                        | ✗                                          | ✗                                  | ✓                   | **Unused** anywhere                                                                      |
| Avatar base-components (add button, company icon, count, online, tick)  | ~ avatar.md                                                       | ~                        | ~ (`AvatarAddButton` in none)              | ✗                                  | ✓ (explicit export) |                                                                                          |
| ProgressBar / ProgressBarCircle (`progress-indicators/*`)               | ✓ progress.md                                                     | ✓                        | ✓                                          | ✓                                  | ✓                   | `simple-circle.tsx` is **unused**                                                        |
| FileTrigger (`file-upload-trigger/`)                                    | ✓ in file-upload.md                                               | ✓                        | ✓                                          | ✗                                  | ✓                   |                                                                                          |
| Form / HookForm / FormField                                             | ✓ form.md                                                         | ✓                        | ~ (`Form` only; `HookForm` in no story)    | ✗                                  | ✓                   | `hook-form.tsx` has no importer                                                          |

### application/

| Component                                                             | Page                    | Index | Story          | Demo                        | Pkg            | Notes                                                                                          |
| --------------------------------------------------------------------- | ----------------------- | ----- | -------------- | --------------------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| Alert                                                                 | ✓                       | ✓     | ✓              | ✗                           | ✓              |                                                                                                |
| Notification + `notify()`                                             | ✓                       | ✓     | ✓              | ✗                           | ✓              |                                                                                                |
| Modal (+Header/Body/Footer)                                           | ✓                       | ✓     | ✓              | ✗                           | ✓              |                                                                                                |
| PromptModal                                                           | ✓                       | ✓     | ✓              | ✗                           | ✓              |                                                                                                |
| SlideoutMenu                                                          | ✓                       | ✓     | ✓              | ✗                           | ✓              |                                                                                                |
| Breadcrumbs                                                           | ✓                       | ✓     | ✓ (autodocs)   | ✗                           | ✓              |                                                                                                |
| Carousel (`carousel-base.tsx`)                                        | ✓                       | ✓     | ✓              | ✓ **(not shipped)**         | ✓              | carousel.md:12,44,97 tell the agent to copy `arrowClasses` / `CarouselIndicator` from the demo |
| Charts (`charts-base.tsx` helpers only)                               | ✓                       | ✓     | ✓ ×6           | ✓ ×6 **(not shipped)**      | ✓ helpers only | charts.md:5,29-32: "The demo files are the patterns; copy the one closest"                     |
| DatePicker / DateRangePicker / Calendar                               | ✓                       | ✓     | ✓              | ✓                           | ✓              |                                                                                                |
| EmptyState / ErrorState                                               | ✓                       | ✓     | ✓              | ✗                           | ✓              |                                                                                                |
| FileUpload (base, Draggable)                                          | ✓                       | ✓     | ✓              | ✓                           | ✓              |                                                                                                |
| LoadingIndicator                                                      | ✓                       | ✓     | ✓              | ✓                           | ✓              |                                                                                                |
| Pagination* (+Dot, Line)                                              | ✓                       | ✓     | ✓              | ✓                           | ✓              |                                                                                                |
| Table / TableCard                                                     | ✓                       | ✓     | ✓              | ✓ (Untitled "Team members") | ✓              |                                                                                                |
| Tabs                                                                  | ✓                       | ✓     | ✓              | ✓ (Untitled "My details…")  | ✓              |                                                                                                |
| SiteHeader (+TickerBar, SiteMenuPanel, NavDropdown, siteBrands)       | ✓                       | ✓     | ✓ (Figma link) | ✓                           | ✓              |                                                                                                |
| SiteFooter                                                            | ✓                       | ✓     | ✓ (Figma link) | ✓                           | ✓              |                                                                                                |
| App navigation: HeaderNavigationBase, 5 sidebars, nav base-components | ✓ app-navigation.md     | ✓     | ✓              | ✓                           | ✓              | `sidebar-navigation-base.tsx` (a barrel) has no importer                                       |
| Navigation featured cards                                             | ~ app-navigation.md:124 | ✗     | ✓              | ✓ demo only                 | ✗              | Partial build (parity §2)                                                                      |

### foundations/ and shared-assets/

| Component                                                            | Page             | Index                             | Story                             | Demo | Pkg          | Notes                                                                            |
| -------------------------------------------------------------------- | ---------------- | --------------------------------- | --------------------------------- | ---- | ------------ | -------------------------------------------------------------------------------- |
| FeaturedIcon                                                         | ✓                | ✓                                 | ✓ (filed under "Base components") | ✓    | ✓            |                                                                                  |
| Flag / logos (from `fa-icons`)                                       | ✓ flags-logos.md | ✓                                 | ✓                                 | ✗    | via fa-icons |                                                                                  |
| Payment icons                                                        | ~ flags-logos.md | ✗ (folded into "Flags and logos") | ✓                                 | ✗    | ✓            | 56 files/exports; figma-parity.md:95 says 57                                     |
| Social icons                                                         | ~ flags-logos.md | ✗                                 | ✗                                 | ✗    | ✓            |                                                                                  |
| RatingStars / RatingBadge                                            | ✓ rating.md      | ✓                                 | ✗                                 | ✗    | ✓            | **Unused**, no story, and the page is still listed in the index                  |
| Dot (`dot-icon.tsx`)                                                 | ✗                | ✗                                 | ~ inside others                   | ~    | ✓            |                                                                                  |
| PlayButtonIcon                                                       | ✗                | ✗                                 | ✗                                 | ✗    | ✓            | **Unused**                                                                       |
| Background patterns (4)                                              | ✗                | ✗                                 | ✗                                 | ✗    | ✓            | **Unused** (parity §3)                                                           |
| Illustrations (4)                                                    | ✗                | ✗                                 | ✗                                 | ✗    | ✓            | **Unused** (parity §3)                                                           |
| QR code                                                              | ✗                | ✗                                 | ✗                                 | ✗    | ✓            | **Unused**; the runtime dependency `qr-code-styling` is there only for this file |
| iPhone mockup                                                        | ✗                | ✗                                 | ✗                                 | ✗    | ✓            | **Unused**; 20+ hex fills, `dark:` variants                                      |
| Section divider                                                      | ✗                | ✗                                 | ✗                                 | ✗    | ✓            | **Unused**                                                                       |
| hooks/utils: `use-active-item`, `utils/countries`, `utils/timezones` | n/a              | n/a                               | n/a                               | n/a  | ✓            | **No importer** (CLAUDE.md still lists them)                                     |

**Coverage takeaways**

- Every **library** component a news page needs has a page and is in the index. The gaps are
  sub-components that the patterns rely on: `ButtonUtility`, `SocialButton`, `CloseButton` and the
  app store buttons have no documented props of their own.
- Only 7 of 52 story files use autodocs (button, badges, checkbox, toggle, avatar, tags,
  breadcrumbs). Only 10 have a Figma `design` parameter, and no Storybook addon renders it
  (`.storybook/main.ts` has only `@storybook/addon-themes`).
- 13 shipped files are dead: shared-assets ×5 groups, play-button-icon, rating-badge, rating-stars
  (used only by rating-badge), simple-circle, avatar-profile-photo, hook-form,
  sidebar-navigation-base, plus 3 utils/hooks. They make the component surface look bigger, and an
  agent browsing `node_modules` will find them.

---

## 2. Doc ↔ code accuracy

I compared 14 component pages with their props interfaces and style objects. **The prop tables
are accurate**: sizes, colors, defaults and required props matched the code for button, badge,
tabs (including the `manual` keyboardActivation that the `Tabs` wrapper sets at tabs.tsx:220),
table, input, select, site-header, site-footer, pagination, modal, tags, carousel and charts
(helpers). I also spot-checked toggle, checkbox, alert, notification, breadcrumbs, featured-icon
and loading-indicator: all matched. The mismatches are below, followed by conflicts _between_
docs, which matter more.

### 2a. Prop / behaviour mismatches

| #   | Doc                                                                                                                                             | Code                                                                                                                                  | Mismatch                                                                                                                                                                                                                                                                                                                          |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | avatar.md:67 "`AvatarLabelGroup`: all of the above plus…"                                                                                       | avatar-label-group.tsx:16 `size: "sm" \| "md" \| "lg" \| "xl"` (required)                                                             | The doc implies xs–2xl with default `md`. In code `size` is **required** and limited to sm–xl. `<AvatarLabelGroup title subtitle src/>` without `size` fails the type-check and crashes at `styles[props.size]` (line 25).                                                                                                        |
| 2   | button.md:65 `ButtonUtility`: size, color, icon, tooltip, tooltipPlacement                                                                      | button-utility.tsx:39-50: also `href`, `isDisabled`, native button/anchor attributes                                                  | `href` isn't documented, yet page-patterns.md:51 (widget card) uses `ButtonUtility … href`. The types are `DetailedHTMLProps` (`onClick`), but the component renders `AriaButton` (line 66), while button.md says "Use `onPress`, not `onClick`".                                                                                 |
| 3   | page-patterns.md:45 "a round chevron link", using `ButtonUtility`                                                                               | button-utility.tsx:95 `rounded-sm p-1.5`                                                                                              | `ButtonUtility` is a square with 6 px corners, not round. Agents will either accept a non-round chevron or restyle it with `rounded-full`, which breaks button-no-restyle.                                                                                                                                                        |
| 4   | button.md, flags-logos.md:30 "SocialButton (see button.md)"                                                                                     | social-button.tsx:43-47: `social: "google" \| "facebook" \| "apple" \| "twitter"`, `theme`, `size`, `disabled`                        | Not documented anywhere. It also uses `disabled`, not `isDisabled` (rule fa-state-props), and `twitter`, not `x`.                                                                                                                                                                                                                 |
| 5   | select.md:71 "`NativeSelect`: pass `aria-label` when there is no `label`"                                                                       | select-native.tsx:39 `<Label htmlFor={selectId} id={selectId}>` and :47-49 `id={selectId} aria-labelledby={selectId}`                 | **A11y bug.** The label and the `<select>` share an id, and `aria-labelledby` points at the select itself. It is spread _after_ `{...props}`, so it overrides, and it beats `aria-label` in name computation. The documented `aria-label` doesn't name the control. `aria-describedby={hintId}` is always set, even with no hint. |
| 6   | tabs.md "`badge` (number or string)"                                                                                                            | tabs.tsx:200 `{badge && (`                                                                                                            | `badge={0}` renders a bare "0". Counts of zero are common ("Varsler 0").                                                                                                                                                                                                                                                          |
| 7   | SKILL.md rule 6 "A placeholder is not a label"                                                                                                  | input.tsx:273 `aria-label={!label ? placeholder : undefined}`                                                                         | The component itself falls back to the placeholder as the accessible name, so an unlabeled input passes silently.                                                                                                                                                                                                                 |
| 8   | page-patterns.md:63, tokens.md:170 "header labels `text-xs font-medium uppercase tracking-wide text-quaternary`"                                | table.tsx:190 `text-xs font-semibold whitespace-nowrap text-quaternary`                                                               | The `label` prop renders semibold and not uppercase. To meet the documented style you must restyle (table-no-restyle forbids it) or pass `children` instead of `label`.                                                                                                                                                           |
| 9   | layout.md:21 card = `rounded-2xl border border-secondary bg-primary_alt`; layout.md:37 layout-no-card-shadow                                    | table.tsx:55 `TableCard.Root`: `rounded-xl bg-primary shadow-xs ring-1 ring-secondary`                                                | The layout rules recommend `TableCard`, and it breaks three of them: radius, shadow, and the `bg-primary` fill that is darker than the page in dark mode, which layout.md:26-29 explains.                                                                                                                                         |
| 10  | layout.md (dense finance tables)                                                                                                                | table.tsx:233 rows `h-14` / `h-18` (56/72 px)                                                                                         | That's SaaS density. page-analysis.md §3 notes the live tables are dense 14/20 rows. Not in figma-parity.md.                                                                                                                                                                                                                      |
| 11  | page-patterns.md:94 filter chips → `ButtonGroup selectionMode="single"`; layout.md:44 "a selected … chip `bg-active` or `bg-brand-primary_alt`" | button-group.tsx:23 `selected:bg-primary_hover selected:text-secondary_hover`; :16 joined segments, `rounded-md` ends                 | The stand-in renders a joined gray segmented bar. The live chips (page-analysis.md §3) are separate pills, selected in light brand. The layout rule and the component disagree on the selected color.                                                                                                                             |
| 12  | page-patterns.md:16-23 frame `bg-secondary_alt` page                                                                                            | site-header.tsx:284 `<div className="h-2 rounded-t-lg bg-secondary" />`                                                               | In dark mode `bg-secondary` is gray-900 and `bg-secondary_alt` is gray-950 (theme.css:824, 828), so the header's bottom lip doesn't match the page.                                                                                                                                                                               |
| 13  | button-no-restyle / fa-no-invented-variants                                                                                                     | site-header.tsx:222, 226 `Button size="sm" className="lg:px-3.5 lg:py-2.5"`                                                           | The library itself fakes an md button through `className`. Agents copy this.                                                                                                                                                                                                                                                      |
| 14  | site-header.md (header search)                                                                                                                  | site-header.tsx:79-95 `HeaderSearch` has no `value` / `onChange` / `onSubmit` / `action`, and `SiteHeaderProps` (98-129) exposes none | The desktop/tablet search field can't be wired up by an app; only the mobile icon has `onSearchPress`. Prototypes of "search for a ticker" will rebuild the header or the field.                                                                                                                                                  |
| 15  | tokens.md:316 page gutter `px-4 md:px-8`                                                                                                        | site-header.tsx:201 `lg:px-7.5`                                                                                                       | The header content sits 2 px off the page gutter at `lg`. Minor, but visible.                                                                                                                                                                                                                                                     |
| 16  | site-footer.md defaults `appTitle "Bruk Finansavisen-appen"`                                                                                    | site-footer.tsx:63                                                                                                                    | The default doesn't follow `brand`; a Kapital or Motor footer says Finansavisen unless overridden. The doc does list the default, so this is a code issue rather than a doc error.                                                                                                                                                |
| 17  | figma-parity.md:95 "Code has 57 brands"                                                                                                         | `components/foundations/payment-icons`: 56 icon files, 56 exports                                                                     | Off by one.                                                                                                                                                                                                                                                                                                                       |

### 2b. Conflicting instructions between documents

The two agents from section 3 would diverge on exactly these points:

1. **Change value has 3 recipes.**
   page-patterns.md:77-89 gives a plain `<span>` with `text-success-primary` / `text-error-primary`
   and nb-NO percent format.
   badge.md:15, charts.md:46, progress.md:23 and table.md:97-102 say `BadgeWithIcon` with
   `ArrowUp` / `ArrowDown`. table.md:100 colors `0` as success, while page-analysis says "plain for 0".
   ticker-bar.tsx:47-49 uses a third form: `text-fg-success-secondary` plus `TriangleUp` / `Down`.
2. **Ticker in a table.** page-patterns.md:65 says show it "as a ticker badge"; the table.md:97
   example uses plain `font-medium text-primary` text.
3. **Restyling cells.** table.md:46 (table-no-restyle) "NEVER restyle rows or cells with colors",
   but table.md:64 and :97 put `className="font-medium text-primary"` on a cell.
4. **`stroke-*`.** SKILL.md rule 4 says "never `stroke-*`"; tokens.md:136 offers
   `stroke-fg-tertiary`; charts.md requires `stroke-utility-*`. The rule means stroke _width_ on
   icons, but it doesn't say so.
5. **Copying demos.** charts.md and carousel.md tell agents to copy demo files that
   package.json `files` excludes (`"!**/*.demo.tsx"`). In an app they don't exist.
6. **Verification step.** SKILL.md step 6 says to check Storybook's Mobile/Desktop viewports and run
   `npm test` "in the library repo". In an app there's neither.
7. **Contribution rules.** CONTRIBUTING.md:9-10, 150-158 use `bun`, and CONTRIBUTING.md lists "Add
   missing component variants" as a contribution type. CLAUDE.md says npm and "Don't map, delete or
   add variants on your own". `bun.lock` and `package-lock.json` are both committed.
8. **Evidence file.** layout.md:4-5 and anti-patterns.md point to `docs/agents/page-analysis.md`,
   which the package `files` list leaves out. It's labelled "in the library repo", but an app agent
   can't open it.

---

## 3. Finansavisen-specific patterns: are the stand-ins deterministic?

Test: would two agents, given only the skill, produce the same markup?

| Pattern                       | Spec given                                               | Deterministic? | Why not                                                                                                                                                                                                                                                                                  |
| ----------------------------- | -------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Widget card                   | Full TSX snippet (page-patterns.md:47-55)                | **Mostly**     | The snippet is exact. But "round chevron" isn't round (2a #3), "icon tile" vs a round `theme="light"` FeaturedIcon is ambiguous, and the body ("Table or list") isn't specified: agents will pick `Table` vs `TableCard` vs `<ul>`, and `TableCard` brings its own card inside the card. |
| Ticker badge                  | Snippet                                                  | **Yes**        | Except table.md's example doesn't use it (2b #2).                                                                                                                                                                                                                                        |
| Change value                  | Snippet                                                  | **No**         | Three conflicting recipes (2b #1). nb-NO `Intl` output uses U+2212 minus and a no-break space, which differs from the hand-typed "+2,4 %" in examples. No absolute + percent pairing component, although layout.md:115 describes it.                                                     |
| Live indicator                | One line (`BadgeWithDot color="error"` + timestamp)      | Yes            | The live site's pulsing dot is left out silently. Fine.                                                                                                                                                                                                                                  |
| "NY" marker, Info message     | One line                                                 | Yes            |                                                                                                                                                                                                                                                                                          |
| Data table                    | Prose                                                    | **No**         | The header style contradicts `Table.Head` (2a #8). Numeric alignment (`text-right`) isn't shown in any example. No "–" cell or density guidance in code.                                                                                                                                 |
| Filter chips                  | Prose                                                    | **No**         | The `ButtonGroup` stand-in looks unlike chips and has the wrong selected color (2a #11). The dropdown chip + count + flag variant is three components composed freehand.                                                                                                                 |
| Period selector               | Prose ("items whose content is label plus change value") | **No**         | `ButtonGroupItem` is a one-row `inline-flex` with `min-h-*` (button-group.tsx:31-47). Stacking two lines needs a wrapper and height overrides, and each agent will do it differently.                                                                                                    |
| News feed item                | Prose with classes                                       | **Partly**     | The classes are given, but not the element structure (`article` / `li` / link wrapping), thumbnail size and aspect, where the ticker badge sits, or the click target.                                                                                                                    |
| Key figures (stat row)        | Prose                                                    | Partly         | Label weight differs between page-patterns.md:121 (`text-xs text-tertiary`) and layout.md:110 (`font-medium`). Grid vs flex, dividers and responsiveness aren't specified.                                                                                                               |
| Article teaser                | Prose only, explicitly "no token" for the serif          | **No**         | No sizes (hero / standard / list), no image ratio, no brand-fill variant classes, no markup. This is the front page.                                                                                                                                                                     |
| Article header                | Prose list of 8 parts                                    | No             | Order is given; markup and sizes are not. The 68 px headline has no token.                                                                                                                                                                                                               |
| Paywall box                   | Prose                                                    | No             | `SocialButton` is undocumented (2a #4); the box itself isn't specified.                                                                                                                                                                                                                  |
| Follow chips, AI prompt chips | One-line stand-in                                        | Mostly         | `aria-pressed` on `Button` isn't a documented prop; `Button` has no toggle state.                                                                                                                                                                                                        |
| Company row, Key-figure list  | One line                                                 | Mostly         |                                                                                                                                                                                                                                                                                          |
| Logo stack / Avatar group     | One line (SKILL.md coverage gaps)                        | Yes            |                                                                                                                                                                                                                                                                                          |

### Ranking: how likely each absence is to cause invention on a financial news site

Ranking = how often the pattern appears × how vague the stand-in is.

1. **Change value**: it's on every market datum, ticker bar, table, teaser and chart header,
   and has three conflicting recipes.
2. **Article teaser**: most of the front page and every section front, with prose only.
3. **News feed item**: Siste nytt, Børsnyheter, Markedsnytt and the sidebars. Prose only.
4. **Widget card / Card**: every Børs/Rapporter/sidebar block. There's a snippet, but `TableCard`
   competes with it, and "there is no `Card` component" (layout.md:60) means every agent writes the
   class string by hand.
5. **Data table, finance flavour**: header style, density, right-aligned numbers, ticker badge.
   The component exists, but the documented look can't be reached without restyling.
6. **Period selector**: above every chart.
7. **Filter chips**: above every feed and table.
8. **Key figures / stat row**: instrument and watchlist headers.
9. **Article header + byline/share**.
10. **Paywall box**.
11. Follow chips, AI prompt chips, logo stack, live indicator: lower frequency or already precise.

---

## 4. Untitled UI leftovers and debt

### 4a. Shipped component files with Untitled UI content (these go into apps)

- `components/base/dropdown/dropdown-account-*.tsx`, `dropdown-avatar.tsx`,
  `dropdown-search-*.tsx`, `dropdown-*-advanced.tsx`: "Olivia Rhye", `olivia@untitledui.com`,
  `www.untitledui.com/images/avatars/...` and "© Untitled UI". For example
  dropdown-account-card-md.tsx:27-30, 73 and 93, dropdown-search-advanced.tsx:28-65. dropdown.md:40
  forbids importing them, yet they ship as components.
- `application/app-navigation/base-components/nav-account-card.tsx:33-48` (caitlyn@untitledui.com,
  default `selectedAccountId = "olivia"`).
- `application/app-navigation/sidebar-navigation/sidebar-slim.tsx:99-154` (hard-coded Olivia Rhye).
- `application/app-navigation/header-navigation.tsx:153` links to `https://www.untitledui.com/`.
- `application/table/table.tsx:30-48`: exported `TableRowActionsDropdown` with English
  "Edit / Copy link / Delete" and no handlers.
- `base/radio-buttons/radio-cards.tsx:82` doc comment `"$10/month" or "@olivia"`.

### 4b. Stories and demos that break the skill's own content rules (anti-placeholder-data, anti-untitled-examples)

Files with Untitled or English placeholder content (number of hits):
`select.demo.tsx` (58), `inputs.demo.tsx` (55), `social-buttons.demo.tsx` (18),
`table.demo.tsx` (15, "Team members", "This is a tooltip"), `form.story.tsx` (12),
`prompt-modal.story.tsx` (7), `sidebar-navigation.demo.tsx`, `date-picker.demo.tsx`,
`radio-cards.story.tsx:20-28` (`$10/month`, untitledui avatars), `tabs.demo.tsx:10-16`
("My details", "Password", "API"), the chart demos (English labels, browser locale). Only
site-header, site-footer, button, breadcrumbs and modal stories use Norwegian or finance content.
Agents treat Storybook as the reference implementation, so this is the most likely source of
"Olivia Rhye on Finansavisen".

### 4c. Hard-coded English UI strings in shipped components (no prop to translate)

`pagination.tsx:48, 60, 83-125, 145-226, 282, 412` ("Previous", "Next", "Rows per page", "Go to
previous page"), `pagination-base.tsx:173, 231`, CloseButton "Close", Alert/Notification
"Dismiss", `Dropdown.DotsButton` "Open menu", carousel-base "Previous slide", date-picker
"Cancel"/"Apply"/"Select date", file-upload "Delete", PinInput "Enter digit 1 of 6", the password
toggle, `TagAvatar alt="Avatar"` (tags.tsx:127), `BadgeWithImage alt="Badge image"`. The skill pages
document this honestly (about 20 "English" notes across the component pages), but each one leaves
the agent to work around it, or to ship English to Norwegian readers.

### 4d. Code that breaks the skill's global rules

| Rule                                                         | Location                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No palette / primitive colors                                | `badges.tsx:78` `text-gray-500` (modern badge addon, not a documented override); `rating-stars.tsx:32` `text-warning-400`; `avatar-company-icon.tsx:24` `bg-brand-50`; `draggable.tsx:143` `bg-brand-700 text-white`; `ticker-bar.tsx:64` `hover:bg-gray-800` (accepted in parity §6); `site-brands.ts` ×33 (documented override, OK) |
| No hex                                                       | `textarea.tsx:27-28` `getResizeHandleBg("#D5D7DA")` / `"#373A41"`; `social-button.tsx:37` `bg-[#1877F2]` (brand color, defensible); `iphone-mockup.tsx:107-168`                                                                                                                                                                       |
| Alpha via `alpha-*`, not `white/` / `black/` (tokens.md:264) | `close-button.tsx:15` `bg-white/20`; `mobile-header.tsx:45` `bg-white/10`; `avatar.tsx:149` `outline-black/16`; `charts-base.tsx:65` `ring-black/10`; `draggable.tsx` `ring-black/5`                                                                                                                                                  |
| No `dark:` variants                                          | `textarea.tsx:39` `dark:[&::-webkit-resizer]`; `file-upload-base.tsx:270-271, 332-333` (`dark:hidden` icon swap); `iphone-mockup.tsx:36-41`; `pagination.story.tsx:10` `dark:bg-secondary`; `table.demo.tsx:793-850`                                                                                                                  |
| No `transition-all` / duration on hover                      | `date-picker.demo.tsx:332, 355` `transition-all duration-200` on a hover reveal; `progress-indicators.tsx:53`, `file-upload-base.tsx:324` `duration-75 ease-linear` (movement, but off the motion scale)                                                                                                                              |
| No className restyle                                         | `site-header.tsx:222, 226` (2a #13)                                                                                                                                                                                                                                                                                                   |
| Placeholder is not a label                                   | `input.tsx:273` (2a #7)                                                                                                                                                                                                                                                                                                               |
| Arbitrary values                                             | `avatar.tsx:137` `rounded-[7px]`; `featured-icon.tsx:88-91` `rounded-[8px]` / `[12px]` / `[14px]`; `tags.tsx:172` `rounded-[3px]`                                                                                                                                                                                                     |

### 4e. Stock Untitled UI look or behaviour not recorded in docs/figma-parity.md

- `TableCard` (shadow, rounded-xl, bg-primary) and 72 px rows: the Untitled SaaS table, against
  layout.md and the live dense tables (2a #9-10).
- `ButtonUtility` square 6 px corners, while `Button` is `rounded-full` everywhere
  (button.tsx:26-46). One library, two button shapes.
- `ButtonGroup` gray selected state vs the brand-tinted selected state the live chips and period
  selectors use (2a #11).
- The whole `app-navigation` family (SaaS sidebars, account cards, "Open in browser") and the
  dropdown flavors: Untitled patterns with no Finansavisen use case documented.
- `tokens.md` usage column: still the verbatim Untitled descriptions ("pricing page headers",
  "CTA sections", "Text editor tooltips", "This can be changed to gray-400"), tokens.md:145-247.

### 4f. Storybook and repo leftovers

- `.storybook/themes.ts` (194 lines: 30 "untitled-*" and Tailwind palette themes) and
  `.storybook/colors.css` (805 lines). `preview.ts:95-98` sets `themes.default: "untitled-primary"`,
  which isn't in the list. `withThemeByClassName` (preview.ts:102-108) never reads it, so all of
  this is dead.
- `preview.ts:34-80` storySort names stories that don't exist ("Command menus", "Shared
  Assets/Miscellaneous assets", "Verification Code Input", "Dropdowns", top-level "Textarea") and
  leaves out "Foundations". The real titles are "Dropdown menus", "Inputs/Textarea", and so on.
- `eslint.config.mjs:12` ignores `storybook-addon-pixel-perfect/dist`, which doesn't exist.
- Unused dependencies: `zod` (a runtime dependency with 0 imports), `qr-code-styling` (only the
  dead qr-code), `next-themes`, `eslint-plugin-tailwindcss` (installed, not configured),
  `@chromatic-com/storybook`, `eslint-plugin-import`, `eslint-plugin-simple-import-sort`,
  `eslint-plugin-react-refresh`.
- `bun.lock` committed next to `package-lock.json`.
- CONTRIBUTING.md:316 mentions a Discord.

---

## 5. Agent ergonomics

**Progressive disclosure.** The structure is right: SKILL.md (rules + index), then one page per
component. The baseline is heavy, though. SKILL.md is 20.9 KB / 326 lines, and steps 1-3 also
require page-patterns (9.5 KB), layout (8.7 KB), tokens (25.1 KB) and anti-patterns (4.8 KB):
**69 KB before the first component page**. A typical Børs market page needs about 9 component
pages (site-header, site-footer, table, badge, button, button-group, charts, tabs, featured-icon),
another **54 KB**. That's about 123 KB, roughly 30k tokens, across 14 files. About half of
tokens.md is Untitled boilerplate. The structure is good; the cost is in redundant text and in
having to read many prose stand-ins.

**Ambiguity and conflicts.** See §2b. The biggest problem is that the recipes for the most common
financial patterns disagree with each other and with the component code.

**Machine-readable manifest: none.** No props JSON, no `custom-elements.json`-style manifest, no
Figma Code Connect (`*.figma.tsx`: 0), no MCP server, no Storybook autodocs on 45 of 52 story
files, so no generated props tables. The only machine-readable inventory is
`package.json` `exports` (a wildcard, not a listing) and a Storybook `index.json` (story ids only)
if you build Storybook.

**How an agent finds out a component exists:** only through the SKILL.md index (or browsing
`node_modules/fa-design-system/components`). There's no barrel or index import, so it has to know
the exact file path. The index gives one path per row; for Select and Input variants that path
doesn't contain all the named exports (§1).

**Golden pages: none.** No example front page, market overview, instrument profile or article,
either as stories or in the skill. page-patterns.md describes the page shells only as a table plus
one 5-line frame snippet. Agents will invent page composition every time.

**Lint enforcement: almost none.** `eslint.config.mjs` turns on only `jsx-a11y/alt-text` from
jsx-a11y. There's no rule for palette classes, hex, `dark:`, `duration-*` on hover, restricted
icon imports, the `Aria*` prefix or kebab-case files. ESLint runs only on `components/`, and no
preset ships to apps, so in an app every global rule is prose only. The one machine-checked
invariant is token parity (`scripts/check-token-parity.mjs`, which passes).

**Evals: none.** CI (`.github/workflows/ci.yml`) runs `npm test` (type-check, lint, prettier,
tokens). There's no test that skill pages match props, no Storybook build, no visual or a11y
test, and no agent-output eval. The PR template (`.github/pull_request_template.md`) doesn't ask
for the skill page or parity doc to be updated, although CLAUDE.md requires both.

**App setup.** `scripts/setup.mjs` is good: it symlinks the skill so it follows the installed
version, adds an AGENTS.md block, and is safe to run twice. Gaps: it doesn't add a lint preset,
doesn't check the stylesheet import, and the linked skill references files that aren't shipped
(§2b #5, #8).

---

## 6. Human ergonomics

- **Storybook** is deployed (README link to Vercel; `vercel.json` builds it). It's organised as
  Base components / Application / Foundations, with a Fa-branded manager theme
  (`.storybook/manager.ts`) and a theme toggle and viewports. Weaknesses:
    - There's no "Start here" or Introduction MDX page, and no Patterns or Pages section.
    - Most stories show Untitled content in English (§4b).
    - Featured icons are filed under Base components.
    - Only 7 of 52 story files have props tables (autodocs).
    - Figma links are stored in 10 stories but nothing displays them.
    - The storySort list is stale.
- **README.md** is short and correct for devs (install from a git tag, the CSS import,
  `npx fa-design-system setup`).
- **CONTRIBUTING.md** is the stock Untitled UI contributing guide with emoji headings. It
  contradicts CLAUDE.md (bun vs npm, "add missing variants", Discord) and never mentions Figma
  first, the parity doc or the skill pages.
- **PM onboarding: none.** There's no template or starter app, no sandbox (StackBlitz /
  CodeSandbox / Codespaces), no `create-*` script and no sample data fixtures (tickers, news,
  prices). A PM would need to:
    1. Create a Next or Vite app with Tailwind v4 and React 19.
    2. Get access to the GitHub repo. It's installed as `github:m-kolovrat/fa-design-system#v0.1.1`,
       and if the repo is private that needs auth.
    3. Install it. A git dependency with `prepare` makes npm install the devDependencies (Storybook,
       Next, ESLint, …) and run `tsc` during install.
    4. Add the CSS import and run setup.

    Realistically a PM can't do this alone. With an agent it works, but the agent then starts from
    an empty page with no golden example.

- **Designers** have figma-parity.md and overrides.md, both clear and well maintained ("Last
  verified" 2026-10-26 and 2026-10-23), but no Code Connect, so Dev Mode in Figma shows no code.

---

## 7. Prioritised recommendations (top 15)

Effort: S < 1 day, M 1–3 days, L > 3 days. Impact is on "agents and humans produce correct Fa
pages from real components".

| #   | Recommendation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Effort | Impact      | Files to change                                                                                                                                                                                                                                                                                                       |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Pick one change-value recipe now** and make every page agree. Suggestion: the page-patterns span for inline text, and `BadgeWithIcon` only in dense tables, or the reverse. State the zero case and the absolute + percent pairing.                                                                                                                                                                                                                                                                                                                                                                                                                               | S      | Very high   | `skills/fa-design-system/references/page-patterns.md:77-89`, `components/badge.md:15`, `components/charts.md:46`, `components/progress.md:23`, `components/table.md:97-102`, `layout.md:115`                                                                                                                          |
| 2   | **Design and build the five most common Finansavisen components, Figma first:** `ChangeValue`, `Card` / `WidgetCard` (header slot, icon tile, chevron link), `ArticleTeaser` (sizes and fills), `NewsFeedItem`, `KeyFigure`. Then `PeriodSelector` and `FilterChip`. Each needs a story and a skill page.                                                                                                                                                                                                                                                                                                                                                           | L      | Very high   | new `components/application/{card,change-value,article-teaser,news-feed-item,key-figure}/`, `skills/.../references/components/*.md`, the SKILL.md index and "Coverage gaps", `docs/figma-parity.md` §2, `page-patterns.md`                                                                                            |
| 3   | **Add golden pages**: front page, Børs market overview, instrument profile and article, each as a story (`Pages/…`) and as a copyable file in the skill. Use real Norwegian data and only library components plus the stand-ins.                                                                                                                                                                                                                                                                                                                                                                                                                                    | M      | Very high   | new `components/pages/*.story.tsx` (or `examples/`), new `skills/fa-design-system/examples/*.tsx`, SKILL.md step 1, `package.json` `files`                                                                                                                                                                            |
| 4   | **Ship every pattern the docs tell agents to copy.** Either export `CarouselIndicator` / `CarouselArrow` and a `PriceChart` / `AreaChart` preset as components, or ship the referenced demos under `skills/.../examples/`.                                                                                                                                                                                                                                                                                                                                                                                                                                          | S–M    | High        | `components/application/carousel/carousel-base.tsx` + `carousel.demo.tsx`, `components/application/charts/*.demo.tsx`, `charts.md:5,29-32`, `carousel.md:12,44,97`, `package.json` `files`                                                                                                                            |
| 5   | **Fix `Table` / `TableCard` to the Fa card and finance table.** Card surface per layout.md, an uppercase header label style, a density decision, a numeric `align` on `Table.Head` / `Table.Cell`. Report the gaps in parity first (CLAUDE.md requires it).                                                                                                                                                                                                                                                                                                                                                                                                         | M      | High        | `components/application/table/table.tsx:52-60, 172-212, 221-255`, `table.md`, `page-patterns.md:61-65`, `docs/figma-parity.md` §4                                                                                                                                                                                     |
| 6   | **Ship and use a lint preset** that enforces the global rules. Regex `no-restricted-syntax` on className strings for palette classes, hex, `dark:`, `transition-all`, `duration-*` beside `hover:`. `no-restricted-imports` for `lucide-react`, `@untitledui/icons`, and non-aliased `react-aria-components`. Configure the installed `eslint-plugin-tailwindcss`. Have `setup.mjs` wire it into apps.                                                                                                                                                                                                                                                              | M      | High        | new `eslint-preset.mjs` (export it in `package.json`), `eslint.config.mjs`, `scripts/setup.mjs`, SKILL.md step 6                                                                                                                                                                                                      |
| 7   | **Generate a component manifest** (`react-docgen-typescript` at build time) listing name, import path, props, unions and defaults, shipped as `skills/fa-design-system/components.json`. Add a CI script that fails when a skill page's props table drifts from it. That would have caught 2a #1-#4.                                                                                                                                                                                                                                                                                                                                                                | M      | High        | new `scripts/build-manifest.mjs`, `scripts/check-skill-props.mjs`, `package.json` scripts/`files`, `.github/workflows/ci.yml`                                                                                                                                                                                         |
| 8   | **Remove Untitled content from what ships and what people copy.** Delete or demote the 14 dropdown flavors, `TableRowActionsDropdown`, the untitledui link in `header-navigation.tsx:153`, and the Olivia defaults in `nav-account-card.tsx` / `sidebar-slim.tsx`. Rewrite `select.demo`, `inputs.demo`, `table.demo`, `tabs.demo`, `form.story`, `radio-cards.story` and the chart demos with Oslo Børs data.                                                                                                                                                                                                                                                      | M      | High        | files in §4a/§4b                                                                                                                                                                                                                                                                                                      |
| 9   | **Norwegian strings by default.** Wrap the library in React Aria's `I18nProvider` defaults, or add a `labels` prop, and change the ~20 hard-coded English strings to nb-NO.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | M      | High        | `pagination.tsx`, `pagination-base.tsx`, `close-button.tsx`, `alert.tsx`, `notification.tsx`, `dropdown.tsx`, `carousel-base.tsx`, `date-picker*.tsx`, `file-upload-base.tsx`, `pin-input.tsx`, `input.tsx`, `tags.tsx:127`, `badges.tsx` (BadgeWithImage), then delete the "English" caveats in about 20 skill pages |
| 10  | **Fix the a11y and code bugs found.** NativeSelect ids and labelling; Tabs `badge={0}`; the Input placeholder-as-label fallback; a header search API (`onSearch` / `searchAction`); the header lip token in dark mode; the brand-aware footer default; the header Button `className` padding (use `size="md"` at `lg`, or report the variant).                                                                                                                                                                                                                                                                                                                      | S      | High        | `select-native.tsx:39,47-49`; `tabs.tsx:200`; `input.tsx:273`; `site-header.tsx:79-95,98-129,222,226,284`; `site-footer.tsx:63`                                                                                                                                                                                       |
| 11  | **Fix the doc errors and conflicts.** AvatarLabelGroup sizes; full ButtonUtility, SocialButton, CloseButton and AppStore props in button.md; separate index rows or paths for MultiSelect / TagSelect / NativeSelect; scope the "never `stroke-*`" rule to stroke width; give SKILL step 6 an app-context branch (the app's own dev server and lint); the "round" chevron wording; filter-chip and period-selector stand-ins that match the components or are marked as visually off.                                                                                                                                                                               | S      | Medium-high | `avatar.md:67`, `button.md:65`, `flags-logos.md:30`, `SKILL.md:216,234,step 6,rule 4`, `tokens.md:136`, `page-patterns.md:45,91-101`, `layout.md:44`                                                                                                                                                                  |
| 12  | **Slim the always-loaded context.** Replace the Untitled usage text in tokens.md with one Fa-specific line per token (or a short table plus a link), and move the page-type checklists into page-patterns. Target under 40 KB before the first component page.                                                                                                                                                                                                                                                                                                                                                                                                      | S      | Medium      | `skills/fa-design-system/references/tokens.md:138-247`, SKILL.md "Tokens" section                                                                                                                                                                                                                                     |
| 13  | **Remove dead code and dependencies** in one major version: shared-assets (5 groups), play-button-icon, rating-badge/stars (or give them a story), simple-circle, avatar-profile-photo, sidebar-navigation-base, `utils/countries`, `utils/timezones`, `hooks/use-active-item`; the dependencies `zod`, `qr-code-styling`, `next-themes`, `@chromatic-com/storybook` and the unused ESLint plugins; `bun.lock`; `.storybook/themes.ts` + `colors.css`. Update parity §3 and CLAUDE.md.                                                                                                                                                                              | S–M    | Medium      | the files in §1 and §4f, `package.json`, `.storybook/preview.ts:4,95-98`, `docs/figma-parity.md:87-96`, `CLAUDE.md` (project structure and hooks lists)                                                                                                                                                               |
| 14  | **Storybook for humans.** An Introduction MDX ("Start here", how to prototype, the Figma link); autodocs on every story; `@storybook/addon-designs` so the `design` params show the Figma frame, plus Figma links on the other 42 stories; `@storybook/addon-a11y`; a fixed storySort; a "Patterns" section with the stand-ins from page-patterns.md rendered. Add `build-storybook` to CI.                                                                                                                                                                                                                                                                         | M      | Medium-high | `.storybook/main.ts`, `.storybook/preview.ts:34-80`, new `.storybook/introduction.mdx`, `components/**/*.story.tsx`, `.github/workflows/ci.yml`                                                                                                                                                                       |
| 15  | **PM path and agent eval.** (a) A `fa-prototype-starter` template (Vite + Tailwind v4 + the package + setup already run + Oslo Børs fixtures + the golden pages) with a Codespaces/StackBlitz button in the README. (b) A small eval: about 10 prompts ("Vinnere/Tapere widget", "instrument header for EQNR", "article teaser row"). Score the agent's output with the lint preset (#6), `tsc` against the manifest (#7), "only library imports" and a screenshot diff against the golden pages. Run it when the skill changes. Also rewrite CONTRIBUTING.md (npm, Figma first, update the skill page and parity doc) and add those checkboxes to the PR template. | L      | High        | new template repo or `templates/`, new `evals/` + workflow, `README.md`, `CONTRIBUTING.md`, `.github/pull_request_template.md`                                                                                                                                                                                        |

**Suggested order:** first 1, 10 and 11 (all S, they remove the conflicts agents hit today), then
4, 8 and 3, then 6 and 7 (to stop it regressing), then 2 and 5 (needs Figma), then 9 and 14, then
12, 13 and 15.
