"use client";

import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { previewLinks } from "@/content/preview";

export default function SiteHeader({ lang, copy }) {
    const [open, setOpen] = useState(false);
    const otherLang = lang === "es" ? "en" : "es";
    const cvHref = `/static/pdf/CV_LORENZO_LOPEZ_${lang.toUpperCase()}.pdf`;
    const links = [
        { href: "#about", label: copy.nav.about },
        { href: "#skills", label: copy.nav.skills },
        { href: "#projects", label: copy.nav.projects },
        { href: "#playground", label: copy.nav.playground },
        { href: "#contact", label: copy.nav.contact },
    ];

    const close = () => setOpen(false);

    return (
        <header className="site-header">
            <div className="container site-header-inner">
                <Link href={`/${lang}/preview`} className="site-logo">
                    Lorenzo{" "}
                    <span>López</span>
                </Link>

                <nav className="site-nav" aria-label="Principal">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="site-nav-link"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        href={`/${otherLang}/preview`}
                        className="lang-switch"
                    >
                        {copy.nav.language}
                    </Link>
                    <div className="site-nav-social">
                        <a
                            href={previewLinks.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href={previewLinks.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                    <a
                        href={cvHref}
                        target="_blank"
                        rel="noreferrer"
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
                        href={`/${otherLang}/preview`}
                        onClick={close}
                        className="nav-mobile-link"
                    >
                        {copy.nav.language}
                    </Link>
                    <a
                        href={cvHref}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline"
                        onClick={close}
                    >
                        {copy.nav.cv}
                    </a>
                    <div className="nav-mobile-social">
                        <a
                            href={previewLinks.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href={previewLinks.linkedin}
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
