import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/motion/Reveal";
import RevealMedia from "@/components/motion/RevealMedia";
import RevealText from "@/components/motion/RevealText";
import SectionHeading from "./SectionHeading";
import { projectItems } from "@/content/preview";

function ProjectRow({ project, index, copy }) {
    const item = copy.projects.items[project.key];
    const stack = project.stack.split(" · ");

    return (
        <article
            className={`project-row ${index % 2 ? "is-reversed" : ""}`}
        >
            <RevealMedia
                className={`project-media project-media-${project.tone}`}
            >
                <Image
                    src={project.image}
                    alt={item.title}
                    width={1200}
                    height={900}
                    className="project-image"
                    style={{ objectFit: project.fit }}
                    sizes="(max-width: 960px) 92vw, 1000px"
                />
            </RevealMedia>

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

export default function ProjectsSection({ copy }) {
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
                            project={projectItems[0]}
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
                            project={projectItems[1]}
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
                            project={projectItems[2]}
                            index={2}
                            copy={copy}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
