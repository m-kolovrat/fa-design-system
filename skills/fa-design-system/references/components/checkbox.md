# Checkbox

An on/off choice that is part of a form and takes effect when the form is submitted (godta
vilkår, velg nyhetsbrev). React Aria `Checkbox`. Figma: Checkbox (Type = Checkbox).

```ts
import { Checkbox } from "fa-design-system/components/base/checkbox/checkbox";
```

## Use when

- One yes/no answer in a form ("Jeg godtar abonnementsvilkårene").
- Several independent options where any number can be picked (which newsletters to receive).
- Selecting rows in a table (the `Table` uses it already).

## Use something else when

- The setting applies at once, without a submit (varsler på/av): `Toggle`.
- Exactly one option from a group: `RadioGroup`.
- A choice that needs a card with description or price: `RadioCardGroup` (`type="checkbox"` is
  still single-select).
- Picking several values from a long list: `MultiSelect`.

## Rules

- **checkbox-state-props** MUST Use `isSelected` / `defaultSelected` / `onChange(isSelected)` and
  `isIndeterminate` for a parent of partly selected children. Never draw the check yourself.
- **checkbox-group-label** SHOULD Put a group of related checkboxes under a visible heading, in a
  `flex flex-col gap-3` stack, and give each a `name` and `value`. Because there is no
  `CheckboxGroup` component; the heading tells what the options belong to.
- **checkbox-hint** SHOULD Use `hint` for one line of explanation under the label; links in the
  hint stay clickable without toggling the box.
- **checkbox-required-terms** SHOULD For a required consent, set `isRequired`, and when it's not
  checked on submit set `isInvalid` and explain why in text near it. Because the checkbox has no
  red error style of its own.
- **checkbox-size** SHOULD Use `sm` in forms next to `sm`/`md` inputs; `md` for stand-alone
  consent blocks.

## Props

| Prop                                    | Values                            | Default |
| :-------------------------------------- | :-------------------------------- | :------ |
| `size`                                  | `sm` (16px box) · `md` (20px box) | `sm`    |
| `label`                                 | ReactNode                         |         |
| `hint`                                  | ReactNode, below the label        |         |
| `isSelected` / `defaultSelected`        | boolean                           |         |
| `onChange`                              | `(isSelected: boolean) => void`   |         |
| `isIndeterminate`                       | boolean                           |         |
| `isDisabled`                            | boolean (`opacity-50`)            |         |
| `isRequired`, `isInvalid`, `isReadOnly` | boolean                           |         |
| `name`, `value`                         | string, for form data             |         |

Plus React Aria `Checkbox` props. `CheckboxBase` is the visual box only, for use inside other
components (menus, cards); never as a form control.

## Accessibility

- The whole row (box, label and hint) is the click target and is a native checkbox underneath.
- Space toggles; the focus ring sits on the box.

## Example

```tsx
<div className="flex flex-col gap-3">
    <p className="text-sm font-semibold text-primary">Nyhetsbrev</p>
    <Checkbox name="newsletters" value="morgen" defaultSelected label="Morgenbrevet" hint="Hver hverdag kl. 06.30" />
    <Checkbox name="newsletters" value="bors" label="Børs i dag" hint="Oppsummering etter børsslutt kl. 16.30" />
    <Checkbox name="newsletters" value="kapital" label="Kapital" hint="Ukentlig, fredager" />
</div>

<Checkbox
    isRequired
    name="terms"
    isInvalid={termsError}
    label="Jeg godtar abonnementsvilkårene"
    hint={<a href="/vilkar">Les vilkårene</a>}
/>
```

## See also

Storybook: Base components / Checkboxes. Related: [toggle](toggle.md), [radio](radio.md),
[form](form.md), [select](select.md) (`MultiSelect`).
