"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function FloatingRacket({
  className = "",
  size = 400,
  initialRotation = -15,
}) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll();

  // Scroll-based transforms
  const scrollRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [initialRotation, initialRotation + 45],
  );
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9]);

  // Mouse-based transforms with spring physics
  const springConfig = { damping: 30, stiffness: 150 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    springConfig,
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className={`pointer-events-none ${className}`}
      style={{
        y: scrollY,
        scale: scrollScale,
        perspective: "1000px",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ: scrollRotate,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src="/imgs/effects/racket.png"
          alt=""
          width={size}
          height={size * 1.5}
          className="drop-shadow-2xl"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
