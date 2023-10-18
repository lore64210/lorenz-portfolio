import { getDictionary } from "../../dictionaries";
import WithAnimation from "@/components/withAnimation";
import "../../../../styles/about.scss";
import Header from "@/components/header/header";

export default async function AboutPage({ params: { lang = "es" } }) {
    const dict = await getDictionary(lang);
    return (
        <>
            <Header dict={dict} lang={lang} />
            <main className="main">
                <div className="main-bg"></div>
                <div className="main-bg layer-1"></div>
                <div className="main-bg layer-2"></div>
                <div className="main-bg layer-3"></div>
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
            </main>
        </>
    );
}
