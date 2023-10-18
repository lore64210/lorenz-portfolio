"use client";
import P5Container from "@/components/miniprojects/P5Container";
import useIsMobile from "@/hooks/useIsMobile";
import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import Slider from "../slider";

const scale = 20;

export default () => {
    const windowSize = useWindowSize();
    const flying = useRef(0);
    const terrainRef = useRef();
    const canvasSize = 1000;
    const rows = canvasSize / scale;
    const cols = rows;
    const isMobile = useIsMobile();
    const [restart, setRestart] = useState(false);
    const [speedValue, setSpeedValue] = useState(50);
    const [mountainSizeValue, setMountainSizeValue] = useState(500);
    const [rotateXValue, setRotateXValue] = useState(20);
    const [rotateZValue, setRotateZValue] = useState(1);
    const [distanceValue, setDistanceValue] = useState(500);
    const [distanceHorizontalValue, setDistanceHorizontalValue] = useState(30);

    useEffect(() => {
        setRestart(true);
    }, []);

    const setup = (p5, canvasRef) => {
        const canvasSize = isMobile
            ? windowSize.width - 20
            : windowSize.height / 1.5;
        p5.createCanvas(canvasSize, canvasSize, p5.WEBGL).parent(canvasRef);

        const terrain = new Array(rows);
        for (let i = 0; i < terrain.length; i++) {
            terrain[i] = new Array(rows);
        }
        terrainRef.current = terrain;
    };

    const draw = (p5) => {
        p5.background(0);
        p5.stroke(255);
        p5.noFill();
        p5.rotateX(p5.PI / (rotateXValue / 10));
        p5.rotateZ(rotateZValue / 10);
        p5.translate(
            -canvasSize * 2.1,
            (-canvasSize * distanceHorizontalValue) / 10,
            -distanceValue
        );
        flying.current -= speedValue / 5000;
        let yoff = flying.current;
        for (let y = 0; y < cols; y++) {
            let xoff = 0;
            for (let x = 0; x < rows; x++) {
                terrainRef.current[x][y] = p5.map(
                    p5.noise(xoff, yoff),
                    0,
                    1,
                    -mountainSizeValue,
                    mountainSizeValue
                );
                xoff += 0.1;
            }
            yoff += 0.1;
        }
        for (let y = 0; y < cols - 1; y++) {
            p5.beginShape(p5.TRIANGLE_STRIP);
            for (let x = 0; x < rows; x++) {
                p5.vertex(
                    x * scale * 4,
                    y * scale * 4,
                    terrainRef.current[x][y]
                );
                p5.vertex(
                    x * scale * 4,
                    (y + 1) * scale * 4,
                    terrainRef.current[x][y + 1]
                );
            }
            p5.endShape();
        }
    };

    return (
        <div className="mini-project-container">
            <P5Container
                draw={draw}
                setup={setup}
                overrideSetup
                restart={restart}
            />
            <div className="mini-projects-controls">
                <Slider
                    label="Speed"
                    onChange={setSpeedValue}
                    value={speedValue}
                />
                <Slider
                    label="Mountain Size"
                    onChange={setMountainSizeValue}
                    value={mountainSizeValue}
                    min={50}
                    max={1000}
                />
                <Slider
                    label="Rotate Y"
                    onChange={setRotateXValue}
                    value={rotateXValue}
                    min={20}
                    max={80}
                />
                <Slider
                    label="Rotate X"
                    onChange={setRotateZValue}
                    value={rotateZValue}
                    min={1}
                    max={64}
                />
                <Slider
                    label="Distance"
                    onChange={setDistanceValue}
                    value={distanceValue}
                    min={10}
                    max={3000}
                />
                <Slider
                    label="Distance Horizontal"
                    onChange={setDistanceHorizontalValue}
                    value={distanceHorizontalValue}
                    min={1}
                    max={100}
                />
            </div>
        </div>
    );
};
