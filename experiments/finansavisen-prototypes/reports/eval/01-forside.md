# Evaluation: 01-forside (front page)

Evaluator: independent. Inputs: brief `experiments/finansavisen-prototypes/briefs/01-forside.md`, ground truth `scratchpad/ground-truth/01-forside.md`, rules `skills/fa-design-system/`. Prototypes: `experiments/finansavisen-prototypes/{opus,sonnet,haiku}/01-forside/`.

## Scores (0–3)

| Criterion             |  Opus  | Sonnet | Haiku  |
| :-------------------- | :----: | :----: | :----: |
| Component reuse       |   3    |   2    |   2    |
| Rule compliance       |   3    |   2    |   2    |
| Fidelity to real page |   2    |   2    |   1    |
| Visual quality        |   3    |   2    |   2    |
| Accessibility         |   3    |   1    |   2    |
| Honesty of notes.md   |   3    |   2    |   3    |
| **Total (/18)**       | **17** | **11** | **12** |

Note on fidelity: no prototype gets a 3. All three follow the skill's front-page shell: bordered cards, a ⅔/⅓ sidebar and a list of teasers. The result reads as a dashboard. It doesn't look like Finansavisen's front page, which has a dense image grid, very heavy headlines, inverted brand teasers, dark slider panels and a full-width app strip. That's a problem with the system, not with the models (see Root causes R4).

## 1. Screenshots and runtime

Shots are in `scratchpad/shots/01-forside/<model>-<story>-<theme>.png`: 18 PNGs, every story in light and dark. Desktop is 1440 wide and mobile 375, full page, captured after network idle. Crops I looked at are in `scratchpad/crops/01-forside/`. The script is `scratchpad/shot-01.js`; the log is `scratchpad/shot-01.log`.

- **Console errors:** each page has a single 404, `/_vercel/insights/script.js`. It comes from the static Storybook build, not the prototypes. There are no React or page errors.
- **Horizontal overflow at 375 px:** every logged-out mobile story scrolls sideways (`scrollWidth` 382): `opus-mobile-logged-out`, `sonnet-mobile`, `haiku-mobile`. The logged-in mobile stories are 375. A probe (`scratchpad/probe-02.js`) traced it to the library. In `SiteHeader` the right cluster (`div.flex flex-1 items-center justify-end gap-3`, `site-header.tsx:216`) holds Logg inn + Kjøp + Meny, and it pushes the Meny button to right=382. You can see the Meny icon clipped at the right edge in `opus-mobile-logged-out-light-0` and `haiku-mobile-light-0`. **It's a library bug, not a prototype bug.**
- **Dark mode:** none of the three has broken surfaces. All of them use `_alt` surfaces and semantic tokens. In dark mode `text-brand-secondary` resolves to `gray-300` (`theme.css:761`), so the brand-coloured kickers from opus and sonnet turn grey. The token is documented that way, but there's no spec for kickers at all.

## 2. Per-prototype assessment

### Opus (17/18)

**Component reuse: 3.** It uses `SiteHeader` (ticker, menu, user, nav groups), `SiteFooter`, `Badge`/`BadgeWithDot`/`BadgeWithIcon`, `Button` (links, prompt chips, follow chips with `aria-pressed`), `ButtonUtility`, `Input`, `FeaturedIcon`, `AvatarLabelGroup`, `KapitalSmallLogo`/`MotorLogo`. The elements it built itself:

| Invented element                                     | Existed in library / page-patterns?        |
| :--------------------------------------------------- | :----------------------------------------- |
| `Teaser` (lead/default/compact) `01-forside.tsx:296` | Stand-in "Article teaser", followed        |
| `MarkerBadge` `:229`                                 | "label pill" mentioned, no mapping         |
| `CardHeader` `:271`                                  | Widget-card stand-in, followed exactly     |
| `Change` `:333`                                      | Change-value stand-in, copied              |
| `ImagePlaceholder` `:265`                            | No guidance exists                         |
| Greeting / account invite card `:343`                | No pattern                                 |
| `SponsoredCard` `:428`                               | No pattern                                 |
| `PublicationCard` (Kapital/Motor) `:561`             | No pattern                                 |
| Mest lest numbered list, Karriere list               | No pattern (closest is the news feed item) |

**Rule compliance: 3.** No hex, palette colours, primitives, `dark:`, `duration-`/`ease-` or `outline-none`, and no unprefixed react-aria imports. Every `className` on a component is layout only (`self-start`, `mt-3`, `ml-auto`, `flex-1`). Each section has one primary button. It uses `max-w-container`, which is a token. The one bend is `italic` on the sans font for the commentary (`:538`), and the notes report it.

**Fidelity: 2.** Ground-truth modules it has: ticker (all 8 brief markets), header with the full nav grouping, Børsoppdatering with the brief's headline, an image-led teaser grid with the Dyve kicker, Mest lest, Hegnar commentary, Børsmorgen video, Kapital and Motor with their real logos, Karriere, and the footer with publisher, Kontakt, social and app box. Missing: the "NY" badges in the nav, the app promo strip (the real greeting lives there), inverted brand teasers, dark slider panels and Dagens forside. It invented a greeting card, an Investorchat card that duplicates the header search (it reports this as a clash) and a "Følg temaer" card. It feels closest to Finansavisen of the three because of the image-first teasers and the publication logos.

**Visual: 3.** Clean and consistent in both themes (`opus-desktop-light-0/1`, `opus-desktop-dark-0`). Minor issues:

- On desktop the sidebar is much longer than the main column, so the main column ends roughly 200 px early.
- In the sponsored card the image placeholder is `bg-tertiary` inside a `bg-tertiary` inset, so it disappears and only a floating icon is left (`opus-desktop-light-1`).
- On mobile, Børsoppdatering (the brief's "latest" item) lands about 3,000 px down, after the whole stream.

**A11y: 3.**

- Headings: an `sr-only` h1, an h2 per card and an h3 per teaser.
- Each teaser is one tab stop: the image link has `aria-hidden` and `tabIndex=-1` (`:303`).
- The rank numbers in the `<ol>` are `aria-hidden`.
- A `Lock aria-label="Pluss-artikkel"` marks Pluss items in the lists.
- The Input has a label, and the follow chips use `aria-pressed`.
- Nit: seven identical "Lagre i MittFa" save buttons with no handler (`:326`).

**Honesty: 3.** The notes say plainly that Storybook was never opened. They list every stand-in, the clashes (duplicate search, mobile order versus the sidebar) and 13 skill gaps. The one omission is that the save buttons are inert.

### Sonnet (11/18)

**Component reuse: 2.** It uses `SiteHeader`, `SiteFooter`, the badges, `Button`, `ButtonUtility`, `FeaturedIcon` and `Avatar`. The commentary byline is hand-built from `Avatar` plus two `<p>`s (`:245-251`), although `AvatarLabelGroup` exists for exactly that. Investorchat has no `Input`, only two prompt buttons (`:323-336`).

| Invented element                         | Existed?                                                                                 |
| :--------------------------------------- | :--------------------------------------------------------------------------------------- |
| `Teaser` (big/row) `:166`                | Article-teaser stand-in, partly followed (save uses `Bookmark`, the pattern says `Plus`) |
| `MarkerBadge` `:130`                     | No mapping                                                                               |
| "Markedet nå" `dl` card `:279`           | Duplicates `TickerBar` already in the header                                             |
| `Thumb` `:152`                           | No guidance                                                                              |
| Kapital/Motor/Karriere text cards `:354` | No pattern; no logos even though `fa-icons` has them                                     |
| Sponsored aside `:375`, app card `:390`  | No pattern                                                                               |

**Rule compliance: 2.**

- `max-w-[1280px]` (`:201`) is an arbitrary value even though `max-w-container` exists (anti-arbitrary-values). The notes admit it.
- The sponsored block is an inset (`rounded-xl bg-tertiary`) sitting directly on the page background (`:375`), which breaks layout-one-card-level.
- Icons are chosen against their meaning: `Star` heads both the market card and Mest lest, and `Play` heads Børsoppdatering (`:280,295,310`).
- Thirteen controls do nothing: six save buttons, the play button, two prompt buttons and four follow chips. That's anti-hand-built in spirit.

**Fidelity: 2.** It has the ticker, the header (nav order closest to the real one: Forum, Børs, Investorchat, Watchlist, Bjellesauer), the Børsoppdatering headline, the stream, Mest lest, Hegnar, video, Kapital/Motor/Karriere as one-liners, a sponsored block, an app card, and the logged-out copy "Lag din egen watchlist – helt gratis", which matches the real site word for word. The teasers are a text list with small thumbnails rather than an image grid. Kapital, Motor and Karriere are thin.

**Visual: 2.**

- The lead teaser's save icon sits alone on its own row under the headline (`sonnet-desktop-light-0`).
- The Meninger card is mostly empty because it is stretched to the Video card's height (`sonnet-desktop-dark-1`).
- At 375 px a 96 px thumbnail squeezes row headlines into about 6 words per line (`sonnet-mobile-logged-in-light-0`).
- Logged-out desktop shows two blue filled buttons together: the header's "Logg inn" and "Opprett gratis konto".

**A11y: 1.**

- `aria-labelledby` points at the headline h3 instead of the card's h2. `CardHeader` gives its h2 no id (`:161`), so the Meninger region is named after a headline (`:243/252`).
- The Investorchat section has a visible h2 and an extra `sr-only` h3 (`:325`).
- Thirteen dead focusable buttons.
- The follow chips set `aria-label` but carry no state.
- The `<ol>` rank numbers are read twice.
- Three "Se alle" links have the same name.

**Honesty: 2.**

- It says it used `BadgeWithDot` for "Annonse"; the code uses `Badge type="modern"`.
- It lists "chevron links", but the code has none.
- It doesn't mention the inert controls or the odd icons.
- It does report the duplicated market data and the arbitrary width.

### Haiku (12/18)

**Component reuse: 2.** It uses `SiteHeader`, `SiteFooter`, the badges, `Button`, `Input` and `AvatarLabelGroup`. It deliberately skips `FeaturedIcon` and `ButtonUtility` (clash C3: `ButtonUtility href` is undocumented). Three of its cards re-implement what `SiteHeader` already provides:

- `MarketCard` repeats the ticker.
- `SearchCard` repeats the header search.
- `ShortcutsCard` repeats the header shortcuts.

The header itself was under-filled: the ticker has 4 items (`:123`) and the desktop nav has 5 links, with no Forum, Bjellesauer or Investorchat (`:130`).

| Invented element                                                 | Existed?                                                  |
| :--------------------------------------------------------------- | :-------------------------------------------------------- |
| `MarketCard`/`MarketItem` 8-col strip `:212,311`                 | Key-figures pattern partly; duplicates `TickerBar`        |
| `StoryItem`/`LeadStory` `:237,261`                               | Article-teaser / news-feed stand-ins; save button omitted |
| `markerBadge` `:177`                                             | No mapping                                                |
| `SponsoredCard` `:387`                                           | No pattern                                                |
| `SectionListCard` (Kapital/Motor), `CareerCard`, `ShortcutsCard` | No pattern                                                |

**Rule compliance: 2.**

- The sponsored block is a `bg-tertiary` surface on the page, with no border (reported as C4).
- It breaks anti-placeholder-data with "Annonsør AS", "Eksempel Kapitalforvaltning", "Eksempel Media" and "Eksempel Bank" (`:94-96, :398`).
- It colours the change value from a hand-set `direction` field instead of the sign (`:213`). The page-patterns snippet derives the colour from the number.
- There are no token or class violations.

**Fidelity: 1.**

- The sponsored card has no content at all (only "Sponset av Annonsør AS…").
- Teaser headlines are `text-sm` (`:250`), nowhere near Finansavisen's heavy display type.
- The 4-item ticker visibly repeats inside 1440 px (`haiku-desktop-light-0`).
- Kapital and Motor appear as text lists with no logos.
- There is no app strip, only a "Få appen" link.

**Visual: 2.** It's tidy, but:

- The search and market cards dominate the top of the page.
- The sign-up card puts a tiny `link-color` "Logg inn" next to a large primary button.
- The empty sponsored block looks like a rendering failure (`haiku-desktop-dark-1`, `haiku-mobile-light-0`).

**A11y: 2.**

- Good: a visible h1, labelled regions, a labelled search `Input`, follow chips with `aria-pressed` and visible "Følg X" names, and `onSearchPress` that focuses the page search.
- Weak: three dead prompt buttons, four identical "Se alle" links, `<ol>` numbers read twice, and an uppercase label used as the video h2.

**Honesty: 3.** Thorough. It flags the PLACEHOLDER values in the code, the rules it bent, and process slips. It omits that the sponsored card is empty and that the ticker was cut down to 4 items.

## 3. Cross-model consistency (divergence = system gap)

| Concept                                   | Opus                                                                   | Sonnet                                                       | Haiku                                                                  | Verdict                                                                                                        |
| :---------------------------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| Market snapshot                           | `TickerBar` only (+ key figures in Børsoppdatering)                    | `TickerBar` **and** "Markedet nå" `dl` card                  | 4-item `TickerBar` **and** 8-col strip card                            | Diverges. Nothing says the ticker _is_ the snapshot.                                                           |
| Ticker change string                      | `"0,09%"` / `"-0,20%"`                                                 | same                                                         | `"+0,09 %"` / `"−0,20 %"` (U+2212)                                     | Diverges. `site-header.md` says `-1,59%`; page-patterns and layout say `+2,4 %`; the real site uses `+0,09 %`. |
| Invented market values (Nikkei / Bitcoin) | 41 872 / 1 021 480 NOK                                                 | 38 362 / 698 410 NOK                                         | 52 318 / 94 215 USD                                                    | Brief gives no figures; ground truth has 63 268 / 80 278.                                                      |
| Teaser layout                             | Image-card grid, lead + 2-up + compact rows                            | Lead + text rows with right thumbnail                        | Lead + text rows with right thumbnail                                  | Diverges.                                                                                                      |
| Kicker                                    | Inline, `text-brand-secondary`                                         | Own line, `text-sm font-medium text-brand-secondary`         | Inline, `font-medium text-tertiary`                                    | 3 different. Real site: inline, regular weight, same colour.                                                   |
| Lead headline size                        | `display-xs → display-sm`                                              | `display-xs → display-sm`                                    | `display-xs` semibold                                                  | Close                                                                                                          |
| Save button                               | `Plus`, "Lagre i MittFa"                                               | `Bookmark`, "Lagre artikkelen"                               | none                                                                   | Diverges                                                                                                       |
| **Pluss marker**                          | `BadgeWithIcon brand` + `Lock` (+ bare Lock in lists)                  | same                                                         | same                                                                   | **Converged**, from the `<Lock aria-label="Pluss-artikkel" />` example in SKILL rule 5 plus "label pill".      |
| Siste                                     | `BadgeWithDot error`                                                   | same                                                         | same                                                                   | Converged                                                                                                      |
| Populært                                  | `orange-dark` + Flame                                                  | `gray`                                                       | `warning`                                                              | 3 different                                                                                                    |
| Mye lest                                  | `gray` + Eye                                                           | `gray`                                                       | `gray`                                                                 | Mostly converged                                                                                               |
| Børsoppdatering                           | `blue-light` + GraphLine                                               | `brand`                                                      | `brand`                                                                | 2 ways                                                                                                         |
| Change value                              | page-patterns snippet                                                  | page-patterns snippet                                        | Hand-rolled from string + direction                                    | Mostly converged (the snippet works)                                                                           |
| Sponsored content                         | Bordered card + gray `Badge` + disclosure line + inset; in main column | `bg-tertiary` aside on page + `Badge modern`; bottom of page | `bg-tertiary` section on page + `Badge modern`; mid main column; empty | 3 different surfaces and placements                                                                            |
| Greeting (logged in)                      | Card "God morgen, Kari" + watchlist change + secondary CTA             | Visible h1 "God morgen, Kari"                                | Visible h1 "Hei, Kari"                                                 | 3 different. Real site: "Nikola, last ned appen…" in the app strip.                                            |
| Logged-out invite                         | Card, primary "Opprett gratis konto" + `link-gray`                     | Card, primary + `secondary`                                  | Card, primary + `link-color`                                           | Converged on the CTA, diverged on the secondary                                                                |
| Widget header                             | `FeaturedIcon` + chevron `ButtonUtility`                               | `FeaturedIcon` (arbitrary icons) + arrow                     | Plain h2 + `Button link-color` "Se alle"                               | Diverges (`ButtonUtility href` undocumented)                                                                   |
| Investorchat                              | Card with `Input` + prompt-chip links                                  | 2 dead prompt buttons                                        | `Input` + 3 dead prompt buttons                                        | Diverges                                                                                                       |
| Front-page h1                             | `sr-only`                                                              | Greeting (logged in) / `sr-only`                             | Visible greeting/welcome                                               | 3 ways                                                                                                         |
| Story viewport API                        | `globals.viewport`                                                     | `globals.viewport`                                           | `parameters.viewport.defaultViewport`                                  | Diverges, with no guidance                                                                                     |

## 4. Root causes → file to fix

| #   | Failure observed                                                                                 | Cause type                                                                                                                                                                                                                                                                     | Fix in                                                                                                                                                                                                                                                              |
| :-- | :----------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| R1  | Logged-out header overflows 375 px by 7 px in all three (Meny clipped)                           | **Library bug**                                                                                                                                                                                                                                                                | `components/application/site-header/site-header.tsx` (right cluster `:216`: gap or button widths below `sm`); add a 375 px logged-out story                                                                                                                         |
| R2  | 3 teaser layouts, 3 kicker styles, 2 save icons                                                  | **Missing component** (Article teaser) + vague stand-in                                                                                                                                                                                                                        | `skills/fa-design-system/references/page-patterns.md` "Article teaser": specify sizes (lead / standard / compact), kicker (inline, regular weight, colour), image ratio, save icon and label. Long term a Figma teaser component, tracked in `docs/figma-parity.md` |
| R3  | Populært / Børsoppdatering / Annonse marker colours guessed differently                          | **Unclear rule**: `badge-color-meaning` doesn't map Finansavisen labels                                                                                                                                                                                                        | `page-patterns.md`: add a marker table (Siste, Populært, Mye lest, Børsoppdatering, Pluss, Annonse, Kapital, MOTOR → Badge type/colour/icon). Pluss converged because SKILL.md gives a concrete example, which shows that an example works.                         |
| R4  | Börsoppdatering ends up in the sidebar or ~3,000 px down on mobile; no app strip; dashboard feel | **Contradictory doc**: the page-patterns front-page shell (⅔/⅓, sidebar under the stream) and `layout-content-in-cards` versus the mobile-first brief and the real page (live headline strip at the top, full-width slider panels, no sidebar when logged in, no card borders) | `page-patterns.md` (front-page shell row and a "Front page" section ordering the modules), `layout.md` §1 "Open" item (borders, edge to edge on mobile)                                                                                                             |
| R5  | Market data duplicated in a card by 2 of 3; ticker trimmed to 4 by haiku                         | **Unclear rule**: not stated that `tickerItems` is the market snapshot                                                                                                                                                                                                         | `references/components/site-header.md` (say the ticker covers the front-page snapshot and give all the brief's markets)                                                                                                                                             |
| R6  | Ticker change strings in two formats                                                             | **Contradictory doc**: `site-header.md` example `"0,84%"` / `"-1,59%"` vs `page-patterns.md` change value `+2,4 %` and the live site                                                                                                                                           | `site-header.md` example; better, have `TickerBar` take a number and format it (`components/application/site-header/ticker-bar.tsx`)                                                                                                                                |
| R7  | Sponsored content in 3 surfaces; 2 put an inset on the page bg; 1 empty                          | **Missing pattern**                                                                                                                                                                                                                                                            | `page-patterns.md`: "Sponsored teaser (Annonse)" with surface, label text, disclosure line and placement                                                                                                                                                            |
| R8  | 3 greeting treatments                                                                            | **Missing pattern** + library gap (`SiteHeader.user` takes initials only)                                                                                                                                                                                                      | `page-patterns.md`: "App promo strip" (personalised "{Fornavn}, last ned appen"), logged-out invite; optionally `user.firstName` in `site-header.tsx`                                                                                                               |
| R9  | "NY" badge (Investorchat, 400 Rikeste) not rendered by any model                                 | **Library gap**: `SiteNavItem` has no badge field, though page-patterns documents the "NY" marker next to nav items                                                                                                                                                            | `components/application/site-header/site-brands.ts` (`SiteNavItem.badge?`) + `site-header.md`                                                                                                                                                                       |
| R10 | Haiku avoided `ButtonUtility href`; widget headers diverge                                       | **Doc gap**: `button.md` props list for `ButtonUtility` omits `href`, while `page-patterns.md` widget card uses it (and the code supports it, `button-utility.tsx:65`)                                                                                                         | `references/components/button.md`                                                                                                                                                                                                                                   |
| R11 | All invented image placeholders; opus placeholder invisible inside an inset                      | **Missing guidance** for imagery in prototypes                                                                                                                                                                                                                                 | `page-patterns.md` or `layout.md`: a placeholder recipe (e.g. `bg-quaternary`, aspect ratios per teaser size)                                                                                                                                                       |
| R12 | Opinion headline: italic sans (opus) or plain (others)                                           | **Missing token** (serif italic, already noted in tokens.md)                                                                                                                                                                                                                   | `styles/theme.css` + Figma; `tokens.md` §type                                                                                                                                                                                                                       |
| R13 | 3 different front-page h1 treatments                                                             | **Unclear rule** ("one h1 per page", nothing for pages with no visible title)                                                                                                                                                                                                  | `page-patterns.md` "The frame every page sits in"                                                                                                                                                                                                                   |
| R14 | Inert buttons (sonnet 13, haiku 3, opus 7 saves)                                                 | **Brief/skill ambiguity** about prototype interactivity                                                                                                                                                                                                                        | `SKILL.md` step 6 or `anti-patterns.md`: "a control with no `href`/`onPress` must be a link to a placeholder route or not be rendered"                                                                                                                              |
| R15 | Story viewport set two ways                                                                      | **Missing guidance**                                                                                                                                                                                                                                                           | `CLAUDE.md` "Component files" or the skill: how stories select Mobile/Desktop in Storybook 10                                                                                                                                                                       |
| R16 | Kicker loses its accent in dark (`text-brand-secondary` → gray-300)                              | Token behaviour; kicker colour not specified                                                                                                                                                                                                                                   | Resolved by R2 (define the kicker token)                                                                                                                                                                                                                            |
