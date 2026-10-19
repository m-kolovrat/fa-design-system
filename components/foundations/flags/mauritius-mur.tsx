"use client";

import type { SVGProps } from "react";

const MauritiusMurFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M1.459 6.261L12 7.304L22.541 6.261C20.506 2.531 16.548 0 12 0C7.451 0 3.494 2.531 1.459 6.261Z" fill="#D80027" />
            <path d="M1.459 17.739L12 18.783L22.541 17.739C23.471 16.034 24 14.079 24 12L12 10.957L0 12C0 14.079 0.529 16.034 1.459 17.739Z" fill="#FFDA44" />
            <path d="M1.459 6.261C0.529 7.966 0 9.921 0 12H24C24 9.921 23.471 7.966 22.541 6.261H12H1.459Z" fill="#0052B4" />
            <path d="M12 24C16.548 24 20.506 21.469 22.541 17.739H1.459C3.494 21.469 7.451 24 12 24Z" fill="#14985E" />
        </svg>
    );
};

export default MauritiusMurFlag;
