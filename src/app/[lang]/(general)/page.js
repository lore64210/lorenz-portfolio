import PlaygroundProjectCard from "@/components/playgroundProjectCard";
import ProjectCard from "@/components/projectCard";
import { getDictionary } from "../dictionaries";
import WithAnimation from "@/components/withAnimation";
import Blob from "@/components/blob";
import ProjectImage from "@/components/projectImage";
import "../../../styles/home.scss";
import {
    FaDocker,
    FaNodeJs,
    FaVuejs,
    FaPython,
    FaJava,
    FaReact,
    FaAws,
    FaJenkins,
} from "react-icons/fa";
import { SiKubernetes, SiTypescript, SiDjango } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { IoLogoVercel, IoLogoJavascript } from "react-icons/io5";
import { BiLogoSpringBoot, BiLogoGoogleCloud } from "react-icons/bi";
import { DiRedis, DiPostgresql, DiMysql, DiMongodb } from "react-icons/di";

export default async function Home({ params: { lang = "es" } }) {
    const dict = await getDictionary(lang);
    return (
        <div className="home">
            <WithAnimation>
                <h1>{dict.technologies.title}</h1>
            </WithAnimation>
            <div className="project-card-container">
                <WithAnimation className="project-card-animation-container">
                    <div className="project-card tech-icon-card-container">
                        <h2>Lenguajes</h2>
                        <div className="tech-icon-card-content-container">
                            <div className="tech-icon-container">
                                <IoLogoJavascript className="tech-icon" />
                                <span>Javascript</span>
                            </div>
                            <div className="tech-icon-container">
                                <FaJava className="tech-icon" />
                                <span>Java</span>
                            </div>
                            <div className="tech-icon-container">
                                <FaPython className="tech-icon" />
                                <span>Python</span>
                            </div>
                            <div className="tech-icon-container">
                                <SiTypescript className="tech-icon" />
                                <span>Typescript</span>
                            </div>
                        </div>
                    </div>
                </WithAnimation>
                <WithAnimation className="project-card-animation-container">
                    <div className="project-card tech-icon-card-container">
                        <h2>Frameworks</h2>
                        <div className="tech-icon-card-content-container">
                            <div className="tech-icon-container">
                                <FaReact className="tech-icon" />
                                <span>ReactJS</span>
                            </div>
                            <div className="tech-icon-container">
                                <TbBrandNextjs className="tech-icon" />
                                <span>NextJS</span>
                            </div>
                            <div className="tech-icon-container">
                                <SiDjango className="tech-icon" />
                                <span>DJango</span>
                            </div>
                            <div className="tech-icon-container">
                                <BiLogoSpringBoot className="tech-icon" />
                                <span>SpringBoot</span>
                            </div>
                            <div className="tech-icon-container">
                                <FaNodeJs className="tech-icon" />
                                <span>NodeJS</span>
                            </div>
                        </div>
                    </div>
                </WithAnimation>
                <WithAnimation className="project-card-animation-container">
                    <div className="project-card tech-icon-card-container reversed-tech">
                        <h2>Bases de datos</h2>
                        <div className="tech-icon-card-content-container">
                            <div className="tech-icon-container">
                                <DiMongodb className="tech-icon" />
                                <span>MongoDB</span>
                            </div>
                            <div className="tech-icon-container">
                                <DiMysql className="tech-icon" />
                                <span>MySQL</span>
                            </div>
                            <div className="tech-icon-container">
                                <DiPostgresql className="tech-icon" />
                                <span>PostreSQL</span>
                            </div>
                            <div className="tech-icon-container">
                                <DiRedis className="tech-icon" />
                                <span>Redis</span>
                            </div>
                        </div>
                    </div>
                </WithAnimation>
                <WithAnimation className="project-card-animation-container">
                    <div className="project-card tech-icon-card-container">
                        <h2>Despliegues</h2>
                        <div className="tech-icon-card-content-container">
                            <div className="tech-icon-container">
                                <FaDocker className="tech-icon" />
                                <span>Docker</span>
                            </div>
                            <div className="tech-icon-container">
                                <IoLogoVercel className="tech-icon" />
                                <span>Vercel</span>
                            </div>
                            <div className="tech-icon-container">
                                <FaAws className="tech-icon" />
                                <span>AWS</span>
                            </div>
                            <div className="tech-icon-container">
                                <BiLogoGoogleCloud className="tech-icon" />
                                <span>GCP</span>
                            </div>
                            <div className="tech-icon-container">
                                <FaJenkins className="tech-icon" />
                                <span>Jenkins</span>
                            </div>
                        </div>
                    </div>
                </WithAnimation>
            </div>

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
                {/*
                 
                <ProjectCard
                    title={dict.projects["historia-humo"].title}
                    description={dict.projects["historia-humo"].description}
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
                */}
                <ProjectCard
                    title={dict.projects["spring-crud-initializr"].title}
                    description={
                        dict.projects["spring-crud-initializr"].description
                    }
                    tecnologies="React, Spring Boot"
                    //reversed
                    imageComponent={
                        <ProjectImage
                            src="/static/images/spring-crud-initializr.png"
                            alt={dict.projects["spring-crud-initializr"].title}
                            className="organizer-logo spring-crud-initializr-logo"
                        />
                    }
                    href="https://spring-crud-initializr-pkecm27xsq-uc.a.run.app/"
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
