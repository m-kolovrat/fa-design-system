"use client";

import type { FC, ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle, InfoCircle } from "@untitledui/icons";
import { CloseButton } from "@/components/base/buttons/close-button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

/*
 * Figma: "Alert" — Color (Default, Gray, Error, Warning, Success, Brand) × Size (Floating, Full-width),
 * with the desktop and mobile breakpoints handled responsively. Color only changes the icon:
 * Default uses the gray "modern" featured icon, the rest use the outline featured icon in that color.
 */

export type AlertColor = "default" | "gray" | "error" | "warning" | "success" | "brand";

const defaultIcons: Record<AlertColor, FC<{ className?: string }>> = {
    default: InfoCircle,
    gray: InfoCircle,
    brand: InfoCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    success: CheckCircle,
};

interface AlertProps {
    /** @default "default" */
    color?: AlertColor;
    /** Figma "Size". `floating` is a card; `full-width` is a banner with a bottom border. @default "floating" */
    variant?: "floating" | "full-width";
    title: ReactNode;
    /** Figma "Supporting text". */
    description?: ReactNode;
    /** Figma "Actions". Floating uses `link-gray` + `link-color` buttons (`size="sm"`); full-width uses `secondary` + `primary` (`size="md"`). */
    actions?: ReactNode;
    /** Overrides the icon chosen by `color`. */
    icon?: FC<{ className?: string }>;
    /** Shows the close button (Figma "X close button") and is called when it's pressed. */
    onClose?: () => void;
    className?: string;
}

export const Alert = ({ color = "default", variant = "floating", title, description, actions, icon, onClose, className }: AlertProps) => {
    const Icon = icon ?? defaultIcons[color];
    const featuredIcon =
        color === "default" ? (
            <FeaturedIcon icon={Icon} color="gray" theme="modern" size="md" />
        ) : (
            <FeaturedIcon icon={Icon} color={color} theme="outline" size="md" />
        );
    const closeButton = onClose && <CloseButton size="sm" slot={null} onPress={onClose} label="Dismiss" className="absolute top-2 right-2" />;

    if (variant === "full-width") {
        return (
            <div role="alert" className={cx("relative border-b border-primary bg-primary", className)}>
                <div className="relative mx-auto flex max-w-container flex-col gap-4 p-4 md:flex-row md:items-center md:gap-3 md:px-8 md:py-3">
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                        <div className="max-md:hidden">{featuredIcon}</div>
                        <div className="flex min-w-0 flex-col gap-0.5 text-sm max-md:pr-8 md:flex-row md:flex-wrap md:gap-1.5">
                            <p className="font-semibold text-secondary">{title}</p>
                            {description && <p className="text-tertiary">{description}</p>}
                        </div>
                    </div>
                    {(actions || onClose) && (
                        <div className="flex items-center gap-2">
                            {actions && <div className="flex w-full flex-col-reverse gap-3 *:w-full md:w-auto md:flex-row md:*:w-auto">{actions}</div>}
                            {onClose && (
                                <CloseButton size="sm" slot={null} onPress={onClose} label="Dismiss" className="max-md:absolute max-md:top-2 max-md:right-2" />
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            role="alert"
            className={cx("relative flex flex-col gap-4 rounded-xl bg-primary_alt p-4 shadow-xs ring-1 ring-primary ring-inset sm:flex-row", className)}
        >
            {featuredIcon}
            <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex flex-col gap-1 text-sm">
                    <p className={cx("font-semibold text-secondary", onClose && "pr-8")}>{title}</p>
                    {description && <p className="text-tertiary">{description}</p>}
                </div>
                {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
            {closeButton}
        </div>
    );
};
