import { BREAKPOINTS } from "@/constants/layout";

export const POSTER_SIZES = `(max-width: ${BREAKPOINTS.mobile}px) 340px, (max-width: ${BREAKPOINTS.tablet}px) 400px, 460px`;

/** Phones, tablets, reduced-motion and low-memory devices skip the 3D stage. */
export const DEVICE_MEMORY_LIMIT = 4;

export const IDLE_TIMEOUT_MS = 1500;
export const START_FALLBACK_MS = 400;
export const MIN_STAGE_SIZE = 2;
