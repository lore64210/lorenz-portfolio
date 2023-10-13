import TravelingSalesman from "@/components/miniprojects/travelingSalesman";
import GeneticTravelingSalesman from "@/components/miniprojects/geneticTravelingSalesman";
import "../../../styles/project.scss";
import { getDictionary } from "../dictionaries";

export default async function TravelingSalesmanPage({
    params: { lang = "es" },
}) {
    const dict = await getDictionary(lang);
    return (
        <div className="project-page">
            <div className="project-description-container">
                <h1>{dict["projects-content"]["traveling-salesman"].title}</h1>
                {dict["projects-content"]["traveling-salesman"].content.map(
                    (c, i) => (
                        <p key={i}>{c}</p>
                    )
                )}
            </div>
            <div className="canvas-container">
                <TravelingSalesman />
            </div>
            <div className="canvas-container">
                <GeneticTravelingSalesman />
            </div>
        </div>
    );
}
