"use client";

import { type ImgHTMLAttributes, type PropsWithChildren, type RefAttributes, createContext, useContext, useState } from "react";
import { User } from "fa-icons";
import {
    Tag as AriaTag,
    TagGroup as AriaTagGroup,
    type TagGroupProps as AriaTagGroupProps,
    TagList as AriaTagList,
    type TagProps as AriaTagProps,
} from "react-aria-components";
import { Dot } from "@/components/foundations/dot-icon";
import { cx } from "@/utils/cx";
import { TagCheckbox } from "./base-components/tag-checkbox";
import { TagCloseX } from "./base-components/tag-close-x";

/** The 16px avatar inside a tag. */
export const TagAvatar = ({ src, alt, contrastBorder = true, className }: ImgHTMLAttributes<HTMLImageElement> & { contrastBorder?: boolean }) => {
    const [isFailed, setIsFailed] = useState(false);

    return (
        <div
            className={cx(
                "relative inline-flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary",
                contrastBorder && "outline-[0.5px] -outline-offset-[0.5px] outline-black/16",
                className,
            )}
        >
            {src && !isFailed ? (
                <img data-avatar-img className="size-full object-cover" src={src} alt={alt} onError={() => setIsFailed(true)} />
            ) : (
                <User className="size-3 text-fg-quaternary" />
            )}
        </div>
    );
};

export interface TagItem {
    /** The tag's key, used by selection and `onClose` */
    id: string;
    /** The tag's text */
    label: string;
    /** A number badge after the text */
    count?: number;
    /** A small avatar before the text */
    avatarSrc?: string;
    /**
     * A thin outline around the avatar
     * @default true
     */
    avatarContrastBorder?: boolean;
    /** A colored dot before the text */
    dot?: boolean;
    /** The dot's color as a `text-fg-*` class (default `text-fg-success-secondary`) */
    dotClassName?: string;
    /** Disables the tag */
    isDisabled?: boolean;
    /** Shows an × button; called with the tag's `id` */
    onClose?: (id: string) => void;
}

const TagGroupContext = createContext<{
    selectionMode: "none" | "single" | "multiple";
    size: "sm" | "md" | "lg";
}>({
    selectionMode: "none",
    size: "sm",
});

export interface TagGroupProps extends AriaTagGroupProps, RefAttributes<HTMLDivElement> {
    /** The group's accessible name (required; not shown) */
    label: string;
    /** The size of every tag in it */
    size?: "sm" | "md" | "lg";
    /**
     * Whether tags can be selected; `single` also prevents an empty selection
     * @default none
     */
    selectionMode?: AriaTagGroupProps["selectionMode"];
    /** The selected tag ids (controlled) */
    selectedKeys?: AriaTagGroupProps["selectedKeys"];
    /** The initially selected tag ids (uncontrolled) */
    defaultSelectedKeys?: AriaTagGroupProps["defaultSelectedKeys"];
    /** Called with the new set of selected ids */
    onSelectionChange?: AriaTagGroupProps["onSelectionChange"];
    /** Called with the ids of tags removed with Backspace or Delete */
    onRemove?: AriaTagGroupProps["onRemove"];
}

/** A group of tags (`TagGroup` > `TagList` > `Tag`), optionally selectable or removable. */
export const TagGroup = ({ label, selectionMode = "none", size = "sm", children, ...otherProps }: TagGroupProps) => {
    return (
        <TagGroupContext.Provider value={{ selectionMode, size }}>
            <AriaTagGroup aria-label={label} selectionMode={selectionMode} disallowEmptySelection={selectionMode === "single"} {...otherProps}>
                {children}
            </AriaTagGroup>
        </TagGroupContext.Provider>
    );
};

/** The list inside a `TagGroup` that holds the `Tag`s (React Aria `TagList`). */
export const TagList = AriaTagList;

const styles = {
    sm: {
        root: {
            base: "px-2 py-0.75 text-xs font-medium",
            withCheckbox: "pl-1.25",
            withAvatar: "pl-1",
            withDot: "pl-1.5",
            withCount: "pr-1",
            withClose: "pr-1",
        },
        content: "gap-1",
        count: "px-1 text-xs font-medium",
    },
    md: {
        root: {
            base: "px-2.25 py-0.5 text-sm font-medium",
            withCheckbox: "pl-1",
            withAvatar: "pl-1.25",
            withDot: "pl-1.75",
            withCount: "pr-0.75",
            withClose: "pr-1",
        },
        content: "gap-1.25",
        count: "px-1.25 text-xs font-medium",
    },
    lg: {
        root: {
            base: "px-2.5 py-1 text-sm font-medium",
            withCheckbox: "pl-1.25",
            withAvatar: "pl-1.75",
            withDot: "pl-2.25",
            withCount: "pr-1",
            withClose: "pr-1",
        },
        content: "gap-1.5",
        count: "px-1.5 text-sm font-medium",
    },
};

export interface TagProps extends AriaTagProps, RefAttributes<object>, Omit<TagItem, "label" | "id"> {
    /** The tag's key, used by selection and `onClose` */
    id?: AriaTagProps["id"];
    /** Disables the tag */
    isDisabled?: TagItem["isDisabled"];
}

/** A compact label for a keyword, filter or person, with an optional count, dot, avatar or × button. */
export const Tag = ({
    id,
    avatarSrc,
    avatarContrastBorder = true,
    dot,
    dotClassName,
    isDisabled,
    count,
    className,
    children,
    onClose,
}: PropsWithChildren<TagProps>) => {
    const context = useContext(TagGroupContext);

    const leadingContent = avatarSrc ? (
        <TagAvatar src={avatarSrc} alt="Avatar" contrastBorder={avatarContrastBorder} />
    ) : dot ? (
        <Dot className={cx("text-fg-success-secondary", dotClassName)} size="sm" />
    ) : null;

    return (
        <AriaTag
            id={id}
            isDisabled={isDisabled}
            textValue={typeof children === "string" ? children : undefined}
            className={(state) =>
                cx(
                    "flex cursor-default items-center gap-0.75 rounded-sm bg-primary text-secondary ring-1 ring-primary outline-focus-ring transition ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
                    styles[context.size].root.base,

                    // With avatar
                    avatarSrc && styles[context.size].root.withAvatar,
                    // With X button
                    (onClose || state.allowsRemoving) && styles[context.size].root.withClose,
                    // With dot
                    dot && styles[context.size].root.withDot,
                    // With count
                    typeof count === "number" && styles[context.size].root.withCount,
                    // With checkbox
                    context.selectionMode !== "none" && styles[context.size].root.withCheckbox,
                    // Disabled
                    isDisabled && "cursor-not-allowed",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {({ isSelected, isDisabled, allowsRemoving }) => (
                <>
                    <div className={cx("flex items-center gap-1", styles[context.size].content)}>
                        {context.selectionMode !== "none" && <TagCheckbox size={context.size} isSelected={isSelected} isDisabled={isDisabled} />}

                        {leadingContent}

                        {children}

                        {typeof count === "number" && (
                            <span className={cx("flex items-center justify-center rounded-[3px] bg-tertiary text-center", styles[context.size].count)}>
                                {count}
                            </span>
                        )}
                    </div>

                    {(onClose || allowsRemoving) && (
                        <TagCloseX size={context.size} excludeFromTabOrder={allowsRemoving} onPress={() => id && onClose?.(id.toString())} />
                    )}
                </>
            )}
        </AriaTag>
    );
};
