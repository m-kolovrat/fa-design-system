"use client";

import type { SVGProps } from "react";

const BulgariaBgnFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M24 12C24 10.532 23.736 9.126 23.254 7.826L12 7.304L0.746 7.826C0.264 9.126 0 10.532 0 12C0 13.468 0.264 14.874 0.746 16.174L12 16.696L23.254 16.174C23.736 14.874 24 13.468 24 12Z"
                fill="#14985E"
            />
            <path d="M12 24C17.159 24 21.558 20.743 23.253 16.174H0.746C2.442 20.743 6.84 24 12 24Z" fill="#D80027" />
            <path d="M0.746 7.826H23.253C21.558 3.256 17.159 0 12 0C6.84 0 2.442 3.256 0.746 7.826Z" fill="#F0F0F0" />
        </svg>
    );
};

export default BulgariaBgnFlag;
