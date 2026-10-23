# Button group

A row of joined toggle buttons that switches a view or filter of the same content (1D / 1U / 1Å
on a chart, "Liste" / "Rutenett"). Figma: Button group (Icon = False / Leading / Trailing / Only /
Dot).

```ts
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
```

## Use when

- The reader picks one of 2–6 short options that change what the content below shows: chart
  period, list or grid, currency.
- A small set of filters can be on at the same time: `selectionMode="multiple"`.

## Use something else when

- The options swap whole panels of different content: `Tabs`.
- The buttons start actions (Lagre, Del, Slett) rather than choose a state: separate `Button`s.
- More than about six options, or long labels: `Select`.
- One on/off setting: `Toggle`.

## Rules

- **button-group-label** MUST Give the group an `aria-label` ("Periode", "Visning"). Because it
  renders as a radio group (single) or toolbar (multiple), and the options mean little without
  the question.
- **button-group-keep-one** SHOULD For a view or period switcher, control `selectedKeys` with
  `onSelectionChange` and set `disallowEmptySelection`. Because clicking the current option would
  otherwise clear it and leave the chart with no period.
- **button-group-ids** MUST Give every `ButtonGroupItem` a unique `id`; selection keys refer to it.
- **button-group-icon-only** MUST Give an icon-only item an `aria-label`. Because the icon is
  `aria-hidden`.
- **button-group-icons** MUST Pass icons through `iconLeading` / `iconTrailing` (component
  reference, or JSX for a `Dot`). Because the item sizes, pads and colors icons only through
  those props.
- **button-group-same-size** NEVER Mix sizes or restyle single items; set `size` once on
  `ButtonGroup`. Because items read their size from the group.
- **button-group-short-labels** SHOULD Keep labels to one or two words in sentence case ("1U",
  "I år", "Tabell").

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
`ToggleButton` props. Disabled items use Figma's disabled tokens (`bg-disabled_subtle`,
`text-disabled`), not `opacity-50`.

## Accessibility

- Arrow keys move between items; the focus ring is built in.
- The selected item is announced as checked/pressed; don't add your own "valgt" text.

## Example

```tsx
const [period, setPeriod] = useState<Set<Key>>(new Set(["1y"]));

<ButtonGroup
    aria-label="Periode"
    size="sm"
    selectedKeys={period}
    onSelectionChange={setPeriod}
    disallowEmptySelection
>
    <ButtonGroupItem id="1d">1D</ButtonGroupItem>
    <ButtonGroupItem id="1m">1M</ButtonGroupItem>
    <ButtonGroupItem id="1y">1Å</ButtonGroupItem>
    <ButtonGroupItem id="5y">5Å</ButtonGroupItem>
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
