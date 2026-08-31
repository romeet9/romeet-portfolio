"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomMousePointer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // High-fidelity, low-latency spring physics
  const springConfig = { damping: 28, stiffness: 650, mass: 0.08 };
  const cursorX = useSpring(rawX, springConfig);
  const cursorY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest(
          'a, button, [role="button"], input, textarea, select, [tabindex="0"], label, summary, [data-interactive="true"]'
        );
        setIsPointer(!!isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, rawX, rawY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999999] select-none"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isClicking ? 0.75 : isPointer ? 1.6 : 1,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 350 }}
    >
      <div
        className={`rounded-full transition-all duration-150 ease-out ${
          isPointer
            ? "size-5 bg-white/20 border border-white/80 [backdrop-filter:blur(6px)] shadow-[0_0_12px_rgba(255,255,255,0.4)]"
            : "size-3.5 bg-black/60 dark:bg-white/30 border border-white/80 dark:border-white/90 [backdrop-filter:blur(4px)] shadow-[0_0_8px_rgba(0,0,0,0.35)]"
        }`}
      />
    </motion.div>
  );
}

