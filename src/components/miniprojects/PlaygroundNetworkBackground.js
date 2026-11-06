"use client";

import { useEffect, useRef } from "react";

const ACCENT = "255, 122, 89";
const LINK_RADIUS = 150;
const MAX_PARTICLES = 60;
const MIN_PARTICLES = 22;
const FRAME_MS = 1000 / 30;

/**
 * Fondo de constelación para las vistas de Playground.
 *
 * Es la misma idea del viejo demo de "Crazy balls", pero sin p5: partículas
 * simples en canvas 2D, líneas solo entre vecinos cercanos y un loop limitado
 * a 30fps. El canvas queda detrás del contenido y no recibe eventos.
 */
export default function PlaygroundNetworkBackground() {
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
        let running = true;

        const makeParticle = () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.045,
            vy: (Math.random() - 0.5) * 0.045,
            r: 0.8 + Math.random() * 1.1,
        });

        const setup = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            const count = Math.max(
                MIN_PARTICLES,
                Math.min(
                    MAX_PARTICLES,
                    Math.round((width * height) / 26000),
                ),
            );

            particles = Array.from({ length: count }, makeParticle);
            draw(performance.now());
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];

                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distanceSq = dx * dx + dy * dy;

                    if (distanceSq > LINK_RADIUS * LINK_RADIUS) continue;

                    const alpha =
                        (1 - Math.sqrt(distanceSq) / LINK_RADIUS) * 0.22;
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
                particle.x += particle.vx * dt;
                particle.y += particle.vy * dt;

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

        const onResize = () => {
            setup();
        };

        setup();

        if (!reduced.matches) start();
        else draw();

        window.addEventListener("resize", onResize);
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            stop();
            window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="playground-network-bg"
            aria-hidden="true"
        />
    );
}
