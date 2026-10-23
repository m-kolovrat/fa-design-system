"use client";

import { useEffect, useRef } from "react";
import { TriangleDown, TriangleUp } from "fa-icons";
import { cx } from "@/utils/cx";

export interface TickerItem {
    /** Instrument name, e.g. "Brent spot". */
    label: string;
    /** Current price, already formatted. */
    value: string;
    /** Change, already formatted, e.g. "1,27%". */
    change: string;
    direction: "up" | "down";
    /** Link to the instrument page. */
    href?: string;
}

interface TickerBarProps {
    items: TickerItem[];
    /**
     * Seconds for one full pass of the list. Matches finansavisen.no.
     * @default 26
     */
    duration?: number;
    className?: string;
}

/**
 * The list is rendered three times side by side. The middle copy is the real one (read by screen
 * readers, reachable by Tab); the outer two are visual repeats. Scrolling is kept within the
 * middle copy's range and shifted by one copy width when it leaves it, which looks identical,
 * so the bar scrolls endlessly in both directions.
 */
const COPIES = 3;
const REAL_COPY = 1;

/** How long auto-scroll waits after a touch or wheel scroll before it resumes. */
const RESUME_DELAY = 2000;

const TickerEntry = ({ item, isRepeat }: { item: TickerItem; isRepeat: boolean }) => {
    const content = (
        <>
            <span className="font-medium text-white">{item.label}</span>
            <span className="flex items-center gap-1 font-semibold">
                <span className="text-white">{item.value}</span>
                <span className={cx("flex items-center gap-1", item.direction === "up" ? "text-fg-success-secondary" : "text-fg-error-secondary")}>
                    {item.direction === "up" ? <TriangleUp className="size-4" /> : <TriangleDown className="size-4" />}
                    <span className="sr-only">{item.direction === "up" ? "Opp" : "Ned"}</span>
                    {item.change}
                </span>
            </span>
        </>
    );

    const className = "-mx-1.5 flex shrink-0 items-center gap-3 rounded-md px-1.5 py-1 text-xs";

    if (!item.href) return <div className={className}>{content}</div>;

    return (
        <a
            href={item.href}
            tabIndex={isRepeat ? -1 : undefined}
            className={cx(className, "outline-focus-ring transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:-outline-offset-2")}
        >
            {content}
        </a>
    );
};

/**
 * Market ticker above the site header (Figma: Ticker bar). The same in every brand.
 * Scrolls by itself like finansavisen.no, and can also be scrolled by hand (wheel, trackpad,
 * swipe) in either direction. Auto-scroll pauses while hovered or focused and resumes shortly
 * after a touch or wheel scroll. With reduced motion it only scrolls by hand.
 */
export const TickerBar = ({ items, duration = 26, className }: TickerBarProps) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const copyRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        const copy = copyRef.current;
        if (!scroller || !copy) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let copyWidth = copy.offsetWidth;
        // Scroll position as a float; `scrollLeft` can round, which would stall slow movement.
        let position = copyWidth;
        let isHovered = false;
        let isFocused = false;
        let isTouching = false;
        let resumeAt = 0;
        let lastTime = performance.now();
        let frame = 0;

        // Keep the position inside the real copy's range, one copy width at a time.
        const wrap = () => {
            if (copyWidth <= 0) return;
            if (position < copyWidth) position += copyWidth;
            else if (position >= copyWidth * 2) position -= copyWidth;
        };

        scroller.scrollLeft = position;

        const tick = (time: number) => {
            const delta = Math.min(time - lastTime, 100);
            lastTime = time;

            const isPaused = isHovered || isFocused || isTouching || time < resumeAt || reducedMotion.matches;
            if (!isPaused && copyWidth > 0) {
                position += (copyWidth / duration) * (delta / 1000);
                wrap();
                scroller.scrollLeft = position;
            }

            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        const onScroll = () => {
            // A scroll we didn't cause: follow it, and wrap so manual scrolling never ends.
            if (Math.abs(scroller.scrollLeft - position) < 1) return;
            position = scroller.scrollLeft;
            if (!isFocused) {
                wrap();
                if (Math.abs(scroller.scrollLeft - position) >= 1) scroller.scrollLeft = position;
            }
            if (!isHovered) resumeAt = performance.now() + RESUME_DELAY;
        };

        const onPointerEnter = (event: PointerEvent) => {
            if (event.pointerType === "mouse") isHovered = true;
        };
        const onPointerLeave = () => {
            isHovered = false;
        };
        const onTouchStart = () => {
            isTouching = true;
        };
        const onTouchEnd = () => {
            isTouching = false;
            resumeAt = performance.now() + RESUME_DELAY;
        };
        const onFocusIn = () => {
            isFocused = true;
        };
        const onFocusOut = (event: FocusEvent) => {
            if (!scroller.contains(event.relatedTarget as Node | null)) isFocused = false;
        };

        const resizeObserver = new ResizeObserver(() => {
            const offset = position - copyWidth;
            copyWidth = copy.offsetWidth;
            position = copyWidth + offset;
            wrap();
            scroller.scrollLeft = position;
        });
        resizeObserver.observe(copy);

        scroller.addEventListener("scroll", onScroll, { passive: true });
        scroller.addEventListener("pointerenter", onPointerEnter);
        scroller.addEventListener("pointerleave", onPointerLeave);
        scroller.addEventListener("touchstart", onTouchStart, { passive: true });
        scroller.addEventListener("touchend", onTouchEnd);
        scroller.addEventListener("touchcancel", onTouchEnd);
        scroller.addEventListener("focusin", onFocusIn);
        scroller.addEventListener("focusout", onFocusOut);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            scroller.removeEventListener("scroll", onScroll);
            scroller.removeEventListener("pointerenter", onPointerEnter);
            scroller.removeEventListener("pointerleave", onPointerLeave);
            scroller.removeEventListener("touchstart", onTouchStart);
            scroller.removeEventListener("touchend", onTouchEnd);
            scroller.removeEventListener("touchcancel", onTouchEnd);
            scroller.removeEventListener("focusin", onFocusIn);
            scroller.removeEventListener("focusout", onFocusOut);
        };
    }, [duration, items]);

    return (
        <section aria-label="Markedsoversikt" className={cx("relative h-9 bg-primary-solid", className)}>
            <div ref={scrollerRef} className="relative flex h-full [scrollbar-width:none] overflow-x-auto overscroll-x-contain [&::-webkit-scrollbar]:hidden">
                {Array.from({ length: COPIES }, (_, copy) => (
                    <ul
                        key={copy}
                        ref={copy === REAL_COPY ? copyRef : undefined}
                        aria-hidden={copy !== REAL_COPY || undefined}
                        className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10"
                    >
                        {items.map((item) => (
                            <li key={item.label} className="flex">
                                <TickerEntry item={item} isRepeat={copy !== REAL_COPY} />
                            </li>
                        ))}
                    </ul>
                ))}
            </div>

            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-linear-to-r from-bg-primary-solid to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-linear-to-l from-bg-primary-solid to-transparent" />
        </section>
    );
};
