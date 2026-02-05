"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ParallaxLayer({
  children,
  speed = 0.5, // 0 = fixed, 1 = normal scroll, > 1 = faster
  className = "",
  offset = ["start end", "end start"], // When animation starts/ends
  direction = "y", // "y" or "x"
  range = [0, 0], // Custom range override [start, end]
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Calculate movement range based on speed
  const defaultRange =
    direction === "y"
      ? [100 * (1 - speed), -100 * (1 - speed)]
      : [50 * (1 - speed), -50 * (1 - speed)];

  const moveRange = range[0] !== 0 || range[1] !== 0 ? range : defaultRange;

  const movement = useTransform(scrollYProgress, [0, 1], moveRange);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        [direction]: movement,
      }}
    >
      {children}
    </motion.div>
  );
}
