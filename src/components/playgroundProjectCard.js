import Link from "next/link";
import ProjectImage from "./projectImage";
import WithAnimation from "./withAnimation";

export default function PlaygroundProjectCard({ image, title, href }) {
    return (
        <Link target="_blank" href={href} className="playground-project-card">
            <WithAnimation>
                <div className="playground-project-card-floating">
                    <ProjectImage src={image} alt={title} />
                    <h2>{title}</h2>
                </div>
            </WithAnimation>
        </Link>
    );
}
