import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { projectItems } from "@/content/preview";

export default function ProjectsSection({ copy }) {
    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <SectionHeading
                    eyebrow={copy.projects.eyebrow}
                    title={copy.projects.title}
                    description={copy.projects.description}
                />

                <div className="projects-list">
                    {projectItems.map((project, index) => {
                        const item = copy.projects.items[project.key];
                        const stack = project.stack.split(" · ");

                        return (
                            <article
                                key={project.key}
                                className={`project-row ${
                                    index % 2 ? "is-reversed" : ""
                                }`}
                            >
                                <div
                                    className={`project-media project-media-${project.tone}`}
                                >
                                    <Image
                                        src={project.image}
                                        alt={item.title}
                                        width={1200}
                                        height={900}
                                        className="project-image"
                                        style={{ objectFit: project.fit }}
                                    />
                                </div>

                                <div className="project-content">
                                    <span className="project-index">
                                        0{index + 1}
                                    </span>
                                    <p className="project-label">{item.label}</p>
                                    <h3>{item.title}</h3>
                                    <p className="project-description">
                                        {item.description}
                                    </p>

                                    <div className="project-tags">
                                        {stack.map((tech) => (
                                            <span
                                                className="project-tag"
                                                key={tech}
                                            >
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
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
