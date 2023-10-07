"use client";
import useIsMobile from "@/hooks/useIsMobile";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";

export default function ProjectImage({ src, alt, className }) {
    const isMobile = useIsMobile();
    const { width, height } = useWindowSize();
    const size = isMobile ? (width * 75) / 100 : (height * 40) / 100;
    return (
        !!size && (
            <Image
                src={src}
                alt={alt}
                className={className}
                priority={true}
                draggable={false}
                width={size}
                height={size}
            />
        )
    );
}
