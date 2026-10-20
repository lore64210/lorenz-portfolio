"use client";

import { useRef } from "react";
import useSectionSnap from "./useSectionSnap";

export default function SnapContainer({ children }) {
    const ref = useRef(null);
    useSectionSnap(ref);

    return (
        <main ref={ref} className="preview-main snap-container">
            {children}
        </main>
    );
}
