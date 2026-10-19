import Image from "next/image";
import {
    FaArrowRight,
    FaEnvelope,
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";
import { previewLinks } from "@/content/preview";

export default function Hero({ lang, copy }) {
    const cvHref = `/static/pdf/CV_LORENZO_LOPEZ_${lang.toUpperCase()}.pdf`;

    return (
        <section className="hero">
            <div className="container hero-inner">
                <div className="hero-copy">
                    <p className="eyebrow">{copy.hero.eyebrow}</p>
                    <h1>{copy.hero.name}</h1>
                    <p className="hero-role">{copy.hero.role}</p>
                    <p className="hero-description">{copy.hero.description}</p>

                    <div className="hero-actions">
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
                    </div>

                    <div className="hero-social">
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
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-grid" aria-hidden="true" />
                    <div className="hero-glow" aria-hidden="true" />
                    <div className="hero-ring hero-ring-1" aria-hidden="true" />
                    <div className="hero-ring hero-ring-2" aria-hidden="true" />
                    <Image
                        src="/static/images/profile/lorenzo-hero.png"
                        width={827}
                        height={1232}
                        alt={copy.hero.imageAlt}
                        className="hero-image"
                        sizes="(max-width: 960px) 80vw, 480px"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
