"use client";

import type { ComponentPropsWithRef, HTMLAttributes, ReactNode, Ref, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { createContext, isValidElement, useContext } from "react";
import { ArrowDown, ChevronUpDown, Copy, Help, Pen, Trash } from "fa-icons";
import type {
    CellProps as AriaCellProps,
    ColumnProps as AriaColumnProps,
    RowProps as AriaRowProps,
    TableHeaderProps as AriaTableHeaderProps,
    TableProps as AriaTableProps,
} from "react-aria-components";
import {
    Cell as AriaCell,
    Collection as AriaCollection,
    Column as AriaColumn,
    Group as AriaGroup,
    Row as AriaRow,
    Table as AriaTable,
    TableBody as AriaTableBody,
    TableHeader as AriaTableHeader,
    useTableOptions,
} from "react-aria-components";
import { Badge } from "@/components/base/badges/badges";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils/cx";

export const TableRowActionsDropdown = () => (
    <Dropdown.Root>
        <Dropdown.DotsButton />

        <Dropdown.Popover className="w-min">
            <Dropdown.Menu>
                <Dropdown.Item icon={Pen}>
                    <span className="pr-4">Edit</span>
                </Dropdown.Item>
                <Dropdown.Item icon={Copy}>
                    <span className="pr-4">Copy link</span>
                </Dropdown.Item>
                <Dropdown.Item icon={Trash}>
                    <span className="pr-4">Delete</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

/** `size` is undefined when no `TableCard.Root` or `Table` above has set one; consumers fall back to "md". */
const TableContext = createContext<{ size?: "sm" | "md" }>({});

export interface TableCardRootProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Row height and padding for the table inside: `md` 72px rows, `sm` 56px.
     * @default md
     */
    size?: "sm" | "md";
}

/** `TableCard.Root`: the card around a table, its header and its pagination. */
const TableCardRoot = ({ children, className, size, ...props }: TableCardRootProps) => {
    return (
        <TableContext.Provider value={{ size }}>
            <div {...props} className={cx("overflow-hidden rounded-xl bg-primary shadow-xs ring-1 ring-secondary", className)}>
                {children}
            </div>
        </TableContext.Provider>
    );
};

export interface TableCardHeaderProps {
    /** The title of the table card header. */
    title: string;
    /** Shown next to the title. A string renders a small gray modern `Badge`; pass an element for anything else. */
    badge?: ReactNode;
    /** The description of the table card header. */
    description?: string;
    /** Content on the right of the header (buttons, a search field, a dropdown). */
    contentTrailing?: ReactNode;
    /** The class name of the table card header. */
    className?: string;
}

/** `TableCard.Header`: title, badge, description and trailing content above the table. */
const TableCardHeader = ({ title, badge, description, contentTrailing, className }: TableCardHeaderProps) => {
    const { size = "md" } = useContext(TableContext);

    return (
        <div
            className={cx(
                "relative flex flex-col items-start gap-4 border-b border-secondary bg-primary px-4 md:flex-row",
                size === "sm" ? "py-4 md:px-5" : "py-5 md:px-6",
                className,
            )}
        >
            <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                    <h2 className="text-md font-semibold text-primary">{title}</h2>
                    {badge ? (
                        isValidElement(badge) ? (
                            badge
                        ) : (
                            <Badge color="gray" size="sm" type="modern">
                                {badge}
                            </Badge>
                        )
                    ) : null}
                </div>
                {description && <p className="text-sm text-tertiary">{description}</p>}
            </div>
            {contentTrailing}
        </div>
    );
};

export interface TableRootProps extends AriaTableProps, Omit<ComponentPropsWithRef<"table">, "className" | "slot" | "style"> {
    /** Row height and padding when the table is not inside a `TableCard.Root` (which sets it there). */
    size?: "sm" | "md";
    /** Names the table for screen readers (required unless `aria-labelledby` is set). */
    "aria-label"?: AriaTableProps["aria-label"];
    /** `single` or `multiple` adds a checkbox column for row selection. */
    selectionMode?: AriaTableProps["selectionMode"];
    /** The selected row ids (controlled). */
    selectedKeys?: AriaTableProps["selectedKeys"];
    /** Called with the new selection. */
    onSelectionChange?: AriaTableProps["onSelectionChange"];
    /** The sorted column and direction (controlled); pair with `allowsSorting` on `Table.Head`. */
    sortDescriptor?: AriaTableProps["sortDescriptor"];
    /** Called when a sortable column header is pressed. */
    onSortChange?: AriaTableProps["onSortChange"];
    /** Called when a row is pressed (open a detail view). */
    onRowAction?: AriaTableProps["onRowAction"];
}

/** A data table: `Table.Header` with `Table.Head`s, and `Table.Body` with `Table.Row`s of `Table.Cell`s. */
const TableRoot = ({ className, size, ...props }: TableRootProps) => {
    const context = useContext(TableContext);

    return (
        <TableContext.Provider value={{ size: context.size ?? size ?? "md" }}>
            <div className="overflow-x-auto">
                <AriaTable className={(state) => cx("w-full overflow-x-hidden", typeof className === "function" ? className(state) : className)} {...props} />
            </div>
        </TableContext.Provider>
    );
};
TableRoot.displayName = "Table";

export interface TableHeaderProps<T extends object>
    extends AriaTableHeaderProps<T>, Omit<ComponentPropsWithRef<"thead">, "children" | "className" | "slot" | "style"> {
    /**
     * A border-secondary line under the header row.
     * @default true
     */
    bordered?: boolean;
    /** Overrides the size from the table or card. */
    size?: "sm" | "md";
    /** The columns as data; render each with a `Table.Head` as children. */
    columns?: AriaTableHeaderProps<T>["columns"];
}

/** `Table.Header`: the header row. */
const TableHeader = <T extends object>({ columns, children, bordered = true, className, size: sizeProp, ...props }: TableHeaderProps<T>) => {
    const context = useContext(TableContext);
    const { selectionBehavior, selectionMode } = useTableOptions();

    const size = sizeProp ?? context.size ?? "md";

    return (
        <AriaTableHeader
            {...props}
            className={(state) =>
                cx(
                    "relative bg-secondary",
                    size === "sm" ? "h-9" : "h-11",

                    // Row border—using an "after" pseudo-element to avoid the border taking up space.
                    bordered &&
                        "[&>tr>th]:after:pointer-events-none [&>tr>th]:after:absolute [&>tr>th]:after:inset-x-0 [&>tr>th]:after:bottom-0 [&>tr>th]:after:h-px [&>tr>th]:after:bg-border-secondary [&>tr>th]:focus-visible:after:bg-transparent",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {selectionBehavior === "toggle" && (
                <AriaColumn className={cx("relative py-2 pr-0 pl-4", size === "sm" ? "w-9 md:pl-5" : "w-11 md:pl-6")}>
                    {selectionMode === "multiple" && (
                        <div className="flex items-start">
                            <Checkbox slot="selection" size="md" />
                        </div>
                    )}
                </AriaColumn>
            )}
            <AriaCollection items={columns}>{children}</AriaCollection>
        </AriaTableHeader>
    );
};

TableHeader.displayName = "TableHeader";

export interface TableHeadProps extends AriaColumnProps, Omit<ThHTMLAttributes<HTMLTableCellElement>, "children" | "className" | "style" | "id"> {
    /** The column's id; cells and the sort descriptor refer to it. */
    id?: AriaColumnProps["id"];
    /** The column heading. */
    label?: string;
    /** Help text in a tooltip on a help icon next to the label. */
    tooltip?: string;
    /** Marks the column whose cell names the row for screen readers (usually the first). */
    isRowHeader?: AriaColumnProps["isRowHeader"];
    /** Makes the column sortable (sort icon, `onSortChange` on the table). */
    allowsSorting?: AriaColumnProps["allowsSorting"];
}

/** `Table.Head`: one column heading. */
const TableHead = ({ className, tooltip, label, children, ...props }: TableHeadProps) => {
    const { selectionBehavior } = useTableOptions();

    return (
        <AriaColumn
            {...props}
            className={(state) =>
                cx(
                    "relative p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset",
                    selectionBehavior === "toggle" && "nth-2:pl-3",
                    state.allowsSorting && "cursor-pointer",
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {(state) => (
                <AriaGroup className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                        {label && <span className="text-xs font-semibold whitespace-nowrap text-quaternary">{label}</span>}
                        {typeof children === "function" ? children(state) : children}
                    </div>

                    {tooltip && (
                        <Tooltip title={tooltip} placement="top">
                            <TooltipTrigger
                                aria-label={tooltip}
                                // `focus-visible:outline-solid` overrides the `outline-hidden` that `TooltipTrigger` sets by default.
                                className="cursor-pointer text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover focus-visible:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
                            >
                                <Help className="size-4" />
                            </TooltipTrigger>
                        </Tooltip>
                    )}

                    {state.allowsSorting &&
                        (state.sortDirection ? (
                            <ArrowDown className={cx("size-3 text-fg-quaternary", state.sortDirection === "ascending" && "rotate-180")} />
                        ) : (
                            <ChevronUpDown size={12} className="text-fg-quaternary" />
                        ))}
                </AriaGroup>
            )}
        </AriaColumn>
    );
};
TableHead.displayName = "TableHead";

export interface TableRowProps<T extends object>
    extends AriaRowProps<T>, Omit<ComponentPropsWithRef<"tr">, "children" | "className" | "onClick" | "slot" | "style" | "id"> {
    /** The row's id, used for selection and `onRowAction`. */
    id?: AriaRowProps<T>["id"];
    /**
     * Gives selected rows the `bg-secondary` fill.
     * @default true
     */
    highlightSelectedRow?: boolean;
    /** Overrides the size from the table or card. */
    size?: "sm" | "md";
}

/** `Table.Row`: one row of cells. */
const TableRow = <T extends object>({ columns, children, className, highlightSelectedRow = true, size: sizeProp, ...props }: TableRowProps<T>) => {
    const context = useContext(TableContext);
    const { selectionBehavior } = useTableOptions();

    const size = sizeProp ?? context.size ?? "md";

    return (
        <AriaRow
            {...props}
            className={(state) =>
                cx(
                    "relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2",
                    size === "sm" ? "h-14" : "h-18",
                    highlightSelectedRow && "selected:bg-secondary",

                    // Row border—using an "after" pseudo-element to avoid the border taking up space.
                    "[&>td]:after:absolute [&>td]:after:inset-x-0 [&>td]:after:bottom-0 [&>td]:after:h-px [&>td]:after:w-full [&>td]:after:bg-border-secondary last:[&>td]:after:hidden [&>td]:focus-visible:after:opacity-0 focus-visible:[&>td]:after:opacity-0",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {selectionBehavior === "toggle" && (
                <AriaCell className={cx("relative py-2 pr-0 pl-4", size === "sm" ? "md:pl-5" : "md:pl-6")}>
                    <div className="flex items-end">
                        <Checkbox slot="selection" size="md" />
                    </div>
                </AriaCell>
            )}
            <AriaCollection items={columns}>{children}</AriaCollection>
        </AriaRow>
    );
};

TableRow.displayName = "TableRow";

export interface TableCellProps extends AriaCellProps, Omit<TdHTMLAttributes<HTMLTableCellElement>, "children" | "className" | "style" | "id"> {
    ref?: Ref<HTMLTableCellElement>;
    /** Overrides the size from the table or card. */
    size?: "sm" | "md";
    /** The main line (Figma "Lead text"): `text-sm text-primary`, regular. */
    leadText?: ReactNode;
    /** A second line under the lead text (Figma "Supporting text"): `text-sm text-tertiary`. */
    supportingText?: ReactNode;
    /**
     * A visual before the text (Figma `Type=Avatar`, `File type icon`, `Payment method`): an `Avatar` the size of
     * the cell (`sm` in an sm table, `md` in an md one), a file-type icon or a payment icon.
     */
    leading?: ReactNode;
}

/**
 * `Table.Cell`: `text-sm text-primary` by default. Give it `leadText`, `supportingText` and `leading` for the Figma
 * text and avatar cells; put anything else (a `Badge`, a change value, `ButtonUtility`) in `children`.
 */
const TableCell = ({ className, children, size: sizeProp, leadText, supportingText, leading, ...props }: TableCellProps) => {
    const context = useContext(TableContext);
    const { selectionBehavior } = useTableOptions();

    const size = sizeProp ?? context.size ?? "md";

    return (
        <AriaCell
            {...props}
            className={(state) =>
                cx(
                    "relative text-sm text-primary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2",
                    size === "sm" && "px-5 py-3",
                    size === "md" && "px-6 py-4",

                    selectionBehavior === "toggle" && "nth-2:pl-3",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {(state) => {
                const content = typeof children === "function" ? children(state) : children;
                if (leadText === undefined && supportingText === undefined && leading === undefined) return content;

                // Figma Table cell: the leading visual 12px before a stack of lead and supporting text, each one line.
                // `w-0 min-w-full` keeps the text out of the column's natural width, so a long name truncates to the
                // column instead of widening it; give the column its width on `Table.Head` (`w-full`, `w-1/3`, `min-w-48`).
                return (
                    <div className="flex w-0 min-w-full items-center gap-3">
                        {leading && <div className="shrink-0">{leading}</div>}
                        {(leadText !== undefined || supportingText !== undefined) && (
                            <div className="min-w-0 flex-1">
                                {leadText !== undefined && <p className="truncate text-sm text-primary">{leadText}</p>}
                                {supportingText !== undefined && <p className="truncate text-sm text-tertiary">{supportingText}</p>}
                            </div>
                        )}
                        {content}
                    </div>
                );
            }}
        </AriaCell>
    );
};
TableCell.displayName = "TableCell";

const TableCard = {
    Root: TableCardRoot,
    Header: TableCardHeader,
};

const Table = TableRoot as typeof TableRoot & {
    Body: typeof AriaTableBody;
    Cell: typeof TableCell;
    Head: typeof TableHead;
    Header: typeof TableHeader;
    Row: typeof TableRow;
};
Table.Body = AriaTableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Header = TableHeader;
Table.Row = TableRow;

export { Table, TableCard };
