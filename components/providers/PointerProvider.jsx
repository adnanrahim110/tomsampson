"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMotionValue } from "motion/react";

const PointerContext = createContext(null);

export function PointerProvider({ children }) {
  const clientX = useMotionValue(-100);
  const clientY = useMotionValue(-100);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover =
      window.matchMedia?.("(any-hover: hover)")?.matches ?? false;
    const finePointer =
      window.matchMedia?.("(any-pointer: fine)")?.matches ?? false;

    if (!canHover || !finePointer) return;

    setEnabled(true);

    let viewportWidth = window.innerWidth || 1;
    let viewportHeight = window.innerHeight || 1;

    const updateViewportSize = () => {
      viewportWidth = window.innerWidth || 1;
      viewportHeight = window.innerHeight || 1;
    };

    const handlePointerMove = (e) => {
      clientX.set(e.clientX);
      clientY.set(e.clientY);
      normX.set(e.clientX / viewportWidth - 0.5);
      normY.set(e.clientY / viewportHeight - 0.5);
    };

    window.addEventListener("resize", updateViewportSize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", updateViewportSize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [clientX, clientY, normX, normY]);

  const value = useMemo(
    () => ({ enabled, clientX, clientY, normX, normY }),
    [enabled, clientX, clientY, normX, normY],
  );

  return (
    <PointerContext.Provider value={value}>{children}</PointerContext.Provider>
  );
}

export function usePointer() {
  return useContext(PointerContext);
}

