"use client";

import { type FC, type ReactNode, createContext, useContext } from "react";
import {
    Radio as AriaRadio,
    RadioGroup as AriaRadioGroup,
    type RadioGroupProps as AriaRadioGroupProps,
    type RadioProps as AriaRadioProps,
} from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { CheckboxBase } from "@/components/base/checkbox/checkbox";
import { RadioButtonBase } from "@/components/base/radio-buttons/radio-buttons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

/*
 * Card-style radio group. Figma: "Radio group" / "Radio group item" with Type
 * Radio button, Checkbox, Icon simple, Avatar, Payment icon and Icon card, in sm and md.
 */

type RadioCardSize = "sm" | "md";

const RadioCardContext = createContext<{ size: RadioCardSize }>({ size: "sm" });

const styles = {
    sm: {
        inlineGap: "gap-2",
        contentGap: "gap-3",
        mediaGap: "gap-3",
        textWrapper: "",
        titleRow: "gap-1",
        title: "text-sm font-medium",
        text: "text-sm",
        paymentGap: "gap-2",
        cardTitle: "text-md font-semibold",
        price: "text-display-sm font-semibold",
        priceWrapper: "gap-1",
    },
    md: {
        inlineGap: "gap-3",
        contentGap: "gap-3",
        mediaGap: "gap-4",
        textWrapper: "gap-0.5",
        titleRow: "gap-1.5",
        title: "text-md font-medium",
        text: "text-md",
        paymentGap: "gap-3",
        cardTitle: "text-lg font-semibold",
        price: "text-display-md font-semibold",
        priceWrapper: "gap-2",
    },
};

interface RadioCardGroupProps extends AriaRadioGroupProps {
    /** @default "sm" */
    size?: RadioCardSize;
    children: ReactNode;
    className?: string;
}

export const RadioCardGroup = ({ size = "sm", children, className, ...props }: RadioCardGroupProps) => (
    <RadioCardContext.Provider value={{ size }}>
        <AriaRadioGroup {...props} className={cx("flex flex-col gap-3", className)}>
            {children}
        </AriaRadioGroup>
    </RadioCardContext.Provider>
);

interface RadioCardProps extends Omit<AriaRadioProps, "children"> {
    /**
     * Figma "Type":
     * - `radio` — radio circle on the left (Radio button)
     * - `checkbox` — checkbox on the left (Checkbox)
     * - `icon` — featured icon on the left, check on the right (Icon simple)
     * - `avatar` — avatar on the left, check on the right (Avatar)
     * - `payment` — payment method icon, optional actions (Payment icon)
     * - `card` — header with icon and title, body with price and badge (Icon card)
     * @default "radio"
     */
    type?: "radio" | "checkbox" | "icon" | "avatar" | "payment" | "card";
    title: ReactNode;
    /** Shown inline after the title, e.g. "$10/month" or "@kari". Not used by `payment` and `card`. */
    subtitle?: ReactNode;
    description?: ReactNode;
    /** Featured icon for `icon` and `card`. */
    icon?: FC<{ className?: string }>;
    /** Avatar image for `avatar`. */
    avatarSrc?: string;
    /** Payment method icon for `payment`, e.g. `VisaIcon` from foundations/payment-icons. */
    paymentIcon?: FC<{ className?: string }>;
    /** Link buttons under the text for `payment`. Clicks don't select the card. */
    actions?: ReactNode;
    /** Large price for `card`, e.g. "$10". */
    price?: ReactNode;
    /** Shown next to the price for `card`, e.g. "per month". */
    period?: ReactNode;
    /** Top-right of the body for `card`, e.g. a `BadgeWithDot`. */
    badge?: ReactNode;
    className?: string;
}

export const RadioCard = ({
    type = "radio",
    title,
    subtitle,
    description,
    icon,
    avatarSrc,
    paymentIcon: PaymentIcon,
    actions,
    price,
    period,
    badge,
    className,
    ...props
}: RadioCardProps) => {
    const { size } = useContext(RadioCardContext);
    const s = styles[size];

    return (
        <AriaRadio
            {...props}
            className={(state) =>
                cx(
                    "relative flex cursor-pointer rounded-xl bg-primary ring-1 ring-secondary outline-focus-ring transition ring-inset",
                    type === "card" ? "flex-col" : "items-start p-4",
                    state.isSelected && "ring-2 ring-brand",
                    state.isFocusVisible && "outline-2 outline-offset-2",
                    state.isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled",
                    className,
                )
            }
        >
            {({ isSelected, isDisabled }) => {
                const check = <CheckboxBase size={size} isSelected={isSelected} isDisabled={isDisabled} />;

                const textBlock = (
                    <div className={cx("flex min-w-0 flex-1 flex-col", s.textWrapper)}>
                        <p className={cx("flex flex-wrap items-baseline", s.titleRow)}>
                            <span className={cx("text-secondary", s.title)}>{title}</span>
                            {subtitle && <span className={cx("text-tertiary", s.text)}>{subtitle}</span>}
                        </p>
                        {description && <p className={cx("text-tertiary", s.text)}>{description}</p>}
                    </div>
                );

                if (type === "radio" || type === "checkbox") {
                    return (
                        <div className={cx("flex flex-1 items-start", s.inlineGap)}>
                            <div className="pt-0.5">
                                {type === "radio" ? (
                                    <RadioButtonBase size={size} isSelected={isSelected} isDisabled={isDisabled} />
                                ) : (
                                    <CheckboxBase size={size} isSelected={isSelected} isDisabled={isDisabled} />
                                )}
                            </div>
                            {textBlock}
                        </div>
                    );
                }

                if (type === "card") {
                    return (
                        <>
                            <div
                                className={cx(
                                    // Inset shadow instead of a border so the divider sits inside the header, like Figma's inside stroke.
                                    "flex items-center gap-1 py-3 pr-5 pl-3",
                                    isSelected
                                        ? "shadow-[inset_0_-2px_0_0_var(--color-border-brand)]"
                                        : isDisabled
                                          ? "shadow-[inset_0_-1px_0_0_var(--color-border-disabled)]"
                                          : "shadow-[inset_0_-1px_0_0_var(--color-border-secondary)]",
                                )}
                            >
                                <div className={cx("flex flex-1 items-center", s.contentGap)}>
                                    {icon && <FeaturedIcon icon={icon} color="gray" theme="modern" size={size} />}
                                    <p className={cx("text-secondary", s.cardTitle)}>{title}</p>
                                </div>
                                {check}
                            </div>
                            <div className="flex items-start gap-1 p-4">
                                <div className={cx("flex min-w-0 flex-1 flex-col", size === "sm" ? "gap-1" : "gap-2")}>
                                    {price && (
                                        <p className={cx("flex items-end", s.priceWrapper)}>
                                            <span className={cx("text-secondary", s.price)}>{price}</span>
                                            {period && <span className={cx("pb-[3px] text-tertiary", s.text)}>{period}</span>}
                                        </p>
                                    )}
                                    {description && <p className={cx("text-tertiary", s.text)}>{description}</p>}
                                </div>
                                {badge}
                            </div>
                        </>
                    );
                }

                return (
                    <>
                        <div className={cx("flex flex-1 items-start", type === "icon" ? s.contentGap : s.mediaGap)}>
                            {type === "icon" && icon && <FeaturedIcon icon={icon} color="gray" theme="modern" size={size} />}
                            {type === "avatar" && <Avatar src={avatarSrc} size={size} alt="" />}
                            {type === "payment" && PaymentIcon && <PaymentIcon className="h-8 w-11.5 shrink-0" />}

                            {type === "payment" ? (
                                <div className={cx("flex min-w-0 flex-1 flex-col", s.paymentGap)}>
                                    <div className={cx("flex flex-col", s.textWrapper)}>
                                        <p className={cx("text-secondary", s.title)}>{title}</p>
                                        {description && <p className={cx("text-tertiary", s.text)}>{description}</p>}
                                    </div>
                                    {actions && (
                                        // Keep link clicks from toggling the card.
                                        <div className="flex items-center gap-3" onClick={(event) => event.stopPropagation()}>
                                            {actions}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                textBlock
                            )}
                        </div>
                        <div className="ml-1">{check}</div>
                    </>
                );
            }}
        </AriaRadio>
    );
};
