import type { FC, SVGProps } from "react";
import { FaLargeLogo, FaSmallLogo, KapitalLargeLogo, MotorLogo } from "fa-icons";

export type SiteBrand = "fa" | "kapital" | "motor";

export interface SiteNavItem {
    /** Link text. */
    label: string;
    /** Link target. */
    href: string;
    /** Marks the link as the current page (`aria-current="page"`). */
    current?: boolean;
    /** Sub-links shown in a dropdown on hover (desktop navigation only). */
    items?: SiteNavItem[];
}

interface SiteBrandConfig {
    /** Publication name, used as the logo's accessible label. */
    name: string;
    logo: FC<SVGProps<SVGSVGElement>>;
    logoClassName: string;
    /** Logo in the collapsed desktop header. */
    logoCollapsed: FC<SVGProps<SVGSVGElement>>;
    logoCollapsedClassName: string;
    /** Header and footer background. */
    surface: string;
    /** Inset areas on the surface (the footer app box). */
    sunken: string;
    /** Hover fill for links and icon buttons on the surface. */
    hover: string;
    /** Secondary text on the surface. */
    muted: string;
    /** Dividers between link groups. */
    divider: string;
    /**
     * Fill for the "Logg inn" button. Fa keeps the Button's own primary color.
     * Override; Figma: _Header login. Listed in docs/overrides.md.
     */
    loginButton?: string;
    /**
     * Classes for the header search Input: brand fill, no border, light text and icons. While
     * focused it switches back to the Input's own look (white fill, dark text, brand ring), like
     * finansavisen.no. `ai` colors the AI star, which sits outside the Input in a `group/search`.
     * Override; Figma: _Header search. Listed in docs/overrides.md.
     */
    search: { wrapper: string; input: string; icon: string; ai: string };
}

/**
 * Per-brand look of the site header and footer (Figma: Header / Footer, `Brand` property).
 * Only Fa has semantic brand tokens, so the brand surfaces use the primitive ramps from
 * `styles/theme.css`, the same variables the Figma components are bound to.
 */
export const siteBrands: Record<SiteBrand, SiteBrandConfig> = {
    fa: {
        name: "Finansavisen",
        logo: FaLargeLogo,
        logoClassName: "h-[18px] w-auto lg:h-[29px]",
        logoCollapsed: FaSmallLogo,
        logoCollapsedClassName: "h-[29px] w-auto",
        surface: "bg-brand-700",
        sunken: "bg-brand-800",
        hover: "hover:bg-brand-800",
        muted: "text-brand-200",
        divider: "bg-brand-600",
        search: {
            wrapper: "bg-brand-800 ring-transparent data-focus-within:bg-primary data-focus-within:ring-brand",
            input: "text-primary_on-brand placeholder:text-brand-200 group-data-focus-within/input:text-primary group-data-focus-within/input:placeholder:text-placeholder",
            icon: "text-brand-200 group-data-focus-within/input:text-fg-quaternary",
            ai: "text-brand-200 group-focus-within/search:text-fg-quaternary",
        },
    },
    kapital: {
        name: "Kapital",
        logo: KapitalLargeLogo,
        logoClassName: "h-[29px] w-auto",
        logoCollapsed: KapitalLargeLogo,
        logoCollapsedClassName: "h-[29px] w-auto",
        surface: "bg-orange-dark-600",
        sunken: "bg-orange-dark-800",
        hover: "hover:bg-orange-dark-700",
        muted: "text-orange-dark-100",
        divider: "bg-orange-dark-500",
        loginButton: "bg-orange-dark-800 hover:bg-orange-dark-900 touch-pressed:bg-orange-dark-900",
        search: {
            wrapper: "bg-orange-dark-800 ring-transparent data-focus-within:bg-primary data-focus-within:ring-brand",
            input: "text-primary_on-brand placeholder:text-orange-dark-100 group-data-focus-within/input:text-primary group-data-focus-within/input:placeholder:text-placeholder",
            icon: "text-orange-dark-100 group-data-focus-within/input:text-fg-quaternary",
            ai: "text-orange-dark-100 group-focus-within/search:text-fg-quaternary",
        },
    },
    motor: {
        name: "Motor",
        logo: MotorLogo,
        logoClassName: "h-[18px] w-auto lg:h-6",
        logoCollapsed: MotorLogo,
        logoCollapsedClassName: "h-6 w-auto",
        surface: "bg-gray-800",
        sunken: "bg-gray-900",
        hover: "hover:bg-gray-700",
        muted: "text-gray-300",
        divider: "bg-gray-700",
        loginButton: "bg-gray-600 hover:bg-gray-700 touch-pressed:bg-gray-700",
        search: {
            wrapper: "bg-gray-900 ring-transparent data-focus-within:bg-primary data-focus-within:ring-brand",
            input: "text-primary_on-brand placeholder:text-gray-300 group-data-focus-within/input:text-primary group-data-focus-within/input:placeholder:text-placeholder",
            icon: "text-gray-300 group-data-focus-within/input:text-fg-quaternary",
            ai: "text-gray-300 group-focus-within/search:text-fg-quaternary",
        },
    },
};
