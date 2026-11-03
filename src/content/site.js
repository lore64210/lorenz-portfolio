export const siteUrl = "https://lorenzomatiaslopez.vercel.app";
export const siteName = "Lorenzo López";
export const defaultOgImage = "/static/images/og-image.png";

const locales = ["es", "en"];

const localizePath = (path, locale) =>
    `/${locale}${path.replace(/^\/(es|en)/, "")}`;

export function buildMetadata({
    lang,
    title,
    description,
    path,
    image = defaultOgImage,
}) {
    const canonical = new URL(path, siteUrl).toString();
    const imageUrl = new URL(image, siteUrl).toString();

    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: {
            canonical,
            languages: Object.fromEntries(
                locales.map((locale) => [
                    locale,
                    new URL(localizePath(path, locale), siteUrl).toString(),
                ])
            ),
        },
        openGraph: {
            type: "website",
            siteName,
            locale: lang === "es" ? "es_AR" : "en_US",
            alternateLocale: lang === "es" ? ["en_US"] : ["es_AR"],
            url: canonical,
            title,
            description,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: siteName,
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
