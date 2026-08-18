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

  // Smooth, snappy spring for precise latency-free cursor follow
  const springConfig = { damping: 35, stiffness: 700, mass: 0.1 };
  const cursorX = useSpring(rawX, springConfig);
  const cursorY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 6); // 12px / 2 = 6px offset
      rawY.set(e.clientY - 6);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest(
          'a, button, [role="button"], input, textarea, select, [tabindex="0"], label, summary'
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
      className="pointer-events-none fixed top-0 left-0 z-[999999]"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isClicking ? 0.8 : isPointer ? 1.35 : 1,
      }}
      transition={{ type: "spring", damping: 25, stiffness: 400 }}
    >
      {/* Exact Paper Canvas Design:
          width: 12px, height: 12px, rounded-full,
          backdrop-filter: blur(4px),
          background: #00000078,
          border: 0.5px solid #FFFFFF99
      */}
      <div
        className="size-3 rounded-full [backdrop-filter:blur(4px)] bg-[#00000078] border-[0.5px] border-solid border-[#FFFFFF99] shadow-[0_0_8px_rgba(0,0,0,0.3)]"
        style={{
          width: "12px",
          height: "12px",
        }}
      />
    </motion.div>
  );
}
