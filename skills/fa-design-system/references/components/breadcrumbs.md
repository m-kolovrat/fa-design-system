# Breadcrumbs

Shows where the current page sits in the site and links back up the trail (Forside › Børs ›
Equinor). Figma: Breadcrumbs (Divider × Type × Breakpoint).

```ts
import { Breadcrumbs } from "fa-design-system/components/application/breadcrumbs/breadcrumbs";
```

## Use when

- A page sits two or more levels deep: a stock page under Børs, an article under Eiendom, a
  settings section.

## Use something else when

- Top-level navigation between sections: `SiteHeader` (newspaper) or
  [app-navigation](app-navigation.md) (app screens).
- Peer sections on one page: [tabs](tabs.md).
- A single "back" link: `Button href color="link-gray" iconLeading={ArrowLeft}`.

## Rules

- **breadcrumbs-current-last** MUST Make the current page the last `Breadcrumbs.Item`. Because the
  last item is marked current (`aria-current="page"`, brand color, no divider after it).
- **breadcrumbs-items-only** MUST Pass only `Breadcrumbs.Item` elements as children, each with
  `href`. Because collapsing counts children and each item renders a React Aria link.
- **breadcrumbs-icon-label** MUST Give an icon-only item (`icon` without children, usually
  `Home`) an `aria-label` ("Forside"). Because the icon is hidden from screen readers.
- **breadcrumbs-collapse** SHOULD Set `maxVisibleItems` (3 or 4) on deep trails, especially on
  mobile. Because the list wraps instead of scrolling; the collapsed middle opens with "…".
- **breadcrumbs-one-style** SHOULD Use one `type` and `divider` across a product. Because the trail
  repeats on every page and mixed styles look like different components.
- **breadcrumbs-short-labels** SHOULD Use short section names ("Børs", not "Børs og markeder i
  dag"); the current item can be the page's short title. Because labels never truncate.

## Props

| Prop              | Values                                                   | Default   |
| :---------------- | :------------------------------------------------------- | :-------- |
| `type`            | `text` · `text-line` (top and bottom borders) · `button` | `text`    |
| `divider`         | `chevron` · `slash`                                      | `chevron` |
| `maxVisibleItems` | number ≥ 2: keeps the first `n − 1` and the last item    |           |
| `className`       | classes on the wrapping `nav` (layout)                   |           |

`Breadcrumbs.Item`: `href`, `icon` (component or element), `children`, `aria-label`, plus React
Aria `Link` props. Mobile and desktop differ only in spacing, handled with `md:`.

## Accessibility

- Renders `<nav aria-label="Breadcrumbs">` around an ordered React Aria list. The nav label and
  the "…" button label ("Show all breadcrumbs") are English in code.
- Focus rings are built in; the current item is not a link target for keyboard users.

## Example

```tsx
<Breadcrumbs maxVisibleItems={3}>
    <Breadcrumbs.Item href="/" icon={Home} aria-label="Forside" />
    <Breadcrumbs.Item href="/bors">Børs</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/bors/aksjer">Aksjer</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/bors/aksjer/EQNR">Equinor</Breadcrumbs.Item>
</Breadcrumbs>
```

## See also

Storybook: Application / Breadcrumbs (Playground, Variants). Related: [site-header](site-header.md),
[tabs](tabs.md).
