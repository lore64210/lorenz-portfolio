"use client";

import { useEffect, useRef } from "react";

export default function RevealMedia({
    as: Tag = "div",
    children,
    className = "",
    play = false,
    delay = 0,
    ...rest
}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || play) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        el.classList.add("is-armed");

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("is-visible");
                    observer.disconnect();
                }
            },
            { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [play]);

    return (
        <Tag
            ref={ref}
            className={`motion-media ${
                play ? "motion-media-play" : ""
            } ${className}`.trim()}
            style={{ "--media-delay": `${delay}s` }}
            onAnimationEnd={(event) => {
                if (event.target === event.currentTarget) {
                    event.currentTarget.classList.add("is-done");
                }
            }}
            {...rest}
        >
            {children}
        </Tag>
    );
}
