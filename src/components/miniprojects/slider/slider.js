import "./slider.scss";
import { DEFAULT_MAX, DEFAULT_MIN } from "./constants";

export default function Slider({
    label,
    onChange,
    className = "",
    min = DEFAULT_MIN,
    max = DEFAULT_MAX,
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
