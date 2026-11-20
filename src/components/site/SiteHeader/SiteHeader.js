"use client";
import "./SiteHeader.scss";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { getCvFile } from "@/constants/cv";
import { getOtherLocale, localizePath } from "@/constants/i18n";
import { SITE_NAME, SOCIAL_LINKS } from "@/constants/site";
import { NAV_ITEMS } from "./constants";

const [SITE_FIRST_NAME, ...SITE_LAST_NAME_PARTS] = SITE_NAME.split(" ");
const SITE_LAST_NAME = SITE_LAST_NAME_PARTS.join(" ");

export default function SiteHeader({ lang, copy }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const otherLang = getOtherLocale(lang);
    const pathWithoutLang = pathname?.replace(/^\/(es|en)(?=\/|$)/, "") ?? "";
    const otherLangHref = localizePath(pathWithoutLang, otherLang);
    const cv = getCvFile(lang);
    const links = NAV_ITEMS.map((item) => ({
        href: item.href ? `/${lang}${item.href}` : `/${lang}#${item.hash}`,
        label: copy.nav[item.labelKey],
    }));

    const close = () => setOpen(false);

    return (
        <header className="site-header">
            <div className="container site-header-inner">
                <Link href={`/${lang}`} className="site-logo">
                    {SITE_FIRST_NAME} <span>{SITE_LAST_NAME}</span>
                </Link>

                <nav className="site-nav" aria-label={copy.nav.primary}>
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="site-nav-link"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link href={otherLangHref} className="lang-switch">
                        {copy.nav.language}
                    </Link>
                    <div className="site-nav-social">
                        <a
                            href={SOCIAL_LINKS.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href={SOCIAL_LINKS.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                    <a
                        href={cv.href}
                        target="_blank"
                        rel="noreferrer"
                        download={cv.download}
                        className="btn btn-small btn-outline"
                    >
                        {copy.nav.cv}
                    </a>
                </nav>

                <button
                    type="button"
                    className="nav-toggle"
                    onClick={() => setOpen((value) => !value)}
                    aria-label={copy.nav.menu}
                    aria-expanded={open}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {open && (
                <div className="nav-mobile">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={close}
                            className="nav-mobile-link"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        href={otherLangHref}
                        onClick={close}
                        className="nav-mobile-link"
                    >
                        {copy.nav.language}
                    </Link>
                    <a
                        href={cv.href}
                        target="_blank"
                        rel="noreferrer"
                        download={cv.download}
                        className="btn btn-outline"
                        onClick={close}
                    >
                        {copy.nav.cv}
                    </a>
                    <div className="nav-mobile-social">
                        <a
                            href={SOCIAL_LINKS.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href={SOCIAL_LINKS.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
