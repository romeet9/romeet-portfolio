import Image from "next/image";

import { Ambient } from "@/components/before-after-showcase";

/** A premium hero showcase for the final design: the framed mockup floating on
 * the same dark "spotlight" backdrop used by the before/after and diagram
 * sections, with a soft glow behind the device. */
export function FinalDesignShowcase({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0c0c0e] px-6 py-16 ring-1 ring-white/[0.07] sm:py-24">
      <Ambient centerY={48} />
      {/* soft spotlight directly behind the device */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.10), transparent 62%)",
        }}
      />
      <div className="relative flex justify-center">
        <Image
          src={src}
          alt={alt}
          width={1812}
          height={3648}
          sizes="(min-width: 640px) 330px, 250px"
          quality={95}
          className="h-auto w-[250px] max-w-full select-none drop-shadow-[0_50px_90px_rgba(0,0,0,0.65)] sm:w-[330px]"
        />
      </div>
    </div>
  );
}
