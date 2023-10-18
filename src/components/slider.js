export default function Slider({
    label,
    onChange,
    className = "",
    min = 1,
    max = 100,
    value,
}) {
    return (
        <div className={`${className} input-container`}>
            <label>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    className="slider"
                    onChange={({ target: { value } }) => onChange(value)}
                />
                <span className="select-label">{label}</span>
            </label>
        </div>
    );
}
