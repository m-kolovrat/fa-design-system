"use client";

import type { ReactNode, Ref } from "react";
import { Help } from "fa-icons";
import type { LabelProps as AriaLabelProps } from "react-aria-components";
import { Label as AriaLabel } from "react-aria-components";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils/cx";

interface LabelProps extends AriaLabelProps {
    children: ReactNode;
    isInvalid?: boolean;
    isRequired?: boolean;
    tooltip?: string;
    tooltipDescription?: string;
    /**
     * Accessible name for the help icon button that opens the tooltip.
     * @default the `tooltip` text
     */
    tooltipLabel?: string;
    ref?: Ref<HTMLLabelElement>;
}

export const Label = ({ isInvalid, isRequired, tooltip, tooltipDescription, tooltipLabel, className, ...props }: LabelProps) => {
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
                        aria-label={tooltipLabel ?? tooltip}
                        // `focus-visible:outline-solid` overrides the `outline-hidden` that `TooltipTrigger` sets by default.
                        className="cursor-pointer text-fg-quaternary outline-focus-ring transition hover:text-fg-quaternary_hover focus-visible:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
                    >
                        <Help className="size-4" />
                    </TooltipTrigger>
                </Tooltip>
            )}
        </AriaLabel>
    );
};

Label.displayName = "Label";
