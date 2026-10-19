import Hero from "@/components/redesign/Hero";
import AboutSection from "@/components/redesign/AboutSection";
import SkillsSection from "@/components/redesign/SkillsSection";
import ProjectsSection from "@/components/redesign/ProjectsSection";
import PlaygroundSection from "@/components/redesign/PlaygroundSection";
import ContactSection from "@/components/redesign/ContactSection";
import { getPreviewCopy } from "@/content/preview";

export default async function PreviewPage({ params }) {
    const { lang = "es" } = await params;
    const copy = getPreviewCopy(lang);

    return (
        <main className="preview-main">
            <Hero lang={lang} copy={copy} />
            <AboutSection lang={lang} copy={copy} />
            <SkillsSection copy={copy} />
            <ProjectsSection copy={copy} />
            <PlaygroundSection lang={lang} copy={copy} />
            <ContactSection lang={lang} copy={copy} />
        </main>
    );
}
