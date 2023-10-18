import Terrain from "@/components/miniprojects/terrain";
import "../../../../styles/project.scss";
import { getDictionary } from "../../dictionaries";

export default async function TerrainPage({ params: { lang = "es" } }) {
    const dict = await getDictionary(lang);
    return (
        <div className="project-page">
            <div className="project-description-container">
                <h1>{dict["projects-content"]["terrain"].title}</h1>
                {dict["projects-content"]["terrain"].content.map((c, i) => (
                    <p key={i}>{c}</p>
                ))}
            </div>
            <div className="canvas-container">
                <Terrain />
            </div>
        </div>
    );
}
