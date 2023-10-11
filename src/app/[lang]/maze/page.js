import Maze from "@/components/miniprojects/maze";
import "../../../styles/project.scss";

export default function MazeGeneratorPage() {
    return (
        <div className="project-page">
            <div className="project-description-container">
                <h1>Random Mazes</h1>
                <p>This one is special, i could watch it for hours</p>
                <p>
                    I watched a guy do something like this in youtube and just
                    had to replicate it, because i loved the concept and the
                    simplicity
                </p>
                <p>
                    Is basically a grid with triangles, rotated in 3d. Each
                    vertex (x,y coordinate) has a z value that is given with an
                    algorithm called <b>Perlin's Noise</b>, similar to the
                    classic random function but instead of being erratic, adds
                    some smooth curves to the ecuation
                </p>
                <p>
                    Play around with the values to interact with the terrain, is
                    just so aestethic
                </p>
            </div>
            <div className="canvas-container">
                <Maze />
            </div>
        </div>
    );
}
