"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
    const bar = useRef(null);

    useEffect(() => {
        const el = bar.current;
        if (!el) return;

        let raf = 0;

        const update = () => {
            const max =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? window.scrollY / max : 0;
            el.style.transform = `scaleX(${progress})`;
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
    }, []);

    return (
        <div className="scroll-progress" aria-hidden="true">
            <div ref={bar} className="scroll-progress-bar" />
        </div>
    );
}
