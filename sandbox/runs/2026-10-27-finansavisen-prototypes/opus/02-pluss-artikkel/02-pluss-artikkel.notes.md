# 02 Pluss-artikkel: notes (opus)

Files: `02-pluss-artikkel.tsx` (page, `isSubscriber` prop), `02-pluss-artikkel.story.tsx`
(Desktop, Mobile, Paywall (mobile), Paywall (desktop)). `tsc` reports no errors in these files
and `eslint` is clean. Storybook was not started (per the task), so nothing was checked visually
in either theme or viewport. Step 6 of the skill asks for that check, and it is still to do.

## Components used

| Component                                    | Path                                                                           | Where                                                   |
| :------------------------------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------ |
| `SiteHeader` (+ `TickerItem`, `SiteNavItem`) | `@/components/application/site-header/site-header`                             | Page top; `user` only when subscriber                   |
| `SiteFooter`                                 | `@/components/application/site-footer/site-footer`                             | Page bottom                                             |
| `Button`                                     | `@/components/base/buttons/button`                                             | Lagre i MittFa, Tips meg, follow chips, links, paywall  |
| `ButtonUtility`                              | `@/components/base/buttons/button-utility`                                     | Copy link, share, open stock page, save teaser          |
| `SocialButton`                               | `@/components/base/buttons/social-button`                                      | Share (Facebook, X) and paywall sign-in (Google, Apple) |
| `ButtonGroup` / `ButtonGroupItem`            | `@/components/base/button-group/button-group`                                  | Return period selector (1D–5Å)                          |
| `Badge`, `BadgeWithDot`, `BadgeWithIcon`     | `@/components/base/badges/badges`                                              | Ticker badges, "Live", "Pluss" with lock                |
| `Avatar`, `AvatarLabelGroup`, `getInitials`  | `@/components/base/avatar/*`                                                   | Byline, investor, commenters, company logo fallbacks    |
| `TextArea`                                   | `@/components/base/textarea/textarea`                                          | Comment field (subscriber only)                         |
| Icons from `fa-icons`                        | `Ai, ArrowRight, Chat, Image, Link, Lock, Mail, Plus, Share, Star, StarFilled` |                                                         |

## Composed myself (no component or Figma frame yet)

All built from the stand-ins in `page-patterns.md`, none of which has a Figma component:

- **Article header**: label pill (`BadgeWithIcon` Lock "Pluss"), section link, `h1` with the kicker
  inside it in `text-brand-secondary`, ingress, "Publisert" line, "Lagre i MittFa".
- **Change value**: the `ChangeValue` helper, copied from page-patterns.
- **Live price inset** (`StockInset`): logo avatar, name, ticker badge, Live badge plus time, price
  in `text-display-xs`, the return for the selected period, a period `ButtonGroup` and a follow chip.
  It sits in the body as an inset, at the point where each company is mentioned.
- **Investor profile inset**: `AvatarLabelGroup`, key figures as a `dl` (label over value), LUMI
  as a ticker badge, a "Se investorprofil" link.
- **Follow chips** (`FollowChip`): `Button secondary sm`, `aria-pressed`, Star / StarFilled trailing,
  an avatar as `iconLeading`.
- **Article teaser** (compact): image placeholder, kicker plus title link, Pluss badge, save button.
- **Paywall box**, **AI-use note**, **comments section**, **"Legg til i MittFa" follow card**.
- **Desktop rail** ("Aksjer i saken" plus the ad slot) and the **photo placeholder**.

## Patterns

**New patterns**

- **Kicker before the headline** ("Andreas Wold Hofstad (31):"). The article header pattern has a
  label pill but no kicker. The teaser pattern has one, with no style given. I set it inside the
  `h1` in `text-brand-secondary`.
- **Live price inset inside the article body**, with a period selector. page-patterns only says
  "embedded widgets as insets".
- **Investor profile inset** inside an article: a smaller version of the Investor profile header band.
- **Desktop right rail on an article** (sticky "Aksjer i saken" card plus an ad slot). The Article
  shell is "one column", so this extends it to fit the brief's "live prices alongside" and "ads
  must not interrupt reading". It is hidden below `lg`, where the inline insets carry the prices.
- **Ad slot**: nothing in the skill describes ads (placement, label, surface). I used a
  bordered `bg-secondary` box labelled "Annonse".
- **Comments section**: listed in the article order but not described. I built it from
  `AvatarLabelGroup`, text, `TextArea` and a "Vis alle" link.
- **Paywalled state below the opening**: what happens to the rest of the page (follow card,
  comments, further reading) isn't described. I kept "Les mer" and dropped the rest.

**Clashes**

- **Period selector**: page-patterns says each item shows "the label plus the change under it" and
  stays "on one row" below `md`. With six periods, `sm` items and the change values, that doesn't
  fit 375 px inside an inset (about 311 px of room). I used labels only and show the selected
  period's return next to the price.
- **Pluss lock**: global rule 5 gives `<Lock aria-label="Pluss-artikkel" />` as the example for the
  Pluss marker. The article teaser pattern instead uses a "Pluss" label pill. I used
  `BadgeWithIcon` with the Lock and the text "Pluss" (the icon stays unnamed, since the text says
  the same). The bare named lock is used only in the paywall box.
- **Card in a reading page**: the reading page is white with insets, but the paywall box is a
  "centered card", and the rail's stock list is a bordered card. So both a level-2 card and insets
  sit on `bg-primary_alt`, and the card's white-on-white separation comes only from its border.
- **Article body width**: the live site is about 690 px. I didn't use an arbitrary width; the body
  is the ⅔ column of a `max-w-5xl` article (about 650 px at desktop). The header and photo are full
  `max-w-5xl`, matching "header and image wider than the body".
- **Body type size**: `prose` is 16/24 against the live 18/30. I kept `prose`, as the skill says.

## Rules bent

- **Hand-styled inline links**: links for the company name in the inset, the section link,
  teaser titles and the AI note's link are plain `<a>` with `hover:underline` and the focus ring,
  outside `prose`. Rule 10 (`fa-links`) covers standalone action links (use `Button`) and links in
  running text (`prose`). A headline or name that is itself a link fits neither, and `Button
link-gray` would restyle the title's type.
- **Ticker badge as a link**: `Badge` has no `href`, so I wrapped it in an `<a>` with the focus ring.
- **Lead size**: the ingress is `text-lg md:text-display-xs`, not `text-display-xs` at
  every width, because at 375 px a 24 px lead under a 30 px headline pushes the opening off screen.
- **Headline** `text-display-sm md:text-display-lg`. The skill gives "display-md – 2xl" for article
  headlines, but `display-md` is too large for a phone headline of this length.
- **Ad slot**: `bg-secondary` plus a border. It's an invented surface (no ad pattern exists).

## Placeholder data that needs replacing

- Ingress text, all body paragraphs, all quotes except the «Ikke opplevd før» heading, the Bruton
  CFO statement and the photographer's name. These are invented to fit the brief.
- **Returns other than 1D** for BRUT and INSW.US (1U, 1M, 6M, 1Å, 5Å) are invented. Price time
  "11:52" is invented too.
- Paywall price and terms ("fra 99 kr", "499 kr per måned", "Ingen bindingstid") are invented.
- Comment count (14), commenters and comments; related story and "Les mer" teasers.
- Ticker bar values (OSEBX, Brent, USD, EUR).
- The photo: a `bg-tertiary` box with an image icon, because the repo has no article image.
- Company logos: initials avatars (`rounded={false}`). `fa-icons` has no company logos.
- `mailto:` for "Tips meg" and the share URLs.

## Where the skill was unclear, contradictory or missing something

1. **No article components at all.** Article header, kicker, teaser, change value, follow chips
   and paywall are all stand-ins. For an article page, that is most of the screen.
2. **Kicker style** is undefined: color, weight, and whether it sits inside the `h1`.
3. **Period selector stand-in doesn't fit mobile** with change values (see Clashes).
4. **Links that aren't actions or running text** (headline links, names, a ticker badge) have no
   rule. Hand-styling them is the only option, and that is close to the "hand-styled link" rule 10
   warns about. `Badge` has no `href`, though the ticker badge pattern says "always a link".
5. **Ads**: no guidance, even though the brief and every live article page have them.
6. **Paywall**: the stand-in names `SocialButton` sign-in options, but `SocialButton` supports only
   google, facebook, apple and twitter (no Vipps or BankID, which Norwegian sites use). Its
   `facebook` and `black` colors are hard-coded hex and `bg-black` / `text-white` in the library
   (`components/base/buttons/social-button.tsx`), which breaks the semantic-token rule inside the
   library. The skill doesn't say which theme (`brand` / `color` / `gray`) to use.
7. **`ButtonUtility` takes DOM `ButtonHTMLAttributes`** (so `onClick` in the types) but renders a
   React Aria `Button` that expects `onPress`. The button reference doesn't mention this, and it is
   a likely source of bugs. I gave the utility buttons no handlers.
8. **Storybook 10 viewport**: the skill doesn't say how to pick a viewport in a story. I used
   `globals: { viewport: { value: "mobile" } }` with the keys from `.storybook/preview.ts`
   (`mobile`, `desktop`), which is unverified because Storybook wasn't run.
9. **The reading page versus cards**: `layout-reading-page` (white page, insets) and the paywall box
   ("centered card") don't say how a card should look on a white page.
10. **No image assets or image component**: there's no guidance on aspect ratio, radius, or a
    placeholder for article photos.
11. **Lead size on mobile**: `text-display-xs` for the lead is given without a mobile size, and
    there is no mobile headline size either.
12. **Avatar in `Button iconLeading`** (the follow chips stand-in) works only because Button renders
    any element as-is. It is not documented, and the avatar's size against the `sm` button height
    is a guess (`xs`).
