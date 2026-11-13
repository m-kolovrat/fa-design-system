"use client";

import type { ReactNode, Ref } from "react";
import React from "react";
import type { TextAreaProps as AriaTextAreaProps, TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import { TextArea as AriaTextArea, TextField as AriaTextField } from "react-aria-components";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";

// The resize handle's two diagonal strokes, drawn with gradients so they take the
// `border-primary` token and switch with the theme. Each gradient fills a square whose
// anti-diagonal is one stroke: (2,2)–(10,10) and (7,7)–(11,11) on an 18-unit grid.
const resizeStroke =
    "linear-gradient(to bottom right, transparent calc(50% - 0.5px), var(--color-border-primary) calc(50% - 0.5px), var(--color-border-primary) calc(50% + 0.5px), transparent calc(50% + 0.5px))";
const resizeHandleBg = `${resizeStroke}, ${resizeStroke}`;

export interface TextAreaBaseProps extends AriaTextAreaProps {
    /** Ref to the `<textarea>` */
    ref?: Ref<HTMLTextAreaElement>;
    /** Textarea size */
    size?: "sm" | "md";
}

/** The `<textarea>` alone, for composing a custom React Aria field. */
export const TextAreaBase = ({ className, size = "sm", ...props }: TextAreaBaseProps) => {
    return (
        <AriaTextArea
            {...props}
            style={{ "--resize-handle-bg": resizeHandleBg } as React.CSSProperties}
            className={(state) =>
                cx(
                    "w-full scroll-py-3 rounded-md bg-primary text-primary ring-1 ring-primary transition ring-inset placeholder:text-placeholder autofill:rounded-md autofill:text-primary focus:outline-hidden",

                    size === "sm" && "p-3 text-sm",
                    size === "md" && "px-3.5 py-3 text-md",

                    // Resize handle
                    "[&::-webkit-resizer]:bg-(image:--resize-handle-bg) [&::-webkit-resizer]:[background-size:44.44%_44.44%,22.22%_22.22%] [&::-webkit-resizer]:[background-position:20%_20%,50%_50%] [&::-webkit-resizer]:bg-no-repeat",

                    state.isFocused && !state.isDisabled && "ring-2 ring-brand",
                    state.isDisabled && "cursor-not-allowed opacity-50",
                    state.isInvalid && "ring-error_subtle",
                    state.isInvalid && state.isFocused && "ring-2 ring-error",

                    typeof className === "function" ? className(state) : className,
                )
            }
        />
    );
};

TextAreaBase.displayName = "TextAreaBase";

export interface TextAreaProps extends AriaTextFieldProps {
    /** Label text for the textarea */
    label?: string;
    /** Helper text displayed below the textarea */
    hint?: ReactNode;
    /** Tooltip message displayed after the label. */
    tooltip?: string;
    /** Textarea size. */
    size?: TextAreaBaseProps["size"];
    /** Classes on the `<textarea>` itself (e.g. `min-h-40`) */
    textAreaClassName?: TextAreaBaseProps["className"];
    /** Ref for the textarea wrapper */
    ref?: Ref<HTMLDivElement>;
    /** Ref for the textarea */
    textAreaRef?: TextAreaBaseProps["ref"];
    /** Whether to hide required indicator from label. */
    hideRequiredIndicator?: boolean;
    /** Placeholder text. */
    placeholder?: string;
    /** Visible height of textarea in rows . */
    rows?: number;
    /** Visible width of textarea in columns. */
    cols?: number;
    /** Whether a value is required: adds `*` to the label */
    isRequired?: AriaTextFieldProps["isRequired"];
    /** Whether the textarea is invalid: the `hint` turns red */
    isInvalid?: AriaTextFieldProps["isInvalid"];
    /** Whether the textarea is disabled */
    isDisabled?: AriaTextFieldProps["isDisabled"];
    /** Whether the text can be selected but not changed */
    isReadOnly?: AriaTextFieldProps["isReadOnly"];
    /** The value (controlled) */
    value?: AriaTextFieldProps["value"];
    /** The initial value (uncontrolled) */
    defaultValue?: AriaTextFieldProps["defaultValue"];
    /** Called with the new value as a string */
    onChange?: AriaTextFieldProps["onChange"];
    /** The form field name */
    name?: AriaTextFieldProps["name"];
    /** The longest allowed text */
    maxLength?: AriaTextFieldProps["maxLength"];
    /** Classes on the outer wrapper */
    className?: AriaTextFieldProps["className"];
}

/** A multi-line text field with label, hint and tooltip. */
export const TextArea = ({
    label,
    hint,
    tooltip,
    textAreaRef,
    hideRequiredIndicator,
    textAreaClassName,
    placeholder,
    className,
    rows,
    cols,
    size = "sm",
    ...props
}: TextAreaProps) => {
    return (
        <AriaTextField
            {...props}
            className={(state) =>
                cx("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
            }
        >
            {({ isInvalid, isRequired }) => (
                <>
                    {label && (
                        <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired} tooltip={tooltip}>
                            {label}
                        </Label>
                    )}

                    <TextAreaBase placeholder={placeholder} className={textAreaClassName} ref={textAreaRef} rows={rows} cols={cols} size={size} />

                    {hint && (
                        <HintText isInvalid={isInvalid} size={size}>
                            {hint}
                        </HintText>
                    )}
                </>
            )}
        </AriaTextField>
    );
};

TextArea.displayName = "TextArea";
