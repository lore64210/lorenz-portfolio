import Link from "next/link";
import ProjectImage from "./projectImage";

export default function ProjectCard({
    image,
    title,
    description,
    reversed,
    tecnologies,
    href,
}) {
    return (
        <div className="project-card">
            <Link href={href} target="_blank" className="project-card-floating">
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
                        <ProjectImage
                            src={image}
                            alt={title}
                            className="reversed"
                        />
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
        </div>
    );
}
