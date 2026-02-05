"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

export default function NetOverlay({
  className = "",
  opacity = 0.1,
  position = "bottom", // "top" | "bottom" | "left" | "right"
}) {
  const mouseX = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  const springConfig = { damping: 30, stiffness: 100 };
  const cursorOffset = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
    springConfig,
  );

  const scrollOffset = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  const positionClasses = {
    top: "top-0 left-0 right-0 h-32",
    bottom: "bottom-0 left-0 right-0 h-32",
    left: "top-0 bottom-0 left-0 w-32",
    right: "top-0 bottom-0 right-0 w-32",
  };

  return (
    <motion.div
      className={`absolute pointer-events-none overflow-hidden ${positionClasses[position]} ${className}`}
      style={{
        x: position === "left" || position === "right" ? 0 : cursorOffset,
        y: position === "top" || position === "bottom" ? scrollOffset : 0,
      }}
    >
      <Image
        src="/imgs/effects/net.png"
        alt=""
        fill
        className="object-cover"
        style={{ opacity }}
      />
    </motion.div>
  );
}
