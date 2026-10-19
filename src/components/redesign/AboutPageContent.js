import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
                        <p className="eyebrow">{copy.aboutPage.eyebrow}</p>
                        <h1>{copy.aboutPage.title}</h1>
                        <p className="about-page-lead">
                            {copy.aboutPage.lead}
                        </p>
                        <ul className="about-page-meta">
                            {copy.aboutPage.meta.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="about-page-figure" aria-hidden="true">
                        <div className="about-page-glow" />
                        <div className="about-page-ring" />
                        <Image
                            src="/static/images/profile/lorenzo-side.png"
                            width={624}
                            height={1036}
                            alt=""
                            className="about-page-image"
                            sizes="(max-width: 960px) 70vw, 380px"
                            priority
                        />
                    </div>
                </header>

                <div className="about-page-story">
                    {copy.aboutPage.sections.map((section) => (
                        <section
                            className="about-page-section"
                            key={section.title}
                        >
                            <h2>{section.title}</h2>
                            <div className="about-page-section-body">
                                {section.paragraphs.map(
                                    (paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    )
                                )}
                            </div>
                        </section>
                    ))}
                </div>

                <div className="about-page-cta">
                    <h2>{copy.aboutPage.ctaTitle}</h2>
                    <p>{copy.aboutPage.ctaText}</p>
                    <Link
                        href={`/${lang}#contact`}
                        className="btn btn-primary"
                    >
                        {copy.aboutPage.cta}
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </main>
    );
}
