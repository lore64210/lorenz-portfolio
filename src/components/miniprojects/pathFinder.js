"use client";
import useIsMobile from "@/hooks/useIsMobile";
import Maze from "./classes/maze/Maze";
import Cell from "./classes/maze/MazeCell";
import P5Container from "./P5Container";
import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useMemo, useRef, useState } from "react";

export const CELL_AMOUNT = 25; // max 35, otherwise is to heavy to compute
const OBSTACLE_PERCENTAGE = 0.5;
const diagonals = true;

export default () => {
    const maze = useMemo(() => new Maze(true), []);
    const pathGenerator = useRef();
    const windowSize = useWindowSize();
    const isMobile = useIsMobile();
    const canvasSize = isMobile ? windowSize.width - 20 : windowSize.width / 2;
    const cellSize = canvasSize / CELL_AMOUNT;
    const [restart, setRestart] = useState(false);

    useEffect(() => {
        setRestart(true);
    }, []);

    const show = (p5, cell) => {
        p5.fill(cell.isObstacle ? "black" : "white");
        if (cell.searched) {
            p5.fill("yellow");
        }
        if (cell.currentCell) {
            p5.fill("green");
        }
        p5.noStroke();
        p5.rect(cell.positionX, cell.positionY, cell.cellSize, cell.cellSize);
    };

    const connectCells = () => {
        maze.getVertices().forEach((cell) => {
            const x = cell.getRow();
            const y = cell.getCol();
            if (x !== 0) {
                cell.addEdge(maze.getCell(x - 1, y));
            }
            if (x !== CELL_AMOUNT - 1) {
                cell.addEdge(maze.getCell(x + 1, y));
            }
            if (y !== 0) {
                cell.addEdge(maze.getCell(x, y - 1));
            }
            if (y !== CELL_AMOUNT - 1) {
                cell.addEdge(maze.getCell(x, y + 1));
            }
            if (diagonals) {
                if (x !== 0 && y !== 0) {
                    cell.addEdge(maze.getCell(x - 1, y - 1));
                }
                if (x !== CELL_AMOUNT - 1 && y !== 0) {
                    cell.addEdge(maze.getCell(x + 1, y - 1));
                }
                if (x !== CELL_AMOUNT - 1 && y !== CELL_AMOUNT - 1) {
                    cell.addEdge(maze.getCell(x + 1, y + 1));
                }
                if (x !== 0 && y !== CELL_AMOUNT - 1) {
                    cell.addEdge(maze.getCell(x - 1, y + 1));
                }
            }
        });
    };

    const setup = (p5, canvasRef) => {
        p5.createCanvas(canvasSize, canvasSize).parent(canvasRef);
        for (let x = 0; x < CELL_AMOUNT; x++) {
            for (let y = 0; y < CELL_AMOUNT; y++) {
                const cell = new Cell(x, y, cellSize);
                const isStart = x === 0 && y === 0;
                const isEnd = x === CELL_AMOUNT - 1 && y === CELL_AMOUNT - 1;
                cell.setIsObstacle(
                    !isStart && !isEnd && Math.random() < OBSTACLE_PERCENTAGE
                );
                maze.addVertex(cell);
                if (isEnd) {
                    pathGenerator.current = maze.aStarSearchGenerator(cell);
                }
            }
        }
        connectCells();
        maze.setCurrentCell(0, 0, true);
    };

    const draw = (p5) => {
        p5.frameRate(15);
        maze.getVertices().forEach((cell) => show(p5, cell));
        pathGenerator.current && pathGenerator.current.next();
    };

    return (
        <P5Container
            draw={draw}
            setup={setup}
            overrideSetup
            restart={restart}
        />
    );
};
