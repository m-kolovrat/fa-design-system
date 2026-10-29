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
- Fixed periods on a chart (1D / 1M / 1Y): [period selector](period-selector.md).

## Rules

- **date-picker-value** MUST Pass values as `DateValue` from `@internationalized/date`
  (`today(getLocalTimeZone())`, `parseDate("2026-10-23")`); a range is `{ start, end }`. Because
  React Aria date components don't accept `Date` or strings.
- **date-picker-name** MUST Pass a Norwegian `aria-label` ("Velg dato", "Velg periode"). Because
  the default is English ("Date picker", "Date range picker").
- **date-picker-value-shown** SHOULD Always pass `value` or `defaultValue`. Because the empty
  trigger text is hard-coded English: "Select date" on `DatePicker`, "Select dates" (placeholder
  color) on `DateRangePicker`. A range with only one end set shows "Select date" for the missing
  end.
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
| `highlightedDates`       | `DateValue[]`: a dot under each date            | today   |

Plus React Aria `DatePicker` / `DateRangePicker` props. Both pickers pass `highlightedDates` on to
their calendar; today always gets a dot as well. The picker's calendar takes no other options (no
`showOutOfRangeDates`).

## Notes

- `DateRangePicker` shows presets (today, yesterday, this/last week, month, year, all time from
  1 Jan 2000) in a side column from `lg` up; below `md` it shows Last week / Last month / Last year
  above the calendar instead, and between `md` and `lg` no presets.
- `Calendar` shows days outside the month greyed out; `RangeCalendar` hides them unless
  `showOutOfRangeDates`.
- `range-calendar` also exports `RangePresetButton` (`value: { start, end }`, children as the
  label, button attributes): a preset that selects its range and shows as selected while the
  calendar's value matches; `DateRangePicker`'s desktop preset column is made of them. And
  `RangeCalendarContextProvider`: wrap it around a `RangeCalendar` and your own `RangePresetButton`s
  so they share the selection (`RangeCalendar` wraps itself in one when none is above it).

Standalone calendars:

| Prop                   | Component       | Values                                                                 | Default                 |
| :--------------------- | :-------------- | :--------------------------------------------------------------------- | :---------------------- |
| `highlightedDates`     | both            | `DateValue[]`: a dot under each date (today always gets one)           |                         |
| `children`             | `Calendar`      | replaces the date input + "Today" row between header and grid          | input + "Today"         |
| `presets`              | `RangeCalendar` | `Record<string, { label, value: { start, end } }>`                     |                         |
| `showPresetsOnDesktop` | `RangeCalendar` | boolean; presets always show below `md`                                | `false`                 |
| `showOutOfRangeDates`  | `RangeCalendar` | boolean; show the greyed days of the previous/next month (both months) | `false` (hidden)        |
| `visibleDuration`      | `RangeCalendar` | `{ months }`; only `months` is read                                    | 2 from `md` up, 1 below |

## Accessibility

- The calendar grid is fully keyboard-operable (arrows, Page Up/Down for months, Enter to pick).
- Known gap: all built-in texts are hard-coded English: the footer buttons ("Cancel", "Apply"),
  the range presets ("Today", "Last week" …), `Calendar`'s "Today" button and its date input's
  `aria-label` ("Date"), and the empty trigger text ("Select date", "Select dates").

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
