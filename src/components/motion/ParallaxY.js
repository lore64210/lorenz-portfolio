"use client";

import { useEffect, useRef } from "react";

export default function ParallaxY({
    children,
    className = "",
    speed = 0.15,
}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        let raf = 0;

        const update = () => {
            const rect = el.getBoundingClientRect();
            const progress =
                (rect.top + rect.height / 2 - window.innerHeight / 2) /
                window.innerHeight;
            const clamped = Math.max(-1, Math.min(1, progress));
            const offset = clamped * speed * 40;
            el.style.transform = `translate3d(0, ${offset}px, 0)`;
        };

        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        update();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
        };
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
