"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Decorative 3D stage that replaces the old profile illustrations.
 *
 * Three.js is imported lazily so the rest of the page/SSR never pays for it.
 * `variant` only changes the layout class and which dance the instance starts
 * on; the scene itself is shared by every placement.
 */
export default function DancerCanvas({
    variant = "hero",
    label,
    className = "",
}) {
    const hostRef = useRef(null);
    const canvasRef = useRef(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const host = hostRef.current;
        const canvas = canvasRef.current;
        if (!host || !canvas) return;

        const controller = new AbortController();
        let cancelled = false;
        let started = false;
        let destroy = null;
        let sizeObserver = null;
        let idleId = 0;
        let startTimer = 0;
        let startScheduled = false;

        const init = () => {
            if (started || cancelled) return true;

            const rect = host.getBoundingClientRect();
            if (rect.width < 2 || rect.height < 2) return false;

            started = true;
            sizeObserver?.disconnect();

            import("./dancerScene")
                .then(({ createDancer }) =>
                    createDancer({
                        host,
                        canvas,
                        variant,
                        signal: controller.signal,
                        onReady: () => {
                            if (!cancelled) setStatus("ready");
                        },
                        onError: (error) => {
                            console.warn("[DancerCanvas]", error);
                            if (!cancelled) setStatus("failed");
                        },
                    })
                )
                .then((cleanup) => {
                    if (cancelled) cleanup?.();
                    else destroy = cleanup;
                })
                .catch((error) => {
                    console.warn("[DancerCanvas]", error);
                    if (!cancelled) setStatus("failed");
                });

            return true;
        };

        const startWhenSized = () => {
            if (init()) return;
            sizeObserver = new ResizeObserver(() => {
                init();
            });
            sizeObserver.observe(host);
        };

        const scheduleStart = () => {
            if (startScheduled || started || cancelled) return;
            startScheduled = true;

            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(startWhenSized, {
                    timeout: 1500,
                });
            } else {
                startTimer = window.setTimeout(startWhenSized, 400);
            }
        };

        // Start the hero scene right away, but wait until the about/contact
        // stages are near the viewport. Checking the rect (instead of using
        // IntersectionObserver) also works while the parent reveal animation
        // is still clipping the stage.
        const maybeStart = () => {
            if (started || cancelled || startScheduled) return;

            const rect = host.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                scheduleStart();
            }
        };

        window.addEventListener("scroll", maybeStart, { passive: true });
        window.addEventListener("resize", maybeStart);
        maybeStart();

        return () => {
            cancelled = true;
            controller.abort();
            window.removeEventListener("scroll", maybeStart);
            window.removeEventListener("resize", maybeStart);
            sizeObserver?.disconnect();
            if (idleId) window.cancelIdleCallback(idleId);
            window.clearTimeout(startTimer);
            destroy?.();
        };
    }, [variant]);

    return (
        <div
            ref={hostRef}
            className={`dancer-stage dancer-stage--${variant} ${
                status === "ready" ? "is-ready" : ""
            } ${status === "failed" ? "is-failed" : ""} ${className}`.trim()}
        >
            <div className="dancer-shadow" aria-hidden="true" />
            <canvas
                ref={canvasRef}
                className="dancer-canvas"
                role={label ? "img" : undefined}
                aria-label={label}
                aria-hidden={label ? undefined : "true"}
            />
            <div className="dancer-loading" aria-hidden="true" />
            <div className="dancer-fallback" aria-hidden="true" />
        </div>
    );
}
