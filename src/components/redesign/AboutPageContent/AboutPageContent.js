import "./AboutPageContent.scss";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DancerCanvas from "@/components/dancer/DancerCanvas/DancerCanvas";
import Reveal from "@/components/motion/Reveal/Reveal";
import RevealText from "@/components/motion/RevealText/RevealText";
import ParallaxY from "@/components/motion/ParallaxY/ParallaxY";
import {
    CTA_DELAY,
    EYEBROW_DELAY,
    LEAD_DELAY,
    META_DELAY,
    PARALLAX_SPEED,
    STORY_STEP,
} from "./constants";

export default function AboutPageContent({ lang, copy }) {
    return (
        <main className="preview-main about-page">
            <div className="container">
                <Link href={`/${lang}`} className="back-link">
                    <FaArrowLeft />
                    {copy.aboutPage.back}
                </Link>

                <header className="about-page-hero">
                    <div className="about-page-copy">
                        <Reveal
                            as="p"
                            className="eyebrow"
                            play
                            delay={EYEBROW_DELAY}
                        >
                            {copy.aboutPage.eyebrow}
                        </Reveal>
                        <RevealText
                            as="h1"
                            text={copy.aboutPage.title}
                            play
                        />
                        <Reveal
                            as="p"
                            className="about-page-lead"
                            play
                            delay={LEAD_DELAY}
                        >
                            {copy.aboutPage.lead}
                        </Reveal>
                        <Reveal
                            as="ul"
                            className="about-page-meta"
                            play
                            delay={META_DELAY}
                        >
                            {copy.aboutPage.meta.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </Reveal>
                    </div>

                    <ParallaxY
                        className="about-page-figure"
                        speed={PARALLAX_SPEED}
                    >
                        <div className="about-page-glow" aria-hidden="true" />
                        <div className="about-page-ring" aria-hidden="true" />
                        <div>
                            <DancerCanvas
                                variant="aboutPage"
                                label={copy.about.imageAlt}
                                poster="/static/images/profile/about-page-poster.webp"
                            />
                        </div>
                    </ParallaxY>
                </header>

                <div className="about-page-story">
                    {copy.aboutPage.sections.map((section, index) => (
                        <Reveal
                            as="section"
                            className="about-page-section"
                            key={section.title}
                            delay={index * STORY_STEP}
                        >
                            <h2>{section.title}</h2>
                            <div className="about-page-section-body">
                                {section.paragraphs.map(
                                    (paragraph, paragraphIndex) => (
                                        <p key={paragraphIndex}>{paragraph}</p>
                                    )
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal as="div" className="about-page-cta" delay={CTA_DELAY}>
                    <h2>{copy.aboutPage.ctaTitle}</h2>
                    <p>{copy.aboutPage.ctaText}</p>
                    <Link
                        href={`/${lang}#contact`}
                        className="btn btn-primary"
                    >
                        {copy.aboutPage.cta}
                        <FaArrowRight />
                    </Link>
                </Reveal>
            </div>
        </main>
    );
}
