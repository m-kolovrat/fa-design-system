# Radio

Exactly one choice from a small set, all visible at once. `RadioGroup` + `RadioButton` for plain
rows; `RadioCardGroup` + `RadioCard` for bordered cards with icon, avatar, payment icon or price.
Figma: Checkbox (Type = Radio) for `RadioButton`; Radio group / Radio group item for the cards.

```ts
import { RadioButton, RadioGroup } from "fa-design-system/components/base/radio-buttons/radio-buttons";
import { RadioCard, RadioCardGroup } from "fa-design-system/components/base/radio-buttons/radio-cards";
```

## Use when

- 2–6 mutually exclusive options the person should compare (leveringsmåte, betalingsfrekvens).
- `RadioCard`: options that need a description, price or icon (abonnement: Digital, Digital +
  papir, Helg).

## Use something else when

- More than about six options: `Select`. Several can be picked: `Checkbox`.
- Switching a view right away (chart period): `ButtonGroup`. A single on/off: `Toggle`.

## Rules

- **radio-group-name** MUST Give the group a visible question: a `Label` from
  `fa-design-system/components/base/input/label` as the group's first child, or `aria-label` when the heading is
  elsewhere. Because neither group has a `label` prop, and options mean little without the
  question.
- **radio-value** MUST Give every `RadioButton` / `RadioCard` a unique `value`, and control the
  group with `value` / `defaultValue` / `onChange(value: string)` on the group, not on items.
- **radio-default** SHOULD Preselect the most common or safest option with `defaultValue`.
  Because a radio group can't be cleared once chosen.
- **radio-size-on-group** MUST Set `size` on the group (`RadioGroup` / `RadioCardGroup`), not on
  items. Because items read it from the group.
- **radio-card-type** SHOULD Use one `type` for all cards in a group. `type="checkbox"` only
  changes the look; the group is still single-select.
- **radio-card-actions** SHOULD Put secondary actions on payment cards in `actions` (link
  buttons); clicks there don't select the card.

## Props

`RadioGroup`: `size` (`sm` · `md`, default `sm`), `value`, `defaultValue`, `onChange`, `name`,
`isDisabled`, `isRequired`, `isInvalid`, `aria-label`, `orientation`.

`RadioButton`: `value` (required), `label`, `hint`, `isDisabled`, `size` (the group's `size` wins).
`RadioButtonBase` is the circle alone.

`RadioCardGroup`: `size` (`sm` · `md`, default `sm`) plus the same React Aria `RadioGroup` props.

`RadioCard`:

| Prop                       | Values                                                                             | Default |
| :------------------------- | :--------------------------------------------------------------------------------- | :------ |
| `type`                     | `radio` · `checkbox` · `icon` · `avatar` · `payment` · `card`                      | `radio` |
| `value`                    | string (required)                                                                  |         |
| `title`                    | ReactNode (required)                                                               |         |
| `subtitle`                 | ReactNode, inline after the title (not `payment` / `card`)                         |         |
| `description`              | ReactNode                                                                          |         |
| `icon`                     | icon component (`icon`, `card`)                                                    |         |
| `avatarSrc`                | string (`avatar`)                                                                  |         |
| `paymentIcon`              | component from `fa-design-system/components/foundations/payment-icons` (`payment`) |         |
| `actions`                  | ReactNode (`payment`)                                                              |         |
| `price`, `period`, `badge` | ReactNode (`card`)                                                                 |         |
| `isDisabled`               | boolean (Figma disabled tokens, not `opacity-50`)                                  |         |

## Notes

- `RadioGroup` stacks vertically with `gap-4`; `orientation` only changes the arrow-key direction,
  it isn't styled.
- `RadioCardGroup` stacks with `gap-3`; pass `className="grid gap-3 md:grid-cols-3"` for a row of
  cards.

## Accessibility

- Arrow keys move the selection within a group; Tab enters and leaves it.
- Disabled `RadioButton`s use `opacity-50`; disabled cards use `bg-disabled_subtle` and
  `ring-disabled`, as in Figma.

## Example

```tsx
<RadioGroup aria-label="Leveringsmåte" defaultValue="digital">
    <RadioButton value="digital" label="Kun digitalt" hint="Les avisen på nett og i appen." />
    <RadioButton value="paper" label="Papiravis levert på døren" hint="Mandag til lørdag før kl. 07.00." />
</RadioGroup>

<RadioCardGroup aria-label="Abonnement" size="md" defaultValue="digital">
    <RadioCard type="card" value="digital" icon={News} title="Digital" price="349 kr" period="per måned" />
    <RadioCard type="card" value="weekend" icon={Notebook} title="Digital + helg" price="449 kr" period="per måned" />
    <RadioCard type="card" value="full" icon={BookOpen} title="Komplett" price="599 kr" period="per måned" />
</RadioCardGroup>
```

## See also

Storybook: Base components / Radio buttons, Base components / Radio groups. Related:
[checkbox](checkbox.md), [select](select.md), [button-group](button-group.md).
