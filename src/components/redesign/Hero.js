"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
    FaArrowRight,
    FaEnvelope,
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";
import { previewLinks } from "@/content/preview";
import Reveal from "@/components/motion/Reveal";
import RevealMedia from "@/components/motion/RevealMedia";
import RevealText from "@/components/motion/RevealText";

export default function Hero({ lang, copy }) {
    const sectionRef = useRef(null);
    const cvHref = `/static/pdf/CV_LORENZO_LOPEZ_${lang.toUpperCase()}.pdf`;

    useEffect(() => {
        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const section = sectionRef.current;
        if (!section) return;

        const copyEl = section.querySelector(".hero-copy");
        const visualEl = section.querySelector(".hero-visual");
        let raf = 0;

        const update = () => {
            const rect = section.getBoundingClientRect();
            const progress = Math.max(
                0,
                Math.min(1, -rect.top / Math.max(1, rect.height))
            );
            const y = progress * -40;
            const opacity = 1 - progress * 0.9;

            if (copyEl) {
                copyEl.style.transform = `translate3d(0, ${y}px, 0)`;
                copyEl.style.opacity = String(opacity);
            }
            if (visualEl) {
                visualEl.style.transform = `translate3d(0, ${y * 0.6}px, 0)`;
                visualEl.style.opacity = String(opacity);
            }
        };

        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        update();

        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section className="hero" ref={sectionRef}>
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
                        <Image
                            src="/static/images/profile/lorenzo-hero.png"
                            width={827}
                            height={1232}
                            alt={copy.hero.imageAlt}
                            className="hero-image"
                            sizes="(max-width: 960px) 80vw, 480px"
                            priority
                        />
                    </RevealMedia>
                </div>
            </div>
        </section>
    );
}
