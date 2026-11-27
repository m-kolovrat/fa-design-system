"use client";

import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";

export const WithLabelDemo = () => {
    return (
        <RadioGroup aria-label="Pricing plans" defaultValue="basic">
            <RadioButton label="Basic plan" value="basic" />
            <RadioButton label="Business plan" value="business" />
            <RadioButton label="Enterprise plan" value="enterprise" />
        </RadioGroup>
    );
};

export const WithLabelAndHintDemo = () => {
    return (
        <RadioGroup aria-label="Pricing plans" defaultValue="basic">
            <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
            <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
            <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
        </RadioGroup>
    );
};

export const DisabledDemo = () => {
    return (
        <RadioGroup aria-label="Pricing plans" isDisabled defaultValue="basic">
            <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
            <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
            <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
        </RadioGroup>
    );
};

export const DisabledIndividualItemDemo = () => {
    return (
        <RadioGroup aria-label="Pricing plans" defaultValue="basic">
            <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
            <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
            <RadioButton isDisabled label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
        </RadioGroup>
    );
};

export const RadioButtons = () => {
    return (
        <RadioGroup aria-label="Pricing plans" defaultValue="basic">
            <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
            <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
            <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
        </RadioGroup>
    );
};

export const RadioButtonsBase = () => {
    return (
        <RadioGroup aria-label="Radio Button Example" defaultValue="option3">
            <RadioButton value="option1" />
            <RadioButton value="option2" />
            <RadioButton isDisabled value="option3" />
        </RadioGroup>
    );
};
