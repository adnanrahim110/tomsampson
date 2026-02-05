"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

export default function CursorFollower({
  imageSrc = "/imgs/effects/ball.png",
  size = 40,
  offsetX = 50,
  offsetY = 50,
  dampingFactor = 50,
  stiffness = 100,
  opacity = 0.6,
  className = "",
}) {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springConfig = { damping: dampingFactor, stiffness };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  // Add subtle rotation based on movement
  const rotate = useTransform(x, (latest) => {
    return (latest % 360) * 0.1;
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX + offsetX);
      cursorY.set(e.clientY + offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, offsetX, offsetY]);

  return (
    <motion.div
      className={`fixed top-0 left-0 pointer-events-none z-40 ${className}`}
      style={{
        x,
        y,
        rotate,
        opacity,
      }}
    >
      <Image
        src={imageSrc}
        alt=""
        width={size}
        height={size}
        className="drop-shadow-md"
      />
    </motion.div>
  );
}
