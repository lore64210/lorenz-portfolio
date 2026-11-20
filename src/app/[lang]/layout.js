import { JetBrains_Mono, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../../styles/preview.scss";
import SiteHeader from "@/components/site/SiteHeader/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter/SiteFooter";
import ScrollProgress from "@/components/motion/ScrollProgress/ScrollProgress";
import NetworkBackground from "@/components/motion/NetworkBackground/NetworkBackground";
import { getPreviewCopy } from "@/content/preview";
import { buildMetadata } from "@/content/site";
import { resolveLocale } from "@/lib/locale";
import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/constants/site";

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-quicksand",
    display: "swap",
});

const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-jetbrains",
    display: "swap",
});

export async function generateMetadata({ params }) {
    const lang = await resolveLocale(params);
    const copy = getPreviewCopy(lang);

    return buildMetadata({
        lang,
        title: `${copy.hero.name} — ${copy.hero.role}`,
        description: copy.hero.description,
        path: `/${lang}`,
    });
}

export default async function RootLayout({ children, params }) {
    const lang = await resolveLocale(params);
    const copy = getPreviewCopy(lang);
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": `${SITE_URL}/#person`,
                name: copy.hero.name,
                jobTitle: copy.hero.role,
                url: `${SITE_URL}/${lang}`,
                sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
                knowsAbout: [
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Spring Boot",
                    "Node.js",
                    "Django",
                ],
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: SITE_NAME,
                url: `${SITE_URL}/${lang}`,
                inLanguage: lang,
                author: { "@id": `${SITE_URL}/#person` },
            },
        ],
    };

    return (
        <html
            lang={lang}
            data-scroll-behavior="smooth"
            className={`${quicksand.variable} ${jetbrains.variable}`}
        >
            <body className="preview-body">
                <NetworkBackground />
                <div className="site-content">
                    <ScrollProgress />
                    <SiteHeader lang={lang} copy={copy} />
                    {children}
                    <SiteFooter lang={lang} copy={copy} />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                        }}
                    />
                </div>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
