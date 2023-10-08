import ProfilePic from "./profilePic";

export default function Header() {
    return (
        <header className="header">
            <ProfilePic />
            <div>
                <h1>Lorenzo Lopez</h1>
                <nav>
                    <div>
                        <h3>Home</h3>
                        <h3>About me</h3>
                        <h3>Projects</h3>
                        <h3>Mini-projects</h3>
                    </div>
                </nav>
            </div>
        </header>
    );
}
