export const BREAKPOINTS = {
    mobile: 600,
    tablet: 960,
    desktop: 1000,
};

const DESKTOP_MEDIA_QUERY = `(min-width: ${BREAKPOINTS.desktop}px)`;

export const TABLET_MEDIA_QUERY = `(max-width: ${BREAKPOINTS.tablet}px)`;

const SNAP_MIN_HEIGHT = 640;
export const SNAP_MEDIA_QUERY = `${DESKTOP_MEDIA_QUERY} and (min-height: ${SNAP_MIN_HEIGHT}px)`;

export const isMobileViewport = (width) => width <= BREAKPOINTS.mobile;
