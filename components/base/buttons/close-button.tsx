"use client";

import { Close as CloseIcon } from "fa-icons";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cx } from "@/utils/cx";

const sizes = {
    sm: { root: "size-9", icon: "size-5" },
    md: { root: "size-10", icon: "size-5" },
    lg: { root: "size-11", icon: "size-6" },
};

const themes = {
    light: "text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover touch-pressed:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2 outline-focus-ring",
    dark: "text-fg-white/70 hover:text-fg-white hover:bg-white/20 touch-pressed:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 outline-focus-ring",
};

export interface CloseButtonProps extends AriaButtonProps {
    /** `light` for light surfaces, `dark` for the button on a dark or image background */
    theme?: "light" | "dark";
    /** The size variant: `sm` 36px, `md` 40px, `lg` 44px */
    size?: "sm" | "md" | "lg";
    /** The accessible name. Defaults to English "Close", so pass "Lukk" */
    label?: string;
    /**
     * The React Aria slot the button fills. Defaults to `"close"` so it
     * automatically closes a parent `Dialog`/`Modal` without an explicit handler.
     * Pass `null` to opt out (e.g. when used as a `SearchField` clear button it
     * is picked up regardless of slot).
     * @default "close"
     */
    slot?: string | null;
}

/** The X that closes a modal, alert, notification or panel. Closes a parent `Dialog` through its `close` slot. */
export const CloseButton = ({ label, className, size = "sm", theme = "light", slot = "close", ...otherProps }: CloseButtonProps) => {
    return (
        <AriaButton
            {...otherProps}
            slot={slot}
            aria-label={label || "Close"}
            className={(state) =>
                cx(
                    "flex cursor-pointer items-center justify-center rounded-full p-2 transition focus:outline-hidden",
                    sizes[size].root,
                    themes[theme],
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            <CloseIcon aria-hidden="true" className={cx("shrink-0 transition-inherit-all", sizes[size].icon)} />
        </AriaButton>
    );
};
