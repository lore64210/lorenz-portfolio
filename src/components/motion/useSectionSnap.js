"use client";

import { useEffect } from "react";

const DESKTOP = "(min-width: 1000px) and (min-height: 640px)";
const HEADER_SELECTOR = ".site-header";
const WHEEL_THRESHOLD = 60;
const WHEEL_IDLE = 250;
const DURATION = 650;
const SETTLE = 80;
const WHEEL_LOCK = DURATION + 200;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function useSectionSnap(containerRef) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        if (!window.matchMedia(DESKTOP).matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const getSections = () =>
            Array.from(container.querySelectorAll(":scope > .snap-section"));

        const getHeaderHeight = () =>
            document.querySelector(HEADER_SELECTOR)?.getBoundingClientRect()
                .height ?? 0;

        const getTargets = () => {
            const header = getHeaderHeight();
            return getSections().map((section, index) =>
                index === 0 ? 0 : section.offsetTop - header
            );
        };

        let animating = false;
        let raf = 0;
        let unlockTimer = 0;
        let accumulated = 0;
        let lastWheelAt = 0;
        let lockedUntil = 0;

        const animateTo = (target) => {
            if (animating || target == null) return;
            animating = true;
            accumulated = 0;
            lockedUntil = performance.now() + WHEEL_LOCK;

            const start = window.scrollY;
            const distance = target - start;
            const startedAt = performance.now();
            const previousBehavior =
                document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = "auto";

            const unlock = () => {
                document.documentElement.style.scrollBehavior =
                    previousBehavior;
                window.clearTimeout(unlockTimer);
                unlockTimer = window.setTimeout(() => {
                    animating = false;
                }, SETTLE);
            };

            if (Math.abs(distance) < 2) {
                window.scrollTo(0, target);
                unlock();
                return;
            }

            const step = (now) => {
                const t = Math.min(1, (now - startedAt) / DURATION);
                window.scrollTo(0, start + distance * easeOutCubic(t));
                if (t < 1) {
                    raf = requestAnimationFrame(step);
                } else {
                    unlock();
                }
            };

            raf = requestAnimationFrame(step);
        };

        const goDirection = (direction) => {
            if (animating) return;

            const scroll = window.scrollY;
            const targets = getTargets();

            if (direction > 0) {
                const target = targets.find((value) => value > scroll + 2);
                if (target !== undefined) animateTo(target);
                return;
            }

            for (let index = targets.length - 1; index >= 0; index--) {
                if (targets[index] < scroll - 2) {
                    animateTo(targets[index]);
                    return;
                }
            }
        };

        const jumpTo = (index) => {
            const targets = getTargets();
            if (index >= 0 && index < targets.length) {
                accumulated = 0;
                lastWheelAt = 0;
                animateTo(targets[index]);
            }
        };

        const onWheel = (event) => {
            if (!window.matchMedia(DESKTOP).matches) return;
            if (event.ctrlKey || event.metaKey || event.altKey) return;

            const target = event.target;
            if (
                target instanceof Element &&
                target.closest("[data-scroll-area]")
            ) {
                return;
            }

            const delta = event.deltaY;
            if (Math.abs(delta) < 4) return;

            const targets = getTargets();
            const lastTarget = targets[targets.length - 1];

            if (
                !animating &&
                delta > 0 &&
                lastTarget !== undefined &&
                window.scrollY >= lastTarget - 2
            ) {
                accumulated = 0;
                return;
            }

            event.preventDefault();

            const now = performance.now();
            if (now < lockedUntil) return;

            if (now - lastWheelAt >= WHEEL_IDLE) accumulated = 0;
            lastWheelAt = now;
            accumulated += delta;

            if (Math.abs(accumulated) < WHEEL_THRESHOLD) return;

            const direction = accumulated > 0 ? 1 : -1;
            accumulated = 0;
            goDirection(direction);
        };

        const onKey = (event) => {
            if (!window.matchMedia(DESKTOP).matches) return;
            if (event.ctrlKey || event.metaKey || event.altKey) return;

            const target = event.target;
            if (
                target instanceof Element &&
                target.closest("input, textarea, select, [contenteditable]")
            ) {
                return;
            }

            if (
                event.key === " " &&
                target instanceof Element &&
                target.closest("button, a, [role='button']")
            ) {
                return;
            }

            switch (event.key) {
                case "ArrowDown":
                case "PageDown":
                case " ":
                    event.preventDefault();
                    goDirection(1);
                    break;
                case "ArrowUp":
                case "PageUp":
                    event.preventDefault();
                    goDirection(-1);
                    break;
                case "Home":
                    event.preventDefault();
                    jumpTo(0);
                    break;
                case "End":
                    event.preventDefault();
                    jumpTo(getSections().length - 1);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("keydown", onKey);

        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKey);
            cancelAnimationFrame(raf);
            window.clearTimeout(unlockTimer);
            document.documentElement.style.scrollBehavior = "";
        };
    }, [containerRef]);
}
