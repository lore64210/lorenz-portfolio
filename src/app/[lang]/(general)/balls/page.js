import { getDictionary } from "../../dictionaries";
import { getPreviewCopy } from "@/content/preview";
import PlaygroundPage from "@/components/redesign/PlaygroundPage";
import PlaygroundNotes from "@/components/redesign/PlaygroundNotes";
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
                <h1>{copy.playgroundPage.ballTitle}</h1>
                <p className="playground-lead">
                    {copy.playgroundPage.ballLead}
                </p>
            </header>

            <section className="playground-subsection">
                <h2>{network.title}</h2>
                <p className="playground-lead">{networkLead}</p>

                <div className="playground-stage">
                    <Network />
                </div>

                <PlaygroundNotes
                    title={copy.playgroundPage.notes}
                    notes={networkNotes}
                />
            </section>

            <section className="playground-subsection">
                <p className="eyebrow">
                    {copy.playgroundPage.secondExperiment}
                </p>
                <h2>{ecosystem.title}</h2>
                <p className="playground-lead">{ecosystemLead}</p>

                <div className="playground-stage">
                    <BallsEcosystem />
                </div>

                <PlaygroundNotes
                    title={copy.playgroundPage.notes}
                    notes={ecosystemNotes}
                />
            </section>
        </PlaygroundPage>
    );
}
