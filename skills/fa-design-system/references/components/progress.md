# Progress

Shows how far along something is: a horizontal bar, a full circle or a half circle (gauge), filled
with the brand color. Figma: Progress indicators/Progress bar, Progress circle.

```ts
import { ProgressBarCircle, ProgressBarHalfCircle } from "fa-design-system/components/base/progress-indicators/progress-circles";
import { ProgressBar, ProgressBarBase } from "fa-design-system/components/base/progress-indicators/progress-indicators";
import { CircleProgressBar } from "fa-design-system/components/base/progress-indicators/simple-circle";
```

## Use when

- A known share of a task is done: an upload, onboarding steps, "3 av 5 kapitler lest".
- A value against a target: savings goal, portfolio share, quota used ("72 % av månedens artikler").
- A single KPI as a ring or gauge in a card: `ProgressBarCircle` / `ProgressBarHalfCircle`.

## Use something else when

- The duration is unknown (loading, saving): `LoadingIndicator`, or `isLoading` on the `Button`.
- Several values compared on rings: activity gauges in [charts](charts.md).
- Numbered steps in a flow: progress steps are **not in code yet** (see Coverage gaps).
- A price change or a ranking: a number with `BadgeWithIcon`, not a bar.

## Rules

- **progress-visible-label** MUST Put a visible text label right before the bar or inside the
  circle (`label`) that says what is measured. Because the components render `role="progressbar"`
  without an accessible name and take no `aria-label`.
- **progress-value-format** SHOULD Format the shown value Norwegian style with `valueFormatter`
  (`"72 %"`, `"3 av 5"`, `"1 250 kr av 5 000 kr"`). Because the default is `"72%"` with no space.
- **progress-text-position** SHOULD Use `labelPosition="right"` in lists and cards, `"bottom"` when
  the bar is full width; the floating positions only where there's room above or below for the
  bubble (it's absolutely positioned and can overlap neighbors).
- **progress-circle-size** SHOULD Use `xxs`, `xs` or `sm` for circles in cards. `md` (≈240px) and
  `lg` (≈280px) are hero sizes.
- **progress-no-recolor** NEVER Recolor the fill with `progressClassName` or `className` to signal
  status (red for "over budget"). Because no status variant exists; report the gap instead.
  `className` is for width (`w-40`).

## Props

`ProgressBar`

| Prop             | Values                                                                    | Default         |
| :--------------- | :------------------------------------------------------------------------ | :-------------- |
| `value`          | number (required)                                                         |                 |
| `min` / `max`    | number                                                                    | `0` / `100`     |
| `labelPosition`  | `right` · `bottom` · `top-floating` · `bottom-floating` (none = bar only) |                 |
| `valueFormatter` | `(value, percentage) => string \| number`                                 | rounded `"NN%"` |
| `className`      | classes on the track (width)                                              |                 |

`ProgressBarBase` is the bare bar (same props, no text).

`ProgressBarCircle` / `ProgressBarHalfCircle`: `value`, `min`, `max`, `valueFormatter`, `label`
(text above the value; below the ring at `xxs`), `size` (required) `xxs` (64px) · `xs` (160) · `sm`
(200) · `md` (240) · `lg` (280). The half circle is the same width and half the height.

`CircleProgressBar` (`simple-circle`): only `value` (0–100).

## Notes

- The bar's track is 8px high and full width; set the width with `className`.
- `CircleProgressBar` is a fixed 64px ring with the percent in the middle.

## Accessibility

- `aria-valuenow`, `aria-valuemin` and `aria-valuemax` are set from the props.
- For a value that updates live (an upload), announce completion in text (`notify()` or a status
  line), not only by the bar reaching 100 %.

## Example

```tsx
const nok = (v: number) => `${v.toLocaleString("nb-NO")} kr`;

<div className="flex flex-col gap-2">
    <p className="text-sm font-medium text-secondary">Sparemål: ny bil</p>
    <ProgressBar
        value={182_500}
        max={250_000}
        labelPosition="right"
        valueFormatter={(v, pct) => `${Math.round(pct)} %`}
    />
    <p className="text-sm text-tertiary">{nok(182_500)} av {nok(250_000)}</p>
</div>

<ProgressBarHalfCircle size="xs" value={7} max={10} label="Artikler lest" valueFormatter={(v) => `${v} av 10`} />
```

## See also

Storybook: Base components / Progress indicators. Related: [loading-indicator](loading-indicator.md),
[charts](charts.md).
