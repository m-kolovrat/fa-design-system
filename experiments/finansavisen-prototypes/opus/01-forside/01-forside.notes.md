# 01-forside — notes (opus)

Files: `01-forside.tsx` (page, `Forside` with an optional `userName`), `01-forside.story.tsx`
(Experiments/opus/01-forside: Desktop, Mobile, plus logged-out variants of both).
`npx tsc --noEmit -p .` and `npx eslint` on this folder are clean. Storybook was not started, so I
haven't looked at the result in any viewport or theme (skill Step 6 asks for that). Nothing has been
checked visually.

## Components used

| Component                                                             | Path                                                   | Where                                                                                                                                       |
| :-------------------------------------------------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `SiteHeader` (+ `TickerItem`, `SiteNavItem`, `SiteMenuContent` types) | `@/components/application/site-header/site-header`     | Header, market ticker (market snapshot), nav, shortcuts to Børs / Watchlist / Forum / Bjellesauer / Investorchat, search, Logg inn / avatar |
| `SiteFooter`                                                          | `@/components/application/site-footer/site-footer`     | Footer; its app box covers "get the app"                                                                                                    |
| `Button`                                                              | `@/components/base/buttons/button`                     | CTAs, link buttons, prompt chips, follow chips, "Spill av Børsmorgen"                                                                       |
| `ButtonUtility`                                                       | `@/components/base/buttons/button-utility`             | Card-header chevron links, "Lagre i MittFa" on teasers                                                                                      |
| `Badge`, `BadgeWithDot`, `BadgeWithIcon`                              | `@/components/base/badges/badges`                      | Teaser markers, "Live", "Annonse"                                                                                                           |
| `FeaturedIcon`                                                        | `@/components/foundations/featured-icon/featured-icon` | Widget card headers, the logged-out invite                                                                                                  |
| `Input`                                                               | `@/components/base/input/input`                        | Investorchat / ticker field                                                                                                                 |
| `AvatarLabelGroup`, `getInitials`                                     | `@/components/base/avatar/...`                         | Commentary byline (Trygve Hegnar)                                                                                                           |
| `fa-icons`                                                            | —                                                      | Icons, plus `KapitalSmallLogo` and `MotorLogo`                                                                                              |

## Composed myself (no Figma component), and why

All of these follow the stand-ins in `page-patterns.md` unless noted.

- **Widget card**, for Børsoppdatering, Mest lest, Video, Karriere and Investorchat: the stand-in
  markup (section + FeaturedIcon + h2 + ButtonUtility chevron).
- **Article teaser**, in three sizes (lead, default, compact): image placeholder, marker badges,
  kicker inline before the headline in `text-brand-secondary`, a bold headline link, and a save
  `ButtonUtility`. The skill doesn't say how a kicker is styled or whether it sits inline or on its
  own line, so I chose inline brand-colored text.
- **Teaser markers**: Siste, Populært, Mye lest, Børsoppdatering and Pluss each map to a Badge. I
  picked every color and icon myself (see "Unclear" below).
- **Change value**: copied from page-patterns.
- **Live indicator**: `BadgeWithDot color="error"` plus a timestamp, as the pattern says.
- **Key-figure list**: a `dl` in the Børsoppdatering card.
- **Follow chips** ("Følg temaer"): `Button secondary sm` with `aria-pressed` and a Star /
  StarFilled trailing icon. I used topics instead of the avatar `iconLeading`.
- **AI prompt chips**: `Button secondary sm` used as links to `/investorchat?q=…`.
- **Greeting / account invite**: logged in shows "God morgen, Kari" and a watchlist summary.
  Logged out shows a featured icon, copy and a primary "Opprett gratis konto". No pattern exists
  for either.
- **Sponsored card**: a separate card outside the news stream, marked with an "Annonse" badge and a
  disclosure line, with the content in an inset. No pattern exists.
- **Mest lest** as a numbered list with a Lock icon (`aria-label="Pluss-artikkel"`) for Pluss.
- **Kapital / Motor cards**: a logo home link, an image placeholder and a headline. No pattern
  exists.
- **Image placeholder**: an `aspect-video rounded-xl bg-tertiary` box with an `Image` icon. The
  brief has no photos, and the skill doesn't say what to use for article imagery in a prototype.
- **Visually hidden `h1`** ("Finansavisen – forsiden"): the rule is one `h1` per page, but the
  front page has no visible page title.

## Patterns

**New patterns**

- Teaser **marker badge set** (Siste / Populært / Mye lest / Børsoppdatering / Pluss), used in the
  stream, the commentary card and inline in Mest lest. Page-patterns only says "label pill" with no
  color mapping.
- **Kicker inline before the headline** in `text-brand-secondary`, in every teaser.
- **Teaser stream inside one card**: a lead teaser, then a 2-up row, then compact rows with
  dividers, then another 2-up row, all inside one card. Layout.md doesn't say whether teasers are
  one card each or grouped.
- **Numbered "Mest lest" list**: a large brand-colored rank number next to the headline.
- **Greeting / free-account invite card** at the top of the main column.
- **Sponsored (Annonse) card**: a gray "Annonse" badge, a "not written by journalists" line, and the
  content in an inset.
- **Publication cross-promo card** (Kapital, Motor): a logo, then a teaser.
- **Job-ad list** (Karriere): title over "employer · place".
- **Video teaser** with a "Spill av" secondary button. There's no player, which the skill says to
  ask about first.

**Clashes**

- **The Investorchat search is in two places.** `SiteHeader` has its own search field from `md` up,
  and I also added an Investorchat card in the main column. The extra card is there because below
  `md` the header search is only an icon, and the brief puts search and Investorchat first among
  user actions. The two copies of the same feature look different.
- **Ticker number format.** `site-header.md` says to format ticker values like `"1 193,30"`, but
  the library's own `site-header.demo.tsx` uses `"1.193,30"`. I followed the skill.
- **Sidebar order on mobile.** The front-page shell puts the sidebar under the stream below `lg`.
  On a phone, which is the main audience, Børsoppdatering and Mest lest therefore end up below
  about eight teasers. The brief says mobile-first, while the pattern is desktop-first. I kept the
  pattern.
- **Investorchat placement.** `layout-sidebar-context` says the sidebar holds only context, so I
  moved Investorchat (an action) into the main column. That pushes it below the stream on mobile.

## Rules bent

- **Commentary headline**: plain `italic` on the sans font. The real design is a serif italic with
  no token. I added `italic` as the closest sign of "opinion", although the skill says to use the
  nearest token and report it. Arguably that is a small invented style.
- **Headline sizes**: lead `text-display-xs md:text-display-sm`, others `text-lg md:text-xl` and
  `text-md`. These are my picks within the ranges in tokens.md; the live sizes sit between steps.
- **`max-w-container`** (1280 px) for the page width, because the skill says the width isn't fixed
  yet.
- **`aria-hidden` + `tabIndex={-1}`** on the image links, so each teaser is one tab stop (the
  headline link).
- **The image placeholder** is a decorative element I invented.

## Placeholder data to replace

- Ticker values: Nikkei 225 (41 872,15), Bitcoin (1 021 480), Gull (3 412,60), US 10 år (4,21) and
  every change % except Oslo Børs and Brent. Oslo Børs, Brent, EUR/NOK and USD/NOK values are from
  the brief.
- All headlines except "Rally i rigg og oljemygg – full kollaps i sjømat", the Dyve kicker, and
  the markers chosen for each story.
- Børsoppdatering key figures (Borr 38,12 +6,41 %, Mowi 171,40 −7,85 %) and "Oppdatert 14:32".
- Watchlist "+0,84 %" in the greeting, and the user name "Kari".
- Trygve Hegnar's role ("Ansvarlig redaktør") and his commentary headline. There's no photo (initials
  only).
- The advertiser "Fjordkyst Kapitalforvaltning" and the job ads (fictional employers).
- Every image (placeholders), every href, the eAvis date, the app store URLs and the social links.

## Where the skill was unclear, contradictory or missing something

1. **Teaser markers.** The brief has six marker types, but the skill gives no colors or icons for
   them. `badge-color-meaning` says decorative colors are for categories and `brand` is for the
   publication's own labels, but "Siste", "Populært" and "Mye lest" don't clearly fit either. I
   guessed.
2. **Pluss recognition.** The global rule's example is `<Lock aria-label="Pluss-artikkel" />`, while
   the teaser pattern says "label pill 'Pluss'". I used a brand badge with a Lock in teasers and a
   bare Lock in dense lists. I couldn't tell which one is canonical.
3. **Sponsored content.** The brief requires it to be "clearly separate from journalism", but the
   skill has no pattern, token or rule for ads or native content (label wording, surface,
   placement).
4. **Article images.** There's no guidance on images or aspect ratios, and nothing to use as a
   placeholder in a prototype. The only image URLs in the repo are untitledui.com ones, which the
   skill forbids copying.
5. **The header search can't be wired.** `SiteHeader` exposes no `onSearch` / `value` /
   `onSubmit` for the desktop search field (it's an `Input` with no handlers), so "search a
   ticker" from the header can't be connected in an app. Below `md` there's only `onSearchPress`.
   This is a probable library gap.
6. **Logged-in greeting.** The brief requires one, but there's no pattern, and `SiteHeader.user`
   only takes `initials`, not a name.
7. **Kicker styling** isn't defined (inline or own line, which color).
8. **Video.** "Video player: no stand-in, ask before building" blocks the brief's "play video". I
   used a link button to the video page instead.
9. **Story viewports.** The skill and CLAUDE.md don't say how a story selects a viewport. I used
   Storybook 10 `globals: { viewport: { value } }`, guessing from the viewport keys in
   `.storybook/preview.ts`. No library story does this.
10. **Front-page `h1`.** The skill requires one `h1` per page, but the front page has no visible
    title and the skill doesn't say what it should be.
11. **Follow chips.** Is `aria-pressed` on the library `Button` forwarded? It type-checks, but the
    `Button` reference page doesn't mention it, and RAC's `ToggleButton` might be the better
    primitive.
12. **`FeaturedIcon` for widget headers.** It's decorative, and the widget-card stand-in uses it,
    but there's no guidance on which icon or color fits non-directional widgets (Mest lest, Video,
    Karriere). I used brand and gray.
13. **Demo vs skill.** `site-header.demo.tsx` passes `logoClassName: "text-orange-dark-600"` (a
    primitive) for the Kapital logo in the menu, while the skill says never to use primitives at a
    call site. The menu config may be an allowed exception, but nothing says so.
