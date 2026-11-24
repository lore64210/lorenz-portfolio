/** @type {import('next').NextConfig} */

// Keep in sync with DEFAULT_LOCALE in src/constants/i18n.js.
const DEFAULT_LOCALE = "en";

// Old URLs (no locale prefix) that must keep working.
const LEGACY_ROUTES = ["about", "terrain", "maze", "balls", "path-finder"];

module.exports = {
    async redirects() {
        return [
            {
                source: "/",
                destination: `/${DEFAULT_LOCALE}`,
                // Not permanent: browsers cache 308s indefinitely, which would
                // keep sending visitors to the previous default locale.
                permanent: false,
            },
            ...LEGACY_ROUTES.map((route) => ({
                source: `/${route}`,
                destination: `/${DEFAULT_LOCALE}/${route}`,
                permanent: true,
            })),
        ];
    },
};
