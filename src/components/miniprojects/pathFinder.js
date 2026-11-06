"use client";
import useIsMobile from "@/hooks/useIsMobile";
import Maze from "./classes/maze/Maze";
import Cell from "./classes/maze/MazeCell";
import P5Container from "./P5Container";
import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useMemo, useRef, useState } from "react";
import Slider from "../slider";
import Checkbox from "../checkbox";

export const CELL_AMOUNT = 25; // max 35, otherwise is to heavy to compute

export default ({ dict }) => {
    const pathGenerator = useRef();
    const endCellRef = useRef(null);
    const windowSize = useWindowSize();
    const isMobile = useIsMobile();
    const canvasSize = isMobile
        ? windowSize.width - 20
        : windowSize.height / 1.5;
    const cellSize = canvasSize / CELL_AMOUNT;
    const [reset, setReset] = useState(false);
    const [obstaclesPercentage, setObstaclesPercentage] = useState(35);
    const [diagonalsAllowed, setDiagonalsAllowed] = useState(true);
    const [setupDone, setSetupDone] = useState(false);
    const maze = useMemo(() => new Maze(true), [reset]);

    useEffect(() => {
        if (setupDone) {
            setupFunction();
        }
    }, [reset]);

    const show = (p5, cell) => {
        p5.fill(cell.isObstacle ? "black" : "white");
        if (cell.isEnd) {
            p5.fill("orange");
        }
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
            if (diagonalsAllowed) {
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

    const setupFunction = () => {
        const guaranteedPath = new Set(["0:0"]);
        let pathX = 0;
        let pathY = 0;

        while (
            pathX < CELL_AMOUNT - 1 ||
            pathY < CELL_AMOUNT - 1
        ) {
            const moves = [];

            if (pathX < CELL_AMOUNT - 1) moves.push([1, 0]);
            if (pathY < CELL_AMOUNT - 1) moves.push([0, 1]);
            if (
                diagonalsAllowed &&
                pathX < CELL_AMOUNT - 1 &&
                pathY < CELL_AMOUNT - 1
            ) {
                moves.push([1, 1]);
            }

            const [dx, dy] =
                moves[Math.floor(Math.random() * moves.length)];
            pathX += dx;
            pathY += dy;
            guaranteedPath.add(`${pathX}:${pathY}`);
        }

        for (let x = 0; x < CELL_AMOUNT; x++) {
            for (let y = 0; y < CELL_AMOUNT; y++) {
                const cell = new Cell(x, y, cellSize);
                const isStart = x === 0 && y === 0;
                const isEnd = x === CELL_AMOUNT - 1 && y === CELL_AMOUNT - 1;
                cell.setIsObstacle(
                    !isStart &&
                        !isEnd &&
                        !guaranteedPath.has(`${x}:${y}`) &&
                        Math.random() < obstaclesPercentage / 100
                );
                maze.addVertex(cell);
                if (isEnd) {
                    cell.setIsEnd(true);
                    endCellRef.current = cell;
                    pathGenerator.current = maze.aStarSearchGenerator(cell);
                }
            }
        }
        connectCells();
        maze.setCurrentCell(0, 0, true);
    };

    const setup = (p5, canvasRef) => {
        p5.createCanvas(canvasSize, canvasSize).parent(canvasRef);
        setupFunction();
        setSetupDone(true);
    };

    const draw = (p5) => {
        p5.frameRate(15);
        maze.getVertices().forEach((cell) => show(p5, cell));
        pathGenerator.current && pathGenerator.current.next();
    };

    const resetSearch = () => {
        const end = endCellRef.current;
        if (!end) return;

        maze.getVertices().forEach((cell) => {
            cell.searched = false;
            cell.currentCell = false;
            cell.distance = null;
            cell.heuristic = null;
            cell.previousNode = null;
        });

        pathGenerator.current = maze.aStarSearchGenerator(end);
    };

    const handleCanvasClick = (event) => {
        const canvas = event.currentTarget.querySelector("canvas");
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const relativeX = (event.clientX - rect.left) / rect.width;
        const relativeY = (event.clientY - rect.top) / rect.height;

        if (
            relativeX < 0 ||
            relativeX >= 1 ||
            relativeY < 0 ||
            relativeY >= 1
        ) {
            return;
        }

        const x = Math.floor(relativeX * CELL_AMOUNT);
        const y = Math.floor(relativeY * CELL_AMOUNT);
        const cell = maze.getCell(x, y);

        if (!cell || cell.isStart || cell.isEnd) return;

        cell.setIsObstacle(!cell.isObstacle);
        resetSearch();
    };

    return (
        <div className="mini-project-container">
            <div className="mini-project-canvas" onPointerDown={handleCanvasClick}>
                <P5Container draw={draw} setup={setup} overrideSetup />
            </div>
            <div className="mini-projects-controls">
                <Slider
                    label={
                        dict["projects-content"]["path-finder"]["labels"][
                            "obstacles"
                        ]
                    }
                    onChange={setObstaclesPercentage}
                    value={obstaclesPercentage}
                    min={20}
                    max={60}
                />
                <Checkbox
                    label={
                        dict["projects-content"]["path-finder"]["labels"][
                            "diagonals"
                        ]
                    }
                    defaultValue={diagonalsAllowed}
                    onChange={setDiagonalsAllowed}
                />
                <button
                    className="restart-button"
                    onClick={() => setReset((prev) => !prev)}
                >
                    {
                        dict["projects-content"]["path-finder"]["labels"][
                            "restart"
                        ]
                    }
                </button>
                <p className="mini-projects-hint">
                    {
                        dict["projects-content"]["path-finder"]["labels"][
                            "hint"
                        ]
                    }
                </p>
            </div>
        </div>
    );
};
