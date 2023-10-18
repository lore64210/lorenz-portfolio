import Maze from "@/components/miniprojects/maze";
import { getDictionary } from "../../dictionaries";
import "../../../../styles/project.scss";

export default async function MazeGeneratorPage({ params: { lang = "es" } }) {
    const dict = await getDictionary(lang);
    return (
        <div className="project-page">
            <div className="project-description-container">
                <h1>{dict["projects-content"]["maze-generator"].title}</h1>
                {dict["projects-content"]["maze-generator"].content.map(
                    (c, i) => (
                        <p key={i}>{c}</p>
                    )
                )}
            </div>
            <div className="canvas-container">
                <Maze />
            </div>
        </div>
    );
}
