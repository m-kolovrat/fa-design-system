# Period selector

Chart periods (1D … 10Y) with an optional change under each label, placed directly under the chart
it controls. Figma: Period selector (Layout = Fit / Scroll, Change), \_Period item (State = Default /
Hover / Current / Focus). The Figma components are still drafts on the "Test" page.

```ts
import { PERIODS, type Period, PeriodSelector } from "fa-design-system/components/application/period-selector/period-selector";
```

## Use when

- A chart can show different time spans: an instrument price, a portfolio value, an index.

## Use something else when

- Switching a view or filter that isn't a time span (Liste / Kort, NOK / USD): `ButtonGroup`.
- Panels of different content: `Tabs`.
- A free date range ("1. okt. – 23. okt. 2026"): `DateRangePicker` (see [date-picker](date-picker.md)).

## Rules

- **period-selector-under-chart** MUST Place it directly under the chart it controls, as wide as
  the chart, with `mt-4` between them. Never above the chart, beside it or in the card header (rule
  `charts-period-below` in [charts](charts.md)). Because one fixed place lets readers find the
  periods without looking, and keeps the header free for the title and actions.
- **period-selector-fixed-set** MUST Use only the ids in `PERIODS` (1D, 5D, 1M, 3M, 6M, YTD, 1Y, 3Y,
  5Y, 10Y), and pass only the periods the chart has data for. Because the labels and their order are
  the same on every chart; the component sorts them for you and never renames them.
- **period-selector-controlled** SHOULD Control it with `selectedPeriod` and `onPeriodChange`, and
  load the chart data from the selected period. Because the chart and the selector must always agree.
- **period-selector-change** SHOULD Pass `change` (percent) only when every shown period has one.
  Because a row where some periods show a change and others don't reads as missing data.
- **period-selector-no-select** NEVER Swap it for a `Select` or wrap it on narrow screens. Because
  the row scrolls sideways on its own and keeps the selected period in view.

## Props

| Prop                    | Values                              | Default     |
| :---------------------- | :---------------------------------- | :---------- |
| `periods`               | `{ id: Period; change?: number }[]` | required    |
| `layout`                | `fit` · `scroll`                    | `fit`       |
| `selectedPeriod`        | `Period` (controlled)               |             |
| `defaultSelectedPeriod` | `Period`                            |             |
| `onPeriodChange`        | `(period: Period) => void`          |             |
| `aria-label`            | string                              | `"Periode"` |

## Notes

- **`layout="fit"`:** the periods share the width. When they don't fit, they keep their natural width
  and the row scrolls sideways.
- **`layout="scroll"`:** natural width, left aligned; for mobile, or wherever many periods show.
- **`change`:** the change over the period in percent (`0.42` shows `+0,42 %`), colored green, red,
  or gray for 0, in Norwegian format (same as "Change value" in `page-patterns.md`).

States follow Figma's \_Period item: no fill and `text-quaternary` by default, `bg-primary_hover` on
hover, `bg-brand-primary_alt` with `text-brand-secondary` when selected (like a `button-brand` tab),
and only the focus ring on keyboard focus.

## Accessibility

- It's a radio group named "Periode"; arrow keys move between periods, Space or Enter selects.
- Each period's accessible name includes its change ("5D −1,10 %").
- The chart above still needs a heading and a one-line summary (`charts-text-alternative`).

## Example

```tsx
const [period, setPeriod] = useState<Period>("1Y");

<section className="rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5">
    <h2 className="text-lg font-semibold text-primary">Equinor (EQNR)</h2>
    <p className="text-sm text-tertiary">Kursutvikling {period}: +18,90 %</p>
    <div className="mt-4 h-56">{/* the chart for `period` */}</div>
    <PeriodSelector
        className="mt-4"
        periods={[
            { id: "1D", change: 0.42 },
            { id: "1M", change: 3.25 },
            { id: "YTD", change: 12.4 },
            { id: "1Y", change: 18.9 },
            { id: "5Y", change: 88.6 },
        ]}
        selectedPeriod={period}
        onPeriodChange={setPeriod}
    />
</section>;
```

## See also

Storybook: Application / Period selector. Related: [charts](charts.md), [button-group](button-group.md),
[date-picker](date-picker.md).
