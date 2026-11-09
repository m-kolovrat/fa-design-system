"use client";

import { useMemo, useState } from "react";
import { endOfMonth, endOfWeek, getLocalTimeZone, startOfMonth, startOfWeek, today } from "@internationalized/date";
import { useControlledState } from "@react-stately/utils";
import { Calendar as CalendarIcon } from "fa-icons";
import { useDateFormatter } from "react-aria";
import type { DateRangePickerProps as AriaDateRangePickerProps, DateRange, DateValue } from "react-aria-components";
import { DateRangePicker as AriaDateRangePicker, Dialog as AriaDialog, Group as AriaGroup, Popover as AriaPopover, useLocale } from "react-aria-components";
import { Button, type ButtonProps } from "@/components/base/buttons/button";
import { InputDateBase } from "@/components/base/input/input-date";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";
import { type DatePickerLabels, mergeDatePickerLabels } from "@/utils/strings";
import { RangeCalendar, RangePresetButton } from "./range-calendar";

const now = today(getLocalTimeZone());

const defaultHighlightedDates = [today(getLocalTimeZone())];

export interface DateRangePickerProps extends AriaDateRangePickerProps<DateValue> {
    /** Visible label above the trigger; it also names the picker. */
    label?: string;
    /** Overrides the built-in Norwegian texts (`strings.datePicker` in `utils/strings`): buttons, presets, empty text, name. */
    labels?: DatePickerLabels;
    /** The size of the trigger button (Button sizes). */
    size?: ButtonProps["size"];
    /** Called with the committed range when Apply is clicked, after `onChange`. The popover closes after it. */
    onApply?: (value: DateRange | null) => void;
    /** Called when Cancel is clicked; the selection reverts to the committed range and the popover closes. */
    onCancel?: () => void;
    /** The selected range, `{ start, end }` (controlled). */
    value?: AriaDateRangePickerProps<DateValue>["value"];
    /** The range selected at first (uncontrolled). */
    defaultValue?: AriaDateRangePickerProps<DateValue>["defaultValue"];
    /** Called with the new range when Apply commits it. Clicks in the calendar and presets are a draft until then. */
    onChange?: AriaDateRangePickerProps<DateValue>["onChange"];
    /** The earliest date that can be picked. */
    minValue?: AriaDateRangePickerProps<DateValue>["minValue"];
    /** The latest date that can be picked. */
    maxValue?: AriaDateRangePickerProps<DateValue>["maxValue"];
    /** Returns `true` for dates that can't be picked. */
    isDateUnavailable?: AriaDateRangePickerProps<DateValue>["isDateUnavailable"];
    /** Disables the trigger button. */
    isDisabled?: AriaDateRangePickerProps<DateValue>["isDisabled"];
    /** The dates to mark with a dot in the calendar. Defaults to today. */
    highlightedDates?: DateValue[];
}

/** A button that opens a two-month range calendar with presets (today, this week, last month, …) and Cancel / Apply. */
export const DateRangePicker = ({
    label,
    labels: labelsProp,
    value: valueProp,
    defaultValue,
    onChange,
    onApply,
    onCancel,
    onOpenChange,
    size = "sm",
    highlightedDates = defaultHighlightedDates,
    className,
    ...props
}: DateRangePickerProps) => {
    const { locale } = useLocale();
    const labels = mergeDatePickerLabels(labelsProp);
    const formatter = useDateFormatter({
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    // `value` is the committed range; `draft` holds the calendar's selection while the popover is
    // open (undefined when closed), so Cancel, Escape or a click outside drop it.
    const [value, setValue] = useControlledState(valueProp, defaultValue || null, onChange);
    const [draft, setDraft] = useState<DateRange | null | undefined>(undefined);
    const pickerValue = draft === undefined ? value : draft;
    const [focusedValue, setFocusedValue] = useState<DateValue | null>(null);

    const formattedStartDate = value?.start ? formatter.format(value.start.toDate(getLocalTimeZone())) : labels.empty;
    const formattedEndDate = value?.end ? formatter.format(value.end.toDate(getLocalTimeZone())) : labels.empty;

    const presets = useMemo(
        () => ({
            today: { label: labels.presets.today, value: { start: now, end: now } },
            yesterday: { label: labels.presets.yesterday, value: { start: now.subtract({ days: 1 }), end: now.subtract({ days: 1 }) } },
            thisWeek: { label: labels.presets.thisWeek, value: { start: startOfWeek(now, locale), end: endOfWeek(now, locale) } },
            lastWeek: {
                label: labels.presets.lastWeek,
                value: {
                    start: startOfWeek(now, locale).subtract({ weeks: 1 }),
                    end: endOfWeek(now, locale).subtract({ weeks: 1 }),
                },
            },
            thisMonth: { label: labels.presets.thisMonth, value: { start: startOfMonth(now), end: endOfMonth(now) } },
            lastMonth: {
                label: labels.presets.lastMonth,
                value: {
                    start: startOfMonth(now).subtract({ months: 1 }),
                    end: endOfMonth(now).subtract({ months: 1 }),
                },
            },
            thisYear: { label: labels.presets.thisYear, value: { start: startOfMonth(now.set({ month: 1 })), end: endOfMonth(now.set({ month: 12 })) } },
            lastYear: {
                label: labels.presets.lastYear,
                value: {
                    start: startOfMonth(now.set({ month: 1 }).subtract({ years: 1 })),
                    end: endOfMonth(now.set({ month: 12 }).subtract({ years: 1 })),
                },
            },
            allTime: {
                label: labels.presets.allTime,
                value: {
                    start: now.set({ year: 2000, month: 1, day: 1 }),
                    end: now,
                },
            },
        }),
        [locale, labels.presets],
    );

    return (
        <AriaDateRangePicker
            aria-label={label ? undefined : labels.range}
            shouldCloseOnSelect={false}
            {...props}
            value={pickerValue}
            onChange={setDraft}
            onOpenChange={(isOpen) => {
                if (!isOpen) setDraft(undefined);
                onOpenChange?.(isOpen);
            }}
            className={(state) => cx(label && "flex flex-col items-start gap-1.5", typeof className === "function" ? className(state) : className)}
        >
            {label && <Label>{label}</Label>}
            <AriaGroup>
                <Button size={size} color="secondary" iconLeading={CalendarIcon}>
                    {!value ? <span className="text-placeholder">{labels.emptyRange}</span> : `${formattedStartDate} – ${formattedEndDate}`}
                </Button>
            </AriaGroup>
            <AriaPopover
                placement="bottom right"
                offset={8}
                className={({ isEntering, isExiting }) =>
                    cx(
                        "origin-(--trigger-anchor-point) will-change-transform",
                        isEntering &&
                            "duration-moderate ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
                        isExiting &&
                            "duration-fast ease-out animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
                    )
                }
            >
                <AriaDialog aria-label={label ?? labels.range} className="flex rounded-2xl bg-primary shadow-xl ring ring-secondary_alt focus:outline-hidden">
                    {({ close }) => (
                        <>
                            <div className="hidden w-38 flex-col gap-0.5 border-r border-solid border-secondary p-3 lg:flex">
                                {Object.values(presets).map((preset) => (
                                    <RangePresetButton
                                        key={preset.label}
                                        value={preset.value}
                                        onClick={() => {
                                            setDraft(preset.value);
                                            setFocusedValue(preset.value.start);
                                        }}
                                    >
                                        {preset.label}
                                    </RangePresetButton>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <RangeCalendar
                                    focusedValue={focusedValue}
                                    onFocusChange={setFocusedValue}
                                    highlightedDates={highlightedDates}
                                    presets={{
                                        lastWeek: presets.lastWeek,
                                        lastMonth: presets.lastMonth,
                                        lastYear: presets.lastYear,
                                    }}
                                />
                                <div className="flex justify-between gap-3 border-t border-secondary p-4">
                                    <div className="hidden items-center gap-2 md:flex">
                                        <InputDateBase slot="start" size="sm" />
                                        <div className="text-md text-quaternary">–</div>
                                        <InputDateBase slot="end" size="sm" />
                                    </div>
                                    <div className="grid w-full grid-cols-2 gap-3 md:flex md:w-auto">
                                        <Button
                                            size="sm"
                                            color="secondary"
                                            onClick={() => {
                                                onCancel?.();
                                                close();
                                            }}
                                        >
                                            {labels.cancel}
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="primary"
                                            onClick={() => {
                                                setValue(pickerValue);
                                                onApply?.(pickerValue);
                                                close();
                                            }}
                                        >
                                            {labels.apply}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDateRangePicker>
    );
};
