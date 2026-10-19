import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { playgroundItems } from "@/content/preview";

export default function PlaygroundSection({ lang, copy }) {
    return (
        <section id="playground" className="section playground-section">
            <div className="container">
                <SectionHeading
                    eyebrow={copy.playground.eyebrow}
                    title={copy.playground.title}
                    description={copy.playground.description}
                />

                <div className="playground-grid">
                    {playgroundItems.map((item) => {
                        const info = copy.playground.items[item.key];

                        return (
                            <Link
                                key={item.key}
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
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
