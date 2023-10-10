"use client";
import useIsMobile from "@/hooks/useIsMobile";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import WithAnimation from "./withAnimation";

export default function ProfilePic({ className }) {
    const isMobile = useIsMobile();
    const { width, height } = useWindowSize();
    const size = isMobile ? (width * 75) / 100 : (height * 40) / 100;
    return (
        !!size && (
            <WithAnimation className={className}>
                <div className="profile-img-border">
                    <Image
                        src="/static/images/profile.webp"
                        alt="Lorenzo Matias Lopez"
                        className="profile-img"
                        priority={true}
                        draggable={false}
                        width={size}
                        height={size}
                    />
                </div>
            </WithAnimation>
        )
    );
}
