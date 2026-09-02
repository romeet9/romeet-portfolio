"use client";

import * as React from "react";
import { BentoVideoCard } from "@/components/bento-video-card";

export function VideoCard() {
  return (
    <BentoVideoCard
      slot="experience"
      defaultSrc="/videos/experience.webm"
      title="GPACTS"
      badgeLabel="GPACTS"
      aspectClass="aspect-square"
    />
  );
}

export { VideoCard as ExperienceCard };
