"use client";

import { type ComponentType, type HTMLAttributes, type ReactNode, type Ref, createContext, useContext, useState } from "react";
import { Eye, EyeOff, Help, Info } from "fa-icons";
import type { InputProps as AriaInputProps, TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import { Button as AriaButton, Group as AriaGroup, Input as AriaInput, TextField as AriaTextField } from "react-aria-components";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx, sortCx } from "@/utils/cx";
import { strings } from "@/utils/strings";

export interface InputBaseProps extends Omit<AriaInputProps, "size"> {
    /** Tooltip message on hover. */
    tooltip?: string;
    /** Whether the input is invalid. */
    isInvalid?: boolean;
    /** Whether the input is disabled. */
    isDisabled?: boolean;
    /** Whether the input is required. */
    isRequired?: boolean;
    /** Placeholder text. */
    placeholder?: string;
    /** Class name for the icon. */
    iconClassName?: string;
    /** Class name for the input. */
    inputClassName?: string;
    /** Class name for the input wrapper. */
    wrapperClassName?: string;
    /** Class name for the tooltip. */
    tooltipClassName?: string;
    /** Keyboard shortcut to display; `true` shows "⌘K". */
    shortcut?: string | boolean;
    /** Ref to the `<input>`. */
    ref?: Ref<HTMLInputElement>;
    /** Ref to the box around the input. */
    groupRef?: Ref<HTMLDivElement>;
    /** Icon component to display on the left side of the input. */
    icon?: ComponentType<HTMLAttributes<HTMLOrSVGElement>>;
}

/** The input box alone (no label or hint), for composing a custom React Aria field or an `InputGroup`. */
export const InputBase = ({
    ref,
    tooltip,
    shortcut,
    groupRef,
    isInvalid,
    isDisabled,
    isRequired,
    icon: Icon,
    placeholder,
    wrapperClassName,
    tooltipClassName,
    inputClassName,
    iconClassName,
    type = "text",
    ...inputProps
}: InputBaseProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Check if the input has a leading icon or tooltip
    const hasTrailingIcon = tooltip || isInvalid;
    const hasLeadingIcon = Icon;

    // If the input is inside a `TextFieldContext`, use its context to simplify applying styles
    const context = useContext(TextFieldContext);

    // One size (Figma Input field, 2026-11-27): 36px, Text sm, 16px icons. Below `md` the text is
    // 16px on a 20px line (same 36px height): iOS zooms the page into any field under 16px.
    const styles = sortCx({
        root: cx("px-3 py-2 text-sm max-md:text-md/5", hasLeadingIcon && "pl-9", hasTrailingIcon && "pr-9"),
        iconLeading: "left-3 size-4",
        iconTrailing: "right-3",
        shortcut: "pr-1.5",
    });

    return (
        <AriaGroup
            {...{ isDisabled, isInvalid }}
            ref={groupRef}
            className={({ isFocusWithin, isDisabled, isInvalid }) =>
                cx(
                    "group/input relative flex w-full flex-row place-content-center place-items-center rounded-md bg-primary ring-1 ring-primary transition-shadow ring-inset",

                    isFocusWithin && !isDisabled && "ring-2 ring-brand",

                    // Disabled state styles
                    // Figma Input field State=Disabled: bg-disabled_subtle fill, border-disabled, text-disabled value, fg-disabled leading icon.
                    isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled",
                    "group-disabled:cursor-not-allowed group-disabled:bg-disabled_subtle group-disabled:ring-disabled",

                    // Invalid state styles
                    isInvalid && "ring-error_subtle",
                    "group-invalid:ring-error_subtle",

                    // Invalid state with focus-within styles
                    isInvalid && isFocusWithin && "ring-2 ring-error",
                    isFocusWithin && "group-invalid:ring-2 group-invalid:ring-error",

                    context?.wrapperClassName,
                    wrapperClassName,
                )
            }
        >
            {/* Leading icon and Payment icon */}
            {Icon && (
                <Icon
                    className={cx(
                        "pointer-events-none absolute text-fg-quaternary group-data-disabled/input:text-fg-disabled",
                        styles.iconLeading,
                        context?.iconClassName,
                        iconClassName,
                    )}
                />
            )}

            {/* Input field */}
            <AriaInput
                {...(inputProps as AriaInputProps)}
                ref={ref}
                required={isRequired}
                type={type === "password" && isPasswordVisible ? "text" : type}
                placeholder={placeholder}
                className={cx(
                    "m-0 w-full bg-transparent text-primary ring-0 outline-hidden placeholder:text-placeholder autofill:rounded-md autofill:text-primary disabled:cursor-not-allowed disabled:text-disabled",
                    styles.root,
                    context?.inputClassName,
                    inputClassName,
                )}
            />

            {/* Tooltip and help icon */}
            {tooltip && type !== "password" && (
                <Tooltip title={tooltip} placement="top">
                    <TooltipTrigger
                        aria-label={tooltip}
                        className={cx(
                            "absolute cursor-pointer text-fg-quaternary outline-focus-ring transition group-invalid/input:hidden hover:text-fg-quaternary_hover focus-visible:text-fg-quaternary_hover",
                            styles.iconTrailing,
                            context?.tooltipClassName,
                            tooltipClassName,
                        )}
                    >
                        <Help className="size-4" />
                    </TooltipTrigger>
                </Tooltip>
            )}

            {/* Invalid icon */}
            {type !== "password" && (
                <Info
                    className={cx(
                        "pointer-events-none absolute hidden size-4 text-fg-error-secondary group-invalid/input:block",
                        styles.iconTrailing,
                        context?.tooltipClassName,
                        tooltipClassName,
                    )}
                />
            )}

            {/* Password visibility toggle */}
            {type === "password" && (
                <AriaButton
                    aria-label={strings.input.togglePassword}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className={cx(
                        "absolute flex cursor-pointer items-center justify-center text-fg-quaternary outline-focus-ring transition hover:text-fg-quaternary_hover focus-visible:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
                        styles.iconTrailing,
                    )}
                >
                    {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </AriaButton>
            )}

            {/* Shortcut */}
            {shortcut && (
                <div
                    className={cx(
                        "pointer-events-none absolute inset-y-0.5 right-0.5 z-10 hidden items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-bg-primary to-40% pl-8 md:flex",
                        styles.shortcut,
                    )}
                >
                    <span
                        aria-hidden="true"
                        className="pointer-events-none rounded px-1 py-px text-xs font-medium text-quaternary ring-1 ring-secondary select-none ring-inset"
                    >
                        {typeof shortcut === "string" ? shortcut : "⌘K"}
                    </span>
                </div>
            )}
        </AriaGroup>
    );
};

InputBase.displayName = "InputBase";

interface TextFieldContextProps extends Partial<Pick<InputBaseProps, "wrapperClassName" | "inputClassName" | "iconClassName" | "tooltipClassName">> {}

const TextFieldContext = createContext<TextFieldContextProps>({});

export interface TextFieldProps extends AriaTextFieldProps, TextFieldContextProps {}

export const TextField = ({ className, inputClassName, wrapperClassName, iconClassName, tooltipClassName, ...props }: TextFieldProps) => {
    return (
        <TextFieldContext.Provider value={{ inputClassName, wrapperClassName, iconClassName, tooltipClassName }}>
            <AriaTextField
                {...props}
                data-input-wrapper
                className={(state) =>
                    cx("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
                }
            />
        </TextFieldContext.Provider>
    );
};

TextField.displayName = "TextField";

export interface InputProps
    extends
        AriaTextFieldProps,
        Pick<
            InputBaseProps,
            "ref" | "placeholder" | "icon" | "shortcut" | "tooltip" | "groupRef" | "wrapperClassName" | "inputClassName" | "iconClassName" | "tooltipClassName"
        > {
    /** Label text for the input */
    label?: string;
    /** Helper text displayed below the input */
    hint?: ReactNode;
    /** Whether to hide required indicator from label */
    hideRequiredIndicator?: boolean;
    /** Whether the input is required: adds `*` to the label */
    isRequired?: AriaTextFieldProps["isRequired"];
    /** Whether the input is invalid: red border, and the `hint` turns red */
    isInvalid?: AriaTextFieldProps["isInvalid"];
    /** Whether the input is disabled (Figma's disabled tokens) */
    isDisabled?: AriaTextFieldProps["isDisabled"];
    /** Whether the value can be selected but not changed */
    isReadOnly?: AriaTextFieldProps["isReadOnly"];
    /**
     * The input type (`email`, `password`, `search`, …)
     * @default text
     */
    type?: AriaTextFieldProps["type"];
    /** The value (controlled) */
    value?: AriaTextFieldProps["value"];
    /** The initial value (uncontrolled) */
    defaultValue?: AriaTextFieldProps["defaultValue"];
    /** Called with the new value as a string */
    onChange?: AriaTextFieldProps["onChange"];
    /** The form field name */
    name?: AriaTextFieldProps["name"];
    /** Classes on the outer wrapper: width, grid placement */
    className?: AriaTextFieldProps["className"];
}

/** A single-line text field with label, hint, optional leading icon, tooltip and shortcut. */
export const Input = ({
    placeholder,
    icon: Icon,
    label,
    hint,
    shortcut,
    hideRequiredIndicator,
    className,
    ref,
    groupRef,
    tooltip,
    iconClassName,
    inputClassName,
    wrapperClassName,
    tooltipClassName,
    type = "text",
    ...props
}: InputProps) => {
    return (
        <TextField aria-label={!label ? placeholder : undefined} {...props} className={className}>
            {({ isRequired, isInvalid }) => (
                <>
                    {label && (
                        <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired} isInvalid={isInvalid}>
                            {label}
                        </Label>
                    )}

                    <InputBase
                        {...{
                            ref,
                            groupRef,
                            placeholder,
                            icon: Icon,
                            shortcut,
                            iconClassName,
                            inputClassName,
                            wrapperClassName,
                            tooltipClassName,
                            tooltip,
                            type,
                        }}
                    />

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </TextField>
    );
};

Input.displayName = "Input";
