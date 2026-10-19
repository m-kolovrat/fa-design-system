"use client";

import type { SVGProps } from "react";

const FinlandEurFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 24C18.627 24 24 18.628 24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 18.628 5.373 24 12 24Z" fill="#F0F0F0" />
            <path
                d="M23.898 10.435H9.391H9.391V0.285C8.282 0.531 7.231 0.93 6.261 1.459V10.435V10.435H0.102C0.035 10.947 0 11.47 0 12C0 12.531 0.035 13.053 0.102 13.565H6.261H6.261V22.541C7.231 23.07 8.282 23.469 9.391 23.715V13.565V13.565H23.898C23.965 13.053 24 12.531 24 12C24 11.47 23.965 10.947 23.898 10.435Z"
                fill="#0052B4"
            />
        </svg>
    );
};

export default FinlandEurFlag;
