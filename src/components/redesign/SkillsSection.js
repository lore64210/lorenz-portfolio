import Reveal from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "@/content/preview";

export default function SkillsSection({ copy }) {
    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <SectionHeading
                    eyebrow={copy.skills.eyebrow}
                    title={copy.skills.title}
                    description={copy.skills.description}
                />

                <div className="skills-list">
                    {skillGroups.map((group, index) => (
                        <Reveal
                            as="div"
                            className="skill-row"
                            key={group.key}
                            delay={index * 0.05}
                        >
                            <h3 className="skill-row-title">
                                {copy.skills.groups[group.key]}
                            </h3>
                            <div className="skill-tags">
                                {group.items.map((item) => (
                                    <span className="skill-tag" key={item}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
