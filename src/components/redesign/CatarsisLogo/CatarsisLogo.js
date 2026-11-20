"use client";
import "./CatarsisLogo.scss";

import { useEffect, useMemo, useRef, useState } from "react";
import manifest from "@/content/catarsis-collage.json";
import {
    INITIAL_DELAY,
    LETTER_SPACING,
    LETTER_STEP,
    SHUFFLE_PAUSE,
    TEXT,
    TILE_MARGIN,
    VARIANT_CHANGES,
    VARIANT_STEP,
    initialVariant,
    randomVariant,
} from "./constants";

/**
 * Logo de Catarsis con la fuente collage del fanzine.
 *
 * Replica la entrada de la home: las letras se escriben una detrás de otra y,
 * mientras tanto, cada aparición va cambiando de recorte. Al terminar se
 * asientan todas juntas en una variante definitiva.
 *
 * El texto se dibuja como ventanas sobre una única imagen (`background-position`),
 * igual que `CollageText` en el proyecto original. Así el componente no necesita
 * un archivo de fuente y conserva el papel, la textura y el azar del collage.
 */
export default function CatarsisLogo({ active = true }) {
    const root = useRef(null);
    const [ancho, setAncho] = useState(0);
    const [enVista, setEnVista] = useState(false);
    const [visibles, setVisibles] = useState(0);
    const [asentado, setAsentado] = useState(false);
    const [baldosas, setBaldosas] = useState(() =>
        Array.from(TEXT, initialVariant),
    );

    const letras = useMemo(() => Array.from(TEXT), []);

    /** Alto de letra: entra completo en el ancho de la caja del carrusel. */
    const alto =
        ancho > 0
            ? Math.max(34, Math.min(102, (ancho - 24) / (letras.length + 0.2)))
            : 72;
    const escala = alto / manifest.referenceHeight;

    // La caja mide el propio logo, que tiene un ancho definido por CSS. Medir el
    // padre daría el ancho del carrusel y el texto quedaría demasiado grande.
    useEffect(() => {
        const caja = root.current;
        if (!caja) return;

        const medir = () => {
            const disponible = caja.clientWidth;
            if (disponible > 0) setAncho(disponible);
        };

        medir();
        const observer = new ResizeObserver(medir);
        observer.observe(caja);

        return () => observer.disconnect();
    }, []);

    // El logo está al final de la página: el efecto se dispara recién cuando la
    // fila del proyecto entra en pantalla, no al montar el carrusel.
    useEffect(() => {
        const caja = root.current;
        if (!caja) return;

        const observer = new IntersectionObserver(
            ([entrada]) => setEnVista(entrada.isIntersecting),
            { threshold: 0.35 },
        );

        observer.observe(caja);
        return () => observer.disconnect();
    }, []);

    // Precarga la imagen para que las letras no aparezcan en blanco si el
    // efecto arranca antes de que termine la descarga.
    useEffect(() => {
        const imagen = new Image();
        imagen.src = manifest.image;
    }, []);

    useEffect(() => {
        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (!active || !enVista || reduced) {
            if (reduced && enVista) {
                setBaldosas(letras.map(randomVariant));
                setVisibles(letras.length);
                setAsentado(true);
            } else if (!reduced) {
                setVisibles(0);
                setAsentado(false);
            }
            return;
        }

        let cancelado = false;
        const timers = [];
        const definitivas = letras.map(randomVariant);

        setVisibles(0);
        setAsentado(false);
        setBaldosas(letras.map(randomVariant));

        // Primera fase: typewriter. Las letras aparecen de a una y no cambian
        // de recorte durante el tipeo, así la entrada se lee ordenada.
        letras.forEach((_, indice) => {
            timers.push(
                setTimeout(() => {
                    if (!cancelado) setVisibles(indice + 1);
                }, INITIAL_DELAY + indice * LETTER_STEP),
            );
        });

        // Segunda fase: una vez escrita la palabra, todas las letras cambian
        // de variante al mismo tiempo y con un ritmo más lento.
        const finTipeo = INITIAL_DELAY + (letras.length - 1) * LETTER_STEP;
        const inicioBarajado = finTipeo + SHUFFLE_PAUSE;

        for (let paso = 0; paso < VARIANT_CHANGES; paso++) {
            timers.push(
                setTimeout(
                    () => {
                        if (!cancelado) {
                            setBaldosas(letras.map(randomVariant));
                        }
                    },
                    inicioBarajado + paso * VARIANT_STEP,
                ),
            );
        }

        timers.push(
            setTimeout(() => {
                if (cancelado) return;
                setBaldosas(definitivas);
                setAsentado(true);
            }, inicioBarajado + VARIANT_CHANGES * VARIANT_STEP),
        );

        return () => {
            cancelado = true;
            timers.forEach(clearTimeout);
        };
    }, [active, enVista, letras]);

    // Geometry and tile windows are data, so they travel through CSS custom
    // properties; the stylesheet owns how they are painted.
    useEffect(() => {
        const element = root.current;
        if (!element) return;

        element.style.setProperty(
            "--catarsis-gap",
            `${alto * LETTER_SPACING}px`,
        );
        element.style.setProperty("--catarsis-image", `url(${manifest.image})`);
        element.style.setProperty(
            "--catarsis-image-size",
            `${manifest.imageWidth * escala}px ${manifest.imageHeight * escala}px`,
        );

        const letters = element.querySelectorAll(
            ".project-logo-catarsis-letter",
        );
        letters.forEach((letter, index) => {
            const tile = manifest.tiles[baldosas[index]];
            letter.style.setProperty(
                "--letter-width",
                `${tile.w * escala}px`,
            );
            letter.style.setProperty(
                "--letter-height",
                `${tile.h * escala}px`,
            );
            letter.style.setProperty(
                "--letter-margin",
                `${-alto * TILE_MARGIN}px`,
            );
            letter.style.setProperty("--letter-x", `${-tile.x * escala}px`);
            letter.style.setProperty("--letter-y", `${-tile.y * escala}px`);
            letter.classList.toggle("is-visible", index < visibles);
        });
    }, [alto, escala, baldosas, visibles]);

    return (
        <div
            ref={root}
            className="project-logo-catarsis"
            role="img"
            aria-label={TEXT}
        >
            <span className="project-logo-catarsis-eyebrow" aria-hidden="true">
                Fanzine independiente
            </span>

            <span className="project-logo-catarsis-word" aria-hidden="true">
                {letras.map((char, indice) => (
                    <span
                        key={`${char}-${indice}`}
                        className="project-logo-catarsis-letter"
                    />
                ))}
            </span>

            <span
                className={`project-logo-catarsis-rule ${
                    asentado ? "is-seated" : ""
                }`}
                aria-hidden="true"
            />
        </div>
    );
}
