import { getDictionary } from "@/app/[lang]/dictionaries";
import { getPreviewCopy } from "@/content/preview";
import { buildMetadata } from "@/content/site";
import PlaygroundArticle from "@/components/redesign/PlaygroundArticle/PlaygroundArticle";
import BallsEcosystem from "@/components/miniprojects/ballsEcosystem/ballsEcosystem";
import { resolveLocale } from "@/lib/locale";
import { SITE_NAME } from "@/constants/site";

const CONTENT_KEY = "balls-ecosystem";

export async function generateMetadata({ params }) {
    const lang = await resolveLocale(params);
    const dict = await getDictionary(lang);
    const content = dict["projects-content"][CONTENT_KEY];

    return buildMetadata({
        lang,
        title: `${content.title} — ${SITE_NAME}`,
        description: content.content[0],
        path: `/${lang}/balls`,
    });
}

export default async function BallsPage({ params }) {
    const lang = await resolveLocale(params);
    const dict = await getDictionary(lang);
    const copy = getPreviewCopy(lang);
    const content = dict["projects-content"][CONTENT_KEY];

    return (
        <PlaygroundArticle lang={lang} copy={copy} content={content}>
            <BallsEcosystem labels={copy.playgroundPage.iteration} />
        </PlaygroundArticle>
    );
}
