"use client";

import type { SVGProps } from "react";

const GermanyEurFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M0.746 16.174C2.442 20.743 6.84 24 12 24C17.159 24 21.558 20.743 23.253 16.174L12 15.13L0.746 16.174Z" fill="#FFDA44" />
            <path d="M12 0C6.84 0 2.442 3.257 0.746 7.826L12 8.87L23.253 7.826C21.558 3.256 17.159 0 12 0Z" fill="#151719" />
            <path
                d="M0.746 7.826C0.264 9.126 0 10.532 0 12C0 13.468 0.264 14.874 0.746 16.174H23.254C23.736 14.874 24 13.468 24 12C24 10.532 23.736 9.126 23.254 7.826H0.746Z"
                fill="#D80027"
            />
        </svg>
    );
};

export default GermanyEurFlag;
