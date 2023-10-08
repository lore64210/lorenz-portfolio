import PlaygroundProjectCard from "@/components/playgroundProjectCard";
import ProjectCard from "@/components/projectCard";
import "../styles/home.scss";

export default function Home() {
    return (
        <div className="home">
            <br />
            <br />
            <h1>My projects</h1>
            <div className="project-card-container">
                <ProjectCard
                    title="Portfolio Express"
                    description="A tool to make your own portfolio with multiple pages and gallery types"
                    tecnologies="Next.js, Firebase"
                    image="/static/images/profile.webp"
                    href="https://portfolio-maker-ten.vercel.app/"
                />
                <ProjectCard
                    title="Reminder"
                    description="A TODO mobile app with many features. A classic developer project"
                    tecnologies="React Native"
                    image="/static/images/profile.webp"
                    href="https://play.google.com/store/apps/details?id=com.lore64210.Organizer"
                    reversed
                />
                <ProjectCard
                    title="Historia y Humo"
                    description="A blog dedicated to the most important people and events in Argentina through history"
                    image="/static/images/profile.webp"
                    tecnologies="Django"
                    href="/historia-y-humo"
                />
                <ProjectCard
                    title="Planet Shop"
                    description="An ecommerce web page to place your products"
                    image="/static/images/profile.webp"
                    tecnologies="React, Spring Boot"
                    href="/planet-shop"
                    reversed
                />
            </div>
            <br />
            <br />
            <br />
            <h1>Some mini-projects from my playground</h1>
            <div className="playground-project-card-container">
                <PlaygroundProjectCard
                    title="Maze generator"
                    image="/static/images/maze.gif"
                    href="/maze"
                />
                <PlaygroundProjectCard
                    title="Balls Ecosystem"
                    image="/static/images/balls.gif"
                    href="/balls"
                />
                <PlaygroundProjectCard
                    title="Path finder"
                    image="/static/images/path-finder.gif"
                    href="/path-finder"
                />
                <PlaygroundProjectCard
                    title="Traveling Salesman"
                    image="/static/images/traveling-salesman.gif"
                    href="/traveling-salesman"
                />
                <PlaygroundProjectCard
                    title="Linear regression"
                    image="/static/images/linear-regression.gif"
                    href="/linear-regression"
                />
                <PlaygroundProjectCard
                    title="Terrain"
                    image="/static/images/terrain.gif"
                    href="/terrain"
                />
            </div>
        </div>
    );
}
