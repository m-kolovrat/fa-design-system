import type { ReactNode } from "react";
import { Badge } from "@/components/base/badges/badges";
import { cx, sortCx } from "@/utils/cx";

export const styles = sortCx({
    common: {
        // Figma Card header: 20px top and bottom; 16px sides on mobile, 24px from md (Breakpoint = Mobile / Desktop).
        root: "flex items-start gap-4 px-4 py-5 md:px-6",
        divider: "border-b border-secondary",
        text: "flex min-w-0 flex-1 flex-col gap-0.5",
        titleRow: "flex flex-wrap items-center gap-2",
        title: "text-lg font-semibold text-primary",
        description: "text-sm text-tertiary",
        // Figma "Actions": md icon-only Buttons, 12px apart.
        actions: "flex shrink-0 items-center gap-3",
    },
});

export interface CardHeaderProps {
    /** The card's title (Figma "Title"). */
    title: ReactNode;
    /** Shown next to the title (Figma "Badge"). A string renders a small brand `Badge`; pass an element for anything else. */
    badge?: ReactNode;
    /** The line under the title (Figma "Supporting text"). */
    description?: ReactNode;
    /** Up to three actions on the right (Figma "Action 1–3"): md icon-only `Button`s, or a labelled `Button` or `Dropdown`. */
    actions?: ReactNode;
    /**
     * A `border-secondary` line under the header (Figma "Divider").
     * @default true
     */
    divider?: boolean;
    /**
     * The heading level of the title.
     * @default 2
     */
    headingLevel?: 2 | 3;
    /** The title's id, for `aria-labelledby` on the card. */
    titleId?: string;
    className?: string;
}

/** The header of a card: title with an optional badge and supporting text, and up to three actions on the right. */
export const CardHeader = ({ title, badge, description, actions, divider = true, headingLevel = 2, titleId, className }: CardHeaderProps) => {
    const Heading = headingLevel === 3 ? "h3" : "h2";

    return (
        <div className={cx(styles.common.root, divider && styles.common.divider, className)}>
            <div className={styles.common.text}>
                <div className={styles.common.titleRow}>
                    <Heading id={titleId} className={styles.common.title}>
                        {title}
                    </Heading>
                    {typeof badge === "string" ? (
                        <Badge type="pill-color" color="brand" size="sm">
                            {badge}
                        </Badge>
                    ) : (
                        badge
                    )}
                </div>
                {description && <p className={styles.common.description}>{description}</p>}
            </div>
            {actions && <div className={styles.common.actions}>{actions}</div>}
        </div>
    );
};
