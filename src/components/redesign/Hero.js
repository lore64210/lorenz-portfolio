import {
    FaArrowRight,
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
    const cvHref = `/static/pdf/CV_LORENZO_LOPEZ_${lang.toUpperCase()}.pdf`;

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
                        <a
                            href={cvHref}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-ghost"
                        >
                            {copy.hero.cvCta}
                        </a>
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
