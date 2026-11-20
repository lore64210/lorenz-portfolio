import manifest from "@/content/catarsis-collage.json";

export const TEXT = "Catarsis";

/** Same air the original collage uses between letters. */
export const TILE_MARGIN = 0.04;
export const LETTER_SPACING = 0.02;

/** Entry rhythm: type first, then shuffle the variants. */
export const INITIAL_DELAY = 260;
export const LETTER_STEP = 120;
export const SHUFFLE_PAUSE = 300;
export const VARIANT_STEP = 500;
export const VARIANT_CHANGES = 3;

/** Stable first variant so server and client HTML match. */
export const initialVariant = (char) => manifest.variants[char]?.[0] ?? 0;

export const randomVariant = (char) => {
    const variants = manifest.variants[char];
    return variants[Math.floor(Math.random() * variants.length)];
};
