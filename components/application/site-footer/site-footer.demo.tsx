"use client";

import type { SiteBrand, SiteNavItem } from "@/components/application/site-header/site-brands";
import { SiteFooter, type SiteFooterProps } from "./site-footer";

export const footerLinks: SiteNavItem[][] = [
    [
        { label: "eAvis", href: "/eavis" },
        { label: "Annonse", href: "/annonse" },
        { label: "Arkiv", href: "/arkiv" },
        { label: "Event", href: "/event" },
        { label: "Bedriftsabonnement", href: "/bedrift" },
    ],
    [
        { label: "Personvernerklæring", href: "/personvern" },
        { label: "Vilkår", href: "/vilkar" },
        { label: "Cookies", href: "/cookies" },
        { label: "Samtykkeinnstillinger", href: "/samtykke" },
    ],
];

/** The footer with sample content; any `SiteFooter` prop passed overrides the sample. */
export const SiteFooterDemo = ({ brand = "fa", ...props }: Partial<SiteFooterProps> & { brand?: SiteBrand }) => (
    <SiteFooter
        brand={brand}
        links={footerLinks}
        publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, PO Box 724 Skøyen, 0214 Oslo", "Sjefredaktør/adm.dir: Trygve Hegnar"]}
        copyright="©2025 Hegnar Media AS"
        disclaimer="Børsdata levert av Millistream. Nikkei 225 ©Nikkei Inc. TradingView Lightweight Charts™ og TradingView Advanced Charts™ er levert av TradingView, Inc."
        disclaimerHref="/om-data"
        socialLinks={[
            { platform: "x", href: "https://x.com" },
            { platform: "facebook", href: "https://facebook.com" },
            { platform: "instagram", href: "https://instagram.com" },
            { platform: "tiktok", href: "https://tiktok.com" },
            { platform: "linkedin", href: "https://linkedin.com" },
        ]}
        appImageSrc="/images/fa-app-preview.png"
        {...props}
    />
);
