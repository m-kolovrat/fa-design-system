"use client";

import type { SVGProps } from "react";

const VietnamVndFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24Z" fill="#D80027" />
            <path
                d="M12 6.261L13.295 10.247H17.485L14.095 12.71L15.39 16.696L12 14.232L8.609 16.696L9.904 12.71L6.514 10.247H10.704L12 6.261Z"
                fill="#FFDA44"
            />
        </svg>
    );
};

export default VietnamVndFlag;
