"use client";

import type { SVGProps } from "react";

/** Single color: follows the text color (`currentColor`). */
const KapitalSmallLogo = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="22" height="26" viewBox="0 0 22 26" fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0.696H7.855C7.823 3.88 7.855 7.1 7.726 10.285H7.984L12.362 0.696H20.603L14.614 12.373L21.408 25.558H12.619L7.984 15.079H7.726C7.855 19.325 7.823 22.029 7.855 25.557H0V0.696Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default KapitalSmallLogo;
