import Reveal from "@/components/motion/Reveal";

export default function PlaygroundNotes({ title, notes, className = "" }) {
    if (!notes.length) return null;

    return (
        <Reveal as="div" className={`playground-notes ${className}`.trim()}>
            <h2>{title}</h2>
            <div className="playground-notes-grid">
                {notes.map((note, index) => (
                    <p key={index}>{note}</p>
                ))}
            </div>
        </Reveal>
    );
}
