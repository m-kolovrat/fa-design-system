"use client";

import type { SVGProps } from "react";

const SwedenSekFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24Z" fill="#FFDA44" />
            <path d="M9.392 10.435H23.899C23.132 4.547 18.097 0 12 0C11.104 0 10.232 0.099 9.392 0.285V10.435H9.392Z" fill="#0052B4" />
            <path d="M6.261 10.435V1.459C2.966 3.257 0.607 6.555 0.102 10.435H6.261V10.435Z" fill="#0052B4" />
            <path d="M6.261 13.565H0.102C0.607 17.445 2.966 20.743 6.261 22.541L6.261 13.565Z" fill="#0052B4" />
            <path d="M9.392 13.565V23.715C10.232 23.901 11.104 24 12 24C18.097 24 23.132 19.453 23.899 13.565H9.392V13.565Z" fill="#0052B4" />
        </svg>
    );
};

export default SwedenSekFlag;
