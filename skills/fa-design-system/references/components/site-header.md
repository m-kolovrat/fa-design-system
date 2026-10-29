# Site header

The publication header on every newspaper page: optional market ticker, logo, search, "Logg inn" /
"Kjøp", the Meny button with its panel, and the section navigation. One component for Finansavisen,
Kapital and Motor. Figma: Header (Type = Mobile / Tablet / Desktop / Collapsed, Brand), Ticker bar,
Menu panel, \_Nav link, \_Header search, \_Header login.

```ts
import type { SiteBrand, SiteNavItem } from "fa-design-system/components/application/site-header/site-brands";
import { siteContent } from "fa-design-system/components/application/site-header/site-content";
import { SiteHeader } from "fa-design-system/components/application/site-header/site-header";
import type { SiteMenuContent } from "fa-design-system/components/application/site-header/site-menu-panel";
import type { TickerItem } from "fa-design-system/components/application/site-header/ticker-bar";
```

## Use when

- Any page of finansavisen.no, Kapital or Motor: front page, section front, article, stock page.

## Use something else when

- A logged-in, app-style tool screen (settings, admin, dashboards): [app-navigation](app-navigation.md).
- A trail back to the parent section on an article: [breadcrumbs](breadcrumbs.md) under the header.
- Sub-sections inside one page (Oversikt / Nøkkeltall / Nyheter): [tabs](tabs.md).

## Layout by breakpoint

The Figma Type is responsive CSS, not a prop.

| Width              | What shows                                                                                      |
| :----------------- | :---------------------------------------------------------------------------------------------- |
| below `md`         | Logo, search icon (calls `onSearchPress`), Logg inn / Kjøp, Meny icon; `shortcuts` row below    |
| `md` – `lg`        | Search field (sm) appears between logo and buttons; `shortcuts` row below                       |
| from `lg`          | Search field (md), "Meny" label, avatar when signed in; `navigation` groups with dividers below |
| `lg` + `collapsed` | One row: small logo, `navigation`, Meny icon. No search, login or avatar                        |

## Rules

- **site-header-brand** MUST Pick the publication with `brand` (`fa` · `kapital` · `motor`) only.
  NEVER add bar colors, logos or `className` fills per brand at the call site. Because the brand
  look lives in one config (`siteBrands` in `site-brands.ts`).
- **site-header-overrides** NEVER Recreate the dark search field or the brand "Logg inn" fill
  elsewhere, or restyle them on the header. Because they are registered style overrides
  (`docs/overrides.md`) that live only in `siteBrands[brand].search` / `.loginButton`; a second use
  means proposing a real Input/Button variant instead.
- **site-header-defaults** MUST Leave `navigation`, `shortcuts` and `menu` out unless the page has
  its own: the publication's complete navigation and Meny panel come from `siteContent[brand]`
  (`site-content.ts`), the same content Storybook shows. These defaults are on purpose, so a page
  never renders a half-empty panel or a dead Meny button. Never type a navigation from memory; to
  change one item (mark the current section), map over `siteContent[brand].navigation`. Because the
  navigation belongs to the publication, not the page, and changes in one place.
- **site-header-nav-data** MUST When passing your own, give `navigation` as groups
  (`SiteNavItem[][]`; a divider is drawn between groups) and a flat `shortcuts` list for mobile and
  tablet. Because desktop shows only `navigation` and smaller widths show only `shortcuts`.
- **site-header-current** MUST Mark the page's section with `current: true` on its `SiteNavItem`.
  Because it sets `aria-current="page"`.
- **site-header-dropdowns** SHOULD Give a nav item `items` only for big sections (Børs, 400 Rikeste,
  Video). Because sub-links show only in the desktop dropdown; the parent link must still lead to a
  page that lists them.
- **site-header-collapsed** SHOULD Set `collapsed` from your own scroll state (true once the page is
  scrolled past the full header) and make the header sticky in the page shell. Because the component
  doesn't watch scrolling, and `collapsed` affects desktop only.
- **site-header-user** MUST Pass `user` (`initials`, `href`) when signed in, and leave it out when
  signed out. Because `user` swaps "Logg inn" for the avatar link; "Kjøp" always shows.
- **site-header-search-mobile** MUST Pass `onSearchPress` and open a search view from it. Because
  below `md` the search field is hidden and the icon does nothing else.
- **site-header-menu** SHOULD Leave `menu` to its default. `menu={null}` removes the panel, and the
  Meny button then shows only when `onMenuPress` opens something else. Because a Meny button that
  does nothing is worse than none.
- **site-header-ticker** SHOULD Pass `tickerItems` with values already formatted (`"1.193,30"`,
  `"-1,59%"`) and `direction` matching the sign. Because the bar prints strings as given and colors by
  `direction`. Leave it out (or empty) to hide the bar.
- **site-header-once** MUST Render one `SiteHeader` per page, at the top, outside `<main>`. Because
  it renders the page's `<header>` banner and the "Hovedmeny" / "Snarveier" navs.

## Props

| Prop            | Values                                | Default                         |
| :-------------- | :------------------------------------ | :------------------------------ |
| `brand`         | `fa` · `kapital` · `motor`            | `fa`                            |
| `navigation`    | `SiteNavItem[][]`                     | `siteContent[brand].navigation` |
| `shortcuts`     | `SiteNavItem[]`                       | `siteContent[brand].shortcuts`  |
| `tickerItems`   | `TickerItem[]`                        |                                 |
| `user`          | `{ initials: string; href: string }`  |                                 |
| `collapsed`     | boolean (desktop only)                | `false`                         |
| `menu`          | `SiteMenuContent` · `null` (no panel) | `siteContent[brand].menu`       |
| `onMenuPress`   | `() => void`                          |                                 |
| `onSearchPress` | `() => void` (mobile search icon)     |                                 |
| `homeHref`      | string                                | `"/"`                           |
| `loginHref`     | string                                | `"#"`                           |
| `subscribeHref` | string ("Kjøp")                       | `"#"`                           |
| `className`     | layout only (`sticky top-0 z-30`)     |                                 |

## Types

`SiteNavItem`: `label`, `href`, `current?`, `items?: SiteNavItem[]` (desktop dropdown).
`TickerItem`: `label`, `value`, `change` (formatted strings), `direction: "up" | "down"`, `href?`.

`SiteMenuContent` (the Meny panel): `columns` (required, `{ title, href?, items }[]`), `groups?`
(sidebar entries that swap the main area, `{ label, items, layout?: "grid" | "list" }`), `links?`
(plain sidebar links), `publications?` / `partners?` (`{ label, href, logo, logoClassName? }`, logos
from `fa-icons`; partners open in a new tab), `highlights?` (bold links), `eAvis?`
(`{ date, weekday, href, coverSrc? }`), `searchAction?` (default `"/sok"`).

## Notes

- `siteContent` (`site-content.ts`) holds the per-publication defaults for the header and the
  footer: navigation, shortcuts, Meny panel, footer links, publisher info, copyright, disclaimer,
  social links. Kapital and Motor reuse Finansavisen's until theirs is designed
  (`docs/figma-parity.md` §2).
- `TickerBar` and `SiteMenuPanel` are exported, but `SiteHeader` renders both; use them through
  `tickerItems` and `menu`.
- `TickerBar` has a `duration` prop (seconds per loop, default `26`) that `SiteHeader` doesn't
  expose, so the speed is fixed from the header. Ask for a prop rather than rendering the bar
  yourself. Nav dropdowns (`NavDropdown`) and nav links are internal.

## Accessibility

- Labels are Norwegian and built in: "Søk", "Meny" / "Lukk meny", "Min side", the logo named after
  the publication, navs "Hovedmeny" and "Snarveier", ticker "Markedsoversikt" with "Opp" / "Ned".
- Nav dropdowns open on hover after 150 ms, or with Arrow Down on the focused link; Escape closes
  and returns focus. The link itself still goes to the section page.
- The Meny panel closes on Escape and on a click outside, and stops the page scrolling behind it.
  It is not a modal: focus stays on the Meny button.
- The ticker scrolls itself, pauses on hover and focus, and only scrolls by hand with reduced motion.
- The signed-in avatar link shows from `lg` only; on smaller screens put "Min side" in `menu`.

## Example

```tsx
// A Finansavisen page: navigation, shortcuts and the Meny panel are the publication's defaults
// (site-content.ts). Pass only what the page knows: ticker, user, hrefs and the search handler.
<SiteHeader
    brand="fa"
    className="sticky top-0 z-30"
    collapsed={isScrolled}
    tickerItems={[
        { label: "Oslo Børs", value: "1.193,30", change: "+0,84%", direction: "up", href: "/ticker/OSEBX" },
        { label: "Brent spot", value: "81,42", change: "-1,12%", direction: "down", href: "/ticker/BRENT" },
    ]}
    user={session ? { initials: "KH", href: "/min-side" } : undefined}
    loginHref="/logg-inn"
    subscribeHref="/abonnement"
    onSearchPress={openSearch}
/>;

// Marking the page's section: start from the defaults, change the one item.
const navigation = siteContent.fa.navigation.map((group) => group.map((item) => (item.href === "/bors" ? { ...item, current: true } : item)));
const shortcuts = siteContent.fa.shortcuts.map((item) => (item.href === "/bors" ? { ...item, current: true } : item));

<SiteHeader brand="fa" navigation={navigation} shortcuts={shortcuts} tickerItems={ticker} onSearchPress={openSearch} />;
```

## Figma parity

Mapped in `docs/figma-parity.md` §1; settled in §6 ("Site header and footer"). Brand surfaces use
primitive ramps (Fa `brand-700`, Kapital `orange-dark-600`, Motor `gray-800`) inside `siteBrands`
only. Code-only by decision: nav dropdowns, hover fills, ticker auto-scroll. Search field and
"Logg inn" fill are overrides in `docs/overrides.md`.

## See also

Storybook: Application / Site header (Fa, Kapital, Motor, Signed in, Collapsed). Related:
[site-footer](site-footer.md), [flags-logos](flags-logos.md), [dropdown](dropdown.md).
