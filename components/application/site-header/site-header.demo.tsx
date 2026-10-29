"use client";

import type { SiteBrand } from "./site-brands";
import { siteContent } from "./site-content";
import { SiteHeader, type SiteHeaderProps } from "./site-header";
import type { TickerItem } from "./ticker-bar";

/** A market snapshot for stories and demos; in an app the ticker is live data. */
export const tickerItems: TickerItem[] = [
    { label: "Oslo Børs", value: "1.193,30", change: "+11,69%", direction: "up", href: "/ticker/OSEBX" },
    { label: "Brent spot", value: "96,09", change: "+2,98%", direction: "up", href: "/ticker/Brent%20Spot%3DF" },
    { label: "Dollar", value: "10,51", change: "+1,27%", direction: "up", href: "/ticker/USDNOK" },
    { label: "Euro", value: "11,64", change: "+0,46%", direction: "up", href: "/ticker/EURNOK" },
    { label: "US 10 ÅR", value: "3,83", change: "-1,59%", direction: "down", href: "/ticker/US10Y" },
    { label: "Bitcoin", value: "60.278", change: "-0,44%", direction: "down", href: "/ticker/BTCNOK" },
    { label: "Gull", value: "2.510,38", change: "-1,84%", direction: "down", href: "/ticker/XAUUSD" },
    { label: "Nikkei 225", value: "38.362,53", change: "-1,84%", direction: "down", href: "/ticker/N225" },
];

/** The header's default content, re-exported for older demos; new code reads `siteContent` directly. */
export const { navigation, shortcuts, menu } = siteContent.fa;

interface SiteHeaderDemoProps extends Partial<SiteHeaderProps> {
    brand?: SiteBrand;
    collapsed?: boolean;
    signedIn?: boolean;
}

/**
 * The header as a page gets it: the publication's default navigation, shortcuts and menu from
 * `site-content.ts`, plus a sample ticker. Any `SiteHeader` prop passed overrides the default.
 */
export const SiteHeaderDemo = ({ brand = "fa", collapsed, signedIn, ...props }: SiteHeaderDemoProps) => (
    <SiteHeader brand={brand} collapsed={collapsed} tickerItems={tickerItems} user={signedIn ? { initials: "X", href: "/min-side" } : undefined} {...props} />
);
