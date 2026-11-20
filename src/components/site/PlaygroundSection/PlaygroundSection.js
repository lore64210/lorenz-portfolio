import "./PlaygroundSection.scss";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import Reveal from "@/components/motion/Reveal/Reveal";
import SectionHeading from "@/components/site/SectionHeading/SectionHeading";
import { playgroundItems } from "@/content/preview";
import { CARD_DELAY_STEP } from "./constants";

export default function PlaygroundSection({ lang, copy }) {
    return (
        <section id="playground" className="section playground-section snap-section">
            <div className="container">
                <SectionHeading
                    eyebrow={copy.playground.eyebrow}
                    title={copy.playground.title}
                    description={copy.playground.description}
                />

                <div className="playground-grid">
                    {playgroundItems.map((item, index) => {
                        const info = copy.playground.items[item.key];

                        return (
                            <Reveal
                                key={item.key}
                                className="playground-card-reveal"
                                delay={index * CARD_DELAY_STEP}
                            >
                                <Link
                                    href={`/${lang}/${item.href}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="playground-card"
                                >
                                    <div
                                        className={`playground-media ${
                                            item.tone === "light"
                                                ? "playground-media-light"
                                                : ""
                                        }`}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={info.title}
                                            width={1200}
                                            height={800}
                                            unoptimized
                                            className="playground-image"
                                        />
                                        <span
                                            className="playground-arrow"
                                            aria-hidden="true"
                                        >
                                            <FaExternalLinkAlt />
                                        </span>
                                    </div>

                                    <div className="playground-body">
                                        <h3>{info.title}</h3>
                                        <p>{info.description}</p>
                                    </div>
                                </Link>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
