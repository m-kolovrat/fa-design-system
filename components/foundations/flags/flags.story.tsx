import type { FC } from "react";
import { Flag, type FlagName, flags } from "fa-icons";

const names = Object.keys(flags) as FlagName[];

export default {
    title: "Foundations/Flags",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full overflow-auto bg-primary p-8">
                <Story />
            </div>
        ),
    ],
};

export const Flags = () => (
    <div className="flex flex-wrap gap-6">
        {names.map((name) => (
            <div key={name} className="flex w-28 flex-col items-center gap-2">
                <Flag name={name} className="size-6" />
                <span className="text-center text-xs text-tertiary">{name}</span>
            </div>
        ))}
    </div>
);

Flags.parameters = {
    design: { desktop: "17201-14733" },
};

export const Sizes = () => (
    <div className="flex items-center gap-4">
        <Flag name="united-states-usd" className="size-4" />
        <Flag name="united-states-usd" className="size-5" />
        <Flag name="united-states-usd" className="size-6" />
        <Flag name="united-states-usd" className="size-8" />
    </div>
);
