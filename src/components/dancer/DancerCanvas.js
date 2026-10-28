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

        // Hidden placements (e.g. the contact figure on mobile) should not
        // allocate a WebGL context. Start as soon as the stage gets a size.
        if (!init()) {
            sizeObserver = new ResizeObserver(() => {
                init();
            });
            sizeObserver.observe(host);
        }

        return () => {
            cancelled = true;
            controller.abort();
            sizeObserver?.disconnect();
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
