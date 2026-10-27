"use client";

import type { ReactNode, Ref } from "react";
import { Help } from "fa-icons";
import type { LabelProps as AriaLabelProps } from "react-aria-components";
import { Label as AriaLabel } from "react-aria-components";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils/cx";

export interface LabelProps extends AriaLabelProps {
    /** The label text */
    children: ReactNode;
    /** Colors the `*` red (inside a field it follows the field's state) */
    isInvalid?: boolean;
    /** Adds the `*` required indicator */
    isRequired?: boolean;
    /** Adds a help icon with this tooltip after the label */
    tooltip?: string;
    /** The tooltip's second line */
    tooltipDescription?: string;
    /** Ref to the `<label>` */
    ref?: Ref<HTMLLabelElement>;
}

/** The field label, for composing a custom React Aria field; it links up through React Aria slots. */
export const Label = ({ isInvalid, isRequired, tooltip, tooltipDescription, className, ...props }: LabelProps) => {
    return (
        <AriaLabel
            // Used for conditionally hiding/showing the label element via CSS:
            // <Input label="Visible only on mobile" className="lg:**:data-label:hidden" />
            // or
            // <Input label="Visible only on mobile" className="lg:label:hidden" />
            data-label="true"
            {...props}
            className={cx("flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary", className)}
        >
            {props.children}

            <span
                className={cx(
                    "hidden text-secondary",
                    isRequired && "block",
                    typeof isRequired === "undefined" && "group-required:block",

                    isInvalid && "text-error-primary",
                    typeof isInvalid === "undefined" && "group-invalid:text-error-primary",
                )}
            >
                *
            </span>

            {tooltip && (
                <Tooltip title={tooltip} description={tooltipDescription} placement="top">
                    <TooltipTrigger
                        // `TooltipTrigger` inherits the disabled state from the parent form field
                        // but we don't that. We want the tooltip be enabled even if the parent
                        // field is disabled.
                        isDisabled={false}
                        className="cursor-pointer text-fg-quaternary transition hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover"
                    >
                        <Help className="size-4" />
                    </TooltipTrigger>
                </Tooltip>
            )}
        </AriaLabel>
    );
};

Label.displayName = "Label";
