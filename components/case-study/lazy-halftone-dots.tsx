"use client";

import React, { useState, useEffect, useRef } from "react";
import { HalftoneDots, type HalftoneDotsProps } from "@paper-design/shaders-react";

export function LazyHalftoneDots({
  image,
  className,
  style,
  priority = false,
  ...props
}: HalftoneDotsProps & { priority?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(priority);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;

    // Use IntersectionObserver so only visible / near-viewport shaders
    // hold an active WebGL context, staying well within browser limits.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "450px 0px 450px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  // Map any Paper asset URL to local static texture for instant loading & 0 CORS/network drops
  let resolvedImage = image;
  if (typeof image === "string") {
    if (image.includes("01M04G80ZAAH1PVPV1FAHY4PSW.jpg")) {
      resolvedImage = "/textures/01M04G80ZAAH1PVPV1FAHY4PSW.jpg";
    } else if (image.includes("01M05PSD8DDRMVX6V0K90RJ3Q3.jpg")) {
      resolvedImage = "/textures/01M05PSD8DDRMVX6V0K90RJ3Q3.jpg";
    } else if (image.includes("01M05PST8J25JQRT8JR53JG7M4.jpg")) {
      resolvedImage = "/textures/01M05PST8J25JQRT8JR53JG7M4.jpg";
    }
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
    >
      {isInView ? (
        <HalftoneDots
          image={resolvedImage}
          className="w-full h-full"
          {...props}
        />
      ) : null}
    </div>
  );
}
