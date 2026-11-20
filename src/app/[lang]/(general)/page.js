import SnapContainer from "@/components/motion/SnapContainer/SnapContainer";
import Hero from "@/components/site/Hero/Hero";
import AboutSection from "@/components/site/AboutSection/AboutSection";
import SkillsSection from "@/components/site/SkillsSection/SkillsSection";
import ExperienceSection from "@/components/site/ExperienceSection/ExperienceSection";
import ProjectsSection from "@/components/site/ProjectsSection/ProjectsSection";
import PlaygroundSection from "@/components/site/PlaygroundSection/PlaygroundSection";
import ContactSection from "@/components/site/ContactSection/ContactSection";
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
