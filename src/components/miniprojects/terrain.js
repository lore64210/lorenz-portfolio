"use client";
import P5Container from "@/components/miniprojects/P5Container";
import useIsMobile from "@/hooks/useIsMobile";
import useWindowSize from "@/hooks/useWindowSize";
import { useRef } from "react";

const scale = 20;

export default () => {
    const windowSize = useWindowSize();
    const flying = useRef(0);
    const terrainRef = useRef();
    const canvasSize = 1000;
    const rows = canvasSize / scale;
    const cols = rows;
    const isMobile = useIsMobile();

    const setup = (p5, canvasRef) => {
        const canvasSize = isMobile
            ? windowSize.width - 20
            : windowSize.height / 2;
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
        p5.rotateX(p5.PI / 2);
        p5.translate(-windowSize.width * 1.5, -windowSize.height * 4, -300);
        flying.current -= 0.05;
        let yoff = flying.current;
        for (let y = 0; y < cols; y++) {
            let xoff = 0;
            for (let x = 0; x < rows; x++) {
                terrainRef.current[x][y] = p5.map(
                    p5.noise(xoff, yoff),
                    0,
                    1,
                    -250,
                    100
                );
                xoff += 0.2;
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

    return <P5Container draw={draw} setup={setup} overrideSetup />;
};
