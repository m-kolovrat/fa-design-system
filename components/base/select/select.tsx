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
import { strings } from "@/utils/strings";
import { ComboBox } from "./combobox";
import { Popover } from "./popover";
import { SelectItem } from "./select-item";
import { type CommonProps, type SelectItemType, styles } from "./select-shared";

export { styles, type CommonProps, type SelectItemType } from "./select-shared";

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
    /** Whether the select is invalid: red ring on the trigger, and the `hint` turns red */
    isInvalid?: SelectAriaProps["isInvalid"];
}

interface SelectValueProps {
    isOpen: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    isInvalid: boolean;
    placeholder?: string;
    ref?: Ref<HTMLButtonElement>;
    icon?: FC | ReactNode;
}

const SelectValue = ({ isOpen, isFocused, isDisabled, isInvalid, placeholder, icon, ref }: SelectValueProps) => {
    return (
        <AriaButton
            ref={ref}
            className={cx(
                "relative flex w-full cursor-pointer items-center rounded-md bg-primary shadow-xs ring-1 ring-primary outline-hidden transition ring-inset",
                (isFocused || isOpen) && "ring-2 ring-brand",
                isInvalid && "ring-error_subtle",
                isInvalid && (isFocused || isOpen) && "ring-2 ring-error",
                // Figma Select State=Disabled: bg-disabled_subtle, border-disabled, text-disabled value.
                isDisabled && "cursor-not-allowed bg-disabled_subtle shadow-none ring-disabled [&_p]:text-disabled",
            )}
        >
            <AriaSelectValue<SelectItemType>
                className={cx(
                    "flex h-max w-full items-center justify-start truncate text-left align-middle",
                    styles.root,
                    // Icon styles
                    "*:data-icon:shrink-0 *:data-icon:text-fg-quaternary",
                )}
            >
                {(state) => {
                    const selectedItem = state.selectedItems[0];
                    const Icon = selectedItem?.icon || icon;

                    return (
                        <>
                            {selectedItem?.avatarUrl ? (
                                <Avatar size="xs" src={selectedItem.avatarUrl} alt={selectedItem.label} className="size-5" />
                            ) : isReactComponent(Icon) ? (
                                <Icon data-icon aria-hidden="true" />
                            ) : isValidElement(Icon) ? (
                                Icon
                            ) : null}

                            {selectedItem ? (
                                <section className={cx("flex w-full truncate", styles.textContainer)}>
                                    <p className={cx("max-w-full shrink-0 truncate font-medium text-primary", styles.text)}>{selectedItem?.label}</p>
                                    {selectedItem?.supportingText && (
                                        <p className={cx("min-w-0 truncate text-tertiary", styles.text)}>{selectedItem?.supportingText}</p>
                                    )}
                                </section>
                            ) : (
                                <p className={cx("text-placeholder", styles.text)}>{placeholder}</p>
                            )}

                            <ChevronDown aria-hidden="true" className="ml-auto size-4 shrink-0 text-fg-quaternary" />
                        </>
                    );
                }}
            </AriaSelectValue>
        </AriaButton>
    );
};

const SelectComponent = ({
    placeholder = strings.select.placeholder,
    icon,
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
        <>
            <AriaSelect {...rest} className={(state) => cx("flex flex-col gap-1.5", typeof className === "function" ? className(state) : className)}>
                {(state) => (
                    <>
                        {label && (
                            <Label isRequired={hideRequiredIndicator ? false : state.isRequired} tooltip={tooltip}>
                                {label}
                            </Label>
                        )}

                        <SelectValue {...state} {...{ placeholder }} icon={icon} />

                        <Popover className={rest.popoverClassName}>
                            <AriaListBox items={items} className="size-full outline-hidden">
                                {children}
                            </AriaListBox>
                        </Popover>

                        {hint && (
                            <HintText isInvalid={state.isInvalid} className="text-xs">
                                {hint}
                            </HintText>
                        )}
                    </>
                )}
            </AriaSelect>
        </>
    );
};

// Named `Select` (not `_Select`) so the Docs props table is labelled Select.
/** A field that opens a list to pick one value from. `Select.ComboBox` adds typing to filter; items are `Select.Item`. */
const Select = SelectComponent as typeof SelectComponent & {
    ComboBox: typeof ComboBox;
    Item: typeof SelectItem;
};
Select.ComboBox = ComboBox;
Select.Item = SelectItem;

export { Select };
