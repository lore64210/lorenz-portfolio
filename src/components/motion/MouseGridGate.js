"use client";

import { usePathname } from "next/navigation";
import MouseGrid from "./MouseGrid";

const PLAYGROUND_PROJECTS = new Set([
    "balls",
    "maze",
    "path-finder",
    "terrain",
]);

/** La grilla del mouse no se muestra en las vistas de proyecto de Playground. */
export default function MouseGridGate() {
    const pathname = usePathname();
    const slug = pathname?.split("/")[2];

    if (PLAYGROUND_PROJECTS.has(slug)) return null;

    return <MouseGrid />;
}
