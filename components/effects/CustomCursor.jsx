"use client";

import { cn } from "@/libs/cn";
import { usePointer } from "@/components/providers/PointerProvider";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const pointer = usePointer();
  const enabled = pointer?.enabled ?? false;

  const fallbackCursorX = useMotionValue(-100);
  const fallbackCursorY = useMotionValue(-100);

  const cursorX = pointer?.clientX ?? fallbackCursorX;
  const cursorY = pointer?.clientY ?? fallbackCursorY;

  const ringSpringConfig = { damping: 25, stiffness: 180, mass: 0.8 };

  // Keep the dot perfectly synced (no spring), and let the ring trail smoothly.
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    if (!enabled) return;
    setIsVisible(true);

    const handlePointerOver = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const isTextInput = target.closest(
        'input, textarea, select, [contenteditable="true"], [role="textbox"]',
      );
      if (isTextInput) {
        setIsHovering(false);
        setIsHoveringLink(false);
        setCursorText("");
        return;
      }

      const isLink = target.closest('a, button, [role="button"]');
      const isImage = target.closest('[data-cursor="view"]');
      const isHoverElement = target.closest('[data-cursor="hover"]');

      if (isImage) {
        setIsHovering(true);
        setIsHoveringLink(false);
        setCursorText("View");
      } else if (isLink) {
        setIsHoveringLink(true);
        setIsHovering(false);
        setCursorText("");
      } else if (isHoverElement) {
        setIsHovering(true);
        setIsHoveringLink(false);
        setCursorText("");
      } else {
        setIsHovering(false);
        setIsHoveringLink(false);
        setCursorText("");
      }
    };

    const hideCursor = () => setIsVisible(false);
    const showCursor = (e) => {
      if (e?.clientX != null && e?.clientY != null) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
      setIsVisible(true);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) hideCursor();
    };

    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("blur", hideCursor);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.body.addEventListener("pointerleave", hideCursor);
    document.body.addEventListener("pointerenter", showCursor);

    return () => {
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("blur", hideCursor);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.body.removeEventListener("pointerleave", hideCursor);
      document.body.removeEventListener("pointerenter", showCursor);
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2.5 : isHoveringLink ? 1.5 : 1,
            backgroundColor: isHovering
              ? "rgba(193, 98, 62, 0.9)"
              : isHoveringLink
                ? "rgba(193, 98, 62, 0.8)"
                : "rgba(193, 98, 62, 0.7)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "rounded-full flex items-center justify-center",
            isHovering ? "w-16 h-16" : "w-3 h-3",
          )}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] font-open font-semibold tracking-wider uppercase text-cream"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 0 : isHoveringLink ? 1.8 : 1,
            opacity: isHovering ? 0 : 0.4,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-10 h-10 rounded-full border-2 border-primary-500"
        />
      </motion.div>
    </>
  );
}
