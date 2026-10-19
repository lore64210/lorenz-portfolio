import Image from "next/image";
import {
    FaArrowRight,
    FaEnvelope,
    FaFileAlt,
    FaLinkedin,
} from "react-icons/fa";
import { previewLinks } from "@/content/preview";

export default function ContactSection({ lang, copy }) {
    const cvHref = `/static/pdf/CV_LORENZO_LOPEZ_${lang.toUpperCase()}.pdf`;

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
            href: cvHref,
            icon: <FaFileAlt />,
            external: true,
        },
    ];

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <div className="contact-header">
                    <div className="contact-copy">
                        <p className="eyebrow">{copy.contact.eyebrow}</p>
                        <h2>{copy.contact.title}</h2>
                        <p className="section-description">
                            {copy.contact.description}
                        </p>
                    </div>

                    <div className="contact-figure" aria-hidden="true">
                        <div className="contact-glow" />
                        <Image
                            src="/static/images/profile/lorenzo-stand.png"
                            width={642}
                            height={1157}
                            alt=""
                            className="contact-image"
                            sizes="(max-width: 960px) 0px, 340px"
                        />
                    </div>
                </div>

                <div className="contact-cards">
                    {cards.map(({ key, href, icon, external }) => {
                        const card = copy.contact.cards[key];

                        return (
                            <a
                                key={key}
                                href={href}
                                {...(external
                                    ? {
                                          target: "_blank",
                                          rel: "noreferrer",
                                      }
                                    : {})}
                                className="contact-card"
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
                            </a>
                        );
                    })}
                </div>

                <div className="contact-email-row">
                    <span>{copy.contact.emailLabel}</span>
                    <a
                        href={previewLinks.email}
                        className="contact-email"
                    >
                        lore64210@gmail.com
                    </a>
                </div>
            </div>
        </section>
    );
}
