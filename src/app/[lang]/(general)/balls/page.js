import { getDictionary } from "../../dictionaries";
import { getPreviewCopy } from "@/content/preview";
import PlaygroundPage from "@/components/redesign/PlaygroundPage";
import PlaygroundNotes from "@/components/redesign/PlaygroundNotes";
import Reveal from "@/components/motion/Reveal";
import RevealMedia from "@/components/motion/RevealMedia";
import RevealText from "@/components/motion/RevealText";
import Network from "@/components/miniprojects/network";
import BallsEcosystem from "@/components/miniprojects/ballsEcosystem";

export const metadata = {
    title: "Ball Ecosystem — Lorenzo López",
};

export default async function BallsPage({ params }) {
    const { lang = "es" } = await params;
    const dict = await getDictionary(lang);
    const copy = getPreviewCopy(lang);
    const network = dict["projects-content"]["balls"];
    const ecosystem = dict["projects-content"]["balls-ecosystem"];
    const [networkLead, ...networkNotes] = network.content;
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
                <RevealText as="h2" text={network.title} />
                <Reveal as="p" className="playground-lead" delay={0.1}>
                    {networkLead}
                </Reveal>

                <RevealMedia className="playground-stage">
                    <Network />
                </RevealMedia>

                <PlaygroundNotes
                    title={copy.playgroundPage.notes}
                    notes={networkNotes}
                />
            </section>

            <section className="playground-subsection">
                <p className="eyebrow">
                    {copy.playgroundPage.secondExperiment}
                </p>
                <RevealText as="h2" text={ecosystem.title} />
                <Reveal as="p" className="playground-lead" delay={0.1}>
                    {ecosystemLead}
                </Reveal>

                <RevealMedia className="playground-stage">
                    <BallsEcosystem />
                </RevealMedia>

                <PlaygroundNotes
                    title={copy.playgroundPage.notes}
                    notes={ecosystemNotes}
                />
            </section>
        </PlaygroundPage>
    );
}
