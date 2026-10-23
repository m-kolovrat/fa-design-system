# Tags

Small labels in a row that can be removable (active filters) or selectable (filter chips).
React Aria `TagGroup`. Figma: Tag (and its \_Tag close X building block).

```ts
import { Tag, TagGroup, TagList } from "fa-design-system/components/base/tags/tags";
```

## Use when

- Showing the active filters on a list with an × to remove each ("Sektor: Energi", "Oslo Børs").
- A row of chips where the reader turns topics on and off (`selectionMode="multiple"`).
- Short keywords on an item that may carry a count, dot or avatar.

## Use something else when

- A status or category that isn't interactive (Ny, Pluss, Oppdatert): `Badge`.
- The person types new tags: `InputTags` / `InputTagsOuter`. Picks tags from a list: `TagSelect`.
- Exactly one view at a time (1D / 1U): `ButtonGroup`.

## Rules

- **tags-structure** MUST Nest as `TagGroup` > `TagList` > `Tag`. Because a `Tag` can't render
  outside a group; the group owns keyboard navigation and selection.
- **tags-label** MUST Pass `label` to `TagGroup` ("Aktive filtre"). Because it becomes the group's
  accessible name (it isn't shown).
- **tags-remove** SHOULD Remove with `onRemove` on `TagGroup` (`(keys: Set<Key>) => void`) rather
  than `onClose` on each `Tag`. Because `onRemove` also handles Delete / Backspace on a focused tag
  and keeps the × out of the tab order.
- **tags-ids** MUST Give each `Tag` a unique `id` and string children. Because removal and
  selection report ids, and string children become the tag's text value.
- **tags-wrap** SHOULD Lay out `TagList` with `className="flex flex-wrap gap-2"`.
- **tags-clear-all** SHOULD When there are several removable filters, add a `Button
color="link-gray" size="sm"` "Fjern alle" after the group.

## Props

`TagGroup`:

| Prop                                                         | Values                             | Default |
| :----------------------------------------------------------- | :--------------------------------- | :------ |
| `label`                                                      | string (required, accessible name) |         |
| `size`                                                       | `sm` · `md` · `lg`                 | `sm`    |
| `selectionMode`                                              | `none` · `single` · `multiple`     | `none`  |
| `selectedKeys` / `defaultSelectedKeys` / `onSelectionChange` | React Aria selection               |         |
| `onRemove`                                                   | `(keys: Set<Key>) => void`         |         |

`single` also prevents an empty selection. Selectable tags show a small checkbox.

`Tag`: `id`, `children` (string), `count` (number badge), `dot` (boolean) with `dotClassName` for
its color (`text-fg-*`), `avatarSrc`, `avatarContrastBorder`, `isDisabled`, `onClose(id)`.

## Accessibility

- The group is a grid: arrow keys move between tags, Delete / Backspace removes when `onRemove` is
  set.
- The × button has a fixed English `aria-label` ("Remove this tag"); the tag text gives context.

## Example

```tsx
const [filters, setFilters] = useState([
    { id: "sector-energy", label: "Sektor: Energi" },
    { id: "market-osebx", label: "Oslo Børs" },
    { id: "cap-large", label: "Store selskaper" },
]);

<div className="flex flex-wrap items-center gap-3">
    <TagGroup label="Aktive filtre" size="md" onRemove={(keys) => setFilters((prev) => prev.filter((filter) => !keys.has(filter.id)))}>
        <TagList className="flex flex-wrap gap-2" items={filters}>
            {(filter) => <Tag id={filter.id}>{filter.label}</Tag>}
        </TagList>
    </TagGroup>
    <Button color="link-gray" size="sm" onPress={() => setFilters([])}>
        Fjern alle
    </Button>
</div>;
```

## See also

Storybook: Base components / Tags. Related: [badge](badge.md), [select](select.md)
(`TagSelect`), [input-variants](input-variants.md) (`InputTags`).
