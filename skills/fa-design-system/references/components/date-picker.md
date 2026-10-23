# Date picker

A button that opens a calendar in a popover: `DatePicker` for one date, `DateRangePicker` for a
period with presets. Built on React Aria `DatePicker` / `DateRangePicker`. Figma: Date picker
dropdown (single / dual dates).

```ts
import { Calendar } from "fa-design-system/components/application/date-picker/calendar";
import { DatePicker } from "fa-design-system/components/application/date-picker/date-picker";
import { DateRangePicker } from "fa-design-system/components/application/date-picker/date-range-picker";
import { RangeCalendar } from "fa-design-system/components/application/date-picker/range-calendar";
```

## Use when

- A toolbar or filter bar needs a date or a period: "Vis kurs fra 1. okt. – 23. okt. 2026",
  report date, transaction history range.
- `Calendar` / `RangeCalendar` alone: an always-visible calendar inside a card or modal.

## Use something else when

- A labelled date field in a form (fødselsdato, oppgjørsdato): `InputDate`. `DatePicker` is a
  button with no `label` or `hint`.
- Fixed periods on a chart (1D / 1U / 1Å): `ButtonGroup`.

## Rules

- **date-picker-value** MUST Pass values as `DateValue` from `@internationalized/date`
  (`today(getLocalTimeZone())`, `parseDate("2026-10-23")`); a range is `{ start, end }`. Because
  React Aria date components don't accept `Date` or strings.
- **date-picker-name** MUST Pass a Norwegian `aria-label` ("Velg dato", "Velg periode"). Because
  the default is English ("Date picker").
- **date-picker-value-shown** SHOULD Always pass `value` or `defaultValue`. Because the empty
  trigger text is hard-coded English ("Select date").
- **date-picker-apply** MUST Treat `onChange` as a draft when the Avbryt / Bruk footer matters:
  it fires on every click in the calendar, and Cancel doesn't undo it. Keep the committed value
  separately and commit it in `onApply`, restore it in `onCancel`.
- **date-picker-locale** MUST Render inside a React Aria `I18nProvider` with `locale="nb-NO"`
  (imported as `AriaI18nProvider`) if the app doesn't already set it. Because month names,
  weekday order and the trigger text follow the locale.
- **date-picker-bounds** SHOULD Set `minValue` / `maxValue` (no future dates for price history)
  and `isDateUnavailable` for closed market days if relevant.
- **date-picker-size** SHOULD Match `size` to neighbouring buttons; it is a `Button` size.

## Props

| Prop                     | Values                                          | Default |
| :----------------------- | :---------------------------------------------- | :------ |
| `size`                   | `sm` · `md` · `lg` · `xl` (Button sizes)        | `sm`    |
| `value` / `defaultValue` | `DateValue` (range: `{ start, end }`)           |         |
| `onChange`               | fires on each selection in the calendar         |         |
| `onApply` / `onCancel`   | footer buttons; the popover closes after either |         |
| `minValue` / `maxValue`  | `DateValue`                                     |         |
| `isDateUnavailable`      | `(date) => boolean`                             |         |
| `isDisabled`             | boolean                                         |         |

Plus React Aria `DatePicker` / `DateRangePicker` props. `DateRangePicker` shows presets (today,
yesterday, this/last week, month, year, all time) beside the calendar. `Calendar` takes `highlightedDates` (`DateValue[]`); `RangeCalendar` takes `presets`,
`showPresetsOnDesktop`, `visibleDuration`.

## Accessibility

- The calendar grid is fully keyboard-operable (arrows, Page Up/Down for months, Enter to pick).
- Known gap: the footer buttons ("Cancel", "Apply") and the range presets are hard-coded English.

## Example

```tsx
const [committed, setCommitted] = useState<DateValue>(today(getLocalTimeZone()));
const [draft, setDraft] = useState<DateValue>(committed);

<AriaI18nProvider locale="nb-NO">
    <DatePicker
        aria-label="Velg rapportdato"
        maxValue={today(getLocalTimeZone())}
        value={draft}
        onChange={(date) => date && setDraft(date)}
        onApply={() => setCommitted(draft)}
        onCancel={() => setDraft(committed)}
    />
</AriaI18nProvider>;
```

`DateValue` and `I18nProvider as AriaI18nProvider` come from `react-aria-components`; `today` and
`getLocalTimeZone` from `@internationalized/date`.

## See also

Storybook: Application / Date pickers. Related: [input-variants](input-variants.md) (`InputDate`),
[button-group](button-group.md), [button](button.md).
