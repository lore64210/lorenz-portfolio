"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import manifest from "@/content/catarsis-collage.json";

const TEXT = "Catarsis";

/** Mismo aire que usa el collage original entre letras. */
const MARGEN_BALDOSA = 0.04;
const ESPACIADO = 0.02;

/** Ritmo de la entrada: primero se escribe, después se barajan las variantes. */
const ESPERA_INICIAL = 260;
const PASO_LETRA = 120;
const PAUSA_ANTES_DE_BARAJAR = 300;
const PASO_VARIANTE = 500;
const CAMBIOS_DE_VARIANTE = 3;

/** Variante inicial estable, para que el HTML del servidor y el cliente coincidan. */
const varianteInicial = (char) => manifest.variants[char]?.[0] ?? 0;

const varianteAleatoria = (char) => {
    const variantes = manifest.variants[char];
    return variantes[Math.floor(Math.random() * variantes.length)];
};

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
        Array.from(TEXT, varianteInicial),
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
                setBaldosas(letras.map(varianteAleatoria));
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
        const definitivas = letras.map(varianteAleatoria);

        setVisibles(0);
        setAsentado(false);
        setBaldosas(letras.map(varianteAleatoria));

        // Primera fase: typewriter. Las letras aparecen de a una y no cambian
        // de recorte durante el tipeo, así la entrada se lee ordenada.
        letras.forEach((_, indice) => {
            timers.push(
                setTimeout(() => {
                    if (!cancelado) setVisibles(indice + 1);
                }, ESPERA_INICIAL + indice * PASO_LETRA),
            );
        });

        // Segunda fase: una vez escrita la palabra, todas las letras cambian
        // de variante al mismo tiempo y con un ritmo más lento.
        const finTipeo = ESPERA_INICIAL + (letras.length - 1) * PASO_LETRA;
        const inicioBarajado = finTipeo + PAUSA_ANTES_DE_BARAJAR;

        for (let paso = 0; paso < CAMBIOS_DE_VARIANTE; paso++) {
            timers.push(
                setTimeout(
                    () => {
                        if (!cancelado) {
                            setBaldosas(letras.map(varianteAleatoria));
                        }
                    },
                    inicioBarajado + paso * PASO_VARIANTE,
                ),
            );
        }

        timers.push(
            setTimeout(() => {
                if (cancelado) return;
                setBaldosas(definitivas);
                setAsentado(true);
            }, inicioBarajado + CAMBIOS_DE_VARIANTE * PASO_VARIANTE),
        );

        return () => {
            cancelado = true;
            timers.forEach(clearTimeout);
        };
    }, [active, enVista, letras]);

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

            <span
                className="project-logo-catarsis-word"
                aria-hidden="true"
                style={{ columnGap: alto * ESPACIADO }}
            >
                {letras.map((char, indice) => {
                    const tile = manifest.tiles[baldosas[indice]];
                    const visible = indice < visibles;

                    return (
                        <span
                            key={`${char}-${indice}`}
                            className="project-logo-catarsis-letter"
                            style={{
                                width: tile.w * escala,
                                height: tile.h * escala,
                                marginRight: -alto * MARGEN_BALDOSA,
                                backgroundImage: `url(${manifest.image})`,
                                backgroundSize: `${manifest.imageWidth * escala}px ${manifest.imageHeight * escala}px`,
                                backgroundPosition: `-${tile.x * escala}px -${tile.y * escala}px`,
                                opacity: visible ? 1 : 0,
                            }}
                        />
                    );
                })}
            </span>

            <span
                className="project-logo-catarsis-rule"
                aria-hidden="true"
                style={{ transform: `rotate(-1.5deg) scaleX(${asentado ? 1 : 0})` }}
            />
        </div>
    );
}
