import { JetBrains_Mono, Quicksand } from "next/font/google";
import "../../styles/preview.scss";
import "../../styles/dancer.scss";
import SiteHeader from "@/components/redesign/SiteHeader";
import SiteFooter from "@/components/redesign/SiteFooter";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { getPreviewCopy } from "@/content/preview";

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-quicksand",
    display: "swap",
});

const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-jetbrains",
    display: "swap",
});

export const metadata = {
    title: "Lorenzo López — Desarrollador Full Stack",
    description:
        "Portfolio de Lorenzo López, desarrollador full stack. Proyectos, experimentos con p5.js y formas de contacto.",
};

export default async function RootLayout({ children, params }) {
    const { lang = "es" } = await params;
    const copy = getPreviewCopy(lang);

    return (
        <html
            lang={lang}
            data-scroll-behavior="smooth"
            className={`${quicksand.variable} ${jetbrains.variable}`}
        >
            <body className="preview-body">
                <ScrollProgress />
                <SiteHeader lang={lang} copy={copy} />
                {children}
                <SiteFooter lang={lang} copy={copy} />
            </body>
        </html>
    );
}
