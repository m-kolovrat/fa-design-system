import type { ReactNode } from "react";
import { ChevronRight } from "fa-icons";
import { Button } from "@/components/base/buttons/button";
import { cx, sortCx } from "@/utils/cx";

export const styles = sortCx({
    common: {
        // Figma Card footer: a divider, then 20px top and bottom; 16px sides on mobile, 24px from md (as the header).
        root: "flex items-center border-t border-secondary px-4 py-5 md:px-6",
    },
});

export interface CardFooterProps {
    /** The link's label (Figma: "See all"; any short text that says where it goes). */
    children: ReactNode;
    /** Where the link goes. Leave it out and pass `onPress` for an action instead. */
    href?: string;
    /** Called when the button is pressed, when there is no `href`. */
    onPress?: () => void;
    className?: string;
}

/** The footer of a card: a md Link gray button with a trailing chevron, under a divider. */
export const CardFooter = ({ children, href, onPress, className }: CardFooterProps) => (
    <div className={cx(styles.common.root, className)}>
        {href ? (
            <Button color="link-gray" size="md" iconTrailing={ChevronRight} href={href}>
                {children}
            </Button>
        ) : (
            <Button color="link-gray" size="md" iconTrailing={ChevronRight} onPress={onPress}>
                {children}
            </Button>
        )}
    </div>
);
