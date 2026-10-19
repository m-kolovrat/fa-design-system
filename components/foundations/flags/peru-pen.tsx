"use client";

import type { SVGProps } from "react";

const PeruPenFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24Z" fill="#F0F0F0" />
            <path d="M24 12C24 6.84 20.743 2.442 16.174 0.746V23.254C20.743 21.558 24 17.16 24 12Z" fill="#D80027" />
            <path d="M0 12C0 17.16 3.256 21.558 7.826 23.254V0.746C3.256 2.442 0 6.84 0 12Z" fill="#D80027" />
        </svg>
    );
};

export default PeruPenFlag;
