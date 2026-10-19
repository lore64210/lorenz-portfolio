import { getDictionary } from "../../dictionaries";
import { getPreviewCopy } from "@/content/preview";
import PlaygroundPage from "@/components/redesign/PlaygroundPage";
import PlaygroundNotes from "@/components/redesign/PlaygroundNotes";
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
                <h1>{content.title}</h1>
                <p className="playground-lead">{lead}</p>
            </header>

            <div className="playground-stage">
                <Maze dict={dict} />
            </div>

            <PlaygroundNotes
                title={copy.playgroundPage.notes}
                notes={notes}
            />
        </PlaygroundPage>
    );
}
