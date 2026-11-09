"use client";

import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useControlledState } from "@react-stately/utils";
import { Calendar as CalendarIcon } from "fa-icons";
import { useDateFormatter } from "react-aria";
import type { DatePickerProps as AriaDatePickerProps, DateValue } from "react-aria-components";
import { DatePicker as AriaDatePicker, Dialog as AriaDialog, Group as AriaGroup, Popover as AriaPopover } from "react-aria-components";
import { Button, type ButtonProps } from "@/components/base/buttons/button";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";
import { Calendar } from "./calendar";

const defaultHighlightedDates = [today(getLocalTimeZone())];

export interface DatePickerProps extends AriaDatePickerProps<DateValue> {
    /** Visible label above the trigger; it also names the picker. */
    label?: string;
    /** Called with the committed date when Apply is clicked, after `onChange`. The popover closes after it. */
    onApply?: (value: DateValue | null) => void;
    /** Called when Cancel is clicked; the selection reverts to the committed date and the popover closes. */
    onCancel?: () => void;
    /** The size of the trigger button (Button sizes). */
    size?: ButtonProps["size"];
    /** The selected date (controlled). */
    value?: AriaDatePickerProps<DateValue>["value"];
    /** The date selected at first (uncontrolled). */
    defaultValue?: AriaDatePickerProps<DateValue>["defaultValue"];
    /** Called with the new date when Apply commits it. Clicks in the calendar are a draft until then. */
    onChange?: AriaDatePickerProps<DateValue>["onChange"];
    /** The earliest date that can be picked. */
    minValue?: AriaDatePickerProps<DateValue>["minValue"];
    /** The latest date that can be picked. */
    maxValue?: AriaDatePickerProps<DateValue>["maxValue"];
    /** Returns `true` for dates that can't be picked (closed market days, sold-out dates). */
    isDateUnavailable?: AriaDatePickerProps<DateValue>["isDateUnavailable"];
    /** Disables the trigger button. */
    isDisabled?: AriaDatePickerProps<DateValue>["isDisabled"];
    /** The dates to mark with a dot in the calendar. Defaults to today. */
    highlightedDates?: DateValue[];
}

/** A button that opens a calendar popover with Cancel / Apply, for picking one date. */
export const DatePicker = ({
    label,
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
}: DatePickerProps) => {
    const formatter = useDateFormatter({
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    // `value` is the committed date; `draft` holds the calendar's selection while the popover is
    // open (undefined when closed), so Cancel, Escape or a click outside drop it.
    const [value, setValue] = useControlledState(valueProp, defaultValue || null, onChange);
    const [draft, setDraft] = useState<DateValue | null | undefined>(undefined);
    const pickerValue = draft === undefined ? value : draft;

    const formattedDate = value ? formatter.format(value.toDate(getLocalTimeZone())) : "Select date";

    return (
        <AriaDatePicker
            aria-label={label ? undefined : "Date picker"}
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
                    {formattedDate}
                </Button>
            </AriaGroup>
            <AriaPopover
                offset={8}
                placement="bottom right"
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
                <AriaDialog aria-label="Date picker" className="rounded-2xl bg-primary shadow-xl ring ring-secondary_alt">
                    {({ close }) => (
                        <>
                            <div className="flex px-6 py-5">
                                <Calendar highlightedDates={highlightedDates} />
                            </div>
                            <div className="grid grid-cols-2 gap-3 border-t border-secondary p-4">
                                <Button
                                    size="md"
                                    color="secondary"
                                    onClick={() => {
                                        onCancel?.();
                                        close();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="md"
                                    color="primary"
                                    onClick={() => {
                                        setValue(pickerValue);
                                        onApply?.(pickerValue);
                                        close();
                                    }}
                                >
                                    Apply
                                </Button>
                            </div>
                        </>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDatePicker>
    );
};
