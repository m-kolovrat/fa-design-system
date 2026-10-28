"use client";

import { type ReactNode, type Ref, createContext, useContext } from "react";
import {
    Radio as AriaRadio,
    RadioGroup as AriaRadioGroup,
    type RadioGroupProps as AriaRadioGroupProps,
    type RadioProps as AriaRadioProps,
} from "react-aria-components";
import { cx } from "@/utils/cx";

export interface RadioGroupContextType {
    size?: "sm" | "md";
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export interface RadioButtonBaseProps {
    /** The size variant: `sm` 16px, `md` 20px */
    size?: "sm" | "md";
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
export const RadioButtonBase = ({ className, isFocusVisible, isSelected, isDisabled, size = "sm" }: RadioButtonBaseProps) => {
    return (
        <div
            className={cx(
                "flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full bg-primary ring-1 ring-primary ring-inset",
                size === "md" && "size-5",
                isSelected && "bg-brand-solid ring-brand-solid",
                isDisabled && "cursor-not-allowed opacity-50",
                isDisabled && !isSelected && "bg-tertiary",
                isFocusVisible && "outline-2 outline-offset-2 outline-focus-ring",
                className,
            )}
        >
            <div className={cx("size-1.5 rounded-full bg-fg-white opacity-0 transition-inherit-all", size === "md" && "size-2", isSelected && "opacity-100")} />
        </div>
    );
};
RadioButtonBase.displayName = "RadioButtonBase";

export interface RadioButtonProps extends AriaRadioProps {
    /** The size variant; inside a `RadioGroup` the group's `size` wins */
    size?: "sm" | "md";
    /** The option's label */
    label?: ReactNode;
    /** One line of explanation below the label */
    hint?: ReactNode;
    /** Ref to the `<label>` */
    ref?: Ref<HTMLLabelElement>;
    /** The value the group reports when this option is chosen (required) */
    value: AriaRadioProps["value"];
    /** Disables this option (`opacity-50`) */
    isDisabled?: AriaRadioProps["isDisabled"];
}

/** One option in a `RadioGroup`, with a label and hint. */
export const RadioButton = ({ label, hint, className, size = "sm", ...ariaRadioProps }: RadioButtonProps) => {
    const context = useContext(RadioGroupContext);

    size = context?.size ?? size;

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
        <AriaRadio
            {...ariaRadioProps}
            className={(state) =>
                cx(
                    "relative flex items-start",
                    state.isDisabled && "cursor-not-allowed",
                    sizes[size].root,
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {({ isSelected, isDisabled, isFocusVisible }) => (
                <>
                    <RadioButtonBase
                        size={size}
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        isFocusVisible={isFocusVisible}
                        className={label || hint ? "mt-0.5" : ""}
                    />
                    {(label || hint) && (
                        <div className={cx("inline-flex flex-col", sizes[size].textWrapper)}>
                            {label && <p className={cx("text-secondary select-none", sizes[size].label)}>{label}</p>}
                            {hint && (
                                <span className={cx("text-tertiary", sizes[size].hint)} onClick={(event) => event.stopPropagation()}>
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

export interface RadioGroupProps extends RadioGroupContextType, AriaRadioGroupProps {
    /**
     * The size of every `RadioButton` in it: `sm` 16px, `md` 20px
     * @default sm
     */
    size?: "sm" | "md";
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
export const RadioGroup = ({ children, className, size = "sm", ...props }: RadioGroupProps) => {
    return (
        <RadioGroupContext.Provider value={{ size }}>
            <AriaRadioGroup {...props} className={cx("flex flex-col gap-4", className)}>
                {children}
            </AriaRadioGroup>
        </RadioGroupContext.Provider>
    );
};
// react-docgen-typescript gives every function in this file the first `.displayName` it finds unless
// the function sets its own; without this, RadioGroup is documented as "RadioButtonBase" and dropped.
RadioGroup.displayName = "RadioGroup";
