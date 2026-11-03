import { siteUrl } from "@/content/site";

const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/maze", priority: 0.6, changeFrequency: "yearly" },
    { path: "/balls", priority: 0.6, changeFrequency: "yearly" },
    { path: "/path-finder", priority: 0.6, changeFrequency: "yearly" },
    { path: "/terrain", priority: 0.6, changeFrequency: "yearly" },
];

const locales = ["es", "en"];

export default function sitemap() {
    const lastModified = new Date();

    return locales.flatMap((lang) =>
        routes.map(({ path, priority, changeFrequency }) => ({
            url: `${siteUrl}/${lang}${path}`,
            lastModified,
            changeFrequency,
            priority,
            alternates: {
                languages: Object.fromEntries(
                    locales.map((locale) => [
                        locale,
                        `${siteUrl}/${locale}${path}`,
                    ])
                ),
            },
        }))
    );
}
