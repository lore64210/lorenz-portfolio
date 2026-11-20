import "./SectionHeading.scss";
import Reveal from "@/components/motion/Reveal/Reveal";
import RevealText from "@/components/motion/RevealText/RevealText";
import { DESCRIPTION_DELAY } from "./constants";

export default function SectionHeading({ eyebrow, title, description }) {
    return (
        <div className="section-heading">
            <div>
                <p className="eyebrow">{eyebrow}</p>
                <RevealText as="h2" text={title} />
            </div>
            {description && (
                <Reveal
                    as="p"
                    className="section-description"
                    delay={DESCRIPTION_DELAY}
                >
                    {description}
                </Reveal>
            )}
        </div>
    );
}
