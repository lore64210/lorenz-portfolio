import { getDictionary } from "@/app/[lang]/dictionaries";
import { getPreviewCopy } from "@/content/preview";
import { buildMetadata } from "@/content/site";
import PlaygroundArticle from "@/components/site/PlaygroundArticle/PlaygroundArticle";
import PathFinder from "@/components/miniprojects/pathFinder/pathFinder";
import { resolveLocale } from "@/lib/locale";
import { SITE_NAME } from "@/constants/site";

const CONTENT_KEY = "path-finder";

export async function generateMetadata({ params }) {
    const lang = await resolveLocale(params);
    const dict = await getDictionary(lang);
    const content = dict["projects-content"][CONTENT_KEY];

    return buildMetadata({
        lang,
        title: `${content.title} — ${SITE_NAME}`,
        description: content.content[0],
        path: `/${lang}/path-finder`,
    });
}

export default async function PathFinderPage({ params }) {
    const lang = await resolveLocale(params);
    const dict = await getDictionary(lang);
    const copy = getPreviewCopy(lang);
    const content = dict["projects-content"][CONTENT_KEY];

    return (
        <PlaygroundArticle lang={lang} copy={copy} content={content}>
            <PathFinder dict={dict} />
        </PlaygroundArticle>
    );
}
