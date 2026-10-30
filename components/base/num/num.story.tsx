import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, TableCard } from "@/components/application/table/table";
import { useMockTicks } from "@/hooks/use-mock-ticks";
import numDoc from "@/skills/fa-design-system/references/components/num.md?raw";
import { cx } from "@/utils/cx";
import { Num } from "./num";

const meta = {
    title: "Base components/Num",
    component: Num,
    tags: ["autodocs"],
    // The Docs page text is num.md; the props table comes from num.tsx.
    parameters: { skillDoc: numDoc },
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full flex-col gap-8 bg-primary p-4 md:p-8 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
    args: { value: 1234.5, decimals: 2, sign: false, live: true },
} satisfies Meta<typeof Num>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Change `value` in the Controls panel. With `live`, the digits from the first one that changed turn green (up) or red (down) for 700 ms. */
export const Playground: Story = {
    render: (args) => <Num {...args} className="text-display-md font-semibold text-primary" />,
};

/** Colour by sign; the sign is always shown, so colour is never the only signal. */
const changeColor = (value: number) => cx(value > 0 && "text-success-primary", value < 0 && "text-error-primary", value === 0 && "text-tertiary");

/** Live figures ticking every two seconds from `useMockTicks`. Prices and values are `live`; changes are coloured by sign, so they aren't. */
export const LiveFigures = () => {
    const open = 287.4;
    const price = useMockTicks(open);
    const change = price - open;
    const percent = (change / open) * 100;
    const portfolio = useMockTicks(1_284_310, { seed: 2, volatility: 0.001 });

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-tertiary">Equinor · siste</span>
                <Num value={price} suffix=" NOK" live className="text-display-xs font-semibold text-primary" />
                <span className={cx("text-sm font-medium", changeColor(change))}>
                    <Num value={change} sign /> (<Num value={percent} sign suffix="%" />)
                </span>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-tertiary">Porteføljeverdi</span>
                <Num value={portfolio} decimals={0} suffix=" kr" live className="text-display-sm font-semibold text-primary" />
            </div>
            <p className="max-w-md text-md text-secondary">
                In a sentence too: Equinor trades at <Num value={price} live /> kroner, <Num value={percent} sign suffix="%" className={changeColor(percent)} />{" "}
                today.
            </p>
        </div>
    );
};
LiveFigures.storyName = "Live figures";

/** The same ticking value with and without `live`: without it, the figure just updates in place. */
export const LiveOrNot = () => {
    const price = useMockTicks(287.4);
    return (
        <div className="flex gap-10 text-display-xs font-semibold text-primary">
            <Num value={price} live />
            <Num value={price} />
        </div>
    );
};
LiveOrNot.storyName = "live vs. not";

const names = ["Equinor", "DNB Bank", "Telenor", "Norsk Hydro", "Orkla", "Mowi", "Yara", "Aker BP", "Kongsberg", "Storebrand"];

const LiveRow = ({ index }: { index: number }) => {
    const open = 50 + ((index * 37) % 400);
    const price = useMockTicks(open, { seed: index + 1, interval: 1000 });
    const change = ((price - open) / open) * 100;
    const volume = useMockTicks(100_000 + index * 9_137, { seed: index + 101, interval: 1000, volatility: 0.01 });
    return (
        <>
            <Num value={price} live />
            <Num value={change} sign suffix="%" className={changeColor(change)} />
            <Num value={volume} decimals={0} live />
        </>
    );
};

/** A dense table: 50 rows × 3 figures, ticking every second. Prices and volume are `live`; the change isn't. */
export const DenseTable = () => (
    <TableCard.Root size="sm" className="max-w-2xl">
        <TableCard.Header title="50 rader, 3 levende tall" />
        <Table aria-label="50 rader, 3 levende tall">
            <Table.Header>
                <Table.Head id="name" label="Aksje" isRowHeader className="w-full" />
                <Table.Head id="figures" label="Siste · Endring · Volum" />
            </Table.Header>
            <Table.Body items={Array.from({ length: 50 }, (_, i) => ({ id: i }))}>
                {(row) => (
                    <Table.Row id={row.id}>
                        <Table.Cell>{names[row.id % names.length]}</Table.Cell>
                        <Table.Cell>
                            <span className="flex justify-end gap-4 tabular-nums">
                                <LiveRow index={row.id} />
                            </span>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </TableCard.Root>
);
DenseTable.storyName = "Dense table";
