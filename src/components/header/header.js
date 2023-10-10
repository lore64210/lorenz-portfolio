"use client";
import Link from "next/link";
import ProfilePic from "../profilePic";
import Accordeon from "../accordeon";
import useIsMobile from "@/hooks/useIsMobile";
import MobileHeader from "./mobileHeader";

export default function Header({ dict }) {
    const isMobile = useIsMobile();
    return isMobile ? (
        <MobileHeader dict={dict} />
    ) : (
        <header className="header">
            <ProfilePic className="header-image" />
            <div className="header-content">
                <h1 className="header-title">Lorenzo Lopez</h1>
                <nav>
                    <div>
                        <Link href="/" className="header-nav-item">
                            <h3>{dict.header.home}</h3>
                        </Link>
                        <Link href="/about-me" className="header-nav-item">
                            <h3>{dict.header["about-me"]}</h3>
                        </Link>
                        <Accordeon
                            headerClassName="header-nav-item"
                            items={[
                                {
                                    show: true,
                                    header: <h3>{dict.header.projects}</h3>,
                                    content: (
                                        <>
                                            <h4 className="header-nav-item">
                                                {
                                                    dict.projects[
                                                        "portfolio-maker"
                                                    ].title
                                                }
                                            </h4>
                                            <h4 className="header-nav-item">
                                                {
                                                    dict.projects[
                                                        "historia-humo"
                                                    ].title
                                                }
                                            </h4>
                                            <h4 className="header-nav-item">
                                                {
                                                    dict.projects["organizer"]
                                                        .title
                                                }
                                            </h4>
                                            <h4 className="header-nav-item">
                                                {
                                                    dict.projects["planet-shop"]
                                                        .title
                                                }
                                            </h4>
                                        </>
                                    ),
                                },
                                {
                                    show: true,
                                    header: <h3>{dict.header.playground}</h3>,
                                    content: (
                                        <>
                                            <h4 className="header-nav-item">
                                                {
                                                    dict.playground[
                                                        "maze-generator"
                                                    ]
                                                }
                                            </h4>
                                            <h4 className="header-nav-item">
                                                {
                                                    dict.playground[
                                                        "balls-ecosystem"
                                                    ]
                                                }
                                            </h4>
                                            <h4 className="header-nav-item">
                                                {dict.playground["path-finder"]}
                                            </h4>
                                            <h4 className="header-nav-item">
                                                {
                                                    dict.playground[
                                                        "traveling-salesman"
                                                    ]
                                                }
                                            </h4>
                                            <h4 className="header-nav-item">
                                                {
                                                    dict.playground[
                                                        "linear-regression"
                                                    ]
                                                }
                                            </h4>
                                            <h4 className="header-nav-item">
                                                {dict.playground["terrain"]}
                                            </h4>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </div>
                </nav>
            </div>
        </header>
    );
}
