"use client";

import type { SVGProps } from "react";

const RussiaRubFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24Z" fill="#F0F0F0" />
            <path
                d="M23.254 16.174C23.736 14.874 24 13.468 24 12C24 10.532 23.736 9.126 23.254 7.826H0.746C0.264 9.126 0 10.532 0 12C0 13.468 0.264 14.874 0.746 16.174L12 17.217L23.254 16.174Z"
                fill="#0052B4"
            />
            <path d="M12 24C17.159 24 21.558 20.743 23.253 16.174H0.746C2.442 20.743 6.84 24 12 24Z" fill="#D80027" />
        </svg>
    );
};

export default RussiaRubFlag;
