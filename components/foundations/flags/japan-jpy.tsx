"use client";

import type { SVGProps } from "react";

const JapanJpyFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24Z" fill="#F0F0F0" />
            <path
                d="M12 17.217C14.881 17.217 17.217 14.881 17.217 12C17.217 9.118 14.881 6.783 12 6.783C9.118 6.783 6.782 9.118 6.782 12C6.782 14.881 9.118 17.217 12 17.217Z"
                fill="#D80027"
            />
        </svg>
    );
};

export default JapanJpyFlag;
