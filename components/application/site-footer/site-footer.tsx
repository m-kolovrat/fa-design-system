"use client";

import type { FC, ReactNode } from "react";
import { Link as AriaLink } from "react-aria-components";
import { type SiteBrand, type SiteNavItem, siteBrands } from "@/components/application/site-header/site-brands";
import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import { Button } from "@/components/base/buttons/button";
import { Facebook, Instagram, LinkedIn, TikTok, X } from "@/components/foundations/social-icons";
import { cx } from "@/utils/cx";

const socialIcons = {
    x: { icon: X, label: "X" },
    facebook: { icon: Facebook, label: "Facebook" },
    instagram: { icon: Instagram, label: "Instagram" },
    tiktok: { icon: TikTok, label: "TikTok" },
    linkedin: { icon: LinkedIn, label: "LinkedIn" },
} satisfies Record<string, { icon: FC<{ className?: string }>; label: string }>;

export interface SiteFooterProps {
    /**
     * The publication. Sets the logo and the colors.
     * @default "fa"
     */
    brand?: SiteBrand;
    /** Link columns. */
    links: SiteNavItem[][];
    /** Publisher lines shown under the logo. */
    publisherInfo: string[];
    /** Copyright line under the publisher info. */
    copyright: string;
    /** Data-provider credits at the bottom. */
    disclaimer: ReactNode;
    /** Where "Les mer." after the disclaimer points. Hidden when omitted. */
    disclaimerHref?: string;
    /** Social media links (`x`, `facebook`, `instagram`, `tiktok`, `linkedin`), in order. */
    socialLinks?: { platform: keyof typeof socialIcons; href: string }[];
    /** Where "Kontakt oss" points. */
    contactHref?: string;
    /** Title of the app box. */
    appTitle?: string;
    /** Text of the app box. */
    appDescription?: string;
    /** Link of the App Store badge. */
    appStoreHref?: string;
    /** Link of the Google Play badge. */
    googlePlayHref?: string;
    /** Screenshot of the app, shown in the app box on desktop (decorative). */
    appImageSrc?: string;
    /** Where the logo links. */
    homeHref?: string;
    /** Layout classes only. */
    className?: string;
}

/**
 * Site footer shown on every page (Figma: Footer). The layout follows the breakpoint:
 * mobile below `md`, tablet from `md`, desktop from `lg`.
 */
export const SiteFooter = ({
    brand = "fa",
    links,
    publisherInfo,
    copyright,
    disclaimer,
    disclaimerHref,
    socialLinks = [],
    contactHref = "#",
    appTitle = "Bruk Finansavisen-appen",
    appDescription = "Få nyhetsvarsler og en personalisert FA-opplevelse",
    appStoreHref = "#",
    googlePlayHref = "#",
    appImageSrc,
    homeHref = "/",
    className,
}: SiteFooterProps) => {
    const theme = siteBrands[brand];
    const Logo = theme.logo;

    return (
        <footer className={cx(theme.surface, className)}>
            <div aria-hidden="true" className="h-2 rounded-b-lg bg-secondary" />

            <div className="flex flex-col gap-8 px-4 py-8 lg:px-7.5">
                <div className="flex flex-col gap-8 lg:flex-row lg:gap-40">
                    <div className="flex flex-col gap-8 md:flex-row md:gap-20">
                        <div className="flex w-full max-w-80 flex-col gap-6">
                            <AriaLink
                                href={homeHref}
                                aria-label={theme.name}
                                className="self-start rounded-xs text-fg-white outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <Logo className={theme.logoClassName} />
                            </AriaLink>

                            <div className={cx("flex flex-col gap-4 text-xs font-medium", theme.muted)}>
                                <p>
                                    {publisherInfo.map((line) => (
                                        <span key={line} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </p>
                                <p>{copyright}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button size="sm" color="secondary" href={contactHref}>
                                    Kontakt oss
                                </Button>
                                {socialLinks.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        {socialLinks.map(({ platform, href }) => (
                                            <Button
                                                key={platform}
                                                size="sm"
                                                color="secondary"
                                                href={href}
                                                aria-label={socialIcons[platform].label}
                                                iconLeading={socialIcons[platform].icon}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <nav aria-label="Bunnmeny" className="flex gap-14">
                            {links.map((column, index) => (
                                <ul key={index} className="flex flex-col gap-4">
                                    {column.map((item) => (
                                        <li key={item.href}>
                                            <AriaLink
                                                href={item.href}
                                                className="rounded-xs text-sm text-primary_on-brand outline-focus-ring hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                                            >
                                                {item.label}
                                            </AriaLink>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </nav>
                    </div>

                    <div className={cx("flex items-center gap-6 overflow-hidden rounded-2xl md:self-start lg:min-w-0 lg:flex-1", theme.sunken)}>
                        <div className="flex flex-1 flex-col gap-6 p-4 md:flex-row md:items-center md:gap-8 lg:flex-col lg:items-start lg:gap-6">
                            <div className="flex flex-col gap-1 md:w-73.5 lg:w-auto">
                                <p className="text-sm font-semibold text-primary_on-brand">{appTitle}</p>
                                <p className={cx("text-xs font-medium", theme.muted)}>{appDescription}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                                <AppStoreButton href={appStoreHref} />
                                <GooglePlayButton href={googlePlayHref} />
                            </div>
                        </div>
                        {appImageSrc && <img src={appImageSrc} alt="" className="hidden h-36 w-[193px] shrink-0 object-cover lg:block" />}
                    </div>
                </div>

                <p className="text-xs font-medium text-primary_on-brand">
                    {disclaimer}
                    {disclaimerHref && (
                        <>
                            {" "}
                            <AriaLink
                                href={disclaimerHref}
                                className={cx("rounded-xs outline-focus-ring hover:underline focus-visible:outline-2", theme.muted)}
                            >
                                Les mer.
                            </AriaLink>
                        </>
                    )}
                </p>
            </div>
        </footer>
    );
};
