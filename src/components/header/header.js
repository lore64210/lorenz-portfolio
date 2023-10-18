"use client";
import ProfilePic from "../profilePic";
import useIsMobile from "@/hooks/useIsMobile";
import MobileHeader from "./mobileHeader";
import HeaderMenu from "./headerMenu";

export default function Header({ dict, lang, showProfilePic = true }) {
    const isMobile = useIsMobile();
    return isMobile ? (
        <MobileHeader dict={dict} lang={lang} />
    ) : (
        <header className="header">
            <ProfilePic
                className={`header-image ${
                    showProfilePic ? "show-header-image" : "hide-header-image"
                }`}
            />
            <div className="header-content">
                <h1
                    className={`header-title ${
                        showProfilePic
                            ? "show-header-title"
                            : "hide-header-title"
                    }`}
                >
                    Lorenzo Lopez
                </h1>
                <nav className={showProfilePic ? "" : "hide-header-nav-margin"}>
                    <HeaderMenu dict={dict} lang={lang} />
                </nav>
            </div>
        </header>
    );
}
