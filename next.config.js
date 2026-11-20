/** @type {import('next').NextConfig} */

// Old URLs (no locale prefix) that must keep working.
const LEGACY_ROUTES = ["about", "terrain", "maze", "balls", "path-finder"];

module.exports = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/es",
                permanent: true,
            },
            ...LEGACY_ROUTES.map((route) => ({
                source: `/${route}`,
                destination: `/es/${route}`,
                permanent: true,
            })),
        ];
    },
};
