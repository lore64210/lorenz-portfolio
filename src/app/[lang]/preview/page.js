import Hero from "@/components/redesign/Hero";
import AboutSection from "@/components/redesign/AboutSection";
import { getPreviewCopy } from "@/content/preview";

export default async function PreviewPage({ params }) {
    const { lang = "es" } = await params;
    const copy = getPreviewCopy(lang);

    return (
        <main className="preview-main">
            <Hero lang={lang} copy={copy} />
            <AboutSection lang={lang} copy={copy} />
        </main>
    );
}
