import PathFinder from "@/components/miniprojects/pathFinder";
import "../../../../styles/project.scss";
import { getDictionary } from "../../dictionaries";

export default async function TerrainPage({ params: { lang = "es" } }) {
    const dict = await getDictionary(lang);
    return (
        <div className="project-page">
            <div className="project-description-container">
                <h1>{dict["projects-content"]["path-finder"].title}</h1>
                {dict["projects-content"]["path-finder"].content.map((c, i) => (
                    <p key={i}>{c}</p>
                ))}
            </div>
            <div className="canvas-container">
                <PathFinder dict={dict} />
            </div>
        </div>
    );
}
