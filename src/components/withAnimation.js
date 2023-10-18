"use client";

import { useEffect, useRef, useState } from "react";

export default function WithAnimation({
    children,
    animationName = "opacity",
    animationDuration = 2,
    className,
    callback,
    disabled = false,
}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                callback?.(true);
            } else {
                setIsIntersecting(false);
                callback?.(false);
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
                !disabled && isIntersecting
                    ? {
                          animationName,
                          animationDuration: animationDuration + "s",
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
