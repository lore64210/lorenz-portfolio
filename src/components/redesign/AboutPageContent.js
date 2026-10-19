import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/motion/Reveal";
import RevealMedia from "@/components/motion/RevealMedia";
import RevealText from "@/components/motion/RevealText";
import ParallaxY from "@/components/motion/ParallaxY";

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
                            delay={0.05}
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
                            delay={0.15}
                        >
                            {copy.aboutPage.lead}
                        </Reveal>
                        <Reveal
                            as="ul"
                            className="about-page-meta"
                            play
                            delay={0.25}
                        >
                            {copy.aboutPage.meta.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </Reveal>
                    </div>

                    <ParallaxY
                        className="about-page-figure"
                        speed={0.12}
                    >
                        <div className="about-page-glow" aria-hidden="true" />
                        <div className="about-page-ring" aria-hidden="true" />
                        <RevealMedia>
                            <Image
                                src="/static/images/profile/lorenzo-side.png"
                                width={624}
                                height={1036}
                                alt=""
                                className="about-page-image"
                                sizes="(max-width: 960px) 70vw, 380px"
                                priority
                            />
                        </RevealMedia>
                    </ParallaxY>
                </header>

                <div className="about-page-story">
                    {copy.aboutPage.sections.map((section, index) => (
                        <Reveal
                            as="section"
                            className="about-page-section"
                            key={section.title}
                            delay={index * 0.04}
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

                <Reveal as="div" className="about-page-cta" delay={0.1}>
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
