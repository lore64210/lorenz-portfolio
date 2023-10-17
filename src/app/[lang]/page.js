import PlaygroundProjectCard from "@/components/playgroundProjectCard";
import ProjectCard from "@/components/projectCard";
import { getDictionary } from "./dictionaries";
import WithAnimation from "@/components/withAnimation";
import Blob from "@/components/blob";
import ProjectImage from "@/components/projectImage";
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
                        <div className="historia-humo-logo-container">
                            <svg
                                className="historia-humo-logo"
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 640 512"
                            >
                                <path d="M128 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm32 97.3c28.3-12.3 48-40.5 48-73.3c0-44.2-35.8-80-80-80S48 51.8 48 96c0 32.8 19.7 61 48 73.3V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H288v54.7c-28.3 12.3-48 40.5-48 73.3c0 44.2 35.8 80 80 80s80-35.8 80-80c0-32.8-19.7-61-48-73.3V288H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H544V169.3c28.3-12.3 48-40.5 48-73.3c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 32.8 19.7 61 48 73.3V224H160V169.3zM488 96a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM320 392a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                            </svg>
                        </div>
                    }
                    tecnologies="Django"
                    href="/historia-y-humo"
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
