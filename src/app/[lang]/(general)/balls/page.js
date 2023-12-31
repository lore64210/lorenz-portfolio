import BallsEcosystem from "@/components/miniprojects/ballsEcosystem";
import { getDictionary } from "../../dictionaries";
import "../../../../styles/project.scss";
import Network from "@/components/miniprojects/network";

export default async function BallsPage({ params: { lang = "es" } }) {
    const dict = await getDictionary(lang);
    return (
        <div className="project-page">
            <div className="project-description-container">
                <h1>{dict["projects-content"]["balls"].title}</h1>
                {dict["projects-content"]["balls"].content.map((c, i) => (
                    <p key={i}>{c}</p>
                ))}
            </div>
            <div className="canvas-container">
                <Network />
            </div>
            <div className="project-description-container">
                <h1>{dict["projects-content"]["balls-ecosystem"].title}</h1>
                {dict["projects-content"]["balls-ecosystem"].content.map(
                    (c, i) => (
                        <p key={i}>{c}</p>
                    )
                )}
            </div>
            <div className="canvas-container">
                <BallsEcosystem />
            </div>
        </div>
    );
}
