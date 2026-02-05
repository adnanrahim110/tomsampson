"use client";

import { cn } from "@/libs/cn";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function Book3D({
  coverImage = "/imgs/book-cover.jpg",
  title = "A Handful of Promise",
  spineText,
  className,
  thickness = 40,
  size = "md",
  imagePriority = false,
}) {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-25, 25]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sizeClasses = {
    sm: "w-48",
    md: "w-64",
    lg: "w-80",
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("cursor-pointer", sizeClasses[size], className)}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full"
      >
        <div
          className="relative bg-secondary-800 rounded-r-sm shadow-2xl overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
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
          </div>
          <div
            className="absolute top-1 bottom-1 -right-1 w-1"
            style={{
              background:
                "repeating-linear-gradient(to bottom, #f8f5f0 0px, #e6e2da 1px, #f8f5f0 2px)",
            }}
          />
        </div>

        <div
          className="absolute top-0 left-0 h-full bg-linear-to-r from-secondary-900 to-secondary-800 flex items-center justify-center"
          style={{
            width: `${thickness}px`,
            transform: `translateX(-100%) rotateY(-90deg)`,
            transformOrigin: "right center",
          }}
        >
          <span
            className="font-crimson text-xs tracking-widest uppercase text-cream/80 whitespace-nowrap"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {spineText || title || "Book Spine"}
          </span>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 bg-cream"
          style={{
            height: `${thickness}px`,
            transform: `translateY(100%) rotateX(90deg)`,
            transformOrigin: "top center",
            background:
              "repeating-linear-gradient(to right, #f8f5f0 0px, #e6e2da 1px, #f8f5f0 2px)",
          }}
        />

        <div
          className="absolute -bottom-4 left-4 right-4 h-8 bg-secondary-900/20 blur-xl rounded-full"
          style={{ transform: "translateZ(-40px)" }}
        />
      </motion.div>
    </div>
  );
}
