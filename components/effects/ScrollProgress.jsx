"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress({
  position = "top", // "top" | "bottom" | "left" | "right"
  color = "bg-primary-500",
  height = "h-1",
  width = "w-1",
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const positionClasses = {
    top: "fixed top-0 left-0 right-0 origin-left",
    bottom: "fixed bottom-0 left-0 right-0 origin-left",
    left: "fixed top-0 left-0 bottom-0 origin-top",
    right: "fixed top-0 right-0 bottom-0 origin-top",
  };

  const isHorizontal = position === "top" || position === "bottom";

  return (
    <motion.div
      className={`${positionClasses[position]} ${isHorizontal ? height : width} ${color} z-50`}
      style={{
        scaleX: isHorizontal ? scaleX : 1,
        scaleY: isHorizontal ? 1 : scaleX,
      }}
    />
  );
}
