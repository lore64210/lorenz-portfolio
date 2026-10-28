import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import DancerCanvas from "@/components/dancer/DancerCanvas";
import Reveal from "@/components/motion/Reveal";
import RevealText from "@/components/motion/RevealText";
import ParallaxY from "@/components/motion/ParallaxY";

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
        <section className="about-section snap-section" id="about">
            <div className="container about-inner">
                <div className="about-visual">
                    <div className="about-line" aria-hidden="true" />
                    <div className="about-ring" aria-hidden="true" />
                    <ParallaxY className="about-image-parallax" speed={0.12}>
                        <div className="about-image-wrap">
                            <DancerCanvas
                                variant="about"
                                label={copy.about.homeImageAlt}
                            />
                        </div>
                    </ParallaxY>
                </div>

                <div className="about-content">
                    <p className="eyebrow">{copy.about.eyebrow}</p>
                    <RevealText as="h2" text={copy.about.title} />
                    <Reveal
                        as="p"
                        className="about-intro"
                        delay={0.1}
                    >
                        {copy.about.intro}
                    </Reveal>

                    <div className="about-blocks">
                        {blocks.map((block, index) => (
                            <Reveal
                                as="div"
                                className="about-block"
                                key={block.number}
                                delay={0.1 + index * 0.06}
                            >
                                <span className="about-number">
                                    {block.number}
                                </span>
                                <div>
                                    <h3>{block.title}</h3>
                                    <p>{block.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="text-link-wrap" delay={0.2}>
                        <Link
                            href={`/${lang}/about`}
                            className="text-link"
                        >
                            {copy.about.more}
                            <FaArrowRight />
                        </Link>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
