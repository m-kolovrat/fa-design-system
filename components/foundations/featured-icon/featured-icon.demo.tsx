"use client";

import { Success } from "fa-icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

export const DefaultDemo = () => {
    return (
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-10">
            <FeaturedIcon color="brand" icon={Success} theme="light" size="lg" />
            <FeaturedIcon color="brand" icon={Success} theme="gradient" size="lg" />
            <FeaturedIcon color="brand" icon={Success} theme="dark" size="lg" />
            <FeaturedIcon color="gray" icon={Success} theme="modern" size="lg" />
            <FeaturedIcon color="gray" icon={Success} theme="modern-neue" size="lg" />
            <FeaturedIcon color="brand" icon={Success} theme="outline" size="lg" />
        </div>
    );
};

export const LightDemo = () => {
    return (
        <div className="flex flex-col items-start gap-8">
            {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                <div key={color} className="flex gap-4">
                    <FeaturedIcon color={color} icon={Success} theme="light" size="sm" />
                    <FeaturedIcon color={color} icon={Success} theme="light" size="md" />
                    <FeaturedIcon color={color} icon={Success} theme="light" size="lg" />
                    <FeaturedIcon color={color} icon={Success} theme="light" size="xl" />
                </div>
            ))}
        </div>
    );
};

export const GradientDemo = () => {
    return (
        <div className="flex flex-col items-start gap-8">
            {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                <div key={color} className="flex gap-4">
                    <FeaturedIcon color={color} icon={Success} theme="gradient" size="sm" />
                    <FeaturedIcon color={color} icon={Success} theme="gradient" size="md" />
                    <FeaturedIcon color={color} icon={Success} theme="gradient" size="lg" />
                    <FeaturedIcon color={color} icon={Success} theme="gradient" size="xl" />
                </div>
            ))}
        </div>
    );
};

export const DarkDemo = () => {
    return (
        <div className="flex flex-col items-start gap-8">
            {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                <div key={color} className="flex gap-4">
                    <FeaturedIcon color={color} icon={Success} theme="dark" size="sm" />
                    <FeaturedIcon color={color} icon={Success} theme="dark" size="md" />
                    <FeaturedIcon color={color} icon={Success} theme="dark" size="lg" />
                    <FeaturedIcon color={color} icon={Success} theme="dark" size="xl" />
                </div>
            ))}
        </div>
    );
};

export const OutlineDemo = () => {
    return (
        <div className="flex flex-col items-start gap-8">
            {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                <div key={color} className="flex gap-8">
                    <FeaturedIcon color={color} icon={Success} theme="outline" size="sm" />
                    <FeaturedIcon color={color} icon={Success} theme="outline" size="md" />
                    <FeaturedIcon color={color} icon={Success} theme="outline" size="lg" />
                    <FeaturedIcon color={color} icon={Success} theme="outline" size="xl" />
                </div>
            ))}
        </div>
    );
};

export const ModernDemo = () => {
    return (
        <div className="flex items-start gap-4">
            <FeaturedIcon color="gray" icon={Success} theme="modern" size="sm" />
            <FeaturedIcon color="gray" icon={Success} theme="modern" size="md" />
            <FeaturedIcon color="gray" icon={Success} theme="modern" size="lg" />
            <FeaturedIcon color="gray" icon={Success} theme="modern" size="xl" />
        </div>
    );
};

export const ModernNeueDemo = () => {
    return (
        <div className="flex items-start gap-4">
            <FeaturedIcon color="gray" icon={Success} theme="modern-neue" size="sm" />
            <FeaturedIcon color="gray" icon={Success} theme="modern-neue" size="md" />
            <FeaturedIcon color="gray" icon={Success} theme="modern-neue" size="lg" />
            <FeaturedIcon color="gray" icon={Success} theme="modern-neue" size="xl" />
        </div>
    );
};

export const FeaturedIcons = () => {
    return (
        <div className="grid w-max grid-cols-2 gap-12">
            <div className="flex flex-col items-start gap-8">
                {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                    <div key={color} className="flex gap-4">
                        <FeaturedIcon color={color} icon={Success} theme="light" size="sm" />
                        <FeaturedIcon color={color} icon={Success} theme="light" size="md" />
                        <FeaturedIcon color={color} icon={Success} theme="light" size="lg" />
                        <FeaturedIcon color={color} icon={Success} theme="light" size="xl" />
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-start gap-8">
                {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                    <div key={color} className="flex gap-4">
                        <FeaturedIcon color={color} icon={Success} theme="gradient" size="sm" />
                        <FeaturedIcon color={color} icon={Success} theme="gradient" size="md" />
                        <FeaturedIcon color={color} icon={Success} theme="gradient" size="lg" />
                        <FeaturedIcon color={color} icon={Success} theme="gradient" size="xl" />
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-start gap-8">
                {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                    <div key={color} className="flex gap-4">
                        <FeaturedIcon color={color} icon={Success} theme="dark" size="sm" />
                        <FeaturedIcon color={color} icon={Success} theme="dark" size="md" />
                        <FeaturedIcon color={color} icon={Success} theme="dark" size="lg" />
                        <FeaturedIcon color={color} icon={Success} theme="dark" size="xl" />
                    </div>
                ))}
            </div>

            <div className="flex items-start gap-4">
                <FeaturedIcon color="gray" icon={Success} theme="modern" size="sm" />
                <FeaturedIcon color="gray" icon={Success} theme="modern" size="md" />
                <FeaturedIcon color="gray" icon={Success} theme="modern" size="lg" />
                <FeaturedIcon color="gray" icon={Success} theme="modern" size="xl" />
            </div>
        </div>
    );
};

export const FeaturedIconsOutline = () => {
    return (
        <div className="flex flex-col gap-8">
            {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                <div key={color} className="flex gap-8">
                    <FeaturedIcon color={color} icon={Success} theme="outline" size="sm" />
                    <FeaturedIcon color={color} icon={Success} theme="outline" size="md" />
                    <FeaturedIcon color={color} icon={Success} theme="outline" size="lg" />
                    <FeaturedIcon color={color} icon={Success} theme="outline" size="xl" />
                </div>
            ))}
        </div>
    );
};
