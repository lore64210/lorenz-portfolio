"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import useIsMobile from "@/hooks/useIsMobile";
import "../miniprojects.scss";
import { FALLBACK_CANVAS_SIZE } from "./constants";

const Sketch = dynamic(() => import("react-p5"), { ssr: false });

const P5Container = ({ draw, setup, overrideSetup = false, ...props }) => {
    const { width, height } = useWindowSize();
    const isMobile = useIsMobile();
    const canvasSize = isMobile ? width - 20 : height / 1.5;
    const canResize = Number.isFinite(canvasSize) && canvasSize > 0;

    const p5Ref = useRef(null);
    const hostRef = useRef(null);
    const callbacksRef = useRef({ draw, setup });
    callbacksRef.current = { draw, setup };

    const defaultSetup = (p5, canvas) => {
        p5Ref.current = p5;
        hostRef.current = canvas;

        if (!overrideSetup) {
            const size = canResize ? canvasSize : FALLBACK_CANVAS_SIZE;
            p5.createCanvas(size, size).parent(canvas);
        }

        callbacksRef.current.setup?.(p5, canvas);
    };

    useEffect(() => {
        if (!p5Ref.current || overrideSetup || !canResize) return;
        p5Ref.current.resizeCanvas(canvasSize, canvasSize);
    }, [canvasSize, canResize, overrideSetup]);

    const defaultDraw = (p5) => {
        p5.background(255);
        callbacksRef.current.draw?.(p5);
    };

    const windowResized = (p5) => {
        if (!overrideSetup && canResize) {
            p5.resizeCanvas(canvasSize, canvasSize);
        }
    };

    return (
        <Sketch
            setup={defaultSetup}
            draw={defaultDraw}
            windowResized={windowResized}
            {...props}
        />
    );
};

export default P5Container;
