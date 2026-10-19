"use client";

import type { SVGProps } from "react";

const CanadaCadFlag = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24Z" fill="#F0F0F0" />
            <path d="M18.417 1.858V22.142C21.772 20.014 24 16.267 24 12C24 7.733 21.772 3.986 18.417 1.858Z" fill="#D80027" />
            <path d="M5.583 22.142V1.858C2.227 3.986 0 7.733 0 12C0 16.267 2.227 20.014 5.583 22.142Z" fill="#D80027" />
            <path
                d="M14.897 13.471L17.793 12.023L16.345 11.299V9.85L13.448 11.299L14.897 8.402H13.448L12 6.23L10.552 8.402H9.103L10.552 11.299L7.655 9.85V11.299L6.207 12.023L9.103 13.471L8.379 14.919H11.276V17.092H12.724V14.919H15.621L14.897 13.471Z"
                fill="#D80027"
            />
        </svg>
    );
};

export default CanadaCadFlag;
