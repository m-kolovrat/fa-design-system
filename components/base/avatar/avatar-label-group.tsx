"use client";

import { type ReactNode } from "react";
import { cx } from "@/utils/cx";
import { Avatar, type AvatarProps } from "./avatar";

// Figma: avatar-to-text gap grows with size (8 / 8 / 12 / 16px).
const styles = {
    sm: { root: "gap-2", title: "text-sm", subtitle: "text-xs" },
    md: { root: "gap-2", title: "text-sm", subtitle: "text-sm" },
    lg: { root: "gap-3", title: "text-md", subtitle: "text-md" },
    xl: { root: "gap-4", title: "text-lg", subtitle: "text-md" },
};

interface AvatarLabelGroupProps extends AvatarProps {
    size: "sm" | "md" | "lg" | "xl";
    rounded?: boolean;
    title: string | ReactNode;
    subtitle: string | ReactNode;
    avatarClassName?: string;
}

export const AvatarLabelGroup = ({ title, subtitle, className, rounded, avatarClassName, ...props }: AvatarLabelGroupProps) => {
    return (
        <figure className={cx("group flex min-w-0 flex-1 items-center", styles[props.size].root, className)}>
            <Avatar border rounded={rounded} className={avatarClassName} {...props} />
            <figcaption className="min-w-0 flex-1">
                <p className={cx("font-semibold text-primary", styles[props.size].title)}>{title}</p>
                <p className={cx("truncate text-tertiary", styles[props.size].subtitle)}>{subtitle}</p>
            </figcaption>
        </figure>
    );
};
