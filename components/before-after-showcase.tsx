import Image from "next/image";

/** Signature Paper Bento Surface from Vote IN — pure dark oklab gradient on dark card frame,
 *  replacing galaxy particles / rings / dot patterns. */
export function Ambient() {
  return null;
}

/** Uses the ready-made iPhone PNG mockup (frame + screen baked in) directly. */
function Device({ src, label }: { src: string; label: string }) {
  return (
    <figure className="flex flex-col items-center gap-4">
      <Image
        src={src}
        alt={label}
        width={1812}
        height={3648}
        sizes="(min-width: 640px) 270px, 180px"
        quality={95}
        className="h-auto w-[180px] max-w-full select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)] sm:w-[270px]"
      />
      <figcaption className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 font-mono text-[11px] text-white/70 uppercase backdrop-blur-sm">
        {label}
      </figcaption>
    </figure>
  );
}

export function BeforeAfterShowcase({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
      <div
        className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] px-6 py-12 sm:px-10 sm:py-14 flex items-center justify-center gap-8 sm:gap-20"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
        }}
      >
        <Device src={before} label="Before" />
        <Device src={after} label="After" />
      </div>
    </div>
  );
}
