"use client";

import { Plus } from "fa-icons";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Tooltip as AriaTooltip, TooltipTrigger as AriaTooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils/cx";

const sizes = {
    xs: { root: "size-6", icon: "size-4" },
    sm: { root: "size-8", icon: "size-4" },
    md: { root: "size-10", icon: "size-5" },
};

export interface AvatarAddButtonProps extends AriaButtonProps {
    /** The size variant (required), matching the avatars next to it */
    size: "xs" | "sm" | "md";
    /** The tooltip and accessible name. Defaults to English "Add user", so always pass one */
    title?: string;
    className?: string;
}

/** The "+" button at the end of a row of avatars, with a tooltip. */
export const AvatarAddButton = ({ size, className, title = "Add user", ...props }: AvatarAddButtonProps) => (
    <AriaTooltip title={title}>
        <AriaTooltipTrigger
            {...props}
            aria-label={title}
            className={cx(
                "flex cursor-pointer items-center justify-center rounded-full border border-dashed border-primary bg-primary text-fg-quaternary outline-focus-ring transition hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50",
                sizes[size].root,
                className,
            )}
        >
            <Plus className={cx("text-current transition-inherit-all", sizes[size].icon)} />
        </AriaTooltipTrigger>
    </AriaTooltip>
);
