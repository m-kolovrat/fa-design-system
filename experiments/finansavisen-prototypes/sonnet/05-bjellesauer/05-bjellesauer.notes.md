# 05-bjellesauer (sonnet) - notes

Files: `05-bjellesauer.tsx` (`Bjellesauer`, prop `isSubscriber`), `05-bjellesauer.story.tsx` (Desktop, Mobile, Logged-out teaser). `tsc` and `eslint` are clean for this folder. Not viewed in Storybook (told not to start it), so the layout is untested visually.

## Components used
- `components/application/site-header/site-header` (+ `site-header.demo` fixtures: tickerItems, navigation, menu, shortcuts)
- `components/application/site-footer/site-footer` (+ `site-footer.demo` footerLinks)
- `components/application/table/table` (`TableCard.Root/Header`, `Table`) with sorting, row headers, tooltips on heads
- `components/application/pagination/pagination` (`PaginationCardDefault`)
- `components/application/tabs/tabs` (underline: Siste handler / Alle investorer / Vinnere og tapere)
- `components/application/date-picker/date-range-picker` (inside `I18nProvider nb-NO`)
- `components/application/empty-state/empty-state` (empty period)
- `components/base/select/select` (`Select.ComboBox` for stock and investor, `Select` for mobile sorting)
- `components/base/button-group/button-group` (9 periods), `buttons/button`, `input/input` (newsletter), `badges/badges` (ticker pill, Kjøp/Salg `BadgeWithIcon`), `avatar/avatar`
- Icons from `fa-icons`: ArrowUp, ArrowDown, Download, Lock, Mail

## Composed myself (no Figma frame)
- Mobile trade row (`TradeListItem`): below `md` the 9-column table is replaced by a list. Each row has investor, date, ticker and company, a Kjøp/Salg badge with signed shares and relative change, and an inset `dl` for value, ownership, holding and executor. The skill says "fewer columns, ticker stacked over name", but that would drop values the brief wants on a phone, so every value stays.
- Signed value (`Signed`): the skill's "change value" stand-in, with Intl `nb-NO`. The sign is always printed (the minus is U+2212), and the Kjøp/Salg badge carries the meaning in text.
- Winners/losers cards: widget-card stand-in (rounded-2xl card, header, list). I used plain `ArrowUp`/`ArrowDown` icons, not a `FeaturedIcon` tile.
- Paywall box: the stand-in from page-patterns, simplified. No `SocialButton`s, only "Kjøp abonnement" and "Logg inn".
- Filter row inside the table card, and the period -> date range linkage (the period sets the range; picking dates clears the period).
- Info and newsletter cards: plain section cards.

## Patterns (per skill)
New patterns:
- Card list for a table on mobile (trade card with label/value inset). Page-patterns says "fewer columns", with no pattern for tables with many equally important values.
- Buy/sell badge (`BadgeWithIcon` success/error with ArrowUp/ArrowDown and text "Kjøp"/"Salg") placed with a signed number. The skill only has KJØP/NØYTRAL/SELG as a *signal* badge and gives a table example using the badge for the change itself.
- Filter bar of two comboboxes + date range + period `ButtonGroup`, with a mobile sort `Select`. The "Filter chips" and "Period selector" stand-ins don't fit a nine-option period selector, so I made it horizontally scrollable on mobile.
- Tabs above a data card for "views" (trades / investors / winners and losers).
Clashes:
- `Table.Head` on a 9-column table needs horizontal scroll at ~1100px; the skill says to hide secondary columns with `hidden md:table-cell`, but all nine values are primary here.
- `ButtonGroup` has 9 items and the doc says "2-6 options" and "short labels", which this brief contradicts (it lists 9 periods). `Select` would be the doc's answer, but the brief asks for periods as a visible group.
- `DateRangePicker` presets, footer ("Cancel"/"Apply") and "Select date" are English and uneditable.
- Layout.md says "Card header right slot: exactly one item"; `TableCard.Header` here has the Download button as that one item, but the mobile sort select lives in the filter area instead.
- Top-of-page title, tabs and meta line sit on the page background outside a card. layout.md allows titles but not tabs outside a card; tabs on the page background seemed natural.

## Rules bent
- `fa-one-primary`: logged-out paywall has a primary "Kjøp abonnement" plus the header's own "Kjøp". Logged-in view has no primary except the newsletter submit.
- `className` on `Table.Cell` / `Avatar`-adjacent wrappers only for layout/typography (`font-medium text-primary tabular-nums` as the table doc suggests, `max-w-48 truncate`).
- Imports from `*.demo.tsx` files (site header and footer fixtures). Those don't ship in the package, so an app couldn't do this.
- Page width: no max width (skill says it isn't fixed).
- Locked teaser rows show all values (no blur allowed by the reject list). A real teaser would probably mask the numbers; I have no "locked value" pattern.

## Placeholder data to replace
- Only the first two trades come from the brief. For the Fredriksen row the relative change (+0,27 %) and holding (273 700 000) are invented. All other trades, investor names, executors, portfolio values, YTD returns and the 16 rows total are invented.
- I used fictional names for the extra investors on purpose, so no real person is shown with made-up trades. The real "bjellesauer" list is needed.
- No investor photos: `Avatar` falls back to initials. Real photo URLs needed.
- Inclusion rules text is a placeholder (marked with "[Plassholder ...]"); the disclaimer text and the "Hegnar" footer are paraphrased from the demos. "fra 99 kr" comes from the skill.
- The reference date for periods is hard-coded to 26.10.2026 ("today" in the brief). The default period 1U shows 20.-26.10; 1D shows the empty state, which is realistic with T+2.
- Links (`/bjellesauer/<slug>`, `/bjellesauer/last-ned`) are made up; Download is a link, not an export.

## Skill problems / gaps
- The skill said to open the component reference pages. The pages were good, but none covers a many-column data table on mobile, which is the brief's key constraint.
- `Select.ComboBox` has no "clear" or "all" affordance; I added an "Alle aksjer" item. Needs a guideline.
- `Select` `value` with `null`: the docs say `Key | null` but a `Select` with no matching item shows an empty trigger. I always keep a selected item.
- `DateRangePicker` requires `value` always (empty text is English), and has no minValue-style presets for T+2 or trading days; presets can't be customised. Period + range sync had to be hand-built.
- Pagination components are English only ("Previous", "Next") with no prop; tell-the-person note applied: it appears in this page.
- `Table.Head`'s `tooltip` is the only help affordance; on touch devices it's unclear it works.
- No `Card` component, so every card repeats the `rounded-2xl border border-secondary bg-primary_alt` string (layout.md acknowledges this).
- `text-md`, `text-display-sm` used in the heading; I assumed they exist (tsc doesn't check, eslint doesn't either). Should be checked in tokens.md (I didn't read the full 48 KB file; I only skimmed its top, so token use is from SKILL.md's short list).
- The skill says to "look at the result in Storybook"; the task forbade starting it. Unverified: visual check, dark mode, 375px overflow of the period group and the table head tooltips.
- Page-patterns "Bjellesauer" is listed as a Data table with "ticker stacked over name", which I followed (stacked in the Aksje cell).
