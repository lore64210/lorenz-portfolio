import Reveal from "@/components/motion/Reveal";
import RevealText from "@/components/motion/RevealText";

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
                    delay={0.15}
                >
                    {description}
                </Reveal>
            )}
        </div>
    );
}
