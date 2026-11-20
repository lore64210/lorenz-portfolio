import AboutPageContent from "@/components/site/AboutPageContent/AboutPageContent";
import { getPreviewCopy } from "@/content/preview";
import { buildMetadata } from "@/content/site";
import { resolveLocale } from "@/lib/locale";

export async function generateMetadata({ params }) {
    const lang = await resolveLocale(params);
    const copy = getPreviewCopy(lang);

    return buildMetadata({
        lang,
        title: `${copy.aboutPage.title} — ${copy.hero.name}`,
        description: copy.aboutPage.lead,
        path: `/${lang}/about`,
    });
}

export default async function AboutPage({ params }) {
    const lang = await resolveLocale(params);
    const copy = getPreviewCopy(lang);

    return <AboutPageContent lang={lang} copy={copy} />;
}
