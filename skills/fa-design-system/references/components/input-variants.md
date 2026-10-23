# Input variants

Specialised single-line fields that share `Input`'s look, sizes and `label` / `hint` / `isInvalid`
props. Figma: Input date, Input number, Input file, Input tags outer (Input field for tags inside).

```ts
import { InputDate } from "fa-design-system/components/base/input/input-date";
import { InputFile } from "fa-design-system/components/base/input/input-file";
import { InputNumber } from "fa-design-system/components/base/input/input-number";
import { PaymentInput } from "fa-design-system/components/base/input/input-payment";
import { InputTags } from "fa-design-system/components/base/input/input-tags";
import { InputTagsOuter } from "fa-design-system/components/base/input/input-tags-outer";
```

## Choose

- **`InputDate`**: a typed date in segments (dd.mm.åååå with a Norwegian locale). React Aria
  `DateField`. Use `DatePicker` instead when picking from a calendar matters more than typing.
- **`InputNumber`**: a number with stepper buttons and locale formatting (antall aksjer, beløp,
  prosent). React Aria `NumberField`. `orientation="vertical"` (chevrons on the right, default)
  or `"horizontal"` (− and + on each side).
- **`InputFile`**: one compact field with a file button. Use `FileUpload.DropZone` for a drop area
  with progress, `FileTrigger` for a plain button.
- **`InputTags`**: free-text tags inside the field (Enter adds; Backspace on an empty field moves
  to the last tag). **`InputTagsOuter`**: the same, with the tags listed below the field.
- **`PaymentInput`**: a card number, grouped in fours, with the card brand icon detected.

## Rules

- **variants-date-value** MUST Pass `InputDate` a `DateValue` from `@internationalized/date`
  (`parseDate("2026-10-23")`, `today(getLocalTimeZone())`), never a `Date` or string. Because
  React Aria date fields only understand `DateValue`.
- **variants-number-format** SHOULD Format numbers with `formatOptions`
  (`{ style: "currency", currency: "NOK" }`, `{ style: "percent" }`) instead of typing units into
  the label. Because the field then parses and shows `1 234,50 kr` in the reader's locale.
- **variants-number-bounds** SHOULD Set `minValue`, `maxValue` and `step` (e.g. `minValue={1}` for
  antall aksjer). Because steppers and keyboard arrows respect them.
- **variants-file-norwegian** MUST Pass `buttonText` and `placeholder` to `InputFile` ("Last opp",
  "Velg en fil"). Because the defaults are English ("Upload", "Choose a file").
- **variants-file-size** SHOULD Set `size` on `InputFile` to match the other fields in the form.
  Because its default is `sm`, while the other inputs default to `md`.
- **variants-tags-validate** SHOULD Use `validate`, `maxTags` and `allowDuplicates` to keep tag
  lists clean (e.g. only valid tickers), rather than filtering in `onChange`.
- **variants-payment-value** MUST Read `PaymentInput`'s `onChange` value as digits only; the
  spaces are display formatting.

## Props

Shared: `size` (`sm` · `md` · `lg`), `label`, `hint`, `isRequired`, `hideRequiredIndicator`,
`isInvalid`, `isDisabled`. Size defaults to `md`, except `InputFile` (`sm`).

| Component                      | Own props                                                                                                                                                 |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `InputDate`                    | `value` / `defaultValue` / `onChange` (`DateValue`), `minValue`, `maxValue`, `granularity`, `icon`, `tooltip`                                             |
| `InputNumber`                  | `value` / `defaultValue` / `onChange` (number), `minValue`, `maxValue`, `step`, `formatOptions`, `orientation` (`vertical` · `horizontal`), `placeholder` |
| `InputFile`                    | `acceptedFileTypes` (string[]), `allowsMultiple`, `isLoading`, `onChange(files: FileList \| null)`, `buttonText`, `placeholder`                           |
| `InputTags` / `InputTagsOuter` | `value` / `defaultValue` / `onChange` (string[]), `onTagAdded`, `onTagRemoved`, `validate`, `maxTags`, `allowDuplicates`, `placeholder`, `tooltip`        |
| `PaymentInput`                 | `Input` props; `onChange(digits: string)`                                                                                                                 |

## Accessibility

- Date segments are spinbuttons: arrow keys change each part, typing fills it.
- `InputNumber` steppers are labelled by React Aria and follow `minValue` / `maxValue`.
- Known gap: `InputTags` and `InputTagsOuter` show the `label` but don't link it to the text
  field. Keep the label visible and say what to type in `placeholder`.

## Example

```tsx
<InputNumber
    label="Antall aksjer"
    minValue={1}
    step={10}
    defaultValue={100}
    hint="Kjøp av DNB Bank (DNB) på Oslo Børs."
/>

<InputNumber
    label="Månedlig sparebeløp"
    formatOptions={{ style: "currency", currency: "NOK" }}
    defaultValue={1500}
    orientation="horizontal"
/>

<InputDate label="Oppgjørsdato" defaultValue={parseDate("2026-10-27")} />

<InputTagsOuter
    label="Selskaper du følger"
    placeholder="Skriv en ticker og trykk Enter"
    defaultValue={["EQNR", "NHY", "MOWI"]}
    validate={(ticker) => /^[a-z0-9.]{2,8}$/i.test(ticker)}
/>

<InputFile label="Vedlegg" size="md" buttonText="Last opp" placeholder="Velg en fil" acceptedFileTypes={["application/pdf"]} />
```

## See also

Storybook: Base components / Inputs. Related: [input](input.md), [date-picker](date-picker.md),
[file-upload](file-upload.md), [tags](tags.md).
