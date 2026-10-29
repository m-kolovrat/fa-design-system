# Input

One line of text: name, e-post, søk, ticker, beløp. `Input` bundles label, field and hint;
`InputGroup` adds addons (prefix text, a native select, a button). Figma: Input field.

```ts
import { HintText } from "fa-design-system/components/base/input/hint-text";
import { Input, InputBase, TextField } from "fa-design-system/components/base/input/input";
import { InputGroup } from "fa-design-system/components/base/input/input-group";
import { Label } from "fa-design-system/components/base/input/label";
```

## Use when

- The person types a single line of free text or a number you don't need steppers for.
- A value needs a fixed unit or prefix around it (`https://`, `kr`, `%`): `InputGroup`.

## Use something else when

- Several lines: `TextArea`. A choice from a list: `Select` or `Select.ComboBox`.
- A date: `InputDate` or `DatePicker`. A number with steppers or locale formatting: `InputNumber`.
- A file, tags, a card number: see [input-variants](input-variants.md). A one-time code: `PinInput`.

## Rules

- **input-no-placeholder-name** MUST Pass `label`, or `aria-label` when the design has no visible
  label. Because without a label `Input` falls back to the placeholder as its accessible name,
  which is easy to miss and often English sample text.
- **input-error-via-hint** MUST Show errors with `isInvalid` plus a `hint` that says what to fix
  ("Skriv inn en gyldig e-postadresse"). Because the red ring, the error icon and the hint color
  all follow `isInvalid`; never add your own error icon.
- **input-onchange-string** MUST Treat `onChange` as `(value: string) => void`. Because it's a React
  Aria `TextField`, not a DOM event handler.
- **input-group-child** MUST Put `InputBase` (not `Input`) inside `InputGroup`, and put `label`,
  `hint`, `isInvalid`, `isRequired` on the `InputGroup`. Because `Input` brings its own label and
  field wrapper.
- **input-type** SHOULD Set `type` (`email`, `tel`, `password`, `search`) and `autoComplete` to
  match the data. `type="password"` adds a show/hide button; the help and error icons are not
  shown for passwords.
- **input-tooltip** SHOULD Use `tooltip` for short help that doesn't fit the hint; it puts a help
  icon at the end of the field (hidden while invalid).
- **input-shortcut** SHOULD Use `shortcut` only on a search field that really has the shortcut
  bound; it's hidden below `md`.

## Props

| Prop                                                                      | Values                                                                        | Default |
| :------------------------------------------------------------------------ | :---------------------------------------------------------------------------- | :------ |
| `size`                                                                    | `sm` (36px) · `md` (40px) · `lg` (44px)                                       | `md`    |
| `label`                                                                   | string                                                                        |         |
| `hint`                                                                    | ReactNode, shown below; red when invalid                                      |         |
| `placeholder`                                                             | string                                                                        |         |
| `icon`                                                                    | icon component, leading                                                       |         |
| `tooltip`                                                                 | string: help icon with tooltip                                                |         |
| `shortcut`                                                                | string, or `true` for "⌘K"                                                    |         |
| `type`                                                                    | input type                                                                    | `text`  |
| `isRequired`                                                              | boolean: adds `*` to the label                                                |         |
| `hideRequiredIndicator`                                                   | boolean                                                                       |         |
| `isInvalid`, `isDisabled`, `isReadOnly`                                   | boolean                                                                       |         |
| `wrapperClassName`, `inputClassName`, `iconClassName`, `tooltipClassName` | string: classes on the box, the `<input>`, the leading icon, the tooltip icon |         |
| `ref`, `groupRef`                                                         | refs to the `<input>` and to the box around it                                |         |

The four `*ClassName` hooks are for layout (padding, width) and the registered header-search
override (`docs/overrides.md`) only; restyling a field through them is forbidden by
**fa-no-invented-variants**.

Plus React Aria `TextField` props: `value`, `defaultValue`, `onChange`, `name`, `validate`,
`maxLength`, `autoComplete`, `inputMode`. `className` sets the outer wrapper (width, grid
placement).

`InputGroup`: `size`, `label`, `hint`, `prefix` (text inside the box), `leadingAddon` /
`trailingAddon` (`InputGroup.Prefix`, a `NativeSelect` or a `Button`), plus `TextField` props.
`InputGroup.Prefix`: `children` (the text), `className`, plus `position` (`leading` · `trailing`)
and `isDisabled`, which are accepted but not needed: the side comes from the `leadingAddon` /
`trailingAddon` slot it sits in and the disabled look from the group.
`InputBase`: `placeholder`, `icon`, `tooltip`, `type`, and the same `*ClassName` / `ref` /
`groupRef` hooks as `Input`. `TextField` (React Aria `TextField` props plus `size` and the
`*ClassName` hooks) is the field wrapper for composing a custom field from `Label`, `InputBase`
and `HintText`: it provides the size context the parts read. `Label` (`isRequired`, `tooltip`,
`tooltipDescription`, `tooltipLabel`: the help icon's accessible name, default the `tooltip` text) and `HintText` (`isInvalid`, `size` `sm` · `md`) are for composing a custom
React Aria field; they wire up through React Aria slots.

## Accessibility

- The hint is linked as the field's description, or as its error message when `isInvalid`.
- The password show/hide button has a fixed English `aria-label`.

## Example

```tsx
<Input
    isRequired
    type="email"
    autoComplete="email"
    icon={Mail}
    label="E-post"
    placeholder="kari.nordmann@firma.no"
    isInvalid={emailError}
    hint={emailError ? "Skriv inn en gyldig e-postadresse" : "Vi sender kvitteringen hit."}
/>

<InputGroup
    label="Kursmål"
    hint="Varsle meg når Equinor (EQNR) når dette nivået."
    trailingAddon={<InputGroup.Prefix>kr</InputGroup.Prefix>}
>
    <InputBase inputMode="decimal" placeholder="312,50" />
</InputGroup>
```

## See also

Storybook: Base components / Inputs. Related: [input-variants](input-variants.md),
[textarea](textarea.md), [select](select.md), [form](form.md).
