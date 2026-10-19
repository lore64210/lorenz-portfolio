import { previewLinks } from "@/content/preview";

export default function SiteFooter({ lang, copy }) {
    const cvHref = `/static/pdf/CV_LORENZO_LOPEZ_${lang.toUpperCase()}.pdf`;
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="container site-footer-inner">
                <div>
                    <p className="footer-name">Lorenzo López</p>
                    <p className="footer-tagline">{copy.footer.tagline}</p>
                </div>

                <nav className="footer-links" aria-label="Contacto">
                    <a href={previewLinks.email}>Email</a>
                    <a
                        href={previewLinks.github}
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                    <a
                        href={previewLinks.linkedin}
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn
                    </a>
                    <a href={cvHref} target="_blank" rel="noreferrer">
                        {copy.nav.cv}
                    </a>
                </nav>

                <p className="footer-copy">
                    © {year} Lorenzo López. {copy.footer.rights}
                </p>
            </div>
        </footer>
    );
}
