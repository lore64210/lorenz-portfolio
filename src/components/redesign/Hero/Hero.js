import "./Hero.scss";
import {
    FaArrowRight,
    FaChevronDown,
    FaEnvelope,
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";
import { EMAIL_HREF, SOCIAL_LINKS } from "@/constants/site";
import { getCvLangOrder, getCvFile } from "@/constants/cv";
import { REVEAL_DELAYS } from "./constants";
import DancerCanvas from "@/components/dancer/DancerCanvas/DancerCanvas";
import Reveal from "@/components/motion/Reveal/Reveal";
import RevealText from "@/components/motion/RevealText/RevealText";

export default function Hero({ lang, copy }) {
    const cvOptions = getCvLangOrder(lang).map((key) => ({
        key,
        ...getCvFile(key),
        label: copy.cvOptions[key],
    }));

    return (
        <section className="hero snap-section">
            <div className="container hero-inner">
                <div className="hero-copy">
                    <Reveal
                        as="p"
                        className="eyebrow"
                        play
                        delay={REVEAL_DELAYS.eyebrow}
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
                        delay={REVEAL_DELAYS.role}
                    >
                        {copy.hero.role}
                    </Reveal>

                    <p className="hero-description">
                        {copy.hero.description}
                    </p>

                    <Reveal
                        as="div"
                        className="hero-actions"
                        play
                        delay={REVEAL_DELAYS.actions}
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
                                {cvOptions.map((option) => (
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
                        delay={REVEAL_DELAYS.social}
                    >
                        <span>{copy.hero.socialLabel}</span>
                        <a
                            href={SOCIAL_LINKS.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href={SOCIAL_LINKS.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                        <a href={EMAIL_HREF} aria-label="Email">
                            <FaEnvelope />
                        </a>
                    </Reveal>
                </div>

                <div className="hero-visual">
                    <div className="hero-grid" aria-hidden="true" />
                    <div className="hero-glow" aria-hidden="true" />
                    <div className="hero-ring hero-ring-1" aria-hidden="true" />
                    <div className="hero-ring hero-ring-2" aria-hidden="true" />
                    <div className="hero-image-box">
                        <DancerCanvas
                            variant="hero"
                            label={copy.hero.imageAlt}
                            poster="/static/images/profile/hero-poster.webp"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
