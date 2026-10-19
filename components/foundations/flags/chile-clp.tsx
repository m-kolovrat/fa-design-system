"use client";

import type { SVGProps } from "react";

const ChileClpFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 24C18.627 24 24 18.628 24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 18.628 5.373 24 12 24Z" fill="#F0F0F0" />
            <path d="M24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12C0 5.373 12 12 12 12C12 12 21.083 12 24 12Z" fill="#D80027" />
            <path d="M0 12C0 5.373 5.373 0 12 0V12C12 12 4.174 12 0 12Z" fill="#0052B4" />
            <path
                d="M7.143 4.174L7.92 6.565H10.435L8.4 8.043L9.177 10.435L7.143 8.957L5.109 10.435L5.886 8.043L3.852 6.565H6.366L7.143 4.174Z"
                fill="#F0F0F0"
            />
        </svg>
    );
};

export default ChileClpFlag;
