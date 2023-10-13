import Link from "next/link";
import WithAnimation from "./withAnimation";

export default function ProjectCard({
    title,
    description,
    reversed,
    tecnologies,
    href,
    imageComponent,
}) {
    return (
        <WithAnimation className="project-card-animation-container">
            <Link
                href={href ?? ""}
                target={href ? "_blank" : "_self"}
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
                        {imageComponent}
                    </>
                ) : (
                    <>
                        {imageComponent}
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
