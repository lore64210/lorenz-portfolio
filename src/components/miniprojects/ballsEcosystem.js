"use client";
import useIsMobile from "@/hooks/useIsMobile";
import P5Container from "./P5Container";
import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";

const CONSUMABLES_AMOUNT = 20;
const CONSUMABLE_GENERATION_RATE = 0.05; // 0 to 1
const VEHICLES_AMOUNT = 5;

const ACCELERATION_RATE = 2; // the bigger the better the behaviours
const MIN_ACCELERATION = 0.001;
const MAX_VELOCITY = 5;

const CONSUMABLE_VALUE = 150;
const CONSUMABLE_SIZE = 10;
const MIN_LIFE = 50;

const MUTATION_RATE = 0.01;

const POISON_DETECTION_RATE = 0.1;
const MIN_POISON_DETECTION_RATE = 0.5;

const CONSUMABLE_EATEN_SCORE = 50;
const VEHICLE_EATEN_SCORE = 500;

const colorCss = (color) =>
    `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(
        color.b
    )})`;

export default function BallsEcosystem({ labels }) {
    const consumablesRef = useRef([]);
    const vehiclesRef = useRef([]);
    const population = useRef(new Population()).current;
    const p5Ref = useRef(null);
    const phaseRef = useRef("intro");
    const nextPopulationRef = useRef(null);
    const generationRef = useRef(1);
    const isMobile = useIsMobile();
    const windowSize = useWindowSize();
    const canvasSize = isMobile
        ? windowSize.width - 20
        : windowSize.height / 1.5;
    const boxSize = Number.isFinite(canvasSize) ? canvasSize : undefined;
    const [restart, setRestart] = useState(false);
    const [phase, setPhase] = useState("intro");
    const [iteration, setIteration] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setRestart(true);
    }, []);

    const createRandomPosition = (p5) =>
        p5.createVector(p5.random(p5.width), p5.random(p5.height));

    const createConsumable = (p5) => ({
        ...createRandomPosition(p5),
        poison: Math.random() < 0.4,
    });

    const setup = (p5, canvasRef) => {
        p5.createCanvas(canvasSize, canvasSize).parent(canvasRef);
        p5Ref.current = p5;
        phaseRef.current = "intro";
        generationRef.current = 1;
        nextPopulationRef.current = null;
        setPhase("intro");
        setIteration(null);
        setReady(true);

        const maxHuntDistance = p5.width / 2;
        const maxLife = p5.width * 2;

        consumablesRef.current = Array.from(
            Array(CONSUMABLES_AMOUNT).keys()
        ).map(() => createConsumable(p5));

        vehiclesRef.current = Array.from(
            Array(VEHICLES_AMOUNT).keys()
        ).map(() => {
            const initialPosition = createRandomPosition(p5);
            const initialVelocity = p5.createVector(0, 0);
            const initialAcceleration = p5.createVector(0, 0);
            const color = {
                r: p5.random(255),
                g: p5.random(255),
                b: p5.random(255),
            };
            const maxVelocity = Math.random() * MAX_VELOCITY;
            const eatAccelerationRate =
                Math.random() * ACCELERATION_RATE + MIN_ACCELERATION;
            const escapeAccelerationRate =
                Math.random() * ACCELERATION_RATE + MIN_ACCELERATION;
            const huntRadius = Math.random() * maxHuntDistance;
            const poisonDetectionRate =
                Math.random() + POISON_DETECTION_RATE;
            const initialLife = Math.random() * maxLife + MIN_LIFE;
            return new Vehicle(
                initialPosition,
                initialVelocity,
                initialAcceleration,
                color,
                maxVelocity,
                eatAccelerationRate,
                escapeAccelerationRate,
                huntRadius,
                poisonDetectionRate,
                initialLife,
                maxLife
            );
        });

        population.genotype = [...vehiclesRef.current];
        population.matingPool = [...vehiclesRef.current];
        p5.noLoop();
    };

    const drawConsumable = (p5, consumable) => {
        p5.fill(consumable.poison ? "red" : "green");
        p5.ellipse(consumable.x, consumable.y, CONSUMABLE_SIZE);
    };

    const drawVehicle = (p5, vehicle) => {
        p5.stroke(vehicle.color.r, vehicle.color.g, vehicle.color.b);
        p5.fill(vehicle.color.r, vehicle.color.g, vehicle.color.b);
        p5.ellipse(
            vehicle.position.x,
            vehicle.position.y,
            vehicle.getSize()
        );
    };

    const beginIteration = (p5) => {
        if (phaseRef.current !== "running") return;

        phaseRef.current = "paused";

        const champion = vehiclesRef.current[0] ?? null;
        const next = population.regeneratePopulation(() =>
            createRandomPosition(p5)
        );

        nextPopulationRef.current = next;
        setIteration({
            generation: generationRef.current,
            nextGeneration: generationRef.current + 1,
            champion: champion
                ? {
                      color: champion.color,
                      fitness: Math.round(champion.fitness),
                  }
                : null,
            colors: next.map((vehicle) => vehicle.color),
        });
        setPhase("paused");
        p5.noLoop();
    };

    const startSimulation = () => {
        if (phaseRef.current !== "intro" || !p5Ref.current) return;
        phaseRef.current = "running";
        setPhase("running");
        p5Ref.current.loop();
    };

    const continueGeneration = () => {
        if (phaseRef.current !== "paused") return;

        const next = nextPopulationRef.current;
        const p5 = p5Ref.current;
        if (!next || !p5) return;

        vehiclesRef.current = next;
        nextPopulationRef.current = null;
        consumablesRef.current = Array.from(
            Array(CONSUMABLES_AMOUNT).keys()
        ).map(() => createConsumable(p5));
        generationRef.current += 1;
        phaseRef.current = "running";
        setPhase("running");
        setIteration(null);
        p5.loop();
    };

    const draw = (p5) => {
        p5.background(0);
        p5.noStroke();

        consumablesRef.current.forEach((consumable) =>
            drawConsumable(p5, consumable)
        );

        if (phaseRef.current !== "running") {
            vehiclesRef.current.forEach((vehicle) =>
                drawVehicle(p5, vehicle)
            );
            return;
        }

        if (vehiclesRef.current.length <= 1) {
            beginIteration(p5);
            vehiclesRef.current.forEach((vehicle) =>
                drawVehicle(p5, vehicle)
            );
            return;
        }

        if (
            consumablesRef.current.length < CONSUMABLES_AMOUNT &&
            Math.random() < CONSUMABLE_GENERATION_RATE
        ) {
            consumablesRef.current.push(createConsumable(p5));
        }

        vehiclesRef.current = vehiclesRef.current.filter(
            ({ life }) => life >= MIN_LIFE
        );

        vehiclesRef.current.forEach((vehicle) => {
            drawVehicle(p5, vehicle);
            vehicle.live(
                p5,
                consumablesRef.current,
                vehiclesRef.current,
                p5.width,
                p5.height
            );
        });
    };

    return (
        <div
            className="balls-ecosystem"
            style={{ width: boxSize, height: boxSize }}
        >
            <P5Container setup={setup} draw={draw} restart={restart} />
            <div
                className={`balls-iteration-overlay ${
                    phase !== "running" ? "is-visible" : ""
                }`}
            >
                {phase === "intro" && (
                    <div className="balls-iteration-card balls-intro-card">
                        <p className="eyebrow">{labels.introEyebrow}</p>
                        <h3 className="balls-intro-title">
                            {labels.introTitle}
                        </h3>
                        <p className="balls-iteration-copy">
                            {labels.introCopy}
                        </p>
                        <button
                            type="button"
                            className="btn btn-small"
                            onClick={startSimulation}
                            disabled={!ready}
                        >
                            {labels.start}
                        </button>
                    </div>
                )}
                {phase === "paused" && iteration && (
                    <div className="balls-iteration-card">
                        <p className="eyebrow">{labels.title}</p>
                        <p className="balls-iteration-generation">
                            {labels.generation} {iteration.generation} →{" "}
                            {iteration.nextGeneration}
                        </p>
                        {iteration.champion && (
                            <div className="balls-iteration-champion">
                                <span
                                    className="balls-swatch"
                                    style={{
                                        background: colorCss(
                                            iteration.champion.color
                                        ),
                                    }}
                                />
                                <span>
                                    {labels.champion} · {labels.fitness}:{" "}
                                    {iteration.champion.fitness}
                                </span>
                            </div>
                        )}
                        <p className="balls-iteration-label">
                            {labels.next}
                        </p>
                        <div className="balls-iteration-swatches">
                            {iteration.colors.map((color, index) => (
                                <span
                                    key={`${index}-${color.r}-${color.g}-${color.b}`}
                                    className="balls-swatch"
                                    style={{ background: colorCss(color) }}
                                />
                            ))}
                        </div>
                        <p className="balls-iteration-copy">
                            {labels.explanation}
                        </p>
                        <button
                            type="button"
                            className="btn btn-small"
                            onClick={continueGeneration}
                        >
                            {labels.continue}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

class Vehicle {
    constructor(
        initialPosition,
        initialVelocity,
        initialAcceleration,
        color,
        maxVelocity,
        eatAccelerationRate,
        escapeAccelerationRate,
        huntRadius,
        poisonDetectionRate,
        life,
        maxLife
    ) {
        this.position = initialPosition;
        this.velocity = initialVelocity;
        this.acceleration = initialAcceleration;
        this.initialPosition = initialPosition;
        this.initialVelocity = initialVelocity;
        this.initialAcceleration = initialAcceleration;
        this.color = color;
        this.fitness = 0;
        this.eatAccelerationRate = eatAccelerationRate;
        this.escapeAccelerationRate = escapeAccelerationRate;
        this.poisonDetectionRate = poisonDetectionRate;
        this.huntRadius = huntRadius;
        this.maxVelocity = maxVelocity;
        this.initialLife = life;
        this.life = life;
        this.maxLife = maxLife;
    }

    live(p5, consumables, vehicles, width, height) {
        if (
            this.position.x < 0 ||
            this.position.x > width ||
            this.position.y < 0 ||
            this.position.y > height
        ) {
            const center = p5.createVector(width / 2, height / 2);
            this.moveTo(center, 5);
            this.move();
            return;
        }

        this.checkVehicles(p5, vehicles) &&
            this.checkConsumables(p5, consumables);
        this.eatConsumables(p5, consumables);
        this.eatVehicles(p5, vehicles);
        this.move();
    }

    checkVehicles(p5, vehicles) {
        let minDistance = this.huntRadius;
        let indexTarget = null;
        let vehicleFound = false;
        vehicles.forEach((vehicle, index) => {
            const distance = p5.dist(
                this.position.x,
                this.position.y,
                vehicle.position.x,
                vehicle.position.y
            );
            if (
                distance &&
                distance <= minDistance &&
                vehicle.life > CONSUMABLE_VALUE
            ) {
                minDistance = distance;
                indexTarget = index;
                vehicleFound = true;
            }
        });
        const vehicle = vehicles[indexTarget];
        if (vehicle) {
            if (this.life > vehicle.life) {
                this.moveTo(vehicle.position);
            } else {
                this.avoid(vehicle.position);
            }
        }
        return !vehicleFound;
    }

    eatVehicles(p5, vehicles) {
        const inedecesToSplice = [];
        vehicles.forEach((vehicle, index) => {
            const distance = p5.dist(
                this.position.x,
                this.position.y,
                vehicle.position.x,
                vehicle.position.y
            );
            if (
                distance > 0 &&
                distance <= this.getSize() / 2 + vehicle.getSize() / 2 &&
                this.life > vehicle.life
            ) {
                this.life += vehicle.life;
                if (this.life > this.maxLife) {
                    this.life = this.maxLife;
                }
                inedecesToSplice.push(index);
            }
        });
        inedecesToSplice.forEach((index) => {
            this.score += VEHICLE_EATEN_SCORE;
            vehicles.splice(index, 1);
        });
    }

    checkConsumables(p5, consumables) {
        let minDistance = Infinity;
        let indexTarget = null;
        consumables.forEach((consumable, indx) => {
            const distance = p5.dist(
                this.position.x,
                this.position.y,
                consumable.x,
                consumable.y
            );
            if (distance < minDistance) {
                minDistance = distance;
                indexTarget = indx;
            }
        });

        if (indexTarget) {
            const consumable = consumables[indexTarget];
            if (
                !consumable.poison ||
                MIN_POISON_DETECTION_RATE < this.poisonDetectionRate
            ) {
                //this.avoid(consumable);
                this.moveTo(consumable);
            }
        }
    }

    eatConsumables(p5, consumables) {
        const inedecesToSplice = [];
        consumables.forEach((consumable, index) => {
            const distance = p5.dist(
                this.position.x,
                this.position.y,
                consumable.x,
                consumable.y
            );
            if (distance <= this.getSize() / 2 + CONSUMABLE_SIZE / 2) {
                if (consumable.poison) {
                    this.life -= CONSUMABLE_VALUE;
                } else if (this.life < this.maxLife) {
                    this.life += CONSUMABLE_VALUE;
                }
                inedecesToSplice.push(index);
            }
        });
        inedecesToSplice.forEach((index) => {
            this.score +=
                CONSUMABLE_EATEN_SCORE * (consumables[index]?.poison ? -1 : 1);
            consumables.splice(index, 1);
        });
    }

    avoid(target) {
        const newAccelerationX = this.position.x - target.x;
        const newAccelerationY = this.position.y - target.y;

        // normalize
        const acelerationMagnitude = Math.sqrt(
            newAccelerationX ** 2 + newAccelerationY ** 2
        );
        this.acceleration.x =
            (newAccelerationX / acelerationMagnitude) *
            this.escapeAccelerationRate;
        this.acceleration.y =
            (newAccelerationY / acelerationMagnitude) *
            this.escapeAccelerationRate;
    }

    moveTo(target, multiplier = 1) {
        const newAccelerationX = target.x - this.position.x;
        const newAccelerationY = target.y - this.position.y;

        // normalize
        const acelerationMagnitude = Math.sqrt(
            newAccelerationX ** 2 + newAccelerationY ** 2
        );
        this.acceleration.x =
            (newAccelerationX / acelerationMagnitude) *
            this.eatAccelerationRate *
            multiplier;
        this.acceleration.y =
            (newAccelerationY / acelerationMagnitude) *
            this.eatAccelerationRate *
            multiplier;
    }

    move() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        if (this.velocity.x >= this.maxVelocity) {
            this.velocity.x = this.maxVelocity;
        }
        if (this.velocity.x <= -this.maxVelocity) {
            this.velocity.x = -this.maxVelocity;
        }
        if (this.velocity.y >= this.maxVelocity) {
            this.velocity.y = this.maxVelocity;
        }
        if (this.velocity.y <= -this.maxVelocity) {
            this.velocity.y = -this.maxVelocity;
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.life--;
        this.fitness++;
    }

    getSize() {
        return this.life / 10;
    }
}

class Population {
    genotype = [];
    matingPool = [];
    bestFitness = 0;

    mutate(value) {
        if (Math.random() < MUTATION_RATE) {
            return Math.random() * value + value / 2;
        }
        return value;
    }

    pick(parent) {
        let found = false;
        let picked = null;
        while (!found) {
            const selectedIndex = Math.round(
                Math.random() * (this.matingPool.length - 1)
            );
            picked = this.matingPool[selectedIndex];
            if (
                (!parent || parent !== picked) &&
                picked.fitness >= Math.random() * this.bestFitness
            ) {
                found = true;
            }
        }
        return picked;
    }

    generateNewDna(father, mother, randomPosition) {
        const parents = [father, mother];
        const randomParent = () => Math.round(Math.random());
        const colorParent = parents[randomParent()];
        return new Vehicle(
            randomPosition,
            { ...parents[randomParent()].initialVelocity },
            { ...parents[randomParent()].initialAcceleration },
            { ...colorParent.color },
            this.mutate(parents[randomParent()].maxVelocity),
            this.mutate(parents[randomParent()].eatAccelerationRate),
            this.mutate(parents[randomParent()].escapeAccelerationRate),
            this.mutate(parents[randomParent()].huntRadius),
            this.mutate(parents[randomParent()].poisonDetectionRate),
            parents[randomParent()].initialLife,
            parents[randomParent()].maxLife
        );
    }

    calculateBestFitness() {
        this.bestFitness = 0;
        this.genotype.forEach((dna) => {
            if (dna.fitness > this.bestFitness) {
                this.bestFitness = dna.fitness;
            }
        });
    }

    regeneratePopulation(createRandomPosition) {
        // La selección tiene que salir de la generación actual, no de un pool
        // que acumula todas las generaciones anteriores.
        this.matingPool = [...this.genotype];
        this.calculateBestFitness();
        const newPopulation = [];
        this.genotype.forEach(() => {
            const father = this.pick();
            const mother = this.pick(father);
            const randomPosition = createRandomPosition();
            const newDna = this.generateNewDna(father, mother, randomPosition);
            newPopulation.push(newDna);
        });
        this.genotype = newPopulation;
        this.matingPool = [...newPopulation];
        return newPopulation;
    }
}
