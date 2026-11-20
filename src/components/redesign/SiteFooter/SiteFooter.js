import "./SiteFooter.scss";
import { EMAIL_HREF, SITE_NAME, SOCIAL_LINKS } from "@/constants/site";
import { getCvFile } from "@/constants/cv";

export default function SiteFooter({ lang, copy }) {
    const cv = getCvFile(lang);
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="container site-footer-inner">
                <div>
                    <p className="footer-name">{SITE_NAME}</p>
                    <p className="footer-tagline">{copy.footer.tagline}</p>
                </div>

                <nav className="footer-links" aria-label={copy.nav.contact}>
                    <a href={EMAIL_HREF}>Email</a>
                    <a
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                    <a
                        href={SOCIAL_LINKS.linkedin}
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn
                    </a>
                    <a
                        href={cv.href}
                        target="_blank"
                        rel="noreferrer"
                        download={cv.download}
                    >
                        {copy.nav.cv}
                    </a>
                </nav>

                <p className="footer-copy">
                    © {year} {SITE_NAME}. {copy.footer.rights}
                </p>
            </div>
        </footer>
    );
}
