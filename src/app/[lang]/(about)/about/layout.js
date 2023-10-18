import { Montserrat } from "next/font/google";
import "../../../../styles/globals.scss";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
    title: "Lorenz Portfolio",
    description: "Everything you need to know about me",
};

export default async function RootLayout({
    children,
    params: { lang = "es" },
}) {
    return (
        <html lang={lang}>
            <body className={montserrat.className}>{children}</body>
        </html>
    );
}
