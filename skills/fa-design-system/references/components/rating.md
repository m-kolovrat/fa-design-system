# Rating

Read-only star ratings with partial stars (`RatingStars`), and a laurel-wreath award badge with
stars and two lines of text (`RatingBadge`). Figma: Star icon (`RatingStars`); the rating badge is
code-only.

```ts
import { RatingBadge } from "fa-design-system/components/foundations/rating-badge";
import { RatingStars, StarIcon, getStarProgress } from "fa-design-system/components/foundations/rating-stars";
```

## Use when

- Showing a score that already exists: a car test in Motor ("4,5 av 5"), a fund rating, a product
  review.
- A marketing block quotes an award or an average review: `RatingBadge`.

## Use something else when

- The reader should give a rating: there is **no rating input**. Use a `RadioGroup` (1–5) or ask
  before building one.
- A numeric score or rank with no stars: plain text, or a `Badge`.
- A favorite or bookmark toggle: `ButtonUtility` with the `Star` / `StarFilled` icon from `fa-icons`.

## Rules

- **rating-text-value** MUST Print the value as text next to the stars ("4,5 av 5", "4,2 (1 280
  vurderinger)"), or give the wrapper `role="img"` and an `aria-label`. Because the stars are bare
  SVGs with no accessible name; a screen reader gets nothing.
- **rating-pass-value** MUST Always pass `rating`. Because it defaults to `5`, so a missing value
  shows a perfect score.
- **rating-max** SHOULD Keep `stars={5}` (the default). Change it only when the scale really is
  different, and then say the scale in text ("8 av 10").
- **rating-badge-copy** MUST Pass `title` and `subtitle` to `RatingBadge`. Because the defaults are
  English placeholder text ("Best Design Tool", "2,000+ reviews").
- **rating-badge-theme** MUST Use `theme="light"` only on a dark or brand background (it turns the
  wreath and text white, using the `_on-brand` text tokens), and the default `theme="dark"` on
  light backgrounds. Because the name refers to the content color, not the background.
- **rating-no-recolor** NEVER Recolor stars with `starClassName`; use it only for size (`size-4`).
  Because the star yellow and empty-star fill are fixed to match Figma's star icon.

## Props

`RatingStars`

| Prop            | Values                                                  | Default |
| :-------------- | :------------------------------------------------------ | :------ |
| `rating`        | number, decimals give partial stars (clamped 0…`stars`) | `5`     |
| `stars`         | number of stars                                         | `5`     |
| `starClassName` | classes on each star (size: `size-4`; default `size-5`) |         |

Plus `div` attributes (`className` for gap, `aria-label`, `role`).

`RatingBadge`: `rating`, `title`, `subtitle`, `theme` `light` · `dark` (default `dark`), plus `div`
attributes. Stars are `size-4`.

`StarIcon` (`progress` 0–100) and `getStarProgress(index, rating, max)` are the building blocks.

## Accessibility

- Not interactive and not focusable.
- Keep the text value visible; partial stars are hard to read precisely for everyone.

## Example

```tsx
<div className="flex items-center gap-2">
    <RatingStars rating={4.5} className="gap-0.5" starClassName="size-4" aria-hidden />
    <span className="text-sm font-medium text-secondary">4,5 av 5</span>
    <span className="text-sm text-tertiary">· Motor testet Volvo EX30</span>
</div>

<section className="bg-brand-section px-4 py-12">
    <RatingBadge theme="light" rating={5} title="Årets bilmagasin" subtitle="Kåret av leserne 2026" />
</section>
```

## Figma parity

`RatingBadge` is code-only (with the QR code and play button, listed in `docs/figma-parity.md` §3 as
small marketing helpers: accept as code-only or remove). Use it only when asked.

## See also

Storybook: not shown in Storybook yet. Related: [badge](badge.md), [radio](radio.md).
