"use client";

import type { FC, ReactNode } from "react";
import { AlertCircle, CheckCircle, InfoCircle, UploadCloud02 } from "@untitledui/icons";
import { Toaster, toast } from "sonner";
import { Avatar } from "@/components/base/avatar/avatar";
import { CloseButton } from "@/components/base/buttons/close-button";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

/*
 * Figma: "Notification" — Type Primary icon, Gray icon, Error icon, Warning icon, Success icon, No icon,
 * Avatar, Image and Progress indicator, with the mobile breakpoint handled responsively.
 * Use `<Notification />` inline, or `notify()` + `<NotificationToaster />` to show it as a toast.
 */

export type NotificationType = "brand" | "gray" | "error" | "warning" | "success" | "none" | "avatar" | "image" | "progress";

const defaultIcons: Partial<Record<NotificationType, FC<{ className?: string }>>> = {
    brand: InfoCircle,
    gray: InfoCircle,
    error: AlertCircle,
    warning: AlertCircle,
    success: CheckCircle,
    progress: UploadCloud02,
};

export interface NotificationProps {
    /**
     * Figma "Type": `brand` = Primary icon, `gray` = Gray icon, `error` / `warning` / `success` = colored icon,
     * `none` = No icon, `avatar`, `image`, `progress` = Progress indicator.
     * @default "brand"
     */
    type?: NotificationType;
    title: ReactNode;
    /** Figma "Supporting text". */
    description?: ReactNode;
    /** Figma "Actions": usually a `link-gray` and a `link-color` button, `size="sm"`. */
    actions?: ReactNode;
    /** Overrides the icon chosen by `type`. */
    icon?: FC<{ className?: string }>;
    /** Avatar image for `avatar`. */
    avatarSrc?: string;
    /** Shown next to the title for `avatar`, e.g. "2 mins ago". */
    meta?: ReactNode;
    /** Image for `image`. */
    imageSrc?: string;
    /** 0–100, for `progress`. */
    progress?: number;
    /** Shows the close button (Figma "X close button") and is called when it's pressed. */
    onClose?: () => void;
    className?: string;
}

export const Notification = ({
    type = "brand",
    title,
    description,
    actions,
    icon,
    avatarSrc,
    meta,
    imageSrc,
    progress = 0,
    onClose,
    className,
}: NotificationProps) => {
    const Icon = icon ?? defaultIcons[type];
    // Figma: gray and progress use the md (40px) light featured icon; the colored types use sm (32px).
    const isGrayIcon = type === "gray" || type === "progress";

    const text = (
        <div className="flex flex-col gap-1 text-sm">
            <p className="flex flex-wrap items-center gap-x-2">
                <span className="font-semibold text-primary">{title}</span>
                {type === "avatar" && meta && <span className="text-quaternary">{meta}</span>}
            </p>
            {description && <p className="text-secondary">{description}</p>}
        </div>
    );

    const actionRow = actions && <div className="flex items-center gap-3">{actions}</div>;
    const closeButton = onClose && <CloseButton size="sm" slot={null} onPress={onClose} label="Dismiss" className="absolute top-2 right-2" />;

    if (type === "image") {
        return (
            <div
                role="status"
                className={cx(
                    "relative flex w-full overflow-hidden rounded-xl bg-primary_alt shadow-lg ring-1 ring-secondary_alt ring-inset max-sm:flex-col sm:w-124",
                    className,
                )}
            >
                <div className="shrink-0 bg-secondary max-sm:h-40 sm:w-40">{imageSrc && <img src={imageSrc} alt="" className="size-full object-cover" />}</div>
                <div className={cx("flex min-w-0 flex-1 flex-col gap-3 p-4 sm:pl-5", onClose && "pr-12")}>
                    {text}
                    {actionRow}
                </div>
                {closeButton}
            </div>
        );
    }

    return (
        <div
            role="status"
            className={cx("relative flex w-full gap-4 rounded-xl bg-primary_alt p-4 shadow-lg ring-1 ring-secondary_alt ring-inset sm:w-100", className)}
        >
            <div className={cx("flex min-w-0 flex-1 gap-4 max-sm:flex-col", onClose && type !== "progress" && "pr-8")}>
                {Icon && type !== "none" && type !== "avatar" && (
                    <FeaturedIcon
                        icon={Icon}
                        color={isGrayIcon ? "gray" : (type as "brand" | "error" | "warning" | "success")}
                        theme="light"
                        size={isGrayIcon ? "md" : "sm"}
                    />
                )}
                {type === "avatar" && <Avatar src={avatarSrc} size="md" status="online" alt="" />}

                <div className={cx("flex min-w-0 flex-1 flex-col", type === "progress" ? "gap-4" : "gap-3")}>
                    <div className={cx(type === "progress" && onClose && "pr-8")}>{text}</div>
                    {type === "progress" && <ProgressBar value={progress} labelPosition="bottom" />}
                    {actionRow}
                </div>
            </div>
            {closeButton}
        </div>
    );
};

/** Mount once (e.g. in the app layout) to show notifications from `notify()`. */
export const NotificationToaster = () => <Toaster position="top-right" offset={24} mobileOffset={8} />;

/**
 * Shows a `Notification` as a toast. The close button dismisses it.
 * @returns the toast id, for `toast.dismiss(id)`.
 */
export const notify = (props: Omit<NotificationProps, "onClose">, options?: { duration?: number }) =>
    toast.custom((id) => <Notification {...props} onClose={() => toast.dismiss(id)} />, { duration: options?.duration ?? 6000 });
