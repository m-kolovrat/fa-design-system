# Table

Rows of data to scan, sort and select, built on React Aria's `Table` (keyboard grid navigation,
sorting and selection come with it). `TableCard` wraps it in a bordered card with a title bar.
Figma: Tables/Table (the 15 Figma cell components are content you compose inside `Table.Cell`).

```ts
import { Table, TableCard } from "fa-design-system/components/application/table/table";
import type { SortDescriptor } from "react-aria-components";
```

## Use when

- Comparable records with several attributes: a stock list (ticker, last, change, volume), a
  portfolio, invoices, subscribers.
- The reader needs to sort by a column or select rows for a bulk action.

## Use something else when

- A list of articles or people with one main line each: a plain list (`ul`) or cards.
- Two or three facts about one item: a description list (`dl`) in a card.
- A trend over time: [charts](charts.md).
- A ticker strip in the header: `TickerBar` (see [site-header](site-header.md)).

## Rules

- **table-label** MUST Give `Table` an `aria-label` (or `aria-labelledby` pointing at the card
  title). Because React Aria's grid needs a name, and screen readers announce it on entry.
- **table-row-header** MUST Mark the identifying column with `isRowHeader` on its `Table.Head`
  (name, ticker). Because each cell is then announced with its row's name.
- **table-ids** MUST Give every `Table.Head` an `id` and every `Table.Row` a unique `id` (the key).
  Because sorting reports `sortDescriptor.column` as the head's `id`, and selection uses row ids.
- **table-sorting-controlled** MUST Sort the data yourself: pass `sortDescriptor` and
  `onSortChange` to `Table`, `allowsSorting` to sortable heads, and render the sorted array. Because
  the table only shows the arrows and reports clicks; it never reorders rows.
- **table-selection-by-prop** MUST Turn on selection with `selectionMode="multiple"` (or
  `"single"`) on `Table`; the checkbox column and the select-all box appear on their own. Never add
  `Checkbox` cells yourself. Use `selectedKeys` / `onSelectionChange` to read it.
- **table-size-once** SHOULD Set `size` (`sm` · `md`) once: on `TableCard.Root` inside a card, or on
  `Table` without one. Header, rows and cells read it from context and default to `md`. Inside a
  card that sets `size`, the card's size wins over `Table`'s.
- **table-actions-label** MUST Give icon actions in a row a label: `ButtonUtility` with `tooltip`,
  or `Dropdown.DotsButton`. Don't use the exported `TableRowActionsDropdown`; it's a demo with
  English labels and no handlers.
- **table-numbers** SHOULD Format numbers Norwegian style (`1 234,50`, `+2,4 %`) and add
  `tabular-nums` to numeric cells so digits line up.
- **table-instrument-cell** MUST Show an instrument (company, fund, index) as one cell: logo, full
  name on top, ticker under it ("Instrument cell" in `page-patterns.md`); never a ticker column next
  to a name column. Because it saves a column and is Figma's table cell `Type=Avatar`.
- **table-change-value** MUST Show a change as a colored span ("Change value" in
  `page-patterns.md`), not a `BadgeWithIcon`.
- **table-no-sideways-scroll** SHOULD Fit every column from `md` up (use `size="sm"`, shorter
  headers, fewer decimals); below `md`, switch to the two-column rows with a sheet (see
  `page-patterns.md`). Because a sideways scroll hides columns without telling the reader.
- **table-no-restyle** NEVER Restyle rows or cells with colors. Allowed: `odd:bg-secondary` on rows
  (the Figma "alternating fills" variant, with `className="bg-primary"` on `Table.Header`), widths,
  `whitespace-nowrap`, and responsive `hidden` classes.

## Props

| Component          | Props                                                                                                                                                                           |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TableCard.Root`   | `size` `sm` · `md` (default `md`), `div` attributes                                                                                                                             |
| `TableCard.Header` | `title` (required), `badge` (string → gray modern `Badge`, or a node), `description`, `contentTrailing`                                                                         |
| `Table`            | React Aria `Table` props: `aria-label`, `selectionMode`, `selectedKeys`, `onSelectionChange`, `sortDescriptor`, `onSortChange`, `onRowAction`; `size` (see **table-size-once**) |
| `Table.Header`     | `bordered` (default `true`), `size`, `columns`                                                                                                                                  |
| `Table.Head`       | `id`, `label`, `tooltip` (help icon), `isRowHeader`, `allowsSorting`, `className`                                                                                               |
| `Table.Body`       | `items` + render function, or static rows                                                                                                                                       |
| `Table.Row`        | `id`, `highlightSelectedRow` (default `true`), `size`, `className`                                                                                                              |
| `Table.Cell`       | `size`, `className`; content is free (text, `Avatar`, `Badge`, `ButtonUtility`)                                                                                                 |

## Notes

- Row height: 72px at `md`, 56px at `sm`. Cell text is `text-sm text-tertiary`; make the main
  value `font-medium text-primary`.
- Put pagination (`PaginationPageMinimalCenter`, `PaginationCardMinimal`) inside `TableCard.Root`
  after the table.

## Accessibility

- Arrow keys move between cells; Space selects a row; Enter on a sortable head sorts.
- From `md` up, every column shows and the table never scrolls sideways. Below `md`, replace it
  with the two-column list and sheet in "Data table on mobile" (`page-patterns.md`).

## Example

```tsx
const [sort, setSort] = useState<SortDescriptor>({ column: "change", direction: "descending" });
const rows = useMemo(
    () =>
        [...stocks].sort((a, b) => {
            const d = a[sort.column as "change"] - b[sort.column as "change"];
            return sort.direction === "descending" ? -d : d;
        }),
    [sort],
);

<TableCard.Root size="sm">
    <TableCard.Header title="Mest omsatt på Oslo Børs" badge="Sanntid" description="Oppdatert 14:32" />
    <Table aria-label="Mest omsatt på Oslo Børs" sortDescriptor={sort} onSortChange={setSort}>
        <Table.Header>
            <Table.Head id="name" label="Aksje" isRowHeader />
            <Table.Head id="last" label="Siste" allowsSorting />
            <Table.Head id="change" label="Endring" allowsSorting tooltip="Endring siden gårsdagens sluttkurs" />
        </Table.Header>
        <Table.Body items={rows}>
            {(s) => (
                <Table.Row id={s.ticker}>
                    <Table.Cell>
                        <div className="flex min-w-0 items-center gap-3">
                            <Avatar src={s.logo} alt="" size="md" />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-primary">{s.name}</p>
                                <p className="text-sm text-tertiary">{s.ticker}</p>
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="tabular-nums">{s.lastLabel}</Table.Cell>
                    <Table.Cell>
                        <span
                            className={cx(
                                "tabular-nums",
                                s.change > 0 && "text-success-primary",
                                s.change < 0 && "text-error-primary",
                                s.change === 0 && "text-tertiary",
                            )}
                        >
                            {s.changeLabel}
                        </span>
                    </Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
    </Table>
</TableCard.Root>;
```

`stocks`: `{ name: "Equinor", ticker: "EQNR", logo: "/logos/equinor.svg", last: 287.4, lastLabel: "287,40", change: 2.4, changeLabel: "+2,40 %" }`, …

## See also

Storybook: Application / Tables. Related: [pagination](pagination.md), [badge](badge.md),
[dropdown](dropdown.md), [empty-state](empty-state.md) (an empty or failed table body).
