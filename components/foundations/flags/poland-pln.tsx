"use client";

import type { SVGProps } from "react";

const PolandPlnFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 24C18.627 24 24 18.628 24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 18.628 5.373 24 12 24Z" fill="#F0F0F0" />
            <path d="M24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12" fill="#D80027" />
        </svg>
    );
};

export default PolandPlnFlag;
