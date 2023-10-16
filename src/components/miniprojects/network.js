"use client";
import P5Container from "@/components/miniprojects/P5Container";
import useIsMobile from "@/hooks/useIsMobile";
import useWindowSize from "@/hooks/useWindowSize";
import Ball from "./classes/balls/Ball";
import { useEffect, useState } from "react";

const BALLS_AMOUNT = 100;
const BALL_DIAMETER = 3;

const ACELERATION = 0;

const MAX_VELOCITY = 1;
const COLLISION = false;
const MOUSE_ATTRACTION = false;

export default function Network() {
    const windowSize = useWindowSize();
    const isMobile = useIsMobile();
    const [restart, setRestart] = useState(false);
    const balls = [];

    const canvasSize = isMobile
        ? windowSize.width - 20
        : windowSize.height / 1.5;
    const [width, height] = [canvasSize, canvasSize];

    useEffect(() => {
        setRestart(true);
    }, []);

    const setup = (p5, canvasRef) => {
        p5.createCanvas(canvasSize, canvasSize).parent(canvasRef);
        for (let i = 0; i < BALLS_AMOUNT; i++) {
            const position = p5.createVector(
                Math.random() * width,
                Math.random() * height
            );
            const velocity = p5.createVector(
                p5.random() * MAX_VELOCITY,
                p5.random() * MAX_VELOCITY
            );
            const aceleration = p5.createVector(ACELERATION, ACELERATION);
            balls.push(
                new Ball(
                    position,
                    velocity,
                    aceleration,
                    BALL_DIAMETER,
                    p5.color(255, 255, 255),
                    COLLISION,
                    MOUSE_ATTRACTION,
                    p5.random() * MAX_VELOCITY
                )
            );
        }
    };

    const draw = (p5) => {
        p5.background(0);
        balls.forEach((ball) => {
            ball.update(p5, width, height, balls);
            ball.draw(p5);
            ball.drawLine(p5, balls);
        });
    };

    return (
        <P5Container
            draw={draw}
            setup={setup}
            overrideSetup
            restart={restart}
        />
    );
}
