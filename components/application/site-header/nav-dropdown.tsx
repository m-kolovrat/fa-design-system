"use client";

import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import type { SiteNavItem } from "./site-brands";

/** Hover intent: wait before opening so passing over the row doesn't flash menus. */
const OPEN_DELAY = 150;
/** Grace period for moving the pointer from the link down into the menu. */
const CLOSE_DELAY = 200;

interface NavDropdownProps {
    item: SiteNavItem & { items: SiteNavItem[] };
    /** The nav link that triggers the dropdown. Receives whether the dropdown is open. */
    children: (isOpen: boolean) => ReactNode;
}

/**
 * A desktop nav link with a dropdown of sub-links, like finansavisen.no: it opens on hover after
 * a short delay, and the link itself still goes to the section page. Keyboard users open it with
 * Arrow Down on the link; Escape closes it and returns focus to the link.
 */
export const NavDropdown = ({ item, children }: NavDropdownProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const timer = useRef<number | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [openedByKeyboard, setOpenedByKeyboard] = useState(false);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const schedule = (open: boolean, delay: number) => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            setOpenedByKeyboard(false);
            setIsOpen(open);
        }, delay);
    };

    const onHoverStart = (event: { pointerType: string }) => {
        if (event.pointerType === "mouse") schedule(true, OPEN_DELAY);
    };
    const onHoverEnd = (event: { pointerType: string }) => {
        if (event.pointerType === "mouse") schedule(false, CLOSE_DELAY);
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "ArrowDown") return;
        event.preventDefault();
        window.clearTimeout(timer.current);
        setOpenedByKeyboard(true);
        setIsOpen(true);
    };

    const onOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open && openedByKeyboard) triggerRef.current?.querySelector("a")?.focus();
    };

    return (
        <div ref={triggerRef} className="flex" onPointerEnter={onHoverStart} onPointerLeave={onHoverEnd} onKeyDown={onKeyDown}>
            {children(isOpen)}

            <Dropdown.Popover
                triggerRef={triggerRef}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isNonModal={!openedByKeyboard}
                placement="bottom start"
                offset={8}
            >
                <div onPointerEnter={onHoverStart} onPointerLeave={onHoverEnd}>
                    <Dropdown.Menu aria-label={item.label} autoFocus={openedByKeyboard ? "first" : false}>
                        {item.items.map((sub) => (
                            <Dropdown.Item key={sub.href} id={sub.href} href={sub.href} label={sub.label} />
                        ))}
                    </Dropdown.Menu>
                </div>
            </Dropdown.Popover>
        </div>
    );
};
