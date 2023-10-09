import Header from "@/components/header";
import { Montserrat } from "next/font/google";
import "../../styles/globals.scss";
import { getDictionary } from "./dictionaries";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
    title: "Lorenz Portfolio",
    description: "Everything you need to know about me",
};

export default async function RootLayout({
    children,
    params: { lang = "es" },
}) {
    const dict = await getDictionary(lang);

    return (
        <html lang={lang}>
            <body className={montserrat.className}>
                <Header dict={dict} />
                <main className="main">
                    <div className="main-bg"></div>
                    <div className="main-bg layer-1"></div>
                    <div className="main-bg layer-2"></div>
                    <div className="main-bg layer-3"></div>
                    {children}
                </main>
            </body>
        </html>
    );
}
