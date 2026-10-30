# Select

Choose from a list: `Select` (one value), `Select.ComboBox` (one value, with search),
`MultiSelect` (several, with search and a footer), `TagSelect` (several, shown as tags),
`NativeSelect` (the browser's own select). Figma: Select (Type = Default / Search / Tags).

```ts
import { MultiSelect } from "fa-design-system/components/base/select/multi-select";
import { Select, type SelectItemType } from "fa-design-system/components/base/select/select";
import { NativeSelect } from "fa-design-system/components/base/select/select-native";
import { TagSelect } from "fa-design-system/components/base/select/tag-select";
```

## Choose

- **`Select`**: one choice from up to ~15 known options (fylke, kontotype, sortering).
- **`Select.ComboBox`**: one choice from a long list the person searches (selskap, land).
- **`MultiSelect`**: several choices; the trigger shows a count. **`TagSelect`**: several choices
  that should stay visible as removable tags.
- **`NativeSelect`**: inside an `InputGroup` addon (currency, country code), or where the native
  mobile picker is wanted.
- A menu of actions, not a value: `Dropdown`. 2–5 options always visible: `RadioGroup` or
  `ButtonGroup`.

## Rules

- **select-item-text** MUST Give each `Select.Item` its text as a string child or `label`. Because
  the trigger shows the selected item's label; JSX children leave it blank.
- **select-value-api** SHOULD Control `Select` / `Select.ComboBox` with `value` + `onChange` (a
  `AriaKey`). `selectedKey` / `onSelectionChange` still work but are deprecated in React Aria.
- **select-placeholder** MUST Pass a Norwegian `placeholder` ("Velg fylke", "Søk etter selskap").
  Because the defaults are English ("Select", "Search").
- **select-multiple** MUST Use `MultiSelect` or `TagSelect` for several values, never
  `selectionMode="multiple"` on `Select`. Because `Select`'s trigger only shows the first value.
- **multiselect-controlled** MUST Control `MultiSelect` (`selectedKeys` + `onSelectionChange`), pass
  `selectedCountFormatter` (`(n) => n + " valgt"`), and either wire `onReset` / `onSelectAll` or set
  `showFooter={false}`. Because the count only works when controlled, and the footer buttons do
  nothing on their own.
- **tagselect-list-data** MUST Hold `TagSelect`'s selection in `useListData` from
  `react-stately` and pass it as `selectedItems`.
- **select-errors** MUST Show errors with `isInvalid` + `hint`. Note `Select`'s trigger has no red
  ring; the hint carries the error.

## Props

Shared (`Select`, `Select.ComboBox`, `MultiSelect`, `TagSelect`): `size` (`sm` 36px · `md` 40px ·
`lg` 44px; default `md`, `TagSelect` `sm`), `label`, `hint` (string), `tooltip`, `placeholder`
(default "Select"; "Search" for `Select.ComboBox` and `TagSelect`), `items` (`SelectItemType[]`),
`isRequired`, `hideRequiredIndicator` (not on `TagSelect`), `isDisabled`, `isInvalid`,
`popoverClassName`, children as `(item) => <Select.Item …/>`.

- `Select`: `icon` (leading), `value` / `defaultValue` / `onChange`, `name`.
- `Select.ComboBox`: `icon`, `shortcut` (shows "⌘K", default `true`; set `false` unless bound),
  `shortcutClassName` (classes on the shortcut hint), `onInputChange`, `value` / `onChange`.
- `MultiSelect`: `selectedKeys` / `defaultSelectedKeys` (`AriaSelection`, i.e. `Selection` from `react-aria-components`), `onSelectionChange`,
  `showSearch` (`true`), `showFooter` (`true`), `onReset`, `onSelectAll`, `selectedCountFormatter`,
  `supportingText`, `emptyStateTitle` (default "No results found"), `emptyStateDescription`
  (default "Please try a different search term."), `className` (root). Items: `MultiSelect.Item`.
- `TagSelect`: `selectedItems` (`ListData`, required), `onItemInserted`, `onItemCleared`,
  `valueFormatter`, `icon`, `shortcut` (off by default), `shortcutClassName`. Items:
  `TagSelect.Item`.
- `NativeSelect`: `options` (`{ label, value, disabled? }[]`, required), `label`, `hint`, `size`,
  `selectClassName` (classes on the `<select>` itself), plus `<select>` props.

`MultiSelect` statics, rendered by `MultiSelect` itself and exported for composing your own popover:

- `MultiSelect.Footer`: `onReset`, `onSelectAll`, `size` (`sm` · `md` · `lg`, default `sm`; every
  size renders `sm` buttons), `className`. Its button labels "Reset" and "Select all" are fixed
  English with no prop; use `showFooter={false}` when that isn't acceptable.
- `MultiSelect.EmptyState`: `title` (default "No results found"), `description` (default "Please
  try a different search term."), `onClearSearch` (shows a "Clear search" link button, fixed
  English, only when passed), `className`. Inside `MultiSelect`, set the texts through
  `emptyStateTitle` / `emptyStateDescription`.

`SelectItemType` / item props: `id`, `label`, `supportingText`, `icon`, `avatarUrl`,
`isDisabled`; items also take `selectionIndicator` (`checkmark` · `checkbox` · `none`, default
`checkmark`) and `selectionIndicatorAlign` (`left` · `right`, default `right`).

An item, and the selected value in the trigger, is always one line: the label keeps its full width,
and `supportingText` fills the rest and is cut with an ellipsis instead of wrapping (Figma
`_Select menu item`). Keep the label short and put the long part in `supportingText`.

## Accessibility

- Type-ahead, arrow keys and Escape come from React Aria; the label is linked for `Select`,
  `Select.ComboBox` and `TagSelect`.
- `MultiSelect`'s visible label isn't linked to its trigger; keep the label visible and make the
  placeholder say what is being chosen.
- `NativeSelect`: pass `aria-label` when there is no `label` (e.g. inside an `InputGroup`).

## Example

```tsx
const fylker: SelectItemType[] = [
    { id: "oslo", label: "Oslo" },
    { id: "vestland", label: "Vestland" },
    { id: "trondelag", label: "Trøndelag" },
];
const [fylke, setFylke] = useState<AriaKey | null>(null); // import type { Key as AriaKey } from "react-aria-components"

<Select label="Fylke" placeholder="Velg fylke" items={fylker} value={fylke} onChange={setFylke}>
    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
</Select>

<Select.ComboBox label="Selskap" placeholder="Søk etter selskap" shortcut={false} items={selskaper}>
    {(item) => (
        <Select.Item id={item.id} supportingText={item.supportingText}>
            {item.label}
        </Select.Item>
    )}
</Select.ComboBox>
```

Here `selskaper` is items like `{ id: "EQNR", label: "Equinor", supportingText: "EQNR" }`.

## Figma parity

`MultiSelect` and `NativeSelect` are code-only; Figma's Select has only Default, Search and Tags
(`docs/figma-parity.md` §3). Suggested action: add them to Figma. Mention it when you use them.

## See also

Storybook: Base components / Select. Related: [dropdown](dropdown.md), [radio](radio.md),
[input](input.md).
