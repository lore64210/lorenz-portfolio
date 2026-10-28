import {
    FaArrowRight,
    FaChevronDown,
    FaEnvelope,
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";
import { previewLinks } from "@/content/preview";
import DancerCanvas from "@/components/dancer/DancerCanvas";
import Reveal from "@/components/motion/Reveal";
import RevealMedia from "@/components/motion/RevealMedia";
import RevealText from "@/components/motion/RevealText";

export default function Hero({ lang, copy }) {
    const cvOptions = [
        {
            key: "es",
            href: "/static/pdf/CV_LORENZO_LOPEZ_ES.pdf",
            label: copy.cvOptions.es,
            download: "CV_Lorenzo_Matias_Lopez_ES.pdf",
        },
        {
            key: "en",
            href: "/static/pdf/CV_LORENZO_LOPEZ_EN.pdf",
            label: copy.cvOptions.en,
            download: "CV_Lorenzo_Matias_Lopez_EN.pdf",
        },
    ];
    const orderedCvOptions =
        lang === "en" ? [cvOptions[1], cvOptions[0]] : cvOptions;

    return (
        <section className="hero snap-section">
            <div className="container hero-inner">
                <div className="hero-copy">
                    <Reveal
                        as="p"
                        className="eyebrow"
                        play
                        delay={0.05}
                    >
                        {copy.hero.eyebrow}
                    </Reveal>

                    <RevealText
                        as="h1"
                        text={copy.hero.name}
                        play
                    />

                    <Reveal
                        as="p"
                        className="hero-role"
                        play
                        delay={0.2}
                    >
                        {copy.hero.role}
                    </Reveal>

                    <Reveal
                        as="p"
                        className="hero-description"
                        play
                        delay={0.3}
                    >
                        {copy.hero.description}
                    </Reveal>

                    <Reveal
                        as="div"
                        className="hero-actions"
                        play
                        delay={0.4}
                    >
                        <a href="#projects" className="btn btn-primary">
                            {copy.hero.projectsCta}
                            <FaArrowRight />
                        </a>
                        <details className="cv-menu">
                            <summary className="btn btn-ghost cv-menu-trigger">
                                {copy.hero.cvCta}
                                <FaChevronDown />
                            </summary>
                            <div className="cv-menu-panel">
                                {orderedCvOptions.map((option) => (
                                    <a
                                        key={option.key}
                                        href={option.href}
                                        download={option.download}
                                        className="cv-menu-option"
                                    >
                                        <span>{option.label}</span>
                                        <span className="cv-menu-format">
                                            PDF
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </details>
                    </Reveal>

                    <Reveal
                        as="div"
                        className="hero-social"
                        play
                        delay={0.5}
                    >
                        <span>{copy.hero.socialLabel}</span>
                        <a
                            href={previewLinks.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href={previewLinks.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                        <a href={previewLinks.email} aria-label="Email">
                            <FaEnvelope />
                        </a>
                    </Reveal>
                </div>

                <div className="hero-visual">
                    <div className="hero-grid" aria-hidden="true" />
                    <div className="hero-glow" aria-hidden="true" />
                    <div className="hero-ring hero-ring-1" aria-hidden="true" />
                    <div className="hero-ring hero-ring-2" aria-hidden="true" />
                    <RevealMedia
                        className="hero-image-box"
                        play
                        delay={0.2}
                    >
                        <DancerCanvas
                            variant="hero"
                            label={copy.hero.imageAlt}
                        />
                    </RevealMedia>
                </div>
            </div>
        </section>
    );
}
