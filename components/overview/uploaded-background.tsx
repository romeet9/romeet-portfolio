"use client";

import * as React from "react";

import {
  getCardImage,
  isUploaderEnabled,
  onCardImageChange,
} from "@/lib/card-images";

/**
 * Renders a card's uploaded design as its background, if one exists in this
 * browser. Sits between the card's real image/artwork and the legibility ramp —
 * so the uploaded design covers the default, but the gradient and text still
 * layer on top and stay readable.
 *
 * Returns null for everyone else: not enabled, or no upload for this card. So a
 * normal visitor never pays for it and never sees another person's local preview.
 */
export function UploadedBackground({ cardId }: { cardId: string }) {
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isUploaderEnabled()) return;

    let objectUrl: string | null = null;
    let active = true;

    const load = async () => {
      const blob = await getCardImage(cardId);
      if (!active) return;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (blob) {
        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      } else {
        objectUrl = null;
        setUrl(null);
      }
    };

    load();
    const off = onCardImageChange(cardId, load);

    return () => {
      active = false;
      off();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [cardId]);

  if (!url) return null;

  return (
    <img
      src={url}
      alt=""
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full object-cover"
    />
  );
}
