"use client";

import * as React from "react";
import { BentoVideoCard } from "@/components/bento-video-card";

export function VideoCard() {
  return (
    <BentoVideoCard
      slot="experience"
      defaultSrc="/videos/animo-focus-slider-720p.webm"
      title="Experience"
      aspectClass="aspect-square"
    />
  );
}

export { VideoCard as ExperienceCard };
