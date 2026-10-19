import AboutPageContent from "@/components/redesign/AboutPageContent";
import { getPreviewCopy } from "@/content/preview";

export async function generateMetadata({ params }) {
    const { lang = "es" } = await params;

    return {
        title:
            lang === "es"
                ? "Sobre mí — Lorenzo López"
                : "About — Lorenzo López",
        description:
            lang === "es"
                ? "Un poco más sobre Lorenzo López: cómo empezó, cómo trabaja y qué le importa."
                : "A little more about Lorenzo López: how he started, how he works and what matters to him.",
    };
}

export default async function AboutPage({ params }) {
    const { lang = "es" } = await params;
    const copy = getPreviewCopy(lang);

    return <AboutPageContent lang={lang} copy={copy} />;
}
