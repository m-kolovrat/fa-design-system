"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withOverlayAware } from "@/components/internal/decorators";
import tableDoc from "@/skills/fa-design-system/references/components/table.md?raw";
import { cx } from "@/utils/cx";
import {
    Table,
    TableCard,
    type TableCardHeaderProps,
    type TableCardRootProps,
    type TableCellProps,
    type TableHeadProps,
    type TableHeaderProps,
    type TableRowProps,
} from "./table";
import * as Tables from "./table.demo";
import teamMembers from "./team-members.json";

/*
 * The parts reached through `Table.*` and `TableCard.*`, for their props tables on the Docs page
 * (docgen only reads exported components). Not stories. `Table.Body` is React Aria's `TableBody`.
 */
/** `TableCard.Root`: the card around a table, its header and its pagination. */
export const TableCardRootDoc = (props: TableCardRootProps) => <TableCard.Root {...props} />;
/** `TableCard.Header`: title, badge, description and trailing content above the table. */
export const TableCardHeaderDoc = (props: TableCardHeaderProps) => <TableCard.Header {...props} />;
/** `Table.Header`: the header row. */
export const TableHeaderDoc = (props: TableHeaderProps<object>) => <Table.Header {...props} />;
/** `Table.Head`: one column heading. */
export const TableHeadDoc = (props: TableHeadProps) => <Table.Head {...props} />;
/** `Table.Row`: one row of cells. */
export const TableRowDoc = (props: TableRowProps<object>) => <Table.Row {...props} />;
/** `Table.Cell`: free content (text, `Avatar`, `Badge`, `ButtonUtility`). */
export const TableCellDoc = (props: TableCellProps) => <Table.Cell {...props} />;

const meta = {
    title: "Application/Tables",
    component: Table,
    subcomponents: {
        "TableCard.Root": TableCardRootDoc,
        "TableCard.Header": TableCardHeaderDoc,
        "Table.Header": TableHeaderDoc,
        "Table.Head": TableHeadDoc,
        "Table.Row": TableRowDoc,
        "Table.Cell": TableCellDoc,
    },
    excludeStories: /Doc$/,
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props tables
        // come from the types and JSDoc in table.tsx.
        skillDoc: tableDoc,
    },
    decorators: [
        withOverlayAware((Story, { viewMode }) => (
            <div className={cx("bg-primary p-5", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        )),
    ],
    args: { "aria-label": "Team members", size: "md", selectionMode: "none" },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        selectionMode: { control: "inline-radio", options: ["none", "single", "multiple"] },
        selectedKeys: { control: false },
        onSelectionChange: { control: false },
        sortDescriptor: { control: false },
        onSortChange: { control: false },
        onRowAction: { control: false },
    },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A small table in a `TableCard` — the controls set the `Table` props (`size` is passed to the card). */
export const Playground: Story = {
    render: ({ size, ...args }) => (
        <TableCard.Root size={size}>
            <TableCard.Header title="Team members" badge="5 users" description="Everyone with access to this workspace." />
            <Table {...args}>
                <Table.Header>
                    <Table.Head id="name" label="Name" isRowHeader />
                    <Table.Head id="role" label="Role" tooltip="What they can change" />
                    <Table.Head id="email" label="Email address" />
                </Table.Header>
                <Table.Body items={teamMembers.items.slice(0, 5)}>
                    {(item) => (
                        <Table.Row id={item.username}>
                            <Table.Cell className="font-medium whitespace-nowrap text-primary">{item.name}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.role}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.email}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    ),
};

export const Table01DividerLine = () => <Tables.Table01DividerLine />;
Table01DividerLine.storyName = "Table 01 divider line";
Table01DividerLine.parameters = {
    design: {
        desktop: "1227-110480",
        mobile: "1227-110588",
    },
};

export const Table01AlternatingFills = () => <Tables.Table01AlternatingFills />;
Table01AlternatingFills.storyName = "Table 01 alternating fills";
Table01AlternatingFills.parameters = {
    design: {
        desktop: "1229-12388",
        mobile: "1229-15727",
    },
};

export const Table01DividerLineSm = () => <Tables.Table01DividerLineSm />;
Table01DividerLineSm.storyName = "Table 01 divider line sm";
Table01DividerLineSm.parameters = {
    design: {
        desktop: "1227-110480",
    },
};

export const Table02DividerLine = () => <Tables.Table02DividerLine />;
Table02DividerLine.storyName = "Table 02 divider line";
Table02DividerLine.parameters = {
    design: {
        desktop: "1227-115509",
        mobile: "1227-115298",
    },
};

export const Table02AlternatingFills = () => <Tables.Table02AlternatingFills />;
Table02AlternatingFills.storyName = "Table 02 alternating fills";
Table02AlternatingFills.parameters = {
    design: {
        desktop: "1229-11893",
        mobile: "1229-17412",
    },
};

export const Table03DividerLine = () => <Tables.Table03DividerLine />;
Table03DividerLine.storyName = "Table 03 divider line";
Table03DividerLine.parameters = {
    design: {
        desktop: "1227-121348",
        mobile: "1229-543",
    },
};

export const Table03AlternatingFills = () => <Tables.Table03AlternatingFills />;
Table03AlternatingFills.storyName = "Table 03 alternating fills";
Table03AlternatingFills.parameters = {
    design: {
        desktop: "1229-12040",
        mobile: "1229-18422",
    },
};

export const Table04DividerLine = () => <Tables.Table04DividerLine />;
Table04DividerLine.storyName = "Table 04 divider line";
Table04DividerLine.parameters = {
    design: {
        desktop: "1229-2364",
        mobile: "1229-7899",
    },
};

export const Table04AlternatingFills = () => <Tables.Table04AlternatingFills />;
Table04AlternatingFills.storyName = "Table 04 alternating fills";
Table04AlternatingFills.parameters = {
    design: {
        desktop: "1229-12241",
        mobile: "1229-19933",
    },
};
