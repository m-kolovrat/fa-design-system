"use client";

import type { ComponentPropsWithRef, FC, ReactNode } from "react";
import { CheckCircle } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

export interface EmptyStateProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
    /** Icon inside the featured icon. Figma's default is `check-circle`; pass the one that fits the state. */
    icon?: FC<{ className?: string }>;
    /** Figma "Featured icon". @default true */
    showIcon?: boolean;
    title: ReactNode;
    description?: ReactNode;
    /** Figma "Secondary button": usually `<Button size="md" color="secondary">`. Leave out to hide it. */
    secondaryAction?: ReactNode;
    /** Figma "Primary button": usually `<Button size="md">`. Leave out to hide it. */
    primaryAction?: ReactNode;
}

const StateBase = ({
    icon = CheckCircle,
    showIcon = true,
    color,
    title,
    description,
    secondaryAction,
    primaryAction,
    className,
    ...props
}: EmptyStateProps & { color: "gray" | "error" }) => (
    <div {...props} className={cx("mx-auto flex w-full max-w-lg flex-col items-center gap-6 text-center", className)}>
        <div className="flex w-full flex-col items-center gap-4">
            {showIcon && <FeaturedIcon icon={icon} color={color} theme="light" size="xl" />}
            <div className="flex w-full max-w-88 flex-col gap-1">
                <h3 className="text-md font-semibold text-primary">{title}</h3>
                {description && <p className="text-sm text-secondary">{description}</p>}
            </div>
        </div>
        {(secondaryAction || primaryAction) && (
            <div className="flex flex-wrap justify-center gap-3">
                {secondaryAction}
                {primaryAction}
            </div>
        )}
    </div>
);

/** Figma: States → `Empty state`. Gray featured icon, title, description and up to two actions. */
export const EmptyState = (props: EmptyStateProps) => <StateBase {...props} color="gray" />;

export type ErrorStateProps = EmptyStateProps;

/** Figma: States → `Error state`. Same layout as `EmptyState`, with an error-colored featured icon. */
export const ErrorState = (props: ErrorStateProps) => <StateBase {...props} color="error" />;
