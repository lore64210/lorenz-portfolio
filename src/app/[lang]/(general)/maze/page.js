import { getDictionary } from "../../dictionaries";
import { getPreviewCopy } from "@/content/preview";
import PlaygroundPage from "@/components/redesign/PlaygroundPage";
import PlaygroundNotes from "@/components/redesign/PlaygroundNotes";
import Reveal from "@/components/motion/Reveal";
import RevealMedia from "@/components/motion/RevealMedia";
import RevealText from "@/components/motion/RevealText";
import Maze from "@/components/miniprojects/maze";

export const metadata = {
    title: "Maze Generator — Lorenzo López",
};

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
