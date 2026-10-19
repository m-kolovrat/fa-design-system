"use client";

import type { SVGProps } from "react";

const KuwaitKwdFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M23.254 16.174C23.736 14.874 24 13.468 24 12C24 10.532 23.736 9.126 23.254 7.826L12 6.783L0.746 7.826C0.264 9.126 0 10.532 0 12C0 13.468 0.264 14.874 0.746 16.174L12 17.217L23.254 16.174Z"
                fill="#F0F0F0"
            />
            <path d="M12 24C17.159 24 21.558 20.743 23.253 16.174H0.746C2.442 20.743 6.84 24 12 24Z" fill="#D80027" />
            <path d="M12 0C6.84 0 2.442 3.256 0.746 7.826H23.253C21.558 3.256 17.159 0 12 0Z" fill="#14985E" />
            <path d="M3.515 3.515C-1.172 8.201-1.172 15.799 3.515 20.485C4.738 19.262 5.932 18.068 7.826 16.174V7.826L3.515 3.515Z" fill="#151719" />
        </svg>
    );
};

export default KuwaitKwdFlag;
