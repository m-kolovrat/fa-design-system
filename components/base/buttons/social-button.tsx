"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import type { ButtonProps as AriaButtonProps, LinkProps as AriaLinkProps } from "react-aria-components";
import { Button as AriaButton, Link as AriaLink } from "react-aria-components";
import { cx, sortCx } from "@/utils/cx";
import { AppleLogo, FacebookLogo, GoogleLogo, TwitterLogo } from "./social-logos";

export const styles = sortCx({
    common: {
        root: "group relative inline-flex h-max cursor-pointer items-center justify-center font-medium whitespace-nowrap outline-focus-ring transition before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:stroke-fg-disabled disabled:text-fg-disabled disabled:*:text-fg-disabled",
        icon: "pointer-events-none shrink-0 transition-inherit-all",
    },

    sizes: {
        md: {
            root: "gap-2 rounded-full px-3.5 py-2.5 text-sm before:rounded-full data-icon-only:p-3",
            icon: "size-4",
        },
        lg: {
            root: "gap-3 rounded-full px-4 py-2.5 text-md before:rounded-full data-icon-only:p-2.5",
            icon: "size-6",
        },
    },

    colors: {
        gray: {
            root: "bg-primary text-secondary ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover touch-pressed:bg-primary_hover",
            icon: "text-fg-quaternary group-hover:text-fg-quaternary_hover",
        },
        black: {
            root: "bg-black text-white ring-1 ring-transparent ring-inset before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0%",
            icon: "",
        },

        facebook: {
            root: "bg-[#1877F2] text-white ring-1 ring-transparent ring-inset before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% hover:bg-[#0C63D4] touch-pressed:bg-[#0C63D4]",
            icon: "",
        },
    },
});

interface CommonProps {
    /** The service to sign in with; picks the logo and, with `theme="brand"`, the fill */
    social: "google" | "facebook" | "apple" | "twitter";
    /** Disables the button (note: `disabled`, not `isDisabled`) */
    disabled?: boolean;
    /** `brand`: the service's own fill; `color`: white with the colored logo; `gray`: white with a gray logo */
    theme?: "brand" | "color" | "gray";
    /** The size variant */
    size?: keyof typeof styles.sizes;
    /** The label ("Logg inn med Google"). Leave it out for an icon-only button, and pass an `aria-label` */
    children?: ReactNode;
    /** Layout classes only (`w-full`, margins) */
    className?: string;
}

// `slot` and `routerOptions` are picked from React Aria so they work as before but stay out of the
// Docs props table (it leaves out props declared in node_modules).
interface ButtonProps
    extends CommonProps, Pick<AriaButtonProps, "slot">, DetailedHTMLProps<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "slot">, HTMLButtonElement> {}

interface LinkProps
    extends CommonProps, Pick<AriaLinkProps, "routerOptions">, DetailedHTMLProps<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">, HTMLAnchorElement> {
    /** Renders a link (React Aria `Link`) instead of a button */
    href?: string;
}

export type SocialButtonProps = ButtonProps | LinkProps;

/** "Sign in with …" button for Google, Facebook, Apple or X, with the service's logo. */
export const SocialButton = ({ size = "lg", theme = "brand", social, className, children, disabled, ...otherProps }: SocialButtonProps) => {
    const href = "href" in otherProps ? otherProps.href : undefined;
    const Component = href ? AriaLink : AriaButton;

    const isIconOnly = !children;

    const socialToColor = {
        google: "gray",
        facebook: "facebook",
        apple: "black",
        twitter: "black",
    } as const;

    const colorStyles = theme === "brand" ? styles.colors[socialToColor[social]] : styles.colors.gray;

    const logos = {
        google: GoogleLogo,
        facebook: FacebookLogo,
        apple: AppleLogo,
        twitter: TwitterLogo,
    };

    const Logo = logos[social];

    let props = {};

    if (href) {
        props = {
            ...otherProps,

            href: disabled ? undefined : href,

            // Since anchor elements do not support the `disabled` attribute and state,
            // we need to specify `data-rac` and `data-disabled` in order to be able
            // to use the `disabled:` selector in classes.
            ...(disabled ? { "data-rac": true, "data-disabled": true } : {}),
        };
    } else {
        props = {
            ...otherProps,

            type: otherProps.type || "button",
            isDisabled: disabled,
        };
    }

    return (
        <Component
            isDisabled={disabled}
            {...props}
            data-icon-only={isIconOnly ? true : undefined}
            className={cx(styles.common.root, styles.sizes[size].root, colorStyles.root, className)}
        >
            <Logo
                className={cx(
                    styles.common.icon,
                    styles.sizes[size].icon,
                    theme === "gray"
                        ? colorStyles.icon
                        : theme === "brand" && (social === "facebook" || social === "apple" || social === "twitter")
                          ? "text-white"
                          : theme === "color" && (social === "apple" || social === "twitter")
                            ? "text-alpha-black"
                            : "",
                )}
                colorful={(theme === "brand" && social === "google") || (theme === "color" && (social === "google" || social === "facebook")) || undefined}
            />

            {children}
        </Component>
    );
};
