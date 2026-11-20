import SnapContainer from "@/components/motion/SnapContainer/SnapContainer";
import Hero from "@/components/redesign/Hero/Hero";
import AboutSection from "@/components/redesign/AboutSection/AboutSection";
import SkillsSection from "@/components/redesign/SkillsSection/SkillsSection";
import ExperienceSection from "@/components/redesign/ExperienceSection/ExperienceSection";
import ProjectsSection from "@/components/redesign/ProjectsSection/ProjectsSection";
import PlaygroundSection from "@/components/redesign/PlaygroundSection/PlaygroundSection";
import ContactSection from "@/components/redesign/ContactSection/ContactSection";
import { getPreviewCopy } from "@/content/preview";
import { resolveLocale } from "@/lib/locale";

export default async function Home({ params }) {
    const lang = await resolveLocale(params);
    const copy = getPreviewCopy(lang);

    return (
        <SnapContainer>
            <Hero lang={lang} copy={copy} />
            <AboutSection lang={lang} copy={copy} />
            <SkillsSection copy={copy} />
            <ExperienceSection copy={copy} />
            <ProjectsSection copy={copy} lang={lang} />
            <PlaygroundSection lang={lang} copy={copy} />
            <ContactSection lang={lang} copy={copy} />
        </SnapContainer>
    );
}
