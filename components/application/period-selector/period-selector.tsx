"use client";

import { useEffect, useRef, useState } from "react";
import {
    ToggleButton as AriaToggleButton,
    ToggleButtonGroup as AriaToggleButtonGroup,
    type ToggleButtonGroupProps as AriaToggleButtonGroupProps,
} from "react-aria-components";
import { cx, sortCx } from "@/utils/cx";
import { formatNumber } from "@/utils/format-number";

/** Every period a chart can offer, in display order. The labels are the same in Norwegian. */
export const PERIODS = ["1D", "5D", "1M", "3M", "6M", "YTD", "1Y", "3Y", "5Y", "10Y"] as const;

export type Period = (typeof PERIODS)[number];

export interface PeriodOption {
    id: Period;
    /** The change over the period in percent (`0.42` shows "+0,42%"). Shown under the label when set. */
    change?: number;
}

export const styles = sortCx({
    common: {
        // The row scrolls sideways when the periods don't fit; it never wraps.
        root: "flex w-full [scrollbar-width:none] gap-1 overflow-x-auto overscroll-x-contain [&::-webkit-scrollbar]:hidden",
        // Figma _Period item: Text sm/Medium, 16×6 padding, radius-sm. Default has no fill; Hover is gray; Current
        // follows the Button brand tab; Focus is only the ring (inset, so the scrolling row doesn't clip it).
        item: [
            "flex shrink-0 cursor-pointer flex-col items-center rounded-sm px-4 py-1.5 text-sm font-medium whitespace-nowrap text-quaternary outline-focus-ring transition",
            "hover:bg-primary_hover hover:text-secondary focus-visible:outline-2 focus-visible:-outline-offset-2",
            "selected:bg-brand-primary_alt selected:text-brand-secondary",
        ].join(" "),
        change: "text-xs tabular-nums",
    },
    layouts: {
        // Figma Layout=Fit: the periods share the width. Below their natural width they stop shrinking and the row scrolls.
        fit: "flex-1",
        // Figma Layout=Scroll: natural width, left aligned.
        scroll: "",
    },
});

/** Norwegian change: `+0,42%`, `-1,10%`, `0,00%`. */
const formatChange = (percent: number) => `${formatNumber(percent, { sign: true })}%`;

export interface PeriodSelectorProps extends Omit<
    AriaToggleButtonGroupProps,
    "children" | "selectionMode" | "selectedKeys" | "defaultSelectedKeys" | "onSelectionChange" | "disallowEmptySelection" | "orientation"
> {
    /** The periods the chart has data for. They always show in the fixed order of `PERIODS`. */
    periods: PeriodOption[];
    /** Figma "Layout". @default "fit" */
    layout?: keyof typeof styles.layouts;
    /** The selected period (controlled). */
    selectedPeriod?: Period;
    /** The period selected at first (uncontrolled). */
    defaultSelectedPeriod?: Period;
    /** Called with the newly selected period. */
    onPeriodChange?: (period: Period) => void;
    /**
     * Names the group for screen readers.
     * @default "Periode"
     */
    "aria-label"?: string;
    className?: string;
}

/** Chart periods with an optional change under each label. Place it directly under the chart it controls. */
export const PeriodSelector = ({
    periods,
    layout = "fit",
    selectedPeriod,
    defaultSelectedPeriod,
    onPeriodChange,
    className,
    "aria-label": ariaLabel = "Periode",
    ...otherProps
}: PeriodSelectorProps) => {
    const sorted = [...periods].sort((a, b) => PERIODS.indexOf(a.id) - PERIODS.indexOf(b.id));
    const rootRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(selectedPeriod ?? defaultSelectedPeriod);
    const shown = selectedPeriod ?? current;

    // When the row scrolls, keep the selected period in view (it can start past the right edge on mobile).
    useEffect(() => {
        const root = rootRef.current;
        const item = root?.querySelector<HTMLElement>("[data-selected]");
        if (!root || !item || root.scrollWidth <= root.clientWidth) return;
        root.scrollLeft = item.offsetLeft - (root.clientWidth - item.offsetWidth) / 2;
    }, [shown]);

    return (
        <AriaToggleButtonGroup
            {...otherProps}
            ref={rootRef}
            aria-label={ariaLabel}
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={selectedPeriod ? [selectedPeriod] : undefined}
            defaultSelectedKeys={defaultSelectedPeriod ? [defaultSelectedPeriod] : undefined}
            onSelectionChange={(keys) => {
                const [period] = keys;
                if (!period) return;
                setCurrent(period as Period);
                onPeriodChange?.(period as Period);
            }}
            className={cx(styles.common.root, className)}
        >
            {sorted.map(({ id, change }) => (
                <AriaToggleButton key={id} id={id} className={cx(styles.common.item, styles.layouts[layout])}>
                    {id}
                    {change !== undefined && (
                        <span
                            className={cx(
                                styles.common.change,
                                change > 0 && "text-success-primary",
                                change < 0 && "text-error-primary",
                                change === 0 && "text-tertiary",
                            )}
                        >
                            {formatChange(change)}
                        </span>
                    )}
                </AriaToggleButton>
            ))}
        </AriaToggleButtonGroup>
    );
};
