import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function AboutSection({ lang, copy }) {
    const blocks = [
        {
            number: "01",
            title: copy.about.pastTitle,
            text: copy.about.past,
        },
        {
            number: "02",
            title: copy.about.presentTitle,
            text: copy.about.present,
        },
        {
            number: "03",
            title: copy.about.futureTitle,
            text: copy.about.future,
        },
    ];

    return (
        <section className="about-section" id="about">
            <div className="container about-inner">
                <div className="about-visual">
                    <div className="about-line" aria-hidden="true" />
                    <Image
                        src="/static/images/profile/lorenzo-lean-clean.png"
                        width={679}
                        height={1069}
                        alt={copy.about.imageAlt}
                        className="about-image"
                        sizes="(max-width: 960px) 70vw, 380px"
                    />
                </div>

                <div className="about-content">
                    <p className="eyebrow">{copy.about.eyebrow}</p>
                    <h2>{copy.about.title}</h2>
                    <p className="about-intro">{copy.about.intro}</p>

                    <div className="about-blocks">
                        {blocks.map((block) => (
                            <div className="about-block" key={block.number}>
                                <span className="about-number">
                                    {block.number}
                                </span>
                                <div>
                                    <h3>{block.title}</h3>
                                    <p>{block.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link href={`/${lang}/about`} className="text-link">
                        {copy.about.more}
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}
