"use client";

import * as React from "react";
import { BentoVideoCard } from "@/components/bento-video-card";

export function SocialsCard() {
  return (
    <BentoVideoCard
      slot="socials"
      title="Social media post"
      badgeLabel="Social media post"
      aspectClass="aspect-[406/296]"
    />
  );
}
