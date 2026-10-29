"use client";

import type { SiteBrand } from "@/components/application/site-header/site-brands";
import { siteContent } from "@/components/application/site-header/site-content";
import { SiteFooter, type SiteFooterProps } from "./site-footer";

/** The footer's default link columns, re-exported for older demos; new code reads `siteContent` directly. */
export const footerLinks = siteContent.fa.footer.links;

/**
 * The footer as a page gets it: the publication's default links, publisher info, copyright,
 * disclaimer and social links from `site-content.ts`. Any `SiteFooter` prop passed overrides the default.
 */
export const SiteFooterDemo = ({ brand = "fa", ...props }: Partial<SiteFooterProps> & { brand?: SiteBrand }) => (
    <SiteFooter brand={brand} disclaimerHref="/om-data" appImageSrc="/images/fa-app-preview.png" {...props} />
);
