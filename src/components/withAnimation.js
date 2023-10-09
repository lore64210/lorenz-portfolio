"use client";

import { useEffect, useRef, useState } from "react";

export default function WithAnimation({
    children,
    animationName = "opacity",
    style,
    className,
}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef();
    useEffect(() => {
        if (animationName && !isIntersecting) {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                } else {
                    setIsIntersecting(false);
                }
            });
            observer.observe(ref.current);
            return () => observer.disconnect();
        }
    }, [animationName, isIntersecting]);

    return animationName ? (
        <div
            ref={ref}
            className={className}
            style={
                isIntersecting
                    ? {
                          ...style,
                          animationName,
                          animationDuration: "2s",
                      }
                    : { ...style, opacity: 0 }
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
