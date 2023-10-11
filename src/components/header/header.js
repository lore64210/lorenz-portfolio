"use client";
import Link from "next/link";
import ProfilePic from "../profilePic";
import Accordeon from "../accordeon";
import useIsMobile from "@/hooks/useIsMobile";
import MobileHeader from "./mobileHeader";
import HeaderMenu from "./headerMenu";

export default function Header({ dict, lang }) {
    const isMobile = useIsMobile();
    return isMobile ? (
        <MobileHeader dict={dict} lang={lang} />
    ) : (
        <header className="header">
            <ProfilePic className="header-image" />
            <div className="header-content">
                <h1 className="header-title">Lorenzo Lopez</h1>
                <nav>
                    <HeaderMenu dict={dict} lang={lang} />
                </nav>
            </div>
        </header>
    );
}
