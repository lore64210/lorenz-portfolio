"use client";
import useIsMobile from "@/hooks/useIsMobile";
import useWindowSize from "@/hooks/useWindowSize";
import WithAnimation from "./withAnimation";

export default function ProfilePic({
    className,
    callback,
    isAboutPage,
    disableAnimation = false,
}) {
    const isMobile = useIsMobile();
    const { width, height } = useWindowSize();
    const size = isMobile ? (width * 25) / 100 : (height * 25) / 100;
    return (
        !!size && (
            <WithAnimation
                disabled={isAboutPage && disableAnimation}
                className={className}
                callback={callback}
            >
                <div
                    className={`profile-img-border ${
                        isAboutPage ? "about-profile-img-border" : ""
                    }`}
                >
                    <div
                        className={`profile-img ${
                            isAboutPage ? "profile-img-animation" : ""
                        }`}
                    />
                </div>
            </WithAnimation>
        )
    );
}
