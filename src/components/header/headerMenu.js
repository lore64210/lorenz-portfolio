"use client";
import Link from "next/link";
import Accordeon from "../accordeon";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";

export default function HeaderMenu({ dict, lang }) {
    const isMobile = useIsMobile();
    return (
        <div>
            <Link href={`/${lang}`} className="header-nav-item">
                <h3>{dict.header.home}</h3>
            </Link>
            <Link href={`/${lang}/about`} className="header-nav-item">
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
                                <Link
                                    href="https://portfolio-maker-ten.vercel.app/"
                                    target="_blank"
                                >
                                    <h4 className="header-nav-item">
                                        {dict.projects["portfolio-maker"].title}
                                    </h4>
                                </Link>
                                <Link
                                    href="https://play.google.com/store/apps/details?id=com.lore64210.Organizer"
                                    target="_blank"
                                >
                                    <h4 className="header-nav-item">
                                        {dict.projects["historia-humo"].title}
                                    </h4>
                                </Link>
                                <h4 className="header-nav-item">
                                    {dict.projects["organizer"].title}
                                </h4>
                                <h4 className="header-nav-item">
                                    {dict.projects["planet-shop"].title}
                                </h4>
                            </>
                        ),
                    },
                    {
                        show: true,
                        header: <h3>{dict.header.playground}</h3>,
                        content: (
                            <>
                                <Link target="_blank" href={`/${lang}/maze`}>
                                    <h4 className="header-nav-item">
                                        {dict.playground["maze-generator"]}
                                    </h4>
                                </Link>
                                <Link target="_blank" href={`/${lang}/balls`}>
                                    <h4 className="header-nav-item">
                                        {dict.playground["balls-ecosystem"]}
                                    </h4>
                                </Link>
                                <Link
                                    target="_blank"
                                    href={`/${lang}/path-finder`}
                                >
                                    <h4 className="header-nav-item">
                                        {dict.playground["path-finder"]}
                                    </h4>
                                </Link>
                                <Link target="_blank" href={`/${lang}/terrain`}>
                                    <h4 className="header-nav-item">
                                        {dict.playground["terrain"]}
                                    </h4>
                                </Link>
                            </>
                        ),
                    },
                ]}
            />
            <Link
                href="https://github.com/lore64210?tab=repositories"
                className="header-nav-item"
                target="_blank"
            >
                <h3>{dict.header["my-repos"]}</h3>
                {!isMobile && (
                    <Image
                        src="/static/images/github.png"
                        width={20}
                        height={20}
                        className="github-icon"
                    />
                )}
            </Link>
        </div>
    );
}
