# Badge

A short, non-interactive status or label ("Aktiv", "Utbytte", "+2,4 %"). `BadgeGroup` is a
badge plus a message line, for announcements. Figma: Badges/Badge, Badges/Badge group.

```ts
import { BadgeGroup } from "fa-design-system/components/base/badges/badge-groups";
import type { BadgeColors } from "fa-design-system/components/base/badges/badge-types";
import { Badge, BadgeIcon, BadgeWithButton, BadgeWithDot, BadgeWithFlag, BadgeWithIcon, BadgeWithImage } from "fa-design-system/components/base/badges/badges";
```

## Use when

- A row, card or heading needs a status ("Betalt", "Utløpt"), a category or a count.
- A currency or market needs a flag next to its code: `BadgeWithFlag`.
- A small announcement above a heading: `BadgeGroup` ("Nyhet" + "Les om de nye børsvarslene").

## Use something else when

- The person can select, filter by or remove the label as a main interaction: `Tags`.
- The message needs a sentence and an action: `Alert`, or `notify()` for a passing confirmation.
- A number on an avatar or icon ("+5"): `AvatarCount` (see [avatar](avatar.md)).
- It should be clickable: a `Button` (badges have no press handler; only `BadgeWithButton`'s ×).
- A price or value change (`+0,42 %`): a colored span, see "Change value" in `page-patterns.md`.

## Rules

- **badge-color-meaning** MUST Pick the color by meaning: `success` for positive or done, `error`
  for negative or failed, `warning` for attention, `gray` for neutral, `brand` for the publication's
  own labels. The decorative colors (`blue-light`, `purple`, `pink`, `orange-dark`) only for
  categories with no status meaning. Because readers read green and red as up and down.
- **badge-modern-gray** MUST Use `type="modern"` only with `color="gray"` on `Badge`,
  `BadgeWithFlag`, `BadgeWithImage`, `BadgeWithButton` and `BadgeIcon` (the types allow nothing
  else). `BadgeWithDot` and `BadgeWithIcon` take any color with `modern`; it colors only the dot or
  icon. Because the modern surface is always white with a gray ring.
- **badge-not-only-color** MUST Put the meaning in the text, not just the color ("−1,2 %", "Feilet").
  Because color alone fails for color-blind readers and in grayscale.
- **badge-icon-reference** MUST Pass `iconLeading` / `iconTrailing` / `icon` as a component
  reference (`iconLeading={ArrowUp}`), not JSX. Because the badge sizes the icon to `size-3` and
  tints it itself; JSX is not supported here.
- **badge-remove-label** MUST Give `BadgeWithButton` a `buttonLabel` ("Fjern Equinor"). Because the
  × button has no other accessible name.
- **badge-icon-only-label** SHOULD Avoid `BadgeIcon` for meaning on its own; it renders no text and
  takes no `aria-label`. Put a visible or `sr-only` label next to it.
- **badge-flag** MUST Pass `flag` to `BadgeWithFlag`. Because it otherwise shows the Australian
  flag (`"australia-aud"`).
- **badge-short** SHOULD Keep the text to one to three words; badges never wrap (`whitespace-nowrap`).
- **badge-group-static** SHOULD Wrap `BadgeGroup` in a link (`<a>` or a router `Link`) when it should
  navigate. Because it renders a `div` with a pointer cursor and hover fill but no link or button.

## Props

| Prop    | Values                                                                                                | Default      |
| :------ | :---------------------------------------------------------------------------------------------------- | :----------- |
| `type`  | `pill-color` (round) · `color` (square corners) · `modern` (white, shadow)                            | `pill-color` |
| `size`  | `sm` · `md` · `lg`                                                                                    | `md`         |
| `color` | `gray` · `brand` · `error` · `warning` · `success` · `blue-light` · `purple` · `pink` · `orange-dark` | `gray`       |

Per variant: `BadgeWithIcon` `iconLeading` / `iconTrailing` (one of them); `BadgeWithFlag` `flag`
(a `FlagName` such as `"norway-nok"`, default `"australia-aud"`); `BadgeWithImage` `imgSrc`;
`BadgeWithButton` `buttonLabel`, `onButtonClick`, `icon` (default `Close`); `BadgeIcon` `icon`
(required). `className` exists on `Badge`, `BadgeWithDot` and `BadgeWithIcon` only.

`BadgeGroup`: `addonText` (required), `children` (the message), `color` `brand` · `gray` ·
`error` · `warning` · `success` (default `brand`), `theme` `light` · `modern` (default `light`),
`size` `md` · `lg` (default `md`), `align` `leading` · `trailing` (where the addon sits, default
`leading`), `iconTrailing` (default `ArrowRight`).

## Accessibility

- Badges are plain `<span>`s with no role. A status that changes live needs an `aria-live` region
  around it.
- The dot in `BadgeWithDot` is decorative; the text carries the status.
- `BadgeWithImage` gives its image the fixed `alt` "Badge image"; the badge text must say who or
  what it is.

## Example

```tsx
<div className="flex items-center gap-2">
    <span className="text-sm font-semibold text-primary">EQNR</span>
    <BadgeWithFlag flag="norway-nok" size="sm">NOK</BadgeWithFlag>
</div>

<BadgeWithDot color="warning" type="color">Venter på betaling</BadgeWithDot>

<BadgeWithButton color="brand" buttonLabel="Fjern DNB fra listen" onButtonClick={() => remove("DNB")}>
    DNB
</BadgeWithButton>
```

## Figma parity

Figma has 12 badge colors; code has 9 (no Blue, Indigo, Blue gray). Figma's "Orange" is
`orange-dark`. Don't fake the missing colors with `className`.

## See also

Storybook: Base components / Badges, Base components / Badge groups. Related: [tags](tags.md),
[alert](alert.md), [avatar](avatar.md), [flags-logos](flags-logos.md).
