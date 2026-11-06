"use client";

import { useEffect, useRef } from "react";

const ACCENT = "255, 122, 89";
const LINK_RADIUS = 145;
const MOBILE_LINK_RADIUS = 110;
const REPEL_RADIUS = 140;
const REPEL_FORCE = 0.045;
const REPEL_DECAY = 0.93;
const REPEL_MAX = 0.65;
const FRAME_MS = 1000 / 30;

/**
 * Fondo de constelación interactivo.
 *
 * Mantiene una base de partículas y empuja las cercanas al mouse. Todo se
 * dibuja en canvas 2D a 30fps y 1x para que el costo sea bajo incluso con ~90
 * partículas.
 */
export default function NetworkBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        let width = 0;
        let height = 0;
        let particles = [];
        let raf = 0;
        let lastTime = 0;
        let lastDraw = 0;
        let running = false;

        const pointer = {
            x: -9999,
            y: -9999,
            active: false,
        };

        const isMobile = () => window.innerWidth < 760;

        const getCount = () => {
            const area = width * height;

            if (isMobile()) {
                return Math.max(
                    28,
                    Math.min(55, Math.round(area / 30000)),
                );
            }

            return Math.max(55, Math.min(90, Math.round(area / 19000)));
        };

        const getLinkRadius = () =>
            isMobile() ? MOBILE_LINK_RADIUS : LINK_RADIUS;

        const makeParticle = () => {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.035 * (0.5 + Math.random());

            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                rx: 0,
                ry: 0,
                r: 0.8 + Math.random() * 1.4,
            };
        };

        const setup = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            particles = Array.from({ length: getCount() }, makeParticle);
            draw();
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const link = getLinkRadius();

            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];

                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distanceSq = dx * dx + dy * dy;

                    if (distanceSq > link * link) continue;

                    const alpha =
                        (1 - Math.sqrt(distanceSq) / link) * 0.22;
                    ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }

            ctx.fillStyle = `rgba(${ACCENT}, 0.65)`;
            for (const particle of particles) {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const tick = (time) => {
            raf = 0;
            if (!running) return;

            if (time - lastDraw < FRAME_MS) {
                raf = requestAnimationFrame(tick);
                return;
            }

            const dt = lastTime ? Math.min(time - lastTime, 50) : 16;
            lastTime = time;
            lastDraw = time;

            for (const particle of particles) {
                if (pointer.active) {
                    const dx = particle.x - pointer.x;
                    const dy = particle.y - pointer.y;
                    const distanceSq = dx * dx + dy * dy;

                    if (
                        distanceSq < REPEL_RADIUS * REPEL_RADIUS &&
                        distanceSq > 0.01
                    ) {
                        const distance = Math.sqrt(distanceSq);
                        const force =
                            (1 - distance / REPEL_RADIUS) * REPEL_FORCE;
                        particle.rx += (dx / distance) * force;
                        particle.ry += (dy / distance) * force;
                    }
                }

                particle.rx = Math.max(
                    -REPEL_MAX,
                    Math.min(REPEL_MAX, particle.rx * REPEL_DECAY),
                );
                particle.ry = Math.max(
                    -REPEL_MAX,
                    Math.min(REPEL_MAX, particle.ry * REPEL_DECAY),
                );
                particle.x += (particle.vx + particle.rx) * dt;
                particle.y += (particle.vy + particle.ry) * dt;

                if (particle.x < 0) {
                    particle.x = 0;
                    particle.vx *= -1;
                } else if (particle.x > width) {
                    particle.x = width;
                    particle.vx *= -1;
                }

                if (particle.y < 0) {
                    particle.y = 0;
                    particle.vy *= -1;
                } else if (particle.y > height) {
                    particle.y = height;
                    particle.vy *= -1;
                }
            }

            draw();
            raf = requestAnimationFrame(tick);
        };

        const onPointerMove = (event) => {
            if (
                event.pointerType &&
                event.pointerType !== "mouse" &&
                event.pointerType !== "pen"
            ) {
                return;
            }

            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.active = true;
        };

        const onPointerLeave = () => {
            pointer.active = false;
        };

        const onPointerEnter = (event) => {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.active = true;
        };

        const start = () => {
            if (running || reduced.matches) return;
            running = true;
            lastTime = 0;
            raf = requestAnimationFrame(tick);
        };

        const stop = () => {
            running = false;
            if (raf) cancelAnimationFrame(raf);
            raf = 0;
        };

        const onVisibilityChange = () => {
            if (document.hidden) stop();
            else if (!reduced.matches) start();
        };

        const onResize = () => setup();

        setup();

        if (!reduced.matches) start();
        else draw();

        window.addEventListener("pointermove", onPointerMove, {
            passive: true,
        });
        window.addEventListener("pointerenter", onPointerEnter);
        document.addEventListener("pointerleave", onPointerLeave);
        window.addEventListener("resize", onResize);
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            stop();
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerenter", onPointerEnter);
            document.removeEventListener("pointerleave", onPointerLeave);
            window.removeEventListener("resize", onResize);
            document.removeEventListener(
                "visibilitychange",
                onVisibilityChange,
            );
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="network-background"
            aria-hidden="true"
        />
    );
}
