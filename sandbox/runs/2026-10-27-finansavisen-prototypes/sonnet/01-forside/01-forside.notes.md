# 01-forside (sonnet) notes

Not viewed in Storybook (told not to start it): only tsc and eslint were run, both clean for this folder.

## Components used

- `@/components/application/site-header/site-header` (SiteHeader, ticker bar as market snapshot, `user` for logged-in)
- `@/components/application/site-header/ticker-bar` (type only), `site-brands` (type only)
- `@/components/application/site-footer/site-footer`
- `@/components/base/badges/badges`: Badge, BadgeWithDot (Siste, Live, Annonse), BadgeWithIcon with Lock (Pluss)
- `@/components/base/buttons/button`, `button-utility` (save, play, chevron links, prompt/follow chips, CTAs)
- `@/components/foundations/featured-icon/featured-icon` (card header tiles)
- `@/components/base/avatar/avatar` (Trygve Hegnar, initials only)
- `@/utils/cx`; icons from `fa-icons`

## Composed myself (no Figma frame yet)

- Card = `section` with the layout.md level-2 classes; widget-card header; article teaser (lead and row variants); market list (`dl`, key-figure list pattern); change value (from page-patterns); follow chips and AI prompt chips (Button stand-ins); logged-out invitation card; sponsored aside (inset `bg-tertiary`, "Annonse" modern badge, outside the journalism cards); app card. Image slots are gray insets with an Image icon.

## Patterns section

- New patterns: (1) logged-out invitation banner at the top of the front page (card with copy + two buttons); not in page-patterns. (2) Greeting line "God morgen, Kari" for logged-in. (3) Numbered "Mest lest" list. (4) Sponsored block separated from journalism. (5) Marker badge set Siste/Populært/Mye lest/Børsoppdatering/Pluss mapped onto Badge variants; the mapping is my choice.
- Clashes: front page in layout.md/page-patterns is "teaser stream 2/3, widgets 1/3", followed; but the header already carries the market snapshot as a ticker, so the sidebar "Markedet nå" card duplicates it (brief wants both snapshot and mobile-first). On mobile the sidebar falls below the whole stream, so market, Mest lest and Investorchat are far down; layout-sidebar-context says main first, which fights mobile-first. Teaser rows in a card use dividers, while page-patterns says teasers on brand fill exist; I didn't use an emphasis card.
- Opinion teaser: serif italic headline has no token, so Hegnar's commentary is bold sans.

## Rules bent

- Used `max-w-[1280px]` (arbitrary value) because width is "not fixed yet".
- Headline links are plain `<a>` with the focus ring classes (they are not "standalone action links", so fa-links doesn't apply cleanly).
- `text-brand-secondary` for kickers, assumed to exist in tokens (tsc can't check this); verify.
- Sponsored block uses `Badge type="modern"` gray; fine by the rule.

## Placeholder data to replace

All headlines except those given in the brief, times, "Mest lest" list, Nordea sponsor, Kapital/Motor/Karriere items, Nikkei/Bitcoin/gull/US 10 år values and all changes except Oslo Børs and Brent, user name, hrefs (`#...`), footer text. No images: gray slots.

## Skill gaps and unclear points

- No guidance on an article teaser's actual markup or size scale (lead vs row); no Pluss marker spec ("Lock icon + brand badge" is my guess; badge.md has `BadgeWithIcon` but no Pluss rule).
- No guidance for sponsored content ("Annonse") at all.
- No stand-in for an image slot / image component; no `Card` component, so every page repeats the class string.
- page-patterns says the "Børsoppdatering" label is a pill, but no live/latest-update widget; I reused Live indicator.
- Ticker `change` strings: docs say pass "-1,59%" but the demo passes "11,69%" for up; sign convention for up values is unclear (I omitted +).
- Mobile front page: layout.md says cards run edge to edge on live site but "keep border/radius/px-4 gutter" until decided; I followed the latter.
- Header `shortcuts` vs `navigation` content for the front page isn't specified.
- Storybook viewport: `globals.viewport` (SB10) used for Desktop/Mobile; no skill guidance.
- `Avatar` props (`alt`, `initials`) were not opened in detail; I didn't read avatar.md fully because the output was truncated.
- Skill steps say to check in Storybook in both themes; not possible under the task rules.
