"use client";

import type { FC, ReactNode } from "react";

export type SelectItemType = {
    /** Unique identifier for the item. */
    id: string | number;
    /** The primary display text. */
    label?: string;
    /** Avatar image URL. */
    avatarUrl?: string;
    /** Whether the item is disabled. */
    isDisabled?: boolean;
    /** Secondary text displayed alongside the label. */
    supportingText?: string;
    /** Leading icon component or element. */
    icon?: FC | ReactNode;
};

export interface CommonProps {
    /** Helper text displayed below the input. */
    hint?: string;
    /** Field label displayed above the input. */
    label?: string;
    /** Tooltip text for the help icon next to the label. */
    tooltip?: string;
    /** Placeholder text when no value is selected. */
    placeholder?: string;
    /** Whether to hide the required indicator from the label. */
    hideRequiredIndicator?: boolean;
}

/** The trigger's styles. One size (Figma Select, 2026-11-27): 36px, Text sm, 16px icons; 16px text below `md` so iOS doesn't zoom on focus. */
export const styles = {
    root: "py-2 pl-3 pr-2.5 gap-2 *:data-icon:size-4",
    text: "text-sm max-md:text-md/5",
    textContainer: "gap-x-1.5",
    shortcut: "pr-2.5",
};
