# Button group

A row of joined toggle buttons that switches a view or filter of the same content ("Liste" /
"Rutenett", NOK / USD). Figma: Button group (Icon = False / Leading / Trailing / Only /
Dot).

```ts
import { ButtonGroup, ButtonGroupItem } from "fa-design-system/components/base/button-group/button-group";
```

## Use when

- The reader picks one of 2–6 short options that change what the content below shows: list or
  grid, currency.
- A small set of filters can be on at the same time: `selectionMode="multiple"`.

## Use something else when

- The options swap whole panels of different content: `Tabs`.
- The buttons start actions (Lagre, Del, Slett) rather than choose a state: separate `Button`s.
- More than about six options, or long labels: `Select`.
- Chart periods (1D, 1M, 1Y): [period selector](period-selector.md).
- One on/off setting: `Toggle`.

## Rules

- **button-group-label** MUST Give the group an `aria-label` ("Visning", "Valuta"). Because it
  renders as a radio group (single) or toolbar (multiple), and the options mean little without
  the question.
- **button-group-keep-one** SHOULD For a view switcher, control `selectedKeys` with
  `onSelectionChange` and set `disallowEmptySelection`. Because clicking the current option would
  otherwise clear it and leave nothing selected.
- **button-group-ids** MUST Give every `ButtonGroupItem` a unique `id`; selection keys refer to it.
- **button-group-icons** MUST Pass icons through `iconLeading` / `iconTrailing` (component
  reference, or JSX for a `Dot`). Because the item sizes, pads and colors icons only through
  those props.
- **button-group-same-size** NEVER Mix sizes or restyle single items; set `size` once on
  `ButtonGroup`. Because items read their size from the group.
- **button-group-disabled-by-prop** MUST Disable with `isDisabled` (on the group or an item), never
  classes. Because disabled items use Figma's disabled tokens (`bg-disabled_subtle`,
  `text-disabled`), not `opacity-50`.
- **button-group-short-labels** SHOULD Keep labels to one or two words in sentence case ("Liste",
  "NOK", "Tabell").

## Props

`ButtonGroup`:

| Prop                     | Values                                  | Default  |
| :----------------------- | :-------------------------------------- | :------- |
| `size`                   | `sm` (36px) · `md` (40px) · `lg` (44px) | `md`     |
| `selectionMode`          | `single` · `multiple`                   | `single` |
| `selectedKeys`           | iterable of item ids (controlled)       |          |
| `defaultSelectedKeys`    | iterable of item ids                    |          |
| `onSelectionChange`      | `(keys: Set<Key>) => void`              |          |
| `disallowEmptySelection` | boolean                                 |          |
| `isDisabled`             | boolean: disables every item            |          |

`ButtonGroupItem`: `id`, `iconLeading`, `iconTrailing`, `isDisabled`, `children`, plus React Aria
`ToggleButton` props (`onPress`, not `onClick`).

## Accessibility

- Arrow keys move between items; the focus ring is built in.
- The selected item is announced as checked/pressed; don't add your own "valgt" text.

## Example

```tsx
const [currency, setCurrency] = useState<Set<Key>>(new Set(["nok"]));

<ButtonGroup
    aria-label="Valuta"
    size="sm"
    selectedKeys={currency}
    onSelectionChange={setCurrency}
    disallowEmptySelection
>
    <ButtonGroupItem id="nok">NOK</ButtonGroupItem>
    <ButtonGroupItem id="usd">USD</ButtonGroupItem>
    <ButtonGroupItem id="eur">EUR</ButtonGroupItem>
</ButtonGroup>

<ButtonGroup aria-label="Visning" defaultSelectedKeys={["list"]} disallowEmptySelection>
    <ButtonGroupItem id="list" iconLeading={BulletList} aria-label="Liste" />
    <ButtonGroupItem id="grid" iconLeading={Grid} aria-label="Rutenett" />
</ButtonGroup>
```

`Key` comes from `react-aria` (`import type { Key } from "react-aria";`); `BulletList` and `Grid`
from `fa-icons`.

## See also

Storybook: Base components / Button groups. Related: [button](button.md), [tabs](tabs.md),
[select](select.md).
