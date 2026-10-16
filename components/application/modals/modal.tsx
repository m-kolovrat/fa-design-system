"use client";

import type { ReactNode } from "react";
import type { DialogProps as AriaDialogProps, ModalOverlayProps as AriaModalOverlayProps } from "react-aria-components";
import {
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Heading as AriaHeading,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
import { CloseButton } from "@/components/base/buttons/close-button";
import { cx } from "@/utils/cx";

export const DialogTrigger = AriaDialogTrigger;

export const ModalOverlay = (props: AriaModalOverlayProps) => {
    return (
        <AriaModalOverlay
            {...props}
            className={(state) =>
                cx(
                    "fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center bg-overlay/70 px-4 outline-hidden backdrop-blur-[6px] sm:items-center sm:justify-center sm:px-8",
                    // Vertical padding
                    "pt-(--modal-pt) pb-(--modal-pb) [--modal-pb:clamp(16px,8vh,64px)] [--modal-pt:16px] sm:[--modal-pb:32px] sm:[--modal-pt:32px]",
                    // Animations
                    state.isEntering && "duration-slower ease-out animate-in fade-in",
                    state.isExiting && "duration-slow ease-out animate-out fade-out",
                    typeof props.className === "function" ? props.className(state) : props.className,
                )
            }
        />
    );
};

export const Modal = (props: AriaModalOverlayProps) => (
    <AriaModal
        {...props}
        className={(state) =>
            cx(
                "w-full rounded-xl bg-primary align-middle shadow-xl outline-hidden max-sm:overflow-y-auto sm:rounded-2xl",
                // Max height based on parent's vertical padding
                "max-h-[calc(var(--visual-viewport-height)-var(--modal-pt)-var(--modal-pb))]",
                // Animations
                state.isEntering && "duration-slower ease-out animate-in zoom-in-95",
                state.isExiting && "duration-slow ease-out animate-out zoom-out-95",
                typeof props.className === "function" ? props.className(state) : props.className,
            )
        }
    />
);

export const Dialog = (props: AriaDialogProps) => (
    <AriaDialog {...props} className={cx("relative max-h-[inherit] w-full overflow-y-auto outline-hidden", props.className)} />
);

/*
 * Modal parts. Figma: `_Modal header` and `_Modal actions`. The modal body between them is a free slot,
 * so any layout is assembled from `Modal` + `ModalHeader` + your content + `ModalActions`.
 */

interface ModalHeaderProps {
    /**
     * Figma "Type": `left` = Left aligned, `center` = Center aligned, `horizontal` = Horizontal left aligned
     * (icon beside the text from `sm` up, stacked on mobile like Figma's mobile breakpoint).
     * @default "left"
     */
    align?: "left" | "center" | "horizontal";
    /** Usually a `<FeaturedIcon size="lg" />`. */
    icon?: ReactNode;
    title: ReactNode;
    description?: ReactNode;
    /** Figma "X close button". Closes the parent `Dialog` via the React Aria `close` slot. @default true */
    showCloseButton?: boolean;
    /** Figma "Padding bottom" — 20px below the text. Turn off when the body sits flush under the header. @default true */
    paddingBottom?: boolean;
    /** Figma "Divider" — a border-secondary line under the header. @default false */
    divider?: boolean;
    className?: string;
}

export const ModalHeader = ({
    align = "left",
    icon,
    title,
    description,
    showCloseButton = true,
    paddingBottom = true,
    divider = false,
    className,
}: ModalHeaderProps) => (
    <div className={cx("relative flex flex-col", className)}>
        <div
            className={cx(
                "flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6",
                align === "center" && "items-center text-center",
                align === "horizontal" && "sm:flex-row",
                paddingBottom && "pb-5",
            )}
        >
            {icon}
            <div
                className={cx(
                    "flex min-w-0 flex-col gap-0.5",
                    // Keep text clear of the close button when it shares the first row.
                    showCloseButton && (!icon || align === "horizontal") && "sm:pr-8",
                    showCloseButton && !icon && "pr-8",
                )}
            >
                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                    {title}
                </AriaHeading>
                {description && <p className="text-sm text-tertiary">{description}</p>}
            </div>
        </div>
        {divider && <div className="w-full border-t border-secondary" />}
        {showCloseButton && <CloseButton size="lg" className="absolute top-3 right-3" />}
    </div>
);

interface ModalActionsProps {
    /**
     * Figma "Type":
     * - `vertical` — Vertical fill container: full-width buttons stacked, first child on top.
     * - `horizontal` — Horizontal fill container: equal-width buttons side by side from `sm` up
     *   (pass secondary first, primary last); stacked with primary on top on mobile.
     * - `horizontal-right` — Horizontal right aligned: `leading` content (e.g. a checkbox) on the left,
     *   buttons on the right; buttons stacked above `leading` on mobile.
     * @default "horizontal"
     */
    layout?: "vertical" | "horizontal" | "horizontal-right";
    /** Left-hand content for `horizontal-right`, e.g. a `Checkbox` and a `link-gray` button. */
    leading?: ReactNode;
    /** Figma "Divider" — a border-secondary line above the actions. @default false */
    divider?: boolean;
    /** The buttons. Use `size="lg"` to match Figma; destructive modals pass `color="primary-destructive"`. */
    children: ReactNode;
    className?: string;
}

export const ModalActions = ({ layout = "horizontal", leading, divider = false, children, className }: ModalActionsProps) => (
    <div className={cx("flex flex-col pt-6 sm:pt-8", className)}>
        {divider && <div className="mb-4 w-full border-t border-secondary sm:mb-6" />}
        <div
            className={cx(
                "flex gap-3 px-4 pb-4 sm:px-6 sm:pb-6",
                layout === "vertical" && "flex-col *:w-full",
                layout === "horizontal" && "flex-col-reverse *:w-full sm:flex-row sm:*:w-auto sm:*:flex-1",
                layout === "horizontal-right" && "flex-col-reverse sm:flex-row sm:items-center",
            )}
        >
            {layout === "horizontal-right" ? (
                <>
                    {leading && <div className="flex items-center gap-3">{leading}</div>}
                    <div className="flex flex-col-reverse gap-3 *:w-full sm:ml-auto sm:flex-row sm:*:w-auto">{children}</div>
                </>
            ) : (
                children
            )}
        </div>
    </div>
);
