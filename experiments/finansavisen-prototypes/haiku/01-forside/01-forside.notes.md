# Forside (01-forside) prototype: notes

Evaluation notes for the `fa-design-system` skill, written by the haiku run. Brief:
`experiments/finansavisen-prototypes/briefs/01-forside.md`. Files: `01-forside.tsx`,
`01-forside.story.tsx` in this folder. Storybook title `Experiments/haiku/01-forside`, stories
`Desktop` (signed in, 1440 viewport) and `Mobile` (signed out, 375 viewport).

Not verified: Storybook was not started (the brief forbids it), so the look in light/dark mode and
the viewport switching are unchecked. `npm test` was not run; only `tsc` and `eslint` on this folder.

## 1. Components used (with paths)

All paths are in the library repo, `components/...` (the page imports them as `@/components/...`).

| Used for                | Component                                                                  | Path                                                                                          |
| :---------------------- | :------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| Top of page             | `SiteHeader` (brand `fa`, ticker, navigation, shortcuts, `menu`, `user`)   | `components/application/site-header/site-header.tsx`                                          |
| Header types            | `SiteNavItem`, `TickerItem`, `SiteMenuContent`                             | `site-header/site-brands.ts`, `site-header/ticker-bar.tsx`, `site-header/site-menu-panel.tsx` |
| Bottom of page          | `SiteFooter` (brand `fa`)                                                  | `components/application/site-footer/site-footer.tsx`                                          |
| Actions and links       | `Button` (`href`, `color="link-color"`, `secondary`, `primary`)            | `components/base/buttons/button.tsx`                                                          |
| Markers, tickers, Pluss | `Badge`, `BadgeWithDot`, `BadgeWithIcon`                                   | `components/base/badges/badges.tsx`                                                           |
| Commentary byline       | `AvatarLabelGroup` + `getInitials`                                         | `components/base/avatar/avatar-label-group.tsx`, `components/base/avatar/utils.ts`            |
| Search field            | `Input` (`type="search"`, `icon={Search}`)                                 | `components/base/input/input.tsx`                                                             |
| Class names             | `cx`                                                                       | `utils/cx.ts`                                                                                 |
| Icons                   | `ChevronRight`, `Download`, `Lock`, `Play`, `Search`, `Star`, `StarFilled` | `fa-icons` (package)                                                                          |

## 2. Composed by me, and why

- **Page shell:** `min-h-dvh bg-secondary_alt`, header, `main`, footer. Matches the frame in
  `page-patterns.md`. `main` uses `max-w-container` because the skill says page width is open and
  that token is listed; this is my choice, not a rule.
- **Market strip** (`MarketCard`, `MarketItem`): eight label-over-value cells with a change value.
  Columns 2 / 4 / 8 by breakpoint. The skill has a change-value snippet and a label-over-value
  pairing but no strip pattern. I used the pairing from `layout.md` and the snippet's colours.
- **Story list** (`StoryItem`, `LeadStory`): the "News feed item" stand-in from `page-patterns.md`,
  plus a larger lead. There is no teaser component. I did not add the save button the "Article
  teaser" pattern describes.
- **Marker mapping** (`markerBadge`): Siste = `BadgeWithDot error`, Populært = `Badge warning`,
  Mye lest = `Badge gray`, Børsoppdatering = `Badge brand`, Pluss = `BadgeWithIcon brand` with a
  `Lock`, Annonse = `Badge gray type="modern"`. The skill's `badge-color-meaning` rule does not say
  what Finansavisen markers mean. Populært as `warning` is a guess.
- **Sign-up card** (`SignUpCard`): the one primary button on the page, for logged-out readers.
- **Search card** (`SearchCard`): the page's search `Input` plus Investorchat prompt chips. The
  chips are `Button color="secondary" size="sm"` per the stand-in in `page-patterns.md`.
- **Follow chips** (`FollowChip`): `Button` with `aria-pressed` and a star toggle, per the
  "Follow chips" stand-in.
- **Sponsored section** (`SponsoredCard`): a tinted `bg-tertiary` block with an "Annonse" badge.
  See clash C4.
- **Video tile** (`VideoCard`): a grey placeholder plus a `Button` link to the video page. The
  skill's coverage list says the video player has no stand-in and to ask first. I did not build a
  player, and I did not ask, because this is a prototype. See clash C5.
- **Lists** (`MostReadCard`, `SectionListCard` for Kapital and Motor, `CareerCard`) and
  **`ShortcutsCard`** (Børs, Watchlist, Forum, Bjellesauer, plus "Få appen"): plain composition.

## 3. Patterns section (new patterns and clashes)

**New patterns** (no reference file describes these):

- N1. Market strip: a row of 8 label-over-value cells with signed change values, inside one card,
  2/4/8 columns (`MarketCard`). Used at the top of the front page.
- N2. Sign-up card for logged-out readers: heading, one line, `link-color` login link and one
  primary button. Replaces the greeting when there is no user.
- N3. Greeting heading: `Hei, <firstName>` for signed-in readers, a welcome line otherwise, as the
  page's only `h1`.
- N4. Lead story with a 16:9 image above a `text-display-xs` headline, followed by a ranked list.
- N5. Investorchat prompt chips as a labelled row of secondary buttons.

**Clashes** (not resolved; for the design owner):

- C1. Section title size: `layout.md` says "Mest lest" is a section title at `text-xl`; the type
  table says `text-xl` is for section titles and `text-lg font-semibold` for widget titles. Mest lest
  is a widget card in `page-patterns.md`. I used `text-lg` for widget cards and `text-xl font-bold`
  for the story section, so the two levels appear on one page.
- C2. Percent spacing: `page-patterns.md` and `layout.md` show `+2,4 %` (space before `%`), but the
  `site-header.md` example shows `"-1,59%"` (no space, ASCII hyphen). I used the brief's form
  (space and `−`) in both the header ticker and the market strip.
- C3. `ButtonUtility href`: `page-patterns.md` (widget card header) uses
  `<ButtonUtility icon={ChevronRight} href=… tooltip=… />`, but `button.md` lists no `href` for
  `ButtonUtility`. I used `Button color="link-color" href` for "Se alle", per rule 10.
- C4. Sponsored content: `layout.md` says cards have a border and insets sit inside cards, with no
  tinted top-level block. The brief requires sponsored content to be clearly separate, so I used a
  tinted top-level block (`bg-tertiary`). No rule covers this. A bordered card with a label would
  also fit the brief.
- C5. Video: the skill's coverage list says "no stand-in, ask before building", but the brief asks
  for video play. I used a link button. This should be decided.

## 4. Rules I bent

- **layout-content-in-cards:** the Sponsored block (C4) sits on the page background as a tinted
  block, not in a bordered card.
- **layout-one-card-level:** `SponsoredCard` is a top-level section, not an inset, because it is not
  inside a card.
- **fa-icons-only / fa-icon-names:** the `Lock` icon in the Pluss badge has no `aria-label`. The
  rule asks for one when the icon carries meaning alone. The badge text "Pluss" already carries it,
  and `BadgeWithIcon` takes only a component reference, so I could not add a label to the icon. The
  rule and the badge API do not match here.
- **fa-brand-via-prop / site header `onSearchPress`:** the handler focuses the page's search input
  with `document.querySelector` because the prototype has no search view. This is a hack. A real
  search view is needed.
- **site-header-menu:** `menu` is passed with one placeholder column only. Real Meny content is
  missing.
- **site-footer-real-hrefs:** `appStoreHref` and `googlePlayHref` point to `/app`, and the contact
  link is a placeholder. The footer legal text is only a placeholder (see section 5).
- **Heading structure:** the search card has an `sr-only` `h2` (no visible heading) and the video
  card uses an uppercase label as its `h2`. The skill says nothing about visually hidden headings
  for cards.

## 5. Placeholder data to replace

- **Market values:** Oslo Børs, Brent, EUR/NOK and USD/NOK come from the brief. Their change values
  are missing for EUR/NOK and USD/NOK (shown as "–"). Nikkei 225, Bitcoin, gull and US 10 år have no
  values in the brief; all of them, and their changes, are invented (`// PLACEHOLDER` in the code).
- **Header ticker** (`tickerItems`): Nikkei and Bitcoin values are invented.
- **Headlines, times, kickers and teasers:** all invented, except "Fredrik Dyve forhandlet i
  måneder:", "Rally i rigg og oljemygg – full kollaps i sjømat" and the `Børsmorgen` video name.
- **Images:** grey `bg-tertiary` blocks; no real images.
- **Commentary:** Trygve Hegnar is named as in the brief, but the headline is invented.
- **Sponsored:** "Annonsør AS" is a placeholder advertiser.
- **Job ads:** placeholder titles and companies.
- **Footer:** `publisherInfo`, `copyright` and `disclaimer` need the real legal text. Social links
  and the contact address are missing.
- **Links:** every `href` is a placeholder path (`/artikkel/…`, `/video/borsmorgen`, `/app`, etc.).
- **Greeting:** the signed-in user "Kari" (initials KH) is invented.

## 6. Where the skill was unclear, contradictory or missing

1. **Markers have no colour rules.** The badge rules cover meaning in general, but not Finansavisen
   markers (Siste, Populært, Mye lest, Pluss, Annonse). I had to guess each one's colour.
2. **No search field pattern.** The header search is a dark brand field (an override). The page
   needs a visible search field too. `input.md` covers a generic `Input` and nothing about page-level
   search, so I used `Input` with `type="search"`.
3. **Icon labels inside badges.** `BadgeWithIcon` takes only a component reference, so the icon
   cannot get the `aria-label` the fa-icon-names rule asks for. The rule and the badge API conflict.
4. **Toggle buttons.** `page-patterns.md` suggests `aria-pressed` on a `Button` for follow chips, but
   `button.md` does not list it or say `Button` is a toggle. I used it, and TypeScript accepted it.
5. **`Button` vs `ButtonUtility` link.** See C3.
6. **Section and widget titles.** See C1. The skill also doesn't say whether a visually hidden `h2`
   is allowed, which I needed for the search card.
7. **Percent format.** See C2.
8. **Video.** See C5. The coverage gap list says "ask before building"; in a single-agent prototype
   there was nobody to ask, so the gap stayed open.
9. **Sponsored content.** Brief requirement with no matching pattern. See C4.
10. **Front page shell.** `page-patterns.md` leaves width open ("take it from the design"), and no
    design is given. I used `max-w-container`. This is a guess.
11. **Storybook viewports.** The skill does not say how a story selects a viewport; I used
    `parameters.viewport.defaultViewport`, matching `.storybook/preview.ts`. Not verified in
    Storybook.
12. **Tailwind scanning.** The skill says to restart Storybook after adding a component file so
    Tailwind sees it, but it does not say whether files outside `components/` (such as
    `experiments/`) are scanned. Unverified.

## 7. Process slips

- I wrote two scratch files outside the project and then removed them: `/tmp/none` (a `tsc` redirect
  typo) and a `tsc` log in the home folder. I did not read anything in `/tmp` or other experiment
  folders; the only other `experiments/` path I listed was `briefs/`.
- `eslint --fix` ran on my own folder only. Other agents' folders are untouched.
