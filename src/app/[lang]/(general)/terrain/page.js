import { getDictionary } from "@/app/[lang]/dictionaries";
import { getPreviewCopy } from "@/content/preview";
import { buildMetadata } from "@/content/site";
import PlaygroundArticle from "@/components/redesign/PlaygroundArticle/PlaygroundArticle";
import Terrain from "@/components/miniprojects/terrain/terrain";
import { resolveLocale } from "@/lib/locale";
import { SITE_NAME } from "@/constants/site";

const CONTENT_KEY = "terrain";

export async function generateMetadata({ params }) {
    const lang = await resolveLocale(params);
    const dict = await getDictionary(lang);
    const content = dict["projects-content"][CONTENT_KEY];

    return buildMetadata({
        lang,
        title: `${content.title} — ${SITE_NAME}`,
        description: content.content[0],
        path: `/${lang}/terrain`,
    });
}

export default async function TerrainPage({ params }) {
    const lang = await resolveLocale(params);
    const dict = await getDictionary(lang);
    const copy = getPreviewCopy(lang);
    const content = dict["projects-content"][CONTENT_KEY];

    return (
        <PlaygroundArticle lang={lang} copy={copy} content={content}>
            <Terrain dict={dict} />
        </PlaygroundArticle>
    );
}
