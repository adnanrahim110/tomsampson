"use client";

import { usePointer } from "@/components/providers/PointerProvider";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";

const defaultBalls = [
  {
    size: 50,
    initialX: "10%",
    initialY: "20%",
    scrollSpeed: 0.3,
    floatDuration: 3,
    delay: 0,
    cursorInfluence: 0.8,
  },
  {
    size: 35,
    initialX: "85%",
    initialY: "15%",
    scrollSpeed: 0.5,
    floatDuration: 4,
    delay: 0.5,
    cursorInfluence: 0.6,
  },
  {
    size: 45,
    initialX: "75%",
    initialY: "60%",
    scrollSpeed: 0.4,
    floatDuration: 3.5,
    delay: 1,
    cursorInfluence: 0.7,
  },
  {
    size: 30,
    initialX: "15%",
    initialY: "70%",
    scrollSpeed: 0.6,
    floatDuration: 4.5,
    delay: 1.5,
    cursorInfluence: 0.5,
  },
];

const Ball = ({
  size = 60,
  initialX = 0,
  initialY = 0,
  scrollSpeed = 0.5,
  floatDuration = 3,
  floatDistance = 20,
  delay = 0,
  cursorInfluence = 0.1,
  className = "",
  scrollYProgress,
  pointerX,
  pointerY,
  enableMotion = true,
  enableLoop = true,
}) => {
  const scrollY = useTransform(
    scrollYProgress,
    (latest) => latest * 500 * scrollSpeed,
  );

  const scrollRotate = useTransform(
    scrollYProgress,
    (latest) => latest * 360 * scrollSpeed,
  );

  const cursorX = useTransform(
    pointerX,
    (latest) => latest * 60 * cursorInfluence,
  );
  const cursorY = useTransform(
    pointerY,
    (latest) => latest * 60 * cursorInfluence,
  );

  return (
    <motion.div
      className={`absolute pointer-events-none will-change-transform ${className}`}
      style={{
        left: initialX,
        top: initialY,
        y: enableMotion ? scrollY : 0,
        x: enableMotion ? cursorX : 0,
      }}
    >
      <motion.div
        style={{
          y: enableMotion ? cursorY : 0,
          rotate: enableMotion ? scrollRotate : 0,
        }}
        animate={
          enableLoop
            ? {
                y: [0, -floatDistance, 0],
              }
            : { y: 0 }
        }
        transition={
          enableLoop
            ? {
                y: {
                  repeat: Infinity,
                  duration: floatDuration,
                  ease: "easeInOut",
                  delay,
                },
              }
            : {}
        }
      >
        <Image
          src="/imgs/effects/ball.png"
          alt=""
          width={size}
          height={size}
          className="drop-shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
};

export default function FloatingBalls({ balls = [], animate = true }) {
  const prefersReducedMotion = useReducedMotion();
  const pointer = usePointer();
  const pointerEnabled = pointer?.enabled ?? false;
  const fallbackPointerX = useMotionValue(0);
  const fallbackPointerY = useMotionValue(0);
  const pointerX = prefersReducedMotion
    ? fallbackPointerX
    : (pointer?.normX ?? fallbackPointerX);
  const pointerY = prefersReducedMotion
    ? fallbackPointerY
    : (pointer?.normY ?? fallbackPointerY);

  const { scrollYProgress } = useScroll();

  const pointerSpringConfig = { damping: 50, stiffness: 100 };
  const pointerXSpring = useSpring(pointerX, pointerSpringConfig);
  const pointerYSpring = useSpring(pointerY, pointerSpringConfig);

  const ballsToRender = balls.length > 0 ? balls : defaultBalls;
  const enableMotion = animate && !prefersReducedMotion;
  const enableLoop = enableMotion && pointerEnabled;

  return (
    <>
      {ballsToRender.map((ball, index) => (
        <Ball
          key={index}
          scrollYProgress={scrollYProgress}
          pointerX={pointerXSpring}
          pointerY={pointerYSpring}
          enableMotion={enableMotion}
          enableLoop={enableLoop}
          {...ball}
        />
      ))}
    </>
  );
}
