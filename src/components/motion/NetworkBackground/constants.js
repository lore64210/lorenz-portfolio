export const ACCENT_RGB = "255, 122, 89";

export const LINK_RADIUS = 145;
export const MOBILE_LINK_RADIUS = 110;

export const REPEL_RADIUS = 140;
export const REPEL_FORCE = 0.045;
export const REPEL_DECAY = 0.93;
export const REPEL_MAX = 0.65;

export const FRAME_MS = 1000 / 30;

/** The background gets denser earlier than the layout's mobile breakpoint. */
export const MOBILE_WIDTH = 760;

export const PARTICLE_DENSITY = {
    mobile: { min: 28, max: 55, divisor: 30000 },
    desktop: { min: 55, max: 90, divisor: 19000 },
};

export const PARTICLE_MIN_RADIUS = 0.8;
export const PARTICLE_RADIUS_SPREAD = 1.4;
export const PARTICLE_SPEED = 0.035;
export const PARTICLE_SPEED_SPREAD = 0.5;
