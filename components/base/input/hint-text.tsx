"use client";

import type { ReactNode, Ref } from "react";
import type { TextProps as AriaTextProps } from "react-aria-components";
import { Text as AriaText } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface HintTextProps extends AriaTextProps {
    /** Indicates that the hint text is an error message. */
    isInvalid?: boolean;
    /** Ref to the text element */
    ref?: Ref<HTMLElement>;
    /** The text size */
    size?: "sm" | "md";
    /** The hint text */
    children: ReactNode;
}

/** The text below a field; red when `isInvalid`. For composing a custom React Aria field. */
export const HintText = ({ isInvalid, className, size = "md", ...props }: HintTextProps) => {
    return (
        <AriaText
            {...props}
            slot={isInvalid ? "errorMessage" : "description"}
            className={cx(
                "text-sm text-tertiary",

                // Size
                size === "sm" && "text-xs",
                "in-data-[input-size=sm]:text-xs",

                // Invalid state
                isInvalid && "text-error-primary",
                "group-invalid:text-error-primary",

                className,
            )}
        />
    );
};

HintText.displayName = "HintText";
