# Charts

Line, area, bar, pie, radar and radial (gauge) charts. There are **no chart components**: each
chart is a Recharts 3 composition styled with tokens, plus three shared helpers from `charts-base`.
The Storybook stories are the patterns; copy the one closest to your need. Figma: Line and bar chart
(one component there, separate stories here), Chart marker (= `ChartTooltipContent`), plus the pie,
radar, gauge and progress circle charts.

```ts
import { ChartActiveDot, ChartLegendContent, ChartTooltipContent, selectEvenlySpacedItems } from "fa-design-system/components/application/charts/charts-base";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Pie,
    PieChart,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
```

Patterns (Storybook, **Application / Charts**): Line chart 01–04 (area and line), Bar chart, Bar
chart 02 and 03 (stacked, and combined bar + line), Pie chart xxs–lg (donut, 120–280px), Radar
chart, Activity gauge xs–lg (concentric `RadialBar` rings with a center label), Progress circle
xs–lg (single `RadialBar` ring). Each story's source is its pattern; the example below is the line
chart.

## Use when

- A price or index over time (EQNR last 12 months, OSEBX intraday): area or line chart.
- Comparing amounts across categories or periods (quarterly revenue, dividends per year): bar.
- Parts of a whole with at most five slices (portfolio by sector): pie/donut.
- Up to three values against a target in a card: activity gauge.

## Use something else when

- One value against a target with no chart around it: `ProgressBar` / `ProgressBarCircle`
  ([progress](progress.md)).
- Exact values the reader will look up or compare row by row: [table](table.md).
- A single change figure: a colored span ("Change value" in `page-patterns.md`), not a chart or a badge.

## How color works

Every series is drawn in `currentColor`, and its color is a **`text-utility-*` class** on the
series: `className="text-utility-brand-600"` with `stroke="currentColor"` / `fill="currentColor"`
on `Area`, `Bar`, `Line`; for `Pie` and `RadialBar`, a `className` on each data item
(`{ name, value, className }`). `ChartLegendContent` paints each legend dot with `bg-current` and
that same `className`, so legend and series always match. Utility tokens switch in dark mode.

- Series: brand ramp first (`text-utility-brand-600`, `-400`, `-700`, `-500`, `-300`); a neutral
  remainder ("Annet") `text-utility-gray-200`. The radar demo adds `text-utility-pink-500` and
  `text-utility-blue-light-500` for clearly separate series.
- Grid: `<CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />`.
- Axis text: `className="text-tertiary [&_.recharts-text]:text-xs"` on the chart, `fill="currentColor"`
  on the axes, `axisLine={false} tickLine={false}`.
- Hover: cursor `stroke-utility-brand-600 stroke-2`; active dot `fill-bg-primary
stroke-utility-brand-600 stroke-2` (or `activeDot={<ChartActiveDot />}`); gauge track
  `background={{ className: "fill-utility-gray-100" }}`.

## Rules

- **charts-token-colors** MUST Color series only with `text-utility-*` classes and `currentColor`.
  Never pass a hex value or `var(--…)` to `stroke` / `fill`. Because the classes follow dark mode and
  the legend reads them.
- **charts-shared-parts** MUST Use `content={<ChartTooltipContent />}` on `Tooltip` (add
  `isPieChart` / `isRadialChart` for those) and `content={<ChartLegendContent />}` on `Legend`.
  Because they are Figma's chart marker and legend.
- **charts-norwegian-format** MUST Format ticks and tooltips Norwegian style: numbers with the `nb`
  helper ("Change value" in `page-patterns.md`: dot thousands, comma decimals), dates with
  `toLocaleDateString("nb-NO", …)`. Never `toLocaleString` for numbers (it puts a space between
  thousands). Because the patterns use the browser locale and English placeholder labels.
- **charts-direction-color** SHOULD Use `text-utility-success-600` / `text-utility-error-600` only
  when a series means up or down (a single stock vs. its previous close), never for categories.
- **charts-responsive** MUST Wrap in `ResponsiveContainer initialDimension={{ width: 1, height: 1 }}`
  inside an element with a fixed height (`h-60`). Use `useBreakpoint("lg")` to drop axis labels and
  move the legend on mobile, and `selectEvenlySpacedItems` to thin out x ticks.
- **charts-no-animation** SHOULD Keep `isAnimationActive={false}` as the patterns do.
- **charts-period-below** MUST Put the period selector directly under the chart it controls, full
  width of the chart, never above it, beside it or in the card header. When a chart has periods,
  every chart on every page does it the same way (see [period-selector](period-selector.md)).
  Because one fixed place lets readers find the periods without looking, and keeps the header free
  for the title and actions.
- **charts-text-alternative** MUST Give each chart a heading and a one-line text summary ("EQNR er
  opp 12,4% siste 12 måneder"), or a table toggle. Because the SVG isn't readable by screen readers.

## Props

| Export                    | Props                                                                                                                                                                                                                                                                             |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ChartLegendContent`      | `reversed` (list the series in reverse, e.g. to match a stacked bar from the top), `className` (layout classes only); `payload`, `align`, `layout` are filled in by Recharts' `Legend`                                                                                            |
| `ChartTooltipContent`     | `isRadialChart` (gauge: the title is the value, the subtitle the item's `name`), `isPieChart` (same for a slice); `active`, `payload`, `label`, `formatter`, `labelFormatter` are filled in by Recharts' `Tooltip`: put `formatter` / `labelFormatter` on the `Tooltip`, not here |
| `ChartActiveDot`          | `cx`, `cy` (set by Recharts); a 12px dot, `fill-bg-primary stroke-utility-brand-600`                                                                                                                                                                                              |
| `selectEvenlySpacedItems` | `(dataArray, count)` → `count` evenly spaced items of the array, for x ticks                                                                                                                                                                                                      |

## Example

```tsx
<div className="flex h-60 flex-col gap-2">
    <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
        <AreaChart data={eqnr} className="text-tertiary [&_.recharts-text]:text-xs">
            <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
            <XAxis
                dataKey="date"
                fill="currentColor"
                axisLine={false}
                tickLine={false}
                tickFormatter={(d) => new Date(d).toLocaleDateString("nb-NO", { month: "short" })}
            />
            <YAxis fill="currentColor" axisLine={false} tickLine={false} tickFormatter={(v) => nb(Number(v), { decimals: 0 })} />
            <Tooltip
                content={<ChartTooltipContent />}
                formatter={(v) => `${nb(Number(v))} kr`}
                labelFormatter={(d) => new Date(d as Date).toLocaleDateString("nb-NO", { day: "numeric", month: "long" })}
                cursor={{ className: "stroke-utility-brand-600 stroke-2" }}
            />
            <Area
                dataKey="close"
                name="Equinor (EQNR)"
                type="monotone"
                isAnimationActive={false}
                className="text-utility-brand-600"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
            />
        </AreaChart>
    </ResponsiveContainer>
</div>
```

## See also

Storybook: Application / Charts. Related: [progress](progress.md), [table](table.md); [period
selector](period-selector.md) (always under the chart).
