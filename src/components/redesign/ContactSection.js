import {
    FaArrowRight,
    FaEnvelope,
    FaFileAlt,
    FaLinkedin,
} from "react-icons/fa";
import DancerCanvas from "@/components/dancer/DancerCanvas";
import Reveal from "@/components/motion/Reveal";
import RevealText from "@/components/motion/RevealText";
import ParallaxY from "@/components/motion/ParallaxY";
import { previewLinks } from "@/content/preview";

export default function ContactSection({ lang, copy }) {
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

    const cards = [
        {
            key: "project",
            href: previewLinks.email,
            icon: <FaEnvelope />,
            external: false,
        },
        {
            key: "connect",
            href: previewLinks.linkedin,
            icon: <FaLinkedin />,
            external: true,
        },
        {
            key: "cv",
            icon: <FaFileAlt />,
            downloads: orderedCvOptions,
        },
    ];

    return (
        <section id="contact" className="section contact-section snap-section">
            <div className="container">
                <div className="contact-header">
                    <div className="contact-copy">
                        <p className="eyebrow">{copy.contact.eyebrow}</p>
                        <RevealText as="h2" text={copy.contact.title} />
                        <Reveal
                            as="p"
                            className="section-description"
                            delay={0.15}
                        >
                            {copy.contact.description}
                        </Reveal>
                    </div>

                    <div className="contact-figure" aria-hidden="true">
                        <div className="contact-glow" />
                        <div className="contact-ring" />
                        <ParallaxY
                            className="contact-image-parallax"
                            speed={0.12}
                        >
                            <div className="contact-image-wrap">
                                <DancerCanvas variant="contact" />
                            </div>
                        </ParallaxY>
                    </div>
                </div>

                <div className="contact-cards">
                    {cards.map(
                        (
                            { key, href, icon, external, downloads },
                            index
                        ) => {
                            const card = copy.contact.cards[key];

                            if (downloads) {
                                return (
                                    <Reveal
                                        as="div"
                                        key={key}
                                        className="contact-card"
                                        delay={index * 0.06}
                                    >
                                        <span className="contact-card-icon">
                                            {icon}
                                        </span>
                                        <h3>{card.title}</h3>
                                        <p>{card.text}</p>
                                        <div className="contact-card-options">
                                            {downloads.map((option) => (
                                                <a
                                                    key={option.key}
                                                    href={option.href}
                                                    download={option.download}
                                                    className="contact-card-link"
                                                >
                                                    {option.label}
                                                    <FaArrowRight />
                                                </a>
                                            ))}
                                        </div>
                                    </Reveal>
                                );
                            }

                            return (
                                <Reveal
                                    as="a"
                                    key={key}
                                    href={href}
                                    {...(external
                                        ? {
                                              target: "_blank",
                                              rel: "noreferrer",
                                          }
                                        : {})}
                                    className="contact-card"
                                    delay={index * 0.06}
                                >
                                    <span className="contact-card-icon">
                                        {icon}
                                    </span>
                                    <h3>{card.title}</h3>
                                    <p>{card.text}</p>
                                    <span className="contact-card-link">
                                        {card.cta}
                                        <FaArrowRight />
                                    </span>
                                </Reveal>
                            );
                        }
                    )}
                </div>

                <Reveal
                    as="div"
                    className="contact-email-row"
                    delay={0.1}
                >
                    <span>{copy.contact.emailLabel}</span>
                    <a
                        href={previewLinks.email}
                        className="contact-email"
                    >
                        lore64210@gmail.com
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
