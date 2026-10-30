# Num

Any figure on a page: a price, a portfolio value, a change, a count. It formats the number the
Norwegian way. A figure marked `live` also shows that it changed: when a market feed updates it, the
digits from the first one that changed turn green (up) or red (down) for 700 ms, then back. Nothing
moves. It has no style of its own. Font, size, weight and colour come from where it sits. Not in
Figma: the figure is text there, and the highlight is behaviour only code has.

```ts
import { Num } from "fa-design-system/components/base/num/num";
import { useMockTicks } from "fa-design-system/hooks/use-mock-ticks";
import { formatNumber } from "fa-design-system/utils/format-number";
```

## Use when

- Any figure shows: prices, values, changes, counts, key figures, table cells, figures inside a
  sentence. Write `<Num value={x} />` wherever you'd otherwise print the number. Without `live` it
  only formats, so it's safe on every figure.
- Add `live` to a figure that a market feed updates while the reader watches: a live price, a
  portfolio's value, a traded volume.

## Use something else when

- You need the text itself (an `aria-label`, a tooltip string, a chart tick, a `Badge` label):
  `formatNumber(x)` returns the same string without the component.

## Rules

- **num-every-figure** SHOULD Show figures with `Num` (or `formatNumber` where only a string fits)
  rather than `toLocaleString`, `Intl.NumberFormat` or a hand-written formatter. Because there's one
  format (`1.234,50`, `+0,42%`, `-1,10%`).
- **num-live-only-feeds** MUST Set `live` only on a price, value or volume that changes on its own
  because the market moved, while the reader is looking at it. Never on a figure that changed because
  the reader did something (picked a period, an instrument, a tab, a filter, a sort order, a page,
  typed in a field), never on historical or static figures, and never as decoration. When unsure,
  leave it off. Because the colour means "the market just moved this": a flash after a click says
  something false, and flashes everywhere stop meaning anything.
- **num-no-live-on-changes** MUST NOT Set `live` on changes and percentages coloured by their sign
  (the "Change value" pattern), even when they update with the price. Because they're already green
  or red: the highlight would be invisible on some updates and clash on others. The price next to
  them carries the highlight.
- **num-units-outside** MUST Put `%`, `kr` or a currency in `suffix` / `prefix`, not in the
  string. Because the highlight compares the formatted digits only.
- **num-sign-changes** MUST Set `sign` on every change (absolute or relative), so positive changes
  get a `+`.
- **num-fixed-highlight** MUST NOT Restyle or retime the highlight at the call site (no colour
  classes on the digits, no transitions). Because it's the same 700 ms green or red everywhere, and
  instant on and off like every state change in the system.
- **num-mock-in-prototypes** SHOULD Use `useMockTicks(start)` when a prototype should show live
  figures updating, and mark those figures `live`. It's a made-up random walk; never use it for real
  data. A prototype with fixed figures needs neither.
- **num-tick-low** SHOULD Call `useMockTicks` (or hold live data) in the smallest component that
  shows the figure, such as the row or the price header, never at the top of the page. Because every
  tick re-renders the component that holds the value: on the stock-page prototype, a hook at the
  top re-rendered the whole page on every tick (150–300 ms each).

Which figures are `live`, in practice:

| `live`                                                     | Not `live`                                                    |
| :--------------------------------------------------------- | :------------------------------------------------------------ |
| Last price in a quote header, ticker bar, watchlist, table | Changes and percentages next to it (coloured by sign)         |
| Portfolio and holding market value                         | Period returns (1M, 1Y…), key figures (P/E, yield), dividends |
| Traded volume and turnover during the day                  | Trades, transactions, closing prices, anything with a date    |
| Bid / ask, day high / low                                  | Anything the reader changed: period, instrument, filter, sort |

Cost: the highlight is a class switched on and off by a timer, with no animation running. Measured
with 2.000 figures ticking every second, the page stays at 60 frames per second, so it's fine in
dense tables.

## Props

| Prop        | Values                                                          | Default |
| :---------- | :-------------------------------------------------------------- | :------ |
| `value`     | the number (required)                                           |         |
| `decimals`  | digits after the comma: 2 prices and %, 0 counts, up to 4 rates | `2`     |
| `sign`      | `+` on positive values (for changes)                            | `false` |
| `prefix`    | before the digits (`"$"`)                                       |         |
| `suffix`    | after the digits (`"%"`, `" kr"`, `" NOK"`)                     |         |
| `live`      | fed by a market feed: colour the changed digits on each update  | `false` |
| `className` | classes on the wrapping `span` (colour, size, weight)           |         |

`formatNumber(value, { decimals, sign })` takes the same options and returns the string.
`useMockTicks(start, { interval, volatility, seed })` returns a value that moves every `interval`
ms (default 2000) by up to `volatility` of itself (default `0.002`, ±0,2%). Give each figure its own
`seed` so they don't move in step.

## Accessibility

- The figure is plain text, so a screen reader reads it as written ("1.234,50 kr").
- The colour adds to the update; it never carries meaning alone (the direction is in the change
  value next to the price). Nothing moves, so reduced motion needs nothing.
- `Num` doesn't announce updates. A figure that should be read out when it changes needs an
  `aria-live` region around it, and most live prices shouldn't (they'd talk every second).

## Example

```tsx
// Price with its change. The price is live; the change is coloured by sign, so it isn't.
const tone = (v: number) => cx(v > 0 && "text-success-primary", v < 0 && "text-error-primary", v === 0 && "text-tertiary");

<div className="flex flex-col gap-1">
    <Num value={price} suffix=" NOK" live className="text-display-xs font-semibold text-primary" />
    <span className={cx("text-sm font-medium", tone(change))}>
        <Num value={change} sign /> (<Num value={percent} sign suffix="%" />)
    </span>
</div>;

// In a prototype, make it tick:
const price = useMockTicks(287.4);
```

## See also

Storybook: Base components / Num. Related: "Change value" in [page patterns](../page-patterns.md),
[table](table.md), [period selector](period-selector.md).
