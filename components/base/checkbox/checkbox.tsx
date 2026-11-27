"use client";

import type { ReactNode, Ref } from "react";
import { Checkbox as AriaCheckbox, type CheckboxProps as AriaCheckboxProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface CheckboxBaseProps {
    /** The size variant: `sm` 16px, `md` 20px */
    size?: "sm" | "md";
    /** Layout classes only */
    className?: string;
    /** Draws the focus ring (pass the parent's focus-visible state) */
    isFocusVisible?: boolean;
    /** Draws the check */
    isSelected?: boolean;
    /** Draws the disabled look */
    isDisabled?: boolean;
    /** Draws the dash */
    isIndeterminate?: boolean;
    /** Draws the error ring on an unchecked box */
    isInvalid?: boolean;
}

/** The visual box only, for use inside other components (menus, cards); never a form control on its own. */
export const CheckboxBase = ({ className, isSelected, isDisabled, isIndeterminate, isInvalid, size = "sm", isFocusVisible = false }: CheckboxBaseProps) => {
    return (
        <div
            className={cx(
                "relative flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded bg-primary ring-1 ring-primary ring-inset",
                size === "md" && "size-5 rounded-sm",
                // The error ring Input and Select use; a checked box keeps its brand fill.
                isInvalid && "ring-error_subtle",
                (isSelected || isIndeterminate) && "bg-brand-solid ring-brand-solid",
                // Figma _Checkbox base State=Disabled: bg-disabled_subtle, border-disabled, check in fg-disabled_subtle.
                isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled",
                isFocusVisible && "outline-2 outline-offset-2 outline-focus-ring",
                className,
            )}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 14 14"
                fill="none"
                className={cx(
                    "pointer-events-none absolute h-3 w-2.5 text-fg-white opacity-0 transition-inherit-all",
                    isDisabled && "text-fg-disabled_subtle",
                    size === "md" && "size-3.5",
                    isIndeterminate && "opacity-100",
                )}
            >
                <path d="M2.91675 7H11.0834" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <svg
                aria-hidden="true"
                viewBox="0 0 14 14"
                fill="none"
                className={cx(
                    "pointer-events-none absolute size-3 text-fg-white opacity-0 transition-inherit-all",
                    isDisabled && "text-fg-disabled_subtle",
                    size === "md" && "size-3.5",
                    isSelected && !isIndeterminate && "opacity-100",
                )}
            >
                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};
CheckboxBase.displayName = "CheckboxBase";

export interface CheckboxProps extends AriaCheckboxProps {
    /** Ref to the `<label>` that wraps the box and its text */
    ref?: Ref<HTMLLabelElement>;
    /** The size variant: `sm` 16px box, `md` 20px box */
    size?: "sm" | "md";
    /** The label next to the box. Without it, pass an `aria-label` */
    label?: ReactNode;
    /** One line of explanation below the label */
    hint?: ReactNode;
    /** Whether it is checked (controlled) */
    isSelected?: AriaCheckboxProps["isSelected"];
    /** Whether it is checked at first (uncontrolled) */
    defaultSelected?: AriaCheckboxProps["defaultSelected"];
    /** Called with the new checked state */
    onChange?: AriaCheckboxProps["onChange"];
    /** Shows a dash: for a parent whose children are partly selected */
    isIndeterminate?: AriaCheckboxProps["isIndeterminate"];
    /** Disables the checkbox (Figma's disabled tokens) */
    isDisabled?: AriaCheckboxProps["isDisabled"];
    /** Marks it required for form validation */
    isRequired?: AriaCheckboxProps["isRequired"];
    /** Marks it invalid: an error ring on the unchecked box and a red `hint`. Say why in the `hint` */
    isInvalid?: AriaCheckboxProps["isInvalid"];
    /** Shows the state but can't be changed */
    isReadOnly?: AriaCheckboxProps["isReadOnly"];
    /** The form field name */
    name?: AriaCheckboxProps["name"];
    /** The value sent with the form when checked */
    value?: AriaCheckboxProps["value"];
}

/** A box the person checks to turn one option on or off, with an optional label and hint. */
export const Checkbox = ({ label, hint, size = "sm", className, ...ariaCheckboxProps }: CheckboxProps) => {
    const sizes = {
        sm: {
            root: "gap-2",
            textWrapper: "",
            label: "text-sm font-medium",
            hint: "text-sm",
        },
        md: {
            root: "gap-3",
            textWrapper: "gap-0.5",
            label: "text-md font-medium",
            hint: "text-md",
        },
    };

    return (
        <AriaCheckbox
            {...ariaCheckboxProps}
            className={(state) =>
                cx(
                    "relative flex items-start",
                    state.isDisabled && "cursor-not-allowed",
                    sizes[size].root,
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {({ isSelected, isIndeterminate, isDisabled, isInvalid, isFocusVisible }) => (
                <>
                    <CheckboxBase
                        size={size}
                        isSelected={isSelected}
                        isIndeterminate={isIndeterminate}
                        isDisabled={isDisabled}
                        isInvalid={isInvalid}
                        isFocusVisible={isFocusVisible}
                        className={label || hint ? "mt-0.5" : ""}
                    />
                    {(label || hint) && (
                        <div className={cx("inline-flex flex-col", sizes[size].textWrapper)}>
                            {label && <p className={cx("text-secondary select-none", sizes[size].label)}>{label}</p>}
                            {hint && (
                                <span
                                    className={cx("text-tertiary", isInvalid && "text-error-primary", sizes[size].hint)}
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    {hint}
                                </span>
                            )}
                        </div>
                    )}
                </>
            )}
        </AriaCheckbox>
    );
};
Checkbox.displayName = "Checkbox";
