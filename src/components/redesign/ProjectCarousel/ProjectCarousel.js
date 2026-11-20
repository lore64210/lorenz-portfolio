"use client";
import "./ProjectCarousel.scss";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RevealMedia from "@/components/motion/RevealMedia/RevealMedia";
import CatarsisLogo from "@/components/redesign/CatarsisLogo/CatarsisLogo";
import {
    CAROUSEL_IMAGE_SIZES,
    SOUND_BARS_COUNT,
    SWIPE_THRESHOLD,
} from "./constants";

const SOUND_BARS = Array.from({ length: SOUND_BARS_COUNT }, (_, index) => index);

export default function ProjectCarousel({ project, title, copy, className }) {
    const images = project.images?.length
        ? project.images
        : [{ src: project.image, fit: project.fit }];
    const [active, setActive] = useState(0);
    const trackRef = useRef(null);
    const swipeStart = useRef(null);
    const swiped = useRef(false);
    const hasMultiple = images.length > 1;

    useEffect(() => {
        trackRef.current?.style.setProperty(
            "--carousel-offset",
            `${-active * 100}%`
        );
    }, [active]);

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

        if (Math.abs(distance) < SWIPE_THRESHOLD) return;

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
                    <div className="project-carousel-track" ref={trackRef}>
                        {images.map((image, index) => (
                            <div
                                key={image.src ?? `${image.type}-${index}`}
                                className={`project-carousel-slide ${
                                    index === active ? "is-active" : ""
                                } ${
                                    image.type
                                        ? "project-carousel-slide-logo"
                                        : ""
                                } ${
                                    image.type === "catarsis-logo"
                                        ? "project-carousel-slide-catarsis"
                                        : ""
                                }`}
                                aria-hidden={index !== active}
                            >
                                {image.type === "catarsis-logo" ? (
                                    <CatarsisLogo active={index === active} />
                                ) : image.type === "musikit-logo" ? (
                                    <div className="project-logo-musikit">
                                        <span
                                            className="project-logo-mark"
                                            aria-hidden="true"
                                        >
                                            <span className="sound-bars">
                                                {SOUND_BARS.map((bar) => (
                                                    <span
                                                        key={bar}
                                                        className="sound-bars-bar"
                                                    />
                                                ))}
                                            </span>
                                        </span>
                                        <span className="project-logo-title">
                                            musikit!
                                        </span>
                                    </div>
                                ) : (
                                    <Image
                                        src={image.src}
                                        alt={`${title} — ${index + 1}`}
                                        width={1200}
                                        height={900}
                                        className={`project-image project-image-fit-${
                                            image.fit ??
                                            project.fit ??
                                            "cover"
                                        }`}
                                        sizes={CAROUSEL_IMAGE_SIZES}
                                    />
                                )}
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
                                    key={image.src ?? `${image.type}-${index}`}
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
