import dynamic from "next/dynamic";
import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useState, useRef } from "react";
import useIsMobile from "@/hooks/useIsMobile";
const Sketch = dynamic(() => import("react-p5"), { ssr: false });

const P5Container = ({ draw, setup, overrideSetup, ...props }) => {
    const windowSize = useWindowSize();
    const [initializedState, setInitializedState] = useState(false);
    const p5Ref = useRef();
    const canvasRef = useRef();
    const isMobile = useIsMobile();
    const canvasSize = isMobile ? windowSize.width - 20 : windowSize.width / 2;

    useEffect(() => {
        if (initializedState) {
            !overrideSetup &&
                p5Ref.current
                    .createCanvas(canvasSize, canvasSize)
                    .parent(canvasRef.current);
            setup?.(p5Ref.current, canvasRef.current);
        }
    }, [initializedState]);
    const defaultSetup = (p5, canvas) => {
        if (!initializedState) {
            setInitializedState(true);
            p5Ref.current = p5;
            canvasRef.current = canvas;
        }
    };
    const defaultDraw = (p5) => {
        p5.background(255);
        draw?.(p5);
    };

    const windowResized = (p5) =>
        !overrideSetup && p5.resizeCanvas(canvasSize, canvasSize);
    return (
        <Sketch
            setup={defaultSetup}
            draw={defaultDraw}
            windowResized={windowResized}
            {...props}
        />
    );
};

export default P5Container;
