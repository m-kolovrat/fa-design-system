# Toggle

An on/off switch for a setting that takes effect at once (kursvarsler, mørk modus, autoplay av
video). React Aria `Switch`. Figma: Toggle.

```ts
import { Toggle } from "fa-design-system/components/base/toggle/toggle";
```

## Use when

- Turning a setting on or off saves or applies immediately, with no submit button.

## Use something else when

- The choice is part of a form that is submitted later, or is a consent: `Checkbox`.
- Picking between two named options that aren't on/off (Liste / Rutenett): `ButtonGroup`.
- Starting an action ("Slett varsel"): `Button`.

## Rules

- **toggle-immediate** MUST Apply the change in `onChange` (optimistically) and confirm or roll
  back. Never pair a toggle with a "Lagre" button. Because a switch promises an instant effect.
- **toggle-label** MUST Pass `label`, or `aria-label` when the label is elsewhere (a table cell).
  Name the setting, not the state ("Kursvarsler for EQNR", not "På").
- **toggle-state-props** MUST Use `isSelected` / `defaultSelected` / `onChange(isSelected)` and
  `isDisabled`; never restyle the track.
- **toggle-feedback** SHOULD Confirm settings that have effects elsewhere with a `notify()` toast
  ("Kursvarsel slått på"), and show failures the same way after rolling back.
- **toggle-hint** SHOULD Use `hint` to say what changes ("Du får push-varsel når kursen endrer seg
  mer enn 5 %").
- **toggle-base-visual** NEVER Use `ToggleBase` as a control on its own. It is the visual switch
  only, used inside `Dropdown` items (`selectionIndicator="toggle"`).
- **toggle-motion** SHOULD Leave the knob's slide as it is. It moves with the motion tokens; that is
  movement, not a hover, so it keeps its duration.
- **toggle-slim** SHOULD Keep `slim` for compact spots such as menu rows; use the default switch in
  settings pages.

## Props

| Prop                             | Values                                | Default |
| :------------------------------- | :------------------------------------ | :------ |
| `size`                           | `sm` (36×20) · `md` (44×24)           | `sm`    |
| `slim`                           | boolean: thinner track, bordered knob |         |
| `label`                          | string                                |         |
| `hint`                           | ReactNode                             |         |
| `isSelected` / `defaultSelected` | boolean                               |         |
| `onChange`                       | `(isSelected: boolean) => void`       |         |
| `isDisabled`, `isReadOnly`       | boolean (disabled is `opacity-50`)    |         |
| `name`, `value`                  | string, for form data                 |         |

Plus React Aria `Switch` props. `ToggleBase` (the switch alone): `size`, `slim`, `isSelected`,
`isDisabled`, `isHovered`, `isFocusVisible`, `className`.

## Accessibility

- It's a native checkbox with `role="switch"`; Space toggles and screen readers announce on/off.
- The whole row (switch, label, hint) is the click target; links in `hint` stay clickable.

## Example

```tsx
const [alertsOn, setAlertsOn] = useState(true);

<Toggle
    size="md"
    label="Kursvarsler for Equinor (EQNR)"
    hint="Du får push-varsel når kursen endrer seg mer enn 5 % i løpet av en dag."
    isSelected={alertsOn}
    onChange={(next) => {
        setAlertsOn(next);
        saveAlertSetting("EQNR", next).catch(() => {
            setAlertsOn(!next);
            notify({ type: "error", title: "Kunne ikke lagre varselet. Prøv igjen." });
        });
    }}
/>;
```

## See also

Storybook: Base components / Toggles. Related: [checkbox](checkbox.md),
[button-group](button-group.md), [notification](notification.md).
