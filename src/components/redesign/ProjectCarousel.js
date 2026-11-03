"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RevealMedia from "@/components/motion/RevealMedia";

export default function ProjectCarousel({ project, title, copy, className }) {
    const images = project.images?.length
        ? project.images
        : [{ src: project.image, fit: project.fit }];
    const [active, setActive] = useState(0);
    const swipeStart = useRef(null);
    const swiped = useRef(false);
    const hasMultiple = images.length > 1;

    const goTo = (index) => {
        setActive((index + images.length) % images.length);
    };

    const handleTouchStart = (event) => {
        swipeStart.current = event.touches[0].clientX;
        swiped.current = false;
    };

    const handleTouchEnd = (event) => {
        if (swipeStart.current === null) return;

        const distance = event.changedTouches[0].clientX - swipeStart.current;
        swipeStart.current = null;

        if (Math.abs(distance) < 40) return;

        swiped.current = true;
        goTo(active + (distance < 0 ? 1 : -1));
    };

    return (
        <RevealMedia className={className}>
            <div className="project-carousel">
                <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-media-link"
                    aria-label={title}
                    onClick={(event) => {
                        if (swiped.current) {
                            event.preventDefault();
                            swiped.current = false;
                        }
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className="project-carousel-track"
                        style={{ transform: `translateX(-${active * 100}%)` }}
                    >
                        {images.map((image, index) => (
                            <div
                                key={image.src}
                                className={`project-carousel-slide ${
                                    index === active ? "is-active" : ""
                                }`}
                                aria-hidden={index !== active}
                            >
                                <Image
                                    src={image.src}
                                    alt={`${title} — ${index + 1}`}
                                    width={1200}
                                    height={900}
                                    className="project-image"
                                    style={{
                                        objectFit:
                                            image.fit ??
                                            project.fit ??
                                            "cover",
                                        mixBlendMode: image.blend,
                                    }}
                                    sizes="(max-width: 960px) 92vw, 1000px"
                                />
                            </div>
                        ))}
                    </div>
                </a>

                {hasMultiple && (
                    <>
                        <button
                            type="button"
                            className="project-carousel-arrow is-prev"
                            onClick={() => goTo(active - 1)}
                            aria-label={copy.projects.previousImage}
                        >
                            <FaChevronLeft aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            className="project-carousel-arrow is-next"
                            onClick={() => goTo(active + 1)}
                            aria-label={copy.projects.nextImage}
                        >
                            <FaChevronRight aria-hidden="true" />
                        </button>
                        <div className="project-carousel-dots">
                            {images.map((image, index) => (
                                <button
                                    key={image.src}
                                    type="button"
                                    className={`project-carousel-dot ${
                                        index === active ? "is-active" : ""
                                    }`}
                                    aria-label={`${index + 1} / ${images.length}`}
                                    aria-current={
                                        index === active ? "true" : undefined
                                    }
                                    onClick={() => goTo(index)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </RevealMedia>
    );
}
