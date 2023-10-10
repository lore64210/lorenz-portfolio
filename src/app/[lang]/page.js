import PlaygroundProjectCard from "@/components/playgroundProjectCard";
import ProjectCard from "@/components/projectCard";
import { getDictionary } from "./dictionaries";
import WithAnimation from "@/components/withAnimation";
import "../../styles/home.scss";

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
                    image="/static/images/profile.webp"
                    href="https://portfolio-maker-ten.vercel.app/"
                />
                <ProjectCard
                    title={dict.projects["organizer"].title}
                    description={dict.projects["organizer"].description}
                    tecnologies="React Native"
                    image="/static/images/profile.webp"
                    href="https://play.google.com/store/apps/details?id=com.lore64210.Organizer"
                    reversed
                />
                <ProjectCard
                    title={dict.projects["historia-humo"].title}
                    description={dict.projects["historia-humo"].description}
                    image="/static/images/profile.webp"
                    tecnologies="Django"
                    href="/historia-y-humo"
                />
                <ProjectCard
                    title={dict.projects["planet-shop"].title}
                    description={dict.projects["planet-shop"].description}
                    image="/static/images/profile.webp"
                    tecnologies="React, Spring Boot"
                    href="/planet-shop"
                    reversed
                />
            </div>
            <WithAnimation>
                <h1>{dict.playground.title}</h1>
            </WithAnimation>
            <div className="playground-project-card-container">
                <PlaygroundProjectCard
                    title={dict.playground["maze-generator"]}
                    image="/static/images/maze.gif"
                    href="/maze"
                />
                <PlaygroundProjectCard
                    title={dict.playground["balls-ecosystem"]}
                    image="/static/images/balls.gif"
                    href="/balls"
                />
                <PlaygroundProjectCard
                    title={dict.playground["path-finder"]}
                    image="/static/images/path-finder.gif"
                    href="/path-finder"
                />
                <PlaygroundProjectCard
                    title={dict.playground["traveling-salesman"]}
                    image="/static/images/traveling-salesman.gif"
                    href="/traveling-salesman"
                />
                <PlaygroundProjectCard
                    title={dict.playground["linear-regression"]}
                    image="/static/images/linear-regression.gif"
                    href="/linear-regression"
                />
                <PlaygroundProjectCard
                    title={dict.playground["terrain"]}
                    image="/static/images/terrain.gif"
                    href="/terrain"
                />
            </div>
        </div>
    );
}
