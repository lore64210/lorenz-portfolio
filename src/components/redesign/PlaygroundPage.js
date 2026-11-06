import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PlaygroundNetworkBackground from "@/components/miniprojects/PlaygroundNetworkBackground";

export default function PlaygroundPage({ lang, copy, children }) {
    return (
        <main className="preview-main playground-page">
            <PlaygroundNetworkBackground />
            <div className="container">
                <Link href={`/${lang}#playground`} className="back-link">
                    <FaArrowLeft />
                    {copy.playgroundPage.back}
                </Link>
                {children}
            </div>
        </main>
    );
}
