# Slider

A value, or a range with two thumbs, chosen by dragging along a track: risikoprofil, a price
filter, the share of savings in equities. React Aria `Slider`. Figma: Slider.

```ts
import { Slider } from "fa-design-system/components/base/slider/slider";
```

## Use when

- An approximate value within known bounds, where seeing the position matters more than the
  exact number (aksjeandel 0–100 %, risiko 1–7).
- A min–max filter (pris fra – til): pass an array with two values.

## Use something else when

- The exact number matters (beløp, antall aksjer): `InputNumber`, or both together.
- A handful of named steps (Lav / Middels / Høy): `RadioGroup` or `ButtonGroup`.

## Rules

- **slider-name** MUST Pass `aria-label`, and show a visible label as text above the slider.
  Because `Slider` has no `label` prop (it renders an empty React Aria label).
- **slider-formatter** MUST Pass `labelFormatter` whenever the value isn't a 0–100 percentage.
  Because the default output divides the value by 100 and formats it as a percent, so
  `formatOptions` alone shows wrong numbers.
- **slider-show-value** SHOULD Show the value with `labelPosition="bottom"` or `"top-floating"`
  when the number matters to the decision. The default `"default"` hides it.
- **slider-bounds** MUST Set `minValue`, `maxValue` and `step` to the real domain (defaults 0, 100
  and 1). Because keyboard steps and the track percentage come from them.
- **slider-commit** SHOULD Fetch or filter in `onChangeEnd`, not `onChange`. Because `onChange`
  fires on every pixel of a drag.

## Props

| Prop                       | Values                                         | Default     |
| :------------------------- | :--------------------------------------------- | :---------- |
| `value` / `defaultValue`   | number, or `[min, max]` for a range            |             |
| `minValue` / `maxValue`    | number                                         | `0` / `100` |
| `step`                     | number                                         | `1`         |
| `labelPosition`            | `default` (hidden) · `bottom` · `top-floating` | `default`   |
| `labelFormatter`           | `(value: number) => string`                    |             |
| `formatOptions`            | `Intl.NumberFormatOptions`                     | percent     |
| `onChange` / `onChangeEnd` | `(value: number \| number[]) => void`          |             |
| `isDisabled`               | boolean                                        |             |

Plus React Aria `Slider` props.

## Notes

- `orientation` is not styled; keep the slider horizontal.

## Accessibility

- Arrow keys move one `step`, Page Up/Down larger steps, Home/End to the bounds; each thumb is
  focusable with the focus ring.
- The value is announced from `formatOptions` and the visible output from `labelFormatter`; keep
  them saying the same thing.

## Example

```tsx
const formatNok = (value: number) => `${formatNumber(value, { decimals: 0 })} kr`; // formatNumber: fa-design-system/utils/format-number

<div className="flex flex-col gap-3">
    <p className="text-sm font-medium text-secondary">Kurs</p>
    <Slider
        aria-label="Kurs"
        minValue={0}
        maxValue={500}
        step={5}
        defaultValue={[120, 340]}
        labelPosition="bottom"
        formatOptions={{ style: "currency", currency: "NOK", maximumFractionDigits: 0 }}
        labelFormatter={formatNok}
        onChangeEnd={(range) => filterByPrice(range as number[])}
    />
</div>

<Slider aria-label="Aksjeandel" defaultValue={60} labelPosition="top-floating" />
```

## See also

Storybook: Base components / Sliders. Related: [input-variants](input-variants.md)
(`InputNumber`), [radio](radio.md).
