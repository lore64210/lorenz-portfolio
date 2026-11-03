"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";
import { experienceItems } from "@/content/preview";

export default function ExperienceSection({ copy }) {
    const [activeKey, setActiveKey] = useState(experienceItems[0].key);
    const active =
        experienceItems.find((item) => item.key === activeKey) ??
        experienceItems[0];
    const activeCopy = copy.experience.items[active.key];

    return (
        <section
            id="experience"
            className="section experience-section snap-section"
        >
            <div className="container">
                <SectionHeading
                    eyebrow={copy.experience.eyebrow}
                    title={copy.experience.title}
                    description={copy.experience.description}
                />

                <div className="experience-layout">
                    <Reveal as="div" className="experience-list" delay={0.05}>
                        {experienceItems.map((item, index) => {
                            const itemCopy = copy.experience.items[item.key];
                            const isActive = item.key === activeKey;

                            return (
                                <button
                                    key={item.key}
                                    type="button"
                                    className={`experience-tab ${
                                        isActive ? "is-active" : ""
                                    }`}
                                    onClick={() => setActiveKey(item.key)}
                                    aria-pressed={isActive}
                                    aria-controls="experience-detail"
                                >
                                    <span className="experience-index">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="experience-tab-body">
                                        <span className="experience-company">
                                            {item.company}
                                        </span>
                                        <span className="experience-role">
                                            {itemCopy.role}
                                        </span>
                                    </span>
                                    <span className="experience-period">
                                        {itemCopy.period}
                                    </span>
                                </button>
                            );
                        })}
                    </Reveal>

                    <Reveal
                        as="div"
                        className="experience-detail"
                        delay={0.12}
                    >
                        <div
                            key={active.key}
                            id="experience-detail"
                            className="experience-detail-body"
                        >
                            <p className="experience-detail-meta">
                                <span className="experience-detail-company">
                                    {active.company}
                                </span>
                                <span className="experience-detail-period">
                                    {activeCopy.period}
                                </span>
                            </p>
                            <h3>{activeCopy.role}</h3>
                            <ul className="experience-bullets">
                                {activeCopy.bullets.map((bullet) => (
                                    <li key={bullet}>{bullet}</li>
                                ))}
                            </ul>
                            <div className="experience-stack">
                                {active.stack.map((tech) => (
                                    <span
                                        className="experience-tag"
                                        key={tech}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
