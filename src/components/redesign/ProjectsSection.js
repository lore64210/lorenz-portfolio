import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/motion/Reveal";
import RevealText from "@/components/motion/RevealText";
import SectionHeading from "./SectionHeading";
import ProjectCarousel from "./ProjectCarousel";
import { getProjectHref, projectItems } from "@/content/preview";

function ProjectRow({ project, index, copy }) {
    const item = copy.projects.items[project.key];
    const stack = project.stack.split(" · ");

    return (
        <article
            className={`project-row ${index % 2 ? "is-reversed" : ""}`}
        >
            <ProjectCarousel
                project={project}
                title={item.title}
                copy={copy}
                className={`project-media project-media-${project.tone} ${
                    project.wide ? "project-media-wide" : ""
                }`}
            />

            <Reveal as="div" className="project-content" delay={0.1}>
                <span className="project-index">0{index + 1}</span>
                <p className="project-label">{item.label}</p>
                <RevealText as="h3" text={item.title} />
                <p className="project-description">{item.description}</p>

                <div className="project-tags">
                    {stack.map((tech) => (
                        <span className="project-tag" key={tech}>
                            {tech}
                        </span>
                    ))}
                </div>

                <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link"
                >
                    {item.link}
                    <FaArrowRight />
                </a>
            </Reveal>
        </article>
    );
}

export default function ProjectsSection({ copy, lang = "es" }) {
    const projects = projectItems.map((project) => ({
        ...project,
        href: getProjectHref(project, lang),
    }));

    return (
        <>
            <section
                id="projects"
                className="section projects-section snap-section"
            >
                <div className="container">
                    <SectionHeading
                        eyebrow={copy.projects.eyebrow}
                        title={copy.projects.title}
                        description={copy.projects.description}
                    />
                    <div className="projects-list">
                        <ProjectRow
                            project={projects[0]}
                            index={0}
                            copy={copy}
                        />
                    </div>
                </div>
            </section>

            <section
                id="projects-2"
                className="section projects-section snap-section"
            >
                <div className="container">
                    <div className="projects-list">
                        <ProjectRow
                            project={projects[1]}
                            index={1}
                            copy={copy}
                        />
                    </div>
                </div>
            </section>

            <section
                id="projects-3"
                className="section projects-section snap-section"
            >
                <div className="container">
                    <div className="projects-list">
                        <ProjectRow
                            project={projects[2]}
                            index={2}
                            copy={copy}
                        />
                    </div>
                </div>
            </section>

            <section
                id="projects-4"
                className="section projects-section snap-section"
            >
                <div className="container">
                    <div className="projects-list">
                        <ProjectRow
                            project={projects[3]}
                            index={3}
                            copy={copy}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
