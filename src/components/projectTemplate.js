"use client";
import useIsMobile from "@/hooks/useIsMobile";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";

export default function ProjectTemplate({
    title,
    description,
    image,
    children,
    href,
}) {
    const isMobile = useIsMobile();
    const { width, height } = useWindowSize();
    const size = isMobile ? (width * 75) / 100 : (height * 40) / 100;

    return (
        <main className="project-main">
            <div className="project-header">
                <div className="header-text">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <Link target="_blank" href={href}>
                        Go to Project
                    </Link>
                </div>
                {!!size && (
                    <Image
                        src={image}
                        alt={title}
                        priority={true}
                        draggable={false}
                        width={size}
                        height={size}
                        className="header-image"
                    />
                )}
            </div>
            <div className="project-content-container">{children}</div>
        </main>
    );
}
