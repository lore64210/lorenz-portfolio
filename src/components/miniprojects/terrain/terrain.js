"use client";
import P5Container from "@/components/miniprojects/P5Container/P5Container";
import useIsMobile from "@/hooks/useIsMobile";
import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import Slider from "@/components/miniprojects/slider/slider";
import {
    CANVAS_SIZE,
    CELL_SCALE,
    DEFAULT_VALUES,
    NOISE_SPEED_DIVISOR,
    NOISE_STEP,
    RANGES,
    VERTEX_SPACING,
} from "./constants";

export default function Terrain({ dict }) {
    const windowSize = useWindowSize();
    const flying = useRef(0);
    const terrainRef = useRef();
    const canvasSize = CANVAS_SIZE;
    const rows = canvasSize / CELL_SCALE;
    const cols = rows;
    const isMobile = useIsMobile();
    const [restart, setRestart] = useState(false);
    const [speedValue, setSpeedValue] = useState(DEFAULT_VALUES.speed);
    const [mountainSizeValue, setMountainSizeValue] = useState(
        DEFAULT_VALUES.mountainSize
    );
    const [rotateXValue, setRotateXValue] = useState(DEFAULT_VALUES.rotateX);
    const [rotateZValue, setRotateZValue] = useState(DEFAULT_VALUES.rotateZ);
    const [distanceValue, setDistanceValue] = useState(
        DEFAULT_VALUES.distance
    );
    const [distanceHorizontalValue, setDistanceHorizontalValue] = useState(
        DEFAULT_VALUES.horizontalDistance
    );
    const distanceRef = useRef(distanceValue);
    const listenersRef = useRef(null);

    useEffect(() => {
        distanceRef.current = distanceValue;
    }, [distanceValue]);

    useEffect(() => {
        return () => {
            listenersRef.current?.abort();
        };
    }, []);

    useEffect(() => {
        setRestart(true);
    }, []);

    const setup = (p5, canvasRef) => {
        const canvasSize = isMobile
            ? windowSize.width - 20
            : windowSize.height / 1.5;
        p5.createCanvas(canvasSize, canvasSize, p5.WEBGL).parent(canvasRef);

        const terrain = new Array(rows);
        for (let i = 0; i < terrain.length; i++) {
            terrain[i] = new Array(rows);
        }
        terrainRef.current = terrain;

        const canvas = p5.canvas;
        canvas.style.touchAction = "none";
        canvas.style.cursor = "grab";

        const clamp = (value, min, max) =>
            Math.min(max, Math.max(min, value));
        const pointers = new Map();
        let dragging = false;
        let lastX = 0;
        let lastY = 0;
        let pinchStartDistance = 0;
        let pinchStartValue = 0;
        let pinching = false;

        const onPointerDown = (event) => {
            pointers.set(event.pointerId, {
                x: event.clientX,
                y: event.clientY,
            });

            try {
                canvas.setPointerCapture?.(event.pointerId);
            } catch {
                // Pointer capture is best-effort.
            }

            if (pointers.size === 1) {
                dragging = true;
                lastX = event.clientX;
                lastY = event.clientY;
                canvas.style.cursor = "grabbing";
            } else if (pointers.size === 2) {
                dragging = false;
                const [a, b] = [...pointers.values()];
                pinchStartDistance = Math.hypot(a.x - b.x, a.y - b.y);
                pinchStartValue = distanceRef.current;
                pinching = true;
            }
        };

        const onPointerMove = (event) => {
            if (!pointers.has(event.pointerId)) return;

            pointers.set(event.pointerId, {
                x: event.clientX,
                y: event.clientY,
            });

            if (pointers.size >= 2) {
                const [a, b] = [...pointers.values()];
                const distance = Math.hypot(a.x - b.x, a.y - b.y);

                if (pinching && pinchStartDistance > 0) {
                    setDistanceValue(
                        clamp(
                            pinchStartValue -
                                (distance - pinchStartDistance) * 2.5,
                            10,
                            3000
                        )
                    );
                }
                return;
            }

            if (!dragging) return;

            const dx = event.clientX - lastX;
            const dy = event.clientY - lastY;
            lastX = event.clientX;
            lastY = event.clientY;

            setRotateZValue((value) => clamp(value + dx * 0.14, 1, 64));
            setRotateXValue((value) => clamp(value + dy * 0.14, 20, 80));
        };

        const onPointerUp = (event) => {
            pointers.delete(event.pointerId);

            if (pointers.size === 1) {
                const [remaining] = [...pointers.values()];
                dragging = true;
                lastX = remaining.x;
                lastY = remaining.y;
                pinching = false;
            } else if (pointers.size === 0) {
                dragging = false;
                pinching = false;
                canvas.style.cursor = "grab";
            }
        };

        const onWheel = (event) => {
            event.preventDefault();
            const delta = Math.max(-120, Math.min(120, event.deltaY));
            setDistanceValue((value) =>
                clamp(value + delta * 1.2, 10, 3000)
            );
        };

        const controller = new AbortController();
        listenersRef.current?.abort();
        listenersRef.current = controller;
        const options = { signal: controller.signal };

        canvas.addEventListener("pointerdown", onPointerDown, options);
        canvas.addEventListener("pointermove", onPointerMove, options);
        canvas.addEventListener("pointerup", onPointerUp, options);
        canvas.addEventListener("pointercancel", onPointerUp, options);
        canvas.addEventListener("wheel", onWheel, {
            passive: false,
            signal: controller.signal,
        });
    };

    const draw = (p5) => {
        p5.background(0);
        p5.stroke(255);
        p5.noFill();
        p5.rotateX(p5.PI / (rotateXValue / 10));
        p5.rotateZ(rotateZValue / 10);
        p5.translate(
            -canvasSize * 2.1,
            (-canvasSize * distanceHorizontalValue) / 10,
            -distanceValue
        );
        flying.current -= speedValue / NOISE_SPEED_DIVISOR;
        let yoff = flying.current;
        for (let y = 0; y < cols; y++) {
            let xoff = 0;
            for (let x = 0; x < rows; x++) {
                terrainRef.current[x][y] = p5.map(
                    p5.noise(xoff, yoff),
                    0,
                    1,
                    -mountainSizeValue,
                    mountainSizeValue
                );
                xoff += NOISE_STEP;
            }
            yoff += NOISE_STEP;
        }
        for (let y = 0; y < cols - 1; y++) {
            p5.beginShape(p5.TRIANGLE_STRIP);
            for (let x = 0; x < rows; x++) {
                p5.vertex(
                    x * CELL_SCALE * VERTEX_SPACING,
                    y * CELL_SCALE * VERTEX_SPACING,
                    terrainRef.current[x][y]
                );
                p5.vertex(
                    x * CELL_SCALE * VERTEX_SPACING,
                    (y + 1) * CELL_SCALE * VERTEX_SPACING,
                    terrainRef.current[x][y + 1]
                );
            }
            p5.endShape();
        }
    };

    return (
        <div className="mini-project-container">
            <P5Container
                draw={draw}
                setup={setup}
                overrideSetup
                restart={restart}
            />
            <div className="mini-projects-controls">
                <Slider
                    label={dict["projects-content"]["terrain"].labels["speed"]}
                    onChange={setSpeedValue}
                    value={speedValue}
                />
                <Slider
                    label={
                        dict["projects-content"]["terrain"].labels[
                            "mountain-size"
                        ]
                    }
                    onChange={setMountainSizeValue}
                    value={mountainSizeValue}
                    min={RANGES.mountainSize.min}
                    max={RANGES.mountainSize.max}
                />
                <Slider
                    label={
                        dict["projects-content"]["terrain"].labels[
                            "horizontal-distance"
                        ]
                    }
                    onChange={setDistanceHorizontalValue}
                    value={distanceHorizontalValue}
                    min={RANGES.horizontalDistance.min}
                    max={RANGES.horizontalDistance.max}
                />
                <p className="mini-projects-hint">
                    {dict["projects-content"]["terrain"].labels["hint"]}
                </p>
            </div>
        </div>
    );
}
