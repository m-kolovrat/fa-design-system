"use client";

import { type ReactNode, type Ref, createContext, useContext } from "react";
import { ChevronDown, ChevronUp, Minus, Plus } from "fa-icons";
import {
    Button as AriaButton,
    type DateFieldProps as AriaDateFieldProps,
    Group as AriaGroup,
    Input as AriaInput,
    type InputProps as AriaInputProps,
    NumberField as AriaNumberField,
    type NumberFieldProps as AriaNumberFieldProps,
    type DateValue,
} from "react-aria-components";
import { cx } from "@/utils/cx";
import { Button } from "../buttons/button";
import { HintText } from "./hint-text";
import { Label } from "./label";

const NumberFieldContext = createContext<{
    size?: "sm" | "md" | "lg";
    wrapperClassName?: string;
    iconClassName?: string;
    tooltipClassName?: string;
    inputClassName?: string;
}>({});

const styles = {
    sm: "px-3 py-2 text-sm",
    md: "px-3 py-2 text-md",
    lg: "px-3.5 py-2.5 text-md",
};

export interface InputNumberBaseProps extends AriaNumberFieldProps {
    /**
     * Input size: `sm` 36px, `md` 40px, `lg` 44px.
     * @default md
     */
    size?: "sm" | "md" | "lg";
    /** Placeholder text. */
    placeholder?: string;
    /** Class name for the input. */
    inputClassName?: string;
    /** Class name for the input wrapper. */
    wrapperClassName?: string;
    /** Ref to the input. */
    ref?: Ref<HTMLInputElement>;
    /** Ref to the box around the input. */
    groupRef?: Ref<HTMLDivElement>;
    /** Where the steppers sit: `vertical` (chevrons on the right) or `horizontal` (− and + on each side). */
    orientation?: "horizontal" | "vertical";
}

export const InputNumberBase = ({
    ref,
    groupRef,
    size = "md",
    isInvalid,
    isDisabled,
    placeholder,
    wrapperClassName,
    inputClassName,
    orientation = "vertical",
    // Omit this prop to avoid invalid HTML attribute warning
    isRequired: _isRequired,
    ...inputProps
}: Omit<InputNumberBaseProps, "label" | "hint">) => {
    // If the input is inside a `TextFieldContext`, use its context to simplify applying styles
    const context = useContext(NumberFieldContext);

    const inputSize = context?.size || size;

    return (
        <AriaGroup
            {...{ isDisabled, isInvalid }}
            ref={groupRef}
            className={({ isFocusWithin, isDisabled, isInvalid }) =>
                cx(
                    "relative flex w-full flex-row items-stretch rounded-md bg-primary outline-1 -outline-offset-1 outline-primary transition",

                    isFocusWithin && !isDisabled && "outline-2 -outline-offset-2 outline-brand",

                    // Disabled state styles
                    isDisabled && "cursor-not-allowed opacity-50 in-data-input-wrapper:opacity-100",
                    "group-disabled:cursor-not-allowed group-disabled:opacity-50 in-data-input-wrapper:group-disabled:opacity-100",

                    // Invalid state styles
                    isInvalid && "outline-error_subtle",
                    "group-invalid:outline-error_subtle",

                    // Invalid state with focus-within styles
                    isInvalid && isFocusWithin && "outline-2 -outline-offset-2 outline-error",
                    isFocusWithin && "group-invalid:outline-2 group-invalid:-outline-offset-2 group-invalid:outline-error",

                    context?.wrapperClassName,
                    wrapperClassName,
                )
            }
        >
            {orientation === "horizontal" && (
                <Button size={size} iconLeading={Minus} slot="decrement" color="tertiary" className="static h-full rounded-r-none" />
            )}

            {/* Input field */}
            <AriaInput
                {...(inputProps as AriaInputProps)}
                ref={ref}
                placeholder={placeholder}
                className={cx(
                    "m-0 w-full bg-transparent text-primary ring-0 outline-hidden placeholder:text-placeholder autofill:rounded-md autofill:text-primary disabled:cursor-not-allowed",
                    orientation === "horizontal" && "text-center",
                    styles[inputSize],
                    context?.inputClassName,
                    inputClassName,
                )}
            />

            {orientation === "horizontal" && (
                <Button size={size} iconLeading={Plus} slot="increment" color="tertiary" className="static h-full rounded-l-none" />
            )}

            {orientation === "vertical" && (
                <div className={cx("flex w-7 shrink-0 flex-col border-l border-primary", size === "lg" && "w-7.5")}>
                    <AriaButton
                        slot="increment"
                        className="flex flex-1 cursor-pointer items-center justify-center text-fg-quaternary outline-brand transition hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronUp className={cx("size-3", size === "lg" && "size-3.5")} />
                    </AriaButton>
                    <AriaButton
                        slot="decrement"
                        className="flex flex-1 cursor-pointer items-center justify-center border-t border-primary text-fg-quaternary outline-brand transition hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronDown className={cx("size-3", size === "lg" && "size-3.5")} />
                    </AriaButton>
                </div>
            )}
        </AriaGroup>
    );
};

export interface InputNumberProps extends InputNumberBaseProps, Pick<AriaDateFieldProps<DateValue>, "granularity"> {
    /** Label text for the input */
    label?: string;
    /** Helper text displayed below the input */
    hint?: ReactNode;
    /** Whether to hide required indicator from label */
    hideRequiredIndicator?: boolean;
    /** Has no effect on a number field */
    granularity?: AriaDateFieldProps<DateValue>["granularity"];
    /** The number (controlled) */
    value?: AriaNumberFieldProps["value"];
    /** The initial number (uncontrolled) */
    defaultValue?: AriaNumberFieldProps["defaultValue"];
    /** Called with the new number */
    onChange?: AriaNumberFieldProps["onChange"];
    /** The smallest allowed value; steppers and arrow keys respect it */
    minValue?: AriaNumberFieldProps["minValue"];
    /** The largest allowed value */
    maxValue?: AriaNumberFieldProps["maxValue"];
    /** The amount the steppers and arrow keys change the value by */
    step?: AriaNumberFieldProps["step"];
    /** `Intl.NumberFormatOptions`: `{ style: "currency", currency: "NOK" }`, `{ style: "percent" }` */
    formatOptions?: AriaNumberFieldProps["formatOptions"];
    /** Whether the field is required: adds `*` to the label */
    isRequired?: AriaNumberFieldProps["isRequired"];
    /** Whether the field is invalid */
    isInvalid?: AriaNumberFieldProps["isInvalid"];
    /** Whether the field is disabled */
    isDisabled?: AriaNumberFieldProps["isDisabled"];
}

/** A number with stepper buttons and locale formatting; React Aria `NumberField`. */
export const InputNumber = ({
    size = "md",
    placeholder,
    label,
    hint,
    hideRequiredIndicator,
    className,
    ref,
    groupRef,
    inputClassName,
    wrapperClassName,
    orientation = "vertical",
    ...props
}: InputNumberProps) => {
    return (
        <AriaNumberField
            {...props}
            className={(state) =>
                cx("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
            }
        >
            {({ isInvalid, isRequired }) => (
                <>
                    {label && (
                        <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired} isInvalid={isInvalid}>
                            {label}
                        </Label>
                    )}

                    <InputNumberBase
                        {...{
                            ref,
                            groupRef,
                            size,
                            placeholder,
                            inputClassName,
                            wrapperClassName,
                            orientation,
                        }}
                    />

                    {hint && (
                        <HintText isInvalid={isInvalid} className={cx(size === "sm" && "text-xs")}>
                            {hint}
                        </HintText>
                    )}
                </>
            )}
        </AriaNumberField>
    );
};
