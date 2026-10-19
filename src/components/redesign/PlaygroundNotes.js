export default function PlaygroundNotes({ title, notes, className = "" }) {
    if (!notes.length) return null;

    return (
        <div className={`playground-notes ${className}`}>
            <h2>{title}</h2>
            <div className="playground-notes-grid">
                {notes.map((note, index) => (
                    <p key={index}>{note}</p>
                ))}
            </div>
        </div>
    );
}
