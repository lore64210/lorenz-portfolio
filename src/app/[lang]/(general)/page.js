import PlaygroundProjectCard from "@/components/playgroundProjectCard";
import ProjectCard from "@/components/projectCard";
import { getDictionary } from "../dictionaries";
import WithAnimation from "@/components/withAnimation";
import Blob from "@/components/blob";
import ProjectImage from "@/components/projectImage";
import "../../../styles/home.scss";

export default async function Home({ params: { lang = "es" } }) {
    const dict = await getDictionary(lang);
    return (
        <div className="home">
            <WithAnimation>
                <h1>{dict.projects.title}</h1>
            </WithAnimation>
            <div className="project-card-container">
                <ProjectCard
                    title={dict.projects["portfolio-maker"].title}
                    description={dict.projects["portfolio-maker"].description}
                    tecnologies="Next.js, Firebase"
                    imageComponent={<Blob />}
                    href="https://portfolio-maker-ten.vercel.app/"
                />
                <ProjectCard
                    title={dict.projects["organizer"].title}
                    description={dict.projects["organizer"].description}
                    tecnologies="React Native"
                    imageComponent={
                        <ProjectImage
                            src="/static/images/organizer.jpeg"
                            alt={dict.projects["organizer"].title}
                            className="organizer-logo"
                        />
                    }
                    href="https://play.google.com/store/apps/details?id=com.lore64210.Organizer"
                    reversed
                />
                <ProjectCard
                    title={dict.projects["historia-humo"].title}
                    description={dict.projects["historia-humo"].description}
                    image="/static/images/historia-humo.png"
                    imageComponent={
                        <ProjectImage
                            src="/static/images/historia-humo.png"
                            alt={dict.projects["organizer"].title}
                            className="historia-humo-logo"
                        />
                    }
                    tecnologies="Django"
                    href="https://lore64210.pythonanywhere.com/blog/"
                />
                <ProjectCard
                    title={dict.projects["planet-shop"].title}
                    description={dict.projects["planet-shop"].description}
                    image="/static/images/profile.webp"
                    tecnologies="React, Spring Boot"
                    reversed
                    imageComponent={
                        <div className="coming-soon">
                            <h1>Coming Soon!</h1>
                        </div>
                    }
                />
            </div>
            <WithAnimation>
                <h1>{dict.playground.title}</h1>
            </WithAnimation>
            <div className="playground-project-card-container">
                <PlaygroundProjectCard
                    title={dict.playground["maze-generator"]}
                    image="/static/images/maze.gif"
                    href={`/${lang}/maze`}
                />
                <PlaygroundProjectCard
                    title={dict.playground["balls-ecosystem"]}
                    image="/static/images/balls.gif"
                    href={`/${lang}/balls`}
                />
                <PlaygroundProjectCard
                    title={dict.playground["path-finder"]}
                    image="/static/images/path-finder.gif"
                    href={`/${lang}/path-finder`}
                />
                <PlaygroundProjectCard
                    title={dict.playground["terrain"]}
                    image="/static/images/terrain.gif"
                    href={`/${lang}/terrain`}
                />
            </div>
        </div>
    );
}
