import ProjectImage from "./projectImage";

export default function PlaygroundProjectCard({ image, title }) {
    return (
        <div className="playground-project-card">
            <div className="playground-project-card-floating">
                <ProjectImage src={image} alt={title} />
                <h2>{title}</h2>
            </div>
        </div>
    );
}
