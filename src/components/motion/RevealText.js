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
    const firstCallback = useRef(true);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        if (!play) {
            el.classList.add("is-armed");
        }

        const restart = () => {
            el.classList.remove("motion-words-play");
            void el.offsetWidth;
            el.classList.add("motion-words-play");
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (play) {
                    if (firstCallback.current) {
                        firstCallback.current = false;
                        return;
                    }
                    if (entry.isIntersecting) restart();
                    return;
                }

                if (entry.isIntersecting) {
                    el.classList.add("is-visible");
                } else {
                    el.classList.remove("is-visible");
                }
            },
            { threshold: 0 }
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
