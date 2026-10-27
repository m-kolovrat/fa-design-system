# Notes: 04-aksje-equinor (sonnet)

Files: `04-aksje-equinor.tsx` (page `AksjeEquinor`), `04-aksje-equinor.story.tsx` (Desktop / Mobile, title `Experiments/sonnet/04-aksje-equinor`).
`tsc` and `eslint` are clean for this folder. Not viewed in Storybook (not allowed to start it), so layout, dark mode and
mobile were never checked visually; everything below is from reading code and reference pages.

## Components used (`@/components/...`)
- `application/site-header/site-header` (+ `TickerItem`, `SiteNavItem` types), `application/site-footer/site-footer`
- `application/tabs/tabs` (section navigation), `base/select/select-native` (mobile fallback for tabs)
- `base/button-group/button-group` (period selector, news filter, Årlig/Kvartal)
- `base/buttons/button`, `base/buttons/button-utility` (calendar, download, play), `base/dropdown/dropdown` (watchlist menu)
- `base/badges/badges` (`Badge`, `BadgeWithDot` for Live), `base/avatar/avatar`, `base/avatar/avatar-label-group`
- `application/table/table` (`Table` only, no `TableCard`: depth, recommendations, technicals, trades, dividends)
- `application/charts/charts-base` + Recharts (price area chart, revenue/profit bar chart)
- `base/progress-indicators/progress-indicators` (`ProgressBar` for analyst split), `application/alerts/alert`
- `hooks/use-breakpoint`, `utils/cx`; icons from `fa-icons` only.

## Composed myself (no component / Figma frame yet)
All taken from the stand-ins in `page-patterns.md` unless noted:
- Widget card (`WidgetCard`, section with level-2 classes; header = title + one right slot).
- Change value (`Change`), period selector (ButtonGroup with label + change), live indicator, news feed item,
  filter chips (ButtonGroup), key-figure list (`dl`), ticker badge, signals as Badge.
- **Not in the skill, invented here:**
  - Sticky price strip: a `fixed top-0` bar with ticker badge, price, change and a watch button, shown by an
    IntersectionObserver when the big price scrolls out of view. Needed for "current price must always be at hand".
    Uses card-level tokens only, but it has no Figma frame. It sits at `top-0` and would cover the (non-sticky)
    SiteHeader if that is made sticky; the z-index/offset has to be decided together with the header.
  - Stat label-over-value grid (`Stat`) in the header band: follows the "label over value" pairing, but as an 8-up grid.
  - Watchlist toggle: `Dropdown` with `selectionMode="multiple"` behind a `Button` whose icon/label flip Star/StarFilled.
  - Analyst split: three `ProgressBar`s with a visible text label above and "N analytikere" on the right. Could
    equally be a stacked bar; no stand-in is given for consensus.
  - Technical signals table: signal as KJØP/SELG `Badge` per the "Signals" row in layout.md. "Nøytral" overall badge is `gray`.
- Section nav: `Tabs.List type="underline"` with no `Tabs.Panel`s (items are `href` anchors; the other areas are other pages).

## Skill: Patterns section

**New patterns** (not in the reference files):
- Instrument profile with a **sticky compact price strip** (see above), appearing after the main price scrolls away.
- **Header band containing a chart** (price chart + period selector + key stats + tabs in one white band). page-patterns.md says the
  band holds "name, price, chart, key figures, tabs", but nothing describes the internals or the order; I chose name/actions, price,
  periods, chart, stats, tabs.
- **Eight-up key stat strip** (2 / 4 / 8 columns by breakpoint) rather than the "key figures" large-figure row or the `dl` list.
- **Tables inside widget cards** without `TableCard` (to keep one card level). The Table docs describe `TableCard` as the wrapper; the
  widget-card pattern says body is "a table or list", so both are followed, but the combination is not shown anywhere.
- **Row with title + single right-slot control** where the control is a `ButtonGroup` (Årlig/Kvartal) rather than a source credit/link/action/one control. I count a ButtonGroup as one control.
- Locked/subscriber teaser **inside** a widget card as a floating `Alert color="brand"` (an alert nested in a card, i.e. card inside card).

**Clashes:**
- `layout.md` **layout-one-card-level** (no second bordered card in a card) vs the in-card `Alert` (it renders as a bordered card).
  There is no inset-style variant of Alert; paywall box is "centered card" and doesn't fit inline either.
- `Tabs` rule **tabs-mobile** (NativeSelect below `md` if more than 3-4 tabs) vs 10 navigation areas, and Tabs
  "switches between panels" vs these being links to other pages. I used `Tabs` on desktop with a horizontal scroll wrapper (tabs "don't
  scroll or wrap", so it is a workaround) and `NativeSelect` on mobile, which has to navigate via `location.hash` in my code. The skill's own "Tabs vs links" guidance
  points at SiteHeader/app-navigation, neither of which fits a page-level sub-navigation. Real gap.
- **Period selector** stand-in says "keep it on one row below `md`" and show each period's change under the label. With seven
  periods at 375px that doesn't fit, so below `md` I show the label only (change appears from `md`, and the
  `aria-label` carries it) and let the group scroll horizontally if needed. Both sides of the clash: stand-in text vs width.
- `button-group-short-labels` / `ButtonGroupItem` with children being a two-line `span`: allowed by the props, but item height
  assumes one line; unverified visually.
- `charts-direction-color` allows green/red for a single stock; I switched the line color by the selected period's sign.
  `text-utility-success-600` / `error-600` are fine, but the Live/direction color of the chart then changes when the period changes while the headline price stays red. Debatable.
- Brief says "live 14:12" and also "data is delayed unless real-time is on". The skill gives a Live indicator
  (`BadgeWithDot color="error"`) but no pattern for the delayed state (no "Forsinket 15 min" badge). I show Live plus an
  `Alert` stating real-time is on. A delayed variant would need its own indicator.

## Rules bent
- **fa-layout / layout-full-rows:** all rows fill (4+2, 3+3, 3+3, 2+2+2, 2+2+2). Okay. But `layout-equal-height` ("show a limited number of rows and Vis mer instead of growing") is only partly honored: news shows 4 items and "Se alle" but there is no row-clamp logic.
- **layout-content-in-cards:** the Alert and the closing link row sit directly on the page background (title/filter-row exception stretched).
- **Tabs mobile rule** (see above) inverted: I also wrap the desktop tab list in `overflow-x-auto`.
- **fa-icon-names:** a few icons are given `aria-label` (Lock for Pluss) per rule 5. No bends.
- **anti-classname-restyle:** none. `className` only for layout (`ml-auto`, `text-right` on `Table.Head`/`Cell`, `w-56` on popover). `text-right` on table heads/cells is alignment, not color, and the table docs require right-aligned numbers.
- `Table.Cell className="font-medium text-primary"` is a text-color change on a cell, which `table-no-restyle` forbids ("never restyle rows or cells with colors"), yet the Table example does exactly this. Contradictory in the skill; I followed the example.
- Page container has no `max-w`; `mx-auto w-full px-4 md:px-8` per the shell ("page width isn't fixed"). On 1440px the content is very wide.
- Plain `<a>` used for news headlines (not running text); `fa-links` says use `Button href`+link color for standalone links. A headline link is
  neither; the focus ring classes are copied by hand (rule 9), which duplicates what a Link component would give. Gap: no Link component.
- Hand-written `h1`/`h2` classes (`text-lg font-semibold text-primary`): the skill never lists a heading style, only "headings = text-primary".

## Placeholder data to replace
Everything not in the brief: chart series (generated deterministic random walk ending at 444,30; period changes
other than 1D are invented), news, analyst counts (9/11/4), recommendations (brokers, targets), technical indicator values,
order depth, latest trades, dividends (amounts and dates), key figures except direkteavkastning and P/E,
financial calendar after 28.10., reports (sizes, dates), earnings calls, revenue/profit (mrd. USD), ticker bar values, nav and footer links,
sticky logo (initials "EQ" in place of the Equinor logo; `fa-icons` has no Equinor logo that I checked).
Market cap/Pris/bok/beta are invented. All hrefs are anchors or `#`. The "Uten sanntid" / realtime state is hard-coded.

## Skill: unclear, contradictory or missing
1. No stock/instrument-page page-pattern beyond one table row ("Header band, then card grid") and the example grid in layout.md,
   which in fact lists the cards of this page (Siste nytt, Konsensus, ...). Helpful, but the header band is undefined.
2. `SKILL.md` Step 1 reads page-patterns.md and layout.md; component rules say "open each reference page". I read about 13 of ~40; no instruction on how
   many is enough, and `anti-patterns.md` is 58 KB of output (tool truncated it) which made the Step 6 check expensive.
3. No Link component and no heading/typography guidance for `h1`/`h2` inside cards (see above). `prose` is mentioned for body text only.
4. `Table` inside a widget card: `Table` wrapper width/padding is not documented (does `Table` bleed to the card edge? Cell padding vs `p-4 md:p-5` card padding). Unchecked.
5. Table cells: header alignment uses `className="text-right"` on `Table.Head`, which isn't in the allowed list in `table-no-restyle` (widths, whitespace, hidden classes). Right-aligned numbers are required elsewhere ("Alignment" in layout.md). Needs an explicit allowance or a prop.
6. `ProgressBar` has `valueFormatter` but no way to have a text label *inside* the bar's row other than my own wrapper; rule `progress-visible-label` says
   "right before the bar". I put it above, which matches. A consensus/split bar (stacked) is a very common finance pattern and is missing.
7. `Alert` in a card (see clash). Also its icon prop for `Clock`: the docs say pass icon from fa-icons; fine.
8. `Badge` ticker: `page-patterns.md` shows `<Badge color="brand" size="sm" type="pill-color">`, rule says it should be a link if interactive. I did not link it
   (it's the current page). Nothing says what to do on its own page.
9. Norwegian minus: the Change stand-in uses `Intl.NumberFormat("nb-NO")`, which prints U+2212 "−". Good, but the ticker bar guidance shows `"-1,59%"` with a hyphen and no space before %, and the brief uses "−" with a space. Three styles in one skill (hyphen in ticker, U+2212 in change value, `%` spacing).
10. The step "look at the result in Storybook's Mobile and Desktop viewports in both themes" can't be done by an agent told not to start Storybook; so visual issues (the two-line period items, tab overflow, fixed strip over the header) are unverified.
11. Sticky behavior: `site-header-collapsed` says make the header sticky in the page shell, which conflicts with my own fixed price strip (both want `top-0`). The skill doesn't say how a page-level sticky element should stack with the header.
12. `Tabs.Item` with `href` and no panels: documented props allow `href`, but selection state with hash links isn't described (I keep local state).
13. `Dropdown.Menu` with `selectionMode="multiple"` is only hinted at (checkmark selection); the example uses `onAction`. I relied on the props line. Unverified at runtime.
14. Subscriber-only content: the skill has a "Paywall box" stand-in (centered card with sign-in options), too heavy for a partial lock inside a card. Nothing on blurred/locked rows (blur is on the reject list), so I used an Alert.
15. Dark mode not checked; I used only semantic tokens plus `text-utility-*` in charts.
