"use client";
import useIsMobile from "@/hooks/useIsMobile";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";

export default function ProfilePic() {
    const isMobile = useIsMobile();
    const { width, height } = useWindowSize();
    const size = isMobile ? (width * 75) / 100 : (height * 40) / 100;
    return (
        !!size && (
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
        )
    );
}
