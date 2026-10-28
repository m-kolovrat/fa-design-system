"use client";

/** A fixed 64px ring with the percent in the middle. */
export const CircleProgressBar = (props: {
    /** The progress in percent, 0–100 */
    value: number;
    /** Always 0 */
    min?: 0;
    /** Always 100 */
    max?: 100;
}) => {
    const { value, min = 0, max = 100 } = props;
    const percentage = ((value - min) * 100) / (max - min);

    return (
        <div role="progressbar" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max} className="relative flex w-max items-center justify-center">
            <span className="absolute text-sm font-medium text-primary">{percentage}%</span>
            <svg className="size-16 -rotate-90" viewBox="0 0 60 60">
                <circle className="stroke-bg-quaternary" cx="30" cy="30" r="26" fill="none" strokeWidth="6" />
                <circle
                    className="stroke-fg-brand-secondary"
                    style={{
                        strokeDashoffset: `calc(100 - ${percentage})`,
                    }}
                    cx="30"
                    cy="30"
                    r="26"
                    fill="none"
                    strokeWidth="6"
                    strokeDasharray="100"
                    pathLength="100"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};
