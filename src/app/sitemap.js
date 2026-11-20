import { SITE_URL } from "@/constants/site";
import { LOCALES } from "@/constants/i18n";

const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/maze", priority: 0.6, changeFrequency: "yearly" },
    { path: "/balls", priority: 0.6, changeFrequency: "yearly" },
    { path: "/path-finder", priority: 0.6, changeFrequency: "yearly" },
    { path: "/terrain", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap() {
    const lastModified = new Date();

    return LOCALES.flatMap((lang) =>
        routes.map(({ path, priority, changeFrequency }) => ({
            url: `${SITE_URL}/${lang}${path}`,
            lastModified,
            changeFrequency,
            priority,
            alternates: {
                languages: Object.fromEntries(
                    LOCALES.map((locale) => [
                        locale,
                        `${SITE_URL}/${locale}${path}`,
                    ])
                ),
            },
        }))
    );
}
