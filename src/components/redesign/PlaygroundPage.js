import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function PlaygroundPage({ lang, copy, children }) {
    return (
        <main className="preview-main playground-page">
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
