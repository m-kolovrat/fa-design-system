"use client";

import { ProgressBarCircle, ProgressBarHalfCircle } from "@/components/base/progress-indicators/progress-circles";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";

export const ProgressBarDefault = () => <ProgressBar aria-label="Sparemål" min={0} max={100} value={40} />;

export const ProgressBarTextRight = () => <ProgressBar aria-label="Sparemål" labelPosition="right" min={0} max={100} value={40} />;

export const ProgressBarTextBottom = () => <ProgressBar aria-label="Sparemål" labelPosition="bottom" min={0} max={100} value={40} />;

export const ProgressBarTextTopFloating = () => <ProgressBar aria-label="Sparemål" labelPosition="top-floating" min={0} max={100} value={40} />;

export const ProgressBarTextBottomFloating = () => <ProgressBar aria-label="Sparemål" labelPosition="bottom-floating" min={0} max={100} value={40} />;

export const CircleProgressBar = () => (
    <div className="flex flex-col items-start gap-10 md:flex-row">
        <ProgressBarCircle size="xxs" aria-label="Sparemål" min={0} max={100} value={40} />
        <ProgressBarCircle size="xs" aria-label="Sparemål" min={0} max={100} value={40} />
        <ProgressBarCircle size="sm" aria-label="Sparemål" min={0} max={100} value={40} />
        {/* <ProgressBarCircle size="md" aria-label="Sparemål" min={0} max={100} value={40} /> */}
        {/* <ProgressBarCircle size="lg" aria-label="Sparemål" min={0} max={100} value={40} /> */}
    </div>
);

export const CircleProgressBarLabel = () => (
    <div className="flex flex-col items-start gap-10 md:flex-row">
        <ProgressBarCircle size="xxs" label="Brukere" min={0} max={100} value={40} />
        <ProgressBarCircle size="xs" label="Aktive brukere" min={0} max={100} value={40} />
        <ProgressBarCircle size="sm" label="Aktive brukere" min={0} max={100} value={40} />
        {/* <ProgressBarCircle size="md" label="Aktive brukere" min={0} max={100} value={40} /> */}
        {/* <ProgressBarCircle size="lg" label="Aktive brukere" min={0} max={100} value={40} /> */}
    </div>
);

export const HalfCircleProgressBar = () => (
    <div className="flex flex-col items-start gap-10 md:flex-row">
        <ProgressBarHalfCircle size="xxs" aria-label="Sparemål" min={0} max={100} value={40} />
        <ProgressBarHalfCircle size="xs" aria-label="Sparemål" min={0} max={100} value={40} />
        <ProgressBarHalfCircle size="sm" aria-label="Sparemål" min={0} max={100} value={40} />
        {/* <ProgressBarHalfCircle size="md" aria-label="Sparemål" min={0} max={100} value={40} /> */}
        {/* <ProgressBarHalfCircle size="lg" aria-label="Sparemål" min={0} max={100} value={40} /> */}
    </div>
);

export const HalfCircleProgressBarLabel = () => (
    <div className="flex flex-col items-start gap-10 md:flex-row">
        <ProgressBarHalfCircle size="xxs" label="Brukere" min={0} max={100} value={40} />
        <ProgressBarHalfCircle size="xs" label="Aktive brukere" min={0} max={100} value={40} />
        <ProgressBarHalfCircle size="sm" label="Aktive brukere" min={0} max={100} value={40} />
        {/* <ProgressBarHalfCircle size="md" label="Aktive brukere" min={0} max={100} value={40} /> */}
        {/* <ProgressBarHalfCircle size="lg" label="Aktive brukere" min={0} max={100} value={40} /> */}
    </div>
);
