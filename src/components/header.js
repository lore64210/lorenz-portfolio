import Link from "next/link";
import ProfilePic from "./profilePic";
import Accordeon from "./accordeon";

export default function Header() {
    return (
        <header className="header">
            <div className="header-image">
                <ProfilePic />
            </div>
            <div>
                <h1 className="header-title">Lorenzo Lopez</h1>
                <nav>
                    <div>
                        <Link href="/" className="header-nav-item">
                            <h3>Home</h3>
                        </Link>
                        <Link href="/about-me" className="header-nav-item">
                            <h3>About me</h3>
                        </Link>
                        <Accordeon
                            headerClassName="header-nav-item"
                            items={[
                                {
                                    show: true,
                                    header: <h3>Projects</h3>,
                                    content: (
                                        <>
                                            <h4 className="header-nav-item">
                                                Portfolio Maker
                                            </h4>
                                            <h4 className="header-nav-item">
                                                Historia y Humo
                                            </h4>
                                            <h4 className="header-nav-item">
                                                Organizer
                                            </h4>
                                            <h4 className="header-nav-item">
                                                PlanetShop
                                            </h4>
                                        </>
                                    ),
                                },
                                {
                                    show: true,
                                    header: <h3>Playground</h3>,
                                    content: (
                                        <>
                                            <h4 className="header-nav-item">
                                                Maze Generator
                                            </h4>
                                            <h4 className="header-nav-item">
                                                Balls Ecosystem
                                            </h4>
                                            <h4 className="header-nav-item">
                                                Path Finder
                                            </h4>
                                            <h4 className="header-nav-item">
                                                Traveling Salesman
                                            </h4>
                                            <h4 className="header-nav-item">
                                                Linear Regression
                                            </h4>
                                            <h4 className="header-nav-item">
                                                Terrain
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
