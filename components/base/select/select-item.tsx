"use client";

import { isValidElement } from "react";
import { Check } from "fa-icons";
import type { ListBoxItemProps as AriaListBoxItemProps } from "react-aria-components";
import { ListBoxItem as AriaListBoxItem, Text as AriaText } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { CheckboxBase } from "@/components/base/checkbox/checkbox";
import { cx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";
import type { SelectItemType } from "./select-shared";

// One size (Figma _Select menu item, 2026-11-27): Text sm, 16px icons.
const styles = {
    root: "p-2 pr-2.5 gap-2 *:data-icon:size-4",
    text: "text-sm",
    // Figma _Select menu item: 8px between label and supporting text.
    textContainer: "gap-x-2",
    check: "size-4",
};

interface SelectItemProps extends Omit<AriaListBoxItemProps<SelectItemType>, "id">, SelectItemType {
    /** The selection indicator to be displayed on the item. */
    selectionIndicator?: "checkmark" | "checkbox" | "none";
    /** The alignment of the selection indicator. */
    selectionIndicatorAlign?: "left" | "right";
}

export const SelectItem = ({
    label,
    id,
    value,
    avatarUrl,
    supportingText,
    isDisabled,
    icon: Icon,
    className,
    children,
    selectionIndicator = "checkmark",
    selectionIndicatorAlign = "right",
    ...props
}: SelectItemProps) => {
    const labelOrChildren = label || (typeof children === "string" ? children : "");
    const textValue = supportingText ? labelOrChildren + " " + supportingText : labelOrChildren;

    const isLeft = selectionIndicatorAlign === "left";

    return (
        <AriaListBoxItem
            id={id}
            value={
                value ?? {
                    id,
                    label: labelOrChildren,
                    avatarUrl,
                    supportingText,
                    isDisabled,
                    icon: Icon,
                }
            }
            textValue={textValue}
            isDisabled={isDisabled}
            {...props}
            className={(state) => cx("w-full px-1 py-px outline-hidden", typeof className === "function" ? className(state) : className)}
        >
            {(state) => (
                <div
                    className={cx(
                        "flex cursor-pointer items-center rounded-sm outline-hidden select-none",
                        // Figma: selected bg-active, hover bg-primary_hover (selected or not), so hover comes last.
                        state.isSelected && selectionIndicator !== "checkbox" && "bg-active",
                        (state.isFocused || state.isHovered) && "bg-primary_hover",
                        state.isDisabled && "cursor-not-allowed",
                        state.isFocusVisible && "ring-2 ring-focus-ring ring-inset",

                        // Icon styles
                        "*:data-icon:shrink-0 *:data-icon:text-fg-quaternary",
                        // Figma _Select menu item State=Disabled: text-disabled label and supporting text, fg-disabled icon.
                        state.isDisabled && "*:data-icon:text-fg-disabled",

                        styles.root,
                    )}
                >
                    {isLeft && selectionIndicator === "checkbox" && <CheckboxBase isSelected={state.isSelected} isDisabled={state.isDisabled} />}

                    {avatarUrl ? (
                        <Avatar aria-hidden="true" size="xs" src={avatarUrl} alt={label} className="size-5" />
                    ) : isReactComponent(Icon) ? (
                        <Icon data-icon aria-hidden="true" />
                    ) : isValidElement(Icon) ? (
                        Icon
                    ) : null}

                    {/* Figma _Select menu item: one line. The label keeps its width (cut only if it alone is too long);
                        the supporting text takes the rest and is cut with an ellipsis instead of wrapping. */}
                    <div className={cx("flex w-full min-w-0 flex-1", styles.textContainer)}>
                        <AriaText
                            slot="label"
                            className={cx(
                                "max-w-full shrink-0 truncate font-medium whitespace-nowrap text-primary",
                                state.isDisabled && "text-disabled",
                                styles.text,
                            )}
                        >
                            {label || (typeof children === "function" ? children(state) : children)}
                        </AriaText>

                        {supportingText && (
                            <AriaText
                                slot="description"
                                className={cx("min-w-0 truncate whitespace-nowrap text-tertiary", state.isDisabled && "text-disabled", styles.text)}
                            >
                                {supportingText}
                            </AriaText>
                        )}
                    </div>

                    {state.isSelected && selectionIndicator === "checkmark" && (
                        <Check aria-hidden="true" className={cx("ml-auto text-fg-brand-primary", styles.check)} />
                    )}

                    {!isLeft && selectionIndicator === "checkbox" && (
                        <CheckboxBase isSelected={state.isSelected} isDisabled={state.isDisabled} className="ml-auto" />
                    )}
                </div>
            )}
        </AriaListBoxItem>
    );
};
