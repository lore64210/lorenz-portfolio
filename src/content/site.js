import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/constants/site";
import { LOCALES, getLocale, localizePath } from "@/constants/i18n";

export function buildMetadata({
    lang,
    title,
    description,
    path,
    image = DEFAULT_OG_IMAGE,
}) {
    const locale = getLocale(lang);
    const canonical = new URL(path, SITE_URL).toString();
    const imageUrl = new URL(image, SITE_URL).toString();

    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        alternates: {
            canonical,
            languages: Object.fromEntries(
                LOCALES.map((item) => [
                    item,
                    new URL(localizePath(path, item), SITE_URL).toString(),
                ])
            ),
        },
        openGraph: {
            type: "website",
            siteName: SITE_NAME,
            locale: locale === "es" ? "es_AR" : "en_US",
            alternateLocale: locale === "es" ? ["en_US"] : ["es_AR"],
            url: canonical,
            title,
            description,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: SITE_NAME,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
    };
}
