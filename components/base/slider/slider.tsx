"use client";

import type { SliderProps as AriaSliderProps } from "react-aria-components";
import { Slider as AriaSlider, SliderOutput as AriaSliderOutput, SliderThumb as AriaSliderThumb, SliderTrack as AriaSliderTrack } from "react-aria-components";
import { Label } from "@/components/base/input/label";
import { cx, sortCx } from "@/utils/cx";
import { formatNumber } from "@/utils/format-number";

const styles = sortCx({
    default: "hidden",
    bottom: "absolute top-2 left-1/2 -translate-x-1/2 translate-y-full text-md font-medium text-primary",
    "top-floating":
        "absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-primary px-2 py-1.5 text-xs font-semibold text-secondary shadow-lg ring-1 ring-secondary_alt",
});

export interface SliderProps extends AriaSliderProps {
    /** Visible label above the track; it also names the slider. Without it, pass `aria-label`. */
    label?: string;
    /** Where the value shows: `default` (hidden), `bottom` (below the thumb), `top-floating` (a bubble above) */
    labelPosition?: keyof typeof styles;
    /** Formats the value text; overrides `formatOptions` */
    labelFormatter?: (value: number) => string;
    /** The value (controlled): a number, or `[min, max]` for a range */
    value?: AriaSliderProps["value"];
    /** The initial value (uncontrolled) */
    defaultValue?: AriaSliderProps["defaultValue"];
    /**
     * The smallest value
     * @default 0
     */
    minValue?: AriaSliderProps["minValue"];
    /**
     * The largest value
     * @default 100
     */
    maxValue?: AriaSliderProps["maxValue"];
    /**
     * The amount each step changes the value by
     * @default 1
     */
    step?: AriaSliderProps["step"];
    /** `Intl.NumberFormatOptions` for the value text and the announced value. Defaults to the value as a whole percent (`60` → "60%") */
    formatOptions?: AriaSliderProps["formatOptions"];
    /** Called while the value changes */
    onChange?: AriaSliderProps["onChange"];
    /** Called when the person lets go */
    onChangeEnd?: AriaSliderProps["onChangeEnd"];
    /** Disables the slider (disabled tokens) */
    isDisabled?: AriaSliderProps["isDisabled"];
}

/** Picks a number, or a range with two thumbs, by dragging along a track. */
export const Slider = ({ label, labelPosition = "default", minValue = 0, maxValue = 100, labelFormatter, formatOptions, className, ...rest }: SliderProps) => {
    // The value itself is the percent (60 → "60%"), so the default never rescales it. These options name the value
    // for screen readers; the visible default label is written with `formatNumber`, which has no space before `%`.
    const defaultFormatOptions: Intl.NumberFormatOptions = {
        style: "unit",
        unit: "percent",
        maximumFractionDigits: 0,
    };

    return (
        <AriaSlider
            {...rest}
            {...{ minValue, maxValue }}
            formatOptions={formatOptions ?? defaultFormatOptions}
            className={(state) =>
                cx(
                    "flex flex-col",
                    label && labelPosition === "top-floating" ? "gap-11" : "gap-3",
                    state.isDisabled && "cursor-not-allowed",
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {label && <Label>{label}</Label>}
            <AriaSliderTrack className="relative h-6 w-full">
                {({ state: { values, getThumbValue, getThumbPercent, getFormattedValue }, isDisabled: isTrackDisabled }) => {
                    const left = values.length === 1 ? 0 : getThumbPercent(0);
                    const width = values.length === 1 ? getThumbPercent(0) : getThumbPercent(1) - left;

                    return (
                        <>
                            <span className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-quaternary" />
                            <span
                                // No Figma token design yet: the filled range and the value turn grey, the thumb keeps its shape.
                                className={cx(
                                    "absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-fg-brand-secondary",
                                    isTrackDisabled && "bg-fg-disabled_subtle",
                                )}
                                style={{
                                    left: `${left * 100}%`,
                                    width: `${width * 100}%`,
                                }}
                            />
                            {values.map((_, index) => {
                                return (
                                    <AriaSliderThumb
                                        key={index}
                                        index={index}
                                        className={({ isFocusVisible, isDragging, isDisabled }) =>
                                            cx(
                                                "top-1/2 box-border size-6 cursor-grab rounded-full shadow-md ring-2 ring-inset",
                                                isDisabled ? "bg-primary ring-(--color-border-disabled)" : "bg-slider-handle-bg ring-slider-handle-border",
                                                isFocusVisible && "outline-2 outline-offset-2 outline-focus-ring",
                                                isDragging && "cursor-grabbing",
                                                isDisabled && "cursor-not-allowed",
                                            )
                                        }
                                    >
                                        <AriaSliderOutput className={cx("whitespace-nowrap", styles[labelPosition], isTrackDisabled && "text-disabled")}>
                                            {labelFormatter
                                                ? labelFormatter(getThumbValue(index))
                                                : formatOptions
                                                  ? getFormattedValue(getThumbValue(index))
                                                  : `${formatNumber(getThumbValue(index), { decimals: 0 })}%`}
                                        </AriaSliderOutput>
                                    </AriaSliderThumb>
                                );
                            })}
                        </>
                    );
                }}
            </AriaSliderTrack>
        </AriaSlider>
    );
};
