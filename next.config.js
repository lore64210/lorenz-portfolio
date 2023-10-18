/** @type {import('next').NextConfig} */

module.exports = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/es",
                permanent: true,
            },
            {
                source: "/about",
                destination: "/es/about",
                permanent: true,
            },
            {
                source: "/terrain",
                destination: "/es/terrain",
                permanent: true,
            },
            {
                source: "/maze",
                destination: "/es/maze",
                permanent: true,
            },
            {
                source: "/balls",
                destination: "/es/balls",
                permanent: true,
            },
            {
                source: "/path-finder",
                destination: "/es/path-finder",
                permanent: true,
            },
            {
                source: "/traveling-salesman",
                destination: "/es/traveling-salesman",
                permanent: true,
            },
        ];
    },
};
