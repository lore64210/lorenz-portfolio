"use client";
import "./RevealMedia.scss";

import { useEffect, useRef } from "react";
import { DEFAULT_DELAY } from "./constants";

export default function RevealMedia({
    as: Tag = "div",
    children,
    className = "",
    play = false,
    delay = DEFAULT_DELAY,
    ...rest
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
            el.classList.remove("is-done");
            el.classList.remove("motion-media-play");
            void el.offsetWidth;
            el.classList.add("motion-media-play");
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
                    el.classList.remove("is-done");
                    el.classList.add("is-visible");
                } else {
                    el.classList.remove("is-visible");
                    el.classList.remove("is-done");
                }
            },
            { threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [play]);

    useEffect(() => {
        ref.current?.style.setProperty("--media-delay", `${delay}s`);
    }, [delay]);

    return (
        <Tag
            ref={ref}
            className={`motion-media ${
                play ? "motion-media-play" : ""
            } ${className}`.trim()}
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
