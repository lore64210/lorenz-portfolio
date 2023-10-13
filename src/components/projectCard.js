import Link from "next/link";
import ProjectImage from "./projectImage";
import WithAnimation from "./withAnimation";
import Blob from "./blob";

export default function ProjectCard({
    image,
    title,
    description,
    reversed,
    tecnologies,
    href,
    portfolioMaker,
}) {
    return (
        <WithAnimation className="project-card-animation-container">
            <Link
                href={href}
                target="_blank"
                className={`project-card ${reversed ? " reversed" : ""}`}
            >
                {reversed ? (
                    <>
                        <div className="project-card-text">
                            <h2>{title}</h2>
                            <p>{description}</p>
                            <p>
                                Stack: <b>{tecnologies}</b>
                            </p>
                        </div>
                        <ProjectImage src={image} alt={title} />
                    </>
                ) : (
                    <>
                        {portfolioMaker ? (
                            <Blob />
                        ) : (
                            <ProjectImage
                                src={image}
                                alt={title}
                                className="reversed"
                            />
                        )}
                        <div className="project-card-text">
                            <h2>{title}</h2>
                            <p>{description}</p>
                            <p>
                                Stack: <b>{tecnologies}</b>
                            </p>
                        </div>
                    </>
                )}
            </Link>
        </WithAnimation>
    );
}
