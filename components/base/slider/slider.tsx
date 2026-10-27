"use client";

import type { SliderProps as AriaSliderProps } from "react-aria-components";
import {
    Label as AriaLabel,
    Slider as AriaSlider,
    SliderOutput as AriaSliderOutput,
    SliderThumb as AriaSliderThumb,
    SliderTrack as AriaSliderTrack,
} from "react-aria-components";
import { cx, sortCx } from "@/utils/cx";

const styles = sortCx({
    default: "hidden",
    bottom: "absolute top-2 left-1/2 -translate-x-1/2 translate-y-full text-md font-medium text-primary",
    "top-floating":
        "absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-primary px-2 py-1.5 text-xs font-semibold text-secondary shadow-lg ring-1 ring-secondary_alt",
});

export interface SliderProps extends AriaSliderProps {
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
    /** `Intl.NumberFormatOptions` for the value text. Defaults to a whole percent */
    formatOptions?: AriaSliderProps["formatOptions"];
    /** Called while the value changes */
    onChange?: AriaSliderProps["onChange"];
    /** Called when the person lets go */
    onChangeEnd?: AriaSliderProps["onChangeEnd"];
    /** Disables the slider */
    isDisabled?: AriaSliderProps["isDisabled"];
}

/** Picks a number, or a range with two thumbs, by dragging along a track. */
export const Slider = ({ labelPosition = "default", minValue = 0, maxValue = 100, labelFormatter, formatOptions, ...rest }: SliderProps) => {
    // Format thumb value as percentage by default.
    const defaultFormatOptions: Intl.NumberFormatOptions = {
        style: "percent",
        maximumFractionDigits: 0,
    };

    return (
        <AriaSlider {...rest} {...{ minValue, maxValue }} formatOptions={formatOptions ?? defaultFormatOptions}>
            <AriaLabel />
            <AriaSliderTrack className="relative h-6 w-full">
                {({ state: { values, getThumbValue, getThumbPercent, getFormattedValue } }) => {
                    const left = values.length === 1 ? 0 : getThumbPercent(0);
                    const width = values.length === 1 ? getThumbPercent(0) : getThumbPercent(1) - left;

                    return (
                        <>
                            <span className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-quaternary" />
                            <span
                                className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-fg-brand-secondary"
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
                                        className={({ isFocusVisible, isDragging }) =>
                                            cx(
                                                "top-1/2 box-border size-6 cursor-grab rounded-full bg-slider-handle-bg shadow-md ring-2 ring-slider-handle-border ring-inset",
                                                isFocusVisible && "outline-2 outline-offset-2 outline-focus-ring",
                                                isDragging && "cursor-grabbing",
                                            )
                                        }
                                    >
                                        <AriaSliderOutput className={cx("whitespace-nowrap", styles[labelPosition])}>
                                            {labelFormatter ? labelFormatter(getThumbValue(index)) : getFormattedValue(getThumbValue(index) / 100)}
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
