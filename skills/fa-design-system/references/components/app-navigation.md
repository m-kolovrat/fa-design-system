# App navigation

Sidebar and top-bar navigation for app-style, logged-in screens (portfolio tools, account
settings, internal dashboards). Below `lg` each one turns into a mobile header with a drawer.
Figma: the Untitled UI sidebar and header navigation frames (see the story `design` ids).

**Not for the newspaper.** finansavisen.no, Kapital and Motor pages use
[site-header](site-header.md) and [site-footer](site-footer.md).

```ts
import type { NavItemDividerType, NavItemType } from "@/components/application/app-navigation/config";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { SidebarNavigationDualTier } from "@/components/application/app-navigation/sidebar-navigation/sidebar-dual-tier";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";

// Building blocks: NavList, NavItemBase, NavButton, NavAccountCard, MobileNavigationHeader
// from "@/components/application/app-navigation/sidebar-navigation-base"
```

## Which one

| Export                                 | Use for                                                                                                     |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `SidebarNavigationSimple`              | Default sidebar: logo, search, items (one level of collapsible sub-items), footer items, feature card.      |
| `SidebarNavigationSectionDividers`     | Flat list split by `{ divider: true }` entries.                                                             |
| `SidebarNavigationSectionsSubheadings` | Groups with a small uppercase heading each.                                                                 |
| `SidebarNavigationSlim`                | Icon rail (68px); sub-items fly out on hover. Every item needs an `icon`.                                   |
| `SidebarNavigationDualTier`            | Wide sidebar whose sub-items open in a second panel on hover.                                               |
| `HeaderNavigationBase`                 | Top bar with items; sub-items of the active item show in a second row (`secondaryType` `buttons` · `tabs`). |

## Use something else when

- Any newspaper page: `SiteHeader` / `SiteFooter`.
- Sections inside one page: [tabs](tabs.md). A trail back up: [breadcrumbs](breadcrumbs.md).

## Rules

- **app-nav-not-newspaper** NEVER Use these on finansavisen.no, Kapital or Motor pages. Because the
  publication header, brand bar, ticker and Meny panel exist only in `SiteHeader`.
- **app-nav-active-url** MUST Pass `activeUrl` with the current path. Because the active item and
  the open group are derived from it (`HeaderNavigationBase` also prefix-matches nested paths; an
  item's `current` overrides).
- **app-nav-account-card** MUST Never ship the built-in account card with its placeholder people.
  Use `showAccountCard={false}` on `SidebarNavigationSimple`, or pass real `accountItems` and
  `selectedAccountId` to `SidebarNavigationDualTier`. The other sidebars always render placeholder
  accounts: tell the person before using them. Because `NavAccountCard` defaults to Untitled UI
  sample users.
- **app-nav-header-actions** MUST Pass `actions` to `HeaderNavigationBase`. Because the default
  actions link to demo routes (`/settings-01`, `/notifications-01`) with a hard-coded "2" badge.
- **app-nav-items-data** MUST Describe items as `NavItemType` (`label`, `href`, `icon`, `badge`,
  `items`). Use `NavItemDividerType` (`{ divider: true }`) only with `SidebarNavigationSectionDividers`
  or `NavList`. Because each variant renders from that shape and has no other content slot.
- **app-nav-icons** MUST Take item icons from `fa-icons`, as component references
  (`icon: Bookmark`). Because the nav sizes and colors them itself.
- **app-nav-layout** SHOULD Render the sidebar as a sibling before the page content in a flex row;
  it is `fixed` on desktop and adds its own placeholder width. Because it handles its own mobile
  header below `lg`.
- **app-nav-fixed-content** MUST Tell the person that the logo is always `FaLargeLogo`, and the
  search fields, mobile labels and (in `HeaderNavigationBase`) the mobile drawer's Support /
  Settings / "Open in browser" links are fixed English demo content. Because none of it has a prop
  yet.

## Props

Sidebars: `activeUrl`, `items` (required). `SidebarNavigationSimple` adds `footerItems`,
`featureCard` (node), `showAccountCard` (default `true`), `hideBorder`, `className`.
`SidebarNavigationDualTier` adds `footerItems`, `featureCard`, `hideBorder`, `accountItems`,
`selectedAccountId`. `SidebarNavigationSlim` adds `footerItems`, `hideBorder`, `hideRightBorder`.
`SidebarNavigationSectionsSubheadings` takes `items: { label: string; items: NavItemType[] }[]`
(`activeUrl` default `"/"`).

`HeaderNavigationBase`: `items` (required; `{ label, href, current?, icon?, badge?, items? }`),
`activeUrl`, `subItems` (overrides the active item's sub-items), `actions` (node), `centered`
(default `false`), `secondaryType` `buttons` · `tabs` (default `buttons`), `hideBorder`.

`NavButton` (for `actions`): `href`, `icon`, `label` (tooltip and `aria-label`), `current`,
`tooltipPlacement` (default `right`; use `bottom` in a header), `children`.

## Accessibility

- Icon-only `NavButton`s are named by `label`; always pass it.
- The active item is styled but `NavButton` doesn't set `aria-current`; don't rely on it as the
  only cue in new markup.
- Sidebar item lists are a plain `<ul>` inside `<aside>`, with no `<nav>` landmark.
- The mobile drawer is a modal dialog: focus is trapped and returns to the menu button.
- With `secondaryType="tabs"` the second row only shows the active sub-item; the tabs carry no
  links. Use `buttons` when people must navigate from that row.

## Example

```tsx
const items: NavItemType[] = [
    { label: "Oversikt", href: "/min-side", icon: Home },
    {
        label: "Portefølje",
        href: "/min-side/portefolje",
        icon: Wallet,
        items: [
            { label: "Beholdning", href: "/min-side/portefolje/beholdning" },
            { label: "Transaksjoner", href: "/min-side/portefolje/transaksjoner" },
        ],
    },
    { label: "Watchlist", href: "/min-side/watchlist", icon: Star, badge: 4 },
    { label: "Varsler", href: "/min-side/varsler", icon: Bell },
];

<div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
    <SidebarNavigationSimple
        activeUrl="/min-side/portefolje/transaksjoner"
        items={items}
        footerItems={[{ label: "Innstillinger", href: "/min-side/innstillinger", icon: Settings }]}
        showAccountCard={false}
    />
    <main className="flex-1 px-4 py-8 md:px-8">…</main>
</div>;
```

## Figma parity

Story frames point at the Untitled UI navigation frames. `docs/figma-parity.md` §2 lists navigation
featured cards as only partly in code (two demo cards in `featured-cards.demo.tsx`, not exported
components); don't import them as library parts.

## See also

Storybook: Application / Application navigation. Related: [site-header](site-header.md),
[tabs](tabs.md), [dropdown](dropdown.md).
