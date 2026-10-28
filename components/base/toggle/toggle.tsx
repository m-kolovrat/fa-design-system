"use client";

import type { ReactNode } from "react";
import type { SwitchProps as AriaSwitchProps } from "react-aria-components";
import { Switch as AriaSwitch } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface ToggleBaseProps {
    /** The size variant: `sm` 36×20, `md` 44×24 */
    size?: "sm" | "md";
    /** Thinner track with a bordered knob */
    slim?: boolean;
    /** Layout classes only */
    className?: string;
    /** Draws the hover state (pass the parent's state) */
    isHovered?: boolean;
    /** Draws the focus ring (pass the parent's state) */
    isFocusVisible?: boolean;
    /** Draws it on */
    isSelected?: boolean;
    /** Draws the disabled look */
    isDisabled?: boolean;
}

/** The visual switch only, used inside `Dropdown` items (`selectionIndicator="toggle"`); not a control on its own. */
export const ToggleBase = ({ className, isHovered, isDisabled, isFocusVisible, isSelected, slim, size = "sm" }: ToggleBaseProps) => {
    const styles = {
        default: {
            sm: {
                root: "h-5 w-9 p-0.5",
                switch: cx("size-4", isSelected && "translate-x-4"),
            },
            md: {
                root: "h-6 w-11 p-0.5",
                switch: cx("size-5", isSelected && "translate-x-5"),
            },
        },
        slim: {
            sm: {
                root: "h-4 w-8",
                switch: cx("size-4", isSelected && "translate-x-4"),
            },
            md: {
                root: "h-5 w-10",
                switch: cx("size-5", isSelected && "translate-x-5"),
            },
        },
    };

    const classes = slim ? styles.slim[size] : styles.default[size];

    return (
        <div
            className={cx(
                "cursor-pointer rounded-full bg-tertiary ring-[0.5px] ring-secondary outline-focus-ring transition ring-inset",
                isSelected && "bg-brand-solid",
                isSelected && isHovered && "bg-brand-solid_hover",
                isDisabled && "cursor-not-allowed opacity-50",
                isFocusVisible && "outline-2 outline-offset-2",

                slim && "ring-1",
                slim && isSelected && "ring-transparent",
                classes.root,
                className,
            )}
        >
            <div
                className={cx(
                    // The knob's travel is the state change itself, so it keeps its motion
                    // while every hover in the library is instant.
                    "rounded-full bg-fg-white shadow-sm transition duration-moderate ease-in-out",

                    slim && "shadow-xs",
                    slim && "border border-toggle-border",
                    slim && isSelected && "border-toggle-slim-border_pressed",
                    slim && isSelected && isHovered && "border-toggle-slim-border_pressed-hover",

                    classes.switch,
                )}
            />
        </div>
    );
};

const styles = {
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

export interface ToggleProps extends AriaSwitchProps {
    /** The size variant: `sm` 36×20, `md` 44×24 */
    size?: "sm" | "md";
    /** The label next to the switch. Without it, pass an `aria-label` */
    label?: string;
    /** One line of explanation below the label */
    hint?: ReactNode;
    /** Thinner track with a bordered knob */
    slim?: boolean;
    /** Whether it is on (controlled) */
    isSelected?: AriaSwitchProps["isSelected"];
    /** Whether it is on at first (uncontrolled) */
    defaultSelected?: AriaSwitchProps["defaultSelected"];
    /** Called with the new state */
    onChange?: AriaSwitchProps["onChange"];
    /** Disables the toggle (`opacity-50`) */
    isDisabled?: AriaSwitchProps["isDisabled"];
    /** Shows the state but can't be changed */
    isReadOnly?: AriaSwitchProps["isReadOnly"];
    /** The form field name */
    name?: AriaSwitchProps["name"];
    /** The value sent with the form when on */
    value?: AriaSwitchProps["value"];
}

/** A switch for a setting that applies at once, with an optional label and hint. */
export const Toggle = ({ label, hint, className, size = "sm", slim, ...ariaSwitchProps }: ToggleProps) => {
    return (
        <AriaSwitch
            {...ariaSwitchProps}
            className={(state) =>
                cx(
                    "relative flex w-max items-start",
                    state.isDisabled && "cursor-not-allowed",
                    styles[size].root,
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {({ isSelected, isDisabled, isFocusVisible, isHovered }) => (
                <>
                    <ToggleBase
                        slim={slim}
                        size={size}
                        isHovered={isHovered}
                        isDisabled={isDisabled}
                        isFocusVisible={isFocusVisible}
                        isSelected={isSelected}
                        className={slim ? "mt-0.5" : ""}
                    />

                    {(label || hint) && (
                        <div className={cx("flex flex-col", styles[size].textWrapper)}>
                            {label && <p className={cx("text-secondary select-none", styles[size].label)}>{label}</p>}
                            {hint && (
                                <span className={cx("text-tertiary", styles[size].hint)} onClick={(event) => event.stopPropagation()}>
                                    {hint}
                                </span>
                            )}
                        </div>
                    )}
                </>
            )}
        </AriaSwitch>
    );
};
