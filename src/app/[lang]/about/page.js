import { getDictionary } from "../dictionaries";
import WithAnimation from "@/components/withAnimation";
import "../../../styles/about.scss";

export default async function AboutPage({ params: { lang = "es" } }) {
    const dict = await getDictionary(lang);
    return (
        <div className="about">
            <WithAnimation>
                <div className="about-description-container">
                    <h1>Lorenzo Matías López</h1>
                    {dict.about.content.map((c, i) => (
                        <p key={i}>{c}</p>
                    ))}
                </div>
            </WithAnimation>
        </div>
    );
}
