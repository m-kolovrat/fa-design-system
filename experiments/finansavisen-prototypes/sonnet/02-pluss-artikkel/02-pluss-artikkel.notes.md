# 02-pluss-artikkel (sonnet) - notes

Status: `tsc` and `eslint` are clean for this folder. NOT checked visually: Storybook was not started (per instructions), so layout at 375 px, dark mode and the wrapping of the header chips are unverified.

## Components used
- `SiteHeader` - `@/components/application/site-header/site-header` (nav, shortcuts, menu, ticker data imported from `site-header.demo`; `user` set only for subscribers)
- `SiteFooter` - `@/components/application/site-footer/site-footer` (`footerLinks` from `site-footer.demo`)
- `Button` (`primary`, `secondary`, `link-color`, `href`) - `@/components/base/buttons/button`
- `ButtonUtility` (share, copy link with tooltips) - `@/components/base/buttons/button-utility`
- `SocialButton` (Google, Apple in paywall) - `@/components/base/buttons/social-button`
- `ButtonGroup` / `ButtonGroupItem` (return period) - `@/components/base/button-group/button-group`
- `Badge`, `BadgeWithIcon` (Pluss lock, section, ticker) - `@/components/base/badges/badges`
- `Avatar`, `AvatarLabelGroup` (journalist, investor, comments) - `@/components/base/avatar/*`
- Icons from `fa-icons`: Chat, Info, Link, Lock, Mail, Share, Star, StarFilled
- `cx` from `@/utils/cx`

## Composed myself (stand-ins, no Figma component yet)
- **Article header** (Pluss pill, section badge, kicker + h1, ingress, byline row) per page-patterns.
- **Stock inset** (`StockInset`): name link, ticker badge, price, change value, `ButtonGroup` period selector, selected-period return row. Inset = `rounded-2xl bg-tertiary p-4`.
- **Investor inset** (`InvestorInset`): `AvatarLabelGroup` + `dl` of key figures (2-col grid).
- **Change value** helper (copied from page-patterns, `Intl.NumberFormat("nb-NO")`).
- **Follow chips** (`Button secondary sm`, `aria-pressed`, star icon) and "Legg til MittFa" inset.
- **Paywall box** (centered card, primary "Se abonnementer", two `SocialButton`s, secondary e-post button, login link).
- Related story, "Les også" and comment rows are plain `<a>`/`li` markup in the news-feed-item style. AI-use note is an inset with an `Info` icon (not `Alert`, since Alert is a floating card and the article's insets are the documented container).
- Photo is a gray `bg-tertiary` placeholder block with `role="img"`; there is no image asset.

## Patterns (as requested by the skill)
**New patterns**
- Inline stock-price insets placed inside the article body next to the paragraph that mentions the company (the skill only describes "related widgets" after the body and an "embedded widgets as insets" line).
- Period selector with the *selected period's return shown in a row below* the ButtonGroup, instead of "change under each label".
- Article-level split of kicker (`text-brand-secondary`, person name + age) above the headline inside one `h1`.
- Paywalled article state: header + ingress + first paragraph, then paywall box; everything after (insets, follow card, comments, further reading) is removed.
- Quote «Ikke opplevd før» as a standalone bold pull-quote paragraph (skill: "quotes as bold body text").

**Clashes**
- layout-reading-page says white page, page-patterns' frame puts `<main>` inside `bg-secondary_alt`. I made `<main>` `bg-primary_alt` and left the outer wrapper `bg-secondary_alt` (visible only around header/footer). Both are on-spec but the combination is my reading.
- Period selector: stand-in says label + change inside each ButtonGroup item. At 375 px six items with two lines don't fit (about 52 px each), so I put the return below. Deviation from the stand-in.
- Skill says article `px-4` gutter; page width "from the design". I used `max-w-3xl` (768 px) for header, image and body together, rather than header/image wider than the ~690 px body, because there is no token or rule for widths and `prose` has its own max-width (I set `max-w-none`).
- "Follow chips" stand-in says Avatar as `iconLeading`; `Avatar` has no `data-icon` sizing hook documented, so the avatar renders at its own `xs` size inside the button (unverified visually).
- Ingress uses `text-lg md:text-xl` while page-patterns says `text-display-xs font-medium` for the lead; display-xs (24 px) is too big for a two-sentence lead on a phone. Bent.

## Rules bent
- fa-layout / layout-content-in-cards: article text sits straight on the white reading page, as layout-reading-page intends; not carded.
- Hand-written `<a>` with the focus classes for the section badge, stock name, related/further-reading links (rule 10 allows plain links in text, but these are standalone; `Button link-*` is `whitespace-nowrap`, so unusable for wrapping headlines).
- Arbitrary-free classes, no `dark:`, no gradients, no inline styles. `aspect-3/2` is a Tailwind v4 fraction utility.
- Used `.demo` data imports (`site-header.demo`, `site-footer.demo`); demos don't ship in the package, so a real app would own this data.

## Placeholder data to replace
- Entire article text beyond the brief's facts (body, quote context, Hofstad's statements, ingress second sentence) is invented. It attributes statements to a real-sounding person: needs the real article.
- Stock returns for 1U/1M/I år/1Å/5Å (only the 1D values and prices are from the brief), INSW currency (USD assumed).
- Investor "Investor, 31 år" subtitle, comments, further reading, related story, caption/photo credit ("Eksempelfotograf"), "fra 99 kr" and "ingen bindingstid", AI-use wording, copyright year, ticker items, nav and footer data (from the demos).
- Photo: no image; placeholder block.
- All `href="#"`.

## Skill: unclear, contradictory or missing
1. **Ads**: brief says ads must not interrupt reading; the skill has no ad slot, ad label or ad component. I built no ad. Guidance on where an ad may sit would help.
2. **Paywall**: no rule for what a non-subscriber sees besides the box (is the first paragraph faded? is there a gradient? "no gradient" says no). I used a hard cut. Paywall box stand-in lists only SocialButtons + email button; it doesn't say whether a primary "Se abonnementer" is expected. One-primary rule made me add one.
3. **Lock/Pluss marker**: global rule 5 mentions a lock marking a Pluss article, but the article-header pattern uses a "Pluss" label pill with no icon spec. I used `BadgeWithIcon` with `Lock` plus the word.
4. **Stock inset with live price**: the article header pattern describes ticker chips with price in the header; the brief wants a price per company mentioned. No guidance for inline vs. header; no "live" indicator wiring (`Live` pattern exists but no timestamp/refresh behavior).
5. **Pull-quote**: "quotes as bold body text" - `prose` blockquote styles add italics/border; I used `not-italic` and a bold `p`. Whether a `blockquote` element is intended is unclear.
6. **Widths** are explicitly undecided, so every page invents its own; this page used 768 px.
7. **Skill doc says image/header wider than body** but gives no class or token for that; I couldn't implement it without arbitrary widths.
8. `SocialButton` lacks the `size`/width guidance (I used `className="w-full"`, which is layout only) and only offers Google/Facebook/Apple/Twitter, which fits Finansavisen's paywall only partly (no Vipps, though `fa-icons` has `VippsLargeLogo`).
9. **Comments**: no comment-list or comment-form pattern; I composed rows from Avatar + text. Same for "reaction"/reply.
10. **ButtonGroup + `aria-label` plus `Key` import**: skill example imports `Key` from `react-aria`, which resolves, but `react-aria` isn't listed in package deps I could see; fine here, possibly fragile in an app.
11. Viewport story setup (Storybook 10 `globals.viewport`) is not documented in the skill; I found it from `.storybook/preview`.
12. `Avatar` as `iconLeading` in follow chips (see Clashes) is unverified and may not size correctly.
13. Skill step 6 requires checking light/dark/mobile in Storybook, which this task forbade, so that step is not done.
