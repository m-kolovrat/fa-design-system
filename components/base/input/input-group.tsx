"use client";

import { type HTMLAttributes, type ReactNode } from "react";
import { HintText } from "@/components/base/input/hint-text";
import type { TextFieldProps } from "@/components/base/input/input";
import { TextField } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { cx, sortCx } from "@/utils/cx";

export interface InputPrefixProps extends HTMLAttributes<HTMLDivElement> {
    /** The position of the prefix. */
    position?: "leading" | "trailing";
    /** Indicates that the prefix is disabled. */
    isDisabled?: boolean;
}

/** Text joined to the side of an `InputGroup` (`https://`, `NOK`). */
export const InputPrefix = ({ children, ...props }: InputPrefixProps) => (
    <span
        {...props}
        className={cx(
            "flex text-tertiary ring-1 ring-border-primary ring-inset",
            // Styles when the prefix is within an `InputGroup`
            "in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-l-md",
            "in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-r-md",
            "px-3 py-2 text-sm max-md:text-md/5",

            props.className,
        )}
    >
        {children}
    </span>
);

// `${string}ClassName` is used to omit any className prop that ends with a `ClassName` suffix
export interface InputGroupProps extends TextFieldProps {
    /** A prefix text that is displayed in the same box as the input.*/
    prefix?: string;
    /** A leading addon that is displayed with visual separation from the input. */
    leadingAddon?: ReactNode;
    /** A trailing addon that is displayed with visual separation from the input. */
    trailingAddon?: ReactNode;
    /** The class name to apply to the input group. */
    className?: string;
    /** The children of the input group (i.e `<InputBase />`) */
    children: ReactNode;
    /** Label text for the input */
    label?: string;
    /** Helper text displayed below the input */
    hint?: ReactNode;
    /** Whether to hide the required indicator from the label. */
    hideRequiredIndicator?: boolean;
}

/** An input with a prefix inside the box, or addons (`InputGroup.Prefix`, a `NativeSelect`, a `Button`) joined to it. */
export const InputGroup = ({ prefix, leadingAddon, trailingAddon, label, hint, hideRequiredIndicator, children, ...props }: InputGroupProps) => {
    const hasLeading = !!leadingAddon;
    const hasTrailing = !!trailingAddon;

    const paddings = sortCx({
        input: cx(
            // Apply padding styles when select element is passed as a child
            hasLeading && "group-has-[&>select]:pr-9 group-has-[&>select]:pl-2",
            hasTrailing && (prefix ? "group-has-[&>select]:pr-6 group-has-[&>select]:pl-0" : "group-has-[&>select]:pr-6 group-has-[&>select]:pl-3"),
        ),
        leadingText: "pr-1.5 pl-3",
    });

    return (
        <TextField
            aria-label={label || undefined}
            inputClassName={paddings.input}
            tooltipClassName={cx(hasTrailing && !hasLeading && "group-has-[&>select]:right-0")}
            wrapperClassName={cx(
                "z-10",
                // Apply styles based on the presence of leading or trailing elements
                hasLeading && "rounded-l-none",
                hasTrailing && "rounded-r-none",
                // When select element is passed as a child
                "group-has-[&>select]:bg-transparent group-has-[&>select]:shadow-none group-has-[&>select]:ring-0 group-has-[&>select]:focus-within:ring-0",
            )}
            {...props}
        >
            {({ isDisabled, isInvalid, isRequired }) => (
                <>
                    {label && <Label isRequired={hideRequiredIndicator ? false : isRequired}>{label}</Label>}

                    <div
                        className={cx(
                            "group relative flex h-max w-full flex-row justify-center rounded-md bg-primary transition",

                            // Only apply focus ring when child is select and input is focused
                            "has-[&>select]:ring-1 has-[&>select]:ring-border-primary has-[&>select]:ring-inset has-[&>select]:has-[input:focus]:ring-2 has-[&>select]:has-[input:focus]:ring-border-brand",

                            isDisabled && "cursor-not-allowed",
                            isInvalid && "has-[&>select]:ring-border-error_subtle has-[&>select]:has-[input:focus]:ring-border-error",
                        )}
                    >
                        {leadingAddon && (
                            <section data-leading={hasLeading || undefined} className="group-disabled:text-disabled">
                                {leadingAddon}
                            </section>
                        )}

                        {prefix && (
                            <span className={cx("my-auto grow group-disabled:text-disabled", paddings.leadingText)}>
                                <p className="text-sm text-tertiary max-md:text-md/5">{prefix}</p>
                            </span>
                        )}

                        {children}

                        {trailingAddon && (
                            <section data-trailing={hasTrailing || undefined} className="group-disabled:text-disabled">
                                {trailingAddon}
                            </section>
                        )}
                    </div>

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </TextField>
    );
};

InputGroup.Prefix = InputPrefix;

InputGroup.displayName = "InputGroup";
