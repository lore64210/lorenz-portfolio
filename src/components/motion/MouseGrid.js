"use client";

import { useEffect, useRef } from "react";

const CELL = 12;
const FADE_IN_MS = 260;
const HOLD_MS = 1500;
const FADE_MS = 480;
const SCROLL_FADE_MS = 320;
const NEIGHBOR_WEIGHT = 0.55;
const MAX_CELLS = 1800;
const FRAME_MS = 1000 / 30;

/**
 * Fondo de grilla invisible que se enciende con el mouse.
 *
 * Al pasar por una celda se enciende también el bloque de 3×3 que la rodea.
 * Cada cuadrado entra con un fade de opacidad, queda encendido un rato y se
 * apaga. Se dibuja en canvas para no crear cientos de nodos.
 *
 * Al scrollear se limpia todo: el efecto pertenece a la sección que se está
 * viendo y no tiene que viajar a la siguiente.
 *
 * Es puramente decorativo: no recibe eventos, no aparece en mobile/touch y se
 * desactiva si el usuario prefiere movimiento reducido.
 */
export default function MouseGrid() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        const finePointer = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
        );

        if (!finePointer.matches || reduced.matches) {
            canvas.style.display = "none";
            return;
        }

        let width = 0;
        let height = 0;
        let cols = 0;
        let rows = 0;
        let dpr = 1;
        let raf = 0;
        let last = null;
        let lastAt = 0;
        let scrolling = false;
        let scrollTimer = 0;
        let scrollFadeAt = 0;
        let lastDraw = 0;

        const cells = new Map();

        const now = () => performance.now();

        const draw = (time) => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(255, 122, 89, 0.16)";
            const scrollFade = scrollFadeAt
                ? Math.max(0, 1 - (time - scrollFadeAt) / SCROLL_FADE_MS)
                : 1;

            for (const cell of cells.values()) {
                const x = cell.col * CELL;
                const y = cell.row * CELL;
                const elapsed = time - cell.start;
                let alpha = 1;

                if (elapsed < FADE_IN_MS) {
                    alpha = Math.max(0, elapsed / FADE_IN_MS);
                } else if (time > cell.fadeAt) {
                    alpha = Math.max(0, 1 - (time - cell.fadeAt) / FADE_MS);
                }

                const finalAlpha = alpha * cell.weight * scrollFade;
                if (finalAlpha < 0.01) continue;

                ctx.globalAlpha = finalAlpha;
                ctx.fillRect(x, y, CELL, CELL);
            }

            ctx.globalAlpha = 1;
        };

        const schedule = () => {
            if (!raf) raf = requestAnimationFrame(tick);
        };

        const tick = (frameTime) => {
            raf = 0;
            const time = frameTime || now();

            if (time - lastDraw < FRAME_MS) {
                schedule();
                return;
            }

            lastDraw = time;
            draw(time);

            if (scrollFadeAt && time >= scrollFadeAt + SCROLL_FADE_MS) {
                cells.clear();
                scrollFadeAt = 0;
                draw(time);
            } else {
                for (const [key, cell] of cells) {
                    if (time > cell.fadeAt + FADE_MS) cells.delete(key);
                }
            }

            if (cells.size) schedule();
        };

        const activate = (col, row, weight = 1) => {
            if (scrollFadeAt) return;
            if (col < 0 || row < 0 || col >= cols || row >= rows) return;
            if (!cells.has(`${col}:${row}`) && cells.size >= MAX_CELLS) return;

            const key = `${col}:${row}`;
            const time = now();
            const existing = cells.get(key);

            if (existing) {
                existing.weight = Math.max(existing.weight, weight);

                if (time < existing.fadeAt) {
                    existing.fadeAt = time + HOLD_MS;
                } else {
                    existing.start = time;
                    existing.fadeAt = time + FADE_IN_MS + HOLD_MS;
                }
            } else {
                cells.set(key, {
                    col,
                    row,
                    start: time,
                    fadeAt: time + FADE_IN_MS + HOLD_MS,
                    weight,
                });
            }

            schedule();
        };

        /** Enciende la celda y las 8 de alrededor. */
        const activateArea = (col, row) => {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const weight =
                        dx === 0 && dy === 0 ? 1 : NEIGHBOR_WEIGHT;
                    activate(col + dx, row + dy, weight);
                }
            }
        };

        /** Recorre la línea entre dos celdas para no dejar huecos al mover rápido. */
        const activateLine = (from, to) => {
            let x0 = from.col;
            let y0 = from.row;
            const x1 = to.col;
            const y1 = to.row;
            const dx = Math.abs(x1 - x0);
            const sx = x0 < x1 ? 1 : -1;
            const dy = -Math.abs(y1 - y0);
            const sy = y0 < y1 ? 1 : -1;
            let err = dx + dy;

            while (true) {
                if (x0 === x1 && y0 === y1) {
                    activateArea(x0, y0);
                } else {
                    activate(x0, y0);
                }

                if (x0 === x1 && y0 === y1) break;

                const e2 = 2 * err;
                if (e2 >= dy) {
                    err += dy;
                    x0 += sx;
                }
                if (e2 <= dx) {
                    err += dx;
                    y0 += sy;
                }
            }
        };

        const onPointerMove = (event) => {
            if (scrolling) return;

            const col = Math.floor(event.clientX / CELL);
            const row = Math.floor(event.clientY / CELL);
            const time = now();
            const current = { col, row };

            if (last && last.col === col && last.row === row) return;

            if (last && time - lastAt < 180) {
                activateLine(last, current);
            } else {
                activateArea(col, row);
            }

            last = current;
            lastAt = time;
        };

        const clearNow = () => {
            cells.clear();
            last = null;
            scrollFadeAt = 0;
            draw(now());
        };

        const onScroll = () => {
            if (cells.size && !scrollFadeAt) {
                scrollFadeAt = now();
                schedule();
            }

            last = null;
            scrolling = true;
            window.clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(() => {
                scrolling = false;
            }, SCROLL_FADE_MS + 80);
        };

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 1);
            width = window.innerWidth;
            height = window.innerHeight;
            cols = Math.ceil(width / CELL);
            rows = Math.ceil(height / CELL);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            clearNow();
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", resize);
        resize();

        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", resize);
            window.clearTimeout(scrollTimer);
            cancelAnimationFrame(raf);
        };
    }, []);

    return <canvas ref={canvasRef} className="mouse-grid" aria-hidden="true" />;
}
