"use client";

import type { FC, ReactNode, Ref, RefAttributes } from "react";
import { isValidElement } from "react";
import { ChevronDown } from "fa-icons";
import type { SelectProps as AriaSelectProps } from "react-aria-components";
import { Button as AriaButton, ListBox as AriaListBox, Select as AriaSelect, SelectValue as AriaSelectValue } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";
import { ComboBox } from "./combobox";
import { Popover } from "./popover";
import { SelectItem } from "./select-item";
import { type CommonProps, SelectContext, type SelectItemType, sizes } from "./select-shared";

export { SelectContext, sizes, type CommonProps, type SelectItemType } from "./select-shared";

type SelectAriaProps = AriaSelectProps<SelectItemType>;

export interface SelectProps extends Omit<AriaSelectProps<SelectItemType>, "children" | "items">, RefAttributes<HTMLDivElement>, CommonProps {
    /** The options (`SelectItemType[]`: `id`, `label`, `supportingText`, `icon`, `avatarUrl`, `isDisabled`) */
    items?: SelectItemType[];
    /** Classes on the popover (its width) */
    popoverClassName?: string;
    /** Leading icon component or element shown before the value */
    icon?: FC | ReactNode;
    /** A render function for each item: `(item) => <Select.Item … />` */
    children: ReactNode | ((item: SelectItemType) => ReactNode);
    /**
     * Placeholder text when no value is selected.
     * @default Select
     */
    placeholder?: string;
    /** The selected item id (controlled) */
    value?: SelectAriaProps["value"];
    /** The initially selected item id (uncontrolled) */
    defaultValue?: SelectAriaProps["defaultValue"];
    /** Called with the selected item id */
    onChange?: SelectAriaProps["onChange"];
    /** The form field name */
    name?: SelectAriaProps["name"];
    /** Whether a value is required: adds `*` to the label */
    isRequired?: SelectAriaProps["isRequired"];
    /** Whether the select is disabled */
    isDisabled?: SelectAriaProps["isDisabled"];
    /** Whether the select is invalid: the `hint` turns red */
    isInvalid?: SelectAriaProps["isInvalid"];
}

interface SelectValueProps {
    isOpen: boolean;
    size: "sm" | "md" | "lg";
    isFocused: boolean;
    isDisabled: boolean;
    placeholder?: string;
    ref?: Ref<HTMLButtonElement>;
    icon?: FC | ReactNode;
}

const SelectValue = ({ isOpen, isFocused, isDisabled, size, placeholder, icon, ref }: SelectValueProps) => {
    return (
        <AriaButton
            ref={ref}
            className={cx(
                "relative flex w-full cursor-pointer items-center rounded-md bg-primary shadow-xs ring-1 ring-primary outline-hidden transition ring-inset",
                (isFocused || isOpen) && "ring-2 ring-brand",
                isDisabled && "cursor-not-allowed opacity-50",
            )}
        >
            <AriaSelectValue<SelectItemType>
                className={(state) =>
                    cx(
                        "flex h-max w-full items-center justify-start truncate text-left align-middle",

                        sizes[size].root,

                        // With icon
                        (state.selectedItems[0]?.icon || icon) && sizes[size].withIcon,

                        // Icon styles
                        "*:data-icon:shrink-0 *:data-icon:text-fg-quaternary",
                    )
                }
            >
                {(state) => {
                    const selectedItem = state.selectedItems[0];
                    const Icon = selectedItem?.icon || icon;

                    return (
                        <>
                            {selectedItem?.avatarUrl ? (
                                <Avatar size="xs" src={selectedItem.avatarUrl} alt={selectedItem.label} className={cx(size === "sm" && "size-5")} />
                            ) : isReactComponent(Icon) ? (
                                <Icon data-icon aria-hidden="true" />
                            ) : isValidElement(Icon) ? (
                                Icon
                            ) : null}

                            {selectedItem ? (
                                <section className={cx("flex w-full truncate", sizes[size].textContainer)}>
                                    <p className={cx("truncate font-medium text-primary", sizes[size].text)}>{selectedItem?.label}</p>
                                    {selectedItem?.supportingText && <p className={cx("text-tertiary", sizes[size].text)}>{selectedItem?.supportingText}</p>}
                                </section>
                            ) : (
                                <p className={cx("text-placeholder", sizes[size].text)}>{placeholder}</p>
                            )}

                            <ChevronDown aria-hidden="true" className={cx("ml-auto shrink-0 text-fg-quaternary", size === "lg" ? "size-5" : "size-4")} />
                        </>
                    );
                }}
            </AriaSelectValue>
        </AriaButton>
    );
};

const Select = ({
    placeholder = "Select",
    icon,
    size = "md",
    children,
    items,
    label,
    hint,
    tooltip,
    hideRequiredIndicator,
    className,
    ...rest
}: SelectProps) => {
    return (
        <SelectContext.Provider value={{ size }}>
            <AriaSelect {...rest} className={(state) => cx("flex flex-col gap-1.5", typeof className === "function" ? className(state) : className)}>
                {(state) => (
                    <>
                        {label && (
                            <Label isRequired={hideRequiredIndicator ? false : state.isRequired} tooltip={tooltip}>
                                {label}
                            </Label>
                        )}

                        <SelectValue {...state} {...{ size, placeholder }} icon={icon} />

                        <Popover size={size} className={rest.popoverClassName}>
                            <AriaListBox items={items} className="size-full outline-hidden">
                                {children}
                            </AriaListBox>
                        </Popover>

                        {hint && (
                            <HintText isInvalid={state.isInvalid} className={cx(size === "sm" && "text-xs")}>
                                {hint}
                            </HintText>
                        )}
                    </>
                )}
            </AriaSelect>
        </SelectContext.Provider>
    );
};

/** A field that opens a list to pick one value from. `Select.ComboBox` adds typing to filter; items are `Select.Item`. */
const _Select = Select as typeof Select & {
    ComboBox: typeof ComboBox;
    Item: typeof SelectItem;
};
_Select.ComboBox = ComboBox;
_Select.Item = SelectItem;

export { _Select as Select };
