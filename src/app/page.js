import PlaygroundProjectCard from "@/components/playgroundProjectCard";
import ProfilePic from "@/components/profilePic";
import ProjectCard from "@/components/projectCard";

export default function Home() {
    return (
        <main className="main">
            <ProfilePic />
            <h1>Ladies and Gentleman, welcome</h1>
            <h2>Lorenzo López Portfolio</h2>
            <p>Who said that software should be boring?</p>
            <p>
                This is a space dedicated to show what can i do, and a little
                bit of the process of making all this stuff
            </p>
            <div className="project-card-container">
                <ProjectCard
                    title="Portfolio Express"
                    description="A tool to make your own portfolio with multiple pages and gallery types"
                    image="/static/images/profile.webp"
                    href="/portfolio-express"
                />
                <ProjectCard
                    title="Reminder"
                    description="A TODO mobile app with many features. A classic developer project"
                    image="/static/images/profile.webp"
                    href="/reminder"
                    reversed
                />
                <ProjectCard
                    title="Historia y Humo"
                    description="A blog dedicated to the most important people and events in Argentina through history"
                    image="/static/images/profile.webp"
                    href="/historia-y-humo"
                />
                <ProjectCard
                    title="Planet Shop"
                    description="An ecommerce web page to place your products"
                    image="/static/images/profile.webp"
                    href="/planet-shop"
                    reversed
                />
            </div>
            <p>grid with playground miniprojects</p>
            <div className="playground-project-card-container">
                <PlaygroundProjectCard
                    title="Labrynth"
                    image="/static/images/profile.webp"
                />
                <PlaygroundProjectCard
                    title="Labrynth"
                    image="/static/images/profile.webp"
                />
                <PlaygroundProjectCard
                    title="Labrynth"
                    image="/static/images/profile.webp"
                />
                <PlaygroundProjectCard
                    title="Labrynth"
                    image="/static/images/profile.webp"
                />
                <PlaygroundProjectCard
                    title="Labrynth"
                    image="/static/images/profile.webp"
                />
            </div>
        </main>
    );
}
