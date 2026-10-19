"use client";

import type { SVGProps } from "react";

const ColombiaCopFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12L12 13.044L0 12Z" fill="#FFDA44" />
            <path d="M1.605 18C3.68 21.587 7.558 24 12 24C16.441 24 20.319 21.587 22.394 18L12 17.217L1.605 18Z" fill="#D80027" />
            <path d="M22.394 18C23.415 16.235 24 14.186 24 12H0C0 14.186 0.585 16.235 1.606 18H22.394Z" fill="#0052B4" />
        </svg>
    );
};

export default ColombiaCopFlag;
