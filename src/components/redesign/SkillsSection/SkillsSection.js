import "./SkillsSection.scss";
import Reveal from "@/components/motion/Reveal/Reveal";
import SectionHeading from "@/components/redesign/SectionHeading/SectionHeading";
import { skillGroups } from "@/content/preview";
import { ROW_DELAY_STEP } from "./constants";

export default function SkillsSection({ copy }) {
    return (
        <section id="skills" className="section skills-section snap-section">
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
                            delay={index * ROW_DELAY_STEP}
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
