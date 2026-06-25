"use client";

import { useEffect, useState, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 1.5 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const hasStarted = useRef(false);

  // Parse: e.g. "+250%" -> prefix: "+", num: 250, suffix: "%"
  const match = value.match(/^([+-]?)([\d,]+(?:\.\d+)?)(.*)$/);
  const prefix = match ? match[1] : "";
  const numStr = match ? match[2].replace(/,/g, "") : "";
  const target = numStr ? parseFloat(numStr) : 0;
  const suffix = match ? match[3] : value;
  const hasDecimals = numStr.includes(".");

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && isInView && !hasStarted.current && target > 0) {
      hasStarted.current = true;
      setHasAnimated(true);
      const controls = animate(0, target, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (hasDecimals) {
            setCount(parseFloat(latest.toFixed(1)));
          } else {
            setCount(Math.round(latest));
          }
        },
      });
      return () => controls.stop();
    }
  }, [mounted, isInView, target, duration, hasDecimals]);

  return (
    <span ref={ref} className="inline-block">
      {!mounted || target === 0 ? (
        value
      ) : (
        <>
          {prefix}
          {hasAnimated ? count : 0}
          {suffix}
        </>
      )}
    </span>
  );
}
