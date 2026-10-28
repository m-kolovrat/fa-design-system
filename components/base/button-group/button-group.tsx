"use client";

import { type FC, type PropsWithChildren, type ReactNode, type RefAttributes, createContext, isValidElement, useContext } from "react";
import {
    ToggleButton as AriaToggleButton,
    ToggleButtonGroup as AriaToggleButtonGroup,
    type ToggleButtonGroupProps,
    type ToggleButtonProps,
} from "react-aria-components";
import { cx, sortCx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";

export const styles = sortCx({
    common: {
        root: [
            "group/button-group inline-flex h-max cursor-pointer items-center bg-primary font-medium whitespace-nowrap text-secondary ring-1 ring-primary outline-focus-ring transition ring-inset",
            // Hover and focus styles
            "hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
            // Disabled styles — Figma: no fading; bg-disabled_subtle fill (current or not), text-disabled text,
            // fg-disabled_subtle icons/dots, border unchanged.
            "disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-disabled disabled:selected:bg-disabled_subtle disabled:[&>svg]:text-fg-disabled_subtle",
            // Selected styles
            "selected:bg-primary_hover selected:text-secondary_hover",
        ].join(" "),
        // Figma: fg-quaternary icons, fg-quaternary_hover on hover and when selected (same rule as Button).
        icon: "pointer-events-none text-fg-quaternary transition-inherit-all group-hover/button-group:text-fg-quaternary_hover group-selected/button-group:text-fg-quaternary_hover",
    },

    sizes: {
        sm: {
            // Figma sm: Text sm/Medium (14/20), 16×6 padding, 36px min height → 36px tall (same as the sm Button).
            root: "min-h-9 gap-1.5 px-4 py-1.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-md last:rounded-r-md data-icon-leading:pl-3.5 data-icon-only:px-3",
            // Trailing icon mirrors the leading padding (Figma Icon=Trailing: 16 left, 14 right).
            trailing: "data-icon-trailing:pr-3.5 data-icon-trailing:not-last:pr-[calc(calc(var(--spacing)*3.5)+1px)]",
            icon: "size-5",
        },
        md: {
            // Figma md: Text sm/Medium (14/20), 16×10 padding, 40px min height → 40px tall (same as the md Button).
            root: "min-h-10 gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-md last:rounded-r-md data-icon-leading:pl-3.5 data-icon-only:px-3",
            trailing: "data-icon-trailing:pr-3.5 data-icon-trailing:not-last:pr-[calc(calc(var(--spacing)*3.5)+1px)]",
            icon: "size-5",
        },
        lg: {
            // Figma lg: Text md/Medium (16/24), 18×10 padding, 44px min height → 44px tall (icon-only too) (same as the lg Button).
            root: "min-h-11 gap-2 px-4.5 py-2.5 text-md not-last:pr-[calc(calc(var(--spacing)*4.5)+1px)] first:rounded-l-md last:rounded-r-md data-icon-leading:pl-4 data-icon-only:px-3.5",
            trailing: "data-icon-trailing:pr-4 data-icon-trailing:not-last:pr-[calc(calc(var(--spacing)*4)+1px)]",
            icon: "size-5",
        },
    },
});

type ButtonSize = keyof typeof styles.sizes;

const ButtonGroupContext = createContext<{ size: ButtonSize }>({ size: "md" });

export interface ButtonGroupItemProps extends ToggleButtonProps, RefAttributes<HTMLButtonElement> {
    /** The item's key; `selectedKeys` refer to it. Unique within the group */
    id?: ToggleButtonProps["id"];
    /** Icon component or element before the text (JSX for a `Dot`) */
    iconLeading?: FC<{ className?: string }> | ReactNode;
    /** Icon component or element after the text */
    iconTrailing?: FC<{ className?: string }> | ReactNode;
    /** Disables this item (Figma's disabled tokens, not `opacity-50`) */
    isDisabled?: ToggleButtonProps["isDisabled"];
    /** Not recommended: use `onPress` instead */
    onClick?: () => void;
    /** Layout classes only; never restyle a single item */
    className?: string;
}

/** One option in a `ButtonGroup`: a toggle button with optional icons. */
export const ButtonGroupItem = ({
    iconLeading: IconLeading,
    iconTrailing: IconTrailing,
    children,
    className,
    ...otherProps
}: PropsWithChildren<ButtonGroupItemProps>) => {
    const context = useContext(ButtonGroupContext);

    if (!context) {
        throw new Error("ButtonGroupItem must be used within a ButtonGroup component");
    }

    const { size } = context;

    const isIcon = (IconLeading || IconTrailing) && !children;

    return (
        <AriaToggleButton
            {...otherProps}
            data-icon-only={isIcon ? true : undefined}
            data-icon-leading={IconLeading ? true : undefined}
            data-icon-trailing={IconTrailing && children ? true : undefined}
            className={cx(styles.common.root, styles.sizes[size].root, styles.sizes[size].trailing, className)}
        >
            {isReactComponent(IconLeading) && <IconLeading className={cx(styles.common.icon, styles.sizes[size].icon)} />}
            {isValidElement(IconLeading) && IconLeading}

            {children}

            {isReactComponent(IconTrailing) && <IconTrailing className={cx(styles.common.icon, styles.sizes[size].icon)} />}
            {isValidElement(IconTrailing) && IconTrailing}
        </AriaToggleButton>
    );
};

export interface ButtonGroupProps extends Omit<ToggleButtonGroupProps, "orientation">, RefAttributes<HTMLDivElement> {
    /** The size of every item: `sm` 36px, `md` 40px, `lg` 44px */
    size?: ButtonSize;
    /**
     * Whether one item or several can be selected
     * @default single
     */
    selectionMode?: ToggleButtonGroupProps["selectionMode"];
    /** The selected item ids (controlled) */
    selectedKeys?: ToggleButtonGroupProps["selectedKeys"];
    /** The initially selected item ids (uncontrolled) */
    defaultSelectedKeys?: ToggleButtonGroupProps["defaultSelectedKeys"];
    /** Called with the new set of selected ids */
    onSelectionChange?: ToggleButtonGroupProps["onSelectionChange"];
    /** Keeps one item selected: pressing the selected item doesn't clear it */
    disallowEmptySelection?: ToggleButtonGroupProps["disallowEmptySelection"];
    /** Disables every item */
    isDisabled?: ToggleButtonGroupProps["isDisabled"];
    /** Layout classes only */
    className?: string;
}

/** A row of joined toggle buttons for choosing one or a few views or filters (1D / 1U / 1Å). */
export const ButtonGroup = ({ children, size = "md", className, ...otherProps }: ButtonGroupProps) => {
    return (
        <ButtonGroupContext.Provider value={{ size }}>
            <AriaToggleButtonGroup
                selectionMode="single"
                className={cx("relative z-0 inline-flex w-max -space-x-px rounded-md shadow-xs", className)}
                {...otherProps}
            >
                {children}
            </AriaToggleButtonGroup>
        </ButtonGroupContext.Provider>
    );
};
