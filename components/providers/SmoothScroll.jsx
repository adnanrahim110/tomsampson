"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isTouchDevice = window.matchMedia("(any-pointer: coarse)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;

    // Keep mobile scrolling native + battery-friendly
    if (prefersReducedMotion || isTouchDevice || isSmallScreen) {
      return;
    }

    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation frame loop
    let rafId = null;
    function raf(time) {
      lenisRef.current?.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
