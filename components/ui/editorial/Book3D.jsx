"use client";

import { cn } from "@/libs/cn";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

export default function Book3D({
  coverImage = "/imgs/book-cover.jpg",
  title = "A Handful of Promise",
  spineText,
  className,
  thickness = 40,
  size = "md",
  imagePriority = false,
}) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [12, -12]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-20, 20]),
    springConfig,
  );

  const glareX = useTransform(x, [-0.5, 0.5], [100, 0]);
  const glareOpacity = useTransform(x, [-0.5, 0, 0.5], [0, 0.1, 0.3]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current || prefersReducedMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) / rect.width);
      y.set((e.clientY - centerY) / rect.height);
    },
    [x, y, prefersReducedMotion],
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const sizeClasses = {
    sm: "w-48",
    md: "w-64",
    lg: "w-80",
  };

  const thicknessValue = Math.min(thickness, 50);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("cursor-pointer select-none", sizeClasses[size], className)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered && !prefersReducedMotion ? 1.02 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full will-change-transform"
      >
        <div
          className="relative overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(${thicknessValue / 2}px)`,
          }}
        >
          <div className="relative aspect-2/3">
            <Image
              src={coverImage}
              alt={title || "Book cover"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
              priority={imagePriority}
            />

            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)`,
                backgroundPositionX: glareX,
                opacity: glareOpacity,
              }}
            />

            <div
              className="absolute inset-y-0 right-0 w-0.75 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, rgba(0,0,0,0.15), transparent)",
              }}
            />

            <div
              className="absolute inset-x-0 top-0 h-0.5 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
              }}
            />
          </div>

          <div
            className="absolute top-0.5 bottom-0.5 -right-0.5 w-0.75 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(to bottom, #f1f5f9 0px, #e2e8f0 1px, #f8fafc 2px)",
            }}
          />
        </div>

        <div
          className="absolute top-0 left-0 h-full flex items-center justify-center"
          style={{
            width: `${thicknessValue}px`,
            transform: `translateX(-100%) rotateY(-90deg)`,
            transformOrigin: "right center",
            background: `linear-gradient(to right, #0f172a 0%, #1e293b 30%, #334155 70%, #1e293b 100%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 4px)`,
            }}
          />

          <span
            className="relative font-crimson text-xs tracking-[0.15em] uppercase text-primary-300 whitespace-nowrap font-medium"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {spineText || title || "Book Spine"}
          </span>

          <div
            className="absolute inset-y-0 left-0 w-px"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-px"
            style={{ background: "rgba(0,0,0,0.3)" }}
          />
        </div>

        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: `${thicknessValue}px`,
            transform: `translateY(100%) rotateX(90deg)`,
            transformOrigin: "top center",
            background: `repeating-linear-gradient(to right, #f8fafc 0px, #e2e8f0 1px, #f1f5f9 2px, #f8fafc 3px)`,
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-0.5"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)",
            }}
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            transform: `translateZ(-${thicknessValue / 2}px)`,
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          }}
        />

        <motion.div
          className="absolute left-[10%] right-[10%] h-5 -z-10"
          style={{
            bottom: `-${thicknessValue + 15}px`,
            background:
              "radial-gradient(ellipse at center, rgba(15,23,42,0.4) 0%, transparent 70%)",
            filter: "blur(8px)",
            transform: "rotateX(90deg)",
            transformOrigin: "top center",
          }}
          animate={{
            scaleX: isHovered ? 1.1 : 1,
            opacity: isHovered ? 0.6 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
