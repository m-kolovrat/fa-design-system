"use client";

import type { ReactNode, Ref } from "react";
import {
    Radio as AriaRadio,
    RadioGroup as AriaRadioGroup,
    type RadioGroupProps as AriaRadioGroupProps,
    type RadioProps as AriaRadioProps,
} from "react-aria-components";
import { cx } from "@/utils/cx";

export interface RadioButtonBaseProps {
    /** Layout classes only */
    className?: string;
    /** Draws the focus ring (pass the parent's state) */
    isFocusVisible?: boolean;
    /** Draws the dot */
    isSelected?: boolean;
    /** Draws the disabled look */
    isDisabled?: boolean;
}

/** The visual circle only, for use inside other components (menus, cards); not a control on its own. */
export const RadioButtonBase = ({ className, isFocusVisible, isSelected, isDisabled }: RadioButtonBaseProps) => {
    return (
        <div
            className={cx(
                "flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full bg-primary ring-1 ring-primary ring-inset",
                isSelected && "bg-brand-solid ring-brand-solid",
                // Figma _Checkbox base Type=Radio State=Disabled: bg-disabled_subtle, border-disabled, dot in fg-disabled_subtle.
                isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled",
                isFocusVisible && "outline-2 outline-offset-2 outline-focus-ring",
                className,
            )}
        >
            <div
                className={cx(
                    "size-1.5 rounded-full bg-fg-white opacity-0 transition-inherit-all",
                    isSelected && "opacity-100",
                    isDisabled && "bg-fg-disabled_subtle",
                )}
            />
        </div>
    );
};
RadioButtonBase.displayName = "RadioButtonBase";

export interface RadioButtonProps extends AriaRadioProps {
    /** The option's label */
    label?: ReactNode;
    /** One line of explanation below the label */
    hint?: ReactNode;
    /** Ref to the `<label>` */
    ref?: Ref<HTMLLabelElement>;
    /** The value the group reports when this option is chosen (required) */
    value: AriaRadioProps["value"];
    /** Disables this option (Figma's disabled tokens) */
    isDisabled?: AriaRadioProps["isDisabled"];
}

/** One option in a `RadioGroup`, with a label and hint. */
export const RadioButton = ({ label, hint, className, ...ariaRadioProps }: RadioButtonProps) => {
    return (
        <AriaRadio
            {...ariaRadioProps}
            className={(state) =>
                cx("relative flex items-start gap-2", state.isDisabled && "cursor-not-allowed", typeof className === "function" ? className(state) : className)
            }
        >
            {({ isSelected, isDisabled, isFocusVisible }) => (
                <>
                    <RadioButtonBase
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        isFocusVisible={isFocusVisible}
                        className={label || hint ? "mt-0.5" : ""}
                    />
                    {(label || hint) && (
                        <div className="inline-flex flex-col">
                            {label && <p className="text-sm font-medium text-secondary select-none">{label}</p>}
                            {hint && (
                                <span className="text-sm text-tertiary" onClick={(event) => event.stopPropagation()}>
                                    {hint}
                                </span>
                            )}
                        </div>
                    )}
                </>
            )}
        </AriaRadio>
    );
};
RadioButton.displayName = "RadioButton";

export interface RadioGroupProps extends AriaRadioGroupProps {
    /** The `RadioButton`s */
    children: ReactNode;
    /** Layout classes; the options stack with `gap-4` */
    className?: string;
    /** The chosen value (controlled) */
    value?: AriaRadioGroupProps["value"];
    /** The initially chosen value (uncontrolled) */
    defaultValue?: AriaRadioGroupProps["defaultValue"];
    /** Called with the chosen value */
    onChange?: AriaRadioGroupProps["onChange"];
    /** The form field name */
    name?: AriaRadioGroupProps["name"];
    /** Disables every option */
    isDisabled?: AriaRadioGroupProps["isDisabled"];
    /** Marks the choice required for form validation */
    isRequired?: AriaRadioGroupProps["isRequired"];
    /** Marks the group invalid */
    isInvalid?: AriaRadioGroupProps["isInvalid"];
    /** Changes only the arrow-key direction; the options always stack vertically */
    orientation?: AriaRadioGroupProps["orientation"];
}

/** A set of `RadioButton`s of which one can be chosen. Name it with `aria-label` or a visible heading. */
export const RadioGroup = ({ children, className, ...props }: RadioGroupProps) => {
    return (
        <AriaRadioGroup {...props} className={cx("flex flex-col gap-4", className)}>
            {children}
        </AriaRadioGroup>
    );
};
// react-docgen-typescript gives every function in this file the first `.displayName` it finds unless
// the function sets its own; without this, RadioGroup is documented as "RadioButtonBase" and dropped.
RadioGroup.displayName = "RadioGroup";
