"use client";
import P5Container from "./P5Container";
import useWindowSize from "@/hooks/useWindowSize";
import Ball from "./classes/balls/Ball";
import { useEffect, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";

const BALLS_AMOUNT = 20;
const BALL_DIAMETER = 30;

const MAX_ACELERATION = 0.02;

export const MAX_VELOCITY = 5;
const COLLISION = true;
const MOUSE_ATTRACTION = true;

export default () => {
    const balls = [];

    const { width } = useWindowSize();
    const [restart, setRestart] = useState(false);
    const isMobile = useIsMobile();
    const canvasSize = isMobile ? width - 20 : width / 2;

    useEffect(() => {
        setRestart(true);
    }, []);

    const randomColor = (p5) => {
        return p5.color(p5.random(255), p5.random(255), p5.random(255));
    };

    const setup = (p5, canvasRef) => {
        p5.createCanvas(canvasSize, canvasSize).parent(canvasRef);
        for (let i = 0; i < BALLS_AMOUNT; i++) {
            const color = randomColor(p5);
            const position = p5.createVector(
                Math.random() * canvasSize,
                Math.random() * canvasSize
            );
            const velocity = p5.createVector(0, 0);
            const aceleration = p5.createVector(
                Math.random() * MAX_ACELERATION,
                Math.random() * MAX_ACELERATION
            );
            balls.push(
                new Ball(
                    position,
                    velocity,
                    aceleration,
                    BALL_DIAMETER,
                    color,
                    COLLISION,
                    MOUSE_ATTRACTION,
                    MAX_VELOCITY
                )
            );
        }
    };

    const draw = (p5) => {
        p5.background(0);

        balls.forEach((ball) => {
            ball.update(p5, canvasSize, canvasSize, balls);
            ball.draw(p5);
        });
    };

    return (
        <P5Container
            setup={setup}
            draw={draw}
            restart={restart}
            overrideSetup
        />
    );
};
