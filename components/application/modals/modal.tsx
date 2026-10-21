"use client";

import type { ReactNode } from "react";
import type { DialogRenderProps as AriaDialogRenderProps, ModalOverlayProps as AriaModalOverlayProps } from "react-aria-components";
import {
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Heading as AriaHeading,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
import { Badge } from "@/components/base/badges/badges";
import { CloseButton } from "@/components/base/buttons/close-button";
import { cx } from "@/utils/cx";

/*
 * Modal. Figma: `Modal` (Breakpoint = Desktop / Mobile sheet / Mobile full screen) with
 * `_Modal header`, the Body slot, `_Modal footer` and `_Sheet handle`.
 * A fixed header and footer with dividers around a scrolling body. Centered from `sm` up;
 * below `sm` it becomes a bottom sheet or a full-screen view. For short confirmations, use `PromptModal`.
 */

interface ModalProps extends Omit<AriaModalOverlayProps, "children" | "className"> {
    /**
     * How the modal renders below the `sm` breakpoint (Figma "Breakpoint"):
     * - `sheet` — Mobile sheet: full width from the bottom, top corners rounded, grab handle,
     *   as tall as its content up to the viewport minus a 48px gap.
     * - `fullscreen` — Mobile full screen: fills the viewport, no radius. Use for forms and long content.
     * From `sm` up both render as the centered Desktop modal.
     * @default "sheet"
     */
    mobile?: "sheet" | "fullscreen";
    /** Desktop width of the modal. @default "sm:max-w-120" (480px, the Figma frame) */
    className?: string;
    children: ReactNode | ((renderProps: AriaDialogRenderProps) => ReactNode);
}

const ModalComponent = ({ mobile = "sheet", className, children, isDismissable = true, ...props }: ModalProps) => (
    <AriaModalOverlay
        {...props}
        isDismissable={isDismissable}
        className={(state) =>
            cx(
                "fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center bg-overlay/70 outline-hidden backdrop-blur-[6px] sm:items-center sm:px-8",
                // Vertical padding: the sheet keeps a 48px gap at the top, full screen has none.
                "pt-(--modal-pt) pb-(--modal-pb) [--modal-pb:0px] sm:[--modal-pb:32px] sm:[--modal-pt:32px]",
                mobile === "sheet" ? "[--modal-pt:48px]" : "[--modal-pt:0px]",
                // Animations
                state.isEntering && "duration-slower ease-out animate-in fade-in",
                state.isExiting && "duration-slow ease-out animate-out fade-out",
            )
        }
    >
        <AriaModal
            className={(state) =>
                cx(
                    "flex w-full flex-col overflow-hidden bg-primary shadow-xl outline-hidden sm:max-w-120 sm:rounded-2xl",
                    // Max height based on the overlay's vertical padding
                    "max-h-[calc(var(--visual-viewport-height)-var(--modal-pt)-var(--modal-pb))]",
                    mobile === "sheet" && "rounded-t-2xl",
                    mobile === "fullscreen" && "h-(--visual-viewport-height) shadow-none sm:h-auto sm:shadow-xl",
                    // Animations: zoom in on desktop, slide up from the bottom on mobile.
                    state.isEntering && "duration-slower ease-out animate-in zoom-in-95 max-sm:ease-drawer max-sm:slide-in-from-bottom max-sm:zoom-in-100",
                    state.isExiting && "duration-slow ease-out animate-out zoom-out-95 max-sm:ease-drawer max-sm:slide-out-to-bottom max-sm:zoom-out-100",
                    className,
                )
            }
        >
            <AriaDialog className="flex max-h-[inherit] min-h-0 w-full flex-1 flex-col outline-hidden">
                {(renderProps) => (
                    <>
                        {mobile === "sheet" && <SheetHandle />}
                        {typeof children === "function" ? children(renderProps) : children}
                    </>
                )}
            </AriaDialog>
        </AriaModal>
    </AriaModalOverlay>
);

/** Figma `_Sheet handle`. Decorative: the sheet closes with the close button, Escape or a tap on the overlay. */
const SheetHandle = () => (
    <div aria-hidden="true" className="flex shrink-0 justify-center p-2 sm:hidden">
        <div className="h-1 w-9 rounded-full bg-quaternary" />
    </div>
);

interface ModalHeaderProps {
    title: ReactNode;
    /** Shown next to the title. A string renders a small brand `Badge`; pass an element for anything else. */
    badge?: ReactNode;
    description?: ReactNode;
    /** Figma "Close button". Closes the modal via the React Aria `close` slot. @default true */
    showCloseButton?: boolean;
    /** Figma "Divider" — a border-secondary line under the header. @default true */
    divider?: boolean;
    className?: string;
}

export const ModalHeader = ({ title, badge, description, showCloseButton = true, divider = true, className }: ModalHeaderProps) => (
    <div className={cx("flex shrink-0 items-start gap-4 px-4 py-5 sm:px-6", divider && "border-b border-secondary", className)}>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex flex-wrap items-center gap-2">
                <AriaHeading slot="title" className="text-lg font-semibold text-primary">
                    {title}
                </AriaHeading>
                {typeof badge === "string" ? (
                    <Badge type="pill-color" color="brand" size="sm">
                        {badge}
                    </Badge>
                ) : (
                    badge
                )}
            </div>
            {description && <p className="text-sm text-tertiary">{description}</p>}
        </div>
        {/* As tall as the title line, so the button centers on the title (Figma "Actions" frame). */}
        {showCloseButton && (
            <div className="flex h-7.5 items-center">
                <CloseButton size="md" />
            </div>
        )}
    </div>
);

interface ModalBodyProps {
    children: ReactNode;
    className?: string;
}

/** Figma "Body" slot. Scrolls when the content is taller than the space between header and footer. */
export const ModalBody = ({ children, className }: ModalBodyProps) => (
    <div className={cx("flex min-h-0 flex-auto flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-6", className)}>{children}</div>
);

interface ModalFooterProps {
    /** Figma "Actions" slot: usually the buttons, secondary first and primary last. Use `size="lg"` to match Figma. */
    children: ReactNode;
    /** Figma "Divider" — a border-secondary line above the footer. @default true */
    divider?: boolean;
    className?: string;
}

export const ModalFooter = ({ children, divider = true, className }: ModalFooterProps) => (
    <div
        className={cx(
            // Mobile: equal-width buttons side by side. From `sm` up: right aligned.
            "flex shrink-0 gap-3 px-4 pt-4 pb-[calc(--spacing(4)+env(safe-area-inset-bottom))] *:flex-1 sm:justify-end sm:px-6 sm:pb-4 sm:*:flex-none",
            divider && "border-t border-secondary",
            className,
        )}
    >
        {children}
    </div>
);

export const Modal = ModalComponent as typeof ModalComponent & {
    /** Wraps the button that opens the modal and the `Modal` itself. */
    Trigger: typeof AriaDialogTrigger;
};
Modal.Trigger = AriaDialogTrigger;
