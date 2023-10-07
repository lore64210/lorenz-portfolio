import Link from "next/link";
import ProjectImage from "./projectImage";

export default function PlaygroundProjectCard({ image, title, href }) {
    return (
        <Link href={href} className="playground-project-card">
            <div className="playground-project-card-floating">
                <ProjectImage src={image} alt={title} />
                <h2>{title}</h2>
            </div>
        </Link>
    );
}
