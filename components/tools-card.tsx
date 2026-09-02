"use client";

import * as React from "react";
import { BentoVideoCard } from "@/components/bento-video-card";

export function ToolsCard() {
  return (
    <BentoVideoCard
      slot="tools"
      title="Most used Tools"
      aspectClass="aspect-square"
    />
  );
}
