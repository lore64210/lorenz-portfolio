import { getDictionary } from "../../dictionaries";
import { getPreviewCopy } from "@/content/preview";
import { buildMetadata } from "@/content/site";
import PlaygroundPage from "@/components/redesign/PlaygroundPage";
import PlaygroundNotes from "@/components/redesign/PlaygroundNotes";
import Reveal from "@/components/motion/Reveal";
import RevealMedia from "@/components/motion/RevealMedia";
import RevealText from "@/components/motion/RevealText";
import BallsEcosystem from "@/components/miniprojects/ballsEcosystem";

export async function generateMetadata({ params }) {
    const { lang = "es" } = await params;
    const copy = getPreviewCopy(lang);

    return buildMetadata({
        lang,
        title: `${copy.playgroundPage.ballTitle} — ${copy.hero.name}`,
        description: copy.playgroundPage.ballLead,
        path: `/${lang}/balls`,
    });
}

export default async function BallsPage({ params }) {
    const { lang = "es" } = await params;
    const dict = await getDictionary(lang);
    const copy = getPreviewCopy(lang);
    const ecosystem = dict["projects-content"]["balls-ecosystem"];
    const [ecosystemLead, ...ecosystemNotes] = ecosystem.content;

    return (
        <PlaygroundPage lang={lang} copy={copy}>
            <header className="playground-header">
                <p className="eyebrow">{copy.playgroundPage.eyebrow}</p>
                <RevealText
                    as="h1"
                    text={copy.playgroundPage.ballTitle}
                    play
                />
                <Reveal
                    as="p"
                    className="playground-lead"
                    play
                    delay={0.15}
                >
                    {copy.playgroundPage.ballLead}
                </Reveal>
            </header>

            <section className="playground-subsection">
                <Reveal as="p" className="playground-lead" delay={0.1}>
                    {ecosystemLead}
                </Reveal>

                <RevealMedia className="playground-stage">
                    <BallsEcosystem labels={copy.playgroundPage.iteration} />
                </RevealMedia>

                <PlaygroundNotes
                    title={copy.playgroundPage.notes}
                    notes={ecosystemNotes}
                />
            </section>
        </PlaygroundPage>
    );
}
