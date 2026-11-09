"use client";

import { Slider } from "@/components/base/slider/slider";

export const Default = () => {
    return <Slider label="Aksjeandel" defaultValue={[0, 25]} />;
};

export const BottomLabel = () => {
    return <Slider label="Aksjeandel" defaultValue={[0, 25]} labelPosition="bottom" />;
};

export const TopFloating = () => {
    return <Slider label="Aksjeandel" defaultValue={[0, 25]} labelPosition="top-floating" />;
};

export const SingleThumb = () => {
    return <Slider aria-label="Aksjeandel" defaultValue={50} labelPosition="top-floating" />;
};
