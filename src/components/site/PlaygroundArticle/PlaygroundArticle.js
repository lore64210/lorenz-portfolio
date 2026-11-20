import PlaygroundPage from "@/components/site/PlaygroundPage/PlaygroundPage";
import PlaygroundNotes from "@/components/site/PlaygroundNotes/PlaygroundNotes";
import Reveal from "@/components/motion/Reveal/Reveal";
import RevealMedia from "@/components/motion/RevealMedia/RevealMedia";
import RevealText from "@/components/motion/RevealText/RevealText";
import { LEAD_DELAY } from "./constants";

export default function PlaygroundArticle({
    lang,
    copy,
    content,
    stageClassName = "",
    children,
}) {
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
                    delay={LEAD_DELAY}
                >
                    {lead}
                </Reveal>
            </header>

            <RevealMedia
                className={`playground-stage ${stageClassName}`.trim()}
            >
                {children}
            </RevealMedia>

            <PlaygroundNotes
                title={copy.playgroundPage.notes}
                notes={notes}
            />
        </PlaygroundPage>
    );
}
