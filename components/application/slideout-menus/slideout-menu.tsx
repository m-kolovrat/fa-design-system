"use client";

import { type ComponentPropsWithRef, type ReactNode, type RefAttributes } from "react";
import type {
    DialogProps as AriaDialogProps,
    ModalOverlayProps as AriaModalOverlayProps,
    ModalRenderProps as AriaModalRenderProps,
} from "react-aria-components";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { CloseButton } from "@/components/base/buttons/close-button";
import { cx } from "@/utils/cx";

interface ModalOverlayProps extends AriaModalOverlayProps, RefAttributes<HTMLDivElement> {}

export const ModalOverlay = (props: ModalOverlayProps) => {
    return (
        <AriaModalOverlay
            {...props}
            className={(state) =>
                cx(
                    "fixed inset-0 flex min-h-dvh w-full items-center justify-end bg-overlay/70 pl-6 outline-hidden md:pl-10",
                    state.isEntering && "duration-slower ease-drawer animate-in fade-in",
                    state.isExiting && "duration-slow ease-drawer animate-out fade-out",
                    typeof props.className === "function" ? props.className(state) : props.className,
                )
            }
        />
    );
};
ModalOverlay.displayName = "ModalOverlay";

interface ModalProps extends AriaModalOverlayProps, RefAttributes<HTMLDivElement> {}

export const Modal = (props: ModalProps) => (
    <AriaModal
        {...props}
        className={(state) =>
            cx(
                "inset-y-0 right-0 h-full w-full max-w-100 shadow-xl transition",
                state.isEntering && "duration-slower ease-drawer animate-in slide-in-from-right",
                state.isExiting && "duration-slow ease-drawer animate-out slide-out-to-right",
                typeof props.className === "function" ? props.className(state) : props.className,
            )
        }
    />
);
Modal.displayName = "Modal";

interface DialogProps extends AriaDialogProps, RefAttributes<HTMLElement> {}

export const Dialog = (props: DialogProps) => (
    <AriaDialog
        role="dialog"
        aria-label="Slideout menu"
        {...props}
        className={cx(
            "relative flex size-full flex-col items-start gap-6 overflow-y-auto bg-primary ring-1 ring-secondary_alt outline-hidden",
            props.className,
        )}
    />
);
Dialog.displayName = "Dialog";

export interface SlideoutMenuProps extends Omit<AriaModalOverlayProps, "children">, RefAttributes<HTMLDivElement> {
    /** `SlideoutMenu.Header`, `.Content` and `.Footer`, or `({ close }) => …` to close from a button. */
    children: ReactNode | ((children: AriaModalRenderProps & { close: () => void }) => ReactNode);
    /** Classes on the inner dialog. */
    dialogClassName?: string;
    /** Whether a click on the overlay closes the panel (off by default). Escape closes it either way. */
    isDismissable?: boolean;
    /** Controlled open state. Leave it out inside `SlideoutMenu.Trigger`, which opens and closes it. */
    isOpen?: boolean;
    /** Called when the panel opens or closes (controlled use, with `isOpen`). */
    onOpenChange?: (isOpen: boolean) => void;
}

/** A panel that slides in from the right over the page. */
const Menu = ({ children, dialogClassName, ...props }: SlideoutMenuProps) => {
    return (
        <ModalOverlay {...props}>
            <Modal className={(state) => cx(typeof props.className === "function" ? props.className(state) : props.className)}>
                {(state) => (
                    <Dialog className={dialogClassName}>
                        {({ close }) => {
                            return typeof children === "function" ? children({ ...state, close }) : children;
                        }}
                    </Dialog>
                )}
            </Modal>
        </ModalOverlay>
    );
};
Menu.displayName = "SlideoutMenu";

/** `SlideoutMenu.Content`: the scrolling middle. `role` defaults to `"main"`. */
const Content = ({ role = "main", ...props }: ComponentPropsWithRef<"div">) => {
    return <div role={role} {...props} className={cx("flex size-full flex-col gap-6 overflow-y-auto overscroll-auto px-4 md:px-6", props.className)} />;
};
Content.displayName = "SlideoutContent";

export interface SlideoutHeaderProps extends ComponentPropsWithRef<"header"> {
    /** Called by the close button; pass the `close` from the menu's render function. */
    onClose?: () => void;
}

/** `SlideoutMenu.Header`: the title area, with a close button in the corner. */
const Header = ({ className, children, onClose, ...props }: SlideoutHeaderProps) => {
    return (
        <header {...props} className={cx("relative z-1 w-full px-4 pt-6 md:px-6", className)}>
            {children}
            <CloseButton size="sm" className="absolute top-3 right-3 shrink-0" onClick={onClose} />
        </header>
    );
};
Header.displayName = "SlideoutHeader";

/** `SlideoutMenu.Footer`: the actions, with a top divider. */
const Footer = (props: ComponentPropsWithRef<"footer">) => {
    return <footer {...props} className={cx("w-full p-4 shadow-[inset_0px_1px_0px_0px] shadow-border-secondary md:px-6", props.className)} />;
};
Footer.displayName = "SlideoutFooter";

const SlideoutMenu = Menu as typeof Menu & {
    Trigger: typeof AriaDialogTrigger;
    Content: typeof Content;
    Header: typeof Header;
    Footer: typeof Footer;
};
SlideoutMenu.displayName = "SlideoutMenu";

SlideoutMenu.Trigger = AriaDialogTrigger;
SlideoutMenu.Content = Content;
SlideoutMenu.Header = Header;
SlideoutMenu.Footer = Footer;

export { SlideoutMenu };
