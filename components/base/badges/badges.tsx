"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { Close as CloseX } from "fa-icons";
import { Flag, type FlagName } from "fa-icons";
import { Dot } from "@/components/foundations/dot-icon";
import { cx } from "@/utils/cx";
import type { BadgeColors, BadgeTypeToColorMap, BadgeTypes, IconComponentType, Sizes } from "./badge-types";
import { badgeTypes } from "./badge-types";

export const filledColors: Record<BadgeColors, { root: string; addon: string; addonButton: string }> = {
    gray: {
        root: "bg-utility-gray-50 text-utility-gray-700 ring-utility-gray-200",
        addon: "text-utility-gray-500",
        addonButton: "hover:bg-utility-gray-100 text-utility-gray-400 hover:text-utility-gray-500",
    },
    brand: {
        root: "bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200",
        addon: "text-utility-brand-500",
        addonButton: "hover:bg-utility-brand-100 text-utility-brand-400 hover:text-utility-brand-500",
    },
    error: {
        root: "bg-utility-error-50 text-utility-error-700 ring-utility-error-200",
        addon: "text-utility-error-500",
        addonButton: "hover:bg-utility-error-100 text-utility-error-400 hover:text-utility-error-500",
    },
    warning: {
        root: "bg-utility-warning-50 text-utility-warning-700 ring-utility-warning-200",
        addon: "text-utility-warning-500",
        addonButton: "hover:bg-utility-warning-100 text-utility-warning-400 hover:text-utility-warning-500",
    },
    success: {
        root: "bg-utility-success-50 text-utility-success-700 ring-utility-success-200",
        addon: "text-utility-success-500",
        addonButton: "hover:bg-utility-success-100 text-utility-success-400 hover:text-utility-success-500",
    },
    "blue-light": {
        root: "bg-utility-blue-light-50 text-utility-blue-light-700 ring-utility-blue-light-200",
        addon: "text-utility-blue-light-500",
        addonButton: "hover:bg-utility-blue-light-100 text-utility-blue-light-400 hover:text-utility-blue-light-500",
    },
    purple: {
        root: "bg-utility-purple-50 text-utility-purple-700 ring-utility-purple-200",
        addon: "text-utility-purple-500",
        addonButton: "hover:bg-utility-purple-100 text-utility-purple-400 hover:text-utility-purple-500",
    },
    pink: {
        root: "bg-utility-pink-50 text-utility-pink-700 ring-utility-pink-200",
        addon: "text-utility-pink-500",
        addonButton: "hover:bg-utility-pink-100 text-utility-pink-400 hover:text-utility-pink-500",
    },
    "orange-dark": {
        root: "bg-utility-orange-dark-50 text-utility-orange-dark-700 ring-utility-orange-dark-200",
        addon: "text-utility-orange-dark-500",
        addonButton: "hover:bg-utility-orange-dark-100 text-utility-orange-dark-400 hover:text-utility-orange-dark-500",
    },
};

const addonOnlyColors = Object.fromEntries(Object.entries(filledColors).map(([key, value]) => [key, { root: "", addon: value.addon }])) as Record<
    BadgeColors,
    { root: string; addon: string }
>;

const withPillTypes = {
    [badgeTypes.pillColor]: {
        common: "size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset",
        styles: filledColors,
    },
    [badgeTypes.badgeColor]: {
        common: "size-max flex items-center whitespace-nowrap rounded-sm ring-1 ring-inset",
        styles: filledColors,
    },
    [badgeTypes.badgeModern]: {
        common: "size-max flex items-center whitespace-nowrap rounded-sm ring-1 ring-inset shadow-xs",
        styles: {
            gray: {
                root: "bg-primary text-secondary ring-primary",
                addon: "text-gray-500",
                addonButton: "hover:bg-utility-gray-100 text-utility-gray-400 hover:text-utility-gray-500",
            },
        },
    },
};

const withBadgeTypes = {
    [badgeTypes.pillColor]: {
        common: "size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset",
        styles: filledColors,
    },
    [badgeTypes.badgeColor]: {
        common: "size-max flex items-center whitespace-nowrap rounded-sm ring-1 ring-inset",
        styles: filledColors,
    },
    [badgeTypes.badgeModern]: {
        common: "size-max flex items-center whitespace-nowrap rounded-sm ring-1 ring-inset bg-primary text-secondary ring-primary shadow-xs",
        styles: addonOnlyColors,
    },
};

export type BadgeColor<T extends BadgeTypes> = BadgeTypeToColorMap<typeof withPillTypes>[T];

interface BadgeProps<T extends BadgeTypes> {
    /**
     * The shape: `pill-color` (round), `color` (square corners), `modern` (white, shadow)
     * @default pill-color
     */
    type?: T;
    /**
     * The size variant
     * @default md
     */
    size?: Sizes;
    /**
     * The color, picked by meaning (see Rules)
     * @default gray
     */
    color?: BadgeColor<T>;
    /** The text: one to three words */
    children: ReactNode;
    /** Layout classes only (margins) */
    className?: string;
}

/** A short label for a status or category. */
export const Badge = <T extends BadgeTypes>(props: BadgeProps<T>) => {
    const { type = "pill-color", size = "md", color = "gray", children } = props;
    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "py-0.5 px-2 text-xs font-medium",
        md: "py-0.5 px-2.5 text-sm font-medium",
        lg: "py-1 px-3 text-sm font-medium",
    };
    const badgeSizes = {
        sm: "py-0.5 px-1.5 text-xs font-medium",
        md: "py-0.5 px-2 text-sm font-medium",
        lg: "py-1 px-2.5 text-sm font-medium rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return <span className={cx(colors.common, sizes[type][size], colors.styles[color].root, props.className)}>{children}</span>;
};

interface BadgeWithDotProps<T extends BadgeTypes> {
    /**
     * The shape: `pill-color` (round), `color` (square corners), `modern` (white, shadow)
     * @default pill-color
     */
    type?: T;
    /**
     * The size variant
     * @default md
     */
    size?: Sizes;
    /**
     * The color, picked by meaning (see Rules)
     * @default gray
     */
    color?: BadgeTypeToColorMap<typeof withBadgeTypes>[T];
    /** Layout classes only (margins) */
    className?: string;
    /** The text: one to three words */
    children: ReactNode;
}

/** A badge with a colored dot before the text. */
export const BadgeWithDot = <T extends BadgeTypes>(props: BadgeWithDotProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", className, children } = props;

    const colors = withBadgeTypes[type];

    const pillSizes = {
        sm: "gap-1 py-0.5 pl-1.5 pr-2 text-xs font-medium",
        md: "gap-1.5 py-0.5 pl-2 pr-2.5 text-sm font-medium",
        lg: "gap-1.5 py-1 pl-2.5 pr-3 text-sm font-medium",
    };

    const badgeSizes = {
        sm: "gap-1 py-0.5 px-1.5 text-xs font-medium",
        md: "gap-1.5 py-0.5 px-2 text-sm font-medium",
        lg: "gap-1.5 py-1 px-2.5 text-sm font-medium rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root, className)}>
            <Dot className={colors.styles[color].addon} size="sm" />
            {children}
        </span>
    );
};

interface BadgeWithIconProps<T extends BadgeTypes> {
    /**
     * The shape: `pill-color` (round), `color` (square corners), `modern` (white, shadow)
     * @default pill-color
     */
    type?: T;
    /**
     * The size variant
     * @default md
     */
    size?: Sizes;
    /**
     * The color, picked by meaning (see Rules)
     * @default gray
     */
    color?: BadgeTypeToColorMap<typeof withBadgeTypes>[T];
    /** Icon component shown before the text (a reference, not JSX). Use this or `iconTrailing` */
    iconLeading?: IconComponentType;
    /** Icon component shown after the text (a reference, not JSX) */
    iconTrailing?: IconComponentType;
    /** The text: one to three words */
    children: ReactNode;
    /** Layout classes only (margins) */
    className?: string;
}

/** A badge with an icon before or after the text. */
export const BadgeWithIcon = <T extends BadgeTypes>(props: BadgeWithIconProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", iconLeading: IconLeading, iconTrailing: IconTrailing, children, className } = props;

    const colors = withBadgeTypes[type];

    const icon = IconLeading ? "leading" : "trailing";

    const pillSizes = {
        sm: {
            trailing: "gap-0.5 py-0.5 pl-2 pr-1.5 text-xs font-medium",
            leading: "gap-0.5 py-0.5 pr-2 pl-1.5 text-xs font-medium",
        },
        md: {
            trailing: "gap-1 py-0.5 pl-2.5 pr-2 text-sm font-medium",
            leading: "gap-1 py-0.5 pr-2.5 pl-2 text-sm font-medium",
        },
        lg: {
            trailing: "gap-1 py-1 pl-3 pr-2.5 text-sm font-medium",
            leading: "gap-1 py-1 pr-3 pl-2.5 text-sm font-medium",
        },
    };
    const badgeSizes = {
        sm: {
            trailing: "gap-0.5 py-0.5 pl-2 pr-1.5 text-xs font-medium",
            leading: "gap-0.5 py-0.5 pr-2 pl-1.5 text-xs font-medium",
        },
        md: {
            trailing: "gap-1 py-0.5 pl-2 pr-1.5 text-sm font-medium",
            leading: "gap-1 py-0.5 pr-2 pl-1.5 text-sm font-medium",
        },
        lg: {
            trailing: "gap-1 py-1 pl-2.5 pr-2 text-sm font-medium rounded-md",
            leading: "gap-1 py-1 pr-2.5 pl-2 text-sm font-medium rounded-md",
        },
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size][icon], colors.styles[color].root, className)}>
            {IconLeading && <IconLeading className={cx(colors.styles[color].addon, "size-3")} />}
            {children}
            {IconTrailing && <IconTrailing className={cx(colors.styles[color].addon, "size-3")} />}
        </span>
    );
};

interface BadgeWithFlagProps<T extends BadgeTypes> {
    /**
     * The shape: `pill-color` (round), `color` (square corners), `modern` (white, shadow)
     * @default pill-color
     */
    type?: T;
    /**
     * The size variant
     * @default md
     */
    size?: Sizes;
    /**
     * The flag, by its `fa-icons` name (`"norway-nok"`). Always pass it
     * @default australia-aud
     */
    flag?: FlagName;
    /**
     * The color, picked by meaning (see Rules)
     * @default gray
     */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** The text: one to three words */
    children: ReactNode;
}

/** A badge with a country flag before the text. */
export const BadgeWithFlag = <T extends BadgeTypes>(props: BadgeWithFlagProps<T>) => {
    const { size = "md", color = "gray", flag = "australia-aud", type = "pill-color", children } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "gap-1 py-0.5 pl-0.75 pr-2 text-xs font-medium",
        md: "gap-1.5 py-0.5 pl-1 pr-2.5 text-sm font-medium",
        lg: "gap-1.5 py-1 pl-1.5 pr-3 text-sm font-medium",
    };
    const badgeSizes = {
        sm: "gap-1 py-0.5 pl-1 pr-1.5 text-xs font-medium",
        md: "gap-1.5 py-0.5 pl-1.5 pr-2 text-sm font-medium",
        lg: "gap-1.5 py-1 pl-2 pr-2.5 text-sm font-medium rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            <Flag name={flag} className="size-4 shrink-0" />
            {children}
        </span>
    );
};

interface BadgeWithImageProps<T extends BadgeTypes> {
    /**
     * The shape: `pill-color` (round), `color` (square corners), `modern` (white, shadow)
     * @default pill-color
     */
    type?: T;
    /**
     * The size variant
     * @default md
     */
    size?: Sizes;
    /** The image URL; its `alt` is fixed to "Badge image" */
    imgSrc: string;
    /**
     * The color, picked by meaning (see Rules)
     * @default gray
     */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** The text: one to three words */
    children: ReactNode;
}

/** A badge with a small round image before the text. */
export const BadgeWithImage = <T extends BadgeTypes>(props: BadgeWithImageProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", imgSrc, children } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "gap-1 py-0.5 pl-0.75 pr-2 text-xs font-medium",
        md: "gap-1.5 py-0.5 pl-1 pr-2.5 text-sm font-medium",
        lg: "gap-1.5 py-1 pl-1.5 pr-3 text-sm font-medium",
    };
    const badgeSizes = {
        sm: "gap-1 py-0.5 pl-1 pr-1.5 text-xs font-medium",
        md: "gap-1.5 py-0.5 pl-1.5 pr-2 text-sm font-medium",
        lg: "gap-1.5 py-1 pl-2 pr-2.5 text-sm font-medium rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            <img src={imgSrc} className="size-4 max-w-none rounded-full" alt="Badge image" />
            {children}
        </span>
    );
};

interface BadgeWithButtonProps<T extends BadgeTypes> {
    /**
     * The shape: `pill-color` (round), `color` (square corners), `modern` (white, shadow)
     * @default pill-color
     */
    type?: T;
    /**
     * The size variant
     * @default md
     */
    size?: Sizes;
    /**
     * The button's icon component
     * @default Close
     */
    icon?: IconComponentType;
    /**
     * The color, picked by meaning (see Rules)
     * @default gray
     */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** The text: one to three words */
    children: ReactNode;
    /**
     * The accessible name of the × button ("Fjern Equinor"). Always pass it.
     */
    buttonLabel?: string;
    /**
     * The click event handler for the button.
     */
    onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

/** A removable badge with an × button after the text. */
export const BadgeWithButton = <T extends BadgeTypes>(props: BadgeWithButtonProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", icon: Icon = CloseX, buttonLabel, children } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "gap-0.5 py-0.5 pl-2 pr-0.75 text-xs font-medium",
        md: "gap-0.5 py-0.5 pl-2.5 pr-1 text-sm font-medium",
        lg: "gap-0.5 py-1 pl-3 pr-1.5 text-sm font-medium",
    };
    const badgeSizes = {
        sm: "gap-0.5 py-0.5 pl-1.5 pr-0.75 text-xs font-medium",
        md: "gap-0.5 py-0.5 pl-2 pr-1 text-sm font-medium",
        lg: "gap-0.5 py-1 pl-2.5 pr-1.5 text-sm font-medium rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            {children}
            <button
                type="button"
                aria-label={buttonLabel}
                onClick={props.onButtonClick}
                className={cx(
                    "flex cursor-pointer items-center justify-center p-0.5 outline-focus-ring transition focus-visible:outline-2",
                    colors.styles[color].addonButton,
                    type === "pill-color" ? "rounded-full" : "rounded-[3px]",
                )}
            >
                <Icon className="size-3 transition-inherit-all" />
            </button>
        </span>
    );
};

interface BadgeIconProps<T extends BadgeTypes> {
    /**
     * The shape: `pill-color` (round), `color` (square corners), `modern` (white, shadow)
     * @default pill-color
     */
    type?: T;
    /**
     * The size variant
     * @default md
     */
    size?: Sizes;
    /** The icon component (required) */
    icon: IconComponentType;
    /**
     * The color, picked by meaning (see Rules)
     * @default gray
     */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** Not rendered: `BadgeIcon` shows only its icon */
    children?: ReactNode;
}

/** An icon-only badge. It has no text and no accessible name. */
export const BadgeIcon = <T extends BadgeTypes>(props: BadgeIconProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", icon: Icon } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "p-1.25",
        md: "p-1.5",
        lg: "p-2",
    };

    const badgeSizes = {
        sm: "p-1.25",
        md: "p-1.5",
        lg: "p-2 rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            <Icon className={cx("size-3", colors.styles[color].addon)} />
        </span>
    );
};
