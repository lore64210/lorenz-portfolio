"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import P5Container from "@/components/miniprojects/P5Container/P5Container";
import useWindowSize from "@/hooks/useWindowSize";
import Maze from "@/components/miniprojects/classes/maze/Maze";
import Cell from "@/components/miniprojects/classes/maze/MazeCell";
import useIsMobile from "@/hooks/useIsMobile";
import Slider from "@/components/miniprojects/slider/slider";
import { CELL_AMOUNT, COLORS, DEFAULT_SPEED } from "./constants";

const MazePage = ({ dict }) => {
    const windowSize = useWindowSize();
    const isMobile = useIsMobile();
    const cellSize =
        (isMobile ? windowSize.width / 1.5 : windowSize.height / 1.5) /
        CELL_AMOUNT;
    const [finished, setFinished] = useState(false);
    const [restart, setRestart] = useState(false);
    const maze = useMemo(() => new Maze(CELL_AMOUNT, true), [restart]);
    const [setupDone, setSetupDone] = useState(false);
    const [speed, setSpeed] = useState(DEFAULT_SPEED);

    useEffect(() => {
        if (setupDone) {
            setupFunction();
        }
    }, [restart]);

    const show = (p5, cell) => {
        if (cell.filled) {
            p5.fill(COLORS.filled);
        } else {
            p5.fill(COLORS.background);
        }
        if (cell.isCurrentCell || cell.moved) {
            p5.fill(COLORS.current);
        }
        if (cell.searched) {
            p5.fill(COLORS.searched);
        }
        if (cell.isStart) {
            p5.fill(COLORS.start);
        }
        if (cell.isEnd) {
            p5.fill(COLORS.end);
        }
        p5.noStroke();
        p5.rect(cell.positionX, cell.positionY, cell.cellSize, cell.cellSize);

        p5.stroke(COLORS.wall);
        if (cell.topWall) {
            p5.line(
                cell.positionX,
                cell.positionY,
                cell.positionX + cell.cellSize,
                cell.positionY
            );
        }
        if (cell.bottomWall) {
            p5.line(
                cell.positionX,
                cell.positionY + cell.cellSize,
                cell.positionX + cell.cellSize,
                cell.positionY + cell.cellSize
            );
        }
        if (cell.rightWall) {
            p5.line(
                cell.positionX + cell.cellSize,
                cell.positionY,
                cell.positionX + cell.cellSize,
                cell.positionY + cell.cellSize
            );
        }
        if (cell.leftWall) {
            p5.line(
                cell.positionX,
                cell.positionY,
                cell.positionX,
                cell.positionY + cell.cellSize
            );
        }
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
        });
    };

    const setupFunction = () => {
        for (let x = 0; x < CELL_AMOUNT; x++) {
            for (let y = 0; y < CELL_AMOUNT; y++) {
                const cell = new Cell(x, y, cellSize);
                maze.addVertex(cell);
            }
        }
        connectCells();
        maze.setCurrentCell(0, 0, true);
    };

    const setup = (p5, canvasRef) => {
        const size = cellSize * CELL_AMOUNT;
        p5.createCanvas(size, size).parent(canvasRef);
        setupFunction();
        setSetupDone(true);
    };

    const onFinish = useCallback(() => {
        maze.removeUnnecesaryEdges();
        maze.findMinimumPath({ x: CELL_AMOUNT - 1, y: CELL_AMOUNT - 1 });
        setFinished(true);
    }, [finished, maze]);

    const draw = (p5) => {
        p5.background(0);
        if (!finished) {
            p5.frameRate(60);
            const mazeComplete = maze.create();
            if (mazeComplete) {
                onFinish();
            }
        } else {
            p5.frameRate(speed);
            maze.move();
        }
        maze.getVertices().forEach((cell) => show(p5, cell));
    };

    const handleRestart = () => {
        setFinished(false);
        setRestart((prev) => !prev);
    };

    return (
        <div className="mini-project-container">
            <P5Container draw={draw} setup={setup} overrideSetup />
            <div className="mini-projects-controls">
                <Slider
                    value={speed}
                    onChange={setSpeed}
                    min={10}
                    max={60}
                    label={
                        dict["projects-content"]["maze-generator"]["labels"][
                            "speed"
                        ]
                    }
                />
                <button className="restart-button" onClick={handleRestart}>
                    {
                        dict["projects-content"]["maze-generator"]["labels"][
                            "restart"
                        ]
                    }
                </button>
            </div>
        </div>
    );
};

export default MazePage;
