"use client";
import P5Container from "./P5Container";
import useWindowSize from "@/hooks/useWindowSize";
import Ball from "./classes/balls/Ball";
import { useEffect, useState } from "react";

const BALLS_AMOUNT = 20;
const BALL_DIAMETER = 40;

const MAX_ACELERATION = 0.02;

export const MAX_VELOCITY = 20;
export const COLLISION = true;
export const MOUSE_ATTRACTION = true;

export default () => {
    const balls = [];

    const { width, height } = useWindowSize();
    const [restart, setRestart] = useState(false);

    useEffect(() => {
        setRestart(true);
    }, []);

    const randomColor = (p5) => {
        return p5.color(p5.random(255), p5.random(255), p5.random(255));
    };

    const setup = (p5) => {
        for (let i = 0; i < BALLS_AMOUNT; i++) {
            const color = randomColor(p5);
            const position = p5.createVector(
                Math.random() * width,
                Math.random() * height
            );
            const velocity = p5.createVector(0, 0);
            const aceleration = p5.createVector(
                Math.random() * MAX_ACELERATION,
                Math.random() * MAX_ACELERATION
            );
            balls.push(
                new Ball(position, velocity, aceleration, BALL_DIAMETER, color)
            );
        }
    };

    const draw = (p5) => {
        p5.background(0);

        balls.forEach((ball) => {
            ball.update(p5, width, height, balls);
            ball.draw(p5);
        });
    };

    return <P5Container setup={setup} draw={draw} restart={restart} />;
};
