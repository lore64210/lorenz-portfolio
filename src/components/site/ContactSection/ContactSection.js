import "./ContactSection.scss";
import {
    FaArrowRight,
    FaEnvelope,
    FaFileAlt,
    FaLinkedin,
} from "react-icons/fa";
import DancerCanvas from "@/components/dancer/DancerCanvas/DancerCanvas";
import Reveal from "@/components/motion/Reveal/Reveal";
import RevealText from "@/components/motion/RevealText/RevealText";
import ParallaxY from "@/components/motion/ParallaxY/ParallaxY";
import { CONTACT_EMAIL, EMAIL_HREF, SOCIAL_LINKS } from "@/constants/site";
import { getCvFile, getCvLangOrder } from "@/constants/cv";
import {
    CARD_DELAY_STEP,
    EMAIL_DELAY,
    HEADER_DELAY,
    PARALLAX_SPEED,
} from "./constants";

export default function ContactSection({ lang, copy }) {
    const cvOptions = getCvLangOrder(lang).map((key) => ({
        key,
        ...getCvFile(key),
        label: copy.cvOptions[key],
    }));

    const cards = [
        {
            key: "project",
            href: EMAIL_HREF,
            icon: <FaEnvelope />,
            external: false,
        },
        {
            key: "connect",
            href: SOCIAL_LINKS.linkedin,
            icon: <FaLinkedin />,
            external: true,
        },
        {
            key: "cv",
            icon: <FaFileAlt />,
            downloads: cvOptions,
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
                            delay={HEADER_DELAY}
                        >
                            {copy.contact.description}
                        </Reveal>
                    </div>

                    <div className="contact-figure" aria-hidden="true">
                        <div className="contact-glow" />
                        <div className="contact-ring" />
                        <ParallaxY
                            className="contact-image-parallax"
                            speed={PARALLAX_SPEED}
                        >
                            <div className="contact-image-wrap">
                                <DancerCanvas
                                    variant="contact"
                                    poster="/static/images/profile/contact-poster.webp"
                                />
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
                                        delay={index * CARD_DELAY_STEP}
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
                                    delay={index * CARD_DELAY_STEP}
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
                    delay={EMAIL_DELAY}
                >
                    <span>{copy.contact.emailLabel}</span>
                    <a
                        href={EMAIL_HREF}
                        className="contact-email"
                    >
                        {CONTACT_EMAIL}
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
