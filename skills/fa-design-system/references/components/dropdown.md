# Dropdown

A menu of commands or links that opens from a button ("Mer", the three-dot button on a row).
Built on React Aria `MenuTrigger` / `Menu`. Figma: Dropdown (button, icon and avatar dropdowns).

```ts
import { SubmenuTrigger as AriaSubmenuTrigger } from "react-aria-components";
import { Dropdown } from "@/components/base/dropdown/dropdown";

// only for submenus
```

## Use when

- A button or a row needs several actions that don't fit as buttons (Rediger, Kopier lenke, Slett).
- A short list of links behind an account or avatar button.
- A small set of view options with checkmarks (`selectionMode` on the menu or a section).

## Use something else when

- The person picks a value for a form field: `Select` (it keeps and shows the value).
- Switching a view of the same content: `ButtonGroup` or `Tabs`.
- Only one or two actions: show them as `Button`s.

## Rules

- **dropdown-structure** MUST Nest as `Dropdown.Root` > trigger + `Dropdown.Popover` >
  `Dropdown.Menu` > `Dropdown.Item` (optionally grouped in `Dropdown.Section` with
  `Dropdown.Separator` between). Because the trigger, focus handling and keyboard navigation come
  from that structure.
- **dropdown-trigger** MUST Use a library trigger: `Button` (usually `color="secondary"` with
  `iconTrailing={ChevronDown}`) or `Dropdown.DotsButton`. Because the trigger must be a React Aria
  pressable to open the menu.
- **dropdown-actions** MUST Handle actions with `onAction` on the item or the menu (`href` for
  links), not `onClick`. Because `onAction` also fires for keyboard selection.
- **dropdown-destructive-confirm** SHOULD Open a `PromptModal` to confirm a destructive item
  ("Slett") instead of acting at once. Because menus are easy to mis-click.
- **dropdown-width** SHOULD Set the popover width with a `w-*` class on `Dropdown.Popover` (default
  `w-62`). Don't restyle items.
- **dropdown-flavors-are-demos** NEVER Import the prebuilt flavors (`DropdownButtonSimple`,
  `DropdownAvatar`, …) into product code. Because they hard-code English sample content and take
  no props; copy their structure instead.

## Props

`Dropdown.Item`:

| Prop                 | Values                                                 | Default     |
| :------------------- | :----------------------------------------------------- | :---------- |
| `label` / `children` | string                                                 |             |
| `icon`               | icon component, shown left                             |             |
| `avatarUrl`          | string, small avatar on the left                       |             |
| `addon`              | string on the right (a shortcut such as "⌘K")          |             |
| `selectionIndicator` | `checkmark` · `checkbox` · `radio` · `toggle` · `none` | `checkmark` |
| `isDisabled`         | boolean                                                |             |
| `unstyled`           | boolean: bare `MenuItem` for custom content            |             |

Plus React Aria `MenuItem` props (`id`, `onAction`, `href`, `textValue`). `Dropdown.Menu` and
`Dropdown.Section` take `selectionMode`, `selectedKeys`, `onSelectionChange`, `onAction`.
`Dropdown.Popover` takes `placement` (default `bottom right`) and `offset`. `Dropdown.Root` takes
`trigger="contextMenu"` for right-click menus. Also `Dropdown.SectionHeader` (a `Header`).

## Accessibility

- Arrow keys move through items, typing jumps to an item, Escape closes and returns focus.
- `Dropdown.DotsButton` has a fixed English `aria-label` ("Open menu") that can't be overridden;
  when the label matters, use `<ButtonUtility icon={DotsVertical} color="tertiary"
aria-label="Flere valg" />` as the trigger instead.
- Give items text; an icon alone is not a name.

## Example

```tsx
<Dropdown.Root>
    <Button color="secondary" size="sm" iconTrailing={ChevronDown}>
        Handlinger
    </Button>
    <Dropdown.Popover className="w-56">
        <Dropdown.Menu onAction={(key) => handleAction(key)}>
            <Dropdown.Section>
                <Dropdown.Item id="watch" icon={Star}>
                    Legg til i favoritter
                </Dropdown.Item>
                <Dropdown.Item id="share" icon={Share}>
                    Del aksjen
                </Dropdown.Item>
                <Dropdown.Item id="export" icon={Download} addon="CSV">
                    Eksporter kurshistorikk
                </Dropdown.Item>
            </Dropdown.Section>
            <Dropdown.Separator />
            <Dropdown.Section>
                <Dropdown.Item id="remove" icon={Trash}>
                    Fjern fra portefølje
                </Dropdown.Item>
            </Dropdown.Section>
        </Dropdown.Menu>
    </Dropdown.Popover>
</Dropdown.Root>
```

Submenu: wrap an item and a nested `Dropdown.Popover placement="right top" offset={-6}` in
`AriaSubmenuTrigger`.

## Prebuilt flavors

Reference demos in `components/base/dropdown/`: button simple / advanced / link, icon simple /
advanced, avatar, context menu simple / advanced, search simple / advanced, account button,
account card xs / sm / md, account breadcrumb. **Figma parity:** only the button, icon and avatar
dropdowns exist in Figma; account cards, account button, account breadcrumb, search and context
menus are code-only (`docs/figma-parity.md` §3). Ask before building UI on a code-only flavor.

## See also

Storybook: Base components / Dropdown menus. Related: [button](button.md), [select](select.md),
[prompt-modal](prompt-modal.md).
