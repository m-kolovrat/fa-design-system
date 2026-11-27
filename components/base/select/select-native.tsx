"use client";

import { type SelectHTMLAttributes, useId } from "react";
import { ChevronDown } from "fa-icons";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";

export interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
    /** Label text above the select */
    label?: string;
    /** Helper text below the select */
    hint?: string;
    /** Classes on the `<select>` itself */
    selectClassName?: string;
    /** The options (required) */
    options: { label: string; value: string; disabled?: boolean }[];
}

// One size (Figma Select, 2026-11-27): 36px, Text sm, 16px chevron.
const styles = {
    root: "py-2 pl-3 text-sm max-md:text-md/5",
    icon: "size-4 right-2.5",
};

/** The browser's own `<select>`, styled like the other fields; also the addon inside an `InputGroup`. */
export const NativeSelect = ({ label, hint, options, className, selectClassName, ...props }: NativeSelectProps) => {
    const id = useId();
    const selectId = props.id ?? `select-native-${id}`;
    const hintId = `select-native-hint-${id}`;
    const describedBy = [hint ? hintId : undefined, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;

    return (
        <div className={cx("w-full in-data-input-wrapper:w-max", className)}>
            {label && (
                <Label htmlFor={selectId} className="mb-1.5">
                    {label}
                </Label>
            )}

            <div className="relative grid w-full items-center">
                <select
                    {...props}
                    id={selectId}
                    aria-describedby={describedBy}
                    className={cx(
                        "appearance-none rounded-md bg-primary font-medium text-primary shadow-xs ring-1 ring-primary outline-hidden transition ring-inset placeholder:text-fg-quaternary focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-disabled disabled:shadow-none disabled:ring-disabled",

                        styles.root,

                        // Styles when the select is within an `InputGroup`
                        "in-data-input-wrapper:flex in-data-input-wrapper:h-full in-data-input-wrapper:gap-1 in-data-input-wrapper:bg-inherit in-data-input-wrapper:px-3 in-data-input-wrapper:py-2 in-data-input-wrapper:font-normal in-data-input-wrapper:text-tertiary in-data-input-wrapper:shadow-none in-data-input-wrapper:ring-transparent",
                        // Styles for the select when `TextField` is disabled
                        "in-data-input-wrapper:group-disabled:pointer-events-none in-data-input-wrapper:group-disabled:cursor-not-allowed in-data-input-wrapper:group-disabled:bg-transparent",
                        // Border radius and text within `InputGroup`
                        "in-data-input-wrapper:text-sm in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-trailing:rounded-l-none in-data-input-wrapper:max-md:text-md/5",
                        // For "leading" dropdown within `InputGroup`
                        "in-data-input-wrapper:in-data-leading:pr-3.5",
                        // For "trailing" dropdown within `InputGroup`
                        "in-data-input-wrapper:in-data-trailing:pr-6.5",
                        selectClassName,
                    )}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    aria-hidden="true"
                    className={cx(
                        "pointer-events-none absolute text-fg-quaternary",

                        styles.icon,
                        // Styles for the icon when the select is within an `InputGroup`
                        "in-data-input-wrapper:right-0 in-data-input-wrapper:size-4",
                        // For "trailing" dropdown within `InputGroup`
                        "in-data-input-wrapper:in-data-trailing:right-3",
                    )}
                />
            </div>

            {hint && (
                <HintText className="mt-2" id={hintId}>
                    {hint}
                </HintText>
            )}
        </div>
    );
};
