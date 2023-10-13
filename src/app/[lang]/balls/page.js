import Balls from "@/components/miniprojects/balls";
import "../../../styles/project.scss";
import BallsEcosystem from "@/components/miniprojects/ballsEcosystem";

export default function TerrainPage() {
    return (
        <div className="project-page">
            <div className="project-description-container">
                <h1>Balls!</h1>
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
                <Balls />
            </div>
            <div className="canvas-container">
                <BallsEcosystem />
            </div>
        </div>
    );
}
