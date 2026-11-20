import { getDictionary } from "@/app/[lang]/dictionaries";
import { getPreviewCopy } from "@/content/preview";
import { buildMetadata } from "@/content/site";
import PlaygroundArticle from "@/components/site/PlaygroundArticle/PlaygroundArticle";
import Maze from "@/components/miniprojects/maze/maze";
import { resolveLocale } from "@/lib/locale";
import { SITE_NAME } from "@/constants/site";

const CONTENT_KEY = "maze-generator";

export async function generateMetadata({ params }) {
    const lang = await resolveLocale(params);
    const dict = await getDictionary(lang);
    const content = dict["projects-content"][CONTENT_KEY];

    return buildMetadata({
        lang,
        title: `${content.title} — ${SITE_NAME}`,
        description: content.content[0],
        path: `/${lang}/maze`,
    });
}

export default async function MazeGeneratorPage({ params }) {
    const lang = await resolveLocale(params);
    const dict = await getDictionary(lang);
    const copy = getPreviewCopy(lang);
    const content = dict["projects-content"][CONTENT_KEY];

    return (
        <PlaygroundArticle
            lang={lang}
            copy={copy}
            content={content}
            stageClassName="playground-stage-maze"
        >
            <Maze dict={dict} />
        </PlaygroundArticle>
    );
}
