export default function Checkbox({
    label,
    className = "",
    defaultValue,
    onChange,
}) {
    return (
        <label className={`${className} input-container checkbox`}>
            <input
                className="input"
                checked={defaultValue}
                type="checkbox"
                onChange={({ target: { checked } }) => onChange(checked)}
            />
            <span className="label">{label}</span>
        </label>
    );
}
