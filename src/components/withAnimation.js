"use client";

import { useEffect, useRef, useState } from "react";

export default function WithAnimation({
    children,
    animationName = "opacity",
    className,
}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
            } else {
                setIsIntersecting(false);
            }
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [animationName, isIntersecting]);
    return animationName ? (
        <div
            ref={ref}
            className={className}
            style={
                isIntersecting
                    ? {
                          animationName,
                          animationDuration: "2s",
                      }
                    : { opacity: 0 }
            }
        >
            {children}
        </div>
    ) : (
        <div className={className} style={style}>
            {children}
        </div>
    );
}
