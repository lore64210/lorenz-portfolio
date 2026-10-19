"use client";

import { useEffect, useRef, Fragment } from "react";

export default function RevealText({
    text,
    as: Tag = "h2",
    className = "",
    play = false,
    delay = 0,
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
            { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [play]);

    const words = String(text ?? "")
        .split(/\s+/)
        .filter(Boolean);

    return (
        <Tag
            ref={ref}
            className={`motion-words ${
                play ? "motion-words-play" : ""
            } ${className}`.trim()}
            style={{ "--word-delay": `${delay}s` }}
        >
            {words.map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                    <span className="motion-word-mask">
                        <span
                            className="motion-word"
                            style={{ "--word-index": index }}
                        >
                            {word}
                        </span>
                    </span>
                    {index < words.length - 1 ? " " : null}
                </Fragment>
            ))}
        </Tag>
    );
}
