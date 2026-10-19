import { getDictionary } from "../../dictionaries";
import AboutContainer from "@/components/aboutContainer";
import "../../../../styles/about.scss";
import "../../../../styles/globals.scss";

export default async function AboutPage({ params }) {
    const { lang = "es" } = await params;
    const dict = await getDictionary(lang);
    return <AboutContainer dict={dict} lang={lang} />;
}
