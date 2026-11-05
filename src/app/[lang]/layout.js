import { JetBrains_Mono, Quicksand } from "next/font/google";
import "../../styles/preview.scss";
import "../../styles/dancer.scss";
import SiteHeader from "@/components/redesign/SiteHeader";
import SiteFooter from "@/components/redesign/SiteFooter";
import ScrollProgress from "@/components/motion/ScrollProgress";
import MouseGrid from "@/components/motion/MouseGrid";
import { getPreviewCopy, previewLinks } from "@/content/preview";
import { buildMetadata, siteName, siteUrl } from "@/content/site";

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
    const { lang = "es" } = await params;
    const copy = getPreviewCopy(lang);

    return buildMetadata({
        lang,
        title: `${copy.hero.name} — ${copy.hero.role}`,
        description: copy.hero.description,
        path: `/${lang}`,
    });
}

export default async function RootLayout({ children, params }) {
    const { lang = "es" } = await params;
    const copy = getPreviewCopy(lang);
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": `${siteUrl}/#person`,
                name: copy.hero.name,
                jobTitle: copy.hero.role,
                url: `${siteUrl}/${lang}`,
                sameAs: [previewLinks.github, previewLinks.linkedin],
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
                "@id": `${siteUrl}/#website`,
                name: siteName,
                url: `${siteUrl}/${lang}`,
                inLanguage: lang,
                author: { "@id": `${siteUrl}/#person` },
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
                <MouseGrid />
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
            </body>
        </html>
    );
}
