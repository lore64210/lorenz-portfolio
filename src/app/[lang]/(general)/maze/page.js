import { getDictionary } from "../../dictionaries";
import { getPreviewCopy } from "@/content/preview";
import { buildMetadata } from "@/content/site";
import PlaygroundPage from "@/components/redesign/PlaygroundPage";
import PlaygroundNotes from "@/components/redesign/PlaygroundNotes";
import Reveal from "@/components/motion/Reveal";
import RevealMedia from "@/components/motion/RevealMedia";
import RevealText from "@/components/motion/RevealText";
import Maze from "@/components/miniprojects/maze";

export async function generateMetadata({ params }) {
    const { lang = "es" } = await params;
    const dict = await getDictionary(lang);
    const content = dict["projects-content"]["maze-generator"];

    return buildMetadata({
        lang,
        title: `${content.title} — Lorenzo López`,
        description: content.content[0],
        path: `/${lang}/maze`,
    });
}

export default async function MazeGeneratorPage({ params }) {
    const { lang = "es" } = await params;
    const dict = await getDictionary(lang);
    const copy = getPreviewCopy(lang);
    const content = dict["projects-content"]["maze-generator"];
    const [lead, ...notes] = content.content;

    return (
        <PlaygroundPage lang={lang} copy={copy}>
            <header className="playground-header">
                <p className="eyebrow">{copy.playgroundPage.eyebrow}</p>
                <RevealText as="h1" text={content.title} play />
                <Reveal
                    as="p"
                    className="playground-lead"
                    play
                    delay={0.15}
                >
                    {lead}
                </Reveal>
            </header>

            <RevealMedia className="playground-stage">
                <Maze dict={dict} />
            </RevealMedia>

            <PlaygroundNotes
                title={copy.playgroundPage.notes}
                notes={notes}
            />
        </PlaygroundPage>
    );
}
