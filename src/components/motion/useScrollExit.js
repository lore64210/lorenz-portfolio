"use client";

import { useEffect } from "react";

const entries = new Set();
let raf = 0;
let lastY = 0;
let lastDirection = "down";
let listening = false;

function update() {
    raf = 0;
    if (typeof window === "undefined") return;

    const y = window.scrollY;
    const direction =
        y > lastY ? "down" : y < lastY ? "up" : lastDirection;
    lastDirection = direction;
    lastY = y;
    const viewportHeight = window.innerHeight;

    entries.forEach((el) => {
        const rect = el.getBoundingClientRect();
        let clip = "";

        if (direction === "down") {
            // Sale por arriba: se recorta desde abajo hacia arriba.
            if (rect.top < 0 && rect.bottom > 0) {
                const progress = Math.min(
                    1,
                    Math.max(0, -rect.top / Math.max(1, rect.height))
                );
                clip = `inset(0 0 ${(progress * 100).toFixed(2)}% 0)`;
            }
        } else if (rect.bottom > viewportHeight && rect.top < viewportHeight) {
            // Sale por abajo: se recorta desde arriba hacia abajo.
            const progress = Math.min(
                1,
                Math.max(
                    0,
                    (rect.bottom - viewportHeight) / Math.max(1, rect.height)
                )
            );
            clip = `inset(${(progress * 100).toFixed(2)}% 0 0 0)`;
        }

        if (clip) {
            el.style.clipPath = clip;
            el.style.willChange = "clip-path";
        } else {
            el.style.clipPath = "";
            el.style.willChange = "";
        }
    });
}

function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(update);
}

function startListening() {
    if (listening) return;
    listening = true;
    lastY = window.scrollY;
    lastDirection = "down";
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
}

function stopListening() {
    if (!listening) return;
    listening = false;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
    }
}

export default function useScrollExit(ref) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        entries.add(el);
        startListening();

        return () => {
            entries.delete(el);
            el.style.clipPath = "";
            el.style.willChange = "";
            if (entries.size === 0) stopListening();
        };
    }, [ref]);
}
