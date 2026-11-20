import "./ProjectsSection.scss";
import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/motion/Reveal/Reveal";
import RevealText from "@/components/motion/RevealText/RevealText";
import SectionHeading from "@/components/site/SectionHeading/SectionHeading";
import ProjectCarousel from "@/components/site/ProjectCarousel/ProjectCarousel";
import { getProjectHref, projectItems } from "@/content/preview";
import { CONTENT_DELAY } from "./constants";

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

            <Reveal as="div" className="project-content" delay={CONTENT_DELAY}>
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
            {projects.map((project, index) => (
                <section
                    key={project.key}
                    id={index === 0 ? "projects" : `projects-${index + 1}`}
                    className="section projects-section snap-section"
                >
                    <div className="container">
                        {index === 0 && (
                            <SectionHeading
                                eyebrow={copy.projects.eyebrow}
                                title={copy.projects.title}
                                description={copy.projects.description}
                            />
                        )}
                        <div className="projects-list">
                            <ProjectRow
                                project={project}
                                index={index}
                                copy={copy}
                            />
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}
