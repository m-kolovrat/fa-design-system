# Charts

Line, area, bar, pie, radar and radial (gauge) charts. There are **no chart components**: each
chart is a Recharts 3 composition styled with tokens, plus three shared helpers from `charts-base`.
The demo files are the patterns; copy the one closest to your need. Figma: Line and bar chart (one
component there, separate demos here), Chart marker (= `ChartTooltipContent`), plus the pie, radar,
gauge and progress circle charts.

```ts
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
import { ChartActiveDot, ChartLegendContent, ChartTooltipContent, selectEvenlySpacedItems } from "@/components/application/charts/charts-base";
```

Patterns (`components/application/charts/`): `line-charts.demo.tsx` (area/line, `LineChart01`…),
`bar-charts.demo.tsx` (`BarChart`, stacked and combined bar + line), `pie-charts.demo.tsx` (donut,
`xxs`…`lg` = 120–280px), `radar-charts.demo.tsx`, `activity-gauges.demo.tsx` (concentric
`RadialBar` rings with a center label), `progress-circles.demo.tsx` (single `RadialBar` ring).

## Use when

- A price or index over time (EQNR last 12 months, OSEBX intraday): area or line chart.
- Comparing amounts across categories or periods (quarterly revenue, dividends per year): bar.
- Parts of a whole with at most five slices (portfolio by sector): pie/donut.
- Up to three values against a target in a card: activity gauge.

## Use something else when

- One value against a target with no chart around it: `ProgressBar` / `ProgressBarCircle`
  ([progress](progress.md)).
- Exact values the reader will look up or compare row by row: [table](table.md).
- A single change figure: text plus `BadgeWithIcon` ("+2,4 %").

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
- **charts-norwegian-format** MUST Format ticks and tooltips with `nb-NO`: `formatter` /
  `tickFormatter` / `labelFormatter` with `toLocaleString("nb-NO")` and `toLocaleDateString("nb-NO",
…)`. Because the demos use the browser locale and English placeholder labels.
- **charts-direction-color** SHOULD Use `text-utility-success-600` / `text-utility-error-600` only
  when a series means up or down (a single stock vs. its previous close), never for categories.
- **charts-responsive** MUST Wrap in `ResponsiveContainer initialDimension={{ width: 1, height: 1 }}`
  inside an element with a fixed height (`h-60`). Use `useBreakpoint("lg")` to drop axis labels and
  move the legend on mobile, and `selectEvenlySpacedItems` to thin out x ticks.
- **charts-no-animation** SHOULD Keep `isAnimationActive={false}` as in the demos.
- **charts-text-alternative** MUST Give each chart a heading and a one-line text summary ("EQNR er
  opp 12,4 % siste 12 måneder"), or a table toggle. Because the SVG isn't readable by screen readers.

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
            <YAxis fill="currentColor" axisLine={false} tickLine={false} tickFormatter={(v) => Number(v).toLocaleString("nb-NO")} />
            <Tooltip
                content={<ChartTooltipContent />}
                formatter={(v) => `${Number(v).toLocaleString("nb-NO", { minimumFractionDigits: 2 })} kr`}
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

Storybook: Application / Charts. Related: [progress](progress.md), [button-group](button-group.md)
(period switcher 1D / 1U / 1Å above a chart), [table](table.md).
